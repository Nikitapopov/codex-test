import React, {useState} from 'react';
import Table from "../Table/Table";
import {IconButton, TextField} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {Add as AddIcon, Search as SearchIcon} from "@mui/icons-material";
import {songAPI} from "../../api/song";

const Songs = (props) => {
    const {
        rows,
        sort,
        rowsPerPage,
        page,
        count,
        currArtistName,
        currArtistId,
        setSort,
        setRowsPerPage,
        setPage,
        setSearch,
        setCreationDateFrom,
        setCreationDateTo,
        getData
    } = props;
    const title = 'Песни' + (currArtistName ? ' ' + currArtistName : '');

    const [searchingInputValue, setSearchingInputValue] = useState(null);
    const [creationDateFromInputValue, setCreationDateFromInputValue] = useState('');
    const [creationDateToInputValue, setCreationDateToInputValue] = useState('');
    const [newRow, setNewRow] = useState('');

    const onDeleteClick = async (id) => {
        await songAPI.deleteSong(id);
        await getData();
    }
    const onUpdateClick = async (id, value) => {
        await songAPI.updateSong(id, value);
        await getData();
    }
    const onAddClick = async (artistId, name) => {
        await songAPI.addSong(artistId, name);
        await getData();
    }

    return (
        <div>
            <Table title={title}
                   rows={rows}
                   sort={sort}
                   rowsPerPage={rowsPerPage}
                   page={page}
                   count={count}
                   setSort={setSort}
                   setRowsPerPage={setRowsPerPage}
                   setPage={setPage}
                   onClickRow={() => {
                   }}
                   onDeleteClick={onDeleteClick}
                   updateRow={onUpdateClick}
            />
            <TextField label="Поиск"
                       value={searchingInputValue}
                       onChange={(event) => {
                           setSearchingInputValue(event.target.value);
                       }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    label="Дата создания (От)"
                    inputFormat="MM/dd/yyyy"
                    value={creationDateFromInputValue}
                    onChange={setCreationDateFromInputValue}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                    label="Дата создания (До)"
                    inputFormat="MM/dd/yyyy"
                    value={creationDateToInputValue}
                    onChange={setCreationDateToInputValue}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <IconButton color="primary" aria-label="directions" onClick={() => {
                setSearch(searchingInputValue);
                if (new Date(creationDateFromInputValue).toDateString() !== 'Invalid Date') {
                    setCreationDateFrom(creationDateFromInputValue.toString());
                }
                if (new Date(creationDateToInputValue).toDateString() !== 'Invalid Date') {
                    setCreationDateTo(creationDateToInputValue.toString());
                }
            }}>
                <SearchIcon/>
            </IconButton>

            <TextField label="Добавить песню"
                       value={newRow}
                       onChange={(event) => {
                           setNewRow(event.target.value);
                       }}
            />
            <IconButton color="primary" aria-label="directions" disabled={currArtistId === null} onClick={async () => {
                await onAddClick(currArtistId, newRow);
            }}>
                <AddIcon/>
            </IconButton>
        </div>
    );
};

export default Songs;