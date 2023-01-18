"use client";

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthWrapper from "./contexts/auth";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <AuthWrapper>
        <body>
          {/* Header */}
          <Header />

          {/* main */}
          
          <main className='dark:bg-black'>{children}</main>

          {/* Footer */}
          <Footer />
        </body>
      </AuthWrapper>
    </html>
  );
}
