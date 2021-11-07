import {ArtistNameValidator} from '../validators/artist-name.validator';

export class AddArtistQuery {
    @ArtistNameValidator('name', 'monetochka')
    name: string;
}