import {HttpException, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Hero} from "./hero.model";
import {HeroesSuperPowers} from "../superpowers/heroes-superpowers.model";
import {ImageService} from "../image/image.service";
import {Image} from "../image/image.model"

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

    async editHero(editedHero: Hero, files: any): Promise<Hero> {
        const hero = await this.heroRepository.findByPk(editedHero.id);

        if (!hero) {
            throw new HttpException('Hero not found', 404);
        }

        await this.imageService.createImages(files, editedHero.id)
        await hero.update(editedHero);
        await hero.$set('superpowers', editedHero.superpowers)

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

    async getHeroesMainPageDto(offset: number, limit: any) {
        return this.heroRepository.findAll({
            include: [
                {
                    model: Image,
                    attributes: ['href'],
                    limit: 1,
                },
            ],
            attributes: ['nickname'],
            offset,
            limit,
            order: [['createdAt', 'ASC']]
        })
    }

    async getHeroesCount() {
        return this.heroRepository.count()
    }

}