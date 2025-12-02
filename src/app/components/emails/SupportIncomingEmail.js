// app/components/emails/SupportIncomingEmail.js
export default function SupportIncomingEmail({
  ticket,
  name,
  email,
  area,
  subject,
  message,
  timestamp = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }),
}) {
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
        New support ticket #{ticket} from {name} - {subject}
      </div>

      <table role="presentation" style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#0f172a" }}>
        <tr>
          <td align="center" style={{ padding: "40px 20px" }}>
            <table
              role="presentation"
              style={{
                maxWidth: "650px",
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
                <td
                  style={{
                    padding: "32px 40px 24px",
                    textAlign: "center",
                    borderBottom: "1px solid #334155",
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  }}
                >
                  <table role="presentation" style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tr>
                      <td align="center">
                        <div style={{ marginBottom: "12px" }}>
                          <span style={{ fontSize: "32px" }}>🎫</span>
                        </div>
                        <h1 style={{ margin: "0", fontSize: "24px", fontWeight: "700", color: "#ffffff" }}>
                          New Support Request
                        </h1>
                        <p style={{ margin: "8px 0 0", fontSize: "14px", color: "#e0e7ff" }}>
                          Ticket #{ticket} • {timestamp}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              {/* Main Content */}
              <tr>
                <td style={{ padding: "40px" }}>
                  {/* Contact Information Card */}
                  <div style={{ marginBottom: "24px" }}>
                    <table
                      role="presentation"
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        backgroundColor: "#1e293b",
                        borderRadius: "8px",
                        border: "1px solid #334155",
                        overflow: "hidden",
                      }}
                    >
                      <tr>
                        <td style={{ padding: "20px", borderBottom: "2px solid #334155" }}>
                          <h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#e2e8f0" }}>
                            📋 Contact Information
                          </h2>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "20px" }}>
                          <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <tr>
                              <td
                                style={{
                                  padding: "8px 0",
                                  fontSize: "14px",
                                  color: "#94a3b8",
                                  width: "100px",
                                  verticalAlign: "top",
                                }}
                              >
                                <strong>Name:</strong>
                              </td>
                              <td style={{ padding: "8px 0", fontSize: "14px", color: "#e2e8f0" }}>{name}</td>
                            </tr>
                            <tr>
                              <td
                                style={{ padding: "8px 0", fontSize: "14px", color: "#94a3b8", verticalAlign: "top" }}
                              >
                                <strong>Email:</strong>
                              </td>
                              <td style={{ padding: "8px 0", fontSize: "14px" }}>
                                <a
                                  href={`mailto:${email}`}
                                  style={{ color: "#6366f1", textDecoration: "none", fontWeight: "500" }}
                                >
                                  {email}
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ padding: "8px 0", fontSize: "14px", color: "#94a3b8", verticalAlign: "top" }}
                              >
                                <strong>Area:</strong>
                              </td>
                              <td style={{ padding: "8px 0", fontSize: "14px" }}>
                                <span
                                  style={{
                                    backgroundColor: "#334155",
                                    color: "#e2e8f0",
                                    padding: "4px 12px",
                                    borderRadius: "6px",
                                    fontSize: "13px",
                                    fontWeight: "500",
                                    display: "inline-block",
                                  }}
                                >
                                  {area}
                                </span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </div>

                  {/* Subject Card */}
                  <div style={{ marginBottom: "24px" }}>
                    <table
                      role="presentation"
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        backgroundColor: "#1e293b",
                        borderRadius: "8px",
                        border: "1px solid #334155",
                        overflow: "hidden",
                      }}
                    >
                      <tr>
                        <td style={{ padding: "20px", borderBottom: "2px solid #334155" }}>
                          <h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#e2e8f0" }}>
                            💬 Subject
                          </h2>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "20px" }}>
                          <p
                            style={{
                              margin: "0",
                              fontSize: "15px",
                              color: "#cbd5e1",
                              fontWeight: "500",
                              lineHeight: "1.6",
                            }}
                          >
                            {subject}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </div>

                  {/* Message Card */}
                  <div style={{ marginBottom: "32px" }}>
                    <table
                      role="presentation"
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        backgroundColor: "#1e293b",
                        borderRadius: "8px",
                        border: "1px solid #334155",
                        overflow: "hidden",
                      }}
                    >
                      <tr>
                        <td style={{ padding: "20px", borderBottom: "2px solid #334155" }}>
                          <h2 style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#e2e8f0" }}>
                            📝 Message
                          </h2>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "20px" }}>
                          <div
                            style={{
                              fontSize: "14px",
                              lineHeight: "1.7",
                              color: "#cbd5e1",
                              whiteSpace: "pre-wrap",
                              wordWrap: "break-word",
                            }}
                          >
                            {message}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>

                  {/* Quick Action Button */}
                  <table role="presentation" style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tr>
                      <td align="center">
                        <a
                          href={`mailto:${email}?subject=Re: ${encodeURIComponent(subject)} [Ticket #${ticket}]`}
                          style={{
                            display: "inline-block",
                            padding: "16px 32px",
                            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                            color: "#ffffff",
                            textDecoration: "none",
                            borderRadius: "8px",
                            fontWeight: "600",
                            fontSize: "15px",
                            boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)",
                          }}
                        >
                          Reply to {name}
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              {/* Footer */}
              <tr>
                <td style={{ padding: "32px 40px", textAlign: "center", borderTop: "1px solid #334155" }}>
                  <p style={{ margin: "0", fontSize: "12px", color: "#64748b", lineHeight: "1.6" }}>
                    This message was automatically generated from the CSM Dashboard
                    <br />
                    <a href="https://csmdynamics.com" style={{ color: "#6366f1", textDecoration: "none" }}>
                      csmdynamics.com
                    </a>
                  </p>
                </td>
              </tr>
            </table>

            {/* Additional Footer Text */}
            <table
              role="presentation"
              style={{ maxWidth: "650px", width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
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
