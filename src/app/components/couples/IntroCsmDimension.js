// app/components/couples/IntroCsmDimension.js
export default function IntroCsmDimension() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 text-[var(--text-secondary)] leading-relaxed mb-8">
      <div className="card-gradient p-6 rounded-lg shadow-custom pb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 mt-8 text-left">
          Guia Rápido das Dimensões CSM
        </h2>
        <p className="text-lg mb-8 text-start">
          O Modelo do Espectro Cognitivo (CSM) revela como a sua mente funciona ao longo de cinco dimensões centrais da
          cognição. Cada dimensão possui dois polos complementares que descrevem formas diferentes — mas igualmente
          valiosas — de pensar, decidir e se relacionar. As porcentagens indicam o quanto você tende a um dos polos e o
          quanto o polo oposto ainda influencia a sua perspectiva.
        </p>
        <div className="space-y-8">
          {/* Dimension 1 */}
          <div>
            <h4 className="text-[var(--accent)] font-semibold text-xl md:text-2xl mb-2">
              1. Processamento de Informações
            </h4>
            <em className="font-light">Como você percebe e interpreta informações.</em>
            <p className="font-bold mt-6">Polos:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Percepção Abstrata (N):</strong> Enxerga padrões, conceitos e possibilidades além do que está na
                superfície.
              </li>
              <li>
                <strong>Foco Concreto (C):</strong> Prefere fatos tangíveis, detalhes do mundo real e realidades do
                presente.
              </li>
            </ul>
          </div>

          {/* Dimension 2 */}
          <div>
            <h4 className="text-[var(--accent)] font-semibold text-xl md:text-2xl mb-2">2. Tomada de Decisão</h4>
            <em className="font-light">Como você faz julgamentos e chega a conclusões.</em>
            <p className="font-bold mt-6">Polos:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Valores Empáticos (V):</strong> Guiado pelo impacto humano, pela emoção e pelo significado
                pessoal.
              </li>
              <li>
                <strong>Lógica Analítica (L):</strong> Guiada por estrutura, consistência e raciocínio objetivo.
              </li>
            </ul>
          </div>

          {/* Dimension 3 */}
          <div>
            <h4 className="text-[var(--accent)] font-semibold text-xl md:text-2xl mb-2">3. Orientação de Energia</h4>
            <em className="font-light">Para onde sua energia mental flui naturalmente.</em>
            <p className="font-bold mt-6">Polos:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Reflexão Interna (I):</strong> Extrai insights da introspecção, da solitude e do foco interno.
              </li>
              <li>
                <strong>Engajamento Externo (O):</strong> Ganha clareza por meio da interação, da ação e de estímulos
                externos.
              </li>
            </ul>
          </div>

          {/* Dimension 4 */}
          <div>
            <h4 className="text-[var(--accent)] font-semibold text-xl md:text-2xl mb-2">
              4. Abordagem em Relação à Mudança
            </h4>
            <em className="font-light">Como você lida com mudanças, planejamento e incerteza.</em>
            <p className="font-bold mt-6">Polos:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Estrutura Estável (S):</strong> Prefere ordem, previsibilidade e planejamento de longo prazo.
              </li>
              <li>
                <strong>Flexibilidade Adaptativa (F):</strong> Prosperam na espontaneidade, na exploração e em
                circunstâncias em constante evolução.
              </li>
            </ul>
          </div>

          {/* Dimension 5 */}
          <div>
            <h4 className="text-[var(--accent)] font-semibold text-xl md:text-2xl mb-2">5. Estilo Interpessoal</h4>
            <em className="font-light">Como você se conecta e colabora com os outros.</em>
            <p className="font-bold mt-6">Polos:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Harmonia Colaborativa (H):</strong> Busca conexão, propósito compartilhado e consenso.
              </li>
              <li>
                <strong>Autonomia Independente (A):</strong> Valoriza individualidade, autodireção e espaço pessoal.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
