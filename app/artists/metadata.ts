import { siteConfig } from "@/lib/site";
import { tagToImageMap } from "@/lib/tagToImageMap";

export async function generateMetadata() {
  const title = "SignalUnion Artists";
  const description = "Discover the voices and visionaries shaping SignalUnion.";
  const tags = ["artists", "music"];

  const imageUrl = `/api/og-image?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&tags=${tags.join(",")}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
