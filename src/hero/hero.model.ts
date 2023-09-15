import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {SuperPower} from "../superpowers/superpowers.model";
import {HeroesSuperPowers} from "../superpowers/heroes-superpowers.model";
import {Image} from "../image/image.model";

interface HeroCreationAttr {
}

@Table({tableName: "heroes"})
export class Hero extends Model<Hero, HeroCreationAttr> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    nickname: string;

    @Column({type: DataType.STRING, allowNull: false})
    real_name: string;


    @Column({type: DataType.STRING, allowNull: false})
    origin_description: string;

    @Column({type: DataType.STRING, allowNull: false})
    catch_phrase: string;

    @HasMany(() => Image)
    images: Image[]

    @BelongsToMany(() => SuperPower, () => HeroesSuperPowers)
    superpowers: SuperPower[]

}