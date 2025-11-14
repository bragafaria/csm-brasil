// app/components/couples/CompatibilityRiskRanking.jsx

const FRICTION_GUIDES = {
  "Information Processing": {
    desc: "One partner may focus on practical, real-world details while the other sees patterns and possibilities. This can lead to frustration when one feels the other is missing the point or overcomplicating simple things. Daily decisions, planning, or even casual conversations might feel misaligned, with one wanting facts and the other wanting vision.",
  },
  "Decision-Making": {
    desc: "One partner prioritizes logic and fairness, while the other makes choices based on feelings and values. This can create tension when decisions feel cold or overly emotional to the other. Conflicts may arise over money, parenting, or moral issues, where one sees the other as too detached or too sentimental.",
  },
  "Energy Orientation": {
    desc: "One partner recharges alone and thinks deeply, while the other thrives in action and social settings. This can lead to misunderstandings about energy levels — one may feel overwhelmed by too much interaction, while the other feels neglected or bored. Plans for weekends, socializing, or downtime often clash.",
  },
  "Change Approach": {
    desc: "One partner prefers structure, plans, and closure, while the other embraces flexibility and spontaneity. This can cause stress around schedules, deadlines, or adapting to surprises. The structured partner may feel anxious without a plan, while the flexible one feels trapped by too much routine.",
  },
  "Interpersonal Style": {
    desc: "One partner values group harmony and collaboration, while the other prioritizes independence and personal goals. This can lead to tension in teamwork, decision-making, or emotional support. One may feel the other is too clingy or not supportive enough, while the other feels smothered or misunderstood.",
  },
};

export default function CompatibilityRiskRanking({ rankedDimensions }) {
  return (
    <section className="card-gradient p-6 rounded-lg shadow-custom max-w-4xl mx-auto mt-12">
      <div className="flex items-start gap-3 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4 mt-8 text-left">
            Compatibility Risk Ranking
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mt-">
            Dimensions ranked from <strong>most challenging</strong> to <strong>most aligned</strong> based on the
            Compatibility Alignment Score (CAS). Lower scores indicate higher friction.
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
              className={`p-5 rounded-lg border ${
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
                <p className="font-medium text-lg text-[var(--text-primary)] mb-1">Friction:</p>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">{FRICTION_GUIDES[dim.name].desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
