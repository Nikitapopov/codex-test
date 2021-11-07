import * as Sequelize from 'sequelize';
import {sequelize} from '../config';
import {Model, Optional} from 'sequelize';
import {IsArray, IsDate, IsNumber, IsOptional, IsString} from 'class-validator';


export interface SongAttributes {
    id: number,
    name: string,
    artistId: number,
}

export interface SongCreationAttributes extends Optional<SongAttributes, 'id'> {}

interface SongInstance
    extends Model<SongAttributes, SongCreationAttributes>, SongAttributes {}


export const Song = sequelize.define<SongInstance>('Song', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: Sequelize.STRING,
    artistId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

export class GetAllSongsQuery {
    @IsNumber()
    @IsOptional()
    offset: number;

    @IsNumber()
    @IsOptional()
    limit: number;

    @IsString()
    @IsOptional()
    sortBy: string;

    @IsString()
    @IsOptional()
    sortOrder: 'ASC' | 'DESC';

    @IsString()
    @IsOptional()
    namePart: string;

    @IsDate()
    @IsOptional()
    dateFrom: Date;

    @IsDate()
    @IsOptional()
    dateTo: Date;

    @IsArray()
    artistIds: number[];
}