import React, { useState } from 'react'
import { TableBody, TableRow, TableCell } from '@mui/material'
import SinaTableCtaIcons from '../../atoms/SinaTableCtaIcons';
import { Declaracion } from '@/application';
import { SinaTableModal } from '@/components/organisms/SinaTableModal';
import useModalHandle from '@/custom-hooks/useModalHandle';
import './sinatablebody.css'
type SinaTableBodyProps = {
    declaraciones: Declaracion[]
}

const SinaTableBody = ({ declaraciones }: SinaTableBodyProps) => {
    return (
        <TableBody>
            {
                declaraciones.map((declaracion) => (
                    <TableRow
                        key={`${declaracion.id}`}
                        className='hover-effect active-effect clickable-effect'
                    >
                        <SinaTableCtaIcons />
                        <TableCell>{declaracion.folio}</TableCell>
                        <TableCell>{declaracion.persona_juridica.nombre}</TableCell>
                        <TableCell>{new Date(declaracion.fecha_declaracion).toISOString()}</TableCell>
                        <TableCell>{new Date(declaracion.fecha_carga_declaracion).toISOString()}</TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    )
}

export default SinaTableBody