// supabase/functions/hello-world/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve((_req) => {
  return new Response("Hello, Signal Union! 🎶🌐", {
    headers: { "Content-Type": "text/plain" },
  });
});

