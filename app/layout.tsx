'use client';

import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* Header */}
        <Header />

        {/* main */}
        <main>
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  )
}
