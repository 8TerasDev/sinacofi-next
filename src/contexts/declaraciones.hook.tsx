import { fetchDeclaraciones, fetchDeclaracionesByDates, getDelcaracionesByRutBeneficiario } from '@/lib/pfinales.prisma';
import { getDelcaracionesByCorrelativos } from '@/lib/pjuridica.prisma';
import { declaracionesReducer } from '@/reducers/declaraciones.reducer';
import React, { useEffect, useReducer, useState } from 'react'

export const useDeclaraciones = () => {
    const [isLoading, isLoadingSetter] = useState<boolean>(false)
    const [state, dispatch] = useReducer(declaracionesReducer, { declaraciones: [] });

    function reloadDeclaraciones() {
        fetchDeclaraciones()
            .then(
                declaraciones => dispatch({ type: "INIT", payload: declaraciones })
            )
            .finally(() => {
                isLoadingSetter(false)
            })
    }

    function loadDeclaracionesByDates(startDate: string, endDate: string) {
        fetchDeclaracionesByDates(startDate, endDate)
            .then(
                declaraciones => dispatch({ type: "INIT", payload: declaraciones })
            )
            .finally(() => {
                isLoadingSetter(false)
            })
    }

    async function getDeclaracionesByBeneficiario(rut: string) {
        try {
            const correlativos = await getDelcaracionesByRutBeneficiario(rut)
            const declaraciones = await getDelcaracionesByCorrelativos(correlativos)
            dispatch({ type: "INIT", payload: declaraciones })
        } catch (error) {

        }
    }
    function loadFirstDeclaracion() {
        isLoadingSetter(true)
        if (state.declaraciones.length == 0) {
            fetchDeclaraciones()
                .then(
                    declaraciones => dispatch({ type: "INIT", payload: declaraciones })
                )
                .finally(() => {
                    isLoadingSetter(false)
                })
        }
    }

    useEffect(() => {
        loadFirstDeclaracion()
    }, [])
    return (
        {
            state: state.declaraciones || [],
            isLoading,
            dispatch,
            reloadDeclaraciones,
            getDeclaracionesByBeneficiario,
            loadDeclaracionesByDates
        }
    )
}
