import React from 'react'
import styles from './simamaincard.module.css';

const SinaMainCard = ({children}:any) => {


  return (
    <div className={styles.declaraciones_container}>
        {children}
    </div>
  )
}

export default SinaMainCard