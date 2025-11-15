// app/components/couples/WhatsNextYouConnect.js

import { useParams, useRouter } from "next/navigation";

export default function WhatsNextYouConnect() {
  const { siteId } = useParams();
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-[var(--text-secondary)] leading-relaxed my-8">
      <div className="card-gradient p-6 rounded-2xl shadow-custom">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 mt-4 text-left">What’s Next?</h2>

        <div className="space-y-6 text-[var(--text-secondary)]">
          <p className="text-lg leading-relaxed">
            Your “How You Connect” insights reveal the deeper rhythm of your relationship, the way your two cognitive
            styles can align when both partners are grounded, open, and attuned to each other. It’s a portrait of what
            harmony looks like when understanding flows freely and differences become strengths.
          </p>

          <p className="text-lg leading-relaxed">
            But real connection is sustained through reflection, dialogue, and small, intentional shifts over time.
            That’s where <span className="font-semibold text-[var(--text-primary)]">CSM Sessions</span> come in.
          </p>

          <p className="text-lg leading-relaxed">
            These private self-reflection dialogues help you and your partner bring your CSM blueprint into everyday
            life. Whether you want to navigate recurring patterns, improve communication, or reconnect with empathy,
            each session offers personalized reports crafted by a{" "}
            <span className="font-semibold text-[var(--text-primary)]">CSM-Certified Expert</span> to help you translate
            potential into practice.
          </p>

          <p className="text-lg leading-relaxed">
            You can open a session anytime you wish to explore your connection more deeply, gain perspective on a
            challenge, or simply grow together with greater awareness.
          </p>

          <div className="flex flex-col items-center space-y-4 gap-6 pb-8">
            <p className="italic text-lg text-[var(--text-primary)] text-center">
              Your report shows what’s possible.
              <span className="font-semibold"> CSM Sessions</span> help you make it real.
            </p>
            <button
              onClick={() => router.push(`/dashboard/${siteId}/coaching/sessions`)}
              className="px-6 py-3 rounded-full font-medium transition-all bg-[var(--primary)] text-white shadow-md hover:scale-105"
            >
              Go to CSM Sessions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
