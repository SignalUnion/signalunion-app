import { ImageResponse } from 'next/og';
import React from 'react';

import { siteConfig } from '../../lib/site';

// Image metadata
export const alt = siteConfig.name;
export const size = { width: 1200, height: 675 }; // Twitter card large image size
export const contentType = 'image/png';

// Dynamic Image generation for Twitter Card (as a fallback template)
export default async function Image({
  params,
}: { 
  params: { [key: string]: string | string[] | undefined };
}) {
  // This function now serves as a basic template fallback for Twitter cards.
  // It can optionally accept title/description via URL parameters if needed.
  // For simplicity, it currently uses site-wide defaults.

  const displayTitle = siteConfig.name; // Using site default
  const displayDescription = siteConfig.description; // Using site default
  const backgroundImage = siteConfig.ogImage; // Using site default image as background

  return new ImageResponse(
    (
      <div style={{
        fontSize: 60,
        background: backgroundImage ? `url(${backgroundImage}) no-repeat center center` : 'white',
        backgroundSize: 'cover',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        textAlign: 'center',
        color: backgroundImage ? 'white' : 'black', // Adjust text color based on background
        textShadow: backgroundImage ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none', // Add text shadow if background image is used
      }}>
        <div style={{ fontSize: 80, fontWeight: 'bold' }}>{displayTitle}</div>
        <div style={{ fontSize: 40, marginTop: 20 }}>{displayDescription}</div>
        {/* You could add Twitter specific branding or layout here */}
      </div>
    ),
    {
      ...size,
    },
  );
} 