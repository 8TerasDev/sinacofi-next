import React from 'react'
import styles from './container.module.css'
const ContainerFull = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className={styles.container}>{children && children}</div>
    )
}

export default ContainerFull