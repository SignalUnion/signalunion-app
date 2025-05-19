'use client'

import Link from "next/link";
import React, { useState } from "react";
import Image from 'next/image';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full z-50 bg-black/60 backdrop-blur-md text-white shadow-sm md:fixed md:top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/signalunion_avatar_square_512.png"
            alt="SignalUnion Logo"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-semibold text-lg tracking-wide">SignalUnion</span>
        </Link>
        <nav className={`space-x-6 ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
          <Link href="/submit" className="hover:underline hover:text-blue-300 transition">
            Submit
          </Link>
          <Link href="/admin/dashboard" className="hover:underline hover:text-blue-300 transition">
            Admin
          </Link>
          <Link href="/login" className="hover:underline hover:text-blue-300 transition">
            Login
          </Link>
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white">☰</button>
        </div>
      </div>
    </header>
  );
} 