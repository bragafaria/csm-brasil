"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions, calculateCSMResults } from "../utils/csm";
import { motion } from "framer-motion";
import Image from "next/image";
import Spinner from "@/app/components/ui/Spinner";
import { persistentStorage } from "@/app/utils/storage"; // ← We use this now

export default function Test() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const q = questions[current];

  useEffect(() => {
    // ← Changed: use persistentStorage
    const saved = persistentStorage.getItem("csmAnswers");
    if (saved) {
      try {
        const parsed = Array.isArray(saved) ? saved : JSON.parse(saved);
        if (parsed.length === questions.length) {
          setAnswers(parsed);

          const firstUnanswered = parsed.findIndex((a) => a === null);
          if (firstUnanswered !== -1) {
            setCurrent(firstUnanswered);
          }
        } else {
          setError("Previous progress is outdated. Starting a new test.");
          persistentStorage.removeItem("csmAnswers");
        }
      } catch (e) {
        setError("Error loading progress. Starting a new test.");
        persistentStorage.removeItem("csmAnswers");
      }
    }
    setLoading(false);
  }, []);

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[current] = value;
    setAnswers(newAnswers);
    // ← Changed: use persistentStorage
    persistentStorage.setItem("csmAnswers", newAnswers);
    setError(null);
  };

  const next = () => {
    if (answers[current] === null) {
      setError("Please answer this question.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    if (current < questions.length - 1) {
      setTimeout(() => {
        setCurrent(current + 1);
        setIsSubmitting(false);
      }, 500);
    } else {
      if (answers.some((a) => a === null)) {
        setError("Please complete all questions.");
        setIsSubmitting(false);
        return;
      }

      const startTime = Date.now();
      const results = calculateCSMResults(answers);

      // ← CRITICAL: These two lines now use persistentStorage
      persistentStorage.setItem("csmAssessmentData", { answers, results });
      persistentStorage.removeItem("csmAnswers");

      const elapsed = Date.now() - startTime;
      const minDelay = 1000;
      const delay = Math.max(minDelay - elapsed, 0);

      setTimeout(() => {
        router.push("/summary");
      }, delay);
    }
  };

  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setError(null);
    }
  };

  const percentage = (((current + 1) / questions.length) * 100).toFixed(0);
  const minutesLeft = Math.max(0, Math.round((questions.length - current - 1) * 0.15));

  // Rest of your JSX (100% unchanged)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[var(--surface)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg card-gradient p-8 rounded-lg shadow-custom-lg border border-[var(--border)]"
      >
        {/* Header */}
        <div className="flex items-center justify-center mb-6 gap-2">
          <Image src="/logo_transparent_svg.svg" alt="CSM Dynamics Logo" width={28} height={28} className="h-7 w-7" />
          <div className="flex items-center gap-1">
            <h1 className="text-xl font-bold text-[var(--primary)]">CSM</h1>
            <h1 className="text-xl font-light text-white">Assessment</h1>
          </div>
        </div>

        <p className="text-center text-sm text-[var(--text-secondary)] mb-6 italic">
          Be honest. Think briefly. Answer what you <em>truly</em> do.
        </p>

        {/* Progress */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-[var(--accent)]">{percentage}% Complete</span>
          <span className="text-sm font-medium text-[var(--accent)]">~{minutesLeft} min left</span>
        </div>

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

        {/* Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mb-4 text-center font-medium"
          >
            {error}
          </motion.p>
        )}

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
                aria-label={`Rate ${v} out of 5`}
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
                aria-label={`Select option: ${opt.label}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prev}
            disabled={current === 0 || isSubmitting}
            className="py-3 px-6 rounded-lg bg-[var(--surface-variant)] text-[var(--text-secondary)] font-medium hover:bg-[var(--surface-variant-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Prev
          </button>

          <button
            onClick={next}
            disabled={isSubmitting}
            className={`py-3 px-10 rounded-lg btn-primary font-semibold transition-all flex items-center justify-center gap-3 ${
              isSubmitting ? "opacity-90 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <Spinner>{current < questions.length - 1 ? "Next..." : "Finishing..."}</Spinner>
            ) : (
              <span>{current < questions.length - 1 ? "Next" : "Finish"}</span>
            )}
          </button>
        </div>
      </motion.div>
    </main>
  );
}
