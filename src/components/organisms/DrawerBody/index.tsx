import React from 'react'
import SinaText from '../../atoms/SinaText'
import SinaDrawerIcons from '../../molecules/SinaDrawerIcons'
import style from './drawerbody.module.css'
import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SinaDrawerButtons from '@/components/molecules/SinaDrawerButtons';
import { useTypeSearch } from '@/custom-hooks/typeSearchHook';

const DrawerBody = ({ isOpen, isOpenSetter }: any) => {

    return (
        <div className={style.drawer_body_container}>
            {isOpen && <SinaText>Realiza una búsqueda</SinaText>}
            {isOpen && <SinaDrawerIcons isOpen={isOpen} />}
            <SinaDrawerButtons isOpen={isOpen} isOpenSetter={isOpenSetter} />
        </div>
    )
}

export default DrawerBody