'use client'

import React, { useState } from "react";
import { TrackPreviewCard, TrackSubmission } from "@/components/TrackPreviewCard";

const sampleSubmissions: TrackSubmission[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `track-${i}`,
  artist_name: `Artist ${i}`,
  spotify_link: "https://open.spotify.com/artist/...",
  track_url: "https://soundcloud.com/...",
  remix_url: "https://drive.google.com/...",
  tags: ["ambient", "resistance"],
  contact_email: `artist${i}@email.com`,
  status: "pending",
  created_at: new Date().toISOString(),
  selected: false,
}));

const PAGE_SIZE = 5;

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState(sampleSubmissions);
  const [currentPage, setCurrentPage] = useState(0);

  const toggleSelect = (id: string) => {
    setSubmissions(submissions.map(sub =>
      sub.id === id ? { ...sub, selected: !sub.selected } : sub
    ));
  };

  const bulkAction = (status: "approved" | "rejected") => {
    setSubmissions(submissions.map(sub =>
      sub.selected ? { ...sub, status, selected: false } : sub
    ));
  };

  const pageSubmissions = submissions.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

  return (
    <div className="p-6 space-y-4 text-white min-h-screen">
      <h1 className="text-2xl font-bold">SignalUnion Admin Dashboard</h1>

      <div className="flex gap-4">
        <button onClick={() => bulkAction("approved")} className="bg-green-600 px-4 py-2 rounded">
          Approve Selected
        </button>
        <button onClick={() => bulkAction("rejected")} className="bg-red-600 px-4 py-2 rounded">
          Reject Selected
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pageSubmissions.map(sub => (
          <TrackPreviewCard key={sub.id} submission={sub} onToggleSelect={toggleSelect} />
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
          className="bg-gray-700 px-4 py-2 rounded disabled:opacity-30"
        >
          Previous
        </button>
        <button
          disabled={(currentPage + 1) * PAGE_SIZE >= submissions.length}
          onClick={() => setCurrentPage(p => p + 1)}
          className="bg-gray-700 px-4 py-2 rounded disabled:opacity-30"
        >
          Next
        </button>
      </div>
    </div>
  );
} 