// app/components/couples/HowYouConnectPage.js
export default function HowYouConnectPage({ partnerA, partnerB, dynamics }) {
  return (
    <div className="space-y-12 mt-10">
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] text-center">Dynamics</h2>

      {/* PARAGRAPH-FORMATTED DYNAMICS */}
      <div className="text-[var(--text-secondary)] leading-relaxed max-w-4xl mx-auto space-y-4">
        {dynamics.dynamics.split("\n\n").map((paragraph, i) => (
          <p key={i} className="indent-0 text-lg">
            {paragraph}
          </p>
        ))}
      </div>

      {/* STRENGTHS & GROWTH AREAS */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="card-gradient p-6 rounded-lg shadow-custom">
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Strengths</h3>
          <div className="space-y-4">
            {dynamics.strengths.map((s, i) => (
              <div key={i}>
                <p className="font-medium text-[var(--text-primary)]">{s.title}</p>
                <p className="text-sm text-[var(--text-secondary)]">{s.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card-gradient p-6 rounded-lg shadow-custom">
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Growth Areas</h3>
          <div className="space-y-4">
            {dynamics.weaknesses.map((w, i) => (
              <div key={i}>
                <p className="font-medium text-[var(--text-primary)]">{w.title}</p>
                <p className="text-sm text-[var(--text-secondary)]">{w.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HARMONY-AUTONOMY INTERPLAY */}
      {dynamics.haInterplay && (
        <div className="card-gradient p-6 rounded-lg shadow-custom max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Harmony-Autonomy Interplay</h3>
          <div className="text-lg text-[var(--text-secondary)] space-y-4">
            {dynamics.haInterplay.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
