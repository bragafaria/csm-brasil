// app/components/couples/DashboardTest.js
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { questions, calculateCSMResults } from "@/utils/csm";
import { supabase } from "@/app/utils/supabaseClient"; // Use singleton
import { motion } from "framer-motion";

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
  const q = questions[current];

  // Load answers from localStorage only once on component mount
  useEffect(() => {
    const saved = localStorage.getItem("csmAnswers");
    if (saved) {
      try {
        const parsedAnswers = JSON.parse(saved);
        setAnswers(parsedAnswers);
      } catch (e) {
        console.error("Invalid localStorage data:", e.message, e);
        localStorage.removeItem("csmAnswers"); // Clear corrupt data
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
          .maybeSingle(); // Use maybeSingle

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
    localStorage.setItem("csmAnswers", JSON.stringify(newAnswers));
  };

  const handleRankChange = (optionKey, points) => {
    const parsedPoints = parseInt(points) || 0;
    if (parsedPoints < 0) return;
    const newRanks = { ...ranks, [optionKey]: parsedPoints };
    setRanks(newRanks);
    handleAnswer(newRanks);
  };

  const next = async () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      return;
    }

    try {
      // Calculate results
      const results = calculateCSMResults(answers);
      if (
        !results ||
        !Array.isArray(results.percents) ||
        !Array.isArray(results.dominants) ||
        !Array.isArray(results.categories)
      ) {
        console.error("Invalid assessment results:", results);
        setError("Failed to calculate assessment results. Please try again.");
        return;
      }
      localStorage.setItem("csmAssessmentData", JSON.stringify({ answers, results }));
      setAssessmentData(results);
      console.log("Assessment results calculated:", results);

      // Get user session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      if (!userId) {
        console.error("Session expired: No userId found");
        setError("Session expired. Please log in again.");
        router.push("/login");
        return;
      }
      console.log("Updating for userId:", userId);

      // Prepare update data for JSONB columns
      const updateData = {
        has_assessment: true,
        typeCode: results.dominants?.length === 5 ? results.dominants.join("-") : null, // Text: string
        percents: results.percents?.length === 5 ? results.percents : [], // jsonb: raw array
        dominants: results.dominants?.length === 5 ? results.dominants : [], // jsonb: raw array
        categories: results.categories?.length === 5 ? results.categories : [], // jsonb: raw array
      };

      console.log("Update data prepared (raw for jsonb):", updateData);

      // Update Supabase
      const { data: updateResponse, error: supabaseError } = await supabase
        .from("users")
        .update(updateData)
        .eq("id", userId)
        .select("id, has_assessment, typeCode, dominants, percents, categories");

      console.log("Update response:", { data: updateResponse, error: supabaseError });

      if (supabaseError) {
        console.error("Supabase update error details:", supabaseError.message, supabaseError);
        setError(`Failed to save results: ${supabaseError.message}. Please try again.`);
        return;
      }

      if (!updateResponse || updateResponse.length === 0) {
        console.error("No rows updated - check RLS or userId:", userId);
        setError("Failed to update profile (no rows affected). Please try again.");
        return;
      }

      // Verify saved data
      console.log("Saved row:", updateResponse[0]);

      // Clear localStorage
      localStorage.removeItem("csmAnswers");
      localStorage.removeItem("csmAssessmentData");
      console.log("Cleared localStorage: csmAnswers, csmAssessmentData");

      router.push(`/dashboard/${siteId}`);
    } catch (err) {
      console.error("Unexpected error in next:", err.message, err);
      setError("An unexpected error occurred while saving results. Please try again.");
    }
  };

  const prev = () => current > 0 && setCurrent(current - 1);

  // Validate points: Ensure total points sum to 10 for rank questions
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
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-[var(--surface)]">
        <div className="text-[var(--text-primary)]">Loading assessment...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-[var(--surface)]">
        <div className="text-red-400 text-center">{error}</div>
        <button onClick={() => router.push("/login")} className="mt-4 btn-primary">
          Go to Login
        </button>
      </main>
    );
  }

  if (!showAssessment) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-[var(--surface)]">
        <div className="text-[var(--text-primary)] text-center">Assessment already completed or not needed.</div>
        <button onClick={() => router.push(`/dashboard/${siteId}/summary`)} className="mt-4 btn-primary">
          View Summary
        </button>
      </main>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col items-center justify-center p-4 bg-[var(--surface)]"
    >
      <div className="w-full max-w-lg card-gradient p-8 rounded-xl shadow-2xl border border-[var(--border)]">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-[#BF00FF]">{percentage}% Complete</span>
          <span className="text-sm font-medium text-[#BF00FF]">~{minutesLeft} min left</span>
        </div>
        <progress
          value={current + 1}
          max={questions.length}
          className="w-full h-2 mb-6 rounded-full bg-[var(--border)] [&::-webkit-progress-bar]:bg-[var(--border)] [&::-webkit-progress-value]:bg-[var(--primary)] [&::-moz-progress-bar]:bg-[var(--primary)]"
        />
        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)] text-center">{q.text}</h2>
        {q.type === "likert" ? (
          <div className="flex justify-between gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                onClick={() => handleAnswer(v)}
                className={`flex-1 py-3 px-4 rounded-lg transition duration-300 ${
                  answers[current] === v
                    ? "bg-[var(--primary)] text-[var(--text-primary)] shadow-md"
                    : "bg-[var(--surface-variant)] text-[var(--text-secondary)] hover:bg-[color-mix(in_srgb,var(--surface-variant)_80%,white_10%)]"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        ) : q.type === "forced-select" ? (
          <div className="space-y-3 mb-6">
            {q.options.map((opt) => (
              <button
                key={opt.key}
                onClick={() => handleAnswer(opt.key)}
                className={`w-full py-3 px-4 rounded-lg text-left transition duration-300 ${
                  answers[current] === opt.key
                    ? "bg-[var(--primary)] text-[var(--text-primary)] shadow-md"
                    : "bg-[var(--surface-variant)] text-[var(--text-secondary)] hover:bg-[color-mix(in_srgb,var(--surface-variant)_80%,white_10%)]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        ) : (
          // Rank: Point-allocation system
          <div className="mb-6">
            <div className="space-y-4 bg-[var(--surface-variant)] p-4 rounded-lg">
              <p className="text-sm text-[var(--text-secondary)] italic">
                Allocate 10 points across the options to reflect your preference (e.g., 5-3-2 or 4-4-2). Total must sum
                to 10.
              </p>
              {q.options.map((opt) => (
                <div key={opt.key} className="flex items-center justify-between gap-4">
                  <label className="text-[var(--text-secondary)] flex-1">{opt.label}</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={ranks[opt.key] || 0}
                    onChange={(e) => handleRankChange(opt.key, e.target.value)}
                    className="w-16 p-2 rounded-lg bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                    placeholder="0"
                  />
                </div>
              ))}
              <div className="text-sm text-[var(--text-secondary)]">
                Total Points: {Object.values(ranks).reduce((sum, val) => sum + (parseInt(val) || 0), 0)}/10
              </div>
              {!isRankValid() && (
                <p className="text-sm text-red-400 mt-2">Please allocate exactly 10 points across the options.</p>
              )}
            </div>
          </div>
        )}
        <div className="flex justify-between mt-6">
          <button
            onClick={prev}
            disabled={current === 0}
            className="py-2 px-6 rounded-lg bg-[var(--surface-variant)] text-[var(--text-secondary)] hover:bg-[color-mix(in_srgb,var(--surface-variant)_80%,white_10%)] disabled:opacity-50 transition duration-300"
          >
            Prev
          </button>
          <button
            onClick={next}
            disabled={!isRankValid()}
            className="py-2 px-6 rounded-lg bg-[var(--primary)] text-[var(--text-primary)] hover:bg-[color-mix(in_srgb,var(--primary)_80%,black)] disabled:opacity-50 transition duration-300"
          >
            {current < questions.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      </div>
    </motion.main>
  );
}
