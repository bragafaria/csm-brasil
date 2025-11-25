// // app/auth/callback/route.js
// import { NextResponse } from "next/server";
// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";

// export async function GET(request) {
//   const requestUrl = new URL(request.url);
//   const code = requestUrl.searchParams.get("code");
//   const next = requestUrl.searchParams.get("next") || "/dashboard";
//   const type = requestUrl.searchParams.get("type"); // <-- important: email_change, recovery, etc.

//   if (code) {
//     const supabase = createRouteHandlerClient({ cookies });
//     await supabase.auth.exchangeCodeForSession(code);
//   }

//   // IMPORTANT: Redirect based on the event type
//   if (type === "email_change") {
//     // Email was successfully changed → send to login (or dashboard with success message)
//     await supabase.auth.signOut();
//     return NextResponse.redirect(`${requestUrl.origin}/login?message=email_changed`);
//   }

//   if (type === "recovery") {
//     return NextResponse.redirect(`${requestUrl.origin}/auth/reset`);
//   }

//   // Default: go to dashboard or the 'next' param
//   return NextResponse.redirect(`${requestUrl.origin}${next}`);
// }
