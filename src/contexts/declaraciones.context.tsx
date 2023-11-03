"use client"
import { useTypeSearch } from '@/custom-hooks/typeSearchHook';
import React, { createContext, useReducer, useState } from 'react';
import { base_pruebas } from '../../data_sinacofi/bbdd';
import { Declaracion } from '@/application';
import { declaracionesReducer } from '@/reducers/declaraciones.reducer';

interface DeclaracionesContextProps {
    declaraciones: Declaracion[],
    dispatch: any
}

export const DeclaracionesContext = createContext<DeclaracionesContextProps>({} as DeclaracionesContextProps);

export const DeclaracionesProvider = ({ children }: any) => {
    const [declaraciones, dispatch] = useReducer(declaracionesReducer, [...base_pruebas]);

    return (
        <DeclaracionesContext.Provider value={{ declaraciones, dispatch }}>
            {children}
        </DeclaracionesContext.Provider>
    );
};
