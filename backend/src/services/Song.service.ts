import {Artist, ArtistAttributes, ArtistInstance} from '../model/artist';
import {OrderItem} from "sequelize/types/lib/model";
import {Op} from "sequelize";
import {Song} from "../model/song";

export class SongService {
    async getOne(id: number): Promise<ArtistAttributes> {
        const song = await Song.findByPk(id);
        if (!song)
            throw new Error(`Song with id ${id} not found`);
        return song.get();
    }

    async getAll(offset: number, limit: number, sortBy: string, sortOrder: string, artistIds: number[], namePart: string, dateFrom: Date, dateTo: Date): Promise<{ rows: ArtistAttributes[]; count: number } | any[]> {
        const sort: OrderItem[] = [[sortBy, sortOrder]];

        const whereFilter = {};
        if (namePart)
            whereFilter['name'] = {
                [Op.substring]: namePart
            };
        if (artistIds) {
            whereFilter[Op.or] = Array.isArray(artistIds)
                ? artistIds.map(id => ({artistId: id}))
                : [{artistId: artistIds}];
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

        const artists = (await Song.findAndCountAll({
            raw: true,
            offset,
            limit,
            order: sort,
            where: whereFilter
        }));
        return artists ? artists : [];
    }

    async addSong(name: string, artistId: number): Promise<ArtistAttributes> {
        if (!name)
            throw new Error('name is not defined');
        if (!artistId)
            throw new Error('artist id is not defined');

        return await Song.create({name, artistId});

    }

    async updateSong(id: number, name: string): Promise<ArtistAttributes> {
        if (!name)
            throw new Error('name is not defined');
        const song = (await Song.findByPk(id));
        if (!song)
            throw new Error(`Song with id ${id} not found`);
        song.name = name;
        return await song.save();
    }

    async deleteSong(id: number): Promise<void> {
        const song = (await Song.findByPk(id));
        if (!song)
            throw new Error(`Song with id ${id} not found`);
        return await song.destroy();
    }
}