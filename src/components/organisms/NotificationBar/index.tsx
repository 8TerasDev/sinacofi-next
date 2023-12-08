"use client";

import { RegisterEventsProps, TypeOfRegisterEvents } from '@/components/molecules/RegisterEvents';
import RegisterEventsItems from '@/components/molecules/RegisterEventsItems';
import { Box, Drawer } from '@mui/material'
import axios from "@/common/http-client";
import React, { useContext, useEffect, useState } from 'react'
import { BfDataProcessFilelog } from '@/application';
import { NewDeclaracionesContext } from '@/contexts/new-declaraciones.context';

// const registerEvents: RegisterEventsProps[] = [
//     {
//         title: 'Sony Ltda',
//         date: '21-01-2023',
//         typeOfRegisterEvents: TypeOfRegisterEvents.NEW_DECLARATION,
//     },
//     {
//         title: 'Agrícola Las Mellizas',
//         date: '21-01-2023',
//         typeOfRegisterEvents: TypeOfRegisterEvents.UPDATE_DECLARATION,
//     },
//     {
//         title: 'Laboratorio Cruz Amarilla',
//         date: '22-01-2023',
//         typeOfRegisterEvents: TypeOfRegisterEvents.NEW_DECLARATION,
//     },
//     {
//         title: 'Savory Ltda',
//         date: '22-01-2023',
//         typeOfRegisterEvents: TypeOfRegisterEvents.ERROR_ON_LOAD,
//     },
//     {
//         title: 'Agrícola Las Mellizas',
//         date: '23-01-2023',
//         typeOfRegisterEvents: TypeOfRegisterEvents.UPDATE_DECLARATION,
//     },
//     {
//         title: 'Laboratorio Cruz Amarilla',
//         date: '23-01-2023',
//         typeOfRegisterEvents: TypeOfRegisterEvents.NEW_DECLARATION,
//     },
//     {
//         title: 'Savory Ltda',
//         date: '23-01-2023',
//         typeOfRegisterEvents: TypeOfRegisterEvents.ERROR_ON_LOAD,
//     },
//     {
//         title: 'Agrícola Las Mellizas',
//         date: '24-01-2023',
//         typeOfRegisterEvents: TypeOfRegisterEvents.UPDATE_DECLARATION,
//     },
//     {
//         title: 'Laboratorio Cruz Amarilla',
//         date: '24-01-2023',
//         typeOfRegisterEvents: TypeOfRegisterEvents.NEW_DECLARATION,
//     },
//     {
//         title: 'Savory Ltda',
//         date: '24-01-2023',
//         typeOfRegisterEvents: TypeOfRegisterEvents.ERROR_ON_LOAD,
//     },
// ]

function SelectTypeOfEvent(type: string) {
    if (type === "Declaracion procesada correctamente") {
        return TypeOfRegisterEvents.NEW_DECLARATION;
    }
    if (type === "Declaracion procesada con errores") {
        return TypeOfRegisterEvents.ERROR_ON_LOAD;
    }
    if (/cambiado/.test(type)) {
        return TypeOfRegisterEvents.UPDATE_DECLARATION;
    }
    return TypeOfRegisterEvents.ERROR_ON_LOAD;
}

function ConvertRegisterEvents(bfDataProcessFilelog: BfDataProcessFilelog[]) {
    const registerEvents: RegisterEventsProps[] = [];
    for (const event of bfDataProcessFilelog) {
        const typeOfEvent = SelectTypeOfEvent(event.message ? String(event.message) : "");
        registerEvents.push({
            title: "Event",
            date: event.created_at ? String(event.created_at) : "08-01-2023",
            typeOfRegisterEvents: typeOfEvent,
        });
    }
    return registerEvents;

}



export const NotificationBar = () => {
    const { openNotificacionBar, handleOpenNotificacionBar } = useContext(NewDeclaracionesContext);

    const getNotifications = async (bank_id: string) => {
        try {
            const { data } = await axios.get(`api/notifications?bank_id=${bank_id}`);
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    const [registerEvents, setRegisterEvents] = useState<RegisterEventsProps[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = useState({
        name: "",
        lastName: "",
        email: "",
        bank: "",
    });
    const getProfile = async () => {
        try {
            const { data } = await axios.get("/api/auth/getprofile");
            console.log(data.user);
            return data.user;
            setData(data.user);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setLoading(true);
        getProfile()
            .then((user) => {
                getNotifications(user.bank_code)
                    .then((response) => {
                        const registerEvents = ConvertRegisterEvents(response.logs);
                        setRegisterEvents(registerEvents);
                    })
                    .catch()
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    return (
        <>
            <Drawer
                anchor='right'
                open={openNotificacionBar}
                onClose={handleOpenNotificacionBar}
            >
                <Box sx={{ width: '33vw', padding: '35px' }}>
                    <div>
                        <h1>Registro de cambios</h1>
                        <small>{data.bank}</small>
                    </div>
                    {loading && <div>Loading...</div>}
                    {!loading && <RegisterEventsItems registerEvents={registerEvents} />}
                </Box>
            </Drawer>
        </ >
    )
}
