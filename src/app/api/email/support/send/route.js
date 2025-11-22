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
    // Incoming support request → to you
    if (!body.type || body.type !== "confirmation") {
      const html = await render(
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
        from: "CSM Support <onboarding@resend.dev>",
        to: "bragafaria@gmail.com",
        subject: body.subject,
        html,
      });
    }

    // Confirmation → to user
    if (body.type === "confirmation" || !body.type) {
      const html = await render(<SupportConfirmationEmail name={body.name} ticket={body.ticket} />);

      await resend.emails.send({
        from: "CSM Support <onboarding@resend.dev>",
        to: body.to || body.email,
        subject: body.subject || `Ticket #${body.ticket} Received`,
        html,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Support email error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
