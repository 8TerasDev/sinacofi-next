"use client";
import HomeView from "@/components/views/HomeView";
import { NewDeclaracionesProvider } from "@/contexts/new-declaraciones.context";
import React from "react";

export default function Home() {
  return (
    <NewDeclaracionesProvider>
      <HomeView />
    </NewDeclaracionesProvider>
  );
}
