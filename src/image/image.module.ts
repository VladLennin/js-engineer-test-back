import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {Hero} from "../hero/hero.model";
import {ImageService} from "./image.service";
import {Image} from "./image.model"


@Module({
    providers: [ImageService],
    imports: [
        SequelizeModule.forFeature([Hero, Image]),
    ],
    exports: [ImageService]
})
export class ImageModule {
}