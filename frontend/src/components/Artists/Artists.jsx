import React, {useState} from 'react';
import Table from "../Table/Table";
import {IconButton, TextField} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {Search as SearchIcon, Add as AddIcon} from "@mui/icons-material";
import {artistAPI} from "../../api/artist";

const Artists = (props) => {
    const {
        rows,
        sort,
        rowsPerPage,
        page,
        count,
        setSort,
        setRowsPerPage,
        setPage,
        setSearch,
        setCreationDateFrom,
        setCreationDateTo,
        onClickRow,
        getData
    } = props;

    const [searchingInputValue, setSearchingInputValue] = useState(null);
    const [artistsCreationDateFromInputValue, setArtistsCreationDateFromInputValue] = useState('');
    const [artistsCreationDateToInputValue, setArtistsCreationDateToInputValue] = useState('');
    const [newArtist, setNewArtist] = useState('');

    const onDeleteClick = async (id) => {
        await artistAPI.deleteArtist(id);
        await getData();
    }
    const onUpdateHandler = async (id, value) => {
        await artistAPI.updateArtist(id, value);
        await getData();
    }
    const onAddClick = async (value) => {
        await artistAPI.addArtist(value);
        await getData();
    }

    return (
        <div>
            <Table title={'Исполнители'}
                   rows={rows}
                   sort={sort}
                   rowsPerPage={rowsPerPage}
                   page={page}
                   count={count}
                   setSort={setSort}
                   setRowsPerPage={setRowsPerPage}
                   setPage={setPage}
                   onClickRow={onClickRow}
                   onDeleteClick={onDeleteClick}
                   updateRow={onUpdateHandler}
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
                    value={artistsCreationDateFromInputValue}
                    onChange={setArtistsCreationDateFromInputValue}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                    label="Дата создания (До)"
                    inputFormat="MM/dd/yyyy"
                    value={artistsCreationDateToInputValue}
                    onChange={setArtistsCreationDateToInputValue}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <IconButton color="primary" aria-label="directions" onClick={() => {
                setSearch(searchingInputValue);
                if (new Date(artistsCreationDateFromInputValue).toDateString() !== 'Invalid Date') {
                    setCreationDateFrom(artistsCreationDateFromInputValue.toString())
                }
                if (new Date(artistsCreationDateToInputValue).toDateString() !== 'Invalid Date') {
                    setCreationDateTo(artistsCreationDateToInputValue.toString())
                }
            }}>
                <SearchIcon/>
            </IconButton>

            <TextField label="Добавить исполнителя"
                       value={newArtist}
                       onChange={(event) => {
                           setNewArtist(event.target.value);
                       }}
            />
            <IconButton color="primary" aria-label="directions" onClick={async () => {
                await onAddClick(newArtist);
            }}>
                <AddIcon/>
            </IconButton>
        </div>
    );
};

export default Artists;