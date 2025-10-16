"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions, calculateCSMResults } from "../utils/csm";

export default function Test() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [ranks, setRanks] = useState({}); // Track points for rank-type questions
  const q = questions[current];

  // Load answers from localStorage only once on component mount
  useEffect(() => {
    const saved = localStorage.getItem("csmAnswers");
    if (saved) {
      const parsedAnswers = JSON.parse(saved);
      setAnswers((prevAnswers) => {
        if (JSON.stringify(prevAnswers) !== JSON.stringify(parsedAnswers)) {
          return parsedAnswers;
        }
        return prevAnswers;
      });
    }
  }, []);

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
    if (parsedPoints < 0) return; // Prevent negative points
    const newRanks = { ...ranks, [optionKey]: parsedPoints };
    setRanks(newRanks);
    handleAnswer(newRanks);
  };

  const next = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
    else {
      const results = calculateCSMResults(answers);
      localStorage.setItem("csmAssessmentData", JSON.stringify({ answers, results }));
      router.push("/summary");
      localStorage.removeItem("csmAnswers");
    }
  };

  const prev = () => current > 0 && setCurrent(current - 1);

  // Validate points: Ensure total points sum to 10
  const isRankValid = () => {
    if (q.type !== "rank") return answers[current] !== null;
    const totalPoints = Object.values(ranks).reduce((sum, val) => sum + (parseInt(val) || 0), 0);
    return totalPoints === 10;
  };

  const percentage = (((current + 1) / questions.length) * 100).toFixed(0);
  const totalMinutes = 10;
  const minutesPerQuestion = totalMinutes / questions.length;
  const minutesLeft = Math.max(0, Math.round((questions.length - (current + 1)) * minutesPerQuestion));

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-[var(--surface)]">
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
    </main>
  );
}
