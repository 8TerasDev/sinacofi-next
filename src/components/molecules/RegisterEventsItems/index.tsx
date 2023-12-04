import React from 'react';
import { RegisterEventsProps } from '../RegisterEvents';
import { Divider } from '@mui/material';
import RegisterEventsContainer from '../RegisterEventsContainer';

function divideByDate(registerEvents: RegisterEventsProps[]): Record<string, RegisterEventsProps[]> {
    const groupedEvents: Record<string, RegisterEventsProps[]> = {};

    // Agrupar eventos por fecha
    for (const event of registerEvents) {
        const { date } = event;
        if (!groupedEvents[date]) {
            groupedEvents[date] = [];
        }
        groupedEvents[date].push(event);
    }

    return groupedEvents;
}

interface RegisterEventsContainerProps {
    registerEvents: RegisterEventsProps[];
}

function RegisterEventsItems({ registerEvents }: RegisterEventsContainerProps) {
    const groupedByDate = divideByDate(registerEvents);
    const dates = Object.keys(groupedByDate);
    return (
        <div>
            {
                React.Children.toArray(
                    dates.map((days) => {
                        return (
                            <div>
                                <RegisterEventsContainer registerEvents={groupedByDate[days]} />
                                <Divider />
                            </div>
                        )
                    })
                )
            }
        </div>
    );
}

export default RegisterEventsItems;
