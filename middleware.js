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

// Rate limiter for main Signups
const signupRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "1 h"), // 5 signups per hour per IP
  analytics: true,
  prefix: "ratelimit:signup",
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

// Admin/Blogger login rate limiter — stricter than regular login
const adminLoginRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "15 m"), // 10 attempts every 15 minutes per IP
  analytics: true,
  prefix: "ratelimit:admin-login",
});

// CSM-Expert / Coach admin login — same strictness as blogger
const coachLoginRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "15 m"), // 10 attempts every 15 minutes
  analytics: true,
  prefix: "ratelimit:coach-login",
});

// Public content rate limiter – generous but safe
export const publicContentRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, "1 m"), // 60 req/min per IP → 1/sec average
  analytics: true,
  prefix: "ratelimit:public-content",
});

// Helper function to get client IP
function getClientIp(request) {
  // 1. Cloudflare – works even when proxy is OFF
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;

  // 2. Standard Vercel / proxies
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  // 3. Legacy headers
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;

  // 4. Fallback (almost never hit)
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

  // === NEW: Rate limit sign-up page (both GET and POST) ===
  if (req.nextUrl.pathname.startsWith("/report/") && req.nextUrl.pathname.includes("/signup")) {
    const { success, pending, limit, reset, remaining } = await signupRatelimit.limit(ip);
    await pending;

    if (!success) {
      const resetDate = new Date(reset);
      const secondsUntilReset = Math.ceil((resetDate - Date.now()) / 1000);

      // For HTML pages → redirect to friendly error
      const errorUrl = new URL("/error", req.url);
      errorUrl.searchParams.set("message", "too_many_signups");
      errorUrl.searchParams.set("retryAfter", secondsUntilReset.toString());

      return NextResponse.redirect(errorUrl);
    }

    // In middleware.js – replace your two signup header lines with this:
    res.headers.set("x-middleware-signup-limit", limit.toString());
    res.headers.set("x-middleware-signup-remaining", remaining.toString());
  }

  // === RATE LIMIT INVITE SIGNUP PAGE ===
  if (req.nextUrl.pathname === "/invite/signup") {
    const { success, pending, limit, reset, remaining } = await signupRatelimit.limit(ip);
    await pending;

    if (!success) {
      const resetDate = new Date(reset);
      const secondsUntilReset = Math.ceil((resetDate - Date.now()) / 1000);

      const errorUrl = new URL("/error", req.url);
      errorUrl.searchParams.set("message", "too_many_signups");
      errorUrl.searchParams.set("retryAfter", secondsUntilReset.toString());

      return NextResponse.redirect(errorUrl);
    }

    // Same headers as regular signup so you can show remaining attempts
    res.headers.set("x-middleware-signup-limit", limit.toString());
    res.headers.set("x-middleware-signup-remaining", remaining.toString());
  }
  // === RATE LIMIT BLOGGER / ADMIN LOGIN PAGE ===
  if (req.nextUrl.pathname === "/blog/admin/login") {
    const { success, pending, limit, reset, remaining } = await adminLoginRatelimit.limit(ip);
    await pending;

    if (!success) {
      const resetDate = new Date(reset);
      const secondsUntilReset = Math.ceil((resetDate - Date.now()) / 1000);

      const errorUrl = new URL("/error", req.url);
      errorUrl.searchParams.set("message", "too_many_login_attempts");
      errorUrl.searchParams.set("retryAfter", secondsUntilReset.toString());

      return NextResponse.redirect(errorUrl);
    }

    // Pass remaining attempts to client via meta tag (same as signup)
    res.headers.set("x-middleware-admin-login-limit", limit.toString());
    res.headers.set("x-middleware-admin-login-remaining", remaining.toString());
  }

  // === RATE LIMIT CSM-EXPERT / COACH LOGIN PAGE ===
  if (req.nextUrl.pathname === "/access/login") {
    const { success, pending, limit, reset, remaining } = await coachLoginRatelimit.limit(ip);
    await pending;

    if (!success) {
      const resetDate = new Date(reset);
      const secondsUntilReset = Math.ceil((resetDate - Date.now()) / 1000);

      const errorUrl = new URL("/error", req.url);
      errorUrl.searchParams.set("message", "too_many_login_attempts");
      errorUrl.searchParams.set("retryAfter", secondsUntilReset.toString());

      return NextResponse.redirect(errorUrl);
    }

    // Pass remaining attempts to client
    res.headers.set("x-middleware-coach-login-limit", limit.toString());
    res.headers.set("x-middleware-coach-login-remaining", remaining.toString());
  }
  // === RATE LIMIT PUBLIC CONTENT PAGES (blog, etc.) ===
  if (
    req.nextUrl.pathname === "/blog" ||
    (req.nextUrl.pathname.startsWith("/blog/") && !req.nextUrl.pathname.startsWith("/blog/admin"))
  ) {
    const { success, pending, remaining, reset } = await publicContentRateLimiter.limit(ip);
    await pending;

    if (!success) {
      const resetDate = new Date(reset);
      const secondsUntilReset = Math.ceil((resetDate - Date.now()) / 1000);

      const errorUrl = new URL("/error", req.url);
      errorUrl.searchParams.set("message", "too_many_requests");
      errorUrl.searchParams.set("retryAfter", secondsUntilReset.toString());

      return NextResponse.redirect(errorUrl);
    }

    // Optional: pass remaining to client if you want to show "slow down" message
    res.headers.set("x-middleware-content-remaining", remaining.toString());
  }

  return res;
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/api/:path*",
    "/report/:path*/signup",
    "/report/:path*/signup/:path*",
    "/invite/signup",
    "/invite/signup/:path*",
    "/blog/admin/login",
    "/blog/admin/login/:path*",
    "/access/login",
    "/access/login/:path*",
    "/blog",
    "/blog/:path*",
  ],
};
