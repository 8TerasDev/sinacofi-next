"use client";
import { usePathname } from "next/navigation";
import LoginTemplate from "@/components/templates/Login";
import axios from '@/common/http-client';
import { useEffect } from "react";

async function getProfile() {
  const { data } = await axios.get("/api/auth/getprofile");
  return data;
}

export default function App() {
  useEffect(() => {
    getProfile().then((data) => console.log(data));
  }, []);

  return <LoginTemplate />;
}
