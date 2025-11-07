// src/app/api/verify-payment/route.js
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function POST(request) {
  try {
    const { session_id } = await request.json();
    const token = request.headers.get("authorization")?.replace("Bearer ", "");

    if (!token || !session_id) {
      return new Response(JSON.stringify({ error: "Unauthorized or missing session_id" }), { status: 401 });
    }

    const {
      data: { user },
    } = await supabase.auth.getUser(token);
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent"],
    });

    if (session.metadata?.user_id !== user.id || session.payment_status !== "paid") {
      return new Response(JSON.stringify({ error: "Invalid payment", paid: false }), { status: 400 });
    }

    // Sync has_paid
    const { data: dbUser } = await supabase.from("users").select("has_paid").eq("id", user.id).single();

    if (!dbUser?.has_paid) {
      await supabase.from("users").update({ has_paid: true, site_id: user.id }).eq("id", user.id);
    }

    // Create invite if not exists
    const { data: existingInvite } = await supabase.from("invite").select("id").eq("user_id", user.id).maybeSingle();

    if (!existingInvite) {
      const { error } = await supabase.from("invite").insert({ user_id: user.id });

      if (error) {
        console.error("Invite creation failed:", error.message);
      }
    }

    return new Response(JSON.stringify({ paid: true }), { status: 200 });
  } catch (err) {
    console.error("Verify payment error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
