import React from "react";

export interface TrackSubmission {
  id: string;
  artist_name: string;
  spotify_link?: string;
  track_url?: string;
  remix_url?: string;
  tags: string[];
  contact_email: string;
  status?: "pending" | "approved" | "rejected";
  created_at?: string;
  selected?: boolean;
}

export const TrackPreviewCard: React.FC<{
  submission: TrackSubmission;
  onToggleSelect: (id: string) => void;
}> = ({ submission, onToggleSelect }) => {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-800 p-4 shadow-md space-y-2">
      <div className="flex justify-between items-center">
        <input
          type="checkbox"
          checked={submission.selected || false}
          onChange={() => onToggleSelect(submission.id)}
        />
        <span className="text-xs font-medium text-gray-400">
          {submission.created_at ? new Date(submission.created_at).toLocaleDateString() : ""}
        </span>
      </div>
      <h3 className="text-lg font-bold text-white">{submission.artist_name}</h3>
      <p className="text-sm text-gray-400">{submission.contact_email}</p>
      <p className="text-sm text-gray-300">
        <strong>Tags:</strong> {submission.tags.join(", ")}
      </p>
      <div className="space-x-2 text-sm">
        {submission.spotify_link && (
          <a className="text-blue-400 underline" href={submission.spotify_link} target="_blank">Spotify</a>
        )}
        {submission.track_url && (
          <a className="text-blue-400 underline" href={submission.track_url} target="_blank">Track</a>
        )}
        {submission.remix_url && (
          <a className="text-blue-400 underline" href={submission.remix_url} target="_blank">Remix</a>
        )}
      </div>
    </div>
  );
}; 