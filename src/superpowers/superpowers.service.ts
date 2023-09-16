import {HttpException, Injectable, Module} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {SuperPower} from "./superpowers.model";

@Injectable()
export class SuperPowersService {

    constructor(@InjectModel(SuperPower) private superpowerRepo: typeof SuperPower) {
    }

    async createSuperPower(power: string) {
        const candidate = await this.superpowerRepo.findOne({where: {power}})

        if (candidate) {
            throw new HttpException("SuperPower with this power already exist", 409)
        }
        return await this.superpowerRepo.create({power})
    }

    async getAllSuperpowers() {
        return this.superpowerRepo.findAll();
    }
}
