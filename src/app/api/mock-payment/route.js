// app/api/mock-payment/route.js
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
    console.log("Mock payment headers:", {
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

    // Insert mock payment
    const { error: insertError } = await supabase.from("blueprint_payments").insert({
      user_id: user.id,
      stripe_charge_id: `mock_charge_${Date.now()}`,
      amount: 19.0,
      status: "succeeded",
      session_id: null,
    });

    if (insertError) {
      console.error("Mock payment error:", insertError.message);
      return new Response(JSON.stringify({ error: insertError.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
