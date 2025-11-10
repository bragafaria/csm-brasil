// app/components/couples/IntroContext.jsx
export default function WhatsNextAnalytics({}) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 text-[var(--text-secondary)] leading-relaxed scroll mb-8">
      <div className="card-gradient p-6 rounded-lg shadow-custom">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 mt-8 text-left">
          Important Context Before Reading
        </h2>

        <div className="space-y-6">
          <div>
            <p className="text-lg leading-relaxed">
              This section helps you see where your minds naturally differ, and how those differences shape your daily
              interactions. It gently highlights where tension, miscommunication, or emotional friction might arise, not
              as warnings, but as <span className="font-medium">invitations to understand each other more deeply</span>.
            </p>

            <p className="text-lg leading-relaxed mt-3">
              The radar charts and cognitive dimensions reveal how each partner naturally thinks, feels, and responds to
              the world. Your <span className="font-medium">Compatibility Alignment Score (CAS)</span> measures how
              closely your mental styles align, while the{" "}
              <span className="font-medium">Compatibility Risk Ranking</span> highlights which areas may need a little
              extra awareness and care.
            </p>

            <p className="text-lg leading-relaxed mt-3">
              Think of this not as a label, but as a <span className="font-medium">relationship map</span>, one that
              points out where challenges are likely to surface and shows how they can become powerful growth
              opportunities. When you understand the small ways your minds don’t quite sync, you gain the ability to
              meet each other with empathy, patience, and clarity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
