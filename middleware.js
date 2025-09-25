import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseServerClient } from "./app/utils/supabase/server"; // Adjust path

export async function middleware(request: NextRequest) {
  const supabase = createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;
  const pathSegments = pathname.split("/").filter(Boolean);
  const isDashboard = pathSegments[0] === "dashboard";
  const userIdFromPath = pathSegments[1]; // e.g., UUID from /dashboard/[id]
  const { session_id } = Object.fromEntries(request.nextUrl.searchParams.entries());

  if (isDashboard) {
    if (!session) {
      // Unauthenticated: Check if this is a partner invitation
      if (userIdFromPath) {
        const { data: partner, error } = await supabase
          .from("partners")
          .select("primary_user_id, partner_user_id, partner_name, partner_email")
          .eq("primary_user_id", userIdFromPath)
          .single();

        if (error || !partner) {
          return NextResponse.redirect(new URL("/login", request.url));
        }

        // If partner details missing, redirect to partner signup
        if (!partner.partner_user_id || !partner.partner_name || !partner.partner_email) {
          const signupUrl = new URL("/signup/partner", request.url);
          signupUrl.searchParams.set("inviteId", userIdFromPath); // Pass invite ID
          signupUrl.searchParams.set("session_id", session_id || "");
          return NextResponse.redirect(signupUrl);
        }

        // If partner is set but not authenticated, still redirect to login
        return NextResponse.redirect(new URL("/login", request.url));
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Authenticated: Verify access to this dashboard
    const userId = session.user.id;
    if (userIdFromPath && userIdFromPath !== userId) {
      // Check if this user is the partner for this primary_user_id
      const { data: partner, error } = await supabase
        .from("partners")
        .select("primary_user_id, partner_user_id")
        .or(`primary_user_id.eq.${userIdFromPath},partner_user_id.eq.${userIdFromPath}`)
        .single();

      if (error || !partner || (partner.primary_user_id !== userId && partner.partner_user_id !== userId)) {
        // Redirect to their own dashboard
        return NextResponse.redirect(new URL(`/dashboard/${userId}`, request.url));
      }
    } else if (!userIdFromPath) {
      // No userId in path, redirect to their own
      return NextResponse.redirect(new URL(`/dashboard/${userId}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
