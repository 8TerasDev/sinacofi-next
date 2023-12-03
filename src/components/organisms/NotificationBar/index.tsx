import { RegisterEventsProps, TypeOfRegisterEvents } from '@/components/molecules/RegisterEvents';
import RegisterEventsItems from '@/components/molecules/RegisterEventsItems';
import { Box, Drawer } from '@mui/material'
import React from 'react'

const registerEvents: RegisterEventsProps[] = [
    {
        title: 'Sony Ltda',
        date: '21-01-2023',
        typeOfRegisterEvents: TypeOfRegisterEvents.NEW_DECLARATION,
    },
    {
        title: 'Agrícola Las Mellizas',
        date: '21-01-2023',
        typeOfRegisterEvents: TypeOfRegisterEvents.UPDATE_DECLARATION,
    },
    {
        title: 'Laboratorio Cruz Amarilla',
        date: '22-01-2023',
        typeOfRegisterEvents: TypeOfRegisterEvents.NEW_DECLARATION,
    },
    {
        title: 'Savory Ltda',
        date: '22-01-2023',
        typeOfRegisterEvents: TypeOfRegisterEvents.ERROR_ON_LOAD,
    },
    {
        title: 'Agrícola Las Mellizas',
        date: '23-01-2023',
        typeOfRegisterEvents: TypeOfRegisterEvents.UPDATE_DECLARATION,
    },
    {
        title: 'Laboratorio Cruz Amarilla',
        date: '23-01-2023',
        typeOfRegisterEvents: TypeOfRegisterEvents.NEW_DECLARATION,
    },
    {
        title: 'Savory Ltda',
        date: '23-01-2023',
        typeOfRegisterEvents: TypeOfRegisterEvents.ERROR_ON_LOAD,
    },
    {
        title: 'Agrícola Las Mellizas',
        date: '24-01-2023',
        typeOfRegisterEvents: TypeOfRegisterEvents.UPDATE_DECLARATION,
    },
    {
        title: 'Laboratorio Cruz Amarilla',
        date: '24-01-2023',
        typeOfRegisterEvents: TypeOfRegisterEvents.NEW_DECLARATION,
    },
    {
        title: 'Savory Ltda',
        date: '24-01-2023',
        typeOfRegisterEvents: TypeOfRegisterEvents.ERROR_ON_LOAD,
    },
]

export const NotificationBar = () => {

    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Drawer
                anchor='right'
                open={open}
                onClose={() => { setOpen(!open) }}
            >
                <Box sx={{ width: '33vw', padding: '35px' }}>
                    <div>
                        <h1>Registro de cambios</h1>
                        <small>Banco Santander</small>
                    </div>
                    <RegisterEventsItems registerEvents={registerEvents} />
                </Box>
            </Drawer>
        </ >
    )
}
