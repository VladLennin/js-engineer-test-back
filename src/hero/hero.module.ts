import {Module} from "@nestjs/common";
import {HeroController} from "./hero.controller";
import {HeroService} from "./hero.service";
import {Hero} from "./hero.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {SuperPower} from "../superpowers/superpowers.model";
import {HeroesSuperPowers} from "../superpowers/heroes-superpowers.model";
import {ImageService} from "../image/image.service";
import {Image} from "../image/image.model"

@Module({
    controllers: [HeroController],
    providers: [HeroService, ImageService],
    imports: [
        SequelizeModule.forFeature([Hero, SuperPower, HeroesSuperPowers, Image]),
    ],
    exports: [HeroService,]
})
export class HeroModule {
}