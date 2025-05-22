import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("tracks")
    .select("tags")
    .not("tags", "is", null);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const allTags = data.flatMap((item) => item.tags || []);
  const uniqueTags = Array.from(new Set(allTags)).sort();

  return NextResponse.json({ tags: uniqueTags });
}
