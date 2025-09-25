"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions, calculateCSMResults } from "../utils/csm";

export default function Test() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const q = questions[current];

  useEffect(() => {
    const saved = localStorage.getItem("csmAnswers");
    if (saved) setAnswers(JSON.parse(saved));
  }, []);

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[current] = value;
    setAnswers(newAnswers);
    localStorage.setItem("csmAnswers", JSON.stringify(newAnswers));
  };

  const next = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
    else {
      const results = calculateCSMResults(answers);
      localStorage.setItem("csmAssessmentData", JSON.stringify({ answers, results }));
      router.push("/summary");
      // Clear answers after saving results to start fresh next time
      localStorage.removeItem("csmAnswers");
    }
  };

  const prev = () => current > 0 && setCurrent(current - 1);

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
          // Rank: Styled selects with dark bg and text
          <div className="space-y-4 mb-6">
            {q.options.map((opt) => (
              <div key={opt.key} className="flex items-center justify-between gap-4">
                <label className="flex-1 text-[var(--text-secondary)] text-lg">{opt.label}</label>
                <select
                  onChange={(e) => handleAnswer({ ...answers[current], [opt.key]: parseInt(e.target.value) })}
                  className="w-24 py-2 px-3 rounded-lg bg-[var(--surface-variant)] text-[var(--text-primary)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] transition duration-300"
                >
                  <option className="bg-[var(--surface-variant)] text-[var(--text-primary)]">Rank</option>
                  {[1, 2, 3].map((r) => (
                    <option key={r} value={r} className="bg-[var(--surface-variant)] text-[var(--text-primary)]">
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            ))}
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
            disabled={answers[current] === null}
            className="py-2 px-6 rounded-lg bg-[var(--primary)] text-[var(--text-primary)] hover:bg-[color-mix(in_srgb,var(--primary)_80%,black)] disabled:opacity-50 transition duration-300"
          >
            {current < questions.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      </div>
    </main>
  );
}
