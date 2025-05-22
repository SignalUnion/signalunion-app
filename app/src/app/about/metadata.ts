import { siteConfig } from "@/lib/site";
import { tagToImageMap } from "@/lib/tagToImageMap";

export async function generateMetadata() {
  const title = "About SignalUnion";
  const description = "Learn more about SignalUnion and its mission.";
  const tags = ["about", "team"];

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
