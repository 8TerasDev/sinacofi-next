import React from 'react'
import SinaText from '../../atoms/SinaText'
import SinaDrawerIcons from '../../molecules/SinaDrawerIcons'
import style from './drawerbody.module.css'
import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const DrawerBody = ({ isOpen, isOpenSetter }: any) => {
    return (
        <div className={style.drawer_body_container}>
            {isOpen && <SinaText>Realiza una búsqueda</SinaText>}
            <SinaDrawerIcons isOpen={isOpen} />
            {isOpen && <SinaText>Busca una declaración</SinaText>}
            {/* {//TODO: MEJORAR ACA} */}
            {isOpen &&
                <TextField
                    label="Folio"
                    placeholder='Folio de la declaración'
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                />}
            {isOpen && <Button variant="contained" fullWidth>Buscar</Button>}

            {!isOpen && <Button variant="contained" onClick={() => { isOpenSetter(true) }}><SearchIcon /></Button>}

        </div>
    )
}

export default DrawerBody