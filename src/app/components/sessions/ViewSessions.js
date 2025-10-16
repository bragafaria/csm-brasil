// app/components/sessions/ViewSessions.js
export default function ViewSessions() {
  return (
    <div className="space-y-6 w-full bg-[var(--surface-variant)] p-4 md:p-6 rounded-lg border border-[var(--border)] shadow-custom">
      <h2 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)]">Your Sessions</h2>
      <p className="text-[var(--text-secondary)] text-sm md:text-base">
        View your past coaching sessions here. (Coming soon)
      </p>
      {/* Placeholder for session list - to be implemented with DB fetch */}
    </div>
  );
}
