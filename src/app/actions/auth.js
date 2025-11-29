// app/actions/auth.js (excerpt)
"use server";

import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function sendResetEmail(email) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!email || !email.includes("@")) {
    return { success: false, error: "Please enter a valid email" };
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const redirectTo = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset`;
  console.log("Sending reset email with redirectTo:", redirectTo); // Add for debugging

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  if (error) {
    console.error("Reset email error:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function updatePassword(newPassword, searchParams) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: "Password must be at least 6 characters" };
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // FINAL FIX: This works no matter what Next.js gives us
  let code = null;
  if (searchParams) {
    if (typeof searchParams.get === "function") {
      code = searchParams.get("code");
    } else if (typeof searchParams === "string") {
      code = new URLSearchParams(searchParams).get("code");
    }
  }

  if (code) {
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    if (exchangeError) {
      return { success: false, error: "Invalid or expired reset link" };
    }
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return { success: false, error: error.message };

  await supabase.auth.signOut();
  redirect("/login");
}
