import { BfDataProcessDeclaraciones } from '@/application';
import SinaTableCtaIcons from '@/components/atoms/SinaTableCtaIcons';
import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react'

type RenderTableProps = {
    declaraciones: BfDataProcessDeclaraciones[] | null;
    page: number;
    rowsPerPage: number;
    handleDeleteModal: (declaracion: BfDataProcessDeclaraciones) => void;
    openModalWithDeclaracion: (declaracion: BfDataProcessDeclaraciones) => void;
}

const RenderTable = ({ declaraciones, page, rowsPerPage, handleDeleteModal, openModalWithDeclaracion }: RenderTableProps) => {
    if (!declaraciones) return <TableRow><TableCell colSpan={5}>Fetch Data...</TableCell></TableRow>
    if (declaraciones.length === 0) return <TableRow><TableCell colSpan={5}>Fetch Data...</TableCell></TableRow>
    return declaraciones
        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((declaracion: BfDataProcessDeclaraciones) => (
            <TableRow key={declaracion.id}>
                <SinaTableCtaIcons
                    handleDelete={() => handleDeleteModal(declaracion)}
                    handleDownload={() => { }}
                />
                <TableCell>{declaracion.correlativo}</TableCell>
                <TableCell>
                    <Button
                        onClick={() => openModalWithDeclaracion(declaracion)}
                    >
                        {`${declaracion.personas_juridicas[0]?.razon_social}`.toUpperCase()}
                    </Button>
                </TableCell>
                <TableCell>
                    {`${declaracion.fecha_declaracion}`.slice(0, 10).replace(/-/g, "/")}
                </TableCell>
                <TableCell>
                    {`${declaracion.fecha_subida}`.slice(0, 10).replace(/-/g, "/")}
                </TableCell>
            </TableRow>
        ));
}

export default RenderTable