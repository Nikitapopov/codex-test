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
import {GetAllSongsQuery} from '../model/song';
import {SongService} from '../services/Song.service';

@JsonController('/song')
export class SongController {
    readonly service: SongService;
    constructor() {
        this.service = new SongService();
    }
    
    @Get('/:id')
    @Header('Access-Control-Allow-Origin', '*')
    async getOne(@Param('id') id: number) {
        return await this.service.getOne(id);
    }

    @Get('s/')
    @Header('Access-Control-Allow-Origin', '*')
    async getAll(@QueryParams() queryParams: GetAllSongsQuery) {
        const {offset, limit, sortBy = 'createdAt', sortOrder = 'ASC', artistIds, namePart, dateFrom, dateTo} = queryParams;
        return await this.service.getAll(offset, limit, sortBy, sortOrder, artistIds, namePart, dateFrom, dateTo);
    }

    @Post()
    @Header('Access-Control-Allow-Origin', '*')
    async addSong(@Body() body: { name: string, artistId: number }) {
        return await this.service.addSong(body.name, body.artistId);
    }

    @Put('/:id')
    @Header('Access-Control-Allow-Origin', '*')
    async updateSong(@Param('id') id: number, @Body() body: { name: string }) {
        return await this.service.updateSong(id, body.name);
    }

    @Delete('/:id')
    @Header('Access-Control-Allow-Origin', '*')
    async deleteSong(@Param('id') id: number) {
        return await this.service.deleteSong(id);
    }
}