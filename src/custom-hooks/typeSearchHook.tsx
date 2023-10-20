import React from 'react'

enum TypeOfSearch {
    FOLIO = 'FOLIO',
    RUT = 'RUT'
}

type ActiveColor = 'primary' | 'inherit'
export const useTypeSearch = () => {
    const [typeOfSearch, typeOfSearchSetter] = React.useState<TypeOfSearch>(TypeOfSearch.FOLIO)

    function onSelectFolioType() {
        typeOfSearchSetter(TypeOfSearch.FOLIO)
    }
    function onSelectRutType() {
        typeOfSearchSetter(TypeOfSearch.RUT)
    }

    const activeColorFolio: ActiveColor = TypeOfSearch.FOLIO === typeOfSearch ? 'primary' : 'inherit'
    const activeColorRut: ActiveColor = TypeOfSearch.RUT === typeOfSearch ? 'primary' : 'inherit'

    return { typeOfSearch, onSelectFolioType, onSelectRutType, activeColorFolio, activeColorRut, TypeOfSearch }
}