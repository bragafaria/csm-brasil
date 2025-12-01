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

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "32px 20px",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        backgroundColor: "#0f172a",
        color: "#e2e8f0",
      }}
    >
      <div style={{ display: "none", maxHeight: "0px", overflow: "hidden" }}>
        Congratulations{greeting}! You discovered your CSM archetype: The {archetypeName} ({typeCode}). View your
        personalized report at {shareableUrl}
      </div>

      <h1
        style={{
          fontSize: "24px",
          fontWeight: "600",
          color: "#ffffff",
          textAlign: "center",
          marginBottom: "24px",
          marginTop: "0",
        }}
      >
        Congratulations{greeting}! 🎉
      </h1>

      <p style={{ fontSize: "16px", lineHeight: "1.6", margin: "16px 0", color: "#e2e8f0" }}>
        You just discovered your Cognitive Spectrum Model (CSM) archetype:
      </p>

      <div style={{ textAlign: "center", margin: "32px 0" }}>
        <div
          style={{
            fontSize: "28px",
            fontWeight: "600",
            color: "#a78bfa",
            letterSpacing: "0.5px",
          }}
        >
          The {archetypeName}
        </div>
        <div
          style={{
            fontSize: "18px",
            color: "#e879f9",
            marginTop: "8px",
          }}
        >
          {typeCode}
        </div>
      </div>

      <p style={{ fontSize: "16px", lineHeight: "1.6", margin: "16px 0", color: "#e2e8f0" }}>
        Your personalized personality report is ready. Click below to view it anytime from any device.
      </p>

      <div style={{ textAlign: "center", margin: "40px 0" }}>
        <a
          href={shareableUrl}
          style={{
            backgroundColor: "#a78bfa",
            color: "#ffffff",
            padding: "14px 28px",
            borderRadius: "8px",
            fontWeight: "600",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
          }}
        >
          View My Full Report
        </a>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #334155", margin: "32px 0" }} />

      <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: "1.5", margin: "16px 0" }}>
        This link is permanent and contains your complete results. Bookmark it or share it with others.
      </p>

      {/* Unsubscribe section - critical for deliverability */}
      <div
        style={{
          marginTop: "32px",
          paddingTop: "24px",
          borderTop: "1px solid #334155",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "13px", color: "#64748b", margin: "8px 0" }}>
          {" Don't want to receive these emails? "}
          <a href={unsubscribeUrl} style={{ color: "#a78bfa", textDecoration: "underline" }}>
            Unsubscribe here
          </a>
        </p>
      </div>

      <p
        style={{
          fontSize: "12px",
          color: "#64748b",
          marginTop: "24px",
          textAlign: "center",
          margin: "24px 0 0 0",
        }}
      >
        CSM Dynamics
        <br />© 2025 Cognitive Spectrum Model. All rights reserved.
      </p>
    </div>
  );
}
