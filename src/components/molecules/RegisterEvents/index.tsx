import React from 'react';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import styles from './registerevents.module.css';

export enum TypeOfRegisterEvents {
    NEW_DECLARATION = 'Nueva declaración',
    UPDATE_DECLARATION = 'Actualización de declaración',
    FAIL_LOAD = 'Carga fallida',
}

function getColor(typeOfRegisterEvents: TypeOfRegisterEvents) {
    switch (typeOfRegisterEvents) {
        case TypeOfRegisterEvents.NEW_DECLARATION:
            return 'blue';
        case TypeOfRegisterEvents.UPDATE_DECLARATION:
            return 'orange';
        case TypeOfRegisterEvents.FAIL_LOAD:
            return 'red';
        default:
            return 'blue';
    }
}

function getIcon(typeOfRegisterEvents: TypeOfRegisterEvents, color: string) {
    switch (typeOfRegisterEvents) {
        case TypeOfRegisterEvents.NEW_DECLARATION:
            return <CheckCircleIcon sx={{ backgroundColor: color }} />;
        case TypeOfRegisterEvents.UPDATE_DECLARATION:
            return <CheckCircleIcon sx={{ backgroundColor: color }} />;
        case TypeOfRegisterEvents.FAIL_LOAD:
            return <CancelIcon sx={{ backgroundColor: color }} />;
        default:
            return <CheckCircleIcon />;
    }
}

interface RegisterEventsProps {
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
            <section>
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
