import { TableCell, TableSortLabel } from '@mui/material'
import React from 'react'
import SinaTypography from '../../atoms/SinaTypography'

const SinaSortTableCell = ({ children, orderBy, onClick, order, name }: any) => {

    return (
        <>
            <TableCell>
                <TableSortLabel
                    active={orderBy === name}
                    direction={orderBy === name ? order : 'asc'}
                    onClick={onClick}
                >
                    <SinaTypography>
                        {children}
                    </SinaTypography>
                </TableSortLabel>
            </TableCell></>
    )
}

export default SinaSortTableCell