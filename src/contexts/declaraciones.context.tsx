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
        // Crear una expresión regular dinámica desde el folio
        // Escapa caracteres especiales en el folio para la regex
        const escapedFolio = folio.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const folioRegex = new RegExp(`^${escapedFolio}$`);
      
        // Filtrar declaraciones que coincidan con el folio usando la regex
        const filterDeclaracions = base_pruebas.filter(declaracion => folioRegex.test(declaracion.folio));
        console.log({ filterDeclaracions });
      
        // Si hay declaraciones que coinciden, actualiza el estado
        if (filterDeclaracions.length > 0) {
          declaracionesSetter(filterDeclaracions);
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
