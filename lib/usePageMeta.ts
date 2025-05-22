import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface PageMeta {
  title: string;
  description: string;
  og_image_url: string;
}

export function usePageMeta(path: string) {
  const [meta, setMeta] = useState<PageMeta | null>(null);

  useEffect(() => {
    async function fetchMeta() {
      const { data, error } = await supabase
        .from("pages_metadata")
        .select("*")
        .eq("path", path)
        .single();

      if (data && !error) {
        setMeta(data);
      } else {
        // Handle error or no data case if necessary
        console.error("Error fetching page meta or no data found:", error);
        setMeta(null); // Ensure state is null if no data or error
      }
    }

    fetchMeta();
  }, [path]);

  return meta;
} 