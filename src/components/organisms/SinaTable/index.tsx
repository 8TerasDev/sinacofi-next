import React, { useState } from 'react';
import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
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

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);


    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    return (
        <div className={styles.sinatable_container}>
            <TableContainer>
                <Table>
                    <SinaTableHead listOfHeaders={listOfHeaders} />
                    <SinaTableBody declaraciones={declaraciones} />
                    <TableFooter >
                        <TableRow sx={{ boxSizing: "border-box" }}>
                            <TableCell colSpan={5} >
                                <Grid container justifyContent="end" alignItems="center" >
                                    <Grid item>
                                        <FormControl variant="outlined">
                                            <InputLabel>Rows</InputLabel>
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
                                            count={declaraciones.length}
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