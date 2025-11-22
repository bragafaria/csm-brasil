// src/app/api/stripe-webhook/route.js
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const config = { api: { bodyParser: false } };

console.log("WEBHOOK LOADED → FINAL BULLETPROOF VERSION →", new Date().toISOString());

async function buffer(req) {
  return Buffer.from(await req.arrayBuffer());
}

// Helper: safely convert Stripe timestamp → ISO string or null
function safeIsoDate(seconds) {
  if (!seconds || seconds <= 0) return null;
  try {
    return new Date(seconds * 1000).toISOString();
  } catch {
    return null;
  }
}

export async function POST(request) {
  const body = await buffer(request);
  const sig = request.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log("WEBHOOK EVENT →", event.type, "ID:", event.id);
  } catch (err) {
    console.error("SIGNATURE FAILED →", err.message);
    return new Response("Invalid signature", { status: 400 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      console.log("CHECKOUT SESSION →", session.id, "Mode:", session.mode, "Status:", session.payment_status);
      console.log("Metadata:", session.metadata);

      // $19 SESSION CREDIT
      if (session.metadata?.type === "session_credit") {
        if (session.payment_status === "paid") {
          const { error } = await supabase.from("blueprint_payments").insert({
            user_id: session.metadata.user_id,
            stripe_charge_id:
              typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id || null,
            amount: 19,
            status: "succeeded",
          });

          if (error) console.error("CREDIT INSERT FAILED →", error.message);
          else console.log("SUCCESS: $19 CREDIT SAVED FOR USER", session.metadata.user_id);
        }
        return new Response("OK", { status: 200 });
      }

      // COUPLE'S REPORT (legacy)
      if (!session.metadata?.type || session.metadata.type === "report") {
        if (session.metadata?.user_id) {
          await supabase
            .from("users")
            .update({ has_paid: true, site_id: session.metadata.user_id })
            .eq("id", session.metadata.user_id);
        }
      }

      // SUBSCRIPTION — BULLETPROOF
      if (session.metadata?.type === "subscription" && session.subscription) {
        console.log("SUBSCRIPTION FLOW → STARTED");

        const subId = typeof session.subscription === "string" ? session.subscription : session.subscription.id;
        const sub = await stripe.subscriptions.retrieve(subId);

        const insertData = {
          user_id: session.metadata.user_id,
          stripe_subscription_id: sub.id,
          status: sub.status || "incomplete",
          start_date: safeIsoDate(sub.current_period_start) || new Date().toISOString(),
          end_date: safeIsoDate(sub.current_period_end),
          sessions_used_this_month: 0,
          last_reset_date: new Date().toISOString(),
        };

        console.log("UPSERTING SUBSCRIPTION →", insertData);

        const { error } = await supabase
          .from("blueprint_subscriptions")
          .upsert(insertData, { onConflict: "stripe_subscription_id" });

        if (error) {
          console.error("SUBSCRIPTION UPSERT FAILED →", error.message);
          console.error("Full error:", JSON.stringify(error, null, 2));
        } else {
          console.log("SUCCESS: SUBSCRIPTION SAVED →", sub.id, "User:", session.metadata.user_id);
        }
      }
    }
    // Handle subscription updates/cancellations
    else if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
      const sub = event.data.object;

      // Raw Stripe status — paywall trusts this
      const stripeStatus = sub.status;

      // UX status — can show "canceled" early
      let displayStatus = sub.status;
      if (sub.cancel_at_period_end) {
        displayStatus = "canceled";
      }

      const { error } = await supabase
        .from("blueprint_subscriptions")
        .update({
          status: stripeStatus, // ← Paywall column — stays "active" until real end
          display_status: displayStatus, // ← Settings page column — shows "canceled" immediately
          end_date: safeIsoDate(sub.current_period_end),
        })
        .eq("stripe_subscription_id", sub.id);

      if (error) console.error("UPDATE FAILED", error);
    }
  } catch (err) {
    console.error("WEBHOOK CRASHED →", err.message);
    console.error("Stack:", err.stack);
    return new Response("Server error", { status: 500 });
  }

  return new Response("OK", { status: 200 });
}
