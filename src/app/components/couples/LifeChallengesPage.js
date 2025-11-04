// app/components/couples/LifeChallengesPage.js
const ORDER = [
  "careerAndPurposeChallenges",
  "wealthAndProsperityChallenges",
  "healthAndVitalityChallenges",
  "loveAndRomanceChallenges",
  "familyAndHomeLifeChallenges",
  "friendshipsAndCommunityChallenges",
  "growthAndDiscoveryChallenges",
  "joyAndAdventureChallenges",
  "spaceAndSerenityChallenges",
  "impactAndLegacyChallenges",
];

const titleMap = {
  careerAndPurposeChallenges: "Career & Purpose",
  wealthAndProsperityChallenges: "Wealth & Prosperity",
  healthAndVitalityChallenges: "Health & Vitality",
  loveAndRomanceChallenges: "Love & Romance",
  familyAndHomeLifeChallenges: "Family & Home Life",
  friendshipsAndCommunityChallenges: "Friendships & Community",
  growthAndDiscoveryChallenges: "Growth & Discovery",
  joyAndAdventureChallenges: "Joy & Adventure",
  spaceAndSerenityChallenges: "Space & Serenity",
  impactAndLegacyChallenges: "Impact & Legacy",
};

export default function LifeChallengesPage({ lifeChallenges }) {
  return (
    <div className="space-y-12">
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] text-center">Your 10 Life Challenges</h2>

      <div className="max-w-4xl mx-auto space-y-6">
        {ORDER.map((key) => {
          const c = lifeChallenges[key];
          if (!c) return null;

          return (
            <details key={key} className="card-gradient p-6 rounded-lg shadow-custom">
              <summary className="text-lg font-medium text-[var(--text-primary)] cursor-pointer list-none flex items-center gap-2">
                <span className="text-xl">{getIcon(key)}</span>
                {titleMap[key]}
              </summary>

              <div className="mt-5 space-y-6 text-sm">
                {/* DYNAMICS — PARAGRAPHS */}
                <div className="space-y-4">
                  {c.dynamics.split("\n\n").map((para, i) => (
                    <p key={i} className="text-[var(--text-secondary)]">
                      {para}
                    </p>
                  ))}
                </div>

                {/* CORE CHALLENGE */}
                <div>
                  <p className="font-medium text-[var(--accent)]">Core Challenge</p>
                  <div className="space-y-2 mt-1">
                    {c.coreChallenge.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* WHY THIS HAPPENS */}
                {c.whyThisHappens && (
                  <div>
                    <p className="font-medium text-[var(--accent)]">Why This Happens</p>
                    <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1 mt-1">
                      {c.whyThisHappens.split("\n").map((line, i) => {
                        const clean = line.replace(/^- /, "").trim();
                        return clean ? <li key={i}>{clean}</li> : null;
                      })}
                    </ul>
                  </div>
                )}

                {/* RED FLAGS */}
                {c.redFlags && (
                  <div>
                    <p className="font-medium text-[var(--accent)]">Red Flags</p>
                    <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1 mt-1">
                      {c.redFlags.split("\n").map((line, i) => {
                        const clean = line.replace(/^- /, "").trim();
                        return clean ? <li key={i}>{clean}</li> : null;
                      })}
                    </ul>
                  </div>
                )}

                {/* RESOLUTION STRATEGIES */}
                <div>
                  <p className="font-medium text-[var(--accent)]">Resolution Strategies</p>
                  <ol className="list-decimal list-inside text-[var(--text-secondary)] space-y-1 mt-1">
                    {c.resolutionStrategies.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                </div>

                {/* GROWTH OUTCOME */}
                <p className="italic text-[var(--text-secondary)]">{c.growthOutcome}</p>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}

function getIcon(key) {
  const icons = {
    careerAndPurposeChallenges: "Briefcase",
    wealthAndProsperityChallenges: "Dollar Sign",
    healthAndVitalityChallenges: "Heart Pulse",
    loveAndRomanceChallenges: "Heart",
    familyAndHomeLifeChallenges: "Home",
    friendshipsAndCommunityChallenges: "Users",
    growthAndDiscoveryChallenges: "Lightbulb",
    joyAndAdventureChallenges: "Mountain",
    spaceAndSerenityChallenges: "Moon",
    impactAndLegacyChallenges: "Trophy",
  };
  return icons[key] || "Circle";
}
