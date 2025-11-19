// app/api/email/webhook/resend/route.js

import { NextResponse } from "next/server";
import crypto from "crypto";

const RESEND_WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET;

export async function POST(request) {
  // 1. Get the raw signature header (Resend uses Svix format)
  const signature = request.headers.get("svix-signature");
  if (!signature) {
    console.warn("Missing svix-signature header");
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // 2. Get raw body (important: before any parsing!)
  const payloadRaw = await request.text();

  // 3. Compute expected signature
  const hmac = crypto.createHmac("sha256", RESEND_WEBHOOK_SECRET);
  hmac.update(payloadRaw);
  const expectedSignature = hmac.digest("hex");

  // 4. Svix sends multiple signatures (v1,v2,etc.) – check if any match
  const signatures = signature.split(" ").map((s) => s.replace("v1,", ""));
  const isValid = signatures.some((sig) => sig === expectedSignature);

  if (!isValid) {
    console.warn("Invalid webhook signature");
    return new NextResponse("Invalid signature", { status: 401 });
  }

  // 5. Signature valid → safe to parse
  const payload = JSON.parse(payloadRaw);

  console.log("Verified Resend webhook:", {
    event: payload.type,
    email: payload.data?.to?.[0] || payload.data?.email,
    email_id: payload.data?.email_id,
    timestamp: payload.created_at,
  });

  // Your future logic here (save bounces, track opens, etc.)

  return NextResponse.json({ received: true });
}
