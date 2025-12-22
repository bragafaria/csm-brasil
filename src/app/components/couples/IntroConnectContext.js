// app/components/couples/IntroContext.jsx

import { CircleCheckBig } from "lucide-react";
export default function IntroContext({ partnerA, partnerB }) {
  const typeMap = {
    "C-L-I-S-H": "The Curator",
    "N-L-I-S-H": "The Academic",
    "C-L-O-S-H": "The Architect",
    "C-L-O-S-A": "The Engineer",
    "C-L-O-F-H": "The Navigator",
    "C-L-O-F-A": "The Pioneer",
    "C-L-I-S-A": "The Analyst",
    "C-L-I-F-H": "The Mediator",
    "C-L-I-F-A": "The Maverick",
    "C-V-O-S-H": "The Steward",
    "C-V-O-S-A": "The Artisan",
    "C-V-O-F-H": "The Campaigner",
    "C-V-O-F-A": "The Adventurer",
    "C-V-I-S-H": "The Counselor",
    "C-V-I-S-A": "The Healer",
    "C-V-I-F-H": "The Peacemaker",
    "C-V-I-F-A": "The Empath",
    "N-L-O-S-H": "The Strategist",
    "N-L-O-S-A": "The Inventor",
    "N-L-O-F-H": "The Disruptor",
    "N-L-O-F-A": "The Revolutionary",
    "N-L-I-S-A": "The Theorist",
    "N-L-I-F-H": "The Innovator",
    "N-L-I-F-A": "The Visionary",
    "N-V-O-S-H": "The Ambassador",
    "N-V-O-S-A": "The Artist",
    "N-V-O-F-H": "The Catalyst",
    "N-V-O-F-A": "The Wanderer",
    "N-V-I-S-H": "The Mentor",
    "N-V-I-S-A": "The Sage",
    "N-V-I-F-H": "The Unifier",
    "N-V-I-F-A": "The Mystic",
  };

  const nameA = typeMap[partnerA.typeCode] || partnerA.typeCode;
  const nameB = typeMap[partnerB.typeCode] || partnerB.typeCode;

  return (
    <section className="card-gradient p-6 rounded-lg shadow-custom max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 text-left">Introduction</h2>

      <p className="text-lg text-[var(--text-secondary)] mb-4">
        This section highlights the natural chemistry between <strong>{nameA}</strong> and <strong>{nameB}</strong>,
        showing how your cognitive styles can complement each other when both partners feel grounded, self-aware, and
        open in communication.{" "}
        <span className="font-bold">
          Think of this as a portrait of your relationship at its most balanced, not a judgment of where you are today.
        </span>
      </p>

      <p className="text-lg text-[var(--text-secondary)] mb-6">
        Use this section to recognize your instinctive connection patterns:
      </p>

      {/* Icon-based points */}
      <div className="flex flex-col gap-4 items-center text-left">
        <div className="flex items-start gap-3 w-full max-w-xl">
          <CircleCheckBig className="min-w-6 min-h-6 text-[var(--accent)] mt-1" />
          <p className="text-[var(--text-secondary)] text-base leading-relaxed">
            where emotional resonance comes easily,
          </p>
        </div>

        <div className="flex items-start gap-3 w-full max-w-xl">
          <CircleCheckBig className="min-w-6 min-h-6 text-[var(--accent)] mt-1" />
          <p className="text-[var(--text-secondary)] text-base leading-relaxed">
            where intellectual synergy emerges naturally,
          </p>
        </div>

        <div className="flex items-start gap-3 w-full max-w-xl">
          <CircleCheckBig className="min-w-6 min-h-6 text-[var(--accent)] mt-1" />
          <p className="text-[var(--text-secondary)] text-base leading-relaxed">
            and where your differences can become strengths with a little intention.
          </p>
        </div>
      </div>

      <p className="text-lg text-[var(--text-secondary)] mt-6">
        By understanding how your partnership functions when both of you are centered, you gain a clearer view of the
        harmony you can build together and the pathways that lead there.
      </p>
    </section>
  );
}
