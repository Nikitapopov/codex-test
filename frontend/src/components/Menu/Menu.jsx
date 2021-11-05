import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import s from './Menu.module.sass';
import Table from "../Table/Table";
import {artistAPI} from '../../api/artist';
import {songAPI} from '../../api/song';

const Menu = (props) => {
    const [artists, setArtists] = useState([]);
    const [artistsSort, setArtistsSort] = useState('asc');
    const [artistsRowsPerPage, setArtistsRowsPerPage] = useState(10);
    const [artistsPage, setArtistsPage] = useState(0);
    const [artistsCount, setArtistsCount] = useState(0);
    // const [artistsSearch, setArtistSearch] = useState('');
    // const [artistsCreateDate, setArtistsCreateDate] = useState({from: null, to: null});
    // const [newArtistValue, setNewArtistValue] = useState('');

    useEffect(async () => {
        const artists = await artistAPI.getArtists((artistsPage) * artistsRowsPerPage, artistsRowsPerPage, artistsSort);
        setArtists(artists.data.rows);
        setArtistsCount(artists.data.count)
    }, [artistsSort, artistsRowsPerPage, artistsPage]);
    const onClickArtistRow = (id) => {
        setCurrArtist(id);
    }

    const [currArtist, setCurrArtist] = useState(null);
    const [songs, setSongs] = useState([]);
    const [songsSort, setSongsSort] = useState('asc');
    const [songsRowsPerPage, setSongsRowsPerPage] = useState(10);
    const [songsPage, setSongsPage] = useState(0);
    const [songsCount, setSongsCount] = useState(0);
    // const [songsSearch, setSongSearch] = useState('');
    // const [songsCreateDate, setSongsCreateDate] = useState({from: null, to: null});
    // const [newSongValue, setNewSongValue] = useState('');
    useEffect(async () => {
        if (currArtist) {
            const songs = await songAPI.getSongs(currArtist, (songsPage) * songsRowsPerPage, songsRowsPerPage, songsSort);
            setSongs(songs.data.rows);
            setSongsCount(songs.data.count)
        }
    }, [currArtist, artistsSort, artistsRowsPerPage, songsPage]);

    return (
        <section className={s.menu}>
            <div className={s.table}>
                <Table rows={artists}
                       sort={artistsSort}
                       rowsPerPage={artistsRowsPerPage}
                       page={artistsPage}
                       count={artistsCount}
                       setSort={setArtistsSort}
                       setRowsPerPage={setArtistsRowsPerPage}
                       setPage={setArtistsPage}
                       onClickRow={onClickArtistRow}
                />
            </div>
            <div className={s.table}>
                <Table rows={songs}
                       sort={songsSort}
                       rowsPerPage={songsRowsPerPage}
                       page={songsPage}
                       count={songsCount}
                       setSort={setSongsSort}
                       setRowsPerPage={setSongsRowsPerPage}
                       setPage={setSongsPage}
                       onClickRow={()=>{}}
                />
            </div>
        </section>
    )
};

export default Menu;