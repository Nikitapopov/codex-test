import {
    Body,
    Controller,
    Delete,
    Get, Header,
    JsonController,
    OnUndefined,
    Param,
    Post, Put,
    QueryParams, UseAfter, UseBefore
} from 'routing-controllers';
import 'reflect-metadata';
import {Info} from '../model/info';
import {v4 as uuid} from 'uuid';
import {Artist, ArtistCreationAttributes} from '../model/artist';
import {Song} from '../model/song';

@JsonController('/artist')
export class ArtistController {
    @Get('/:id')
    @Header('Access-Control-Allow-Origin', '*')
    async getOne(@Param('id') id: string) {
        const artist = await Artist.findByPk(id);
        if (!artist)
            throw new Error(`Artist with id ${id} not found`);
        return artist.get();
    }

    @Get('s')
    @Header('Access-Control-Allow-Origin', '*')
    async getAll(@QueryParams() queryParams: { offset: number, limit: number, sortBy: string, sortOrder: 'ASC' | 'DESC' }) {
        const {offset, limit, sortBy = 'createdAt', sortOrder = 'ASC'} = queryParams;
        const sort = [[sortBy, sortOrder]];
        const artists = (await Artist.findAndCountAll({raw: true, offset, limit, order: sort}));
        return artists ? artists : [];
    }

    @Post()
    @Header('Access-Control-Allow-Origin', '*')
    async addArtist(@Body() body: { name: string }) {
        if (!body.name)
            throw new Error('name is not defined');
        const duplicate = await Artist.findOne({where: {name: body.name}});
        if (duplicate)
            throw new Error(`Artist with name ${body.name} already exist`);

        return await Artist.create({name: body.name});
    }

    @Put('/:id')
    @Header('Access-Control-Allow-Origin', '*')
    async updateArtist(@Param('id') id: string, @Body() body: { name: string }) {
        if (!body.name)
            throw new Error('name is not defined');
        const artist = (await Artist.findByPk(id));
        if (!artist)
            throw new Error(`Artist with id ${id} not found`);
        artist.name = body.name;
        return await artist.save();
    }

    @Delete('/:id')
    @Header('Access-Control-Allow-Origin', '*')
    async deleteArtist(@Param('id') id: string) {
        const artist = (await Artist.findByPk(id));
        if (!artist)
            throw new Error(`Artist with id ${id} not found`);
        return await artist.destroy();
    }
}