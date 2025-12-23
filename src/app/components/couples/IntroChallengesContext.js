// app/components/couples/IntroContext.jsx
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
    <div className="max-w-4xl mx-auto space-y-8 text-[var(--text-secondary)] leading-relaxed">
      <div className="card-gradient p-6 rounded-lg shadow-custom">
        <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
          Contexto Importante Antes da Leitura
        </h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Desafios nas Áreas da Vida</h4>
            <p className="text-lg text-[var(--text-secondary)]">
              Esta seção revela onde as preferências cognitivas de vocês podem divergir naturalmente: as áreas do dia a
              dia em que tensão, falhas de comunicação ou atrito emocional tendem a surgir quando não são colocadas em
              palavras. Isso não são previsões de fracasso; são{" "}
              <span className="font-bold">possíveis pontos naturais de pressão</span> que, com consciência, se tornam
              portas de entrada para uma empatia mais profunda, equilíbrio e alinhamento.
            </p>

            <p className="text-lg text-[var(--text-secondary)] mt-3">
              Pense nisso como o mapa de crescimento do relacionamento de vocês. Ao trazer uma consciência gentil para
              esses pontos recorrentes de tensão, vocês transformam o atrito em compreensão mútua, fortalecendo tanto o
              desenvolvimento individual quanto a harmonia de longo prazo da parceria.
            </p>

            <p className="text-lg text-[var(--text-secondary)] mt-3 font-bold">
              Tenha em mente que nem todas as áreas da vida descritas aqui refletirão a realidade atual de vocês. Alguns
              desafios podem fazer total sentido agora, enquanto outros podem surgir mais adiante ou nunca se aplicar
              completamente. As experiências únicas, a comunicação e o crescimento conjunto de vocês determinam quais se
              tornam relevantes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
