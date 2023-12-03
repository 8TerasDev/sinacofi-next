import React from 'react';
import styles from './registereventscontainer.module.css';
import RegisterEvents, { RegisterEventsProps } from '../RegisterEvents';
import { Divider } from '@mui/material';

interface RegisterEventsContainerProps {
    registerEvents: RegisterEventsProps[];
}

function RegisterEventsContainer({ registerEvents }: RegisterEventsContainerProps) {

    return (
        <section className={styles.container}>
            {
                React.Children.toArray(
                    registerEvents.map(
                        (registerevent: RegisterEventsProps, index) => {
                            return (
                                <div className={styles.content}>
                                    <RegisterEvents {...registerevent} />
                                    <Divider
                                        orientation='vertical'
                                        sx={{
                                            paddingLeft: "15px",
                                            height: '70%',
                                            display: index !== registerEvents.length - 1 ? "block" : "none"
                                        }} />
                                </div>)
                        }
                    )
                )
            }

        </section>
    );
}

export default RegisterEventsContainer;
