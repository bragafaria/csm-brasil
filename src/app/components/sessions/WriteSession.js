// src/app/components/sessions/WriteSession.js
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import Editor from "@/app/components/tiptap/Editor";
import SalesSession from "@/app/components/sessions/SalesSession";

export default function WriteSession() {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userStatus, setUserStatus] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [error, setError] = useState(null);
  const [showSalesPage, setShowSalesPage] = useState(true);
  const [useFreeSession, setUseFreeSession] = useState(false);
  const [justPaid, setJustPaid] = useState(false);

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
  };

  useEffect(() => {
    fetchUserStatus();
  }, []);

  const handleStartFree = () => {
    setUseFreeSession(true);
    setShowSalesPage(false);
  };

  const handlePaymentSuccess = () => {
    setJustPaid(true);
    fetchUserStatus();
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
      const paymentId = null;

      const response = await fetch("/api/create-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
          "Refresh-Token": session.refresh_token,
        },
        credentials: "include",
        body: JSON.stringify({ question: content, paymentType, paymentId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Submission failed");
      }

      // Optimistic update
      setUserStatus((prev) => ({
        ...prev,
        hasActiveSession: true,
        hasFreeSessionAvailable: paymentType === "free" ? false : prev.hasFreeSessionAvailable,
        hasAvailablePerSession: paymentType === "per_session" ? false : prev.hasAvailablePerSession,
      }));
      setJustPaid(false);
      alert("Session submitted! Report in 24 hours.");
      setContent("");
      setUseFreeSession(false);
      setShowSalesPage(true); // Show SalesSession after submission
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loadingStatus) return <div>Loading status...</div>;
  if (error) return <div>Error: {error}</div>;

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
    <div className="space-y-6 w-full bg-[var(--surface-variant)] p-4 md:p-6 rounded-lg border border-[var(--border)] shadow-custom">
      <div className="max-w-4xl mx-auto space-y-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)]">
            Submit Your Reflection Question
          </h1>
          <p className="text-[var(--text-secondary)] text-sm md:text-base mt-2">
            Describe your challenge in detail, including how it relates to your CSM type.
            <span className="text-[var(--accent)]"> (1 active session at a time)</span>
          </p>
        </div>

        <Editor content={content} onChange={setContent} />

        {content && (
          <div className="border-t pt-4 border-[var(--border)]">
            <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Live Preview:</h2>
            <div
              className="prose dark:prose-invert max-w-none p-4 bg-[var(--surface)] rounded-lg border border-[var(--border)]"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !content.trim() || userStatus.hasActiveSession}
          className={`w-full md:w-auto px-8 py-3 rounded-lg font-medium shadow-custom transition-all duration-200 hover:cursor-pointer ${
            isSubmitting || !content.trim() || userStatus.hasActiveSession
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white"
          }`}
        >
          {isSubmitting
            ? "Submitting..."
            : userStatus.hasActiveSession
            ? "Awaiting Response..."
            : `Submit Session (${content.length} chars)`}
        </button>
      </div>
    </div>
  );
}
