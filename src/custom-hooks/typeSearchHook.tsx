import React, { useEffect, useState } from 'react'

export enum TypeOfSearch {
    FOLIO = 'FOLIO',
    RUT = 'RUT',
    BENEFICIARIO = 'BENEFICIARIO',
}

type ActiveColor = 'primary' | 'inherit'
export const useTypeSearch = () => {
    const [typeOfSearch, typeOfSearchSetter] = useState<TypeOfSearch>(TypeOfSearch.FOLIO)

    function onSelectFolioType() {
        typeOfSearchSetter(x => {
            return TypeOfSearch.FOLIO
        })
    }
    function onSelectRutType() {
        typeOfSearchSetter(x => {
            return TypeOfSearch.RUT
        })
    }
    function onSelectBeneficiarioType() {
        typeOfSearchSetter(x => {
            return TypeOfSearch.BENEFICIARIO
        })
    }

    const activeColorFolio: ActiveColor = TypeOfSearch.FOLIO === typeOfSearch && 'primary' || 'inherit'
    const activeColorRut: ActiveColor = TypeOfSearch.RUT === typeOfSearch && 'primary' || 'inherit'
    const activeColorBeneficiario: ActiveColor = TypeOfSearch.BENEFICIARIO === typeOfSearch && 'primary' || 'inherit'

    return {
        typeOfSearch,
        onSelectFolioType,
        onSelectRutType,
        onSelectBeneficiarioType,
        activeColorFolio,
        activeColorRut,
        activeColorBeneficiario,
        TypeOfSearch
    }
}