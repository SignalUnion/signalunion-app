"use client"

import Link from "next/link";
import { useState } from "react";

interface Track {
  title: string;
  description: string;
  slug: string;
  audio_url?: string;
  created_at?: string;
}

interface Props {
  tracks: Track[];
  perPage?: number;
}

export function PaginatedTrackList({ tracks, perPage = 5 }: Props) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(tracks.length / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const visibleTracks = tracks.slice(start, end);

  return (
    <div className="space-y-6">
      <ul className="space-y-6">
        {visibleTracks.map((track) => (
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

      {totalPages > 1 && (
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 text-sm bg-gray-100 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 text-sm bg-gray-100 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
