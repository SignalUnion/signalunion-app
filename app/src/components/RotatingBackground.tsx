'use client'

import { useState, useEffect } from 'react'

export default function RotatingBackground() {
  const [currentBg, setCurrentBg] = useState(1)
  const totalBackgrounds = 4

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev % totalBackgrounds) + 1)
    }, 10000) // Changed from 5000 to 10000 (10 seconds)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 -z-10">
      {Array.from({ length: totalBackgrounds }).map((_, index) => (
        <div
          key={index + 1}
          className={`absolute inset-0 transition-opacity duration-2000 ${
            currentBg === index + 1 ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(/bg-${index + 1}.webp)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black/30" /> {/* Overlay for better text readability */}
    </div>
  )
} 