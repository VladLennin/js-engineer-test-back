import {Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {HeroService} from "./hero.service";
import {CreateHeroDto} from "./dto/create-hero-dto";
import {EditHeroDto} from "./dto/edit-hero-dto";
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";

@Controller("hero")
export class HeroController {

    constructor(private heroService: HeroService) {
    }

    @Post()
    @UseInterceptors(FilesInterceptor("files"))
    createHero(@UploadedFiles() files: any, @Req() req: any) {
        const heroDto:CreateHeroDto = JSON.parse(req.body.heroDto);
        return this.heroService.createHero(heroDto, files);
    }


    @Put(":id")
    editHero(@Param('id') id: number, @Body() editHeroDto: EditHeroDto) {
        return this.heroService.editHero(id, editHeroDto)
    }

    @Delete(":id")
    deleteHero(@Param("id") id: number) {
        return this.heroService.deleteHero(id)
    }


    @Get("all/:page")
    getHeroes(@Param("page") page: number,) {
        const limit = 5;
        const offset = (page - 1) * limit;
        return this.heroService.getHeroes(offset, limit)
    }


    @Get(":id")
    getHeroByPk(@Param("id") id: number) {
        return this.heroService.getHeroByPk(id)
    }


}