import {IsDate, IsNumber, IsOptional, IsString} from 'class-validator';

export class GetAllArtistsQuery {
    @IsNumber()
    @IsOptional()
    offset: number;

    @IsNumber()
    @IsOptional()
    limit: number;

    @IsString()
    @IsOptional()
    sortBy: string;

    @IsString()
    @IsOptional()
    sortOrder: 'ASC' | 'DESC';

    @IsString()
    @IsOptional()
    namePart: string;

    @IsDate()
    @IsOptional()
    dateFrom: Date;

    @IsDate()
    @IsOptional()
    dateTo: Date;
}