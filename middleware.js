// middleware.js
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "./app/utils/supabase/server"; // Adjust path

export async function middleware(request) {
  const supabase = createSupabaseServerClient(); // Ensure middleware-compatible setup
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname, searchParams } = request.nextUrl;
  const pathSegments = pathname.split("/").filter(Boolean);
  const isDashboard = pathSegments[0] === "dashboard";
  const userIdFromPath = pathSegments[1]; // e.g., UUID from `/dashboard/[id]`
  const session_id = searchParams.get("session_id");

  if (isDashboard) {
    if (!session) {
      if (userIdFromPath) {
        const { data: partner, error } = await supabase
          .from("partners")
          .select("primary_user_id, partner_user_id, partner_name, partner_email")
          .eq("primary_user_id", userIdFromPath)
          .single();

        if (error || !partner) {
          return NextResponse.redirect(new URL("/login", request.url));
        }

        if (!partner.partner_user_id || !partner.partner_name || !partner.partner_email) {
          const signupUrl = new URL("/signup/partner", request.url);
          signupUrl.searchParams.set("inviteId", userIdFromPath);
          if (session_id) signupUrl.searchParams.set("session_id", session_id);
          return NextResponse.redirect(signupUrl);
        }

        return NextResponse.redirect(new URL("/login", request.url));
      }

      return NextResponse.redirect(new URL("/login", request.url));
    }

    const userId = session.user.id;

    if (userIdFromPath && userIdFromPath !== userId) {
      const { data: partner, error } = await supabase
        .from("partners")
        .select("primary_user_id, partner_user_id")
        .or(`primary_user_id.eq.${userIdFromPath},partner_user_id.eq.${userIdFromPath}`)
        .single();

      if (error || !partner || (partner.primary_user_id !== userId && partner.partner_user_id !== userId)) {
        return NextResponse.redirect(new URL(`/dashboard/${userId}`, request.url));
      }
    } else if (!userIdFromPath) {
      return NextResponse.redirect(new URL(`/dashboard/${userId}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth/reset).*)"],
};
