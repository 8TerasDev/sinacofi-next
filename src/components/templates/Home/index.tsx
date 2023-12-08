"use client";
import React, { useContext, useEffect, useState } from "react";
import SinaDrawer from "../../molecules/SinaDrawer";
import DrawerBody from "../../organisms/DrawerBody";
import SinaAppBar from "../../molecules/SinaAppBar";
import SinaMainCard from "../../organisms/SinaMainCard";
import SinaTable from "../../organisms/SinaTable";
import { MainLayout } from "@/components/atoms/MainLayout";
import { CircularProgress, Stack } from "@mui/material";
import SinaCardHeader from "../../molecules/SinaCardHeader";
import { EmptyTable } from "@/components/organisms/EmptyTable";
import {
  NewDeclaracionesContext,
} from "@/contexts/new-declaraciones.context";
import AdminComponent from "@/app/admin/AdminComponent";

const HomeLoader = ({ loading, isAdmin }: any) => {
  const { hasData } = useContext(NewDeclaracionesContext);
  if (loading) {
    return (
      <Stack justifyContent={"center"} alignItems={"center"} flex={1}>
        <CircularProgress />
      </Stack>
    );
  }
  if (isAdmin) {
    return <AdminComponent />;
  }
  return (
    <Stack flex={1}>
      <SinaCardHeader />
      {hasData() ? <SinaTable /> : <EmptyTable />}
    </Stack>
  );
};

const HomeTemplate = ({ isAdmin, handleBankAdmin, loading }: any) => {
  const [isOpen, isOpenSetter] = useState(true);

  return (
    <MainLayout>
      <SinaAppBar handleAdmin={handleBankAdmin} />
      <SinaDrawer isOpen={isOpen} isOpenSetter={isOpenSetter}>
        {!isAdmin && (
          <DrawerBody isOpen={isOpen} isOpenSetter={isOpenSetter} />
        )}
      </SinaDrawer>
      <SinaMainCard>
        <HomeLoader isAdmin={isAdmin} loading={loading} />
      </SinaMainCard>
    </MainLayout>
  );
};

export default HomeTemplate;
