import {instance} from './api';

export const artistAPI = {
    getArtist(id) {
        return instance.get(`artist/${id}`);
    },
    getArtists(offset, limit, sort) {
        return instance.get(`artists?offset=${offset}&limit=${limit}&sort=${sort}`);
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