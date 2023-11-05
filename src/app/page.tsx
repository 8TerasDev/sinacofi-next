"use client"
import LoginTemplate from "@/components/templates/Login";
import axios from 'axios'
import { useEffect } from "react";

async function getProfile() {
  const { data } = await axios.get("/api/auth/getprofile")
  return data
}

export default function App() {

  useEffect(() => {
    getProfile()
      .then(data => console.log(data))
  }, [])

  return (
    <LoginTemplate />
  )
}
