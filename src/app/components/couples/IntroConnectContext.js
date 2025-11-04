// app/components/couples/IntroContext.jsx
export default function IntroContext({ partnerA, partnerB }) {
  const typeMap = {
    "C-L-I-S-H": "The Curator",
    "N-L-I-S-H": "The Academic",
    "C-L-O-S-H": "The Architect",
    "C-L-O-S-A": "The Engineer",
    "C-L-O-F-H": "The Navigator",
    "C-L-O-F-A": "The Pioneer",
    "C-L-I-S-H": "The Curator",
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
    "N-L-I-S-H": "The Academic",
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
    <div className="max-w-4xl mx-auto space-y-8 text-[var(--text-secondary)] leading-relaxed">
      <div className="space-y-6">
        <div className="text-[var(--text-secondary)] leading-relaxed max-w-4xl mx-auto">
          <p className="text-lg">
            This section explores the natural chemistry between {nameA} and {nameB}, how your two cognitive styles can
            complement each other when both partners are centered, self-aware, and communicating with openness.
            <strong>
              {" "}
              It offers a portrait of your potential harmony rather than a mirror of your current reality .
            </strong>{" "}
            Every relationship experiences moments of tension, misunderstanding, and growth; these are part of the
            shared human journey.
          </p>
          <p className="text-lg mt-3">
            <strong>Use this section as a guide to recognize your innate connection patterns</strong>, where emotional
            resonance, intellectual alignment, and mutual understanding flow easily, and where conscious effort can turn
            differences into strengths. By seeing how your partnership functions in its most balanced form, you can
            better navigate challenges while nurturing what makes your bond uniquely fulfilling.
          </p>
        </div>
      </div>
    </div>
  );
}
