// app/api/mock-subscription/route.js
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
    const refreshToken = request.headers.get("Refresh-Token") || "";
    console.log("Mock subscription headers:", {
      accessToken: token.substring(0, 10) + "...",
      refreshToken: refreshToken?.substring(0, 10) + "...",
    });

    // Set auth context
    const { error: setAuthError } = await supabase.auth.setSession({
      access_token: token,
      refresh_token: refreshToken,
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
    console.log("Authenticated user ID:", user.id);

    // Insert mock subscription
    const { error: insertError } = await supabase.from("blueprint_subscriptions").insert({
      user_id: user.id,
      stripe_subscription_id: `mock_sub_${Date.now()}`,
      status: "active",
      start_date: new Date().toISOString(),
      sessions_used_this_month: 0,
      last_reset_date: new Date().toISOString(),
    });

    if (insertError) {
      console.error("Mock subscription error:", insertError.message);
      return new Response(JSON.stringify({ error: insertError.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
