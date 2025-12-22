// app/components/couples/LifeChallengesPage.jsx
import {
  Building2,
  HandCoins,
  HeartPulse,
  MessageCircleHeart,
  HouseHeart,
  Handshake,
  Sprout,
  Haze,
  TreePalm,
  Trophy,
  ArrowRight,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function LifeChallengesPage({ lifeChallenges }) {
  const { siteId } = useParams();
  const router = useRouter();
  const areas = [
    { key: "careerAndPurposeChallenges", title: "Career & Purpose", icon: Building2 },
    { key: "wealthAndProsperityChallenges", title: "Wealth & Prosperity", icon: HandCoins },
    { key: "healthAndVitalityChallenges", title: "Health & Vitality", icon: HeartPulse },
    { key: "loveAndRomanceChallenges", title: "Love & Romance", icon: MessageCircleHeart },
    { key: "familyAndHomeLifeChallenges", title: "Family & Home Life", icon: HouseHeart },
    { key: "friendshipsAndCommunityChallenges", title: "Friendships & Community", icon: Handshake },
    { key: "growthAndDiscoveryChallenges", title: "Growth & Discovery", icon: Sprout },
    { key: "joyAndAdventureChallenges", title: "Joy & Adventure", icon: Haze },
    { key: "spaceAndSerenityChallenges", title: "Space & Serenity", icon: TreePalm },
    { key: "impactAndLegacyChallenges", title: "Impact & Legacy", icon: Trophy },
  ];

  return (
    <div className="mt-10 space-y-12">
      {areas.map((area) => {
        const c = lifeChallenges[area.key];
        const Icon = area.icon;
        return (
          <section key={area.key} className="card-gradient p-6 rounded-lg shadow-custom max-w-4xl mx-auto">
            <div className="flex items-center gap-2 p-4 bg-[var(--surface3)] rounded-lg mb-8">
              <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-[var(--text-primary)] text-left">
                <Icon className="w-7 h-7 md:w-8 md:h-8" />
                {area.title}
              </h2>
            </div>

            {/* DYNAMICS */}
            {/* <div className="mb-8">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">How You Naturally Operate</h3>
              <div className="space-y-4 text-lg text-[var(--text-secondary)]">
              
                {Array.isArray(c.dynamics)
                  ? c.dynamics.map((paragraph, i) => (
                      <p key={i} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))
                  : c.dynamics.split("\n\n").map((p, i) => (
                      <p key={i} className="mb-4 last:mb-0">
                        {p}
                      </p>
                    ))}
              </div>
            </div>*/}

            {/* CORE CHALLENGE */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Possible Challenges</h3>
              <p className="text-lg text-[var(--text-secondary)]">{c.coreChallenge}</p>
            </div>

            {/* WHY THIS HAPPENS */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Why This Happens</h3>
              <ul className="list-disc pl-6 space-y-2 text-lg text-[var(--text-secondary)]">
                {c.whyThisHappens.split("\n").map((line, i) => {
                  const trimmedLine = line.replace(/^- /, "").trim();
                  return trimmedLine ? <li key={i}>{trimmedLine}</li> : null;
                })}
              </ul>
            </div>

            {/* RED FLAGS */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Red Flags to Watch For</h3>
              <ul className="list-disc pl-6 space-y-2 text-lg text-[var(--text-secondary)]">
                {c.redFlags.split("\n").map((line, i) => {
                  const trimmedLine = line.replace(/^- /, "").trim();
                  return trimmedLine ? <li key={i}>{trimmedLine}</li> : null;
                })}
              </ul>
            </div>
          </section>
        );
      })}
      {/* RESOLUTION STRATEGIES */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-[var(--surface-variant)] to-[var(--surface)] rounded-xl p-6 md:p-8 border border-[var(--border)] text-center">
          <p className="text-lg leading-relaxed text-[var(--text-secondary)] mb-8">
            Want clear, step-by-step strategies written exclusively for the two of you, based on your exact archetypes
            and current situation?
          </p>

          <button
            onClick={() => router.push(`/dashboard/${siteId}/coaching/sessions`)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--primary)] hover:bg-[var(--accent)] text-white font-semibold text-medium md:text-lg rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-105"
          >
            Book Your CSM Session
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-sm text-[var(--text-secondary)]/80 mt-5 italic">
            A CSM-Certified Expert will deliver a fully personalized report with practical resolution strategies
            tailored just for you.
          </p>
        </div>
      </div>
    </div>
  );
}
