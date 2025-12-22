"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions, calculateCSMResults } from "../utils/csm";
import { motion } from "framer-motion";
import Image from "next/image";
import Spinner from "@/app/components/ui/Spinner";
import { X } from "lucide-react";

// Helper function to safely use localStorage with fallback
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

export default function Test() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localStorageAvailable, setLocalStorageAvailable] = useState(true);
  const q = questions[current];

  useEffect(() => {
    // Check if localStorage is available
    const testKey = "__storage_test__";
    const isAvailable = safeLocalStorage.setItem(testKey, "test");
    if (isAvailable) {
      safeLocalStorage.removeItem(testKey);
    } else {
      setLocalStorageAvailable(false);
      console.warn("localStorage not available - progress will not be saved");
    }

    const saved = safeLocalStorage.getItem("csmAnswers");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length === questions.length) {
          setAnswers(parsed);
          const firstUnanswered = parsed.findIndex((a) => a === null);
          if (firstUnanswered !== -1) {
            setCurrent(firstUnanswered);
          }
        } else {
          setError("Previous progress is outdated. Starting a new test.");
          safeLocalStorage.removeItem("csmAnswers");
        }
      } catch (e) {
        setError("Error loading progress. Starting a new test.");
        safeLocalStorage.removeItem("csmAnswers");
      }
    }
    setLoading(false);
  }, []);

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[current] = value;
    setAnswers(newAnswers);

    // Save progress (will fail silently on iOS private mode)
    if (localStorageAvailable) {
      safeLocalStorage.setItem("csmAnswers", JSON.stringify(newAnswers));
    }

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
        window.scrollTo({ top: 0 });
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
      const assessmentData = { answers, results };

      // Save to localStorage
      const saved = safeLocalStorage.setItem("csmAssessmentData", JSON.stringify(assessmentData));

      if (!saved && !localStorageAvailable) {
        setError("Storage not available. Your results may not be saved.");
        // Still allow continuing - data will be passed via router state as fallback
      }

      safeLocalStorage.removeItem("csmAnswers");

      const elapsed = Date.now() - startTime;
      const minDelay = 1000;
      const delay = Math.max(minDelay - elapsed, 0);

      setTimeout(() => {
        // Pass data via router state as fallback for iOS private mode
        router.push("/summary", { state: { assessmentData } });
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start md:justify-center px-2 py-4 md:p-6 bg-[var(--surface)]">
      {!localStorageAvailable && (
        <div className="mb-4 p-3 bg-yellow-900/20 border border-yellow-500/50 rounded-lg max-w-lg">
          <p className="text-yellow-200 text-sm text-center">
            ⚠️ Private browsing detected. To save your progress, please use a regular browser window.
          </p>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg card-gradient p-8 rounded-lg shadow-custom-lg border border-[var(--border)] relative"
      >
        {/* Close Button */}
        <button
          onClick={() => router.push("/")}
          className="absolute top-4 right-4 text-gray-500 hover:text-[var(--accent)] transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-center mb-6 gap-2">
          <Image src="/logo_transparent.png" alt="CSM Dynamics Logo" width={28} height={28} className="h-7 w-7" />
          <div className="flex items-center gap-1">
            <h1 className="text-xl font-bold text-[var(--primary)]">CSM</h1>
            <h1 className="text-xl font-light text-white">Avaliação</h1>
          </div>
        </div>

        <p className="text-center text-sm text-[var(--text-secondary)] mb-6 italic">
          Pense brevemente. Responda o que você <em>realmente</em> faz.
        </p>

        {/* Progress */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-[var(--accent)]">{percentage}% Completo</span>
          <span className="text-sm font-medium text-[var(--accent)]">~{minutesLeft} min rest.</span>
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
          <div className="space-y-3 mb-6">
            {[
              { value: 1, label: "Discordo totalmente" },
              { value: 2, label: "Discordo" },
              { value: 3, label: "Discordo parcialmente" },
              { value: 4, label: "Neutro" },
              { value: 5, label: "Concordo parcialmente" },
              { value: 6, label: "Concordo" },
              { value: 7, label: "Concordo totalmente" },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleAnswer(value)}
                className={`w-full py-3 px-4 rounded-lg text-left font-medium transition-all text-base ${
                  answers[current] === value
                    ? "btn-primary shadow-md ring-4 ring-[var(--primary)]/30"
                    : "bg-[var(--surface-variant)] text-[var(--text-secondary)] hover:bg-[var(--surface-variant-hover)]"
                }`}
              >
                <span className="block mt-0.5 font-semibold">{label}</span>
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
            aria-label="Previous question"
          >
            Voltar
          </button>

          <button
            onClick={next}
            disabled={isSubmitting}
            className={`py-3 px-10 rounded-lg btn-primary font-semibold transition-all flex items-center justify-center gap-3 ${
              isSubmitting ? "opacity-90 cursor-not-allowed" : ""
            }`}
            aria-label={current < questions.length - 1 ? "Next question" : "Finish test"}
          >
            {isSubmitting ? (
              <Spinner>{current < questions.length - 1 ? "Próximo..." : "Finalizar..."}</Spinner>
            ) : (
              <span>{current < questions.length - 1 ? "Próximo" : "Finalizar"}</span>
            )}
          </button>
        </div>
      </motion.div>
    </main>
  );
}
