import {Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {HeroService} from "./hero.service";
import {CreateHeroDto} from "./dto/create-hero-dto";
import {FilesInterceptor} from "@nestjs/platform-express";
import {Hero} from "./hero.model";
import {ImageService} from "../image/image.service";

@Controller("hero")
export class HeroController {

    constructor(private heroService: HeroService,
                private imageService: ImageService) {
    }

    @Post()
    @UseInterceptors(FilesInterceptor("files"))
    createHero(@UploadedFiles() files: any, @Req() req: any) {
        const heroDto: CreateHeroDto = JSON.parse(req.body.heroDto);
        return this.heroService.createHero(heroDto, files);
    }

    @Put()
    @UseInterceptors(FilesInterceptor("files"))
    editHero(@UploadedFiles() files: any, @Req() req: any) {
        const editedHero: Hero = JSON.parse(req.body.editedHero);
        return this.heroService.editHero(editedHero, files)
    }

    @Delete("/image/:id")
    deleteHeroImg(@Param("id") id: number) {
        return this.imageService.removeImg(id);
    }

    @Delete(":id")
    deleteHero(@Param("id") id: number) {
        return this.heroService.deleteHero(id)
    }


    @Get("all/:page/:limit")
    getHeroes(@Param("page") page: number, @Param("limit") limit: number) {
        const offset = (page - 1) * limit;
        return this.heroService.getHeroesMainPageDto(offset, limit)
    }

    @Get("count")
    getCountHeroes() {
        return this.heroService.getHeroesCount()
    }


    @Get(":id")
    getHeroByPk(@Param("id") id: number) {
        console.log("some")
        return this.heroService.getHeroByPk(id)
    }


}