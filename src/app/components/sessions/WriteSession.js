// app/components/sessions/WriteSession.js
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import Editor from "@/app/components/tiptap/Editor";
import SalesSession from "@/app/components/sessions/SalesSession";
import { motion } from "framer-motion";
import Spinner from "@/app/components/ui/Spinner";

export default function WriteSession({ isPartnerA, onTabChange }) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userStatus, setUserStatus] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [error, setError] = useState(null);
  const [showSalesPage, setShowSalesPage] = useState(true);
  const [useFreeSession, setUseFreeSession] = useState(false);
  const [justPaid, setJustPaid] = useState(false);

  useEffect(() => {
    async function fetchUserStatus() {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError || !session) throw new Error("Please log in again");

        const response = await fetch("/api/get-blueprint-status", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
            "Refresh-Token": session.refresh_token,
          },
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "No response body" }));
          throw new Error(errorData.error || `Failed to fetch status (Status: ${response.status})`);
        }

        const status = await response.json();
        setUserStatus(status);

        setShowSalesPage(
          !status.isActiveSubscriber &&
            (status.hasActiveSession || (!status.hasAvailablePerSession && !status.hasFreeSessionAvailable)) &&
            !justPaid
        );
      } catch (err) {
        console.error("Client-side error:", err.message);
        setError(err.message);
      } finally {
        setLoadingStatus(false);
      }
    }

    fetchUserStatus();
  }, [justPaid]); // Re-fetch when justPaid changes

  const handleStartFree = () => {
    setUseFreeSession(true);
    setShowSalesPage(false);
  };

  const handlePaymentSuccess = async () => {
    setJustPaid(true);
    setShowSalesPage(false);
    // Re-fetch status after payment
    await fetchUserStatus();
  };

  const fetchUserStatus = async () => {
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError || !session) throw new Error("Please log in again");

      const response = await fetch("/api/get-blueprint-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
          "Refresh-Token": session.refresh_token,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "No response body" }));
        throw new Error(errorData.error || `Failed to fetch status (Status: ${response.status})`);
      }

      const status = await response.json();
      setUserStatus(status);
    } catch (err) {
      console.error("Error refreshing status:", err.message);
    }
  };

  async function handleSubmit() {
    if (!content.trim() || userStatus.hasActiveSession) return;

    setIsSubmitting(true);
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError || !session) throw new Error("No session for submission");

      const paymentType = userStatus.isActiveSubscriber
        ? "subscription"
        : useFreeSession || userStatus.hasFreeSessionAvailable
        ? "free"
        : "per_session";

      const response = await fetch("/api/create-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
          "Refresh-Token": session.refresh_token,
        },
        credentials: "include",
        body: JSON.stringify({ question: content, paymentType, paymentId: null }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Submission failed");
      }

      setUserStatus((prev) => ({
        ...prev,
        hasActiveSession: true,
        hasFreeSessionAvailable: paymentType === "free" ? false : prev.hasFreeSessionAvailable,
        hasAvailablePerSession: paymentType === "per_session" ? false : prev.hasAvailablePerSession,
      }));

      setContent("");
      setUseFreeSession(false);
      setShowSalesPage(true);
      alert("Session submitted! Report in 24 hours.");
      onTabChange("view");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loadingStatus) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-3">
          <Spinner>Loading session status...</Spinner>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-[var(--surface-variant)] rounded-lg border border-red-400/20 shadow-custom">
        <p className="text-red-400 text-sm font-medium">Error: {error}</p>
        <button onClick={() => window.location.reload()} className="mt-3 text-xs text-[var(--accent)] hover:underline">
          Refresh
        </button>
      </div>
    );
  }

  if (showSalesPage) {
    return (
      <SalesSession
        hasFreeAvailable={userStatus?.hasFreeSessionAvailable}
        onStartFree={handleStartFree}
        onStatusUpdate={handlePaymentSuccess}
        hasActiveSession={userStatus?.hasActiveSession}
        isActiveSubscriber={userStatus?.isActiveSubscriber}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card-gradient p-6 md:p-8 rounded-lg shadow-custom-lg border border-[var(--border)]"
    >
      <div className="max-w-4xl mx-auto space-y-6 mt-10">
        {/* Header */}
        <div className="flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3 text-center">
            Submit Your Session Entry
          </h1>
          <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed text-center mb-2 md:mb-4">
            Describe your challenge, question, or general doubt in as much detail as possible: from practical concerns
            to broader life uncertainties. You may also include any thoughts, feelings, or patterns that seem to shape
            your experience.
          </p>
          <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed text-center">
            <strong>Note:</strong> This chat is completely private. Only you have access to your questions and
            responses. Your partner cannot view or edit anything you share here, though you’re welcome to share your
            reflections later if you wish.
          </p>
        </div>

        {/* Editor */}
        <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] shadow-sm overflow-hidden">
          <Editor content={content} onChange={setContent} />
        </div>

        {/* Live Preview */}
        {content && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="border-t border-[var(--border)] pt-6"
          >
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Live Preview:</h2>
            <div className="p-5 bg-[var(--surface)] rounded-lg border border-[var(--border)] shadow-inner">
              <div className="prose dark:prose-invert max-w-none text-[var(--text-primary)]">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={isSubmitting || !content.trim() || userStatus.hasActiveSession}
            className={`px-8 py-3 rounded-lg font-semibold transition-all shadow-md ${
              isSubmitting || !content.trim() || userStatus.hasActiveSession
                ? "bg-[var(--surface-variant)] text-[var(--text-secondary)] cursor-not-allowed opacity-70"
                : "btn-primary hover:shadow-lg"
            }`}
          >
            {isSubmitting
              ? "Submitting..."
              : userStatus.hasActiveSession
              ? "Awaiting Response..."
              : `Submit Session (${content.length} chars)`}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
