// src/app/utils/supabase/server.js   (or wherever you keep it now)
// This is YOUR original code — just made compatible with Next.js 15+ cookie rules

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies(); // ← only change: await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY, // ← kept exactly as you had it
    {
      cookies: {
        getAll() {
          return cookieStore.getAll().map(({ name, value }) => ({ name, value }));
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, {
                ...options,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
                path: "/",
              });
            });
          } catch (error) {
            console.error("Error setting cookies:", error.message);
          }
        },
      },
    }
  );
}
