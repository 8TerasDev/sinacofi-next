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
import { disablePJuridicasAxios } from '@/lib/pjuridica.prisma';
import { DeleteModal } from '../DeleteModal';
import RenderTable from './RenderTable';


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

const SinaTable = () => {
    const { state, dispatch, reloadDeclaraciones } = useContext(DeclaracionesContext)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const [orderDirectionFecha, setorderDirectionFecha] = useState<'asc' | 'desc'>('asc');
    const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');

    const handleSortClickFechaHora = () => {
        const isAsc = orderDirectionFecha === 'asc';
        setorderDirectionFecha(isAsc ? 'desc' : 'asc');
        dispatch({ type: "SORT_BY_FECHA_CREACION", payload: isAsc });
    };
    const handleSortClickCarga = () => {
        const isAsc = orderDirection === 'asc';
        setOrderDirection(isAsc ? 'desc' : 'asc');
        dispatch({ type: "SORT_BY_FECHA_CARGA", payload: isAsc });
    };

    const [activeDeclaracion, activeDeclaracionSetter] = useState<PJuridicas>();
    const [nextDeclaracion, nextDeclaracionSetter] = useState<PJuridicas>();
    const [prevDeclaracion, prevDeclaracionSetter] = useState<PJuridicas>();
    const [openModal, openModalSetter] = useState<boolean>(false);
    const [currentDeclaracion, setCurrentDeclaracion] = useState();
    const [openDeleteModal, openDeleteModalSetter] = useState<boolean>(false);

    const handleDeleteModal = (declaracion: any) => {
        openDeleteModalSetter(openDeleteModal => !openDeleteModal);
        setCurrentDeclaracion(declaracion);
    }

    const getDeclaraciones = (declaracion: PJuridicas) => {
        const index = state.declaraciones.findIndex((item: any) => item.correlativo_declaracion === declaracion.correlativo_declaracion);
        const nextDeclaracion = index + 1 >= state.declaraciones.length ? state.declaraciones[index] : state.declaraciones[index + 1];
        const prevDeclaracion = index - 1 >= 0 ? state.declaraciones[index - 1] : state.declaraciones[index];
        return { nextDeclaracion, prevDeclaracion };
    };

    const openModalWithDeclaracion = (declaracion: PJuridicas) => {
        openModalSetter(true);
        const { nextDeclaracion, prevDeclaracion } = getDeclaraciones(declaracion);
        nextDeclaracionSetter(nextDeclaracion);
        prevDeclaracionSetter(prevDeclaracion);
        activeDeclaracionSetter(declaracion);
    };

    const handleNextDeclaracion = (declaracion: PJuridicas) => {
        const { nextDeclaracion, prevDeclaracion } = getDeclaraciones(declaracion);
        nextDeclaracionSetter(nextDeclaracion);
        prevDeclaracionSetter(prevDeclaracion);
        activeDeclaracionSetter(declaracion);
    };

    const handlePrevDeclaracion = (declaracion: PJuridicas) => {
        const { nextDeclaracion, prevDeclaracion } = getDeclaraciones(declaracion);
        nextDeclaracionSetter(nextDeclaracion);
        prevDeclaracionSetter(prevDeclaracion);
        activeDeclaracionSetter(declaracion);
    };


    const disableDeclaracion = (declaracion: any) => {
        console.log(declaracion.correlativo_declaracion)
        disablePJuridicasAxios(declaracion.correlativo_declaracion)
        reloadDeclaraciones()
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
                            <RenderTable
                                declaraciones={state.declaraciones}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                handleDeleteModal={handleDeleteModal}
                                openModalWithDeclaracion={openModalWithDeclaracion}
                            />
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[3, 5, 10]}
                        component="div"
                        count={state.declaraciones.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </div >
            {
                <SinaTableModal
                    declaracion={activeDeclaracion ? activeDeclaracion : state.declaraciones[0]}
                    isOpen={openModal}
                    onNextDeclaracion={() => { handleNextDeclaracion(nextDeclaracion!) }}
                    onPrevDeclaracion={() => { handlePrevDeclaracion(prevDeclaracion!) }}
                    handleClose={() => { openModalSetter(false) }}
                    handleDelete={handleDeleteModal}
                />
            }
            <DeleteModal
                open={openDeleteModal}
                handleClose={() => openDeleteModalSetter(false)}
                handleDelete={() => {
                    //console.log(currentDeclaracion);
                    currentDeclaracion && disableDeclaracion(currentDeclaracion)
                }}
            />
        </>
    )
}

export default SinaTable