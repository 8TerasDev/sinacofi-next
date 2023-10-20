import React from 'react'
import styles from './simamaincard.module.css';
import SinaCardHeader from '../../molecules/SinaCardHeader';

const SinaMainCard = ({children}:any) => {


  return (
    <div className={styles.declaraciones_container}>
        <SinaCardHeader/>
        {children}
    </div>
  )
}

export default SinaMainCard