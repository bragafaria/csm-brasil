// src/app/dashboard/[userId]/page.js
"use client";

export default function DashboardPage() {
  return (
    <div className="p-6 mt-20">
      <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Welcome to Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[var(--surface)] p-6 rounded-xl shadow-custom">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Quick Stats</h2>
          <p className="text-[var(--text-secondary)]">View your latest insights here.</p>
        </div>
        <div className="bg-[var(--surface)] p-6 rounded-xl shadow-custom">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Recent Activity</h2>
          <p className="text-[var(--text-secondary)]">Check your recent sessions.</p>
        </div>
        <div className="bg-[var(--surface)] p-6 rounded-xl shadow-custom">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Notifications</h2>
          <p className="text-[var(--text-secondary)]">Stay updated with alerts.</p>
        </div>
      </div>
    </div>
  );
}
