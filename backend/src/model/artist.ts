import * as Sequelize from 'sequelize';
import {Model, Optional} from 'sequelize';
import {sequelize} from '../config';

export interface ArtistAttributes {
    id: number,
    name: string,
}

export interface ArtistCreationAttributes extends Optional<ArtistAttributes, 'id'> {
}

export interface ArtistInstance
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

