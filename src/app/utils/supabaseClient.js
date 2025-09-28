// utils/supabase/client.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or Anon Key is missing");
}

// Singleton instance
let supabaseClient = null;

if (!supabaseClient) {
  supabaseClient = createClient(supabaseUrl, supabaseKey, {
    auth: {
      storageKey: "csm_supabase_auth",
      persistSession: true,
    },
  });
}

export const supabase = supabaseClient;
