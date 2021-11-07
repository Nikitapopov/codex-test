import React, { useState, useEffect } from 'react';
import s from './Menu.module.sass';
import {artistAPI} from '../../api/artist';
import {songAPI} from '../../api/song';
import Songs from "../Songs/Songs";
import Artists from "../Artists/Artists";

const Menu = (props) => {
    const [artists, setArtists] = useState([]);
    const [artistsSort, setArtistsSort] = useState('asc');
    const [artistsRowsPerPage, setArtistsRowsPerPage] = useState(10);
    const [artistsPage, setArtistsPage] = useState(0);
    const [artistsCount, setArtistsCount] = useState(0);
    const [artistsSearch, setArtistSearch] = useState('');
    const [artistsCreationDateFrom, setArtistsCreationDateFrom] = useState(null);
    const [artistsCreationDateTo, setArtistsCreationDateTo] = useState(null);

    useEffect(async () => {
        await getArtists();
    }, [artistsSort, artistsRowsPerPage, artistsPage, artistsSearch, artistsCreationDateFrom, artistsCreationDateTo]);

    const getArtists = async () => {
        const artists = await artistAPI.getArtists(
            (artistsPage) * artistsRowsPerPage,
            artistsRowsPerPage,
            artistsSort,
            artistsSearch,
            artistsCreationDateFrom,
            artistsCreationDateTo
        );
        setArtists(artists.data.rows);
        setArtistsCount(artists.data.count)
    }
    const onClickArtistRow = (id) => {
        setCurrArtistId(id);
        setCurrArtistName(artists.find(a => a.id === id));
    }

    const [currArtistId, setCurrArtistId] = useState(null);
    const [currArtistName, setCurrArtistName] = useState(null);
    const [songs, setSongs] = useState([]);
    const [songsSort, setSongsSort] = useState('asc');
    const [songsRowsPerPage, setSongsRowsPerPage] = useState(10);
    const [songsPage, setSongsPage] = useState(0);
    const [songsCount, setSongsCount] = useState(0);
    const [songsSearch, setSongSearch] = useState('');
    const [songsCreationDateFrom, setSongsCreationDateFrom] = useState(null);
    const [songsCreationDateTo, setSongsCreationDateTo] = useState(null);

    useEffect(async () => {
        await getSongs();
    }, [currArtistId, artistsSort, artistsRowsPerPage, songsPage, songsSearch, songsCreationDateFrom, songsCreationDateTo]);

    const getSongs = async () => {
        if (currArtistId) {
            const songs = await songAPI.getSongs(
                currArtistId,
                (songsPage) * songsRowsPerPage,
                songsRowsPerPage,
                songsSort,
                songsSearch,
                songsCreationDateFrom,
                songsCreationDateTo
            );
            setSongs(songs.data.rows);
            setSongsCount(songs.data.count)
        }
    }

    return (
        <section className={s.menu}>
            <Artists rows={artists}
                     sort={artistsSort}
                     rowsPerPage={artistsRowsPerPage}
                     page={artistsPage}
                     count={artistsCount}
                     setSort={setArtistsSort}
                     setRowsPerPage={setArtistsRowsPerPage}
                     setPage={setArtistsPage}
                     setSearch={setArtistSearch}
                     setCreationDateFrom={setArtistsCreationDateFrom}
                     setCreationDateTo={setArtistsCreationDateTo}
                     onClickRow={onClickArtistRow}
                     getData={getArtists}
            />
            <Songs rows={songs}
                   sort={songsSort}
                   rowsPerPage={songsRowsPerPage}
                   page={songsPage}
                   count={songsCount}
                   currArtist={currArtistName}
                   currArtistId={currArtistId}
                   setSort={setSongsSort}
                   setRowsPerPage={setSongsRowsPerPage}
                   setPage={setSongsPage}
                   setSearch={setSongSearch}
                   setCreationDateFrom={setSongsCreationDateFrom}
                   setCreationDateTo={setSongsCreationDateTo}
                   getData={getSongs}
            />
        </section>
    )
};

export default Menu;