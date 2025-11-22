// app/components/emails/PersonalityReportEmail.js
import React from "react";

export default function PersonalityReportEmail({ name = "there", archetypeName, typeCode, shareableUrl }) {
  const greeting = name !== "there" ? `, ${name}` : "";

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "32px 20px",
        fontFamily: "'Inter', system-ui, sans-serif",
        backgroundColor: "#0f172a",
        color: "#e2e8f0",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#ffffff",
          textAlign: "center",
          marginBottom: "24px",
        }}
      >
        Congratulations{greeting}! 🎉
      </h1>

      <p style={{ fontSize: "16px", lineHeight: "1.6", margin: "16px 0" }}>
        You just discovered your Cognitive Spectrum Model (CSM) archetype:
      </p>

      <div style={{ textAlign: "center", margin: "32px 0" }}>
        <div
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#a78bfa",
            letterSpacing: "1px",
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

      <p style={{ fontSize: "16px", lineHeight: "1.6", margin: "16px 0" }}>
        Your personalized personality report is ready. Click below to view it anytime — from any device.
      </p>

      <div style={{ textAlign: "center", margin: "40px 0" }}>
        <a
          href={shareableUrl}
          style={{
            backgroundColor: "#a78bfa",
            color: "#ffffff",
            padding: "14px 28px",
            borderRadius: "8px",
            fontWeight: "bold",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          View My Full Report
        </a>
      </div>

      <hr style={{ border: "1px solid #334155", margin: "32px 0" }} />

      <p style={{ fontSize: "14px", color: "#94a3b8" }}>
        This link is permanent and contains your complete results. Bookmark it or share it with your partner.
      </p>

      <p style={{ fontSize: "12px", color: "#64748b", marginTop: "32px" }}>
        © 2025 Cognitive Spectrum Model. All rights reserved.
      </p>
    </div>
  );
}
