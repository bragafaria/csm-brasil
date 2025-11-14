// app/components/couples/HowYouConnectPage.js

import { CircleAlert, CheckCircle } from "lucide-react";
export default function HowYouConnectPage({ dynamics }) {
  return (
    <div className="space-y-12 mt-10">
      {/* DYNAMICS */}
      <section className="card-gradient p-6 rounded-lg shadow-custom max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 text-left">
          Relationship Dynamics
        </h2>
        <div className="space-y-4 text-lg text-[var(--text-secondary)]">
          {dynamics.dynamics.split("\n\n").map((paragraph, i) => (
            <p key={i} className="mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* HARMONY-AUTONOMY INTERPLAY */}
      {dynamics.haInterplay && (
        <section className="card-gradient p-6 rounded-lg shadow-custom max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 text-left">
            Harmony-Autonomy Interplay
          </h2>
          <div className="space-y-4 text-lg text-[var(--text-secondary)]">
            {dynamics.haInterplay.split("\n\n").map((paragraph, i) => (
              <p key={i} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* STRENGTHS & GROWTH AREAS — STACKED */}
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* STRENGTHS */}
        <section className="card-gradient p-6 rounded-lg shadow-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 text-left">Strengths</h2>

          {/* MINI-INTRO — SAME FONT SIZE & STYLE AS ALL PARAGRAPHS */}
          <p className="text-lg text-[var(--text-secondary)] mb-6">
            These are the core strengths that emerge naturally when your partnership is in balance. They reflect what
            makes your connection resilient, joyful, and deeply supportive.
          </p>

          <div className="space-y-6">
            {dynamics.strengths.map((s, i) => (
              <div key={i} className="border-b border-[var(--border)] pb-4 last:border-0 last:pb-0">
                <div className="flex flex-col justify-center">
                  <div className="flex gap-2">
                    <CheckCircle className="text-[var(--text-primary)]" />
                    <h3 className="font-bold text-lg text-[var(--text-primary)] mb-1">{s.title}</h3>
                  </div>
                  <div>
                    <p className="text-lg text-[var(--text-secondary)]">{s.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GROWTH AREAS */}
        <section className="card-gradient p-6 rounded-lg shadow-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 text-left">Growth Areas</h2>

          {/* MINI-INTRO — SAME FONT SIZE & STYLE AS ALL PARAGRAPHS */}
          <p className="text-lg text-[var(--text-secondary)] mb-6">
            These are opportunities for deeper alignment. With awareness and intention, even small shifts in these areas
            can transform challenges into sources of growth and closeness.
          </p>

          <div className="space-y-6">
            {dynamics.weaknesses.map((w, i) => (
              <div key={i} className="border-b border-[var(--border)] pb-4 last:border-0 last:pb-0">
                <div className="flex flex-col justify-center">
                  <div className="flex gap-2">
                    <CircleAlert className="text-[var(--text-primary)]" />
                    <h3 className="font-bold text-lg text-[var(--text-primary)] mb-1">{w.title}</h3>
                  </div>
                  <div>
                    <p className="text-lg text-[var(--text-secondary)]">{w.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
