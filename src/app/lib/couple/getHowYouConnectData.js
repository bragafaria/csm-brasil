// app/lib/couple/getHowYouConnectData.js
import { supabase } from "@/app/utils/supabaseClient";
import { coupleDynamics } from "@/app/lib/data/CoupleDynamics";

export async function getHowYouConnectData(siteId) {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    if (typeof window !== "undefined") window.location.href = "/login";
    throw new Error("No session");
  }

  const userId = session.user.id;

  const { data: partnerAData, error: partnerAError } = await supabase
    .from("users")
    .select("id, name, typeCode, partner_id, has_assessment")
    .eq("id", siteId)
    .single();

  if (partnerAError || !partnerAData) {
    if (typeof window !== "undefined") window.location.href = "/error?message=Invalid report";
    throw new Error("Partner A not found");
  }

  const isPartnerA = userId === siteId;
  const isPartnerB = partnerAData.partner_id === userId;

  if (!isPartnerA && !isPartnerB) {
    if (typeof window !== "undefined") window.location.href = "/error?message=Access denied";
    throw new Error("Access denied");
  }

  if (!partnerAData.partner_id) {
    throw new Error("Partner B has not signed up yet.");
  }

  const { data: partnerBData, error: partnerBError } = await supabase
    .from("users")
    .select("id, name, typeCode, has_assessment")
    .eq("id", partnerAData.partner_id)
    .single();

  if (partnerBError || !partnerBData) {
    throw new Error("Partner B not found");
  }

  if (!partnerAData.has_assessment || !partnerBData.has_assessment) {
    throw new Error("Both partners must complete the assessment.");
  }

  // === NORMALIZE KEY ===
  const [typeA, typeB] = [partnerAData.typeCode, partnerBData.typeCode];
  const normalizedKey = typeA < typeB ? `${typeA}/${typeB}` : `${typeB}/${typeA}`;

  // === ONLY DYNAMICS ===
  const dynamics = coupleDynamics[normalizedKey];
  if (!dynamics) {
    console.error("Missing dynamics for:", normalizedKey);
    console.error("Available keys (first 3):", Object.keys(coupleDynamics).slice(0, 3));
    throw new Error(`No dynamics data for ${normalizedKey}`);
  }

  return {
    partnerA: { name: partnerAData.name, typeCode: partnerAData.typeCode },
    partnerB: { name: partnerBData.name, typeCode: partnerBData.typeCode },
    dynamics,
  };
}
