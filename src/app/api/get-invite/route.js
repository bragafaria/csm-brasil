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

    const { data: userCheck, error: userCheckError } = await supabase
      .from("users")
      .select("has_paid")
      .eq("id", siteId)
      .single();

    if (userCheckError || !userCheck?.has_paid) {
      console.log("Payment not completed yet for user:", siteId);
      return new Response(JSON.stringify({ error: "Payment not completed" }), {
        status: 402, // Payment Required
        headers: { "Content-Type": "application/json" },
      });
    }

    const { data, error } = await supabase
      .from("invite")
      .select("invite")
      .eq("user_id", siteId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      console.error("Error fetching invite:", error?.message || "No invite found", { siteId, error });
      return new Response(JSON.stringify({ error: "No invite found for this dashboard" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/invite/signup?invite=${data.invite}&siteId=${siteId}`;
    console.log("Generated invite link:", inviteLink);

    return new Response(JSON.stringify({ inviteLink }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error in get-invite:", err.message, err.stack);
    return new Response(JSON.stringify({ error: `Server error: ${err.message}` }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
