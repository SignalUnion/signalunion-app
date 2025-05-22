import { siteConfig } from '../../lib/site';
import { usePageMeta } from '../../lib/usePageMeta';
import { metaConfig } from '../../lib/metaConfig';
import React from 'react';

export async function generateMetadata({
  params,
  searchParams,
}: { 
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // You can access route parameters and search parameters here if needed
  // For a layout, we might not need them, but keeping the signature for consistency

  // In a layout, the path is implicitly the current route segment.
  // We'll need to determine the full path to use usePageMeta and metaConfig.
  // This might require accessing the pathname from headers or other means,
  // or potentially fetching metadata within individual pages/layouts for more accuracy.
  // For a simple layout, we'll rely on the root path metadata for now.

  // Prioritize site-wide defaults for the layout
  const defaultTitle = siteConfig.name;
  const defaultDescription = siteConfig.description;

  // Note: Database and metaConfig lookups might be better suited within
  // page-level generateMetadata functions where the exact path is clearer.
  // For a root layout, site-wide defaults are most appropriate.

  return {
    title: {
      default: defaultTitle,
      template: `%s | ${siteConfig.name}`,
    },
    description: defaultDescription,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: defaultTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: defaultTitle,
      description: defaultDescription,
      images: [siteConfig.ogImage],
      creator: siteConfig.links.twitter, // Use actual twitter handle if available
    },
  };
}

export default function MetaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
} 