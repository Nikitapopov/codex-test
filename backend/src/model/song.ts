import * as Sequelize from 'sequelize';
import {sequelize} from '../config';
import {Model, Optional} from 'sequelize';


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