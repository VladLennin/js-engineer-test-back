import {Body, Controller, Get, Module, Post, Req} from '@nestjs/common';
import {SuperPowersService} from "./superpowers.service";

@Controller("superpower")
export class SuperPowersController {

    constructor(private superpowerService: SuperPowersService) {
    }

    @Post()
    createSuperPower(@Body("power") power: string) {
        return this.superpowerService.createSuperPower(power)
    }

    @Get()
    getSuperpowers() {
        return this.superpowerService.getAllSuperpowers()
    }

}
