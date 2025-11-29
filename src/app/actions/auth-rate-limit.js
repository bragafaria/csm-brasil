// app/actions/auth-rate-limit.js
"use server";

import { headers } from "next/headers";
import { loginRateLimiter, resetPasswordRateLimiter, getClientIp } from "@/app/lib/ratelimit";

export async function checkLoginRateLimit(email) {
  try {
    const headersList = await headers();
    const ip = getClientIp(headersList);

    // NEW: Dual-layer protection — IP + Email (same limiter, different keys)
    const normalizedEmail = email.toLowerCase().trim();
    const emailKey = `email:${normalizedEmail}`;

    const [ipResult, emailResult] = await Promise.all([loginRateLimiter.limit(ip), loginRateLimiter.limit(emailKey)]);

    const success = ipResult.success && emailResult.success;
    const remaining = success ? Math.min(ipResult.remaining, emailResult.remaining) : 0;
    const resetTime = success
      ? Math.max(ipResult.reset, emailResult.reset)
      : Math.min(ipResult.reset, emailResult.reset); // earliest reset wins

    if (!success) {
      const resetDate = new Date(resetTime);
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
        reset: new Date(resetTime).toISOString(),
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

// Your sendResetEmail function — 100% untouched, perfect as-is
export async function sendResetEmail(email) {
  try {
    if (!email || !email.includes("@")) {
      return { success: false, error: "Please enter a valid email" };
    }

    const headersList = await headers();
    const ip = getClientIp(headersList);

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
