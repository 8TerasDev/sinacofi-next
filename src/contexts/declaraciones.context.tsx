"use client"
import { useTypeSearch } from '@/custom-hooks/typeSearchHook';
import React, { createContext, useReducer, useState } from 'react';
import { base_pruebas } from '../../data_sinacofi/bbdd';
import { Declaracion, PJuridicas } from '@/application';
import { declaracionesReducer } from '@/reducers/declaraciones.reducer';
import axios from 'axios';
import { QueryClient, useQuery } from '@tanstack/react-query';

interface DeclaracionesContextProps {
    declaraciones: PJuridicas[],
    dispatch: any
}

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


export const DeclaracionesProvider = ({ children }: any) => {
    const { data: declaraciones, isLoading, isError, error } = useQuery({
        queryKey: ['declaraciones'],
        queryFn: fetchDeclaraciones
    });
    const value = { declaraciones, isLoading, isError, error };

    return (
        <DeclaracionesContext.Provider value={value}>
            {children}
        </DeclaracionesContext.Provider>
    );
};
