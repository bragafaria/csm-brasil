// app/components/sessions/SalesSession.js
"use client";

import { useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function SalesSession({
  hasFreeAvailable,
  onStartFree,
  onStatusUpdate,
  hasActiveSession,
  isActiveSubscriber,
}) {
  const [showBlockModal, setShowBlockModal] = useState(false);

  const attemptPayment = async (handler) => {
    if (hasActiveSession) {
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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card-gradient p-6 md:p-8 rounded-lg shadow-custom-lg border border-[var(--border)]"
      >
        {/* Headline */}
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
          Transform Clarity into Confident Action
        </h2>

        {/* Subtitle */}
        <p className="text-[var(--text-secondary)] text-sm md:text-base mb-6 max-w-3xl">
          Guided self-reflection sessions aligned with your <strong>CSM archetype</strong>.
        </p>

        {/* What You Get */}
        <div className="max-w-3xl space-y-4">
          <p className="text-[var(--text-secondary)] text-sm md:text-base font-medium">What you get:</p>

          <ul className="space-y-3 text-[var(--text-primary)] list-none">
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
              <span className="text-sm md:text-base">
                In-depth <strong>personalized insights report</strong> based on your cognitive profile and session
                entry.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
              <span className="text-sm md:text-base">
                <strong>Actionable steps</strong> for growth in relationships and life.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
              <span className="text-sm md:text-base">
                Support from a <strong>CSM-Certified Expert</strong> for depth and efficiency.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
              <span className="text-sm md:text-base">
                <strong>Private, positive, and collaborative</strong> sessions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
              <span className="text-sm md:text-base">
                Fast turnaround within <strong>1–2 business days</strong>.
              </span>
            </li>
          </ul>
        </div>

        {/* Active Session Warning */}
        {hasActiveSession && !isActiveSubscriber && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
          >
            <p className="text-red-500 text-sm md:text-base font-medium">
              Your session is being processed. View it in <strong>View Sessions</strong>.
            </p>
          </motion.div>
        )}

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          {hasFreeAvailable ? (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onStartFree}
              className="w-full px-8 py-4 rounded-lg font-bold text-lg btn-primary shadow-md hover:shadow-lg transition-all"
            >
              Start Your Free Session
            </motion.button>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleBuySession}
                className="flex-1 px-6 py-4 rounded-lg font-bold text-base md:text-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shadow-md hover:shadow-lg transition-all text-center"
              >
                Buy Session Credit ($19)
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubscribe}
                className="flex-1 px-6 py-4 rounded-lg font-bold text-base md:text-lg btn-primary shadow-md hover:shadow-lg transition-all text-center"
              >
                Unlimited Sessions for $49/month
              </motion.button>
            </>
          )}
        </div>
      </motion.div>

      {/* Block Modal */}
      {showBlockModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowBlockModal(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--surface)] p-6 md:p-8 rounded-lg max-w-md w-full shadow-custom-lg card-gradient"
          >
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">Cannot Purchase Yet</h3>
            <p className="text-[var(--text-secondary)] text-sm md:text-base mb-6">
              You already have an <strong>active session</strong> awaiting a response. Please wait until it is answered
              before buying a new credit or subscribing.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowBlockModal(false)}
              className="w-full px-6 py-3 rounded-lg font-bold btn-primary shadow-md hover:shadow-lg transition-all"
            >
              Got it
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
