// middleware.js
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// General API rate limiter: 100 requests per minute per IP
const apiRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"),
  analytics: true,
  prefix: "ratelimit:api",
});

// Dashboard rate limiter: 60 requests per minute per IP (more lenient)
const dashboardRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, "1 m"),
  analytics: true,
  prefix: "ratelimit:dashboard",
});

// Helper function to get client IP
function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  return request.ip ?? "unknown";
}

export async function middleware(req) {
  const res = NextResponse.next();
  const ip = getClientIp(req);

  // Apply rate limiting to API routes
  if (req.nextUrl.pathname.startsWith("/api/")) {
    const { success, pending, limit, reset, remaining } = await apiRatelimit.limit(ip);
    await pending;

    if (!success) {
      const resetDate = new Date(reset);
      const secondsUntilReset = Math.ceil((resetDate - Date.now()) / 1000);

      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          rateLimit: {
            limit,
            remaining: 0,
            reset: resetDate.toISOString(),
            retryAfter: secondsUntilReset,
          },
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": resetDate.toISOString(),
            "Retry-After": secondsUntilReset.toString(),
          },
        }
      );
    }

    // Add rate limit headers to successful responses
    res.headers.set("X-RateLimit-Limit", limit.toString());
    res.headers.set("X-RateLimit-Remaining", remaining.toString());
    res.headers.set("X-RateLimit-Reset", new Date(reset).toISOString());
  }

  // Apply rate limiting to dashboard routes
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    const { success, pending, limit, reset, remaining } = await dashboardRatelimit.limit(ip);
    await pending;

    if (!success) {
      const resetDate = new Date(reset);
      const secondsUntilReset = Math.ceil((resetDate - Date.now()) / 1000);

      // Redirect to error page with rate limit message
      const errorUrl = new URL("/error", req.url);
      errorUrl.searchParams.set("message", "too_many_requests");
      errorUrl.searchParams.set("retryAfter", secondsUntilReset.toString());

      return NextResponse.redirect(errorUrl);
    }

    // Add rate limit headers
    res.headers.set("X-RateLimit-Limit", limit.toString());
    res.headers.set("X-RateLimit-Remaining", remaining.toString());
    res.headers.set("X-RateLimit-Reset", new Date(reset).toISOString());

    // Continue with authentication check
    const supabase = createMiddlewareClient(
      { req, res },
      {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        auth: { persistSession: true },
      }
    );

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error("Middleware session error :", error.message);
    }

    if (!session) {
      console.log("No session found, redirecting to /login");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const siteId = req.nextUrl.pathname.split("/")[2];
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id, partner_id")
      .eq("id", session.user.id)
      .single();

    if (userError || !userData) {
      console.log("User fetch error:", userError?.message);
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const isPartnerA = session.user.id === siteId;
    const isPartnerB = userData.partner_id === siteId;

    if (!isPartnerA && !isPartnerB) {
      console.log(`Access denied: User ${session.user.id} not associated with siteId=${siteId}`);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
