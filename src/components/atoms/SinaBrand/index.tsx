import React from 'react'
import sinacofi_logo from '../../../assets/images/sinacofi_logo.png'
import styles from './sinabrand.module.css'
import Image from 'next/image'
const SinaBrand = () => {
    return (
        <div className={styles.sinabrand_container}> 
                <Image src={sinacofi_logo} alt="" width={180} />  
        </div>
    )
}

export default SinaBrand