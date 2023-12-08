import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/providers/reactQuery.provider";
import { TypeSearchProvider } from "@/contexts/typesearch.context";
import { NewDeclaracionesProvider } from "@/contexts/new-declaraciones.context";

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
          <NewDeclaracionesProvider>
            <TypeSearchProvider>{children}</TypeSearchProvider>
          </NewDeclaracionesProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
