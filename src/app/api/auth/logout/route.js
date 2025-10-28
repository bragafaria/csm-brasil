// src/app/api/auth/logout/route.ts
import { supabase } from "@/app/utils/supabaseClient";
import { NextResponse } from "next/server";

export async function POST() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Clear the client-side token as well
  return NextResponse.json(
    { ok: true },
    {
      headers: {
        "Set-Cookie": `csm_supabase_auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`,
      },
    }
  );
}
