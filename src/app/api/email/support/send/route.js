// app/api/email/support/send/route.js
import { Resend } from "resend";
import { NextResponse } from "next/server";
import SupportIncomingEmail from "@/app/components/emails/SupportIncomingEmail";
import SupportConfirmationEmail from "@/app/components/emails/SupportConfirmationEmail";
import { render } from "@react-email/render";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();

  try {
    // ── Always send incoming email to you ──
    const incomingHtml = await render(
      <SupportIncomingEmail
        ticket={body.ticket}
        name={body.name}
        email={body.email}
        area={body.area}
        subject={body.userSubject}
        message={body.message}
      />
    );

    await resend.emails.send({
      from: "CSM Support <support@updates.csmdynamics.com>",
      to: process.env.SUPPORT_EMAIL, // safe – server only
      reply_to: process.env.SUPPORT_EMAIL,
      subject: body.subject || `New support ticket #${body.ticket}`,
      html: incomingHtml,
    });

    // ── Always send confirmation to user ──
    const confirmationHtml = await render(<SupportConfirmationEmail name={body.name} ticket={body.ticket} />);

    await resend.emails.send({
      from: "CSM Support <support@updates.csmdynamics.com>",
      reply_to: process.env.SUPPORT_EMAIL,
      to: body.email, // use body.email directly
      subject: body.confirmationSubject || `Ticket #${body.ticket} Received`,
      html: confirmationHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Support email error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
