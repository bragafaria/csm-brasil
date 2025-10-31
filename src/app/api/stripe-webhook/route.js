// /api/stripe-webhook/route.js
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

  if (!process.env.STRIPE_SECRET_KEY || !webhookSecret || !supabaseUrl || !supabaseServiceKey) {
    console.error("Missing environment variables:", {
      stripe: !!process.env.STRIPE_SECRET_KEY,
      webhookSecret: !!webhookSecret,
      supabaseUrl: !!supabaseUrl,
      supabaseServiceKey: !!supabaseServiceKey,
    });
    return new Response(JSON.stringify({ error: "Server configuration error: Missing environment variables" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await buffer(request);
  const sig = request.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log("Webhook event verified:", { type: event.type, id: event.id, metadata: event.data.object.metadata });
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message, err.stack);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata?.user_id;
      console.log("Processing checkout.session.completed:", {
        sessionId: session.id,
        userId,
        metadata: session.metadata,
        customerId: session.customer,
      });

      if (!userId) {
        console.error("No user_id found in session metadata");
        return new Response(JSON.stringify({ error: "No user_id provided in session metadata" }), { status: 400 });
      }

      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });

      const { data: userData, error: userError } = await supabaseAdmin
        .from("users")
        .select("id, has_paid, stripe_customer_id")
        .eq("id", userId)
        .single();
      console.log("User check:", { userData, userError: userError?.message });

      if (userError || !userData) {
        console.error("User not found or error:", userError?.message);
        return new Response(JSON.stringify({ error: "User not found" }), { status: 400 });
      }

      if (!userData.has_paid) {
        console.log("Updating users table for user_id:", userId);
        const { data: updateData, error: userUpdateError } = await supabaseAdmin
          .from("users")
          .update({ has_paid: true, site_id: userId })
          .eq("id", userId)
          .select();
        console.log("User update result:", { updateData, userUpdateError: userUpdateError?.message });

        if (userUpdateError) {
          console.error("Supabase user update error:", userUpdateError.message, userUpdateError.details);
          return new Response(JSON.stringify({ error: `Supabase user update error: ${userUpdateError.message}` }), {
            status: 500,
          });
        }
      } else {
        console.log(`User ${userId} already marked as paid, skipping update`);
      }

      const { data: existingInvite, error: inviteCheckError } = await supabaseAdmin
        .from("invite")
        .select("id, invite")
        .eq("user_id", userId)
        .maybeSingle();
      console.log("Invite check:", { existingInvite, inviteCheckError: inviteCheckError?.message });

      if (existingInvite) {
        console.log(`Invite already exists for user ${userId}:`, existingInvite.invite);
      } else {
        console.log("Inserting into invite table for user_id:", userId);
        const { data: inviteData, error: inviteInsertError } = await supabaseAdmin
          .from("invite")
          .insert({ user_id: userId })
          .select("id, invite")
          .single();
        console.log("Invite insert result:", { inviteData, inviteInsertError: inviteInsertError?.message });

        if (inviteInsertError) {
          console.error("Supabase invite insert error:", inviteInsertError.message, inviteInsertError.details);
          return new Response(JSON.stringify({ error: `Supabase invite insert error: ${inviteInsertError.message}` }), {
            status: 500,
          });
        }

        console.log("Invite created successfully:", { inviteId: inviteData.invite });
      }
    } else {
      console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (handlerErr) {
    console.error("Webhook handler error:", handlerErr.message, handlerErr.stack);
    return new Response(JSON.stringify({ error: "Webhook processing error: " + handlerErr.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
