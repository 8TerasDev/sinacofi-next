"use client";
import React, { useContext, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { TextField, Button } from '@mui/material';
import { useTypeSearch } from '../../../custom-hooks/typeSearchHook';
import SinaText from '@/components/atoms/SinaText';
import { TypeSearchContext } from '@/contexts/typesearch.context';
import { DeclaracionesContext } from '@/contexts/declaraciones.context';


const SinaDrawerButtons = ({ isOpen, isOpenSetter }: any) => {
    const {
        typeOfSearch,
    } = useContext(TypeSearchContext)
    const { declaracionesByFolio } = useContext(DeclaracionesContext)
    const [filter, filterSetter] = useState("")

    function handleSearchByFolio() {
        declaracionesByFolio(filter)
    }
    return (
        <>
            {isOpen && < SinaText > Busca una declaración por:</SinaText >}
            {/* {//TODO: MEJORAR ACA} */}
            {
                isOpen &&
                <TextField
                    label={typeOfSearch}
                    placeholder={`busqueda por ${typeOfSearch}`}
                    onChange={(e) => { filterSetter(e.target.value) }}
                    fullWidth
                />
            }
            {isOpen && <Button variant="contained" fullWidth onClick={handleSearchByFolio}>Buscar</Button>}

            {!isOpen && <Button variant="contained" onClick={() => { isOpenSetter(true) }}><SearchIcon /></Button>}
        </>
    )
}

export default SinaDrawerButtons