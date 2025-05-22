export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TrackCard } from "@/components/TrackCard";

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();

  const { data: artist, error: artistError } = await supabase
    .from("artists")
    .select("name, bio, image_url, id")
    .eq("slug", params.slug)
    .single();

  if (artistError || !artist) {
    notFound();
  }

  const { data: tracks, error: tracksError } = await supabase
    .from("tracks")
    .select("title, description, slug, created_at, audio_url")
    .eq("artist_id", artist.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={artist.image_url || "/default-artist.jpg"}
            alt={artist.name}
            className="object-cover w-full h-96 opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-24 text-white">
          <h1 className="text-5xl font-extrabold mb-4">{artist.name}</h1>
          <p className="text-lg max-w-2xl">{artist.bio}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Tracks</h2>
        {tracks && tracks.length > 0 ? (
          <ul className="space-y-6">
            {tracks.map((track) => (
              <TrackCard key={track.slug} {...track} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tracks found for this artist.</p>
        )}
      </div>
    </div>
  );
}
