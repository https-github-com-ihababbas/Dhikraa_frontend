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
      
      <head />
      <AuthWrapper>
          <body>
           
            <Header />

            

            <main >{children}</main>

           
            <Footer />
          </body>
      </AuthWrapper>
    </html>
  );
}
