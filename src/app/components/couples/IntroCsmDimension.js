// app/components/couples/IntroCsmDimension.js
export default function IntroCsmDimension() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 text-[var(--text-secondary)] leading-relaxed mb-8">
      <div className="card-gradient p-6 rounded-lg shadow-custom pb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 mt-8 text-left">
          A Quick Look at the CSM Dimensions
        </h2>

        <p className="text-lg mb-8 text-start">
          The Cognitive Spectrum Model (CSM) reveals how your mind operates across five core dimensions of cognition.
          Each dimension has two complementary poles that describe different - but equally valuable - ways of thinking,
          deciding, and relating. Your percentages show how strongly you lean toward one pole and how much the opposite
          still shapes your perspective.
        </p>

        <div className="space-y-8">
          {/* Dimension 1 */}
          <div>
            <h4 className="text-[var(--accent)] font-semibold text-xl md:text-2xl mb-2">1. Information Processing</h4>
            <em className="font-light">How you perceive and interpret information.</em>
            <p className="font-bold mt-6">Poles:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Abstract Insight (N) :</strong> Sees patterns, concepts, and possibilities beyond the surface.
              </li>
              <li>
                <strong>Concrete Focus (C) :</strong> Prefers tangible facts, real-world details, and present realities.
              </li>
            </ul>
          </div>

          {/* Dimension 2 */}
          <div>
            <h4 className="text-[var(--accent)] font-semibold text-xl md:text-2xl  mb-2">2. Decision-Making</h4>
            <em className="font-light">How you make judgments and reach conclusions.</em>
            <p className="font-bold mt-6">Poles:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Empathic Values (V) :</strong> Guided by human impact, emotion, and personal meaning.
              </li>
              <li>
                <strong>Analytical Logic (L) :</strong> Guided by structure, consistency, and objective reasoning.
              </li>
            </ul>
          </div>

          {/* Dimension 3 */}
          <div>
            <h4 className="text-[var(--accent)] font-semibold text-xl md:text-2xl mb-2">3. Energy Orientation</h4>
            <em className="font-light">Where your mental energy naturally flows.</em>
            <p className="font-bold mt-6">Poles:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Inward Reflection (I) :</strong> Draws insight from introspection, solitude, and inner focus.
              </li>
              <li>
                <strong>Outward Engagement (O) :</strong> Gains clarity through interaction, action, and external input.
              </li>
            </ul>
          </div>

          {/* Dimension 4 */}
          <div>
            <h4 className="text-[var(--accent)] font-semibold text-xl md:text-2xl mb-2">4. Change Approach</h4>
            <em className="font-light">How you handle change, emlanning, and uncertainty.</em>
            <p className="font-bold mt-6">Poles:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Stable Structure (S) :</strong> Prefers order, predictability, and long-term planning.
              </li>
              <li>
                <strong>Adaptive Flexibility (F) :</strong> Thrives in spontaneity, exploration, and evolving
                circumstances.
              </li>
            </ul>
          </div>

          {/* Dimension 5 */}
          <div>
            <h4 className="text-[var(--accent)] font-semibold text-xl md:text-2xl mb-2">5. Interpersonal Style</h4>
            <em className="font-light">How you connect and collaborate with others.</em>
            <p className="font-bold mt-6">Poles:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Collaborative Harmony (H) :</strong> Seeks connection, shared purpose, and consensus.
              </li>
              <li>
                <strong>Independent Autonomy (A) :</strong> Values individuality, self-direction, and personal space.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
