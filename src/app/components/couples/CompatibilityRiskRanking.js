// app/components/couples/CompatibilityRiskRanking.jsx

const FRICTION_GUIDES = {
  "Processamento de Informações": {
    desc: "Um dos parceiros pode se concentrar em detalhes concretos e práticos, enquanto o outro se inclina para padrões, ideias e possibilidades. Isso pode gerar atrito quando um sente que o outro está analisando demais, ou quando o outro sente que seu parceiro está simplificando em excesso. O planejamento do dia a dia, a resolução de problemas e até conversas casuais podem parecer um pouco fora de sintonia, pois cada parceiro percebe e prioriza tipos diferentes de informação.",
  },
  "Tomada de Decisão": {
    desc: "Um dos parceiros tende a se apoiar na lógica e na consistência, enquanto o outro se guia por valores e pelo impacto emocional. Mal-entendidos surgem quando as decisões parecem frias ou distantes demais para um, ou subjetivas demais para o outro. Isso costuma aparecer em discussões sobre finanças, escolhas relacionadas à criação dos filhos ou dilemas morais, em que cada parceiro interpreta a decisão 'certa' a partir de uma lente interna diferente.",
  },
  "Orientação de Energia": {
    desc: "Um dos parceiros recarrega as energias por meio da solitude e da reflexão, enquanto o outro se sente energizado por atividade, envolvimento e conexão social. Isso pode gerar desencontros de ritmo e disponibilidade: um pode se sentir sobrecarregado de estímulos, enquanto o outro pode se sentir pouco conectado. Os conflitos geralmente surgem na forma como cada parceiro prefere passar o tempo livre, se recuperar do estresse ou equilibrar compromissos sociais.",
  },
  "Abordagem em Relação à Mudança": {
    desc: "Um dos parceiros se sente seguro com estrutura, previsibilidade e fechamento, enquanto o outro se sente confortável em se adaptar, improvisar e manter as coisas em aberto. A tensão pode surgir em torno de agendas, planejamento ou da forma de lidar com imprevistos. O parceiro mais estruturado pode se sentir desconfortável sem clareza, enquanto o mais flexível pode se sentir limitado por regras ou expectativas em excesso.",
  },
  "Estilo Interpessoal": {
    desc: "Um dos parceiros prioriza harmonia, colaboração e entendimento compartilhado, enquanto o outro foca em independência, autonomia e direção pessoal. Isso pode gerar atrito no trabalho em equipe, na expressão emocional ou na resolução de conflitos. Um pode sentir que o parceiro é distante ou excessivamente centrado em si mesmo, enquanto o outro pode se sentir sobrecarregado por expectativas emocionais ou pressões do grupo.",
  },
};

export default function CompatibilityRiskRanking({ rankedDimensions }) {
  return (
    <section className="card-gradient p-2 md:p-6 rounded-lg shadow-custom max-w-4xl mx-auto mt-12">
      <div className="flex items-start gap-3 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4 mt-8 text-center md:text-left">
            Ranking de Risco de Compatibilidade
          </h2>
          <p className="text-lg text-center md:text-left text-[var(--text-secondary)] mt-2">
            Dimensões classificadas da <strong>mais desafiadora</strong> para a <strong>mais alinhada</strong>, com base
            no Índice de Alinhamento de Compatibilidade (CAS). Pontuações mais baixas indicam maior probabilidade de
            atrito.
          </p>
        </div>
      </div>

      <div className="space-y-6 mt-8">
        {rankedDimensions.map((item, index) => {
          const dim = item.dim;
          const isPole1Dominant = item.pole === dim.pole1.name;
          const pole1 = dim.pole1;
          const pole2 = dim.pole2;

          return (
            <div
              key={dim.name}
              className={`px-2 py-4 md:p-5 rounded-lg border ${
                item.cas < 60
                  ? "bg-red-900/10 border-red-500/40"
                  : item.cas < 80
                    ? "bg-yellow-900/10 border-yellow-500/40"
                    : "bg-green-900/10 border-green-500/40"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-2xl font-bold ${
                      item.cas < 60 ? "text-red-400" : item.cas < 80 ? "text-yellow-400" : "text-green-400"
                    }`}
                  >
                    #{index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-xl text-[var(--text-primary)]">{dim.name}</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Poles: {pole1.letter} {pole1.name} / {pole2.letter} {pole2.name}
                    </p>
                    <p className="text-sm text-[var(--text-secondary)] italic">{dim.subtitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-lg">CAS: {item.cas} pontos</p>
                  <p
                    className={`text-xs font-medium ${
                      item.cas < 60 ? "text-red-400" : item.cas < 80 ? "text-yellow-400" : "text-green-400"
                    }`}
                  >
                    {item.cas < 60 ? "Atrito Alto" : item.cas < 80 ? "Atrito Moderado" : "Atrito Baixo"}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="font-medium text-lg text-[var(--text-primary)] mb-1">Atrito Potencial:</p>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">{FRICTION_GUIDES[dim.name].desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
