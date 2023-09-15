import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Hero} from "../hero/hero.model";
import {SuperPower} from "./superpowers.model";

@Table({
    tableName: "heroes_superpowers",
    createdAt: false,
    updatedAt: false
})
export class HeroesSuperPowers extends Model<HeroesSuperPowers> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true})
    id: number

    @ForeignKey(() => Hero)
    @Column({type: DataType.INTEGER, allowNull: false})
    heroId: number;

    @ForeignKey(() => SuperPower)
    @Column({type: DataType.INTEGER, allowNull: false})
    superpowerId: number;
}