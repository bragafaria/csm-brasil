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
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
        maxWidth: "650px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Plain text preview */}
      <div style={{ display: "none", maxHeight: "0px", overflow: "hidden" }}>
        New support ticket #{ticket} from {name} - {subject}
      </div>

      {/* Header */}
      <div
        style={{
          backgroundColor: "#0f172a",
          padding: "24px",
          borderBottom: "3px solid #a78bfa",
        }}
      >
        <h1
          style={{
            margin: "0",
            fontSize: "20px",
            fontWeight: "600",
            color: "#ffffff",
          }}
        >
          🎫 New Support Request
        </h1>
        <p
          style={{
            margin: "8px 0 0 0",
            fontSize: "14px",
            color: "#94a3b8",
          }}
        >
          Ticket #{ticket} • {timestamp}
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: "32px 24px", backgroundColor: "#f8fafc" }}>
        {/* Contact Info Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h2
            style={{
              margin: "0 0 16px 0",
              fontSize: "16px",
              fontWeight: "600",
              color: "#1e293b",
              borderBottom: "2px solid #f1f5f9",
              paddingBottom: "8px",
            }}
          >
            Contact Information
          </h2>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  fontSize: "14px",
                  color: "#64748b",
                  width: "100px",
                  verticalAlign: "top",
                }}
              >
                <strong>Name:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  fontSize: "14px",
                  color: "#1e293b",
                }}
              >
                {name}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  fontSize: "14px",
                  color: "#64748b",
                  verticalAlign: "top",
                }}
              >
                <strong>Email:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  fontSize: "14px",
                  color: "#1e293b",
                }}
              >
                <a
                  href={`mailto:${email}`}
                  style={{
                    color: "#a78bfa",
                    textDecoration: "none",
                  }}
                >
                  {email}
                </a>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  fontSize: "14px",
                  color: "#64748b",
                  verticalAlign: "top",
                }}
              >
                <strong>Area:</strong>
              </td>
              <td
                style={{
                  padding: "8px 0",
                  fontSize: "14px",
                  color: "#1e293b",
                }}
              >
                <span
                  style={{
                    backgroundColor: "#f1f5f9",
                    padding: "4px 12px",
                    borderRadius: "4px",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#475569",
                  }}
                >
                  {area}
                </span>
              </td>
            </tr>
          </table>
        </div>

        {/* Subject Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h2
            style={{
              margin: "0 0 12px 0",
              fontSize: "16px",
              fontWeight: "600",
              color: "#1e293b",
              borderBottom: "2px solid #f1f5f9",
              paddingBottom: "8px",
            }}
          >
            Subject
          </h2>
          <p
            style={{
              margin: "0",
              fontSize: "15px",
              color: "#334155",
              fontWeight: "500",
            }}
          >
            {subject}
          </p>
        </div>

        {/* Message Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h2
            style={{
              margin: "0 0 16px 0",
              fontSize: "16px",
              fontWeight: "600",
              color: "#1e293b",
              borderBottom: "2px solid #f1f5f9",
              paddingBottom: "8px",
            }}
          >
            Message
          </h2>
          <div
            style={{
              fontSize: "14px",
              lineHeight: "1.7",
              color: "#334155",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
          >
            {message}
          </div>
        </div>

        {/* Quick Action Button */}
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <a
            href={`mailto:${email}?subject=Re: ${encodeURIComponent(subject)} [Ticket #${ticket}]`}
            style={{
              display: "inline-block",
              backgroundColor: "#a78bfa",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Reply to {name}
          </a>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "20px 24px",
          backgroundColor: "#f1f5f9",
          borderTop: "1px solid #e2e8f0",
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: "0",
            fontSize: "12px",
            color: "#64748b",
          }}
        >
          This message was automatically generated from the CSM Dashboard
          <br />
          <a href="https://csmdynamics.com" style={{ color: "#a78bfa", textDecoration: "none" }}>
            csmdynamics.com
          </a>
        </p>
      </div>
    </div>
  );
}
