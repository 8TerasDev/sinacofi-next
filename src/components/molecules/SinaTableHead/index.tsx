import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import React, { useState } from 'react'
import SinaTableCell from '../SinaTableCell'
import SinaSortTableCell from '../SinaSortTableCell'
import SinaTypography from '@/components/atoms/SinaTypography'

type SinaTableRowProps = {
    onRequestSort: (event: any, property: any) => void;
    order: 'asc' | 'desc';
}
const SinaTableHead = ({ onRequestSort, order }: SinaTableRowProps) => {
    const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('desc');

    const handleRequestSort = (event: any) => {
        const isAsc = orderDirection === 'asc';
        setOrderDirection(isAsc ? 'desc' : 'asc');
        onRequestSort(event, isAsc ? 'desc' : 'asc');
    };

    return (
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
                <TableCell sortDirection={orderDirection}>
                    <TableSortLabel
                        active={true}
                        direction={orderDirection}
                        onClick={handleRequestSort}
                    >

                        <SinaTypography>
                            Fecha de declaración
                        </SinaTypography>

                    </TableSortLabel>
                </TableCell>
                <TableCell>
                    <SinaTypography>
                        Fecha de carga
                    </SinaTypography>
                </TableCell>
            </TableRow>
        </TableHead >
    )
}

export default SinaTableHead