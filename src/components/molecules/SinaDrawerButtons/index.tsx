"use client";
import React, { useContext, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { TextField, Button } from '@mui/material';
import { TypeOfSearch, useTypeSearch } from '../../../custom-hooks/typeSearchHook';
import SinaText from '@/components/atoms/SinaText';
import { TypeSearchContext } from '@/contexts/typesearch.context';
import { DeclaracionesContext } from '@/contexts/declaraciones.context';


const SinaDrawerButtons = ({ isOpen, isOpenSetter }: any) => {
    const {
        typeOfSearch,
        filter,
        filterSetter
    } = useContext(TypeSearchContext)
    const { dispatch, reloadDeclaraciones, getDeclaracionesByBeneficiario } = useContext(DeclaracionesContext)

    const [preValue, preValueSetter] = useState("")
    async function handleSearchByParams() {
        if (typeOfSearch == TypeOfSearch.FOLIO) {
            dispatch({ type: 'FILTER_BY_FOLIO', payload: filter });
        }
        if (typeOfSearch == TypeOfSearch.BENEFICIARIO) {
            await getDeclaracionesByBeneficiario(filter)
        }
        if (typeOfSearch == TypeOfSearch.RUT) {
            dispatch({ type: 'FILTER_BY_PERSONA_JURIDICA', payload: filter });
        }
    }

    function placeHolderText() {
        if (typeOfSearch == TypeOfSearch.FOLIO) {
            return "Folio de la declaración";
        }
        if (typeOfSearch == TypeOfSearch.BENEFICIARIO) {
            return "Beneficiario final o Control efectivo";;
        }
        if (typeOfSearch == TypeOfSearch.RUT) {
            return "Persona Jurídica";
        }
    }

    function cleanAndSearch({ target }: any) {
        filterSetter(target.value)
    }

    useEffect(() => {

        if (filter?.length == 0) {
            reloadDeclaraciones()
        }
    }, [filter])


    return (
        <>
            {isOpen && < SinaText > Busca una declaración por:</SinaText >}
            {
                isOpen &&
                <TextField
                    label={placeHolderText()}
                    placeholder={`busqueda por ${typeOfSearch}`}
                    onChange={cleanAndSearch}
                    value={filter}
                    fullWidth
                />
            }
            {isOpen && <Button variant="contained" fullWidth onClick={handleSearchByParams}>Buscar</Button>}

            {!isOpen && <Button variant="contained" onClick={() => { isOpenSetter(true) }}><SearchIcon /></Button>}
        </>
    )
}

export default SinaDrawerButtons