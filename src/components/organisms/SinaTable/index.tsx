import React, { useState } from 'react';
import {
    Table,
    TableContainer,
} from '@mui/material';
import styles from './sinatable.module.css'
import SinaTableHead from '../../molecules/SinaTableHead';
import SinaTableBody from '../../molecules/SinaTableBody';

export interface Registro {
    folio: number;
    razonSocial: string;
    fecha: Date;
    miInstitucion: boolean;
}
const listOfHeaders = [
    "Acción",
    "Folio",
    "Razón Social",
    "Fecha y hora de carga"
]

const registros: Registro[] = [
    {
        folio: 1000,
        razonSocial: "Agricola los claveles",
        fecha: new Date(Date.now() + 1000),
        miInstitucion: false,
    },
    {
        folio: 1001,
        razonSocial: "WOM chile",
        fecha: new Date(Date.now() + 2000),
        miInstitucion: false,
    },
    {
        folio: 1002,
        razonSocial: "Savory Ltda",
        fecha: new Date(Date.now() + 3000),
        miInstitucion: true,
    },
    {
        folio: 1003,
        razonSocial: "Mintlab Co S.A.",
        fecha: new Date(Date.now() + 4000),
        miInstitucion: true,
    },
];

const SinaTable = () => {

    const [order, setOrder] = useState<any>('asc');
    const [orderBy, setOrderBy] = useState<any>('razonSocial');

    const handleSort = (property: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedData = [...registros].sort((a: any, b: any) => {
        if (order === 'asc') {
            return a[orderBy] < b[orderBy] ? -1 : 1;
        } else {
            return a[orderBy] > b[orderBy] ? -1 : 1;
        }
    });

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
                    <SinaTableBody registros={sortedData} />
                </Table>
            </TableContainer>
            {/* <div className={styles.sinatable_footer}>
                <Box display="flex" alignItems="center">
                    <Typography>Registros por página:</Typography>
                    <FormControl variant="standard" sx={{ ml: 1, minWidth: 50 }}>
                        <Select
                            value={"recordsPerPage"}
                            onChange={(event) => { }}
                        >
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={16}>16</MenuItem>
                            <MenuItem value={24}>24</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography sx={{ ml: 2 }}>Página 1 de 130</Typography>
                    <Box sx={{ ml: 2 }}>
                        <Pagination
                            count={130}
                            shape="rounded"
                            variant="outlined"
                            hideNextButton
                            hidePrevButton
                            color="primary"
                        //     renderItem={(item) => (
                        //         <Pagination.Item
                        //             {...item}
                        //             component={item.page === 1 ? ArrowBackIosIcon : ArrowForwardIosIcon}
                        //         />
                        //     )
                        // }
                        />
                    </Box>
                </Box>
            </div> */}
        </div>
    )
}

export default SinaTable