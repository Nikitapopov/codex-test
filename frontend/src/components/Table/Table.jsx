import * as React from 'react';
import {
    useTheme, Box,
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    Paper,
    IconButton,
    TextField,
    ClickAwayListener
} from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import {Delete as DeleteIcon, Edit as EditIcon, Done as DoneIcon, Search as SearchIcon} from '@mui/icons-material';
import {useState} from "react";

function TablePaginationActions(props) {
    const theme = useTheme();
    const {count, page, rowsPerPage, onPageChange} = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{flexShrink: 0, ml: 2.5}}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </Box>
    );
}

const Table = (props) => {
    const {title, rows, sort, rowsPerPage, page, count, setSort, setRowsPerPage, setPage, onClickRow, onDeleteClick, updateRow} = props;
    const [editingRowId, setEditingRowId] = useState(null);
    const [editingRowValue, setEditingRowValue] = useState('');
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = rowsPerPage - rows.length;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onEditClick = (id) => {
        setEditingRowId(id);
    };
    const saveRowChanges = async (rowId, value) => {
        console.log('saveRowChanges', rowId, value)
        await updateRow(rowId, value);
        setEditingRowId(null);
    };

    return (
        <TableContainer component={Paper}>
            <TableRow key={'title'}><h1>{title}</h1></TableRow>
            <MuiTable sx={{minWidth: 500}} aria-label="custom pagination table">
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell
                                style={{width: 200}}
                                component="th"
                                scope="row"
                                onClick={() => onClickRow(row.id)}
                                // onDoubleClick={() => {
                                //     onEditClick(row.id);
                                // }}
                            >
                                {editingRowId === row.id
                                    ?
                                    <ClickAwayListener onClickAway={() => setEditingRowId(null)}>
                                        <div>
                                            <TextField defaultValue={row.name} onChange={(event) => {
                                                setEditingRowValue(event.target.value);
                                            }
                                            }/>
                                            <IconButton onClick={async () => await saveRowChanges(row.id, editingRowValue)}>
                                                <DoneIcon/>
                                            </IconButton>
                                        </div>
                                    </ClickAwayListener>
                                    : row.name
                                }
                            </TableCell>
                            <TableCell style={{width: 30}} align="right">
                                <IconButton color="primary" component="span" onClick={() => onDeleteClick(row.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell style={{width: 30}} align="right">
                                <IconButton color="primary" component="span" onClick={() => onEditClick(row.id)}>
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{height: 53 * emptyRows}}>
                            <TableCell colSpan={6}/>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                            colSpan={3}
                            count={count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </MuiTable>
        </TableContainer>
    );
};

export default Table;