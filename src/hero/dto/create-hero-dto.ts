import {SuperPower} from "../../superpowers/superpowers.model";

export class CreateHeroDto {
    readonly nickname: string;
    readonly real_name: string;
    readonly origin_description: string;
    readonly superpowers: number[];
    readonly catch_phrase: string;
    readonly images: File[];
}