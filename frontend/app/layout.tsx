import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/output.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        
        {/* <Header /> */}
        <main className=" text-white bg-black">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
    
  );
}