// app/components/couples/IntroContext.jsx

import { CircleCheckBig } from "lucide-react";
export default function IntroContext({ partnerA, partnerB }) {
  const typeMap = {
    "C-L-O-S-H": "O Arquiteto",
    "C-L-O-S-A": "O Engenheiro",
    "C-L-O-F-H": "O Navegador",
    "C-L-O-F-A": "O Pioneiro",
    "C-L-I-S-H": "O Curador",
    "C-L-I-S-A": "O Analista",
    "C-L-I-F-H": "O Mediador",
    "C-L-I-F-A": "O Independente",
    "C-V-O-S-H": "O Guardião",
    "C-V-O-S-A": "O Artesão",
    "C-V-O-F-H": "O Mobilizador",
    "C-V-O-F-A": "O Aventureiro",
    "C-V-I-S-H": "O Conselheiro",
    "C-V-I-S-A": "O Restaurador",
    "C-V-I-F-H": "O Pacificador",
    "C-V-I-F-A": "O Empático",
    "N-L-O-S-H": "O Estrategista",
    "N-L-O-S-A": "O Inventor",
    "N-L-O-F-H": "O Disruptor",
    "N-L-O-F-A": "O Revolucionário",
    "N-L-I-S-H": "O Acadêmico",
    "N-L-I-S-A": "O Teórico",
    "N-L-I-F-H": "O Inovador",
    "N-L-I-F-A": "O Visionário",
    "N-V-O-S-H": "O Embaixador",
    "N-V-O-S-A": "O Artista",
    "N-V-O-F-H": "O Catalisador",
    "N-V-O-F-A": "O Andarilho",
    "N-V-I-S-H": "O Mentor",
    "N-V-I-S-A": "O Sábio",
    "N-V-I-F-H": "O Unificador",
    "N-V-I-F-A": "O Místico",
  };

  const nameA = typeMap[partnerA.typeCode] || partnerA.typeCode;
  const nameB = typeMap[partnerB.typeCode] || partnerB.typeCode;

  return (
    <section className="card-gradient p-6 rounded-lg shadow-custom max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 text-left">Introdução</h2>

      <p className="text-lg text-[var(--text-secondary)] mb-4">
        Esta seção destaca a química natural entre <strong>{nameA}</strong> e <strong>{nameB}</strong>, mostrando como
        seus estilos cognitivos podem se complementar quando ambos os parceiros estão centrados, conscientes de si
        mesmos e abertos à comunicação.{" "}
        <span className="font-bold">
          Pense nisso como um retrato do relacionamento de vocês em seu estado mais equilibrado, e não como um
          julgamento de onde vocês estão hoje.
        </span>
      </p>

      <p className="text-lg text-[var(--text-secondary)] mb-6">
        Use esta seção para reconhecer os padrões instintivos de conexão de vocês:
      </p>

      {/* Icon-based points */}
      <div className="flex flex-col gap-4 items-center text-left">
        <div className="flex items-start gap-3 w-full max-w-xl">
          <CircleCheckBig className="min-w-6 min-h-6 text-[var(--accent)] mt-1" />
          <p className="text-[var(--text-secondary)] text-base leading-relaxed">
            onde a ressonância emocional flui com naturalidade,
          </p>
        </div>

        <div className="flex items-start gap-3 w-full max-w-xl">
          <CircleCheckBig className="min-w-6 min-h-6 text-[var(--accent)] mt-1" />
          <p className="text-[var(--text-secondary)] text-base leading-relaxed">
            onde a sinergia intelectual surge naturalmente,
          </p>
        </div>

        <div className="flex items-start gap-3 w-full max-w-xl">
          <CircleCheckBig className="min-w-6 min-h-6 text-[var(--accent)] mt-1" />
          <p className="text-[var(--text-secondary)] text-base leading-relaxed">
            e onde as diferenças de vocês podem se tornar forças com um pouco de intenção.
          </p>
        </div>
      </div>

      <p className="text-lg text-[var(--text-secondary)] mt-6">
        Ao compreender como a parceria de vocês funciona quando ambos estão centrados, vocês ganham uma visão mais clara
        da harmonia que podem construir juntos e dos caminhos que levam até ela.
      </p>
    </section>
  );
}
