import SinaTableCtaIcons from '@/components/atoms/SinaTableCtaIcons';
import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react'

const RenderTable = ({ declaraciones, page, rowsPerPage, handleDeleteModal, openModalWithDeclaracion }: any) => {

    return declaraciones
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((declaracion: any) => (
            <TableRow key={declaracion.correlativo_declaracion}>
                <SinaTableCtaIcons
                    handleDelete={() => handleDeleteModal(declaracion)}
                    handleDownload={() => { }}
                />
                <TableCell>{declaracion.correlativo_declaracion}</TableCell>
                <TableCell>
                    <Button
                        onClick={() => openModalWithDeclaracion(declaracion)}
                    >
                        {`${declaracion.razon_social}`.toUpperCase()}
                    </Button>
                </TableCell>
                <TableCell>
                    {`${declaracion.fechahora_creacion}`.slice(0, 10).replace(/-/g, "/")}
                </TableCell>
                <TableCell>
                    {`${declaracion.fecha_envio_archivo}`.replace(/-/g, "/")}
                </TableCell>
            </TableRow>
        ));
}

export default RenderTable