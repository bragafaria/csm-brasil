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

async function buffer(req) {
  const bufs = [];
  for await (const chunk of req) {
    bufs.push(chunk);
  }
  return Buffer.concat(bufs);
}

export async function POST(request) {
  const body = await buffer(request);
  const sig = request.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata.user_id;

    if (userId) {
      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });

      const { error } = await supabaseAdmin.from("users").update({ has_paid: true }).eq("id", userId);

      if (error) {
        console.error("Supabase update error:", error);
      } else {
        console.log(`User ${userId} marked as paid`);
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
