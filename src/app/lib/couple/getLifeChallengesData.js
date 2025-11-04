// app/lib/couple/getLifeChallengesData.js
import { supabase } from "@/app/utils/supabaseClient";
import { LifeAreasChallenges } from "@/app/lib/data/LifeAreasChallenges";

export async function getLifeChallengesData(siteId) {
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

  // === TRY BOTH POSSIBLE KEY ORDERS (NO SORTING) ===
  const key1 = `${partnerAData.typeCode}/${partnerBData.typeCode}`;
  const key2 = `${partnerBData.typeCode}/${partnerAData.typeCode}`;

  let lifeChallengesArray = LifeAreasChallenges[key1] || LifeAreasChallenges[key2];

  if (!lifeChallengesArray || !Array.isArray(lifeChallengesArray) || lifeChallengesArray.length === 0) {
    console.error("Missing life challenges for:", key1, "or", key2);
    console.error("Available keys (sample):", Object.keys(LifeAreasChallenges).slice(0, 5));
    throw new Error(`No life challenges data for ${key1} or ${key2}`);
  }

  const lifeChallenges = lifeChallengesArray[0];

  return {
    partnerA: { name: partnerAData.name, typeCode: partnerAData.typeCode },
    partnerB: { name: partnerBData.name, typeCode: partnerBData.typeCode },
    lifeChallenges,
  };
}
