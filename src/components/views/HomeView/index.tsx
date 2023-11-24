import HomeTemplate from '@/components/templates/Home';
import React, { useContext } from 'react'
import { DeclaracionesContext } from '@/contexts/declaraciones.context';
import Loading from '@/app/loading';

const HomeView = () => {

    const { state,isLoading } = useContext(DeclaracionesContext)
    return (
        <HomeTemplate
            isLoading={isLoading}
            state={state}
        />
    )
}

export default HomeView