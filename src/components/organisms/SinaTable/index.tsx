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
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


const listOfHeaders = [
    "Acción",
    "Folio",
    "Razón Social",
    "Fecha de declaración",
    "Fecha de carga",
]

const columns: GridColDef[] = [
    { field: 'Acción', headerName: 'Acción', width: 100 },
    { field: 'folio', headerName: 'Folio', width: 150 },
    { field: 'persona_juridica', headerName: 'Razón Social', width: 150 },
    { field: 'fecha_declaracion', headerName: 'Fecha de declaración', width: 150 },
    { field: 'fecha_carga_declaracion', headerName: 'Fecha de carga', width: 150 },
]

interface SinaTableProps {
    declaraciones: Declaracion[]
}
function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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
                                                <MenuItem value={15}>10</MenuItem>
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