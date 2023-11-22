"use client"
import HomeTemplate from '@/components/templates/Home'
import HomeView from '@/components/views/HomeView'
import { setBasePath } from '@/contexts/path.context';
import React, { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    setBasePath(document.location.pathname);
  }, []);
  return (
    <HomeView />
  )
}
