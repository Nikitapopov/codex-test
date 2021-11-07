import {instance} from './api';

export const songAPI = {
    getSong(id) {
        return instance.get(`song/${id}`);
    },
    getSongs(artistId, offset, limit, sort, namePart, dateFrom, dateTo) {
        artistId = [artistId];

        let query = `songs?${artistId.map(id => `artistIds[]=${id}`).join('&')}&offset=${offset}&limit=${limit}&sort=${sort}`;
        if (namePart)
            query += `&namePart=${namePart}`;
        if (dateFrom)
            query += `&dateFrom=${dateFrom}`;
        if (dateTo)
            query += `&dateTo=${dateTo}`;
        return instance.get(query);
    },
    addSong(artistId, name) {
        return instance.post('song', {artistId, name});
    },
    updateSong(id, name) {
        return instance.put(`song/${id}`, {name});
    },
    deleteSong(id) {
        return instance.delete(`song/${id}`);
    },
};