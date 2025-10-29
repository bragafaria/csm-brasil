"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions, calculateCSMResults } from "../utils/csm";

export default function Test() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [error, setError] = useState(null);
  const q = questions[current];

  useEffect(() => {
    const saved = localStorage.getItem("csmAnswers");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length === questions.length) {
          setAnswers(parsed);
          const lastAnswered = parsed.findIndex((a) => a === null);
          if (lastAnswered !== -1 && lastAnswered <= current) {
            setCurrent(Math.max(0, lastAnswered));
          }
        } else {
          setError("Previous progress is outdated. Starting a new test.");
          localStorage.removeItem("csmAnswers");
        }
      } catch (e) {
        setError("Error loading progress. Starting a new test.");
        localStorage.removeItem("csmAnswers");
      }
    }
  }, []);

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[current] = value;
    setAnswers(newAnswers);
    localStorage.setItem("csmAnswers", JSON.stringify(newAnswers));
    setError(null);
  };

  const next = () => {
    if (answers[current] === null) {
      setError("Please answer this question.");
      return;
    }
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setError(null);
    } else {
      if (answers.some((a) => a === null)) {
        setError("Please complete all questions.");
        return;
      }
      const results = calculateCSMResults(answers);
      localStorage.setItem("csmAssessmentData", JSON.stringify({ answers, results }));
      localStorage.removeItem("csmAnswers");
      router.push("/summary");
    }
  };

  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setError(null);
    }
  };

  const percentage = (((current + 1) / questions.length) * 100).toFixed(0);
  const minutesLeft = Math.max(0, Math.round((questions.length - current - 1) * 0.15)); // Updated to 0.15 min/question

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-[var(--surface)]">
      <div className="w-full max-w-lg card-gradient p-8 rounded-xl shadow-2xl border border-[var(--border)]">
        <div className="flex mb-6 items-center justify-center space-x-1">
          <h1 className="text-xl font-bold text-primary text-[var(--primary)] ">CSM </h1>
          <h1 className="text-xl font-light text-white">Assessment</h1>
        </div>
        <p className="text-center text-sm text-[var(--text-secondary)] mb-6">
          Be honest. Think briefly. Answer what you <em>truly</em> do.
        </p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-[var(--accent)]">{percentage}% Complete</span>
          <span className="text-sm font-medium text-[var(--accent)]">~{minutesLeft} min left</span>
        </div>
        <progress
          value={current + 1}
          max={questions.length}
          className="w-full h-2 mb-6 rounded-full bg-[var(--border)] [&::-webkit-progress-bar]:bg-[var(--border)] [&::-webkit-progress-value]:bg-[var(--primary)] [&::-moz-progress-bar]:bg-[var(--primary)]"
        />
        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)] text-center">{q.text}</h2>

        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

        {q.type === "likert" ? (
          <div className="flex justify-between gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                onClick={() => handleAnswer(v)}
                className={`flex-1 py-3 px-4 rounded-lg transition duration-300 cursor-pointer ${
                  answers[current] === v
                    ? "bg-[var(--primary)] text-white shadow-md"
                    : "bg-[var(--surface-variant)] text-[var(--text-secondary)] hover:bg-[color-mix(in_srgb,var(--surface-variant)_80%,white_10%)]"
                }`}
                aria-label={`Rate ${v} out of 5`} // Added for accessibility
              >
                {v}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            {q.options.map((opt) => (
              <button
                key={opt.key}
                onClick={() => handleAnswer(opt.key)}
                className={`w-full py-3 px-4 rounded-lg text-left transition duration-300 cursor-pointer ${
                  answers[current] === opt.key
                    ? "bg-[var(--primary)] text-white shadow-md"
                    : "bg-[var(--surface-variant)] text-[var(--text-secondary)] hover:bg-[color-mix(in_srgb,var(--surface-variant)_80%,white_10%)]"
                }`}
                aria-label={`Select option: ${opt.label}`} // Added for accessibility
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={prev}
            disabled={current === 0}
            className="py-2 px-6 rounded-lg bg-[var(--surface-variant)] text-[var(--text-secondary)] disabled:opacity-50 transition cursor-pointer"
            aria-label="Previous question"
          >
            Prev
          </button>
          <button
            onClick={next}
            className="py-2 px-6 rounded-lg bg-[var(--primary)] text-white hover:bg-[color-mix(in_srgb,var(--primary)_80%,black)] transition cursor-pointer"
            aria-label={current < questions.length - 1 ? "Next question" : "Finish test"}
          >
            {current < questions.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      </div>
    </main>
  );
}
