// app/api/email/report/send/route.js
import { Resend } from "resend";
import { NextResponse } from "next/server";
import PersonalityReportEmail from "@/app/components/emails/PersonalityReportEmail";
import { render } from "@react-email/render";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();
  const { name, archetypeName, typeCode, shareableUrl, to } = body;

  try {
    const html = await render(
      <PersonalityReportEmail
        name={name}
        archetypeName={archetypeName}
        typeCode={typeCode}
        shareableUrl={shareableUrl}
      />
    );

    await resend.emails.send({
      from: "CSM Dynamics <reports@updates.csmdynamics.com>", // Beautiful & trusted
      to: to,
      subject: `Your CSM Personality Report – The ${archetypeName}`,
      html,
      // No reply_to needed — this is a one-way delivery report
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Report email error:", error);
    // Don't throw — we still saved the visitor in DB, report page already shown
    return NextResponse.json({ success: true }); // silent success for user
  }
}
