import {
    Body,
    Delete,
    Get, Header,
    JsonController,
    Param,
    Post, Put,
    QueryParams
} from 'routing-controllers';
import 'reflect-metadata';
import {AddArtistQuery} from '../types/AddArtist';
import {ArtistService} from '../services/Artist.service';
import {GetAllArtistsQuery} from "../types/GetAllArtists";

@JsonController('/artist')
export class ArtistController {
    readonly service: ArtistService;
    constructor() {
        this.service = new ArtistService();
    }

    @Get('/:id')
    @Header('Access-Control-Allow-Origin', '*')
    async getOne(@Param('id') id: number) {
        return await this.service.getOne(id);
    }

    @Get('s')
    @Header('Access-Control-Allow-Origin', '*')
    async getAll(@QueryParams() queryParams: GetAllArtistsQuery) {
        const {offset, limit, sortBy = 'createdAt', sortOrder = 'ASC', namePart, dateFrom, dateTo} = queryParams;
        return await this.service.getAll(offset, limit, sortBy, sortOrder, namePart, dateFrom, dateTo);
    }

    @Post()
    @Header('Access-Control-Allow-Origin', '*')
    async addArtist(@Body() body: AddArtistQuery) {
        return await this.service.addArtist(body.name);
    }

    @Put('/:id')
    @Header('Access-Control-Allow-Origin', '*')
    async updateArtist(@Param('id') id: number, @Body() body: AddArtistQuery) {
        return await this.service.updateArtist(id, body.name);
    }

    @Delete('/:id')
    @Header('Access-Control-Allow-Origin', '*')
    async deleteArtist(@Param('id') id: number) {
        return await this.service.deleteArtist(id);
    }
}