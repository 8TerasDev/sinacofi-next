"use client"
import { BfDataProcessDeclaraciones } from '@/application';
import { getAllDeclaracionesClientSide } from '@/lib/declaraciones.prisma';
import React, { createContext, useEffect, useReducer, useState } from 'react';

export const NewDeclaracionesContext = createContext<any>({});

enum typeOffilterEnum {
    FILTER_BY_FOLIO = "FILTER_BY_FOLIO",
    FILTER_BY_PERSONA_JURIDICA = "FILTER_BY_PERSONA_JURIDICA",
    FILTER_BY_BENEFICIARIO_FINAL = "FILTER_BY_BENEFICIARIO_FINAL",
    FILTER_BY_ULTIMA_ACTUALIZADA = "FILTER_BY_ULTIMA_ACTUALIZADA",
    FILTER_BY_ULTIMA_SUBIDA = "FILTER_BY_ULTIMA_SUBIDA",
}

export const NewDeclaracionesProvider = ({ children }: any) => {
    const [declaraciones, declaracionesSetter] = useState<BfDataProcessDeclaraciones[] | null>(null)

    const [typeOffilter, typeOffilterSetter] = useState<typeOffilterEnum | null>(null)
    const [filter, filterSetter] = useState<any>(null)

    function declaracionesWithFilter() {
        if (!typeOffilter) return declaraciones
        if (typeOffilter === typeOffilterEnum.FILTER_BY_FOLIO) return DeclaracionesFilterByFolio()
        if (typeOffilter === typeOffilterEnum.FILTER_BY_PERSONA_JURIDICA) return DeclaracionesFilterByPersonaJuridica()
        if (typeOffilter === typeOffilterEnum.FILTER_BY_BENEFICIARIO_FINAL) return DeclaracionesFilterByBeneficiarioFinal()
        if (typeOffilter === typeOffilterEnum.FILTER_BY_ULTIMA_ACTUALIZADA) return DeclaracionesFilterByLastUpdated()
        if (typeOffilter === typeOffilterEnum.FILTER_BY_ULTIMA_SUBIDA) return DeclaracionesFilterByLastUploaded()
    }

    function resetFilter() {
        typeOffilterSetter(null)
        filterSetter(null)
    }

    function FilterByFolio(value: string) {
        typeOffilterSetter(typeOffilterEnum.FILTER_BY_FOLIO)
        filterSetter(value)
    }

    function FilterByPersonaJuridica(value: string) {
        typeOffilterSetter(typeOffilterEnum.FILTER_BY_PERSONA_JURIDICA)
        filterSetter(value)
    }

    function FilterByBeneficiarioFinal(value: string) {
        typeOffilterSetter(typeOffilterEnum.FILTER_BY_BENEFICIARIO_FINAL)
        filterSetter(value)
    }

    function FilterByLastUpdated() {
        typeOffilterSetter(typeOffilterEnum.FILTER_BY_ULTIMA_ACTUALIZADA)
    }
    function FilterByLastUploaded() {
        typeOffilterSetter(typeOffilterEnum.FILTER_BY_ULTIMA_SUBIDA)
    }

    function DeclaracionesFilterByLastUpdated() {
        if (declaraciones) {
            const declaracionesOrdenadas = declaraciones?.sort((a, b) => {
                const fechaA = new Date(a.fecha_declaracion || Date.now()).getTime();
                const fechaB = new Date(b.fecha_declaracion || Date.now()).getTime();
                return fechaB - fechaA;
            });

            return [declaracionesOrdenadas[0]];
        }
    }

    function DeclaracionesFilterByLastUploaded() {
        if (declaraciones) {
            const declaracionesOrdenadas = declaraciones?.sort((a, b) => {
                const fechaA = new Date(a.fecha_subida || Date.now()).getTime();
                const fechaB = new Date(b.fecha_subida || Date.now()).getTime();
                return fechaB - fechaA;
            });

            return [declaracionesOrdenadas[0]];
        }
    }

    function DeclaracionesFilterByFolio() {
        return declaraciones?.filter(declaraciones => declaraciones.correlativo === filter)
    }

    function DeclaracionesFilterByPersonaJuridica() {
        return declaraciones?.filter(declaracion =>
            declaracion.personas_juridicas?.some(persona_juridica =>
                persona_juridica.identificacion_rep_legal === filter)
        );
    }

    function DeclaracionesFilterByBeneficiarioFinal() {
        return declaraciones?.filter(declaracion =>
            declaracion.bf_data_process_beneficiariosfinales?.some(beneficiario_final =>
                beneficiario_final.identificacion === filter)
        );
    }

    useEffect(() => {
        getAllDeclaracionesClientSide().then(
            (declaraciones) => {
                declaracionesSetter(declaraciones)
            }
        )
    }, [])

    const valueContext = {
        declaraciones: declaracionesWithFilter(),
        FilterByFolio,
        FilterByPersonaJuridica,
        FilterByBeneficiarioFinal,
        FilterByLastUpdated,
        FilterByLastUploaded,
        resetFilter
    }

    return (
        <NewDeclaracionesContext.Provider value={valueContext}>
            {children}
        </NewDeclaracionesContext.Provider>
    );
};
