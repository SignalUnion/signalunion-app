import { createClient } from '@supabase/supabase-js';

import { usePageMeta } from '../../../../lib/usePageMeta'; // Although hooks cannot be used directly here, keeping import for clarity of original logic source
import { metaConfig } from '../../../../lib/metaConfig';
import { siteConfig } from '../../../../lib/site';
import { tagToImageMap } from '../../../../lib/tagToImageMap';

// Data fetching for generateMetadata
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function generateMetadata({
  params,
  searchParams,
}: { 
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentPath = '/submit'; // Explicitly set the path for the submit page

  const { data: dbMetaData, error } = await supabaseAdmin
    .from("pages_metadata")
    .select("*")
    .eq("path", currentPath)
    .single();

  const configMeta = metaConfig[currentPath] || {};

  // Determine title, description, image
  const title = dbMetaData?.title || configMeta.title || siteConfig.name;
  const description = dbMetaData?.description || configMeta.description || siteConfig.description;

  // Image logic (adapting from MetaHead)
  // How to get tags for the submit page? Maybe via search params?
  const tags = searchParams.tags as string | undefined; // Assuming tags can be passed as a comma-separated string
  const tagArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
  
  // Construct the URL for the dynamic OG image API route
  const encodedTitle = encodeURIComponent(title);
  const tagString = tagArray.join(',');
  const dynamicOgImageUrl = `${siteConfig.url}/api/og-image?title=${encodedTitle}&tags=${encodeURIComponent(tagString)}`;

  // Determine the final image URL - prioritize db, then dynamic api, then default site image
  const imageUrl = dbMetaData?.og_image_url || dynamicOgImageUrl || siteConfig.ogImage;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${siteConfig.url}${currentPath}`,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [imageUrl],
    },
  };
} 