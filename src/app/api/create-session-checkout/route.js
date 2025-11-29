// app/api/create-session-checkout/route.js
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const {
      data: { user },
    } = await supabase.auth.getUser(token);
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid user" }), { status: 401 });
    }

    const { data: userData } = await supabase.from("users").select("stripe_customer_id").eq("id", user.id).single();

    let customerId = userData?.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;
      await supabase.from("users").update({ stripe_customer_id: customerId }).eq("id", user.id);
    }

    let siteId = user.id;
    const referer = request.headers.get("referer") || "";
    const match = referer.match(/\/dashboard\/([^/]+)\/coaching/);
    if (match?.[1]) siteId = match[1];

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_SESSION_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "payment",
      allow_promotion_codes: true,
      customer: customerId, // This alone pre-fills the email perfectly
      // customer_email: user.email,  ← DELETE THIS LINE ONLY

      success_url: `${baseUrl}/dashboard/${siteId}/coaching/sessions?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/dashboard/${siteId}/coaching/sessions`,
      metadata: {
        user_id: user.id,
        site_id: siteId,
        type: "session_credit",
      },
    });

    return new Response(
      JSON.stringify({
        url: session.url,
        returnTo: `${baseUrl}/dashboard/${siteId}/coaching/sessions`,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Session checkout error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
