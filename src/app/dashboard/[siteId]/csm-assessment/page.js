// app/components/couples/DashboardTest.js
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { questions, calculateCSMResults } from "@/app/utils/csm";
import { supabase } from "@/app/utils/supabaseClient";
import { motion } from "framer-motion";
import Spinner from "@/app/components/ui/Spinner";
import Image from "next/image";
import { X } from "lucide-react";

// Safe localStorage wrapper to prevent iOS Safari Private Mode crashes
const safeLocalStorage = {
  getItem: (key) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return localStorage.getItem(key);
      }
    } catch (e) {
      console.warn("localStorage.getItem failed:", e);
    }
    return null;
  },
  setItem: (key, value) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(key, value);
        return true;
      }
    } catch (e) {
      console.warn("localStorage.setItem failed:", e);
    }
    return false;
  },
  removeItem: (key) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.removeItem(key);
        return true;
      }
    } catch (e) {
      console.warn("localStorage.removeItem failed:", e);
    }
    return false;
  },
};

export default function DashboardTest() {
  const router = useRouter();
  const { siteId } = useParams();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [ranks, setRanks] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentData, setAssessmentData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const q = questions[current];

  // Load answers from localStorage only once on component mount
  useEffect(() => {
    const saved = safeLocalStorage.getItem("csmAnswers");
    if (saved) {
      try {
        const parsedAnswers = JSON.parse(saved);
        setAnswers(parsedAnswers);
      } catch (e) {
        console.error("Invalid localStorage data:", e.message, e);
        safeLocalStorage.removeItem("csmAnswers");
      }
    }
  }, []);

  // Initialize: Auth + user validation
  useEffect(() => {
    async function initializeTestDashboardPage() {
      if (!siteId) {
        console.error("Invalid siteId:", siteId);
        setError("Invalid dashboard link.");
        setLoading(false);
        return;
      }

      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError || !session) {
          console.error("Session error:", sessionError?.message || "No session found", sessionError);
          setError("You must be logged in to access the assessment.");
          setLoading(false);
          router.push("/login");
          return;
        }

        const userId = session.user.id;
        console.log("Initializing test for user:", { userId, siteId });

        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("id, partner_id, has_assessment")
          .eq("id", userId)
          .maybeSingle();

        if (userError || !userData) {
          console.error("User fetch error:", userError?.message || "No user found for userId", userId, userError);
          setError("User profile not found. Please log in again.");
          await supabase.auth.signOut();
          router.push("/login");
          setLoading(false);
          return;
        }

        const isPartnerA = userId === siteId;
        const isPartnerB = userData.partner_id === siteId;

        if (!isPartnerA && !isPartnerB) {
          console.error("Access denied:", { userId, siteId, partner_id: userData.partner_id });
          setError("You do not have access to this dashboard.");
          setLoading(false);
          return;
        }

        console.log("Access granted:", { isPartnerA, isPartnerB, hasAssessment: userData.has_assessment });

        if (isPartnerA) {
          console.log("Redirecting Partner A to dashboard:", `/dashboard/${siteId}`);
          router.push(`/dashboard/${siteId}`);
          setLoading(false);
          return;
        }

        if (isPartnerB && !userData.has_assessment) {
          console.log("Showing assessment for Partner B:", userId);
          setShowAssessment(true);
        } else {
          console.log(
            "Redirecting Partner B to dashboard (assessment completed or not needed):",
            `/dashboard/${siteId}`
          );
          router.push(`/dashboard/${siteId}`);
        }

        setLoading(false);
      } catch (err) {
        console.error("Unexpected error in initializeTestDashboardPage:", err.message, err);
        setError("An unexpected error occurred. Please try again.");
        setLoading(false);
      }
    }

    initializeTestDashboardPage();
  }, [router, siteId]);

  // Update ranks when current question changes
  useEffect(() => {
    setRanks(answers[current] || {});
  }, [current, answers]);

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[current] = value;
    setAnswers(newAnswers);
    safeLocalStorage.setItem("csmAnswers", JSON.stringify(newAnswers));
  };

  const handleRankChange = (optionKey, points) => {
    const parsedPoints = parseInt(points) || 0;
    if (parsedPoints < 0) return;
    const newRanks = { ...ranks, [optionKey]: parsedPoints };
    setRanks(newRanks);
    handleAnswer(newRanks);
  };

  const next = async () => {
    setIsSubmitting(true);
    setError(null);

    if (current < questions.length - 1) {
      setTimeout(() => {
        setCurrent(current + 1);
        window.scrollTo({ top: 0 });
        setIsSubmitting(false);
      }, 500);
      return;
    }

    try {
      const results = calculateCSMResults(answers);
      if (
        !results ||
        !Array.isArray(results.percents) ||
        !Array.isArray(results.dominants) ||
        !Array.isArray(results.categories)
      ) {
        console.error("Invalid assessment results:", results);
        setError("Failed to calculate assessment results. Please try again.");
        setIsSubmitting(false);
        return;
      }

      safeLocalStorage.setItem("csmAssessmentData", JSON.stringify({ answers, results }));
      setAssessmentData(results);
      console.log("Assessment results calculated:", results);

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      if (!userId) {
        console.error("Session expired: No userId found");
        setError("Session expired. Please log in again.");
        router.push("/login");
        setIsSubmitting(false);
        return;
      }

      const updateData = {
        has_assessment: true,
        typeCode: results.dominants?.length === 5 ? results.dominants.join("-") : null,
        percents: results.percents?.length === 5 ? results.percents : [],
        dominants: results.dominants?.length === 5 ? results.dominants : [],
        categories: results.categories?.length === 5 ? results.categories : [],
      };

      const { data: updateResponse, error: supabaseError } = await supabase
        .from("users")
        .update(updateData)
        .eq("id", userId)
        .select("id, has_assessment, typeCode, dominants, percents, categories");

      if (supabaseError) {
        console.error("Supabase update error details:", supabaseError.message, supabaseError);
        setError(`Failed to save results: ${supabaseError.message}. Please try again.`);
        setIsSubmitting(false);
        return;
      }

      if (!updateResponse || updateResponse.length === 0) {
        console.error("No rows updated - check RLS or userId:", userId);
        setError("Failed to update profile (no rows affected). Please try again.");
        setIsSubmitting(false);
        return;
      }

      safeLocalStorage.removeItem("csmAnswers");
      safeLocalStorage.removeItem("csmAssessmentData");
      console.log("Cleared localStorage: csmAnswers, csmAssessmentData");

      router.push(`/dashboard/${siteId}`);
      router.refresh();
    } catch (err) {
      console.error("Unexpected error in next:", err.message, err);
      setError("An unexpected error occurred while saving results. Please try again.");
      setIsSubmitting(false);
    }
  };

  const prev = () => current > 0 && setCurrent(current - 1);

  const isRankValid = () => {
    if (q.type !== "rank") return answers[current] !== null;
    const totalPoints = Object.values(ranks).reduce((sum, val) => sum + (parseInt(val) || 0), 0);
    return totalPoints === 10;
  };

  const percentage = (((current + 1) / questions.length) * 100).toFixed(0);
  const totalMinutes = 10;
  const minutesPerQuestion = totalMinutes / questions.length;
  const minutesLeft = Math.max(0, Math.round((questions.length - (current + 1)) * minutesPerQuestion));

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[var(--surface)]">
        <Spinner>Loading assessment...</Spinner>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[var(--surface)]">
        <div className="text-red-400 text-center text-lg font-medium">{error}</div>
        <button
          onClick={() => router.push("/login")}
          className="mt-6 btn-primary py-3 px-6 rounded-lg font-semibold transition-all"
        >
          Go to Login
        </button>
      </main>
    );
  }

  if (!showAssessment) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[var(--surface)]">
        <div className="text-[var(--text-primary)] text-center text-lg font-medium">
          Assessment already completed or not needed.
        </div>
        <button
          onClick={() => router.push(`/dashboard/${siteId}`)}
          className="mt-6 btn-primary py-3 px-6 rounded-lg font-semibold transition-all"
        >
          Go Back
        </button>
      </main>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex max-h-full flex-col items-center justify-start md:justify-center mt:2 md:mt-6 p-2 md:p-6 bg-[var(--surface)]"
    >
      <div className="w-full max-w-lg card-gradient p-8 rounded-lg shadow-custom-lg border border-[var(--border)] relative">
        {/* Close Button */}
        <button
          onClick={() => router.push(`/dashboard/${siteId}`)}
          className="absolute top-4 right-4 text-gray-500 hover:text-[var(--accent)] transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-center mb-6 gap-2">
          <Image src="/logo_transparent.png" alt="CSM Dynamics Logo" width={28} height={28} className="h-7 w-7" />
          <div className="flex items-center gap-1">
            <h1 className="text-xl font-bold text-[var(--primary)]">CSM</h1>
            <h1 className="text-xl font-light text-white">Assessment</h1>
          </div>
        </div>

        <p className="text-center text-sm text-[var(--text-secondary)] mb-6 italic">
          Be honest. Think briefly. Answer what you <em>truly</em> do.
        </p>
        {/* Progress Header */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-[var(--accent)]">{percentage}% Complete</span>
          <span className="text-sm font-medium text-[var(--accent)]">~{minutesLeft} min left</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 mb-6 bg-[var(--surface-variant)] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-[var(--primary)]"
          />
        </div>

        {/* Question */}
        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)] text-center leading-relaxed">{q.text}</h2>

        {/* Likert Scale */}
        {q.type === "likert" && (
          <div className="flex justify-between gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                onClick={() => handleAnswer(v)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  answers[current] === v
                    ? "btn-primary shadow-md"
                    : "bg-[var(--surface-variant)] text-[var(--text-secondary)] hover:bg-[var(--surface-variant-hover)]"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        )}

        {/* Forced Select */}
        {q.type === "forced-select" && (
          <div className="space-y-3 mb-6">
            {q.options.map((opt) => (
              <button
                key={opt.key}
                onClick={() => handleAnswer(opt.key)}
                className={`w-full py-3 px-4 rounded-lg text-left font-medium transition-all ${
                  answers[current] === opt.key
                    ? "btn-primary shadow-md"
                    : "bg-[var(--surface-variant)] text-[var(--text-secondary)] hover:bg-[var(--surface-variant-hover)]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Rank Allocation */}
        {q.type === "rank" && (
          <div className="mb-6">
            <div className="space-y-4 card-gradient p-5 rounded-lg border border-[var(--border)]">
              <p className="text-sm text-[var(--text-secondary)] italic">
                Allocate 10 points across the options to reflect your preference (e.g., 5-3-2 or 4-4-2). Total must sum
                to 10.
              </p>
              {q.options.map((opt) => (
                <div key={opt.key} className="flex items-center justify-between gap-4">
                  <label className="text-[var(--text-secondary)] flex-1 text-sm font-medium">{opt.label}</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={ranks[opt.key] || 0}
                    onChange={(e) => handleRankChange(opt.key, e.target.value)}
                    className="w-16 p-2 rounded-lg bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-[var(--transition)]"
                    placeholder="0"
                  />
                </div>
              ))}
              <div className="text-sm font-medium text-[var(--text-secondary)]">
                Total Points: {Object.values(ranks).reduce((sum, val) => sum + (parseInt(val) || 0), 0)}/10
              </div>
              {!isRankValid() && (
                <p className="text-sm text-red-400 mt-2">Please allocate exactly 10 points across the options.</p>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prev}
            disabled={current === 0}
            className="py-3 px-6 rounded-lg bg-[var(--surface-variant)] text-[var(--text-secondary)] font-medium hover:bg-[var(--surface-variant-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Prev
          </button>
          <button
            onClick={next}
            disabled={!isRankValid() || isSubmitting}
            className="py-3 px-6 rounded-lg btn-primary font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <Spinner>{current < questions.length - 1 ? "Next..." : "Finishing..."}</Spinner>
            ) : (
              <span>{current < questions.length - 1 ? "Next" : "Finish"}</span>
            )}
          </button>
        </div>
      </div>
    </motion.main>
  );
}
