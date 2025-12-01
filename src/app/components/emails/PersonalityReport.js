// app/components/emails/PersonalityReportEmail.js
import React from "react";

export default function PersonalityReportEmail({
  name = "there",
  archetypeName,
  typeCode,
  shareableUrl,
  unsubscribeUrl = "https://csmdynamics.com/unsubscribe",
}) {
  const greeting = name !== "there" ? `, ${name}` : "";
  const couplesReportUrl = `https://csmdynamics.com/report/${typeCode}/couples`;

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "0",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#ffffff",
        color: "#1f2937",
      }}
    >
      {/* Email preview text - shows in inbox preview */}
      <div
        style={{
          display: "none",
          maxHeight: "0px",
          overflow: "hidden",
          fontSize: "1px",
          lineHeight: "1px",
        }}
      >
        Congratulations{greeting}! You discovered your CSM archetype: The {archetypeName} ({typeCode}). View your
        personalized report now.
      </div>

      {/* Header with accent color */}
      <div
        style={{
          backgroundColor: "#8b5cf6",
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#ffffff",
            margin: "0",
          }}
        >
          Congratulations{greeting}!
        </h1>
      </div>

      {/* Main content area */}
      <div style={{ padding: "32px 24px", backgroundColor: "#ffffff" }}>
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            margin: "0 0 24px 0",
            color: "#374151",
          }}
        >
          You just discovered your Cognitive Spectrum Model (CSM) archetype:
        </p>
        {/* Result card */}
        <div
          style={{
            textAlign: "center",
            margin: "32px 0",
            padding: "24px",
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
            border: "2px solid #e5e7eb",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#8b5cf6",
              marginBottom: "8px",
            }}
          >
            The {archetypeName}
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#6b7280",
              fontWeight: "600",
            }}
          >
            {typeCode}
          </div>
        </div>
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            margin: "24px 0",
            color: "#374151",
          }}
        >
          Your personalized personality report is ready. Click below to view it anytime from any device.
        </p>
        {/* CTA Buttons Section */}
        <div style={{ margin: "32px 0" }}>
          {/* Couple's Insight Report Button - Primary/Featured */}
          <div style={{ textAlign: "center", marginBottom: "16px", position: "relative" }}>
            <div style={{ display: "inline-block", position: "relative" }}>
              {/* NEW Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  backgroundColor: "#dc2626",
                  color: "#ffffff",
                  fontSize: "11px",
                  fontWeight: "bold",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                NEW
              </div>

              <a
                href={couplesReportUrl}
                style={{
                  backgroundColor: "#8b5cf6",
                  color: "#ffffff",
                  padding: "18px 40px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  textDecoration: "none",
                  display: "inline-block",
                  fontSize: "17px",
                  boxShadow: "0 4px 6px rgba(139, 92, 246, 0.3)",
                }}
              >
                🎯 {`Access Your Couple's Insight Report`}
              </a>
            </div>
            <p
              style={{
                fontSize: "13px",
                color: "#6b7280",
                margin: "8px 0 0 0",
                fontStyle: "italic",
              }}
            >
              Dashboard area to unlock deep compatibility insights for your relationship
            </p>
          </div>

          {/* Free Report Button - Secondary */}
          <div style={{ textAlign: "center" }}>
            <a
              href={shareableUrl}
              style={{
                backgroundColor: "#ffffff",
                color: "#8b5cf6",
                padding: "14px 32px",
                borderRadius: "6px",
                fontWeight: "600",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "15px",
                border: "2px solid #8b5cf6",
              }}
            >
              View My Free Personality Report
            </a>
          </div>
        </div>
        <hr
          style={{
            border: "none",
            borderTop: "1px solid #e5e7eb",
            margin: "32px 0",
          }}
        />
        <p
          style={{
            fontSize: "14px",
            color: "#6b7280",
            lineHeight: "1.5",
            margin: "16px 0",
            textAlign: "center",
          }}
        >
          Your free personality report link is permanent and contains your complete results. Bookmark it or share it
          with others.
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "24px",
          backgroundColor: "#f9fafb",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        {/* Unsubscribe */}
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <p
            style={{
              fontSize: "13px",
              color: "#6b7280",
              margin: "0",
            }}
          >
            {" Don't want to receive these emails? "}
            <a href={unsubscribeUrl} style={{ color: "#8b5cf6", textDecoration: "underline" }}>
              Unsubscribe here
            </a>
          </p>
        </div>

        {/* Copyright */}
        <p
          style={{
            fontSize: "12px",
            color: "#9ca3af",
            textAlign: "center",
            margin: "0",
          }}
        >
          CSM Dynamics | © 2025 Cognitive Spectrum Model
        </p>
      </div>
    </div>
  );
}

// Export plain text version for Resend (CRITICAL for Gmail deliverability)
export function getPlainTextVersion({ name = "there", archetypeName, typeCode, shareableUrl, unsubscribeUrl }) {
  const greeting = name !== "there" ? `, ${name}` : "";
  const couplesReportUrl = `https://csmdynamics.com/report/${typeCode}/couples`;

  return `
Congratulations${greeting}!

You just discovered your Cognitive Spectrum Model (CSM) archetype:

THE ${archetypeName.toUpperCase()}
${typeCode}

Your personalized personality report is ready.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 **NEW** COUPLE'S INSIGHT REPORT
Unlock deep compatibility insights for your relationship

${couplesReportUrl}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

View your FREE personality report:
${shareableUrl}

Your free report link is permanent and contains your complete results. Bookmark it or share it with others.

---

Don't want to receive these emails?
Unsubscribe here: ${unsubscribeUrl}

CSM Dynamics | © 2025 Cognitive Spectrum Model
`.trim();
}
