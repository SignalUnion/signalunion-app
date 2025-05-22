import { ImageResponse } from 'next/og';
import React from 'react';

export type OgImageOptions = {
  title?: string;
  description?: string;
  tags?: string[];
};

// Basic helper, the main image generation logic will be in opengraph-image.tsx
export async function generateOgImage(options: OgImageOptions): Promise<ImageResponse> {
  // This is a placeholder. The actual image generation will happen in opengraph-image.tsx
  // which has access to more context and can render React components.
  // This function might be used for shared logic or default image generation if needed elsewhere.

  // For now, returning a simple placeholder response
  return new ImageResponse(
    (
      <div style={{ fontSize: 40, background: 'white', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {options.title || 'SignalUnion OG Image'}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
} 