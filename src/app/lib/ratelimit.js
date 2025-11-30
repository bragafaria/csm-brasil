// lib/ratelimit.js
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// ============================================================================
// RATE LIMITERS
// ============================================================================

// Main user login: 5 attempts per 10 minutes per IP/email
export const loginRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "10 m"),
  analytics: true,
  prefix: "ratelimit:login",
});

// Blogger/Admin login: 10 attempts per 15 minutes (stricter than regular users)
export const bloggerLoginRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(10, "15 m"),
  analytics: true,
  prefix: "ratelimit:blogger-login",
});

// Coach login: 10 attempts per 15 minutes (same strictness as blogger)
export const coachLoginRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(10, "15 m"),
  analytics: true,
  prefix: "ratelimit:coach-login",
});

// User signup: 5 signups per hour per IP/email
export const signupRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "1 h"),
  analytics: true,
  prefix: "ratelimit:signup",
});

// Password reset email: 3 attempts per hour per IP+email
export const resetPasswordRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1 h"),
  analytics: true,
  prefix: "ratelimit:reset",
});

// Password update: 3 attempts per hour per IP
export const passwordUpdateRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(3, "1 h"),
  analytics: true,
  prefix: "ratelimit:password-update",
});

// General API rate limiter: 100 requests per minute per IP
export const apiRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"),
  analytics: true,
  prefix: "ratelimit:api",
});

// Blog content management: 20 posts per hour per IP (prevents spam posting)
export const blogContentRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(20, "1 h"),
  analytics: true,
  prefix: "ratelimit:blog-content",
});

// Checkout session creation: 10 per hour per user
export const stripeCheckoutRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 h"),
  analytics: true,
  prefix: "ratelimit:stripe-checkout",
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Extract client IP from request headers
 * Supports various proxy configurations (Cloudflare, Vercel, etc.)
 */
export function getClientIp(headersList) {
  // Try x-forwarded-for first (most common)
  const forwarded = headersList.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  // Try x-real-ip
  const realIp = headersList.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  // Fallback
  return "unknown";
}
