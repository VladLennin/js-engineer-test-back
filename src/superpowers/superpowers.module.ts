import {Module} from '@nestjs/common';
import {SuperPowersController} from "./superpowers.controller";
import {SuperPowersService} from "./superpowers.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {SuperPower} from "./superpowers.model";
import {HeroesSuperPowers} from "./heroes-superpowers.model";
import {Hero} from "../hero/hero.model";

@Module({
    controllers: [SuperPowersController],
    providers: [SuperPowersService],
    imports: [
        SequelizeModule.forFeature([SuperPower, Hero, HeroesSuperPowers])
    ],
    exports:[
        SuperPowersService
    ]
})
export class SuperPowersModule {
}
