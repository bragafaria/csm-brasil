//@/app/api/email/newsletter/unsubscribe/route.js

import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client for server-side
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Initialize Upstash rate limiter
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "60 s"),
  analytics: true,
});

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Rate limiting check
    const identifier = `unsubscribe_${normalizedEmail}`;
    const { success, reset } = await ratelimit.limit(identifier);

    if (!success) {
      const resetDate = new Date(reset);
      const waitTime = Math.ceil((resetDate.getTime() - Date.now()) / 1000);
      return NextResponse.json(
        { error: `Too many attempts. Please try again in ${waitTime} seconds.` },
        { status: 429 }
      );
    }

    // First, check if the email exists
    const { data: checkData, error: checkError } = await supabase
      .from("newsletter")
      .select("*")
      .eq("email", normalizedEmail)
      .single();

    console.log("Check result:", { checkData, checkError });

    if (checkError || !checkData) {
      return NextResponse.json({ error: "Email not found in our records." }, { status: 404 });
    }

    if (!checkData.is_active) {
      return NextResponse.json({ error: "This email is already unsubscribed." }, { status: 400 });
    }

    // Update the subscription status
    const { data: updateData, error: updateError } = await supabase
      .from("newsletter")
      .update({ is_active: false })
      .eq("email", normalizedEmail)
      .select();

    console.log("Update result:", { updateData, updateError });

    if (updateError) {
      throw updateError;
    }

    if (updateData && updateData.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Successfully unsubscribed. We're sorry to see you go!",
      });
    } else {
      return NextResponse.json({ error: "Failed to unsubscribe. Please try again." }, { status: 500 });
    }
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
