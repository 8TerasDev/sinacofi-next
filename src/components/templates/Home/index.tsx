"use client";

import React, { useContext, useState } from "react";
import axios from '@/common/http-client';

import SinaDrawer from "../../molecules/SinaDrawer";
import ContainerFull from "../../atoms/ContainerFull";
import DrawerBody from "../../organisms/DrawerBody";
import SinaAppBar from "../../molecules/SinaAppBar";
import SinaMainCard from "../../organisms/SinaMainCard";
import SinaTable from "../../organisms/SinaTable";
import { Declaracion, PJuridicas } from "@/application";
import { MainLayout } from "@/components/atoms/MainLayout";
import { CircularProgress, Stack } from "@mui/material";
import SinaCardHeader from "../../molecules/SinaCardHeader";
import { EmptyTable } from "@/components/organisms/EmptyTable";
import { useRouter } from "next/navigation";
import { NewDeclaracionesContext } from "@/contexts/new-declaraciones.context";

interface HomeTemplateProps {
  isLoading: boolean;
  state: any;
}

const HomeTemplate = ({ state }: HomeTemplateProps) => {
  const { declaraciones, 
    isLoading 
  } = useContext(NewDeclaracionesContext);

  const [isOpen, isOpenSetter] = useState(true);
  const route = useRouter();
  const isAdmin = true;

  const handleAdmin = () => {
    isAdmin && route.push(`/admin`);
  };

  return (
    <MainLayout>
      <SinaAppBar handleAdmin={isAdmin && handleAdmin} />
      <SinaDrawer isOpen={isOpen} isOpenSetter={isOpenSetter}>
        <DrawerBody isOpen={isOpen} isOpenSetter={isOpenSetter} />
      </SinaDrawer>
      <SinaMainCard>
        {isLoading ? (
          <Stack justifyContent={"center"} alignItems={"center"} flex={1}>
            <CircularProgress />
          </Stack>
        ) : (
          <Stack flex={1}>
            <SinaCardHeader />
            {declaraciones && declaraciones.length !== 0 ? (
              <SinaTable />
            ) : (
              <EmptyTable />
            )}
          </Stack>
        )}
      </SinaMainCard>
    </MainLayout>
  );
};

export default HomeTemplate;
