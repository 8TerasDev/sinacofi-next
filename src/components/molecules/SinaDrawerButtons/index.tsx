"use client";
import React, { useContext } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { TextField, Button } from '@mui/material';
import { useTypeSearch } from '../../../custom-hooks/typeSearchHook';
import SinaText from '@/components/atoms/SinaText';
import { TypeSearchContext } from '@/contexts/typesearch.context';


const SinaDrawerButtons = ({ isOpen, isOpenSetter }: any) => {
    const {
        typeOfSearch,
        TypeOfSearch,
    } = useContext(TypeSearchContext)

    return (
        <>
            {isOpen && typeOfSearch === TypeOfSearch.FOLIO && < SinaText > Busca una declaración por Folio</SinaText >}
            {isOpen && typeOfSearch === TypeOfSearch.RUT && < SinaText > Busca una declaración por Rut</SinaText >}
            {isOpen && typeOfSearch === TypeOfSearch.BENEFICIARIO && < SinaText > Busca una declaración por Beneficiario</SinaText >}
            {/* {//TODO: MEJORAR ACA} */}
            {
                isOpen &&
                <TextField
                    label={typeOfSearch}
                    placeholder={`busqueda por ${typeOfSearch}`}
                    fullWidth
                />
            }
            {isOpen && <Button variant="contained" fullWidth>Buscar</Button>}

            {!isOpen && <Button variant="contained" onClick={() => { isOpenSetter(true) }}><SearchIcon /></Button>}
        </>
    )
}

export default SinaDrawerButtons