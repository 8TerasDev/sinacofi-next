"use client"
import React, { createContext, useEffect, useReducer, useState } from 'react';
import { declaracionesReducer } from '@/reducers/declaraciones.reducer';
import { fetchDeclaraciones, fetchDeclaracionesByDates, getDelcaracionesByRutBeneficiario, getUniqueCorrelativoDeclaracion } from '@/lib/pfinales.prisma';
import { getDeclaracionesByCorrelativos, getDelcaracionesByCorrelativos } from '@/lib/pjuridica.prisma';


export const DeclaracionesContext = createContext<any>({});

export const DeclaracionesProvider = ({ children }: any) => {

    const [isLoading, isLoadingSetter] = useState<boolean>(true)
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

    useEffect(() => {
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
    }, [])

    return (
        <DeclaracionesContext.Provider value={{
            state,
            isLoading,
            dispatch,
            reloadDeclaraciones,
            getDeclaracionesByBeneficiario,
            loadDeclaracionesByDates
        }}>
            {children}
        </DeclaracionesContext.Provider>
    );
};
