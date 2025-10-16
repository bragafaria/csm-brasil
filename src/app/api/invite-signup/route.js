import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email, confirmEmail, password, invite, siteId } = await request.json();

  // Server-side form validation
  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  if (!email || !/\S+@\S+\.\S+/.test(email)) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  if (email !== confirmEmail) return NextResponse.json({ error: "Emails do not match" }, { status: 400 });
  if (!password || password.length < 6)
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
  if (!invite || !siteId) return NextResponse.json({ error: "Invalid invite parameters" }, { status: 400 });

  const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  // Validate Partner A
  const { data: partnerA, error: partnerAError } = await supabaseAdmin
    .from("users")
    .select("id, partner_id, has_paid")
    .eq("id", siteId)
    .single();

  if (partnerAError || !partnerA) {
    console.error("Partner A query error:", partnerAError?.message, partnerAError?.details);
    return NextResponse.json({ error: "Invalid invite: Partner not found." }, { status: 400 });
  }

  if (!partnerA.has_paid) {
    return NextResponse.json({ error: "Invalid invite: Partner has not paid." }, { status: 400 });
  }

  if (partnerA.partner_id) {
    return NextResponse.json({ error: "This invitation has already been used." }, { status: 400 });
  }

  // Validate invite
  const { data: inviteData, error: inviteError } = await supabaseAdmin
    .from("invite")
    .select("id")
    .eq("user_id", siteId)
    .eq("invite", invite)
    .single();

  if (inviteError || !inviteData) {
    console.error("Invite query error:", inviteError?.message, inviteError?.details);
    return NextResponse.json({ error: "Invalid invite link." }, { status: 400 });
  }

  // Sign up Partner B (using public client for auth)
  const supabasePublic = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const { data, error: signUpError } = await supabasePublic.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (signUpError) {
    console.error("Signup error:", signUpError.message);
    return NextResponse.json({ error: signUpError.message }, { status: 400 });
  }

  const userId = data.user.id;

  // Update Partner B
  const { error: updateBError } = await supabaseAdmin
    .from("users")
    .update({ partner_id: siteId, site_id: siteId })
    .eq("id", userId);

  if (updateBError) {
    console.error("Error updating Partner B:", updateBError.message);
    return NextResponse.json({ error: "Failed to link partner." }, { status: 500 });
  }

  // Update Partner A
  const { error: updateAError } = await supabaseAdmin.from("users").update({ partner_id: userId }).eq("id", siteId);

  if (updateAError) {
    console.error("Error updating Partner A:", updateAError.message);
    return NextResponse.json({ error: "Failed to link partners." }, { status: 500 });
  }

  // Delete the invite
  const { error: deleteInviteError } = await supabaseAdmin
    .from("invite")
    .delete()
    .eq("user_id", siteId)
    .eq("invite", invite);

  if (deleteInviteError) {
    console.error("Error deleting invite:", deleteInviteError.message);
    return NextResponse.json({ error: "Failed to clean up invite." }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
