'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from 'next/image';

const phrases = [
  "Sound beyond the system.",
  "Preserve the pulse.",
  "Resist silence.",
  "Remix the future.",
  "Broadcast what matters.",
];

export default function LandingPage() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen text-white flex flex-col items-center justify-center px-4 py-10 space-y-12 relative">
      <section className="text-center space-y-4 relative z-10 bg-black/30 backdrop-blur-sm p-6 rounded-xl">
        <Image 
          src="/signalunion_avatar_square_512.png" 
          alt="SignalUnion Logo" 
          width={128}
          height={128}
          className="w-32 h-32 mx-auto mb-4 rounded-full" 
        />
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white">SignalUnion</h1>
        <p className="text-xl md:text-2xl text-gray-200 h-8 transition-opacity duration-500 ease-in-out">
          {phrases[phraseIndex]}
        </p>
        <div className="flex gap-4 justify-center pt-6">
          <Link href="/submit">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-medium transition-colors duration-200">
              Submit Your Track
            </button>
          </Link>
          <Link href="/admin/dashboard">
            <button className="border border-gray-400 text-gray-200 hover:text-white hover:border-white px-6 py-3 rounded-xl text-lg font-medium transition-colors duration-200">
              Admin Dashboard
            </button>
          </Link>
        </div>
      </section>

      <section className="max-w-3xl text-center space-y-6 text-gray-200 relative z-10">
        <h2 className="text-2xl font-semibold text-white">What is SignalUnion?</h2>
        <p className="bg-black/40 backdrop-blur-sm p-6 rounded-xl">
          SignalUnion is a decentralized platform for artists, curators, and cultural archivists.
          Submit music, remix futures, and resist silence. This is a refuge for sound—
          ambient, griefwave, resistance, posthuman anthems—and we keep them alive across
          airwaves, meshnets, and memory.
        </p>
      </section>

      <section className="max-w-3xl text-center text-gray-200 space-y-4 relative z-10">
        <h3 className="text-xl font-semibold text-white">How It Works</h3>
        <ul className="space-y-2 bg-black/40 backdrop-blur-sm p-6 rounded-xl">
          <li>🎙️ <strong>Submit Tracks:</strong> Share your original works, remixes, or sonic messages.</li>
          <li>📡 <strong>Preserve Signals:</strong> All tracks are archived and prepared for resilient broadcast.</li>
          <li>🧪 <strong>Curate Without Algorithms:</strong> Community, not engagement, decides what endures.</li>
        </ul>
      </section>

    </main>
  );
}
