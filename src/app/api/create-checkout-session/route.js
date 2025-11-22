// src/app/api/create-checkout-session/route.js
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const priceId = process.env.STRIPE_COUPLE_REPORT_PRICE_ID;
const successUrl = process.env.NEXT_PUBLIC_STRIPE_REPORT_SUCCESS_URL;
const cancelUrl = process.env.NEXT_PUBLIC_STRIPE_REPORT_CANCEL_URL;

export async function POST(request) {
  try {
    if (!supabaseUrl || !supabaseServiceKey || !stripeSecretKey || !priceId || !successUrl || !cancelUrl) {
      console.error("Missing environment variables:", {
        supabaseUrl: !!supabaseUrl,
        supabaseServiceKey: !!supabaseServiceKey,
        stripeSecretKey: !!stripeSecretKey,
        priceId: !!priceId,
        successUrl: !!successUrl,
        cancelUrl: !!cancelUrl,
      });
      return new Response(JSON.stringify({ error: "Server configuration error: Missing environment variables" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const stripe = new Stripe(stripeSecretKey);
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      console.error("No authorization token provided");
      return new Response(JSON.stringify({ error: "No authorization token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { typeCode, assessmentData } = await request.json();
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);
    if (authError || !user) {
      console.error("Auth error:", authError?.message);
      return new Response(JSON.stringify({ error: "Unauthorized: Invalid or expired token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userId = user.id;
    const userEmail = user.email;
    const userName = user.user_metadata?.name || null;

    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("stripe_customer_id")
      .eq("id", userId)
      .single();
    if (fetchError) {
      console.error("Error fetching user from Supabase:", fetchError.message);
      return new Response(JSON.stringify({ error: "Failed to verify user in database" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    let customerId = existingUser?.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userEmail,
        name: userName,
        metadata: { supabase_user_id: userId },
      });
      customerId = customer.id;

      let updateData = {
        stripe_customer_id: customerId,
        typeCode,
      };

      if (assessmentData) {
        if (assessmentData.percents && Array.isArray(assessmentData.percents) && assessmentData.percents.length === 5) {
          updateData.percents = assessmentData.percents;
        }
        if (
          assessmentData.dominants &&
          Array.isArray(assessmentData.dominants) &&
          assessmentData.dominants.length === 5
        ) {
          updateData.dominants = assessmentData.dominants;
        }
        if (
          assessmentData.categories &&
          Array.isArray(assessmentData.categories) &&
          assessmentData.categories.length === 5
        ) {
          updateData.categories = assessmentData.categories;
        }
        if (assessmentData.percents || assessmentData.dominants || assessmentData.categories) {
          updateData.has_assessment = true;
        }
      }

      const { error: supabaseError } = await supabase.from("users").update(updateData).eq("id", userId);
      if (supabaseError) {
        console.error("Supabase update error:", supabaseError.message);
        return new Response(JSON.stringify({ error: "Failed to save user data: " + supabaseError.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      billing_address_collection: "auto",
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      payment_method_types: ["card"], // Explicitly use card only
      success_url: `${successUrl}/login?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      metadata: { user_id: userId },
    });

    console.log("Checkout session created:", { sessionId: checkoutSession.id, userId });

    return new Response(JSON.stringify({ url: checkoutSession.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API error:", err.message, err.stack);
    return new Response(JSON.stringify({ error: err.message || "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
