"use client";

import React, { useState } from 'react'

import SinaDrawer from '../../molecules/SinaDrawer';
import ContainerFull from '../../atoms/ContainerFull';
import DrawerBody from '../../organisms/DrawerBody';
import SinaAppBar from '../../molecules/SinaAppBar';
import SinaMainCard from '../../organisms/SinaMainCard';
import SinaTable from '../../organisms/SinaTable';
import { Declaracion, PJuridicas } from '@/application';
import { MainLayout } from '@/components/atoms/MainLayout';
import { CircularProgress, Stack } from '@mui/material';
import SinaCardHeader from '../../molecules/SinaCardHeader';
import { EmptyTable } from '@/components/organisms/EmptyTable';
import { useRouter } from 'next/navigation';

interface HomeTemplateProps {
    //declaraciones: PJuridicas[],
    isLoading: boolean,
    state: any
}

const HomeTemplate = ({ isLoading, state }: HomeTemplateProps) => {
    const [isOpen, isOpenSetter] = useState(true);
    const route = useRouter();
    const isAdmin = true;
    const { declaraciones, filter } = state;
    const handleAdmin = () => {
      isAdmin && route.push('/admin');
    }
    
    return (
        <MainLayout>
            <SinaAppBar handleAdmin={isAdmin && handleAdmin}/>
            <SinaDrawer isOpen={isOpen} isOpenSetter={isOpenSetter}>
                <DrawerBody isOpen={isOpen} isOpenSetter={isOpenSetter} />
            </SinaDrawer>
            <SinaMainCard>
              {isLoading ? 
                <Stack justifyContent={'center'} alignItems={'center'} flex={1}>
                  <CircularProgress/>
                </Stack> :
                <>
                  {state.declaraciones.length > 0 ? 
                    <Stack flex={1}>
                      <SinaCardHeader />
                      <SinaTable declaraciones={declaraciones} />        
                    </Stack> :
                    <EmptyTable filterBy={filter.filterBy} input={filter.filterInput}/>
                  }         
                </>
              }
            </SinaMainCard>
        </MainLayout>
    )
}

export default HomeTemplate