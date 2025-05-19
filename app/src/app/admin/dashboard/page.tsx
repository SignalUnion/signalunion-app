'use client'

import React, { useState, useEffect } from "react";
import { TrackPreviewCard, TrackSubmission } from "@/components/TrackPreviewCard";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

interface SupabaseSubmissionData {
  id: string;
  artist_name: string;
  spotify_link: string | null;
  track_submission_url: string | null;
  remix_file_url: string | null;
  signal_tags: string[] | null;
  contact_email: string;
  status: string | null;
  created_at: string | null;
  // Add any other columns from your 'submissions' table here
}

// Add a check for environment variables before creating the client
let supabase: SupabaseClient | null = null;

if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("Supabase Anon Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
} else {
  console.error("Supabase environment variables are not loaded. Make sure .env.local has NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY and you have restarted the server.");
}

const PAGE_SIZE = 5;

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<TrackSubmission[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const fetchSubmissions = async () => {
    // Only attempt to fetch if supabase client is initialized
    if (!supabase) {
      console.error("Supabase client is not initialized.");
      return;
    }
    const { data, error } = await supabase
      .from("artist_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching submissions:", error);
    } else {
      const formatted = data.map((entry: SupabaseSubmissionData) => ({
        id: entry.id,
        artist_name: entry.artist_name,
        spotify_link: entry.spotify_link ?? undefined,
        track_url: entry.track_submission_url ?? undefined,
        remix_url: entry.remix_file_url ?? undefined,
        tags: entry.signal_tags || [],
        contact_email: entry.contact_email,
        status: (entry.status || "pending") as TrackSubmission['status'],
        created_at: entry.created_at ?? undefined,
        selected: false,
      }));
      setSubmissions(formatted);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleUpdateStatus = async (id: string, status: TrackSubmission['status']) => {
    // Only attempt to update if supabase client is initialized
    if (!supabase) {
      console.error("Supabase client is not initialized for single item update.");
      return;
    }

    const { error } = await supabase
      .from("artist_submissions")
      .update({ status: status })
      .eq("id", id); // Update specific item by id

    if (error) {
      console.error("Supabase single update error:", error);
    } else {
      console.log(`Successfully marked submission ${id} as ${status}.`);
      // Refetch submissions to update the UI
      fetchSubmissions();
    }
  };

  const toggleSelect = (id: string) => {
    setSubmissions(submissions.map(sub =>
      sub.id === id ? { ...sub, selected: !sub.selected } : sub
    ));
  };

  const bulkAction = async (status: "approved" | "rejected") => {
    // Only attempt to update if supabase client is initialized
    if (!supabase) {
      console.error("Supabase client is not initialized for bulk action.");
      return;
    }
    const selected = submissions.filter(sub => sub.selected);
    const ids = selected.map(sub => sub.id);

    if (ids.length === 0) {
      console.log("No submissions selected for bulk action.");
      return;
    }

    const { error } = await supabase
      .from("artist_submissions")
      .update({ status: status })
      .in("id", ids);

    if (error) {
      console.error("Supabase update error:", error);
    } else {
      console.log(`Successfully marked ${ids.length} submissions as ${status}.`);
      fetchSubmissions();
    }
  };

  const pageSubmissions = submissions.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

  // Filter submissions based on selected status
  const filteredSubmissions = submissions.filter(sub => 
    filterStatus === 'all' ? true : sub.status === filterStatus
  );

  // Paginate the filtered submissions
  const pageFilteredSubmissions = filteredSubmissions.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

  return (
    <div className="p-6 space-y-4 text-white min-h-screen">
      <div className="text-center mb-8 bg-black/30 backdrop-blur-sm p-6 rounded-xl">
        <h1 className="text-4xl font-bold text-white mb-2">SignalUnion Admin Dashboard</h1>
        <p className="text-lg text-gray-200">Manage submitted tracks</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex gap-2">
          <button 
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded ${filterStatus === 'all' ? 'bg-indigo-600' : 'bg-gray-700'} transition-colors duration-200`}
          >
            All
          </button>
          <button 
            onClick={() => setFilterStatus("pending")}
            className={`px-4 py-2 rounded ${filterStatus === 'pending' ? 'bg-yellow-600' : 'bg-gray-700'} transition-colors duration-200`}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilterStatus("approved")}
            className={`px-4 py-2 rounded ${filterStatus === 'approved' ? 'bg-green-600' : 'bg-gray-700'} transition-colors duration-200`}
          >
            Approved
          </button>
          <button 
            onClick={() => setFilterStatus("rejected")}
            className={`px-4 py-2 rounded ${filterStatus === 'rejected' ? 'bg-red-600' : 'bg-gray-700'} transition-colors duration-200`}
          >
            Rejected
          </button>
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
        {pageFilteredSubmissions.map(sub => (
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
          onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
          className="bg-gray-700 px-4 py-2 rounded disabled:opacity-30"
        >
          Previous
        </button>
        <button
          disabled={(currentPage + 1) * PAGE_SIZE >= filteredSubmissions.length}
          onClick={() => setCurrentPage(p => p + 1)}
          className="bg-gray-700 px-4 py-2 rounded disabled:opacity-30"
        >
          Next
        </button>
      </div>
    </div>
  );
} 