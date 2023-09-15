import {HttpException, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Hero} from "./hero.model";
import {SuperPowersService} from "../superpowers/superpowers.service";
import {EditHeroDto} from "./dto/edit-hero-dto";
import {HeroesSuperPowers} from "../superpowers/heroes-superpowers.model";
import {ImageService} from "../image/image.service";

@Injectable()
export class HeroService {

    constructor(@InjectModel(Hero) private heroRepository: typeof Hero,
                @InjectModel(HeroesSuperPowers) private heroesSuperPowersRepo: typeof HeroesSuperPowers,
                private imageService: ImageService) {
    }

    async createHero(heroDto: any, files: any) {

        const candidate = await this.heroRepository.findOne({where: {nickname: heroDto.nickname}})

        if (candidate) {
            throw new HttpException("Hero with same nickname already exist", 400)
        }


        const newHero = await this.heroRepository.create(heroDto)

        await this.imageService.createImages(files, newHero.id)

        await newHero.$set('superpowers', heroDto.superpowers)


        return await this.heroRepository.findByPk(newHero.id, {include: {all: true}})
    }

    async editHero(id: number, updateHeroDto: EditHeroDto): Promise<Hero> {
        const hero = await this.heroRepository.findByPk(id);

        if (!hero) {
            throw new HttpException('Hero not found', 404);
        }

        await hero.update(updateHeroDto);

        return hero;
    }

    async deleteHero(id: number) {
        const hero = await this.heroRepository.findByPk(id)
        if (!hero) {
            throw new HttpException('Hero not found', 404);
        }
        await hero.destroy()
        await this.heroesSuperPowersRepo.destroy({where: {heroId: id}})
    }

    async getHeroByPk(id: number) {
        const hero = await this.heroRepository.findByPk(id, {include: {all: true}})
        if (!hero) {
            throw new HttpException('Hero not found', 404);
        }
        return hero;
    }

    async getHeroes(offset: number, limit: any) {
        return this.heroRepository.findAll({
            offset,
            limit,
            order: [['createdAt', 'ASC']]
        })
    }


}