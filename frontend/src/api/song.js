import {instance} from './api';

export const songAPI = {
    getSong(id) {
        return instance.get(`song/${id}`);
    },
    getSongs(artistId, offset, limit, sort) {
        artistId = [artistId]
        return instance.get(`songs?${artistId.map(id => `artistIds[]=${id}`).join('&')}&offset=${offset}&limit=${limit}&sort=${sort}`);
    },
    addSong(name) {
        return instance.post('song', {name});
    },
    updateSong(id, name) {
        return instance.put(`song/${id}`, {name});
    },
    deleteSong(id) {
        return instance.delete(`song/${id}`);
    },
};