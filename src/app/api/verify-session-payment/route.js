// app/api/verify-session-payment/route.js
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function POST(request) {
  const { session_id } = await request.json();

  if (!session_id) {
    return new Response(JSON.stringify({ error: "Missing session_id" }), { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["subscription", "payment_intent"],
    });

    const userId = session.metadata?.user_id;
    if (!userId) {
      return new Response(JSON.stringify({ error: "No user in metadata" }), { status: 400 });
    }

    // One-time session credit
    if (session.mode === "payment" && session.payment_status === "paid") {
      await supabase.from("blueprint_payments").insert({
        user_id: userId,
        stripe_charge_id: session.payment_intent?.id || session.id,
        amount: 19.0,
        status: "succeeded",
      });
    }

    // Subscription
    if (session.mode === "subscription" && session.subscription) {
      const sub = session.subscription;
      const subscription = typeof sub === "string" ? await stripe.subscriptions.retrieve(sub) : sub;

      await supabase.from("blueprint_subscriptions").upsert({
        user_id: userId,
        stripe_subscription_id: subscription.id,
        status: subscription.status,
        start_date: new Date(subscription.current_period_start * 1000).toISOString(),
        end_date: new Date(subscription.current_period_end * 1000).toISOString(),
        sessions_used_this_month: 0,
        last_reset_date: new Date().toISOString(),
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Verify error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
