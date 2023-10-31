import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ReactQueryProvider from '@/providers/reactQuery.provider'
import { TypeSearchProvider } from '@/contexts/typesearch.context'

export const metadata: Metadata = {
  title: 'Sinacofi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <ReactQueryProvider>
          <TypeSearchProvider>
            {children}
          </TypeSearchProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
