"use client"

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTrackFeed } from "@/hooks/useTrackFeed";
import { TrackCard } from "@/components/TrackCard";

export default function TrackFeedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tag, setTag] = useState<string | undefined>(searchParams.get("tag") || undefined);
  const [sort, setSort] = useState<"newest" | "popular">(
    (searchParams.get("sort") as "newest" | "popular") || "newest"
  );
  const [query, setQuery] = useState<string>(searchParams.get("query") || "");
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  const { tracks, loading, hasMore, loadMore } = useTrackFeed({ tag, sort });

  useEffect(() => {
    fetch("/api/tags")
      .then((res) => res.json())
      .then((data) => setAvailableTags(data.tags || []));
  }, []);

  const updateUrlParams = (params: Record<string, string | undefined>) => {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val) search.set(key, val);
    });
    router.push(`/tracks/feed?${search.toString()}`);
  };

  const handleTagSelect = (newTag?: string) => {
    setTag(newTag);
    updateUrlParams({ tag: newTag, sort, query });
  };

  const handleSortChange = (val: "newest" | "popular") => {
    setSort(val);
    updateUrlParams({ tag, sort: val, query });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUrlParams({ tag, sort, query });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Explore Tracks</h1>

      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-3 py-1 text-sm border rounded w-full"
        />
        <button type="submit" className="px-4 py-1 bg-blue-600 text-white rounded text-sm">
          Search
        </button>
      </form>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => handleTagSelect(undefined)}
          className={`px-3 py-1 text-sm rounded border ${
            !tag ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          All
        </button>
        {availableTags.map((t) => (
          <button
            key={t}
            onClick={() => handleTagSelect(t)}
            className={`px-3 py-1 text-sm rounded border ${
              tag === t ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <label className="text-sm mr-2">Sort by:</label>
        <select
          value={sort}
          onChange={(e) => handleSortChange(e.target.value as "newest" | "popular")}
          className="text-sm px-2 py-1 border rounded"
        >
          <option value="newest">Newest</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {tracks.length === 0 && loading && <p className="text-gray-500">Loading...</p>}

      <ul className="space-y-6">
        {tracks.map((track) => (
          <TrackCard key={track.slug} {...track} />
        ))}
      </ul>

      {hasMore && !loading && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Load More
          </button>
        </div>
      )}

      {loading && <p className="text-gray-400 text-center mt-4">Loading more...</p>}
    </div>
  );
}
