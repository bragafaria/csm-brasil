// app/api/get-blueprint-status/route.js
import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const token = authHeader.replace("Bearer ", "");

    const { error: setAuthError } = await supabase.auth.setSession({
      access_token: token,
      refresh_token: request.headers.get("Refresh-Token") || "",
    });
    if (setAuthError) {
      return new Response(JSON.stringify({ error: "Invalid session" }), { status: 401 });
    }

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError || !session?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const userId = session.user.id;

    // 1. FREE SESSION
    const { data: userData } = await supabase.from("users").select("has_used_free_session").eq("id", userId).single();

    // 2. ACTIVE SESSION (ONLY pending OR assigned)
    const { data: activeSessions } = await supabase
      .from("blueprint_sessions")
      .select("id")
      .eq("user_id", userId)
      .in("status", ["pending", "assigned"]); // ← CORRECT

    // 3. PER-SESSION CREDITS
    const { data: payments } = await supabase
      .from("blueprint_payments")
      .select("id")
      .eq("user_id", userId)
      .eq("status", "succeeded")
      .is("session_id", null);

    // 4. ACTIVE SUBSCRIPTION
    const { data: subscriptions } = await supabase
      .from("blueprint_subscriptions")
      .select("id")
      .eq("user_id", userId)
      .eq("status", "active");

    return new Response(
      JSON.stringify({
        hasFreeSessionAvailable: !userData?.has_used_free_session,
        isActiveSubscriber: subscriptions.length > 0,
        hasAvailablePerSession: payments.length > 0,
        hasActiveSession: activeSessions.length > 0, // ← THIS IS THE KEY
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("get-blueprint-status error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
