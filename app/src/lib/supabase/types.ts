// app/src/lib/supabase/types.ts
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      artists: {
        Row: {
          id: number;
          name: string;
          slug: string;
          bio: string;
          image_url: string | null;
        };
        Insert: Partial<Omit<Database["public"]["Tables"]["artists"]["Row"], "id">>;
        Update: Partial<Database["public"]["Tables"]["artists"]["Row"]>;
      };
      tracks: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          slug: string;
          created_at: string;
          play_count: number;
          artist_id: number;
          audio_url: string | null;
          tags: string[] | null;
        };
        Insert: Partial<Omit<Database["public"]["Tables"]["tracks"]["Row"], "id">>;
        Update: Partial<Database["public"]["Tables"]["tracks"]["Row"]>;
      };
    };
  };
}
