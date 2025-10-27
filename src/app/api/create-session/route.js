// app/api/create-session/route.js
import { createClient } from "@supabase/supabase-js";
import { assignCoach } from "../_utils/assignCoach.js";
import { supabaseService } from "../_utils/supabaseServiceClient.js";

export async function POST(request) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  // === 1. AUTH ===
  const authHeader = request.headers.get("Authorization");
  const refreshToken = request.headers.get("Refresh-Token") || "";

  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const token = authHeader.replace("Bearer ", "");

  const { error: setSessionError } = await supabase.auth.setSession({
    access_token: token,
    refresh_token: refreshToken,
  });
  if (setSessionError) {
    return new Response(JSON.stringify({ error: "Invalid session" }), { status: 401 });
  }

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError || !session?.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const user = session.user;

  // === 2. PARSE BODY ===
  let question, paymentType;
  try {
    const body = await request.json();
    question = body.question;
    paymentType = body.paymentType;
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  if (!question?.trim() || !paymentType) {
    return new Response(JSON.stringify({ error: "Missing question or payment type" }), { status: 400 });
  }

  if (!["free", "per_session", "subscription"].includes(paymentType)) {
    return new Response(JSON.stringify({ error: "Invalid payment type" }), { status: 400 });
  }

  // === 3. VALIDATE ELIGIBILITY ===
  const { data: userData } = await supabase.from("users").select("has_used_free_session").eq("id", user.id).single();

  if (!userData) {
    return new Response(JSON.stringify({ error: "User not found" }), { status: 500 });
  }

  const { data: activeSessions } = await supabase
    .from("blueprint_sessions")
    .select("id")
    .eq("user_id", user.id)
    .in("status", ["pending", "assigned"]);

  if (activeSessions?.length > 0) {
    return new Response(JSON.stringify({ error: "Active session exists" }), { status: 400 });
  }

  if (paymentType === "free" && userData.has_used_free_session) {
    return new Response(JSON.stringify({ error: "Free session used" }), { status: 400 });
  }

  let payment_id = null;

  // === 4. PER-SESSION: FIND CREDIT ===
  if (paymentType === "per_session") {
    const { data: payments, error: payErr } = await supabase
      .from("blueprint_payments")
      .select("id")
      .eq("user_id", user.id)
      .eq("status", "succeeded")
      .is("session_id", null)
      .limit(1);

    if (payErr || !payments?.length) {
      return new Response(JSON.stringify({ error: "No session credit" }), { status: 400 });
    }
    payment_id = payments[0].id;
  }

  // === 5. SUBSCRIPTION: VALIDATE ===
  if (paymentType === "subscription") {
    const { data: subs } = await supabase
      .from("blueprint_subscriptions")
      .select("id")
      .eq("user_id", user.id)
      .eq("status", "active")
      .limit(1);

    if (!subs?.length) {
      return new Response(JSON.stringify({ error: "No active subscription" }), { status: 400 });
    }
  }

  // === 6. CREATE SESSION ===
  const { data: sessionData, error: insertError } = await supabase
    .from("blueprint_sessions")
    .insert({
      user_id: user.id,
      question: question.trim(),
      payment_type: paymentType,
      payment_id: payment_id,
      status: "pending",
    })
    .select()
    .single();

  if (insertError || !sessionData) {
    console.error("Session insert failed:", insertError);
    return new Response(JSON.stringify({ error: "Failed to create session" }), { status: 500 });
  }

  // === 7. LINK PAYMENT (CRITICAL: DO THIS BEFORE COACH) ===
  if (paymentType === "per_session" && payment_id) {
    const { error: linkError } = await supabase
      .from("blueprint_payments")
      .update({ session_id: sessionData.id })
      .eq("id", payment_id);

    if (linkError) {
      console.error("CRITICAL: Failed to link payment to session:", linkError);
    } else {
      console.log("Payment linked:", payment_id, "→ session:", sessionData.id);
    }
  }

  // === 8. MARK FREE SESSION USED ===
  if (paymentType === "free") {
    await supabase.from("users").update({ has_used_free_session: true }).eq("id", user.id);
  }

  // === 9. ASSIGN COACH (SERVICE CLIENT) ===
  try {
    await assignCoach(sessionData.id); // ← NO SUPABASE PARAM
  } catch (e) {
    console.error("COACH ASSIGNMENT FAILED:", e);
    // Don't fail — session still exists
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
