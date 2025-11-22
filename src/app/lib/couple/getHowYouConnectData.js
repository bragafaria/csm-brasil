// app/lib/couple/getHowYouConnectData.js
import { supabase } from "@/app/utils/supabaseClient";
import { coupleDynamics } from "@/app/lib/data/couple-dynamics-data";

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
    throw new Error("Partner data not found. Contact support.");
  }

  const isPartnerA = userId === siteId;
  const isPartnerB = partnerAData.partner_id === userId;

  if (!isPartnerA && !isPartnerB) {
    if (typeof window !== "undefined") window.location.href = "/error?message=Access denied";
    throw new Error("Access denied");
  }

  if (!partnerAData.partner_id) {
    throw new Error("Your partner has not completed the assessment yet.");
  }

  const { data: partnerBData, error: partnerBError } = await supabase
    .from("users")
    .select("id, name, typeCode, has_assessment")
    .eq("id", partnerAData.partner_id)
    .single();

  if (partnerBError || !partnerBData) {
    throw new Error("Partner data not found");
  }

  if (!partnerAData.has_assessment || !partnerBData.has_assessment) {
    throw new Error("Both partners must complete the assessment.");
  }

  // === NORMALIZE KEY ===
  // === NORMALIZE KEY: TRY BOTH ORDERS ===
  const [typeA, typeB] = [partnerAData.typeCode, partnerBData.typeCode];

  const tryKey = (a, b) => {
    const k1 = a > b ? `${a}/${b}` : `${b}/${a}`;
    if (coupleDynamics[k1]) return coupleDynamics[k1];
    const k2 = a < b ? `${a}/${b}` : `${b}/${a}`;
    if (coupleDynamics[k2]) return coupleDynamics[k2];
    return null;
  };

  const dynamics = tryKey(typeA, typeB);
  if (!dynamics) {
    const attempted = typeA > typeB ? `${typeA}/${typeB}` : `${typeB}/${typeA}`;
    console.error("Missing dynamics for:", attempted);
    console.error("Available keys (first 3):", Object.keys(coupleDynamics).slice(0, 3));
    throw new Error(`No dynamics data for ${attempted}`);
  }

  return {
    partnerA: { name: partnerAData.name, typeCode: partnerAData.typeCode },
    partnerB: { name: partnerBData.name, typeCode: partnerBData.typeCode },
    dynamics,
  };
}
