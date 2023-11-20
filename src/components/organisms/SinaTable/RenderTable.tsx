import { BfDataProcessDeclaraciones } from '@/application';
import SinaTableCtaIcons from '@/components/atoms/SinaTableCtaIcons';
import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react'

type RenderTableProps = {
    declaraciones: BfDataProcessDeclaraciones[] | null;
    handleDeleteModal: (declaracion: BfDataProcessDeclaraciones) => void;
    openModalWithDeclaracion: (declaracion: BfDataProcessDeclaraciones) => any;
}

const RenderTable = ({ declaraciones, handleDeleteModal, openModalWithDeclaracion }: RenderTableProps) => {
    if (!declaraciones) return <TableRow><TableCell colSpan={5}>Fetch Data...</TableCell></TableRow>
    if (declaraciones.length === 0) return <TableRow><TableCell colSpan={5}>Fetch Data...</TableCell></TableRow>
    return declaraciones
        .map((declaracion: BfDataProcessDeclaraciones) => (
            <TableRow key={declaracion.id}>
                <SinaTableCtaIcons
                    handleDelete={() => handleDeleteModal(declaracion)}
                    handleDownload={() => { }}
                />
                <TableCell>{declaracion.num_declaracion}</TableCell>
                <TableCell>
                    <Button
                        onClick={() => openModalWithDeclaracion(declaracion)}
                    >
                        {declaracion?.bf_data_process_personasjuridicas?.[0]?.razon_social?.toUpperCase() ?? ""}
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