import Link from "next/link";

interface Props {
  title: string;
  slug: string;
  description?: string;
  created_at?: string;
  audio_url?: string;
}

export function TrackCard({ title, slug, description, created_at, audio_url }: Props) {
  return (
    <li className="border-b border-gray-200 pb-6">
      <Link href={`/tracks/${slug}`}>
        <h3 className="text-xl font-bold text-blue-600 hover:underline">{title}</h3>
      </Link>
      {description && <p className="text-sm text-gray-600 mb-2">{description}</p>}
      {created_at && (
        <p className="text-xs text-gray-400 mb-2">
          Released {new Date(created_at).toLocaleDateString()}
        </p>
      )}
      {audio_url && (
        <audio controls className="w-full mt-2">
          <source src={audio_url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </li>
  );
}
