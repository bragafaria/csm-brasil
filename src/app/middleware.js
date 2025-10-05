import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
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
    console.error("Middleware session error:", error.message);
  }

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
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
  matcher: ["/dashboard/:path*"],
};
