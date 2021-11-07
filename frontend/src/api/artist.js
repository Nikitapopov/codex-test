import {instance} from './api';

export const artistAPI = {
    getArtist(id) {
        return instance.get(`artist/${id}`);
    },
    getArtists(offset, limit, sort, namePart = '', dateFrom, dateTo) {
        let query = `artists?offset=${offset}&limit=${limit}&sort=${sort}`;
        if (namePart)
            query += `&namePart=${namePart}`;
        if (dateFrom)
            query += `&dateFrom=${dateFrom}`;
        if (dateTo)
            query += `&dateTo=${dateTo}`;
        return instance.get(query);
    },
    addArtist(name) {
        return instance.post('artist', {name});
    },
    updateArtist(id, name) {
        return instance.put(`artist/${id}`, {name});
    },
    deleteArtist(id) {
        return instance.delete(`artist/${id}`);
    },
};