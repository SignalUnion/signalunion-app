import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const tag = searchParams.get("tag");
  const query = searchParams.get("query") || "";
  const sort = searchParams.get("sort") || "newest";

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let supaQuery = supabase
    .from("tracks")
    .select("title, description, slug, created_at, audio_url, tags", { count: "exact" })
    .range(from, to);

  if (tag) {
    supaQuery = supaQuery.contains("tags", [tag]);
  }

  if (query) {
    supaQuery = supaQuery.ilike("title", `%${query}%`);
  }

  if (sort === "popular") {
    supaQuery = supaQuery.order("play_count", { ascending: false });
  } else {
    supaQuery = supaQuery.order("created_at", { ascending: false });
  }

  const { data, count, error } = await supaQuery;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    tracks: data,
    total: count,
    page,
    totalPages: Math.ceil((count || 0) / limit),
  });
}
