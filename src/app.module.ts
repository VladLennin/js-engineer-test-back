import {Module} from '@nestjs/common';
import * as process from "process";
import {SequelizeModule} from "@nestjs/sequelize";
import {SuperPowersModule} from './superpowers/superpowers.module';
import {HeroModule} from "./hero/hero.module";
import {Hero} from "./hero/hero.model";
import {SuperPower} from "./superpowers/superpowers.model";
import {Image} from "./image/image.model"
import {HeroesSuperPowers} from "./superpowers/heroes-superpowers.model";
import {ImageModule} from "./image/image.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve('uploads'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: String(process.env.POSTGRES_PASSWORD),
            database: process.env.POSTGRES_DB,
            models: [Hero, SuperPower, HeroesSuperPowers, Image],
            autoLoadModels: true,
            logging: false
        }),
        SuperPowersModule,
        HeroModule,
        ImageModule
    ],
})
export class AppModule {
}
