"use client"
import { TypeOfSearch, useTypeSearch } from '@/custom-hooks/typeSearchHook';
import React, { createContext } from 'react';

type TypeSearchContextProps = {
    typeOfSearch?: any;
    onSelectFolioType?: any;
    onSelectRutType?: any;
    onSelectBeneficiarioType?: any;
    activeColorFolio?: any;
    activeColorRut?: any;
    activeColorBeneficiario?: any;
    TypeOfSearch?: TypeOfSearch;
    filter?: string;
    filterSetter?: any;
    resetFiltertypeOfSearch?: any;
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
        TypeOfSearch,
        filter,
        filterSetter,
        resetFiltertypeOfSearch
    } = useTypeSearch()

    // El valor que se pasa al proveedor debe ser un objeto
    // si quieres pasar múltiples valores o funciones
    const contextValue: any = {
        typeOfSearch,
        onSelectFolioType,
        onSelectRutType,
        onSelectBeneficiarioType,
        activeColorFolio,
        activeColorRut,
        activeColorBeneficiario,
        TypeOfSearch,
        filter,
        filterSetter,
        resetFiltertypeOfSearch
    };

    return (
        <TypeSearchContext.Provider value={contextValue}>
            {children}
        </TypeSearchContext.Provider>
    );
};
