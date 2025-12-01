// app/components/emails/SupportConfirmationEmail.js
export default function SupportConfirmationEmail({
  name,
  ticket,
  unsubscribeUrl = "https://csmdynamics.com/unsubscribe",
}) {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
        padding: "40px 20px",
        backgroundColor: "#0f172a",
        color: "#e2e8f0",
      }}
    >
      {/* Plain text preview */}
      <div style={{ display: "none", maxHeight: "0px", overflow: "hidden" }}>
        Thank you {name}! Your support request (Ticket #{ticket}) has been received. {"We'll respond within 24 hours."}
      </div>

      <h1
        style={{
          color: "#a78bfa",
          fontSize: "24px",
          fontWeight: "600",
          marginTop: "0",
          marginBottom: "24px",
        }}
      >
        Thank You, {name}! ✓
      </h1>

      <p
        style={{
          fontSize: "16px",
          lineHeight: "1.6",
          margin: "16px 0",
          color: "#e2e8f0",
        }}
      >
        We have received your support request.
      </p>

      <div
        style={{
          backgroundColor: "#1e293b",
          padding: "16px",
          borderRadius: "8px",
          borderLeft: "4px solid #a78bfa",
          margin: "24px 0",
        }}
      >
        <p
          style={{
            margin: "0",
            fontSize: "14px",
            color: "#94a3b8",
          }}
        >
          Your Ticket Number
        </p>
        <p
          style={{
            margin: "8px 0 0 0",
            fontSize: "20px",
            fontWeight: "600",
            color: "#ffffff",
          }}
        >
          #{ticket}
        </p>
      </div>

      <p
        style={{
          fontSize: "16px",
          lineHeight: "1.6",
          margin: "16px 0",
          color: "#e2e8f0",
        }}
      >
        Our team will review your message and get back to you within 24 hours.
      </p>

      <p
        style={{
          fontSize: "16px",
          lineHeight: "1.6",
          margin: "16px 0",
          color: "#e2e8f0",
        }}
      >
        Thank you for using the Cognitive Spectrum Model.
      </p>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #334155",
          margin: "32px 0",
        }}
      />

      {/* Unsubscribe section */}
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <p
          style={{
            fontSize: "12px",
            color: "#64748b",
            margin: "8px 0",
          }}
        >
          {"Don't want to receive these emails?"}
          <a href={unsubscribeUrl} style={{ color: "#a78bfa", textDecoration: "underline" }}>
            Unsubscribe here
          </a>
        </p>
      </div>

      <p
        style={{
          fontSize: "12px",
          color: "#64748b",
          textAlign: "center",
          margin: "16px 0 0 0",
        }}
      >
        © 2025 Cognitive Spectrum Model. All rights reserved.
      </p>
    </div>
  );
}
