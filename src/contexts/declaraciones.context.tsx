"use client"
import React, { createContext, useEffect, useReducer, useState } from 'react';
import { PJuridicas } from '@/application';
import axios from 'axios';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { declaracionesReducer } from '@/reducers/declaraciones.reducer';


export const DeclaracionesContext = createContext<any>({});

const API_URL_PJ = '/api/pjuridica';

async function fetchDeclaraciones() {
    try {
        // Hacer la solicitud GET con Axios
        const { data } = await axios.get(API_URL_PJ);
        // Acceder al campo 'declaraciones' de la respuesta JSON
        const declaraciones = data.declaraciones;
        return declaraciones;
    } catch (error) {
        // Manejar el error aquí, como loguearlo o mostrar un mensaje al usuario
        console.error('Hubo un error al obtener las declaraciones:', error);
        // Puedes lanzar el error o manejarlo de alguna otra manera si es necesario
        throw error;
    }
}

export const DeclaracionesProvider = ({ children }: any) => {

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

    useEffect(() => {
        isLoadingSetter(true)
        if (state.declaraciones.length == 0) {
            console.log("cargo de nuevo el state")
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
            reloadDeclaraciones
        }}>
            {children}
        </DeclaracionesContext.Provider>
    );
};
