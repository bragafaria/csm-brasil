// app/components/sessions/SalesSession.js
"use client";

import { useState } from "react";
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
  const [showBlockModal, setShowBlockModal] = useState(false);

  // -------------------------------------------------
  // Helper – block any payment attempt if a session is active
  // -------------------------------------------------
  // In SalesSession.js
  const attemptPayment = async (handler) => {
    if (hasActiveSession) {
      // ← uses correct status
      setShowBlockModal(true);
      return;
    }
    await handler();
  };

  async function handleSubscribe() {
    await attemptPayment(async () => {
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
    });
  }

  async function handleBuySession() {
    await attemptPayment(async () => {
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
    });
  }

  return (
    <>
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

        {hasActiveSession && !isActiveSubscriber && (
          <p className="text-[var(--accent)] text-base">
            Your session is being processed. View it in View Sessions. To submit another, buy credit or subscribe.
          </p>
        )}

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
              className="w-full md:w-auto px-8 py-3 rounded-lg font-medium shadow-custom bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white transition-all duration-200 cursor-pointer"
            >
              Buy Session Credit ($19)
            </button>
            <button
              onClick={handleSubscribe}
              className="w-full md:w-auto px-8 py-3 rounded-lg font-medium shadow-custom bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white transition-all duration-200 cursor-pointer"
            >
              Subscribe ($49/month - Unlimited)
            </button>
          </div>
        )}
      </div>

      {/* -------------------------------------------------
          BLOCK MODAL
         ------------------------------------------------- */}
      {showBlockModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--surface)] p-6 rounded-lg max-w-md w-full shadow-xl">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Cannot Purchase Yet</h3>
            <p className="text-[var(--text-secondary)] mb-4">
              You already have an active session awaiting a response. Please wait until it is answered before buying a
              new credit or subscribing.
            </p>
            <button
              onClick={() => setShowBlockModal(false)}
              className="w-full px-4 py-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-md"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
