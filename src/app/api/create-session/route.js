// app/api/create-session/route.js
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

    const { question, paymentType, paymentId } = await request.json();
    if (!question || !paymentType) {
      return new Response(JSON.stringify({ error: "Missing question or payment type" }), { status: 400 });
    }

    if (!["free", "per_session", "subscription"].includes(paymentType)) {
      return new Response(JSON.stringify({ error: "Invalid payment type" }), { status: 400 });
    }

    // Validate user eligibility
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
    if (activeSessions.length > 0) {
      return new Response(JSON.stringify({ error: "User already has an active session" }), { status: 400 });
    }

    if (paymentType === "free" && userData.has_used_free_session) {
      return new Response(JSON.stringify({ error: "Free session already used" }), { status: 400 });
    }

    let payment_id = paymentId;
    if (paymentType === "per_session") {
      const { data: payments, error: paymentError } = await supabase
        .from("blueprint_payments")
        .select("id")
        .eq("user_id", user.id)
        .eq("status", "succeeded")
        .is("session_id", null)
        .limit(1);
      if (paymentError || !payments.length) {
        console.error("Payment fetch error:", paymentError?.message);
        return new Response(JSON.stringify({ error: "No available payment found" }), { status: 400 });
      }
      payment_id = payments[0].id;
    }

    if (paymentType === "subscription") {
      const { data: subscriptions, error: subError } = await supabase
        .from("blueprint_subscriptions")
        .select("id")
        .eq("user_id", user.id)
        .eq("status", "active")
        .limit(1);
      if (subError || !subscriptions.length) {
        console.error("Subscription fetch error:", subError?.message);
        return new Response(JSON.stringify({ error: "No active subscription found" }), { status: 400 });
      }
    }

    // Insert session
    const { data: sessionData, error: insertError } = await supabase
      .from("blueprint_sessions")
      .insert({
        user_id: user.id,
        question,
        payment_type: paymentType,
        payment_id: payment_id,
        status: "pending",
      })
      .select()
      .single();
    if (insertError) {
      console.error("Session insert error:", insertError.message);
      return new Response(JSON.stringify({ error: insertError.message }), { status: 500 });
    }

    // Update payment's session_id for per_session
    if (paymentType === "per_session" && payment_id) {
      const { error: updateError } = await supabase
        .from("blueprint_payments")
        .update({ session_id: sessionData.id })
        .eq("id", payment_id);
      if (updateError) {
        console.error("Payment update error:", updateError.message);
        return new Response(JSON.stringify({ error: "Failed to link payment to session" }), { status: 500 });
      }
    }

    // Update has_used_free_session for free session
    if (paymentType === "free") {
      const { error: updateError } = await supabase
        .from("users")
        .update({ has_used_free_session: true })
        .eq("id", user.id);
      if (updateError) {
        console.error("User update error:", updateError.message);
        return new Response(JSON.stringify({ error: "Failed to update free session status" }), { status: 500 });
      }
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
