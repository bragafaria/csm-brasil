import { createClient } from "@supabase/supabase-js";

export async function POST(request) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("No valid Authorization header");
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const token = authHeader.replace("Bearer ", "");

    const { error: setAuthError } = await supabase.auth.setSession({
      access_token: token,
      refresh_token: request.headers.get("Refresh-Token") || "",
    });
    if (setAuthError) {
      console.error("Set auth error:", setAuthError.message);
      return new Response(JSON.stringify({ error: `Failed to set auth context: ${setAuthError.message}` }), {
        status: 401,
      });
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);
    if (authError || !user) {
      console.error("Auth error:", authError?.message);
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("has_used_free_session")
      .eq("id", user.id)
      .single();
    if (userError) {
      console.error("User fetch error:", userError.message);
      return new Response(JSON.stringify({ error: "Failed to fetch user data" }), { status: 500 });
    }

    const { data: activeSessions, error: sessionError } = await supabase
      .from("blueprint_sessions")
      .select("id")
      .eq("user_id", user.id)
      .in("status", ["pending", "assigned"]);
    if (sessionError) {
      console.error("Session fetch error:", sessionError.message);
      return new Response(JSON.stringify({ error: "Failed to fetch sessions" }), { status: 500 });
    }

    const { data: payments, error: paymentError } = await supabase
      .from("blueprint_payments")
      .select("id")
      .eq("user_id", user.id)
      .eq("status", "succeeded")
      .is("session_id", null);
    if (paymentError) {
      console.error("Payment fetch error:", paymentError.message);
      return new Response(JSON.stringify({ error: "Failed to fetch payments" }), { status: 500 });
    }

    const { data: subscriptions, error: subError } = await supabase
      .from("blueprint_subscriptions")
      .select("id")
      .eq("user_id", user.id)
      .eq("status", "active");
    if (subError) {
      console.error("Subscription fetch error:", subError.message);
      return new Response(JSON.stringify({ error: "Failed to fetch subscriptions" }), { status: 500 });
    }

    return new Response(
      JSON.stringify({
        hasFreeSessionAvailable: !userData.has_used_free_session,
        isActiveSubscriber: subscriptions.length > 0,
        hasAvailablePerSession: payments.length > 0,
        hasActiveSession: activeSessions.length > 0,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
