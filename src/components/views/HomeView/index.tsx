import HomeTemplate from '@/components/templates/Home';
import React, { useContext } from 'react'
import { DeclaracionesContext } from '@/contexts/declaraciones.context';



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

    const { declaraciones } = useContext(DeclaracionesContext)
    return (
        <HomeTemplate
            declaraciones={declaraciones}
        />
    )
}

export default HomeView