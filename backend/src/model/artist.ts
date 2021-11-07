import * as Sequelize from 'sequelize';
import {sequelize} from '../config';
import {Optional, Model} from 'sequelize';
import {IsDate, IsNumber, IsOptional, IsString} from 'class-validator';

export interface ArtistAttributes {
    id: number,
    name: string,
}

export interface ArtistCreationAttributes extends Optional<ArtistAttributes, 'id'> {
}

interface ArtistInstance
    extends Model<ArtistAttributes, ArtistCreationAttributes>, ArtistAttributes {
}

export const Artist = sequelize.define<ArtistInstance>('Artist', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: Sequelize.STRING,
});

export class GetAllArtistsQuery {
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
}