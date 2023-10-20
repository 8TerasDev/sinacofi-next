import React from 'react'
import styles from './sinadrawer.module.css'
import SinaBrand from '../../atoms/SinaBrand'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

type SinaDrawerProps = {
    children?: React.ReactNode,
    isOpen: boolean,
    isOpenSetter: (isOpen: boolean) => void,
}

const SinaDrawer = ({ children, isOpen, isOpenSetter }: SinaDrawerProps) => {
    return (
        <div className={isOpen ? styles.container_open : styles.container_close}>
            <div className={styles.top_brand}>
                <SinaBrand isOpen={isOpen} />
            </div>
            <div className={styles.middle}>
                {children}
            </div>
            <div className={isOpen ? styles.bottom_open : styles.bottom_close}>
                {isOpen &&
                    <button
                        className={styles.button}
                        onClick={() => { isOpenSetter(false) }}
                    >
                        <KeyboardDoubleArrowLeftIcon />
                    </button>
                }
                {!isOpen &&
                    <button className={styles.button} onClick={() => { isOpenSetter(true) }}>
                        <KeyboardDoubleArrowRightIcon />
                    </button>
                }
            </div>
        </div>
    )
}

export default SinaDrawer