// src/app/utils/supabase/server.js
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
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
  });
}
