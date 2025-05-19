import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only throw the error if in a client-side environment (browser)
if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== 'undefined') {
    throw new Error('Missing Supabase environment variables')
  }
  // Optionally handle the missing variables case for server build if needed
}

export const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string) 