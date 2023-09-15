import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Hero} from "../hero/hero.model";

interface ImageCreationAttribute {
}

@Table({tableName: "images"})
export class Image extends Model<Image, ImageCreationAttribute> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    href: string;

    @ForeignKey(() => Hero)
    @Column({type: DataType.INTEGER})
    heroId: number

}