import type { NextConfig } from "next";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    // This object is used to expose server-side env vars to the client build
    // We don't need to list them here to see them in the server console log below
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
};

// Log environment variables when next.config.ts is processed
const maskedEnv = Object.keys(process.env).reduce((acc, key) => {
  const lowerKey = key.toLowerCase();
  if (lowerKey.includes('key') || lowerKey.includes('secret')) {
    const originalValue = process.env[key] as string;
    const maskedValue = originalValue.substring(0, 3) + '***';
    acc[key] = maskedValue;
  } else {
    acc[key] = process.env[key];
  }
  return acc;
}, {} as Record<string, string | undefined>);

console.log('Environment Variables (from next.config.ts):', maskedEnv);

export default nextConfig;
