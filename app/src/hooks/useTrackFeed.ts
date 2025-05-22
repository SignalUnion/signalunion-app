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

export function useTrackFeed({ tag, sort = "newest" }: { tag?: string; sort?: "newest" | "popular" }) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setTracks([]);
    setPage(1);
    setHasMore(true);
  }, [tag, sort]);

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "6",
      });
      if (tag) params.append("tag", tag);
      if (sort) params.append("sort", sort);

      const res = await fetch(`/api/tracks?${params.toString()}`);
      const data = await res.json();

      if (res.ok) {
        setTracks((prev) => [...prev, ...data.tracks]);
        setHasMore(page < data.totalPages);
      }
      setLoading(false);
    };

    fetchTracks();
  }, [page, tag, sort]);

  return {
    tracks,
    loading,
    loadMore: () => setPage((p) => p + 1),
    hasMore,
    page,
  };
}
