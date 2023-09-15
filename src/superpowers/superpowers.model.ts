import {Column, DataType, Model, Table} from "sequelize-typescript";

interface SuperPowerCreationAttr {
}

@Table({tableName: "superpowers"})
export class SuperPower extends Model<SuperPower, SuperPowerCreationAttr> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    power: string;
}