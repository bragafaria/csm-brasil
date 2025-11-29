// app/actions/auth-rate-limit.js
"use server";

import { headers } from "next/headers";
import { loginRateLimiter, resetPasswordRateLimiter, getClientIp } from "@/app/lib/ratelimit";

/**
 * Check if login is allowed (rate limiting only)
 * Client handles actual authentication - this is secure!
 */
export async function checkLoginRateLimit(email) {
  try {
    const headersList = await headers();
    const ip = getClientIp(headersList);

    // Check rate limit
    const { success, limit, remaining, reset } = await loginRateLimiter.limit(ip);

    if (!success) {
      const resetDate = new Date(reset);
      const minutesUntilReset = Math.ceil((resetDate - Date.now()) / 60000);

      return {
        allowed: false,
        error: `Too many login attempts. Please try again in ${minutesUntilReset} minute${minutesUntilReset !== 1 ? "s" : ""}.`,
        rateLimit: {
          limited: true,
          remaining: 0,
          reset: resetDate.toISOString(),
        },
      };
    }

    return {
      allowed: true,
      rateLimit: {
        limited: false,
        remaining,
        reset: new Date(reset).toISOString(),
      },
    };
  } catch (error) {
    console.error("Rate limit error:", error);
    // Fail open - don't block on rate limit errors
    return {
      allowed: true,
      error: null,
    };
  }
}

/**
 * Send password reset email
 * Must be server-side because it uses SUPABASE_SERVICE_ROLE_KEY
 */
export async function sendResetEmail(email) {
  try {
    if (!email || !email.includes("@")) {
      return { success: false, error: "Please enter a valid email" };
    }

    const headersList = await headers();
    const ip = getClientIp(headersList);

    // Rate limit by email + IP
    const identifier = `${ip}:${email.toLowerCase()}`;
    const { success, limit, remaining, reset } = await resetPasswordRateLimiter.limit(identifier);

    if (!success) {
      const resetDate = new Date(reset);
      const minutesUntilReset = Math.ceil((resetDate - Date.now()) / 60000);

      return {
        success: false,
        error: `Too many reset attempts. Please try again in ${minutesUntilReset} minute${minutesUntilReset !== 1 ? "s" : ""}.`,
      };
    }

    // Use service role for admin operations (server-only)
    const { createClient } = await import("@supabase/supabase-js");
    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const redirectTo = `${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_BASE_URL}/auth/reset`;

    const { error } = await supabaseAdmin.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      console.error("Reset email error:", error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      message: "Check your email for the reset link!",
    };
  } catch (error) {
    console.error("Reset email error:", error);
    return {
      success: false,
      error: "Failed to send reset email. Please try again.",
    };
  }
}
