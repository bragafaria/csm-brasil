// app/api/_utils/assignCoach.js
import { supabaseService } from "./supabaseServiceClient.js";

export async function assignCoach(sessionId) {
  console.log("assignCoach STARTED for session:", sessionId);

  try {
    // 1. GET SESSION
    console.log("Fetching session...");
    const { data: session, error: sErr } = await supabaseService
      .from("blueprint_sessions")
      .select("id, user_id, payment_type, status")
      .eq("id", sessionId)
      .single();

    if (sErr) {
      console.error("SESSION FETCH ERROR:", JSON.stringify(sErr));
      throw new Error(`Session fetch error: ${sErr.message}`);
    }
    if (!session) {
      console.error("SESSION NOT FOUND:", sessionId);
      throw new Error("Session not found");
    }
    console.log("Session found:", session);

    // Skip if status is not pending (e.g., manually set to 'answered')
    if (session.status !== "pending") {
      console.log(`Session ${sessionId} has status '${session.status}', skipping assignment`);
      return { success: true, coachId: session.coach_id || null };
    }

    // 2. FIND COACH
    console.log("Fetching coaches...");
    const { data: coach, error: cErr } = await supabaseService
      .from("coaches")
      .select("id, availability")
      .eq("availability", true)
      .order("last_assignment_at", { ascending: true, nullsFirst: true })
      .limit(1)
      .single();

    if (cErr) {
      console.error("COACHES FETCH ERROR:", JSON.stringify(cErr));
      throw new Error(`Coaches fetch error: ${cErr.message}`);
    }
    if (!coach) {
      console.error("NO COACHES AVAILABLE");
      throw new Error("No coaches available");
    }
    console.log("Coach selected:", coach.id, "availability:", coach.availability);

    // 3. ASSIGN COACH AND UPDATE LAST_ASSIGNMENT_AT IN A TRANSACTION
    console.log("Assigning coach and updating last_assignment_at...");
    const { error: updateError } = await supabaseService.rpc("assign_coach_transaction", {
      p_session_id: sessionId,
      p_coach_id: coach.id,
    });

    if (updateError) {
      console.error("TRANSACTION ERROR:", JSON.stringify(updateError));
      throw new Error(`Transaction error: ${updateError.message}`);
    }

    console.log("COACH ASSIGNED:", coach.id, "to session:", sessionId);
    return { success: true, coachId: coach.id };
  } catch (err) {
    console.error("assignCoach FAILED:", err.message || JSON.stringify(err));
    throw err;
  }
}
