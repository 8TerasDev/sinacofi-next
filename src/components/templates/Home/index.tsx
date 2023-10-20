"use client";

import React, { useState } from 'react'

import SinaDrawer from '../../molecules/SinaDrawer';
import ContainerFull from '../../atoms/ContainerFull';
import DrawerBody from '../../organisms/DrawerBody';
import SinaAppBar from '../../molecules/SinaAppBar';
import SinaMainCard from '../../organisms/SinaMainCard';
import SinaTable from '../../organisms/SinaTable';

const HomeTemplate = () => {
    const [isOpen, isOpenSetter] = useState(true)
    return (
        <ContainerFull>
            <SinaAppBar />
            <SinaDrawer isOpen={isOpen} isOpenSetter={isOpenSetter}>
                <DrawerBody isOpen={isOpen} isOpenSetter={isOpenSetter} />
            </SinaDrawer>
            <SinaMainCard>
                <SinaTable />
            </SinaMainCard>
        </ContainerFull>
    )
}

export default HomeTemplate