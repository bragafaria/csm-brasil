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
        margin: 0,
        padding: 0,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        backgroundColor: "#0f172a",
        color: "#e2e8f0",
      }}
    >
      {/* Email preview text */}
      <div style={{ display: "none", maxHeight: "0px", overflow: "hidden", fontSize: "1px", lineHeight: "1px" }}>
        Congratulations{greeting}! You discovered your CSM archetype: The {archetypeName} ({typeCode}). View your
        personalized report now.
      </div>

      <table role="presentation" style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#0f172a" }}>
        <tr>
          <td align="center" style={{ padding: "40px 20px" }}>
            <table
              role="presentation"
              style={{
                maxWidth: "600px",
                width: "100%",
                borderCollapse: "collapse",
                background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                borderRadius: "16px",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
                border: "1px solid #334155",
              }}
            >
              {/* Header with Logo */}
              <tr>
                <td style={{ padding: "40px 40px 20px", textAlign: "center", borderBottom: "1px solid #334155" }}>
                  <table role="presentation" style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tr>
                      <td align="center">
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "24px", fontWeight: "700", color: "#6366f1" }}>CSM</span>
                          <span style={{ fontSize: "24px", fontWeight: "300", color: "#e2e8f0" }}>Dynamics</span>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              {/* Main Content */}
              <tr>
                <td style={{ padding: "40px" }}>
                  {/* Celebration Icon */}
                  <table
                    role="presentation"
                    style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}
                  >
                    <tr>
                      <td align="center">
                        <div
                          style={{
                            width: "56px",
                            height: "56px",
                            background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                            borderRadius: "50%",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            fontSize: "28px",
                            fontWeight: "bold",
                            boxShadow: "0 4px 12px rgba(139, 92, 246, 0.4)",
                          }}
                        >
                          🎉
                        </div>
                      </td>
                    </tr>
                  </table>

                  <h1
                    style={{
                      margin: "0 0 24px",
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "#e2e8f0",
                      textAlign: "center",
                    }}
                  >
                    Congratulations{greeting}!
                  </h1>

                  <p
                    style={{
                      margin: "0 0 24px",
                      fontSize: "16px",
                      lineHeight: "1.6",
                      color: "#cbd5e1",
                      textAlign: "center",
                    }}
                  >
                    You just discovered your Cognitive Spectrum Model (CSM) archetype:
                  </p>

                  {/* Archetype Result Card */}
                  <table role="presentation" style={{ width: "100%", borderCollapse: "collapse", margin: "24px 0" }}>
                    <tr>
                      <td
                        style={{
                          padding: "32px",
                          textAlign: "center",
                          background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                          borderRadius: "12px",
                          boxShadow: "0 8px 24px rgba(139, 92, 246, 0.3)",
                        }}
                      >
                        <p style={{ margin: "0 0 8px", fontSize: "32px", fontWeight: "700", color: "#ffffff" }}>
                          The {archetypeName}
                        </p>
                        <p style={{ margin: "0", fontSize: "20px", fontWeight: "600", color: "#e0e7ff" }}>{typeCode}</p>
                      </td>
                    </tr>
                  </table>

                  <p
                    style={{
                      margin: "24px 0",
                      fontSize: "16px",
                      lineHeight: "1.6",
                      color: "#cbd5e1",
                      textAlign: "center",
                    }}
                  >
                    Your personalized personality report is ready. Click below to view it anytime from any device.
                  </p>

                  {/* NEW Badge with Couple's Report Button */}
                  <table
                    role="presentation"
                    style={{ width: "100%", borderCollapse: "collapse", margin: "32px 0 16px" }}
                  >
                    <tr>
                      <td align="center" style={{ position: "relative" }}>
                        {/* NEW Badge positioned absolutely */}
                        <div style={{ position: "relative", display: "inline-block" }}>
                          <span
                            style={{
                              position: "absolute",
                              top: "-12px",
                              right: "-12px",
                              backgroundColor: "#dc2626",
                              color: "#ffffff",
                              fontSize: "11px",
                              fontWeight: "700",
                              padding: "4px 10px",
                              borderRadius: "6px",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                              boxShadow: "0 2px 8px rgba(220, 38, 38, 0.4)",
                              zIndex: "10",
                            }}
                          >
                            NEW
                          </span>
                          <a
                            href={couplesReportUrl}
                            style={{
                              display: "inline-block",
                              padding: "16px 40px",
                              background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                              color: "#ffffff",
                              textDecoration: "none",
                              borderRadius: "8px",
                              fontWeight: "600",
                              fontSize: "17px",
                              boxShadow: "0 4px 12px rgba(139, 92, 246, 0.4)",
                            }}
                          >
                            🎯 {`Access Your Couple's Insights Report`}
                          </a>
                        </div>
                      </td>
                    </tr>
                  </table>

                  <p
                    style={{
                      margin: "8px 0 24px",
                      fontSize: "13px",
                      lineHeight: "1.5",
                      color: "#94a3b8",
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                  >
                    Dashboard area to unlock deep compatibility insights for your relationship
                  </p>

                  {/* Free Report Button */}
                  <table role="presentation" style={{ width: "100%", borderCollapse: "collapse", margin: "24px 0" }}>
                    <tr>
                      <td align="center">
                        <a
                          href={shareableUrl}
                          style={{
                            display: "inline-block",
                            padding: "14px 32px",
                            background: "transparent",
                            color: "#8b5cf6",
                            textDecoration: "none",
                            borderRadius: "8px",
                            fontWeight: "600",
                            fontSize: "15px",
                            border: "2px solid #8b5cf6",
                            transition: "all 0.3s ease",
                          }}
                        >
                          View My Free Personality Report
                        </a>
                      </td>
                    </tr>
                  </table>

                  {/* Info Notice */}
                  <table
                    role="presentation"
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      margin: "32px 0 0",
                      backgroundColor: "#1e293b",
                      borderRadius: "8px",
                      border: "1px solid #334155",
                    }}
                  >
                    <tr>
                      <td style={{ padding: "20px" }}>
                        <p
                          style={{
                            margin: "0",
                            fontSize: "13px",
                            lineHeight: "1.6",
                            color: "#94a3b8",
                            textAlign: "center",
                          }}
                        >
                          Your free personality report link is permanent and contains your results. Bookmark it!
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              {/* Footer */}
              <tr>
                <td style={{ padding: "32px 40px", textAlign: "center", borderTop: "1px solid #334155" }}>
                  <p style={{ margin: "0 0 12px", fontSize: "13px", color: "#94a3b8" }}>
                    {`Don't want to receive these emails?`}
                    <a href={unsubscribeUrl} style={{ color: "#6366f1", textDecoration: "underline" }}>
                      Unsubscribe here
                    </a>
                  </p>
                  <p style={{ margin: "0", fontSize: "12px", color: "#64748b" }}>
                    © 2025 CSM Dynamics. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>

            {/* Additional Footer Text */}
            <table
              role="presentation"
              style={{ maxWidth: "600px", width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
            >
              <tr>
                <td style={{ padding: "0 20px", textAlign: "center" }}>
                  <p style={{ margin: "0", fontSize: "12px", lineHeight: "1.6", color: "#64748b" }}>
                    Cognitive Spectrum Model — Helping couples understand and thrive together
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
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

🎯 **NEW** Couple's Insights Report
Unlock deep compatibility insights for your relationship

${couplesReportUrl}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

View your FREE personality report:
${shareableUrl}

Your free report link is permanent and contains your results. Bookmark it!

---

Don't want to receive these emails?
Unsubscribe here: ${unsubscribeUrl}

CSM Dynamics | © 2025 Cognitive Spectrum Model
`.trim();
}
