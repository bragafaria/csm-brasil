// app/api/email/support/send/route.js
import { Resend } from "resend";
import { NextResponse } from "next/server";
import SupportIncomingEmail from "@/app/components/emails/SupportIncomingEmail";
import SupportConfirmationEmail from "@/app/components/emails/SupportConfirmationEmail";
import { render } from "@react-email/render";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();

  let adminSent = false;
  let confirmationSent = false;

  try {
    // ── 1. Always try to notify YOU first (most important) ──
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
      from: "CSM Support <support@csmdynamics.com>",
      to: process.env.SUPPORT_EMAIL,
      reply_to: process.env.SUPPORT_EMAIL,
      subject: body.subject || `New support ticket #${body.ticket}`,
      html: incomingHtml,
    });

    adminSent = true;
  } catch (error) {
    console.error("CRITICAL: Failed to send email to admin", error);
    // You can even send yourself a notification here if you want
  }

  // ── 2. Try to send confirmation to user (nice to have, but not critical) ──
  if (adminSent && body.email) {
    try {
      const confirmationHtml = await render(<SupportConfirmationEmail name={body.name} ticket={body.ticket} />);

      await resend.emails.send({
        from: "CSM Support <support@updates.csmdynamics.com>",
        reply_to: process.env.SUPPORT_EMAIL,
        to: body.email,
        subject: body.confirmationSubject || `Ticket #${body.ticket} Received`,
        html: confirmationHtml,
      });

      confirmationSent = true;
    } catch (error) {
      console.error("Failed to send confirmation email to user", error);
      // Still continue – admin already notified
    }
  }

  // Success as long as admin was notified
  if (adminSent) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: "Failed to notify support" }, { status: 500 });
  }
}
