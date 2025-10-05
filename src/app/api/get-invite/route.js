import { createClient } from "@supabase/supabase-js";

export async function GET(request) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) {
    console.error("No authorization token provided");
    return new Response(JSON.stringify({ error: "No authorization token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);
  if (authError || !user) {
    console.error("Auth error:", authError?.message);
    return new Response(JSON.stringify({ error: "Unauthorized: Invalid or expired token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const siteId = user.id;
  console.log("Fetching invite for siteId:", siteId);

  const { data, error } = await supabase
    .from("invite")
    .select("invite")
    .eq("user_id", siteId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    console.error("Error fetching invite:", {
      message: error?.message,
      details: error?.details,
    });
    return new Response(JSON.stringify({ error: "Failed to fetch invite: No invite found" }), {
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
}
