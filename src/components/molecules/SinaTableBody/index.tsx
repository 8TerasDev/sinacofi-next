import React from 'react'
import { TableBody, TableRow, TableCell } from '@mui/material'
import SinaTableCtaIcons from '../../atoms/SinaTableCtaIcons';
import { Declaracion } from '@/application';

type SinaTableBodyProps = {
    registros: Declaracion[]
}

const SinaTableBody = ({ registros }: SinaTableBodyProps) => {
    return (
        <TableBody>
            {
                React.Children.toArray(registros.map(
                    (registro: Declaracion) => {
                        return (
                            <TableRow>
                                <SinaTableCtaIcons />
                                <TableCell>{registro.folio}</TableCell>
                                <TableCell>{registro.persona_juridica.nombre}</TableCell>
                                <TableCell>{new Date(registro.fecha_declaracion).toISOString()}</TableCell>
                                <TableCell>{new Date(registro.fecha_carga_declaracion).toISOString()}</TableCell>
                            </TableRow>
                        )
                    }
                ))
            }
        </TableBody>
    )
}

export default SinaTableBody