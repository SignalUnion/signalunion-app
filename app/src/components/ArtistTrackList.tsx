import Link from "next/link";

interface Track {
  title: string;
  description: string;
  slug: string;
  audio_url?: string;
  created_at?: string;
}

interface Props {
  tracks: Track[];
}

export function ArtistTrackList({ tracks }: Props) {
  if (!tracks || tracks.length === 0) {
    return <p className="text-gray-500">No tracks found for this artist.</p>;
  }

  return (
    <ul className="space-y-6">
      {tracks.map((track) => (
        <li key={track.slug} className="border-b border-gray-200 pb-6">
          <Link href={`/tracks/${track.slug}`}>
            <h3 className="text-xl font-bold text-blue-600 hover:underline">{track.title}</h3>
          </Link>
          <p className="text-sm text-gray-600 mb-2">{track.description}</p>
          {track.created_at && (
            <p className="text-xs text-gray-400 mb-2">
              Released {new Date(track.created_at).toLocaleDateString()}
            </p>
          )}
          {track.audio_url && (
            <audio controls className="w-full mt-2">
              <source src={track.audio_url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </li>
      ))}
    </ul>
  );
}
