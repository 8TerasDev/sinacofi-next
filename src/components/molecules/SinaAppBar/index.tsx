import React from 'react'
import styles from './sinaappbar.module.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useModalHandle from '../../../custom-hooks/useModalHandle';
import BotonPopover from '../../atoms/BotonPopover';
import ModalPopover from '../SinaUserModal';

const SinaAppBar = () => {
    const { isOpen, handleClick } = useModalHandle();

    return (
        <div className={styles.sinappbar_container}>
            <div className={styles.profile_container}>
                <div className={styles.profile_details}>
                    <img
                        className={styles.profile_details_images}
                        src="https://placehold.co/45x45"
                        alt=""
                    />
                    <div>
                        <h1 className={styles.profile_details_text}>Hola, Juan Pablo</h1>
                        <p className={styles.profile_details_sub_text}>Banco Santander</p>
                    </div>
                </div>
                <div className={styles.profile_actions}>
                        <BotonPopover handleClick={handleClick}>
                            <KeyboardArrowDownIcon />
                        </BotonPopover>
                        <ModalPopover isOpen={isOpen} handleClick={handleClick} />
                </div>
            </div>
        </div>
    )
}

export default SinaAppBar