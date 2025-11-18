// app/components/sessions/WriteSession.js
"use client";

import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { supabase } from "@/app/utils/supabaseClient";
import Editor from "@/app/components/tiptap/Editor";
import SalesSession from "@/app/components/sessions/SalesSession";
import { motion } from "framer-motion";
import Spinner from "@/app/components/ui/Spinner";
import { Save } from "lucide-react";

export default function WriteSession({ onTabChange }) {
  const [content, setContent] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userStatus, setUserStatus] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [error, setError] = useState(null);
  const [showSalesPage, setShowSalesPage] = useState(true);
  const [useFreeSession, setUseFreeSession] = useState(false);
  const [justPaid, setJustPaid] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [draftKey, setDraftKey] = useState(null);

  useEffect(() => {
    async function init() {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session) {
          setError("Please log in again");
          setLoadingStatus(false);
          return;
        }

        // Create user-specific draft key
        const key = `csm-session-draft-${session.user.id}`;
        setDraftKey(key);

        // Restore draft
        const draft = localStorage.getItem(key);
        if (draft && draft.trim()) {
          setContent(draft);
          const text = draft
            .replace(/<[^>]*>/g, " ")
            .replace(/\s+/g, " ")
            .trim();
          const words = text ? text.split(/\s+/).length : 0;
          setWordCount(words);
          setSavedMessage("(auto-saved)");
          setTimeout(() => setSavedMessage(""), 2500);
          setShowEditor(false);
        }

        // Your original status fetch — unchanged
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

    init();
  }, [justPaid]);

  // FIXED: Simple, clean, safe debounced save
  const debouncedSave = useDebouncedCallback((html) => {
    if (draftKey) {
      localStorage.setItem(draftKey, html);
      setSavedMessage("(auto-saved)");
      setTimeout(() => setSavedMessage(""), 2000);
    }
  }, 1000);

  const handleEditorChange = (html) => {
    setContent(html);
    const text = html
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const words = text ? text.split(/\s+/).length : 0;
    setWordCount(words);
    if (words <= 2500) {
      debouncedSave(html);
    }
  };

  const handleStartFree = () => {
    setUseFreeSession(true);
    setShowSalesPage(false);
  };

  const handlePaymentSuccess = async () => {
    setJustPaid(true);
    setShowSalesPage(false);
  };

  async function handleSubmit() {
    if (!content.trim() || userStatus?.hasActiveSession || wordCount > 2500) return;

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
      if (draftKey) localStorage.removeItem(draftKey); // FIXED: user-specific clear
      setUseFreeSession(false);
      setShowSalesPage(true);
      setWordCount(0);
      setSavedMessage("");
      setShowEditor(false);
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
        <div className="flex justify-center gap-3">
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
      className="card-gradient p-2 md:p-8 rounded-lg shadow-custom-lg border border-[var(--primary)]"
    >
      <div className="max-w-4xl mx-auto space-y-6 mt-10">
        {/* INTRO */}
        {!showEditor && (
          <>
            <div className="flex flex-col items-center mb-6 md:px-20">
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-10 text-center">
                Start Your Private Session
              </h1>
              <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed text-center mb-2 md:mb-4">
                Share the challenge, question, or uncertainty you’d like support with. You’re welcome to include as much
                detail as you feel comfortable with, from practical situations and relationship concerns to deeper
                emotional or identity-driven questions. You may also describe any thoughts, feelings, or recurring
                patterns you’ve noticed that seem to influence your experience. The more context you provide, the more
                precisely we can understand your cognitive dynamics.
              </p>
              <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed text-center mt-4">
                Once submitted, your entry will be carefully reviewed and matched with a{" "}
                <strong>CSM-Certified Expert</strong>. Within 1–2 business days, you will receive a personalized written
                report grounded in your unique <strong>Cognitive Spectrum profile</strong>, offering clarity, guidance,
                and actionable next steps tailored to you.
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowEditor(true)}
                className="px-10 py-4 rounded-lg font-semibold text-lg btn-primary hover:shadow-lg"
              >
                Start Session
              </motion.button>
            </div>
          </>
        )}

        {/* EDITOR */}
        {showEditor && (
          <>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] md:mb-10 text-center">
              Submit Your Session Entry
            </h1>

            {userStatus?.hasActiveSession && (
              <div className="mb-8 mt-8 p-6 bg-red-600/10 border border-[var(--border)] rounded-lg">
                <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed text-center">
                  You already have an <strong>active session</strong> awaiting a response from your CSM-Certified
                  Expert. Please wait until it is answered before starting a new one.
                </p>
              </div>
            )}

            <div className="flex justify-end h-1 gap-2">
              {savedMessage && (
                <>
                  <Save className="h-4 w-4" />
                  <span className="inline-block text-gray-400 text-xs rounded-md font-medium animate-pulse">
                    {savedMessage}
                  </span>
                </>
              )}
            </div>

            <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] shadow-sm overflow-hidden">
              <Editor content={content} onChange={handleEditorChange} />
            </div>

            <div>
              <p className="text-[var(--text-secondary)] text-sm font-light italic leading-relaxed text-center px-4">
                <strong>Note:</strong> This chat is completely private. Only you have access to your questions and
                responses. Your partner cannot view or edit anything you share here, though you’re welcome to share your
                reflections later if you wish.
              </p>

              <div className="flex flex-col gap-4 mt-4">
                <div className="flex justify-end items-center text-xs mt-3">
                  <div className={wordCount > 2500 ? "text-red-500 font-medium" : "text-[var(--text-secondary)]"}>
                    {wordCount} / 2,500 words
                  </div>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={isSubmitting || !content.trim() || userStatus?.hasActiveSession || wordCount > 2500}
                    className={`px-8 py-3 rounded-lg font-semibold transition-all shadow-md ${
                      isSubmitting || !content.trim() || userStatus?.hasActiveSession || wordCount > 2500
                        ? "bg-[var(--surface-variant)] text-[var(--text-secondary)] cursor-not-allowed opacity-70"
                        : "btn-primary hover:shadow-lg"
                    }`}
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : userStatus?.hasActiveSession
                      ? "Awaiting Response..."
                      : wordCount > 2500
                      ? "Trim to ≤ 2,500 words"
                      : `Submit Session (${wordCount} words)`}
                  </motion.button>
                </div>
              </div>
            </div>

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
          </>
        )}
      </div>
    </motion.div>
  );
}
