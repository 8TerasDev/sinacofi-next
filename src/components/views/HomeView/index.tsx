"use client";
import HomeTemplate from "@/components/templates/Home";
import { useGetProfile } from "@/custom-hooks/useGetProfile";
import { useRouter } from "next/navigation";
import React from "react";

const HomeView = () => {
  const route = useRouter();
  const { data: userData, isLoading: loading }: any = useGetProfile();
  const { isBankAdmin, isAdmin } = userData || {};

  const handleBankAdmin =
    isBankAdmin && !isAdmin && ((page: string) => route.push("/bankadmin"));

  return (
    <HomeTemplate
      isAdmin={isAdmin}
      handleBankAdmin={handleBankAdmin}
      loading={loading}
    />
  );
};

export default HomeView;
