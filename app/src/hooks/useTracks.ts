"use client"

import { useEffect, useState } from "react";

export interface Track {
  title: string;
  description?: string;
  slug: string;
  created_at?: string;
  audio_url?: string;
  tags?: string[];
}

interface UseTracksOptions {
  page?: number;
  limit?: number;
  tag?: string;
}

export function useTracks({ page = 1, limit = 10, tag }: UseTracksOptions = {}) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (tag) params.append("tag", tag);

    fetch(`/api/tracks?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setTracks(data.tracks || []);
        setTotalPages(data.totalPages || 1);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to fetch tracks:", err);
        setError("Failed to fetch tracks");
        setTracks([]);
      })
      .finally(() => setLoading(false));
  }, [page, limit, tag]);

  return { tracks, totalPages, loading, error };
}
