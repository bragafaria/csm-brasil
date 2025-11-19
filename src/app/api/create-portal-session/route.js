// app/api/create-portal-session/route.js
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function POST(request) {
  console.log("create-portal-session called");

  try {
    const { return_url } = await request.json();
    console.log("Return URL:", return_url);

    const authHeader = request.headers.get("authorization");
    console.log("Auth header present:", !!authHeader);

    if (!authHeader?.startsWith("Bearer ")) {
      console.log("Missing or invalid Authorization header");
      return new Response(JSON.stringify({ error: "Unauthorized – no token" }), { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      console.log("Invalid token:", userError?.message);
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }

    console.log("Authenticated user:", user.id, user.email);

    const { data, error } = await supabase.from("users").select("stripe_customer_id").eq("id", user.id).single();

    if (error || !data) {
      console.log("Supabase query error or no row:", error);
      return new Response(JSON.stringify({ error: "User not found in DB" }), { status: 404 });
    }

    if (!data.stripe_customer_id) {
      console.log("No stripe_customer_id for user:", user.id);
      return new Response(JSON.stringify({ error: "No Stripe customer linked" }), { status: 400 });
    }

    console.log("Stripe Customer ID:", data.stripe_customer_id);

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: data.stripe_customer_id,
      return_url: return_url || `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/settings`,
    });

    console.log("Portal session created:", portalSession.url);

    return new Response(JSON.stringify({ url: portalSession.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("create-portal-session crashed:", err);
    return new Response(JSON.stringify({ error: err.message || "Internal error" }), { status: 500 });
  }
}
