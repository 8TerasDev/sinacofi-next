import React from 'react'
import sinacofi_logo from '../../../assets/images/sinacofi_logo.png'
import sinacofi_logo_sin from '../../../assets/images/sinacofi_logo_SIN.png'
import styles from './sinabrand.module.css'
const SinaBrand = ({ isOpen }: any) => {
    return (
        <>
            {
                isOpen &&
                <img src={sinacofi_logo} alt="" width={100} />
            }
            {
                !isOpen &&
                <img
                    src={sinacofi_logo_sin}
                    alt=""
                    className={styles.round_box}
                />
            }
        </>
    )
}

export default SinaBrand