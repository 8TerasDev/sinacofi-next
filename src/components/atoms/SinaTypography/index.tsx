import React from 'react'
import styles from './sinatypography.module.css'
const SinaTypography = ({ children }: any) => {
    return (
        <p className={styles.sinatypography}>{children}</p>
    )
}

export default SinaTypography