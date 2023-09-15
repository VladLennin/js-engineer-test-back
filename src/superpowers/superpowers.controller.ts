import {Body, Controller, Module, Post, Req} from '@nestjs/common';
import {SuperPowersService} from "./superpowers.service";

@Controller("superpower")
export class SuperPowersController {

    constructor(private superpowerService: SuperPowersService) {
    }

    @Post()
    createSuperPower(@Req() req) {
        const power = req.body.power;
        return this.superpowerService.createSuperPower(power)
    }

}
