import { createClient } from "@/lib/supabase/server";
import { SubmissionStatus } from "@/components/TrackPreviewCard";

export async function updateTrackStatus(id: string, status: SubmissionStatus): Promise<boolean> {
  const supabase = createClient();

  const { error } = await supabase
    .from("track_submissions")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Failed to update track status:", error);
    return false;
  }

  return true;
}
