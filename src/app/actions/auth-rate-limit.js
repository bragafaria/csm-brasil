"use server";

import { headers } from "next/headers";
import {
  loginRateLimiter,
  resetPasswordRateLimiter,
  passwordUpdateRateLimiter,
  bloggerLoginRateLimiter,
  coachLoginRateLimiter,
  stripeCheckoutRateLimiter,
  signupRateLimiter, // ✅ Imported from lib/ratelimit.js
  getClientIp,
} from "@/app/lib/ratelimit";
import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

// ============================================================================
// LOGIN RATE LIMITING
// =============================================================================

export async function checkLoginRateLimit(email) {
  try {
    const headersList = await headers();
    const ip = getClientIp(headersList);

    const normalizedEmail = email.toLowerCase().trim();
    const emailKey = `email:${normalizedEmail}`;

    const [ipResult, emailResult] = await Promise.all([loginRateLimiter.limit(ip), loginRateLimiter.limit(emailKey)]);

    const success = ipResult.success && emailResult.success;
    const remaining = success ? Math.min(ipResult.remaining, emailResult.remaining) : 0;
    const resetTime = success
      ? Math.max(ipResult.reset, emailResult.reset)
      : Math.min(ipResult.reset, emailResult.reset);

    if (!success) {
      const resetDate = new Date(resetTime);
      const minutesUntilReset = Math.ceil((resetDate - Date.now()) / 60000);

      return {
        allowed: false,
        error: `Muitas tentativas de login. Por favor, tente novamente em ${minutesUntilReset} minuto${minutesUntilReset !== 1 ? "s" : ""}.`,
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
    return {
      allowed: true,
      error: null,
    };
  }
}

export async function checkBloggerLoginRateLimit(email) {
  try {
    const headersList = await headers();
    const ip = getClientIp(headersList);

    const normalizedEmail = email.toLowerCase().trim();
    const emailKey = `email:${normalizedEmail}`;

    const [ipResult, emailResult] = await Promise.all([
      bloggerLoginRateLimiter.limit(ip),
      bloggerLoginRateLimiter.limit(emailKey),
    ]);

    const success = ipResult.success && emailResult.success;
    const remaining = success ? Math.min(ipResult.remaining, emailResult.remaining) : 0;
    const resetTime = success
      ? Math.max(ipResult.reset, emailResult.reset)
      : Math.min(ipResult.reset, emailResult.reset);

    if (!success) {
      const resetDate = new Date(resetTime);
      const minutesUntilReset = Math.ceil((resetDate - Date.now()) / 60000);

      return {
        allowed: false,
        error: `Muitas tentativas de login. Por favor, tente novamente em ${minutesUntilReset} minuto${minutesUntilReset !== 1 ? "s" : ""}.`,
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
    console.error("Blogger login rate limit error:", error);
    return {
      allowed: true,
      error: null,
    };
  }
}

export async function checkCoachLoginRateLimit(email) {
  try {
    const headersList = await headers();
    const ip = getClientIp(headersList);

    const normalizedEmail = email.toLowerCase().trim();
    const emailKey = `email:${normalizedEmail}`;

    const [ipResult, emailResult] = await Promise.all([
      coachLoginRateLimiter.limit(ip),
      coachLoginRateLimiter.limit(emailKey),
    ]);

    const success = ipResult.success && emailResult.success;
    const remaining = success ? Math.min(ipResult.remaining, emailResult.remaining) : 0;
    const resetTime = success
      ? Math.max(ipResult.reset, emailResult.reset)
      : Math.min(ipResult.reset, emailResult.reset);

    if (!success) {
      const resetDate = new Date(resetTime);
      const minutesUntilReset = Math.ceil((resetDate - Date.now()) / 60000);

      return {
        allowed: false,
        error: `Muitas tentativas de login. Por favor, tente novamente em ${minutesUntilReset} minuto${minutesUntilReset !== 1 ? "s" : ""}.`,
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
    console.error("Coach login rate limit error:", error);
    return {
      allowed: true,
      error: null,
    };
  }
}

// ============================================================================
// SIGNUP RATE LIMITING
// ============================================================================

export async function checkSignupRateLimit(email) {
  try {
    const headersList = await headers();
    const ip = getClientIp(headersList);

    const normalizedEmail = email.toLowerCase().trim();
    const emailKey = `email:${normalizedEmail}`;

    // Check both IP and email
    const [ipResult, emailResult] = await Promise.all([signupRateLimiter.limit(ip), signupRateLimiter.limit(emailKey)]);

    const success = ipResult.success && emailResult.success;
    const remaining = success ? Math.min(ipResult.remaining, emailResult.remaining) : 0;
    const resetTime = success
      ? Math.max(ipResult.reset, emailResult.reset)
      : Math.min(ipResult.reset, emailResult.reset);

    if (!success) {
      const resetDate = new Date(resetTime);
      const minutesUntilReset = Math.ceil((resetDate - Date.now()) / 60000);

      return {
        allowed: false,
        error: `Muitas tentativas de login. Por favor, tente novamente em ${minutesUntilReset} minuto${minutesUntilReset !== 1 ? "s" : ""}.`,
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
    console.error("Signup rate limit error:", error);
    // Fail open - don't block on rate limit errors
    return {
      allowed: true,
      error: null,
    };
  }
}

// ============================================================================
// STRIPE CHECKOUT SESSIONS RATE LIMITING
// ============================================================================

export async function checkStripeCheckoutRateLimit(userId) {
  try {
    const headersList = await headers();
    const ip = getClientIp(headersList);

    // Prefer user ID over IP (more accurate for authenticated users)
    const identifier = userId || ip;

    const { success, reset, remaining } = await stripeCheckoutRateLimiter.limit(identifier);

    if (!success) {
      const resetDate = new Date(reset);
      const minutesUntilReset = Math.ceil((resetDate - Date.now()) / 60000);

      return {
        allowed: false,
        error: `Muitas tentativas de login. Por favor, tente novamente em ${minutesUntilReset} minuto${minutesUntilReset !== 1 ? "s" : ""}.`,
      };
    }

    return {
      allowed: true,
      remaining,
    };
  } catch (error) {
    console.error("Stripe checkout rate limit error:", error);
    // Fail open - don't block legitimate purchases
    return { allowed: true };
  }
}

// ============================================================================
// PASSWORD MANAGEMENT
// ============================================================================

export async function sendResetEmail(email) {
  try {
    if (!email || !email.includes("@")) {
      return { success: false, error: "Por favor, insira um e-mail válido" };
    }

    const headersList = await headers();
    const ip = getClientIp(headersList);

    const identifier = `${ip}:${email.toLowerCase()}`;
    const { success, reset } = await resetPasswordRateLimiter.limit(identifier);

    if (!success) {
      const resetDate = new Date(reset);
      const minutesUntilReset = Math.ceil((resetDate - Date.now()) / 60000);

      return {
        success: false,
        error: `Muitas tentativas de redefinição de senha. Por favor, tente novamente em ${minutesUntilReset} minuto${minutesUntilReset !== 1 ? "s" : ""}.`,
      };
    }

    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://csmdynamics.com";
    const redirectTo = `${baseUrl}/auth/reset`;

    console.log("Reset email redirectTo:", redirectTo);

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
      message: "Verifique seu e-mail para o link de redefinição!",
    };
  } catch (error) {
    console.error("Reset email error:", error);
    return {
      success: false,
      error: "Falha ao enviar o e-mail de redefinição. Por favor, tente novamente.",
    };
  }
}

export async function updatePasswordWithRateLimit(newPassword, searchParams) {
  try {
    // Validation
    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: "A senha deve ter pelo menos 6 caracteres" };
    }

    // Rate limit check
    const headersList = await headers();
    const ip = getClientIp(headersList);

    const { success, reset } = await passwordUpdateRateLimiter.limit(ip);

    if (!success) {
      const resetDate = new Date(reset);
      const minutesUntilReset = Math.ceil((resetDate - Date.now()) / 60000);
      return {
        success: false,
        error: `Muitas tentativas de atualização de senha. Tente novamente em ${minutesUntilReset} minuto${minutesUntilReset !== 1 ? "s" : ""}.`,
      };
    }

    // Create Supabase client
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Extract code from searchParams
    let code = null;
    if (searchParams) {
      if (typeof searchParams.get === "function") {
        code = searchParams.get("code");
      } else if (typeof searchParams === "string") {
        code = new URLSearchParams(searchParams).get("code");
      }
    }

    // Exchange code for session
    if (code) {
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      if (exchangeError) {
        return { success: false, error: "Link de redefinição inválido ou expirado" };
      }
    }

    // Update password
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      return { success: false, error: error.message };
    }

    // Sign out and redirect
    await supabase.auth.signOut();
    redirect("/login");
  } catch (error) {
    console.error("Password update rate limit error:", error);
    return { success: false, error: "Ocorreu um erro. Por favor, tente novamente." };
  }
}
