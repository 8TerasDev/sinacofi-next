import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

function SortableTable() {
    const [order, setOrder] = useState<any>('asc');
    const [orderBy, setOrderBy] = useState<any>('name');

    const data = [
        { name: 'John Doe', age: 25 },
        { name: 'Jane Smith', age: 30 },
        { name: 'Alice Johnson', age: 20 }
        // ... add more data as needed
    ];

    const handleSort = (property: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedData = [...data].sort((a: any, b: any) => {
        if (order === 'asc') {
            return a[orderBy] < b[orderBy] ? -1 : 1;
        } else {
            return a[orderBy] > b[orderBy] ? -1 : 1;
        }
    });

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <TableSortLabel
                            active={orderBy === 'name'}
                            direction={orderBy === 'name' ? order : 'asc'}
                            onClick={() => handleSort('name')}
                        >
                            Name
                        </TableSortLabel>
                    </TableCell>
                    <TableCell>Age</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {sortedData.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.age}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default SortableTable;
