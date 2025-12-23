// app/components/couples/IntroContext.jsx
export default function IntroAnalytics({ partnerA, partnerB }) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 text-[var(--text-secondary)] leading-relaxed scroll mb-8">
      <div className="card-gradient p-6 rounded-lg shadow-custom">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 mt-8 text-left">
          Contexto Importante Antes da Leitura
        </h2>

        <div className="space-y-6">
          <div>
            <p className="text-lg leading-relaxed">
              Esta seção ajuda vocês a enxergarem onde suas mentes diferem naturalmente e como essas diferenças moldam
              as interações do dia a dia. Ela destaca de forma sutil onde podem surgir tensão, falhas de comunicação ou
              atrito emocional, não como alertas, mas como{" "}
              <span className="font-medium">convites para se compreenderem mais profundamente</span>.
            </p>

            <p className="text-lg leading-relaxed mt-3">
              Os gráficos de radar e as dimensões cognitivas revelam como cada parceiro naturalmente pensa, sente e
              responde ao mundo. O seu{" "}
              <span className="font-medium">Índice de Alinhamento de Compatibilidade (CAS)</span> mede o quanto os seus
              estilos mentais estão alinhados, enquanto o{" "}
              <span className="font-medium">Ranking de Risco de Compatibilidade</span> destaca quais áreas podem
              precisar de um pouco mais de atenção e cuidado.
            </p>

            <p className="text-lg leading-relaxed mt-3">
              Encare isso não como um rótulo, mas como um <span className="font-medium">mapa do relacionamento</span>,
              que indica onde os desafios tendem a surgir e mostra como eles podem se transformar em poderosas
              oportunidades de crescimento. Quando você entende as pequenas formas em que as mentes de vocês nem sempre
              estão totalmente em sintonia, passa a ter a capacidade de se encontrar com mais empatia, paciência e
              clareza.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
