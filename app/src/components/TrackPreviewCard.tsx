import React from "react";

export type SubmissionStatus = "approved" | "pending" | "rejected";

export interface TrackSubmission {
  id: string;
  title: string;
  artist: string;
  description?: string;
  status: SubmissionStatus;
  audio_url?: string;
}

interface Props {
  submission: TrackSubmission;
  onToggleSelect: (id: string) => void;
  onUpdateStatus: (id: string, status: SubmissionStatus) => Promise<void>;
}

export function TrackPreviewCard({
  submission,
  onToggleSelect,
  onUpdateStatus,
}: Props) {
  return (
    <div className="border rounded p-4 shadow-sm space-y-2">
      <h3 className="text-xl font-bold">{submission.title}</h3>
      <p className="text-sm text-gray-600">{submission.artist}</p>
      {submission.description && <p className="text-gray-700">{submission.description}</p>}
      {submission.audio_url && (
        <audio controls className="w-full mt-2">
          <source src={submission.audio_url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
      <div className="flex gap-2 pt-2">
        <button
          className="px-2 py-1 text-sm bg-green-500 text-white rounded"
          onClick={() => onUpdateStatus(submission.id, "approved")}
        >
          Approve
        </button>
        <button
          className="px-2 py-1 text-sm bg-yellow-500 text-white rounded"
          onClick={() => onUpdateStatus(submission.id, "pending")}
        >
          Pend
        </button>
        <button
          className="px-2 py-1 text-sm bg-red-500 text-white rounded"
          onClick={() => onUpdateStatus(submission.id, "rejected")}
        >
          Reject
        </button>
        <button
          className="ml-auto px-2 py-1 text-sm bg-gray-100 rounded"
          onClick={() => onToggleSelect(submission.id)}
        >
          Toggle Select
        </button>
      </div>
    </div>
  );
}
