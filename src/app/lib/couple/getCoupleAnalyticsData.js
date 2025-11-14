// app/lib/couple/getCoupleAnalyticsData.js

import { supabase } from "@/app/utils/supabaseClient";

export async function getCoupleAnalyticsData(siteId) {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    if (typeof window !== "undefined") window.location.href = "/login";
    throw new Error("No session");
  }

  const userId = session.user.id;

  // === FETCH PARTNER A ===
  const { data: partnerAData, error: partnerAError } = await supabase
    .from("users")
    .select("id, name, typeCode, partner_id, has_assessment, percents")
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

  // === PARTNER B MUST EXIST ===
  if (!partnerAData.partner_id) {
    throw new Error("Partner B has not signed up yet.");
  }

  // === FETCH PARTNER B ===
  const { data: partnerBData, error: partnerBError } = await supabase
    .from("users")
    .select("id, name, typeCode, has_assessment, percents")
    .eq("id", partnerAData.partner_id)
    .single();

  if (partnerBError || !partnerBData) {
    throw new Error("Partner B not found");
  }

  // === BOTH MUST HAVE ASSESSMENT ===
  if (!partnerAData.has_assessment || !partnerBData.has_assessment) {
    throw new Error("Both partners must complete the assessment.");
  }

  // === VALIDATE PERCENTS (jsonb → array) ===
  const safeParsePercents = (percents, partnerName) => {
    if (!percents) {
      console.error(`percents missing for ${partnerName}`);
      throw new Error(`Assessment data incomplete for ${partnerName}.`);
    }
    if (Array.isArray(percents)) return percents;
    try {
      const parsed = JSON.parse(percents);
      if (Array.isArray(parsed) && parsed.length === 5) return parsed;
      throw new Error("Invalid percents format");
    } catch (e) {
      console.error(`Failed to parse percents for ${partnerName}:`, percents);
      throw new Error(`Invalid assessment data for ${partnerName}.`);
    }
  };

  let percentsA, percentsB;
  try {
    percentsA = safeParsePercents(partnerAData.percents, partnerAData.name);
    percentsB = safeParsePercents(partnerBData.percents, partnerBData.name);
  } catch (e) {
    throw e; // Re-throw with user-friendly message
  }

  // === ENSURE 5 VALUES PER POLE ===
  if (percentsA.length !== 5 || percentsB.length !== 5) {
    throw new Error("Assessment data is incomplete. Please retake the assessment.");
  }

  return {
    partnerA: {
      name: partnerAData.name,
      typeCode: partnerAData.typeCode,
      percents: percentsA,
    },
    partnerB: {
      name: partnerBData.name,
      typeCode: partnerBData.typeCode,
      percents: percentsB,
    },
  };
}
