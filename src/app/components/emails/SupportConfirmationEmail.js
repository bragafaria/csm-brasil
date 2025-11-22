// app/components/emails/SupportConfirmationEmail.js
export default function SupportConfirmationEmail({ name, ticket }) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "40px", background: "#0f172a", color: "#e2e8f0" }}>
      <h1 style={{ color: "#a78bfa" }}>Thank You, {name}!</h1>
      <p>We have received your support request.</p>
      <p>
        <strong>Ticket #{ticket}</strong>
      </p>
      <p>Our team will review your message and get back to you within 24 hours.</p>
      <p>Thank you for using Cognitive Spectrum Model.</p>
    </div>
  );
}
