import { Declaracion } from '@/application';
import HomeTemplate from '@/components/templates/Home';
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { base_pruebas } from '../../../../data_sinacofi/bbdd';



async function getDeclaraciones() {
    const response = await fetch('/api/declaraciones')
    const data = await response.json()
    return data
}

const HomeView = () => {
    // const {
    //     data: declaracionesRaw,
    //     isLoading,
    //     isError,
    // } = useQuery({
    //     queryKey: ['declaraciones'],
    //     queryFn: async () => { return getDeclaraciones() }
    // })
    // if (isLoading) return <div>Loading...</div>
    // if (isError) return <div>Error</div>
    // const { declaraciones } = declaracionesRaw

    // return (<div>{JSON.stringify(declaraciones[0])}</div>)
    return (
        <HomeTemplate
            declaraciones={base_pruebas}
        />
    )
}

export default HomeView