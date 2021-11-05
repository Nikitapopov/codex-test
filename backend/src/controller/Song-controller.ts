import {
    Body,
    Controller,
    Delete,
    Get, Header,
    JsonController,
    OnUndefined,
    Param,
    Post,
    Put,
    QueryParams, UseAfter
} from 'routing-controllers';
import 'reflect-metadata';
import {Info} from '../model/info';
import {v4 as uuid} from 'uuid';
import {Artist, ArtistCreationAttributes} from '../model/artist';
import {Song} from '../model/song';
import {Op} from 'sequelize';

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
    async getAll(@QueryParams() queryParams: { offset: number, limit: number, sortBy: string, sortOrder: 'ASC' | 'DESC', artistIds: string[] }) {
        const {offset, limit, sortBy = 'createdAt', sortOrder = 'ASC', artistIds} = queryParams;
        const sort = [[sortBy, sortOrder]];

        const artists = (await Song.findAndCountAll({
            raw: true,
            offset,
            limit,
            order: sort,
            where: artistIds
                ? Array.isArray(artistIds)
                    ? {
                        [Op.or]: artistIds.map(id => ({artistId: id}))
                    }
                    : {
                        [Op.or]: [{artistId: artistIds}]
                    }
                : {}
        }));
        console.log('artists', artists);
        return artists ? artists : [];
    }

    @Post()
    @Header('Access-Control-Allow-Origin', '*')
    async addSong(@Body() body: { name: string, artistId: number }) {
        console.log(body);
        if (!body.name)
            throw new Error('name is not defined');
        if (!body.artistId)
            throw new Error('artist id is not defined');

        return await Song.create({name: body.name, artistId: body.artistId});
    }

    @Put('/:id')
    @Header('Access-Control-Allow-Origin', '*')
    async updateSong(@Param('id') id: string, @Body() body: { name: string, artistId: number }) {
        if (!body.name)
            throw new Error('name is not defined');
        if (!body.artistId)
            throw new Error('artist id is not defined');
        const artist = (await Artist.findByPk(body.artistId));
        if (!artist)
            throw new Error(`Artist with id ${body.artistId} not found`);
        const song = (await Song.findByPk(id));
        if (!song)
            throw new Error(`Song with id ${id} not found`);
        song.name = body.name;
        song.artistId = body.artistId;
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