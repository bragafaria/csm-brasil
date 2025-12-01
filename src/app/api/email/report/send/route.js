// @/app/api/email/send/route.js

import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { to, subject, html, text, headers } = await req.json();

    // Build email options
    const emailOptions = {
      from: "CSM Dynamics <csm@csmdynamics.com>",
      to,
      subject,
      html,
    };

    // Add plain text version if provided (CRITICAL for Gmail deliverability)
    if (text) {
      emailOptions.text = text;
    }

    // Add custom headers if provided (List-Unsubscribe for Gmail compliance)
    if (headers) {
      emailOptions.headers = headers;
    }

    const data = await resend.emails.send(emailOptions);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
