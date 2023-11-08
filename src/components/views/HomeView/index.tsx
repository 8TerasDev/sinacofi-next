import HomeTemplate from '@/components/templates/Home';
import React, { useContext } from 'react'
import { DeclaracionesContext } from '@/contexts/declaraciones.context';



async function getDeclaraciones() {
    const response = await fetch('/api/declaraciones')
    const data = await response.json()
    return data
}

const HomeView = () => {

    const { state, isLoading } = useContext(DeclaracionesContext)
    return (
        <HomeTemplate
            declaraciones={state.declaraciones}
            isLoading={isLoading}
        />
    )
}

export default HomeView