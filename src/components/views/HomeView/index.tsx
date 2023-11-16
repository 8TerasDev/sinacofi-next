import HomeTemplate from '@/components/templates/Home';
import React, { useContext } from 'react'
import { DeclaracionesContext } from '@/contexts/declaraciones.context';

const HomeView = () => {

    const { state, isLoading } = useContext(DeclaracionesContext)
    return (
        <HomeTemplate
            declaraciones={state.declaraciones}
            isLoading={isLoading}
            state={state}
        />
    )
}

export default HomeView