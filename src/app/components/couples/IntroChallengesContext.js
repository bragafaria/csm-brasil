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
      <div className="card-gradient p-6 rounded-lg shadow-custom">
        <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
          Important Context Before Reading
        </h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-[var(--text-primary)] mb-2">The Life Areas Challenges</h4>
            <p className="text-lg text-[var(--text-secondary)]">
              This section reveals where your cognitive preferences may naturally diverge, the everyday areas where
              tension, miscommunication, or emotional friction are most likely to appear. These insights are not
              forecasts of conflict or failure, but tools for awareness. Every strong relationship must balance
              difference with understanding, and this report helps you do just that.
            </p>
            <p className="text-lg text-[var(--text-secondary)] mt-3">
              Think of this section as the growth map of your relationship. It highlights not only your recurring stress
              points but also the doorways to deeper empathy and balance. By bringing consciousness to these areas, you
              can turn friction into transformation, strengthening both your individual development and the long-term
              harmony of your partnership.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
