import type { Metadata } from "next";
import axios from "axios";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers/reactQuery.provider";
import { TypeSearchProvider } from "@/contexts/typesearch.context";
import { DeclaracionesProvider } from "@/contexts/declaraciones.context";
import { NewDeclaracionesProvider } from "@/contexts/new-declaraciones.context";
import { useEffect } from "react";
import { setBasePath } from "@/contexts/path.context";

export const metadata: Metadata = {
  title: "Sinacofi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='es'>
      <body>
        <ReactQueryProvider>
          <TypeSearchProvider>
            <NewDeclaracionesProvider>{children}</NewDeclaracionesProvider>
          </TypeSearchProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
