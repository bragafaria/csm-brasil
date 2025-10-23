// src/app/api/get-invite/route.js
import { createClient } from "@supabase/supabase-js";

export async function GET(request) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      console.error("No authorization token provided");
      return new Response(JSON.stringify({ error: "Unauthorized: Missing token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);
    if (authError || !user) {
      console.error("Auth error:", authError?.message || "No user found", authError);
      return new Response(JSON.stringify({ error: "Unauthorized: Invalid or expired token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    console.log("Authenticated user ID:", user.id);

    const siteId = user.id; // Enforce Partner A rule (siteId = user.id)

    const { data, error } = await supabase
      .from("invite") // Adjust to "invites" if that's the table name
      .select("invite")
      .eq("user_id", siteId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(); // Use maybeSingle to avoid JSON coercion error

    if (error) {
      console.error("Error fetching invite:", error?.message, error);
      return new Response(JSON.stringify({ error: "Failed to fetch invite: Database error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!data) {
      console.error("No invite found for siteId:", siteId);
      return new Response(JSON.stringify({ error: "No invite found for this dashboard" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/${siteId}?invite=${data.invite}`;
    console.log("Generated invite link:", inviteLink);

    return new Response(JSON.stringify({ inviteLink }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error in get-invite:", err.message, err);
    return new Response(JSON.stringify({ error: `Server error: ${err.message}` }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
