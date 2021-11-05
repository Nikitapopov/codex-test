import * as Sequelize from 'sequelize';
import {sequelize} from '../config';
import {Optional, Model} from 'sequelize';

export interface ArtistAttributes {
    id: number,
    name: string,
    // createdAt: Date,
    // updatedAt: Date,
    // deletedAt: Date,
}

// export interface ArtistModel extends Sequelize.Model<ArtistModel, ArtistAttributes> {
//     id: number
//     email: string
//     password: string
//     createdAt: string
//     updatedAt: string
// }

export interface ArtistCreationAttributes extends Optional<ArtistAttributes, 'id'> {}

interface ArtistInstance
    extends Model<ArtistAttributes, ArtistCreationAttributes>, ArtistAttributes {}

// export interface UserViewModel {
//     id: number
//     email: string
// }

// export const Artist = sequelize.define<UserModel, UserAddModel>('Artist', {
export const Artist = sequelize.define<ArtistInstance>('Artist', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: Sequelize.STRING,
});