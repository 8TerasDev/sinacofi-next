"use client";
import { usePathname } from "next/navigation";
import LoginTemplate from "@/components/templates/Login";
import axios from "axios";
import { useEffect } from "react";
import { setBasePath } from "@/contexts/path.context";

async function getProfile() {
  const { data } = await axios.get("/api/auth/getprofile");
  return data;
}

export default function App() {
  useEffect(() => {
    setBasePath(document.location.pathname);
    getProfile().then((data) => console.log(data));
  }, []);

  return <LoginTemplate />;
}
