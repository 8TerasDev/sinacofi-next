import RegisterEvents, { TypeOfRegisterEvents } from '@/components/molecules/RegisterEvents';
import { Box, Button, Divider, Drawer } from '@mui/material'
import React from 'react'

export const NotificationBar = () => {

    const [open, setOpen] = React.useState(true);

    return (
        <>
            <Drawer
                anchor='right'
                open={open}
                onClose={() => { setOpen(false) }}
            >
                <Box sx={{ width: '33vw', padding: '35px' }}>
                    <div>
                        <h1>Registro de cambios</h1>
                        <small>banco santander</small>
                    </div>
                    <RegisterEvents
                        title='Sony Ltda'
                        date='21-01-2023'
                        typeOfRegisterEvents={TypeOfRegisterEvents.NEW_DECLARATION} />
                    <Divider />
                </Box>
            </Drawer>
        </ >
    )
}
