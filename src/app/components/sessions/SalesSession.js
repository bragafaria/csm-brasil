// app/components/sessions/SalesSession.js
"use client";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";

export default function SalesSession({
  hasFreeAvailable,
  onStartFree,
  onStatusUpdate,
  hasActiveSession,
  isActiveSubscriber,
}) {
  const router = useRouter();

  async function handleSubscribe() {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("Not logged in");

      const response = await fetch("/api/mock-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
          "Refresh-Token": session.refresh_token,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to mock subscription");
      }
      alert("Mock subscription created! Loading editor...");
      onStatusUpdate();
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  async function handleBuySession() {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("Not logged in");

      const response = await fetch("/api/mock-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
          "Refresh-Token": session.refresh_token,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to mock payment");
      }
      alert("Mock payment created! Loading editor...");
      onStatusUpdate();
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  return (
    <div className="space-y-6 w-full bg-[var(--surface-variant)] p-4 md:p-6 rounded-lg border border-[var(--border)] shadow-custom">
      <h2 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)]">Unlock Blueprint Dialogue</h2>
      <p className="text-[var(--text-secondary)] text-sm md:text-base">
        Guided self-reflection sessions tailored to your CSM archetype. Benefits:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-[var(--text-primary)]">
        <li>Personalized insights based on your cognitive blueprint</li>
        <li>Actionable steps for growth in relationships and life</li>
        <li>Hybrid AI-human support for depth and efficiency</li>
        <li>Private, positive, and collaborative dialogues</li>
        <li>24-hour turnaround (Mon-Fri)</li>
      </ul>

      {hasActiveSession && !isActiveSubscriber ? (
        <p className="text-[var(--accent)] text-base">
          Your session is being processed. View it in View Sessions. To submit another, buy credit or subscribe.
        </p>
      ) : null}

      {hasFreeAvailable ? (
        <button
          onClick={onStartFree}
          className="w-full md:w-auto px-8 py-3 rounded-lg font-medium shadow-custom bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white transition-all duration-200"
        >
          Start Your Free Session
        </button>
      ) : (
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <button
            onClick={handleBuySession}
            className="w-full md:w-auto px-8 py-3 rounded-lg font-medium shadow-custom bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white transition-all duration-200"
          >
            Buy Session Credit ($19)
          </button>
          <button
            onClick={handleSubscribe}
            className="w-full md:w-auto px-8 py-3 rounded-lg font-medium shadow-custom bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white transition-all duration-200"
          >
            Subscribe ($99/month - Unlimited)
          </button>
        </div>
      )}
    </div>
  );
}
