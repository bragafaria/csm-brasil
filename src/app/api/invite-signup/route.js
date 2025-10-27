// src/app/api/invite-signup/route.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request) {
  try {
    const { name, email, confirmEmail, password, invite, siteId, partnerBId } = await request.json();

    if (!name || !email || !confirmEmail || !password || !invite || !siteId || !partnerBId) {
      console.error("Missing required fields:", { name, email, confirmEmail, invite, siteId, partnerBId });
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (email !== confirmEmail) {
      console.error("Emails do not match:", { email, confirmEmail });
      return new Response(JSON.stringify({ error: "Emails do not match" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Validate invite
    const { data: inviteData, error: inviteError } = await supabaseAdmin
      .from("invite")
      .select("id, user_id, invite")
      .eq("invite", invite)
      .eq("user_id", siteId)
      .single();

    if (inviteError || !inviteData) {
      console.error("Invalid invite:", inviteError?.message || "No invite found", { invite, siteId });
      return new Response(JSON.stringify({ error: "Invalid or expired invite link" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Verify Partner A exists
    const { data: partnerAData, error: partnerAError } = await supabaseAdmin
      .from("users")
      .select("id, partner_id")
      .eq("id", siteId)
      .single();

    if (partnerAError || !partnerAData) {
      console.error("Partner A not found:", partnerAError?.message, { siteId });
      return new Response(JSON.stringify({ error: "Partner A not found" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (partnerAData.partner_id) {
      console.error("Partner A already has a partner:", partnerAData.partner_id);
      return new Response(JSON.stringify({ error: "Partner A already has a linked partner" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Update Partner A's partner_id
    const { error: updatePartnerAError } = await supabaseAdmin
      .from("users")
      .update({ partner_id: partnerBId })
      .eq("id", siteId);

    if (updatePartnerAError) {
      console.error("Error updating Partner A's partner_id:", updatePartnerAError.message);
      return new Response(JSON.stringify({ error: "Failed to link Partner A" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Update Partner B's user record
    const { error: updatePartnerBError } = await supabaseAdmin
      .from("users")
      .update({ partner_id: siteId, site_id: siteId })
      .eq("id", partnerBId);

    if (updatePartnerBError) {
      console.error("Error updating Partner B's user record:", updatePartnerBError.message);
      return new Response(JSON.stringify({ error: "Failed to update Partner B's user data" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Delete the invite
    const { error: deleteInviteError } = await supabaseAdmin
      .from("invite")
      .delete()
      .eq("invite", invite)
      .eq("user_id", siteId);

    if (deleteInviteError) {
      console.error("Error deleting invite:", deleteInviteError.message);
      // Log but don't fail, as the signup is complete
    }

    console.log("Invite signup successful:", { partnerBId, siteId });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API error:", err.message, err.stack);
    return new Response(JSON.stringify({ error: err.message || "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
