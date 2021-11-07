import {registerDecorator, ValidationArguments, ValidationOptions} from 'class-validator';
import {artistBlackList} from '../etc/artistBlackList';

export function ArtistNameValidator(property: string, forbiddenName: string, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'artistNameValidator',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    //todo возможно переделать на расстояние левенштейна
                    const artist = artistBlackList.find(artist => artist.name === forbiddenName);
                    if (artist) {
                        console.log('artist',!value.match(artist.regex));
                        return !value.match(artist.regex);
                    }
                },
            },
        });
    };
}