// app/components/couples/LifeChallengesPage.jsx
export default function LifeChallengesPage({ lifeChallenges }) {
  const areas = [
    { key: "careerAndPurposeChallenges", title: "Career & Purpose" },
    { key: "wealthAndProsperityChallenges", title: "Wealth & Prosperity" },
    { key: "healthAndVitalityChallenges", title: "Health & Vitality" },
    { key: "loveAndRomanceChallenges", title: "Love & Romance" },
    { key: "familyAndHomeLifeChallenges", title: "Family & Home Life" },
    { key: "friendshipsAndCommunityChallenges", title: "Friendships & Community" },
    { key: "growthAndDiscoveryChallenges", title: "Growth & Discovery" },
    { key: "joyAndAdventureChallenges", title: "Joy & Adventure" },
    { key: "spaceAndSerenityChallenges", title: "Space & Serenity" },
    { key: "impactAndLegacyChallenges", title: "Impact & Legacy" },
  ];

  return (
    <div className="mt-10 space-y-12">
      {areas.map((area) => {
        const c = lifeChallenges[area.key];
        return (
          <section key={area.key} className="card-gradient p-6 rounded-lg shadow-custom max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 text-left">{area.title}</h2>

            {/* DYNAMICS */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">How You Naturally Operate</h3>
              <div className="space-y-4 text-lg text-[var(--text-secondary)]">
                {c.dynamics.split("\n\n").map((p, i) => (
                  <p key={i} className="mb-4 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* CORE CHALLENGE */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Core Challenge</h3>
              <p className="text-lg text-[var(--text-secondary)]">{c.coreChallenge}</p>
            </div>

            {/* WHY THIS HAPPENS */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Why This Happens</h3>
              <ul className="list-disc pl-6 space-y-2 text-lg text-[var(--text-secondary)]">
                {c.whyThisHappens.split("\n").map((line, i) => (
                  <li key={i}>{line.replace(/^- /, "").trim()}</li>
                ))}
              </ul>
            </div>

            {/* RED FLAGS */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Red Flags to Watch For</h3>
              <ul className="list-disc pl-6 space-y-2 text-lg text-[var(--text-secondary)]">
                {c.redFlags.split("\n").map((line, i) => (
                  <li key={i}>{line.replace(/^- /, "").trim()}</li>
                ))}
              </ul>
            </div>

            {/* RESOLUTION STRATEGIES */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Resolution Strategies</h3>
              <ol className="list-decimal pl-6 space-y-2 text-lg text-[var(--text-secondary)]">
                {c.resolutionStrategies.map((strat, i) => (
                  <li key={i}>{strat}</li>
                ))}
              </ol>
            </div>

            {/* GROWTH OUTCOME */}
            <div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Growth Outcome</h3>
              <p className="text-lg italic text-[var(--text-secondary)]">{c.growthOutcome}</p>
            </div>
          </section>
        );
      })}
    </div>
  );
}
