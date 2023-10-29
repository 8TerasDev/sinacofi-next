import { Declaracion } from '@/application';
import HomeTemplate from '@/components/templates/Home';
import { useQuery } from '@tanstack/react-query'
import React from 'react'




async function getDeclaraciones() {
    const response = await fetch('/api/declaraciones')
    const data = await response.json()
    return data
}

const HomeView = () => {
    const {
        data: declaracionesRaw,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['declaraciones'],
        queryFn: async () => { return getDeclaraciones() }
    })
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>
    const { declaraciones } = declaracionesRaw
    // return (<div>{JSON.stringify(declaraciones)}</div>)
    return (
        <HomeTemplate
            declaraciones={declaraciones}
        />
    )
}

export default HomeView