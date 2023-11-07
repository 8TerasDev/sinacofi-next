import React, { useContext, useState } from 'react';
import {
    Button,
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
    TableSortLabel,
} from '@mui/material';
import styles from './sinatable.module.css'
import SinaTableHead from '../../molecules/SinaTableHead';
import SinaTableBody from '../../molecules/SinaTableBody';

import { Declaracion, PJuridicas } from '@/application';
import SinaTypography from '@/components/atoms/SinaTypography';
import SinaTableCtaIcons from '@/components/atoms/SinaTableCtaIcons';
import { SinaTableModal } from '../SinaTableModal';
import { DeclaracionesContext } from '@/contexts/declaraciones.context';


const listOfHeaders = [
    "Acción",
    "Folio",
    "Razón Social",
    "Fecha de declaración",
    "Fecha de carga",
]

interface SinaTableProps {
    declaraciones: PJuridicas[]
}
const compareFechaHoraCreacion = (a: PJuridicas, b: PJuridicas, direction: 'asc' | 'desc') => {
    if (a.fechahora_creacion! < b.fechahora_creacion!) {
        return direction === 'asc' ? -1 : 1;
    }
    if (a.fechahora_creacion! > b.fechahora_creacion!) {
        return direction === 'asc' ? 1 : -1;
    }
    return 0;
};

const compareFechaEnvioArchivo = (a: PJuridicas, b: PJuridicas, direction: 'asc' | 'desc') => {
    if (a.fecha_envio_archivo! < b.fecha_envio_archivo!) {
        return direction === 'asc' ? -1 : 1;
    }
    if (a.fecha_envio_archivo! > b.fecha_envio_archivo!) {
        return direction === 'asc' ? 1 : -1;
    }
    return 0;
};

const SinaTable = ({ declaraciones }: SinaTableProps) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reiniciar a la primera página cuando cambie el número de filas por página
    };
    const [orderDirectionFecha, setorderDirectionFecha] = useState<'asc' | 'desc'>('asc');
    const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
    const { state } = useContext(DeclaracionesContext)
    const [innerDeclaraciones, setDeclaraciones] = useState<PJuridicas[]>(state.declaraciones);

    const handleSortClickFechaHora = () => {
        const isAsc = orderDirectionFecha === 'asc';
        const sortedDeclaraciones = [...innerDeclaraciones].sort((a, b) => compareFechaHoraCreacion(a, b, isAsc ? 'asc' : 'desc'));
        setorderDirectionFecha(isAsc ? 'desc' : 'asc');
        setDeclaraciones(sortedDeclaraciones);
    };
    const handleSortClickCarga = () => {
        const isAsc = orderDirection === 'asc';
        const sortedDeclaraciones = [...innerDeclaraciones].sort((a, b) => compareFechaEnvioArchivo(a, b, isAsc ? 'asc' : 'desc'));
        setOrderDirection(isAsc ? 'desc' : 'asc');
        setDeclaraciones(sortedDeclaraciones);
    };

    const [activeDeclaracion, activeDeclaracionSetter] = useState<PJuridicas>();
    const [openModal, openModalSetter] = useState<boolean>(false);


    const openModalWithDeclaracion = (declaracion: any) => {
        openModalSetter(true)
        activeDeclaracionSetter(declaracion)
    }

    return (
        <>
            <div className={styles.sinatable_container}>
                <TableContainer component={Paper}>
                    <Table aria-label="tabla de personas jurídicas">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <SinaTypography>
                                        Acción
                                    </SinaTypography>
                                </TableCell>
                                <TableCell>
                                    <SinaTypography>
                                        Folio
                                    </SinaTypography>
                                </TableCell>
                                <TableCell>
                                    <SinaTypography>
                                        Razón Social
                                    </SinaTypography>
                                </TableCell>
                                <TableCell >
                                    <TableSortLabel
                                        active={true}
                                        direction={orderDirectionFecha}
                                        onClick={handleSortClickFechaHora}
                                    >
                                        <SinaTypography>
                                            Fecha de declaración
                                        </SinaTypography>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={true}
                                        direction={orderDirection}
                                        onClick={handleSortClickCarga}
                                    >
                                        <SinaTypography>
                                            Fecha de carga
                                        </SinaTypography>
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead >
                        <TableBody>
                            {React.Children.toArray(
                                innerDeclaraciones
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((declaracion) => (
                                        <TableRow>
                                            <SinaTableCtaIcons />
                                            <TableCell>{declaracion.correlativo_declaracion}</TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() => { openModalWithDeclaracion(declaracion) }}
                                                >
                                                    {`${declaracion.nombre_rep_legal}`.toUpperCase()}
                                                </Button>

                                            </TableCell>
                                            <TableCell>
                                                {`${declaracion.fechahora_creacion}`}
                                            </TableCell>
                                            <TableCell>
                                                {`${declaracion.fecha_envio_archivo}`}
                                            </TableCell>
                                        </TableRow>
                                    ))
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[3, 5, 10]}
                        component="div"
                        count={innerDeclaraciones.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </div >
            {
                <SinaTableModal
                    declaracion={activeDeclaracion ? activeDeclaracion : innerDeclaraciones[0]}
                    isOpen={openModal}
                    handleClose={() => { openModalSetter(false) }}
                />
            }</>
    )
}

export default SinaTable