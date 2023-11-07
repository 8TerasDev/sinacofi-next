"use client"
import React, { createContext, useEffect, useReducer, useState } from 'react';
import { PJuridicas } from '@/application';
import axios from 'axios';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { declaracionesReducer } from '@/reducers/declaraciones.reducer';


export const DeclaracionesContext = createContext<any>({});

const API_URL = '/api/pjuridica';

async function fetchDeclaraciones() {
    try {
        // Hacer la solicitud GET con Axios
        const { data } = await axios.get(API_URL);
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
const queryClient = new QueryClient();

function filtrarPorRegistroId(declaraciones: PJuridicas[], correlativo_declaracion: string) {
    if (!Array.isArray(declaraciones) || !correlativo_declaracion) {
        return null;
    }

    const resultado = declaraciones.find(declaracion => declaracion.correlativo_declaracion === correlativo_declaracion);

    return resultado || null;
}



export const DeclaracionesProvider = ({ children }: any) => {

    const [isLoading, isLoadingSetter] = useState<boolean>(false)
    const [state, dispatch] = useReducer(declaracionesReducer, { declaraciones: [] });
    
    useEffect(() => {
        isLoadingSetter(true)
        fetchDeclaraciones()
            .then(
                declaraciones => dispatch({ type: "INIT", payload: declaraciones })
            )
            .finally(() => {
                isLoadingSetter(false)
            })
    }, [])

    return (
        <DeclaracionesContext.Provider value={{
            state,
            isLoading,
            dispatch
        }}>
            {children}
        </DeclaracionesContext.Provider>
    );
};
