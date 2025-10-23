// src/app/utils/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("Environment variables:", {
  supabaseUrl: !!supabaseUrl,
  supabaseKey: !!supabaseKey,
});

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase environment variables missing:", {
    supabaseUrl: !!supabaseUrl,
    supabaseKey: !!supabaseKey,
  });
  throw new Error("Supabase URL or Anon Key is missing");
}

let supabaseClient = null;

try {
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseKey, {
      auth: {
        storageKey: "csm_supabase_auth",
        persistSession: true,
        storage: typeof window !== "undefined" ? window.localStorage : null,
      },
    });
    console.log("Supabase client initialized successfully");
  }
} catch (error) {
  console.error("Failed to initialize Supabase client:", error.message, error);
  throw error;
}

export const supabase = supabaseClient;
