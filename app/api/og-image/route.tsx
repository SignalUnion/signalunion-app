import { ImageResponse } from 'next/og';
import React from 'react';

import { tagToImageMap } from "../../../lib/tagToImageMap";
import { siteConfig } from "../../../lib/site";

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Get query parameters
  const title = searchParams.get('title');
  const description = searchParams.get('description');
  const tagsParam = searchParams.get('tags');
  const tags = tagsParam ? tagsParam.split(',').map(tag => tag.trim()) : [];

  // Determine background image based on tags
  const backgroundImage = tags.find(tag => tagToImageMap[tag]) ? tagToImageMap[tags.find(tag => tagToImageMap[tag])!] : siteConfig.ogImage;

  // Fallback title and description if not provided
  const displayTitle = title || siteConfig.name;
  const displayDescription = description || siteConfig.description;

  return new ImageResponse(
    (
      <div style={{
        fontSize: 60,
        background: `url(${backgroundImage}) no-repeat center center`, // Use background image
        backgroundSize: 'cover',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        textAlign: 'center',
        color: 'white', // Text color for readability on background
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)', // Add text shadow
      }}>
        {displayTitle && <div style={{ fontSize: 80, fontWeight: 'bold' }}>{displayTitle}</div>}
        {displayDescription && <div style={{ fontSize: 40, marginTop: 20 }}>{displayDescription}</div>}
        {tags.length > 0 && <div style={{ fontSize: 30, marginTop: 20 }}>{tags.join(', ')}</div>} {/* Optional: display tags */}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
} 