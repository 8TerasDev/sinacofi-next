"use client";

import React, { useState } from 'react'

import SinaDrawer from '../../molecules/SinaDrawer';
import ContainerFull from '../../atoms/ContainerFull';
import DrawerBody from '../../organisms/DrawerBody';
import SinaAppBar from '../../molecules/SinaAppBar';
import SinaMainCard from '../../organisms/SinaMainCard';
import SinaTable from '../../organisms/SinaTable';
import { Declaracion } from '@/application';
import { MainLayout } from '@/components/atoms/MainLayout';

interface HomeTemplateProps {
    declaraciones: Declaracion[]
}

const HomeTemplate = ({ declaraciones }: HomeTemplateProps) => {
    const [isOpen, isOpenSetter] = useState(true)
    return (
        <MainLayout>
            <SinaAppBar />
            <SinaDrawer isOpen={isOpen} isOpenSetter={isOpenSetter}>
                <DrawerBody isOpen={isOpen} isOpenSetter={isOpenSetter} />
            </SinaDrawer>
            <SinaMainCard>
                <SinaTable declaraciones={declaraciones} />
            </SinaMainCard>
        </MainLayout>
    )
}

export default HomeTemplate