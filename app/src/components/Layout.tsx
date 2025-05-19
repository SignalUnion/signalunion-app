import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="pt-16 flex-grow">{children}</main>
      <Footer />
    </div>
  );
} 