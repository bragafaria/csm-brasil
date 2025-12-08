import { supabase } from "@/app/utils/supabaseClient";

export async function getHowYouConnectData(siteId) {
  // 1. Get session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    if (typeof window !== "undefined") window.location.href = "/login";
    throw new Error("No session");
  }

  const userId = session.user.id;

  // 2. Fetch Partner A (from URL)
  const { data: partnerAData, error: partnerAError } = await supabase
    .from("users")
    .select("id, name, typeCode, partner_id, has_assessment")
    .eq("id", siteId)
    .single();

  if (partnerAError || !partnerAData) {
    if (typeof window !== "undefined") window.location.href = "/error?message=Invalid report";
    throw new Error("Partner data not found. Contact support.");
  }

  // 3. Access control
  const isPartnerA = userId === siteId;
  const isPartnerB = partnerAData.partner_id === userId;

  if (!isPartnerA && !isPartnerB) {
    if (typeof window !== "undefined") window.location.href = "/error?message=Access denied";
    throw new Error("Access denied");
  }

  if (!partnerAData.partner_id) {
    throw new Error("Your partner has not completed the assessment yet.");
  }

  // 4. Fetch Partner B (linked partner)
  const { data: partnerBData, error: partnerBError } = await supabase
    .from("users")
    .select("id, name, typeCode, has_assessment")
    .eq("id", partnerAData.partner_id)
    .single();

  if (partnerBError || !partnerBData) {
    throw new Error("Partner data not found");
  }

  // 5. Both must have completed assessment
  if (!partnerAData.has_assessment || !partnerBData.has_assessment) {
    throw new Error("Both partners must complete the assessment.");
  }

  // 6. Fetch couple dynamics from database
  const key1 = `${partnerAData.typeCode}/${partnerBData.typeCode}`;
  const key2 = `${partnerBData.typeCode}/${partnerAData.typeCode}`;

  const { data: dynamicsData, error: dynamicsError } = await supabase
    .from("couple_dynamics")
    .select("data")
    .or(`pairing_key.eq.${key1},pairing_key.eq.${key2}`)
    .maybeSingle();

  if (dynamicsError) {
    console.error("Database error:", dynamicsError);
    throw new Error("Failed to fetch couple dynamics data");
  }

  if (!dynamicsData) {
    console.error("Missing couple dynamics for:", key1, "or", key2);
    throw new Error(`No couple dynamics data found for this pairing`);
  }

  // 7. Return clean data
  return {
    partnerA: { name: partnerAData.name, typeCode: partnerAData.typeCode },
    partnerB: { name: partnerBData.name, typeCode: partnerBData.typeCode },
    dynamics: dynamicsData.data, // This is the JSONB data from database
  };
}
