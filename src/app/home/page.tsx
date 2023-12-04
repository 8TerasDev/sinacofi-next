"use client";
import { NotificationBar } from "@/components/organisms/NotificationBar";
import HomeView from "@/components/views/HomeView";

import React from "react";

export default function Home() {
  return (
    <>
      <HomeView />
      <NotificationBar />
    </>
  );
}
