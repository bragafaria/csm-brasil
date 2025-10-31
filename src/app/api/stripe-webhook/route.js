// src/app/api/stripe-webhook/route.js
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(request) {
  const arrayBuffer = await request.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function POST(request) {
  console.log("Webhook received at:", new Date().toISOString());

  // Validate env vars
  if (!process.env.STRIPE_SECRET_KEY || !webhookSecret || !supabaseUrl || !supabaseServiceKey) {
    console.error("Missing environment variables");
    return new Response(JSON.stringify({ error: "Server misconfigured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await buffer(request);
  const sig = request.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log("Webhook event verified:", { type: event.type, id: event.id });
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata?.user_id;

      console.log("Processing checkout.session.completed:", {
        sessionId: session.id,
        userId,
        customerId: session.customer,
      });

      if (!userId) {
        console.error("No user_id in metadata");
        return new Response(JSON.stringify({ error: "Missing user_id" }), { status: 400 });
      }

      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      // Fetch user
      const { data: userData, error: userError } = await supabaseAdmin
        .from("users")
        .select("id, has_paid")
        .eq("id", userId)
        .single();

      if (userError || !userData) {
        console.error("User not found:", userError?.message);
        return new Response(JSON.stringify({ error: "User not found" }), { status: 400 });
      }

      // Only update if not already paid
      if (!userData.has_paid) {
        console.log("Marking user as paid:", userId);
        const { error: updateError } = await supabaseAdmin
          .from("users")
          .update({ has_paid: true, site_id: userId })
          .eq("id", userId);

        if (updateError) {
          console.error("Failed to update has_paid:", updateError.message);
          return new Response(JSON.stringify({ error: "DB update failed" }), { status: 500 });
        }
      } else {
        console.log("User already paid, skipping update");
      }

      // NO INVITE LOGIC HERE
      // → Handled in /api/verify-payment (synchronous, reliable)
    } else {
      console.log(`Unhandled event: ${event.type}`);
    }
  } catch (err) {
    console.error("Webhook handler error:", err.message, err.stack);
    return new Response(JSON.stringify({ error: "Processing failed" }), { status: 500 });
  }

  // ALWAYS return 200
  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
