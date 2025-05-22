"use client"

import { useState } from "react";
import { useTracks } from "@/hooks/useTracks";
import { TrackCard } from "@/components/TrackCard";

const tags = ["ambient", "glitch", "downtempo", "spoken-word"];

export default function TrackBrowser() {
  const [page, setPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const { tracks, totalPages, loading, error } = useTracks({ page, limit: 6, tag: selectedTag });

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Browse Tracks</h1>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTag(undefined)}
          className={`px-3 py-1 text-sm rounded border ${
            !selectedTag ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setSelectedTag(tag);
              setPage(1);
            }}
            className={`px-3 py-1 text-sm rounded border ${
              selectedTag === tag ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && tracks && (
        <ul className="space-y-6">
          {tracks.map((track) => (
            <TrackCard key={track.slug} {...track} />
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-4 pt-8">
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
