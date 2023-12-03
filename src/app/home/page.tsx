"use client";
import { NotificationBar } from "@/components/organisms/NotificationBar";
import HomeView from "@/components/views/HomeView";
import { NewDeclaracionesProvider } from "@/contexts/new-declaraciones.context";
import React from "react";

export default function Home() {
  return (
    <NewDeclaracionesProvider>
      <HomeView />
      <NotificationBar />
    </NewDeclaracionesProvider>
  );
}
