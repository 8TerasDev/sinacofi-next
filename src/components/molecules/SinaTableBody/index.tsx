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
    const [openModal, setOpenModal] = useState(false);
    const [declaracionModal, setDeclaracionModal] = useState(false);

    return (
        <TableBody>
            {
                declaraciones.map((declaracion) => (
                    <TableRow
                        key={`${declaracion.id}`} // Asegúrate de que cada fila tenga una clave única
                        onClick={() => setDeclaracionModal(true)} // Configura la declaración actual al hacer clic
                        className='hover-effect active-effect clickable-effect'
                    >
                        <SinaTableCtaIcons />
                        {declaracionModal && (
                            <SinaTableModal
                                open={Boolean(declaracionModal)} // El modal está abierto si hay una declaración seleccionada
                                onClose={() => setDeclaracionModal(true)} // Cierra el modal limpiando el estado
                                declaracion={declaracion} // Pasa la declaración actual al modal
                            />
                        )}
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