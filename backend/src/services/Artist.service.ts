import {Artist, ArtistAttributes, ArtistInstance} from '../model/artist';
import {OrderItem} from "sequelize/types/lib/model";
import {Op} from "sequelize";

export class ArtistService {
    async getOne(id: number): Promise<ArtistAttributes> {
        const artist = await Artist.findByPk(id);
        if (!artist)
            throw new Error(`Artist with id ${id} not found`);
        return artist.get();
    }

    async getAll(offset: number, limit: number, sortBy: string, sortOrder: string, namePart: string, dateFrom: Date, dateTo: Date): Promise<{ rows: ArtistAttributes[]; count: number } | any[]> {
        const sort: OrderItem[] = [[sortBy, sortOrder]];
        const whereFilter = {};
        if (namePart) {
            whereFilter['name'] = {
                [Op.substring]: namePart
            };
        }
        if (dateFrom) {
            whereFilter['createdAt'] = {
                [Op.gt]: dateFrom,
            };
        }
        if (dateTo) {
            whereFilter['createdAt'] = {
                ...whereFilter['createdAt'],
                [Op.lt]: dateTo,
            };
        }

        const artists = (await Artist.findAndCountAll({raw: true, offset, limit, order: sort, where: whereFilter}));
        return artists ? artists : [];
    }

    async addArtist(name: string): Promise<ArtistAttributes> {
        if (!name)
            throw new Error('name is not defined');
        const duplicate = await Artist.findOne({where: {name}});
        if (duplicate)
            throw new Error(`Artist with name ${name} already exist`);

        return await Artist.create({name});
    }

    async updateArtist(id: number, name: string): Promise<ArtistAttributes> {
        if (!name)
            throw new Error('name is not defined');
        const artist = (await Artist.findByPk(id));
        if (!artist)
            throw new Error(`Artist with id ${id} not found`);
        artist.name = name;
        return await artist.save();
    }

    async deleteArtist(id: number): Promise<void> {
        const artist = (await Artist.findByPk(id));
        if (!artist)
            throw new Error(`Artist with id ${id} not found`);
        return await artist.destroy();
    }
}