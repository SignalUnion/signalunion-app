"use client"

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { TrackPreviewCard, TrackSubmission } from "@/components/TrackPreviewCard";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const PAGE_SIZE = 5;
let supabase: SupabaseClient | null = null;

type DashboardSubmission = TrackSubmission & { selected: boolean };

if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<DashboardSubmission[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const fetchSubmissions = async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("artist_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error loading submissions");
    } else {
      const formatted: DashboardSubmission[] = data.map((entry) => ({
        id: entry.id,
        title: entry.track_submission_title ?? "Untitled Track",
        artist: entry.artist_name ?? "Unknown Artist",
        spotify_link: entry.spotify_link ?? undefined,
        track_url: entry.track_submission_url ?? undefined,
        remix_url: entry.remix_file_url ?? undefined,
        tags: entry.signal_tags || [],
        contact_email: entry.contact_email,
        status: (entry.status || "pending") as TrackSubmission["status"],
        created_at: entry.created_at ?? undefined,
        selected: false,
      }));
      setSubmissions(formatted);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleUpdateStatus = async (id: string, status: TrackSubmission["status"]) => {
    if (!supabase) return;
    const { error } = await supabase
      .from("artist_submissions")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast.error("Status update failed");
    } else {
      toast.success(`Marked as ${status}`);
      fetchSubmissions();
    }
  };

  const toggleSelect = (id: string) => {
    setSubmissions(submissions.map(sub =>
      sub.id === id ? { ...sub, selected: !sub.selected } : sub
    ));
  };

  const bulkAction = async (status: "approved" | "rejected") => {
    if (!supabase) return;
    const selected = submissions.filter(sub => sub.selected);
    const ids = selected.map(sub => sub.id);

    if (ids.length === 0) {
      toast("No tracks selected");
      return;
    }

    const { error } = await supabase
      .from("artist_submissions")
      .update({ status })
      .in("id", ids);

    if (error) {
      toast.error("Bulk update failed");
    } else {
      toast.success(`Marked ${ids.length} tracks as ${status}`);
      fetchSubmissions();
    }
  };

  const filteredSubmissions = submissions.filter(sub =>
    filterStatus === "all" ? true : sub.status === filterStatus
  );

  const pageFilteredSubmissions = filteredSubmissions.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE
  );

  const statusOptions = ["all", "pending", "approved", "rejected"] as const;

  return (
    <div className="p-6 space-y-4 text-white min-h-screen">
      <div className="text-center mb-8 bg-black/30 backdrop-blur-sm p-6 rounded-xl">
        <h1 className="text-4xl font-bold text-white mb-2">SignalUnion Admin Dashboard</h1>
        <p className="text-lg text-gray-200">Manage submitted tracks</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex gap-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded ${
                filterStatus === status ? "bg-indigo-600" : "bg-gray-700"
              } transition-colors duration-200`}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <button onClick={() => bulkAction("approved")} className="bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors duration-200">
            Approve Selected
          </button>
          <button onClick={() => bulkAction("rejected")} className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors duration-200">
            Reject Selected
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pageFilteredSubmissions.map((sub) => (
          <TrackPreviewCard
            key={sub.id}
            submission={sub}
            onToggleSelect={toggleSelect}
            onUpdateStatus={handleUpdateStatus}
          />
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          className="bg-gray-700 px-4 py-2 rounded disabled:opacity-30"
        >
          Previous
        </button>
        <button
          disabled={(currentPage + 1) * PAGE_SIZE >= filteredSubmissions.length}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="bg-gray-700 px-4 py-2 rounded disabled:opacity-30"
        >
          Next
        </button>
      </div>
    </div>
  );
}
