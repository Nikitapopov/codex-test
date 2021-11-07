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
import {Artist, GetAllArtistsQuery} from '../model/artist';
import {Op} from 'sequelize';
import {OrderItem} from 'sequelize/types/lib/model';

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
    async getAll(@QueryParams() queryParams: GetAllArtistsQuery) {
        const {offset, limit, sortBy = 'createdAt', sortOrder = 'ASC', namePart, dateFrom, dateTo} = queryParams;
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