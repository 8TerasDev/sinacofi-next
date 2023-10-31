"use client"
import { useTypeSearch } from '@/custom-hooks/typeSearchHook';
import React, { createContext } from 'react';

interface TypeSearchContextProps {
    typeOfSearch?: any;
    onSelectFolioType?: any;
    onSelectRutType?: any;
    onSelectBeneficiarioType?: any;
    activeColorFolio?: any;
    activeColorRut?: any;
    activeColorBeneficiario?: any;
    TypeOfSearch?: any;
}

export const TypeSearchContext = createContext<TypeSearchContextProps>({});

export const TypeSearchProvider = ({ children }: any) => {
    const {
        typeOfSearch,
        onSelectFolioType,
        onSelectRutType,
        onSelectBeneficiarioType,
        activeColorFolio,
        activeColorRut,
        activeColorBeneficiario,
        TypeOfSearch
    } = useTypeSearch()

    // El valor que se pasa al proveedor debe ser un objeto
    // si quieres pasar múltiples valores o funciones
    const contextValue = {
        typeOfSearch,
        onSelectFolioType,
        onSelectRutType,
        onSelectBeneficiarioType,
        activeColorFolio,
        activeColorRut,
        activeColorBeneficiario,
        TypeOfSearch
    };

    return (
        <TypeSearchContext.Provider value={contextValue}>
            {children}
        </TypeSearchContext.Provider>
    );
};
