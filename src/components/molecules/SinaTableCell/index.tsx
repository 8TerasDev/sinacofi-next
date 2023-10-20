import { TableCell } from '@mui/material'
import React from 'react'
import SinaTypography from '../../atoms/SinaTypography'

const SinaTableCell = ({ children }: any) => {
    return (
        <>
            <TableCell>
                <SinaTypography>
                    {children}
                </SinaTypography>
            </TableCell></>
    )
}

export default SinaTableCell