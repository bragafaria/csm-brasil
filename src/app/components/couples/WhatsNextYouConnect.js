// app/components/couples/WhatsNextYouConnect.js

import { useParams, useRouter } from "next/navigation";

export default function WhatsNextYouConnect() {
  const { siteId } = useParams();
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-[var(--text-secondary)] leading-relaxed my-8">
      <div className="card-gradient p-6 rounded-2xl shadow-custom">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 mt-4 text-left">E agora?</h2>

        <div className="space-y-6 text-[var(--text-secondary)]">
          <p className="text-lg leading-relaxed">
            Os insights de “Como Vocês se Conectam” revelam o ritmo mais profundo do relacionamento de vocês — a forma
            como seus dois estilos cognitivos podem se alinhar quando ambos estão centrados, abertos e sintonizados um
            com o outro. É um retrato de como a harmonia se manifesta quando o entendimento flui livremente e as
            diferenças se transformam em forças.
          </p>

          <p className="text-lg leading-relaxed">
            Mas a conexão real se sustenta por meio da reflexão, do diálogo e de pequenos ajustes intencionais ao longo
            do tempo. É aí que entram as <span className="font-semibold text-[var(--text-primary)]">Sessões CSM</span>.
          </p>

          <p className="text-lg leading-relaxed">
            Esses diálogos privados de autorreflexão ajudam você e seu parceiro a trazer o blueprint do CSM para a vida
            cotidiana. Seja para lidar com padrões recorrentes, melhorar a comunicação ou se reconectar com empatia,
            cada sessão oferece relatórios personalizados elaborados por um{" "}
            <span className="font-semibold text-[var(--text-primary)]">Especialista Certificado em CSM</span>, ajudando
            a transformar potencial em prática.
          </p>

          <p className="text-lg leading-relaxed">
            Você pode abrir uma sessão sempre que desejar explorar a conexão de vocês com mais profundidade, ganhar
            perspectiva sobre um desafio ou simplesmente crescerem juntos com mais consciência.
          </p>

          <div className="flex flex-col items-center space-y-4 gap-6 pb-8">
            <p className="italic text-lg text-[var(--text-primary)] text-center">
              Seu relatório mostra o que é possível.
              <span className="font-semibold"> As Sessões CSM</span> ajudam a tornar isso real.
            </p>

            <button
              onClick={() => router.push(`/dashboard/${siteId}/coaching/sessions`)}
              className="px-6 py-3 rounded-full font-medium transition-all bg-[var(--primary)] text-white shadow-md hover:scale-105"
            >
              Agende sua Sessão CSM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
