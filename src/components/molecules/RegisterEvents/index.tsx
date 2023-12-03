import React from 'react';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import styles from './registerevents.module.css';

export enum TypeOfRegisterEvents {
    NEW_DECLARATION = 'Nueva declaración',
    UPDATE_DECLARATION = 'Actualización de declaración',
    ERROR_ON_LOAD = 'Carga fallida',
}

function getColor(typeOfRegisterEvents: TypeOfRegisterEvents) {
    switch (typeOfRegisterEvents) {
        case TypeOfRegisterEvents.NEW_DECLARATION:
            return '#2096F3';
        case TypeOfRegisterEvents.UPDATE_DECLARATION:
            return '#F36C22';
        case TypeOfRegisterEvents.ERROR_ON_LOAD:
            return '#D32F2F';
        default:
            return '#2096F3';
    }
}


function getIcon(typeOfRegisterEvents: TypeOfRegisterEvents, color: string) {
    switch (typeOfRegisterEvents) {
        case TypeOfRegisterEvents.NEW_DECLARATION:
            return <CheckCircleIcon sx={{ color, fontSize: "30px" }} />;
        case TypeOfRegisterEvents.UPDATE_DECLARATION:
            return <CheckCircleIcon sx={{ color, fontSize: "30px" }} />;
        case TypeOfRegisterEvents.ERROR_ON_LOAD:
            return <CancelIcon sx={{ color, fontSize: "30px" }} />;
        default:
            return <CheckCircleIcon sx={{ color, fontSize: "30px" }} />;
    }
}

export interface RegisterEventsProps {
    title: string;
    date: string;
    typeOfRegisterEvents: TypeOfRegisterEvents;
}



function RegisterEvents({ title, date, typeOfRegisterEvents }: RegisterEventsProps) {

    const color = getColor(typeOfRegisterEvents);
    const icon = getIcon(typeOfRegisterEvents, color);

    return (
        <section className={styles.container}>
            {icon}
            <section className={styles.content}>
                <Typography variant="body2" color="text.primary">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {date} - {typeOfRegisterEvents}
                </Typography>
            </section>

        </section>
    );
}

export default RegisterEvents;
