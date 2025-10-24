// app/api/mock-payment/route.js
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

  // === 3. GET USER FROM SESSION (CORRECT WAY) ===
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError || !session?.user) {
    return new Response(JSON.stringify({ error: "No authenticated user" }), { status: 401 });
  }

  const user = session.user;

  // === 4. INSERT MOCK PAYMENT ($19) ===
  const { error: insertError } = await supabase.from("blueprint_payments").insert({
    user_id: user.id,
    stripe_charge_id: `mock_charge_${Date.now()}`,
    amount: 19.0,
    status: "succeeded",
    session_id: null,
  });

  if (insertError) {
    console.error("Mock payment insert error:", insertError);
    return new Response(JSON.stringify({ error: "Failed to create payment" }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
