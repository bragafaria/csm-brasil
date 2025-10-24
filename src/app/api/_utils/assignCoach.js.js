// app/api/_utils/assignCoach.js
import { supabaseService } from "./supabaseServiceClient.js";

export async function assignCoach(sessionId) {
  console.log("assignCoach STARTED for session:", sessionId);

  try {
    // 1. GET SESSION
    console.log("Fetching session...");
    const { data: session, error: sErr } = await supabaseService
      .from("blueprint_sessions")
      .select("id, user_id, payment_type")
      .eq("id", sessionId)
      .single();

    if (sErr) {
      console.error("SESSION FETCH ERROR:", sErr);
      throw sErr;
    }
    if (!session) {
      console.error("SESSION NOT FOUND:", sessionId);
      throw new Error("Session not found");
    }
    console.log("Session found:", session);

    // 2. FIND COACH
    console.log("Fetching coaches...");
    const { data: coaches, error: cErr } = await supabaseService
      .from("coaches")
      .select("id, user_id, availability, last_assignment_at")
      .order("last_assignment_at", { ascending: true }) // ← FIXED
      .limit(1);

    if (cErr) {
      console.error("COACHES FETCH ERROR:", cErr);
      throw cErr;
    }
    if (!coaches?.length) {
      console.error("NO COACHES AVAILABLE");
      throw new Error("No coaches available");
    }

    const coach = coaches[0];
    console.log("Coach selected:", coach.id);

    // 3. ASSIGN COACH
    console.log("Assigning coach to session...");
    const { error: assignErr } = await supabaseService
      .from("blueprint_sessions")
      .update({
        coach_id: coach.id,
        assigned_at: new Date().toISOString(),
        status: "assigned",
      })
      .eq("id", sessionId);

    if (assignErr) {
      console.error("ASSIGN ERROR:", assignErr);
      throw assignErr;
    }

    // 4. UPDATE COACH LAST ASSIGNMENT
    console.log("Updating coach last_assignment_at...");
    const { error: updateErr } = await supabaseService
      .from("coaches")
      .update({ last_assignment_at: new Date().toISOString() })
      .eq("id", coach.id);

    if (updateErr) {
      console.warn("COACH UPDATE FAILED (non-critical):", updateErr);
    }

    console.log("COACH ASSIGNED:", coach.id, "to session:", sessionId);
  } catch (err) {
    console.error("assignCoach FAILED:", err.message || err);
    throw err;
  }
}
