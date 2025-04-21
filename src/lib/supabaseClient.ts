
import { createClient } from "@supabase/supabase-js";

// Fallback URL and key for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://your-supabase-project.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "your-anon-key";

console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key length:", supabaseAnonKey ? supabaseAnonKey.length : 0);

// Check if we have the required values
if (!supabaseUrl || supabaseUrl === "https://your-supabase-project.supabase.co") {
  console.warn(
    "Missing VITE_SUPABASE_URL environment variable. Using fallback URL, which won't work with real Supabase services."
  );
}

if (!supabaseAnonKey || supabaseAnonKey === "your-anon-key") {
  console.warn(
    "Missing VITE_SUPABASE_ANON_KEY environment variable. Using fallback key, which won't work with real Supabase services."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
