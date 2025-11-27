// app/components/couples/CompatibilityRiskRanking.jsx

const FRICTION_GUIDES = {
  "Information Processing": {
    desc: "One partner may focus on concrete, practical details while the other gravitates toward patterns, ideas, and possibilities. This can create friction when one feels the other is overanalyzing, or when the other feels their partner is oversimplifying. Daily planning, problem-solving, and even casual conversations can feel slightly out of sync because each partner notices and prioritizes different kinds of information.",
  },
  "Decision-Making": {
    desc: "One partner leans on logic and consistency, while the other relies on values and emotional impact. Misunderstandings arise when decisions appear too detached to one partner or too subjective to the other. This often shows up in discussions about finances, parenting choices, or moral dilemmas, where each partner interprets the 'right' decision through a different internal lens.",
  },
  "Energy Orientation": {
    desc: "One partner recharges through solitude and reflection, while the other feels energized by activity, engagement, and social connection. This can lead to mismatches in pacing and availability, one may feel overstimulated while the other feels under-connected. Conflicts often show up in how each partner prefers to spend free time, recover from stress, or balance social plans.",
  },
  "Change Approach": {
    desc: "One partner feels secure with structure, predictability, and closure, while the other is comfortable adapting, improvising, and keeping things open. Tension can arise around scheduling, planning, or handling surprises. The structured partner may feel uneasy without clarity, while the flexible partner may feel restricted by too many rules or expectations.",
  },
  "Interpersonal Style": {
    desc: "One partner prioritizes harmony, collaboration, and shared understanding, while the other focuses on independence, autonomy, and personal direction. This can create friction in teamwork, emotional expression, or conflict resolution. One may feel their partner is too distant or self-focused, while the other may feel overwhelmed by emotional expectations or group pressures.",
  },
};

export default function CompatibilityRiskRanking({ rankedDimensions }) {
  return (
    <section className="card-gradient p-2 md:p-6 rounded-lg shadow-custom max-w-4xl mx-auto mt-12">
      <div className="flex items-start gap-3 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4 mt-8 text-center md:text-left">
            Compatibility Risk Ranking
          </h2>
          <p className="text-lg text-center md:text-left text-[var(--text-secondary)] mt-2">
            Dimensions ranked from <strong>most challenging</strong> to <strong>most aligned</strong> based on the
            Compatibility Alignment Score (CAS). Lower scores indicate a greater likelihood of friction.
          </p>
        </div>
      </div>

      <div className="space-y-6 mt-8">
        {rankedDimensions.map((item, index) => {
          const dim = item.dim;
          const isPole1Dominant = item.pole === dim.pole1.name;
          const pole1 = dim.pole1;
          const pole2 = dim.pole2;

          return (
            <div
              key={dim.name}
              className={`px-2 py-4 md:p-5 rounded-lg border ${
                item.cas < 60
                  ? "bg-red-900/10 border-red-500/40"
                  : item.cas < 80
                    ? "bg-yellow-900/10 border-yellow-500/40"
                    : "bg-green-900/10 border-green-500/40"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-2xl font-bold ${
                      item.cas < 60 ? "text-red-400" : item.cas < 80 ? "text-yellow-400" : "text-green-400"
                    }`}
                  >
                    #{index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-xl text-[var(--text-primary)]">{dim.name}</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Poles: {pole1.letter} {pole1.name} / {pole2.letter} {pole2.name}
                    </p>
                    <p className="text-sm text-[var(--text-secondary)] italic">{dim.subtitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-lg">CAS: {item.cas} points</p>
                  <p
                    className={`text-xs font-medium ${
                      item.cas < 60 ? "text-red-400" : item.cas < 80 ? "text-yellow-400" : "text-green-400"
                    }`}
                  >
                    {item.cas < 60 ? "High Friction" : item.cas < 80 ? "Moderate Friction" : "Low Friction"}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="font-medium text-lg text-[var(--text-primary)] mb-1">Potential Friction:</p>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">{FRICTION_GUIDES[dim.name].desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
