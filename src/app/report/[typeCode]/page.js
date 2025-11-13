"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { reportTemplates } from "@/app/lib/personal/personal-report-data";

export default function PersonalReport() {
  const { typeCode: urlCode } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("csmAssessmentData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setData(parsed.results);
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-6">
        <p className="text-lg text-[var(--text-primary)]">Loading…</p>
      </div>
    );
  }

  const { percents, dominants, archetype, typeCode: storedCode } = data;

  // archetype is an OBJECT → use .name
  const archetypeName = typeof archetype === "object" ? archetype.name : archetype;
  const typeCode = (urlCode ?? storedCode).toUpperCase();

  const tmpl = reportTemplates[typeCode];
  if (!tmpl) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-6">
        <p className="text-lg text-red-400">Report not found for {typeCode}</p>
      </div>
    );
  }

  /* --------------------------------------------------------------
     Dominance Level Calculator (NO 50/50)
     -------------------------------------------------------------- */
  const getLevel = (primaryPct) => {
    if (primaryPct >= 86) return { dom: "Strong", inf: "Low" };
    if (primaryPct >= 66) return { dom: "Moderate", inf: "Moderate" };
    return { dom: "Mild", inf: "High" };
  };

  const handleCouplesReportClick = () => {
    router.push(`/report/${typeCode}/couples`);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* ==================== HERO ==================== */}
      <header className="hero-gradient rounded-lg p-6 md:p-8 mb-8 shadow-custom-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-white">Your CSM Personality Report</h1>
            <p className="text-[var(--text-secondary)] text-base md:text-lg mt-2">
              Uncover your cognitive blueprint, revealing how you think, connect, and evolve. Understanding yourself is
              the first step to exploring how you relate to others through the Couple Insights Report.
            </p>
          </div>
        </div>
      </header>

      {/* ==================== 1. SUMMARY ==================== */}
      <section className="max-w-4xl mx-auto space-y-8 text-[var(--text-secondary)] leading-relaxed scroll mb-8">
        <div className="card-gradient p-6 rounded-lg shadow-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 mt-8 text-left">Summary</h2>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-[var(--text-secondary)]">Archetype</p>
                <p className="text-xl font-bold text-[var(--text-primary)]">{archetypeName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--text-secondary)]">Type Code</p>
                <p className="text-xl font-mono text-[var(--accent)]">{typeCode}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">Essence</p>
              <p className="text-base italic text-[var(--text-primary)]">{tmpl.summaryEssence.title}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2. ABOUT YOUR ARCHETYPE ==================== */}
      <section className="max-w-4xl mx-auto space-y-8 text-[var(--text-secondary)] leading-relaxed scroll mb-8">
        <div className="card-gradient p-6 rounded-lg shadow-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 mt-8 text-left">
            About Your Archetype
          </h2>
          <div className="space-y-8">
            {/* Deep Analysis */}
            {tmpl.detailedEssence.map((item, i) =>
              item.deepAnalysis ? (
                <div key={i} className="prose dark:prose-invert max-w-none text-[var(--text-secondary)]">
                  {item.deepAnalysis.split("\n\n").map((p, j) => (
                    <p key={j} className="mb-4 last:mb-0">
                      {p}
                    </p>
                  ))}
                </div>
              ) : null
            )}

            {/* Strengths */}
            <div>
              <h3 className="text-xl font-bold text-[var(--accent)] mb-4">Strengths</h3>
              <ul className="space-y-4">
                {tmpl.strengths.results.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-semibold text-[var(--text-primary)]">{s.result}:</span>
                    <span>{s.description}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div>
              <h3 className="text-xl font-bold text-[var(--accent)] mb-4">Weaknesses</h3>
              <ul className="space-y-4">
                {tmpl.weaknesses.results.map((w, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-semibold text-[var(--text-primary)]">{w.result}:</span>
                    <span>{w.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 3. DIMENSIONAL PROFILE ==================== */}
      <section className="max-w-4xl mx-auto space-y-8 text-[var(--text-secondary)] leading-relaxed scroll mb-8">
        <div className="card-gradient p-6 rounded-lg shadow-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 mt-8 text-left">
            Your Dimensional Profile
          </h2>
          <div className="space-y-8">
            {/* Note */}
            {tmpl.detailedEssence.map((item, i) =>
              item.note ? (
                <p key={i} className="italic text-sm">
                  {item.note}
                </p>
              ) : null
            )}

            {/* Introduction */}
            <p className="text-sm leading-relaxed">{tmpl.dimensionalProfile.introduction}</p>

            {/* Dimensions */}
            {tmpl.dimensionalProfile.dimensions.map((dim, dimIdx) => {
              const pct = percents[dimIdx];
              const primaryPole = dominants[dimIdx];
              const primaryPct = Math.round(pct.p1 > pct.p2 ? pct.p1 : pct.p2);
              const secondaryPct = 100 - primaryPct;
              const { dom, inf } = getLevel(primaryPct);
              const lowerDom = dom.toLowerCase();

              const paragraphs = dim[lowerDom] || dim.mild;

              // Map primary → secondary pole
              const poleMap = {
                C: "N",
                N: "C",
                L: "V",
                V: "L",
                O: "I",
                I: "O",
                S: "F",
                F: "S",
                H: "A",
                A: "H",
              };
              const secondaryPole = poleMap[primaryPole];

              return (
                <div
                  key={dimIdx}
                  className="border-t border-[var(--border)] pt-6 mt-6 first:border-t-0 first:pt-0 first:mt-0"
                >
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{dim.title}</h3>
                  <p className="text-sm italic text-[var(--text-secondary)] mb-4">{dim.subTitle}</p>

                  <div className="flex flex-wrap items-center gap-3 text-sm mb-3">
                    <span className="font-medium">
                      Primary: <strong>{primaryPole}</strong> ({primaryPct}%)
                    </span>
                    <span className="text-[var(--text-secondary)]">•</span>
                    <span className="font-medium">
                      Secondary: <strong>{secondaryPole}</strong> ({secondaryPct}%)
                    </span>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        dom === "Mild"
                          ? "bg-green-100 text-green-800"
                          : dom === "Moderate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {dom} Preference
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        inf === "High"
                          ? "bg-green-100 text-green-800"
                          : inf === "Moderate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {inf} Influence
                    </span>
                  </div>

                  <div className="space-y-3 text-sm leading-relaxed">
                    {paragraphs.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="max-w-4xl mx-auto text-center mt-12">
        <button
          onClick={handleCouplesReportClick}
          className="inline-flex items-center gap-3 bg-[var(--accent)] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          Get Your Couple Insight Report
          <ArrowRight className="h-5 w-5" />
        </button>
      </section>
    </div>
  );
}
