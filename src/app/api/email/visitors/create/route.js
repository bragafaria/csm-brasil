// app/api/visitors/create/route.js
import { createClient } from "@supabase/supabase-js";
import { render } from "@react-email/render";
import PersonalityReportEmail, { getPlainTextVersion } from "@/app/components/emails/PersonalityReportEmail";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, fullData } = body;

    // 1. Save to database
    const { error: dbError } = await supabase.from("visitors").insert({
      name: name.trim(),
      email: email.trim(),
    });

    if (dbError) {
      console.error("Database error:", dbError);
      return Response.json({ error: "Failed to save visitor data" }, { status: 500 });
    }

    // 2. Send email with proper deliverability settings
    if (fullData?.results?.typeCode) {
      const archetypeName =
        typeof fullData.results.archetype === "object"
          ? fullData.results.archetype?.name || "Unknown Archetype"
          : fullData.results.archetype || "Unknown Archetype";

      try {
        const trimmedEmail = email.trim();
        const trimmedName = name.trim();
        const unsubscribeUrl = `https://csmdynamics.com/unsubscribe?email=${encodeURIComponent(trimmedEmail)}`;

        // Generate HTML version using React component
        const emailHtml = await render(
          PersonalityReportEmail({
            name: trimmedName,
            archetypeName: archetypeName,
            typeCode: fullData.results.typeCode,
            shareableUrl: fullData.permanentUrl,
            unsubscribeUrl: unsubscribeUrl,
          })
        );

        // Generate plain text version (CRITICAL for Gmail)
        const emailText = getPlainTextVersion({
          name: trimmedName,
          archetypeName: archetypeName,
          typeCode: fullData.results.typeCode,
          shareableUrl: fullData.permanentUrl,
          unsubscribeUrl: unsubscribeUrl,
        });

        // Send email with all deliverability features
        const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/email/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: trimmedEmail,
            subject: `Your CSM Personality Report – The ${archetypeName}`,
            html: emailHtml,
            text: emailText, // Plain text version for Gmail
            headers: {
              // List-Unsubscribe headers (Gmail requirement since Feb 2024)
              "List-Unsubscribe": `<${unsubscribeUrl}>`,
              "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
            },
          }),
        });

        if (!emailResponse.ok) {
          console.error("Email failed:", await emailResponse.text());
        }
      } catch (emailError) {
        console.error("Email error:", emailError);
        // Don't fail the whole request if email fails
      }
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Visitor creation error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
