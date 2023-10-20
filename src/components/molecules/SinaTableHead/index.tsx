import { TableHead, TableRow } from '@mui/material'
import React from 'react'
import SinaTableCell from '../SinaTableCell'
import SinaSortTableCell from '../SinaSortTableCell'

type SinaTableRowProps = {
    listOfHeaders: string[];
    orderBy: any;
    onClick: any;
    order: any;
    name: any;
    onClick2: any;
    name2: any;
}
const SinaTableHead = ({ listOfHeaders, orderBy, onClick, order, name, onClick2, name2 }: SinaTableRowProps) => {

    return (
        <TableHead>
            <TableRow>
                {
                    React.Children.toArray(listOfHeaders.map(
                        (header) => {
                            if (header === "Razón Social") {
                                return (
                                    <SinaSortTableCell
                                        orderBy={orderBy}
                                        onClick={onClick}
                                        order={order}
                                        name={name}
                                    >
                                        {header}
                                    </SinaSortTableCell>)
                            }
                            if (header === "Fecha y hora de carga") {
                                return (
                                    <SinaSortTableCell
                                        orderBy={orderBy}
                                        onClick={onClick2}
                                        order={order}
                                        name={name2}
                                    >
                                        {header}
                                    </SinaSortTableCell>)
                            }
                            else {
                                return <SinaTableCell>{header}</SinaTableCell>
                            }
                        }
                    ))
                }
            </TableRow>
        </TableHead >
    )
}

export default SinaTableHead