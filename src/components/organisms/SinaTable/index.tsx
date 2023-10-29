import React, { useState } from 'react';
import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
} from '@mui/material';
import styles from './sinatable.module.css'
import SinaTableHead from '../../molecules/SinaTableHead';
import SinaTableBody from '../../molecules/SinaTableBody';
import { Declaracion } from '@/application';

const listOfHeaders = [
    "Acción",
    "Folio",
    "Razón Social",
    "Fecha de declaración",
    "Fecha de carga",
]

interface SinaTableProps {
    declaraciones: Declaracion[]
}

const SinaTable = ({ declaraciones }: SinaTableProps) => {

    const [order, setOrder] = useState<any>('asc');
    const [orderBy, setOrderBy] = useState<any>('razonSocial');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);



    const handleSort = (property: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedData = [...declaraciones].sort((a: any, b: any) => {
        if (order === 'asc') {
            return a[orderBy] < b[orderBy] ? -1 : 1;
        } else {
            return a[orderBy] > b[orderBy] ? -1 : 1;
        }
    });

    const rowsPerPageData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    return (
        <div className={styles.sinatable_container}>
            <TableContainer>
                <Table>
                    <SinaTableHead
                        listOfHeaders={listOfHeaders}
                        orderBy={orderBy}
                        onClick={() => handleSort('razonSocial')}
                        order={order}
                        name={'razonSocial'}
                        onClick2={() => handleSort('fecha')}
                        name2={'fecha'}
                    />
                    <SinaTableBody registros={rowsPerPageData} />
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4} style={{ padding: '16px 0' }}>
                                <Grid container justifyContent="end" alignItems="center" spacing={2}>
                                    <Grid item>
                                        <FormControl variant="outlined">
                                            <InputLabel>Rows Per Page</InputLabel>
                                            <Select
                                                value={rowsPerPage}
                                                onChange={(e: any) => setRowsPerPage(e.target.value)}
                                                label="Rows Per Page"
                                            >
                                                <MenuItem value={5}>5</MenuItem>
                                                <MenuItem value={10}>10</MenuItem>
                                                <MenuItem value={15}>15</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <TablePagination
                                            rowsPerPageOptions={[]} // We hide this because we've provided a custom rows per page dropdown
                                            component="div"
                                            count={sortedData.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={() => { }} // We handle this with our custom dropdown
                                        />
                                    </Grid>
                                </Grid>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    )
}

export default SinaTable