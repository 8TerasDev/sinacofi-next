"use client"
import { useTypeSearch } from '@/custom-hooks/typeSearchHook';
import React, { createContext, useState } from 'react';
import { base_pruebas } from '../../data_sinacofi/bbdd';
import { Declaracion } from '@/application';

interface DeclaracionesContextProps {
    declaraciones: Declaracion[],
    declaracionesByFolio: any
}

export const DeclaracionesContext = createContext<DeclaracionesContextProps>({} as DeclaracionesContextProps);

export const DeclaracionesProvider = ({ children }: any) => {
    const [declaraciones, declaracionesSetter] = useState(base_pruebas)

    function declaracionesByFolio(folio: string) {
        const filterDeclaracions = base_pruebas.filter(declaracion => declaracion.folio === folio)
        console.log({ filterDeclaracions })
        if (filterDeclaracions.length > 0) {
            declaracionesSetter(filterDeclaracions)
        }
    }

    const contextValue = {
        declaraciones,
        declaracionesByFolio
    };

    return (
        <DeclaracionesContext.Provider value={contextValue}>
            {children}
        </DeclaracionesContext.Provider>
    );
};
