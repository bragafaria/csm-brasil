// app/api/visitors/create/route.js
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import PersonalityReportEmail from "@/app/components/emails/PersonalityReport";
import { render } from "@react-email/render";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, fullData } = await request.json();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    // 1. Save visitor to DB (most important)
    const { error: dbError } = await supabase.from("visitors").insert({
      name: trimmedName,
      email: trimmedEmail,
      archetype: fullData.results.typeCode,
      created_at: new Date().toISOString(),
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return Response.json({ error: "Failed to save" }, { status: 500 });
    }

    // 2. Send report email via Resend (fire-and-forget, never blocks user)
    if (fullData?.results?.typeCode && trimmedEmail) {
      const archetypeName =
        typeof fullData.results.archetype === "object"
          ? fullData.results.archetype?.name || fullData.results.typeCode
          : fullData.results.archetype || fullData.results.typeCode;

      try {
        const emailHtml = await render(
          <PersonalityReportEmail
            name={trimmedName}
            archetypeName={archetypeName}
            typeCode={fullData.results.typeCode}
            shareableUrl={fullData.permanentUrl}
          />
        );

        await resend.emails.send({
          from: "CSM Dynamics <reports@updates.csmdynamics.com>",
          to: trimmedEmail,
          subject: `Your CSM Personality Report – The ${archetypeName}`,
          html: emailHtml,
          // Optional: add tags for Resend dashboard filtering
          tags: [
            { name: "category", value: "personality_report" },
            { name: "archetype", value: fullData.results.typeCode },
          ],
        });
      } catch (emailError) {
        // Silent fail — user already has the report via permanentUrl
        console.error("Report email failed (non-critical):", emailError);
      }
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Visitor creation error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
