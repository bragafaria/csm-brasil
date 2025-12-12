// app/components/couples/WhatsNextAnalytics.js

import { useParams, useRouter } from "next/navigation";

export default function WhatsNextAnalytics() {
  const { siteId } = useParams();
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-[var(--text-secondary)] leading-relaxed my-8">
      <div className="card-gradient p-4 md:p-6 rounded-2xl shadow-custom">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 mt-4 text-left">What’s Next?</h2>

        <div className="space-y-6 text-[var(--text-secondary)]">
          <p className="text-lg leading-relaxed">
            Your CSM results have revealed the unique patterns that shape how you think, decide, and connect. Growth
            happens when reflection turns into action.
          </p>

          <p className="text-lg leading-relaxed">
            That’s where <span className="font-semibold text-[var(--text-primary)]">CSM Sessions</span> come in. These
            guided self-reflection dialogues are designed to help you apply your CSM blueprint to real situations: from
            everyday communication and emotional balance to deeper questions about direction, purpose, or connection.
          </p>

          <p className="text-lg leading-relaxed">
            Each session is private and personally reviewed by a{" "}
            <span className="font-semibold text-[var(--text-primary)]">CSM-Certified Expert</span>, ensuring your
            reflections are understood with depth, care, and precision. You’ll receive insights that connect your unique
            cognitive style to real-life situations, turning self-awareness into meaningful action and helping you move
            forward with greater clarity and confidence.
          </p>

          <p className="text-lg leading-relaxed">
            You can open a session whenever you need clarity, perspective, or support. Simply describe what’s on your
            mind - whether it’s a challenge, a question about your results, or a situation you want to better understand
            - and you’ll receive a private, in-depth report.
          </p>

          <div className="flex flex-col items-center mt-10 pb-8 space-y-4 gap-6">
            <p className="italic text-lg text-[var(--text-primary)] text-center">
              Your CSM results give you the map.
              <span className="font-semibold"> CSM Sessions</span> help you walk the path.
            </p>
            <button
              onClick={() => router.push(`/dashboard/${siteId}/coaching/sessions`)}
              className="px-6 py-3 rounded-full font-medium transition-all bg-[var(--primary)] text-white shadow-md hover:scale-105"
            >
              Book Your CSM Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
