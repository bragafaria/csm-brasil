// app/components/emails/SupportIncomingEmail.js
export default function SupportIncomingEmail({ ticket, name, email, area, subject, message }) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", background: "#f9fafb" }}>
      <h2>New Support Request – Ticket #{ticket}</h2>
      <p>
        <strong>From:</strong> {name} ({email})
      </p>
      <p>
        <strong>Area:</strong> {area}
      </p>
      <p>
        <strong>Subject:</strong> {subject}
      </p>
      <hr />
      <p style={{ whiteSpace: "pre-wrap" }}>{message}</p>
      <br />
      <p>
        <em>This message was sent from the CSM Dashboard.</em>
      </p>
    </div>
  );
}
