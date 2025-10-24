// app/api/mock-subscription/route.js
import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  // === 1. GET HEADERS ===
  const authHeader = request.headers.get("Authorization");
  const refreshToken = request.headers.get("Refresh-Token") || "";

  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const token = authHeader.replace("Bearer ", "");

  // === 2. RESTORE SESSION ===
  const { error: setSessionError } = await supabase.auth.setSession({
    access_token: token,
    refresh_token: refreshToken,
  });
  if (setSessionError) {
    console.error("setSession error:", setSessionError);
    return new Response(JSON.stringify({ error: "Invalid session" }), { status: 401 });
  }

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError || !session?.user) {
    return new Response(JSON.stringify({ error: "No authenticated user" }), { status: 401 });
  }

  const user = session.user;

  // === 3. CREATE SUBSCRIPTION ===
  const { error: subErr } = await supabase.from("blueprint_subscriptions").insert({
    user_id: user.id,
    stripe_subscription_id: `mock_sub_${Date.now()}`,
    status: "active",
    start_date: new Date().toISOString(),
    sessions_used_this_month: 0,
    last_reset_date: new Date().toISOString(),
  });

  if (subErr) {
    console.error("Mock subscription error:", subErr);
    return new Response(JSON.stringify({ error: "Failed to create subscription" }), { status: 500 });
  }

  // === 4. DO NOT CREATE PAYMENT RECORD FOR SUBSCRIPTION ===
  // Subscriptions are recurring — no per-session payment

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
