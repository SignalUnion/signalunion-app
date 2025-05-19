'use client'

import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-10 py-6 text-center text-sm text-gray-500 border-t border-gray-700 bg-black/30 backdrop-blur-md">
      <p>© {currentYear} SignalUnion — Distributed with dignity.</p>
      <p className="mt-1">
        <a href="/about" className="hover:underline text-gray-400">About</a> · 
        <a href="/terms" className="hover:underline text-gray-400 mx-2">Terms</a> · 
        <a href="/contact" className="hover:underline text-gray-400">Contact</a>
      </p>
    </footer>
  );
} 