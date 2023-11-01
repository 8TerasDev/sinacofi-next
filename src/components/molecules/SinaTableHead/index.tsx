import { TableHead, TableRow } from '@mui/material'
import React from 'react'
import SinaTableCell from '../SinaTableCell'
import SinaSortTableCell from '../SinaSortTableCell'

type SinaTableRowProps = {
    listOfHeaders: string[];
}
const SinaTableHead = ({ listOfHeaders }: SinaTableRowProps) => {

    return (
        <TableHead>
            <TableRow>
                {
                    listOfHeaders.map(
                        (header) => <SinaTableCell key={header}>{header}</SinaTableCell>
                    )
                }
            </TableRow>
        </TableHead >
    )
}

export default SinaTableHead