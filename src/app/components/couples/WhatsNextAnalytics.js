// app/components/couples/WhatsNextAnalytics.js

import { useParams, useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function WhatsNextAnalytics() {
  const { siteId } = useParams();
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-[var(--text-secondary)] leading-relaxed my-8">
      {/* RESOLUTION STRATEGIES */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-[var(--surface-variant)] to-[var(--surface)] rounded-xl p-6 md:p-8 border border-[var(--border)] text-center">
          <p className="text-lg leading-relaxed text-[var(--text-secondary)] mb-8">
            Quer estratégias claras, passo a passo, escritas exclusivamente para vocês dois, com base nos seus
            arquétipos exatos e na situação atual de vocês?
          </p>

          <button
            onClick={() => router.push(`/dashboard/${siteId}/coaching/sessions`)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--primary)] hover:bg-[var(--accent)] text-white font-semibold text-medium md:text-lg rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-105"
          >
            Agende sua Sessão CSM
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-sm text-[var(--text-secondary)]/80 mt-5 italic">
            Um Especialista Certificado em CSM entregará um relatório totalmente personalizado, com estratégias práticas
            de resolução, feito exclusivamente para você.
          </p>
        </div>
      </div>
    </div>
  );
}
