import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function POST(request) {
  try {
    const { email } = await request.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("newsletter")
      .insert([{ email: email.toLowerCase().trim() }])
      .select();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "This email is already subscribed!" }, { status: 400 });
      }
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed! Check your inbox.",
    });
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
