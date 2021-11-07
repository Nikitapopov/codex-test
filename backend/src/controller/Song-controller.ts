import {
    Body,
    Delete,
    Get, Header,
    JsonController,
    Param,
    Post,
    Put,
    QueryParams
} from 'routing-controllers';
import 'reflect-metadata';
import {GetAllSongsQuery, Song} from '../model/song';
import {Op} from 'sequelize';
import {OrderItem} from 'sequelize/types/lib/model';

@JsonController('/song')
export class SongController {
    @Get('/:id')
    @Header('Access-Control-Allow-Origin', '*')
    async getOne(@Param('id') id: string) {
        const song = await Song.findByPk(id);
        if (!song)
            throw new Error(`Song with id ${id} not found`);
        return song.get();
    }

    @Get('s/')
    @Header('Access-Control-Allow-Origin', '*')
    async getAll(@QueryParams() queryParams: GetAllSongsQuery) {
        const {offset, limit, sortBy = 'createdAt', sortOrder = 'ASC', artistIds, namePart, dateFrom, dateTo} = queryParams;
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

    @Post()
    @Header('Access-Control-Allow-Origin', '*')
    async addSong(@Body() body: { name: string, artistId: number }) {
        if (!body.name)
            throw new Error('name is not defined');
        if (!body.artistId)
            throw new Error('artist id is not defined');

        return await Song.create({name: body.name, artistId: body.artistId});
    }

    @Put('/:id')
    @Header('Access-Control-Allow-Origin', '*')
    async updateSong(@Param('id') id: string, @Body() body: { name: string }) {
        if (!body.name)
            throw new Error('name is not defined');
        const song = (await Song.findByPk(id));
        if (!song)
            throw new Error(`Song with id ${id} not found`);
        song.name = body.name;
        return await song.save();
    }

    @Delete('/:id')
    @Header('Access-Control-Allow-Origin', '*')
    async deleteSong(@Param('id') id: string) {
        const song = (await Song.findByPk(id));
        if (!song)
            throw new Error(`Song with id ${id} not found`);
        return await song.destroy();
    }
}