import React from 'react'
import { TableBody, TableRow, TableCell } from '@mui/material'
import SinaTableCtaIcons from '../../atoms/SinaTableCtaIcons';

interface Registro {
    folio: number;
    razonSocial: string;
    fecha: Date;
    miInstitucion: boolean;
}

type SinaTableBodyProps = {
    registros: Registro[]
}

const SinaTableBody = ({ registros }: SinaTableBodyProps) => {
    return (
        <TableBody>
            {
                React.Children.toArray(registros.map(
                    (registro: Registro) => {
                        return (
                            <TableRow>
                                <SinaTableCtaIcons registro={registro} />
                                <TableCell>{registro.folio}</TableCell>
                                <TableCell>{registro.razonSocial}</TableCell>
                                <TableCell>{registro.fecha.toISOString()}</TableCell>
                            </TableRow>
                        )
                    }
                ))
            }
        </TableBody>
    )
}

export default SinaTableBody