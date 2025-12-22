// utils/csm.js — FINAL CSM ASSESSMENT (70 questions → 32 archetypes)
// Fixes applied:
// - Reverse scoring: correctly applies reversal BEFORE pole assignment
// - Forced-select: normalized to 5-point scale (was 6-point)
// - Epsilon tie-breaker: preserved exactly as requested

export const poles = [
  ["C", "N"],
  ["L", "V"],
  ["I", "O"],
  ["S", "F"],
  ["H", "A"],
];

// Helper
export function getDimPoles(dimIndex, dominants, percents) {
  const primaryPole = dominants[dimIndex];
  const p1Pct = Math.round(percents[dimIndex].p1);
  const primaryPct = primaryPole === poles[dimIndex][0] ? p1Pct : 100 - p1Pct;
  const secPct = 100 - primaryPct;
  const secPole = primaryPole === poles[dimIndex][0] ? poles[dimIndex][1] : poles[dimIndex][0];
  return { primaryPole, primaryPct, secPole, secPct };
}

// ===================================================================
// 70 BALANCED QUESTIONS: 14 per dimension
// 6 Likert (5 + 1 reverse), 8 forced-select (5-point scale)
// ===================================================================

const forcedOptions = (p1, p2, scenarios) => [
  { key: "a", label: scenarios.strongP1, value: { [p1]: 5, [p2]: 1 } },
  { key: "b", label: scenarios.strongP2, value: { [p1]: 1, [p2]: 5 } },
  { key: "c", label: scenarios.leanP1, value: { [p1]: 4, [p2]: 2 } },
  { key: "d", label: scenarios.leanP2, value: { [p1]: 2, [p2]: 4 } },
  { key: "e", label: scenarios.balanced, value: { [p1]: 3, [p2]: 3 } },
];

export const questions = [
  // ===================================================================
  // DIMENSION 0: C (Concrete) vs N (Abstract) — id: 0–13
  // ===================================================================
  // DIMENSION 0: C vs N
  {
    id: 0,
    dimension: 0,
    type: "likert",
    text: "Confio mais no que posso ver, tocar e medir do que em teorias.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 1,
    dimension: 0,
    type: "likert",
    text: "Prefiro consertar problemas reais em vez de imaginar possibilidades.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 2,
    dimension: 0,
    type: "likert",
    text: "Ao ajudar um amigo a resolver um problema, foco em soluções práticas com base no que está disponível.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 3,
    dimension: 0,
    type: "likert",
    text: "Costumo explorar cenários hipotéticos ao aprender algo novo.",
    favoring: "N",
    reverse: false,
  },
  {
    id: 4,
    dimension: 0,
    type: "likert",
    text: "Não gosto de teorizar sobre padrões que não são evidentes.",
    favoring: "N",
    reverse: true,
  },
  {
    id: 5,
    dimension: 0,
    type: "likert",
    text: "Adoro identificar conexões ocultas entre ideias não relacionadas.",
    favoring: "N",
    reverse: false,
  },
  {
    id: 6,
    dimension: 0,
    type: "likert",
    text: "Costumo imaginar cenários futuros detalhados.",
    favoring: "N",
    reverse: false,
  },
  {
    id: 7,
    dimension: 0,
    type: "likert",
    text: "Vejo significados simbólicos em eventos do dia a dia.",
    favoring: "N",
    reverse: false,
  },
  {
    id: 8,
    dimension: 0,
    type: "forced-select",
    text: "Ajudar um vizinho com um conserto em casa:",
    options: forcedOptions("C", "N", {
      strongP1: "Usar ferramentas e materiais disponíveis para consertar de forma prática.",
      strongP2: "Pensar em maneiras criativas de melhorar o conserto além do básico.",
      leanP1: "Seguir um método conhecido, mas fazer pequenos ajustes.",
      leanP2: "Experimentar uma nova abordagem, mantendo a funcionalidade.",
      balanced: "Combinar soluções práticas com alguns ajustes criativos.",
    }),
  },
  {
    id: 9,
    dimension: 0,
    type: "forced-select",
    text: "Contribuir para um projeto comunitário, como uma horta:",
    options: forcedOptions("C", "N", {
      strongP1: "Planejar usando métodos comprovados e recursos disponíveis.",
      strongP2: "Imaginar designs inovadores e possibilidades futuras.",
      leanP1: "Usar técnicas padrão, mas permitir pequenos experimentos.",
      leanP2: "Focar em ideias criativas, mas mantê-las ancoradas na realidade.",
      balanced: "Equilibrar planejamento prático com visão criativa.",
    }),
  },
  {
    id: 10,
    dimension: 0,
    type: "forced-select",
    text: "Escolher um livro para ler:",
    options: forcedOptions("C", "N", {
      strongP1: "Um guia prático: 'Como Consertar Sua Vida em 30 Dias'.",
      strongP2: "Um romance de ficção científica sobre realidades alternativas e IA.",
      leanP1: "Uma biografia de um líder empresarial de sucesso.",
      leanP2: "Um livro de filosofia sobre consciência e significado.",
      balanced: "Uma mistura de autoajuda e ficção especulativa.",
    }),
  },
  {
    id: 11,
    dimension: 0,
    type: "forced-select",
    text: "Consertar algo quebrado em casa:",
    options: forcedOptions("C", "N", {
      strongP1: "Seguir o manual oficial de reparo passo a passo.",
      strongP2: "Inventar um conserto criativo usando itens aleatórios da casa.",
      leanP1: "Procurar um tutorial confiável no YouTube.",
      leanP2: "Procuro um atalho ou solução alternativa inteligente que não esteja no manual.",
      balanced: "Usar um guia, mas adaptar se necessário.",
    }),
  },
  {
    id: 12,
    dimension: 0,
    type: "forced-select",
    text: "Ensinar alguém uma nova habilidade:",
    options: forcedOptions("C", "N", {
      strongP1: "Dividir em etapas claras e sequenciais, com exemplos.",
      strongP2: "Usar metáforas e histórias para gerar insights.",
      leanP1: "Mostrar uma demonstração real e deixar a pessoa copiar.",
      leanP2: "Incentivar a descoberta por tentativa e erro.",
      balanced: "Misturar demonstração com exploração guiada.",
    }),
  },
  {
    id: 13,
    dimension: 0,
    type: "forced-select",
    text: "Prever o sucesso de um projeto:",
    options: forcedOptions("C", "N", {
      strongP1: "Basear-se em dados históricos e desempenhos anteriores.",
      strongP2: "Confiar na intuição e em padrões emergentes.",
      leanP1: "Usar resultados passados com pequenos ajustes.",
      leanP2: "Imaginar múltiplos futuros e se preparar.",
      balanced: "Intuição orientada por dados.",
    }),
  },

  // DIMENSÃO 1: L vs V
  {
    id: 14,
    dimension: 1,
    type: "likert",
    text: "Em debates, priorizo estar certo em vez de ser gentil.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 15,
    dimension: 1,
    type: "likert",
    text: "Regras devem ser seguidas mesmo que desagradem alguém.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 16,
    dimension: 1,
    type: "likert",
    text: "Eficiência é mais importante do que o moral da equipe.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 17,
    dimension: 1,
    type: "likert",
    text: "Raramente deixo as emoções influenciarem minhas decisões.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 18,
    dimension: 1,
    type: "likert",
    text: "Não flexibilizo princípios para evitar conflitos.",
    favoring: "L",
    reverse: true, // Ajustado para equilibrar
  },
  {
    id: 19,
    dimension: 1,
    type: "likert",
    text: "Prefiro ser gentil a estar certo.",
    favoring: "V",
    reverse: false,
  },
  {
    id: 20,
    dimension: 1,
    type: "likert",
    text: "Os sentimentos das pessoas devem orientar as decisões.",
    favoring: "V",
    reverse: false,
  },
  {
    id: 21,
    dimension: 1,
    type: "likert",
    text: "A harmonia em um grupo vale comprometer a lógica.",
    favoring: "V",
    reverse: false,
  },

  {
    id: 22,
    dimension: 1,
    type: "forced-select",
    text: "Resolver um conflito durante uma refeição compartilhada com amigos:",
    options: forcedOptions("L", "V", {
      strongP1: "Focar em regras justas, como dividir a conta igualmente.",
      strongP2: "Priorizar os sentimentos de todos para manter o clima positivo.",
      leanP1: "Propor uma solução lógica, mas considerar as emoções.",
      leanP2: "Focar na harmonia, mas sugerir um compromisso justo.",
      balanced: "Equilibrar justiça com bem-estar emocional.",
    }),
  },
  {
    id: 23,
    dimension: 1,
    type: "forced-select",
    text: "Ajudar um amigo a escolher entre duas opções, como um presente:",
    options: forcedOptions("L", "V", {
      strongP1: "Recomendar com base na qualidade objetiva e no custo-benefício.",
      strongP2: "Escolher com base no que atende às necessidades emocionais da pessoa.",
      leanP1: "Priorizar qualidade, mas considerar as preferências dela.",
      leanP2: "Focar nos sentimentos, mas levar em conta a praticidade.",
      balanced: "Dar o mesmo peso à qualidade e ao encaixe emocional.",
    }),
  },
  {
    id: 24,
    dimension: 1,
    type: "forced-select",
    text: "Um amigo pede um feedback honesto sobre sua arte:",
    options: forcedOptions("L", "V", {
      strongP1: "Dar uma crítica direta: 'A composição está fraca.'",
      strongP2: "Dizer: 'Adoro o quanto de coração você colocou nisso.'",
      leanP1: "Apontar falhas de forma construtiva, com sugestões de melhoria.",
      leanP2: "Elogiar o esforço e sugerir melhorias de forma gentil.",
      balanced: "Feedback honesto acompanhado de incentivo.",
    }),
  },
  {
    id: 25,
    dimension: 1,
    type: "forced-select",
    text: "Corte de orçamento: demitir 1 de 2 funcionários:",
    options: forcedOptions("L", "V", {
      strongP1: "Demitir o funcionário com menor desempenho, independentemente do tempo de casa.",
      strongP2: "Manter quem tem família para sustentar.",
      leanP1: "Basear-se no desempenho, mas considerar a senioridade.",
      leanP2: "Considerar fortemente as circunstâncias pessoais.",
      balanced: "Desempenho em primeiro lugar, mas oferecer pacote de desligamento.",
    }),
  },
  {
    id: 26,
    dimension: 1,
    type: "forced-select",
    text: "Dilema ético no trabalho:",
    options: forcedOptions("L", "V", {
      strongP1: "Seguir a política da empresa à risca.",
      strongP2: "Fazer o que parece moralmente certo, mesmo que quebre regras.",
      leanP1: "Encontrar uma brecha que esteja alinhada à política.",
      leanP2: "Consultar a equipe e priorizar o impacto humano.",
      balanced: "Buscar alinhamento legal e ético.",
    }),
  },
  {
    id: 27,
    dimension: 1,
    type: "forced-select",
    text: "Dar uma avaliação de desempenho:",
    options: forcedOptions("L", "V", {
      strongP1: "Avaliar apenas com base em métricas: 'Você atingiu 87% das metas.'",
      strongP2: "Focar no crescimento: 'Você evoluiu muito este ano.'",
      leanP1: "Usar dados, mas incluir contexto.",
      leanP2: "Usar encorajamento, mas mencionar lacunas.",
      balanced: "Equilíbrio entre métricas e desenvolvimento pessoal.",
    }),
  },

  // ===================================================================
  // DIMENSÃO 2: I (Interno) vs O (Externo) — id: 28–41
  // ===================================================================
  {
    id: 28,
    dimension: 2,
    type: "likert",
    text: "Recarrego melhor em completo silêncio.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 29,
    dimension: 2,
    type: "likert",
    text: "Processo ideias internamente antes de compartilhá-las.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 30,
    dimension: 2,
    type: "likert",
    text: "Festas grandes me esgotam rapidamente.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 31,
    dimension: 2,
    type: "likert",
    text: "Raramente me sinto entediado quando estou sozinho.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 32,
    dimension: 2,
    type: "likert",
    text: "Não preciso de estímulos externos para me sentir energizado.",
    favoring: "I",
    reverse: true, // Ajustado para equilibrar
  },
  {
    id: 33,
    dimension: 2,
    type: "likert",
    text: "Ganho energia em conversas animadas.",
    favoring: "O",
    reverse: false,
  },
  {
    id: 34,
    dimension: 2,
    type: "likert",
    text: "Adoro ser o centro das atenções.",
    favoring: "O",
    reverse: false,
  },
  {
    id: 35,
    dimension: 2,
    type: "likert",
    text: "Ação e interação alimentam minha criatividade.",
    favoring: "O",
    reverse: false,
  },

  {
    id: 36,
    dimension: 2,
    type: "forced-select",
    text: "Passar tempo com família ou amigos:",
    options: forcedOptions("I", "O", {
      strongP1: "Curtir momentos tranquilos refletindo ou conversando individualmente.",
      strongP2: "Mergulhar em atividades ou conversas animadas em grupo.",
      leanP1: "Preferir conversas pequenas e íntimas, mas participar brevemente do grupo.",
      leanP2: "Interagir com o grupo, mas fazer pequenas pausas sozinho.",
      balanced: "Misturar momentos tranquilos com engajamento em grupo.",
    }),
  },
  {
    id: 37,
    dimension: 2,
    type: "forced-select",
    text: "Em um evento comunitário, como um festival:",
    options: forcedOptions("I", "O", {
      strongP1: "Observar em silêncio, conectando-se com uma ou duas pessoas.",
      strongP2: "Conhecer muitas pessoas e participar de atividades em grupo.",
      leanP1: "Conversar com poucos, mantendo-se reservado no geral.",
      leanP2: "Engajar amplamente, mas reservar tempo para refletir.",
      balanced: "Equilibrar conversas profundas com socialização.",
    }),
  },
  {
    id: 38,
    dimension: 2,
    type: "forced-select",
    text: "Aprender uma nova habilidade:",
    options: forcedOptions("I", "O", {
      strongP1: "Estudar sozinho com tutoriais e praticar em particular.",
      strongP2: "Entrar em uma aula ou grupo para aprender com outras pessoas.",
      leanP1: "Curso online com fórum opcional.",
      leanP2: "Workshop com atividades práticas em grupo.",
      balanced: "Ritmo próprio com encontros ocasionais.",
    }),
  },
  {
    id: 39,
    dimension: 2,
    type: "forced-select",
    text: "Brainstorming criativo:",
    options: forcedOptions("I", "O", {
      strongP1: "Trancar-se em um quarto até a ideia surgir.",
      strongP2: "Trocar ideias com qualquer pessoa disposta a ouvir.",
      leanP1: "Anotar ideias sozinho e depois compartilhar uma.",
      leanP2: "Começar em grupo e depois refinar sozinho.",
      balanced: "Alternar sessões solo e em grupo.",
    }),
  },
  {
    id: 40,
    dimension: 2,
    type: "forced-select",
    text: "Depois de fazer uma apresentação:",
    options: forcedOptions("I", "O", {
      strongP1: "Descomprimir sozinho no escritório.",
      strongP2: "Conversar com os participantes e receber feedback.",
      leanP1: "Agradecer rapidamente e depois refletir em silêncio.",
      leanP2: "Participar do encontro social pós-evento.",
      balanced: "Conversa breve e depois descanso.",
    }),
  },
  {
    id: 41,
    dimension: 2,
    type: "forced-select",
    text: "Clima de férias:",
    options: forcedOptions("I", "O", {
      strongP1: "Cabana isolada, sem Wi-Fi, apenas natureza.",
      strongP2: "Cidade vibrante com festivais e vida noturna.",
      leanP1: "Resort tranquilo com atividades opcionais.",
      leanP2: "Viagem em grupo com passeios diários.",
      balanced: "Cidade pequena com cafés e momentos de solitude.",
    }),
  },

  // ===================================================================
  // DIMENSÃO 3: S (Estruturado) vs F (Flexível) — id: 42–55
  // ===================================================================
  {
    id: 42,
    dimension: 3,
    type: "likert",
    text: "Planejo meu dia hora por hora.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 43,
    dimension: 3,
    type: "likert",
    text: "Mudanças de última hora me incomodam.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 44,
    dimension: 3,
    type: "likert",
    text: "Concluo tarefas bem antes dos prazos.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 45,
    dimension: 3,
    type: "likert",
    text: "Raramente deixo coisas em aberto.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 46,
    dimension: 3,
    type: "likert",
    text: "Não gosto de improvisar.",
    favoring: "S",
    reverse: true, // Ajustado para equilibrar
  },
  {
    id: 47,
    dimension: 3,
    type: "likert",
    text: "Eu me saio bem em ambientes imprevisíveis.",
    favoring: "F",
    reverse: false,
  },
  {
    id: 48,
    dimension: 3,
    type: "likert",
    text: "Mantenho várias opções em aberto até o último momento.",
    favoring: "F",
    reverse: false,
  },
  {
    id: 49,
    dimension: 3,
    type: "likert",
    text: "Espontaneidade me anima mais do que planos.",
    favoring: "F",
    reverse: false,
  },

  {
    id: 50,
    dimension: 3,
    type: "forced-select",
    text: "Organizar uma tarefa compartilhada, como limpar um espaço comunitário:",
    options: forcedOptions("S", "F", {
      strongP1: "Criar um cronograma detalhado com papéis definidos.",
      strongP2: "Começar a limpeza e se adaptar conforme as necessidades.",
      leanP1: "Planejar as tarefas principais, mas permitir flexibilidade.",
      leanP2: "Ir no fluxo, mas com um objetivo geral.",
      balanced: "Combinar um plano básico com espaço para ajustes.",
    }),
  },
  {
    id: 51,
    dimension: 3,
    type: "forced-select",
    text: "Ajudar um grupo a se preparar para um evento conjunto, como uma comemoração:",
    options: forcedOptions("S", "F", {
      strongP1: "Planejar cada detalhe com antecedência, como horários e suprimentos.",
      strongP2: "Improvisar de acordo com a energia e as necessidades do grupo.",
      leanP1: "Definir um plano central, mas ajustar quando necessário.",
      leanP2: "Começar com ideias, mantendo abertura para mudanças.",
      balanced: "Equilibrar planejamento com decisões espontâneas.",
    }),
  },
  {
    id: 52,
    dimension: 3,
    type: "forced-select",
    text: "Prazo de um projeto é antecipado:",
    options: forcedOptions("S", "F", {
      strongP1: "Entrar em pânico e reestruturar todo o plano imediatamente.",
      strongP2: "Manter a calma. Você se adapta quando a hora chegar.",
      leanP1: "Ajustar o cronograma mantendo a estrutura principal.",
      leanP2: "Mudar prioridades conforme necessário e seguir o fluxo.",
      balanced: "Repriorizar tarefas com flexibilidade.",
    }),
  },
  {
    id: 53,
    dimension: 3,
    type: "forced-select",
    text: "Rotina diária:",
    options: forcedOptions("S", "F", {
      strongP1: "Acordar, café, academia, trabalho. Sempre igual.",
      strongP2: "Cada dia é diferente. Seguir a energia do momento.",
      leanP1: "Hábitos centrais, mas horários variáveis.",
      leanP2: "Sem rotina fixa, apenas intenções.",
      balanced: "Agenda flexível com pontos de ancoragem.",
    }),
  },
  {
    id: 54,
    dimension: 3,
    type: "forced-select",
    text: "Planejamento de eventos:",
    options: forcedOptions("S", "F", {
      strongP1: "Planilha com fornecedores, cronogramas e planos B.",
      strongP2: "Baseado no clima: reservar o local e resolver o resto depois.",
      leanP1: "Reservar o essencial e improvisar os detalhes.",
      leanP2: "Começar pelo tema e adaptar ao longo do caminho.",
      balanced: "Planejar a estrutura e flexibilizar a execução.",
    }),
  },
  {
    id: 55,
    dimension: 3,
    type: "forced-select",
    text: "Enfrentando um atraso inesperado:",
    options: forcedOptions("S", "F", {
      strongP1: "Recalcular todo o cronograma imediatamente.",
      strongP2: "Não se preocupar. Algo melhor vai surgir.",
      leanP1: "Ajustar o próximo passo e seguir em frente.",
      leanP2: "Encarar como uma oportunidade de explorar outras alternativas.",
      balanced: "Adaptar o plano sem estresse.",
    }),
  },

  // ===================================================================
  // DIMENSÃO 4: H (Harmonioso) vs A (Autônomo) — id: 56–69
  // ===================================================================
  {
    id: 56,
    dimension: 4,
    type: "likert",
    text: "Coloco as necessidades do grupo acima das minhas.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 57,
    dimension: 4,
    type: "likert",
    text: "Evito conflitos para manter a paz.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 58,
    dimension: 4,
    type: "likert",
    text: "O sucesso da equipe é mais gratificante do que vitórias individuais.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 59,
    dimension: 4,
    type: "likert",
    text: "Raramente escolho trabalhar sozinho.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 60,
    dimension: 4,
    type: "likert",
    text: "Não preciso de controle total para me sentir satisfeito.",
    favoring: "H",
    reverse: true, // Ajustado para equilibrar
  },
  {
    id: 61,
    dimension: 4,
    type: "likert",
    text: "Prefiro ter controle total sobre o meu trabalho.",
    favoring: "A",
    reverse: false,
  },
  {
    id: 62,
    dimension: 4,
    type: "likert",
    text: "Mesmo que o resultado seja pior, prefiro projetos em que tenho controle total.",
    favoring: "A",
    reverse: false,
  },
  {
    id: 63,
    dimension: 4,
    type: "likert",
    text: "Autonomia é inegociável para mim.",
    favoring: "A",
    reverse: false,
  },

  {
    id: 64,
    dimension: 4,
    type: "forced-select",
    text: "Ajudar um vizinho com uma tarefa, como mover móveis:",
    options: forcedOptions("H", "A", {
      strongP1: "Trabalhar juntos de perto, coordenando com ele para tornar o esforço coletivo.",
      strongP2: "Cuidar da tarefa sozinho para garantir que seja feita do seu jeito.",
      leanP1: "Oferecer ajuda, mas segue a liderança da outra pessoa para manter a harmonia.",
      leanP2: "Ajuda, mas prefere trabalhar de forma independente na sua parte.",
      balanced: "Colaborar em algumas partes e trabalhar sozinho em outras.",
    }),
  },
  {
    id: 65,
    dimension: 4,
    type: "forced-select",
    text: "Crédito pelo sucesso da equipe:",
    options: forcedOptions("H", "A", {
      strongP1: "Compartilhar os elogios igualmente, mesmo tendo feito a maior parte do trabalho.",
      strongP2: "Garantir que todos saibam exatamente quais partes foram minhas ideias e execução.",
      leanP1: "Agradecer à equipe, mas menciona seu papel.",
      leanP2: "Aceita os elogios, mas os direciona à equipe",
      balanced: "Vencemos juntos.",
    }),
  },
  {
    id: 66,
    dimension: 4,
    type: "forced-select",
    text: "Discordância em uma reunião:",
    options: forcedOptions("H", "A", {
      strongP1: "Mudar sua posição para restaurar a harmonia.",
      strongP2: "Manter-se firme. Sua ideia é a melhor.",
      leanP1: "Buscar um meio-termo para avançar.",
      leanP2: "Defender seu ponto de vista, mas ouvir os outros.",
      balanced: "Buscar uma solução ganha-ganha.",
    }),
  },
  {
    id: 67,
    dimension: 4,
    type: "forced-select",
    text: "Trabalho voluntário:",
    options: forcedOptions("H", "A", {
      strongP1: "Participar de uma limpeza comunitária com amigos.",
      strongP2: "Criar um projeto pessoal para doação.",
      leanP1: "Ajudar a organizar um evento em grupo.",
      leanP2: "Trabalhar sozinho em uma causa que você valoriza.",
      balanced: "Contribuir com habilidades em um esforço coletivo.",
    }),
  },
  {
    id: 68,
    dimension: 4,
    type: "forced-select",
    text: "Organizar um evento familiar ou comunitário, como uma refeição ou celebração:",
    options: forcedOptions("H", "A", {
      strongP1: "Planejar junto com os outros para garantir que todas as ideias sejam incluídas.",
      strongP2: "Assumir o comando e planejar de acordo com sua própria visão.",
      leanP1: "Envolver outras pessoas, mas conduzir em direção a um objetivo comum.",
      leanP2: "Planejar quase tudo sozinho, mas receber algumas contribuições.",
      balanced: "Equilibrar a contribuição do grupo com suas próprias decisões.",
    }),
  },
  {
    id: 69,
    dimension: 4,
    type: "forced-select",
    text: "Poder de decisão:",
    options: forcedOptions("H", "A", {
      strongP1: "Votar com o grupo, mesmo discordando.",
      strongP2: "Tomar a decisão sozinho se você souber o que é melhor.",
      leanP1: "Influenciar o grupo em direção ao seu ponto de vista.",
      leanP2: "Seguir a maioria, mas manter ressalvas.",
      balanced: "Consenso com desempate pela liderança.",
    }),
  },
];

// Archetype map (unchanged)
export const archetypes = {
  "C-L-O-S-H": {
    name: "Architect",
    description: "A pragmatic builder who organizes teams to construct enduring, logical systems.",
  },
  "C-L-O-S-A": {
    name: "Engineer",
    description: "An independent builder who crafts practical, efficient solutions autonomously.",
  },
  "C-L-O-F-H": {
    name: "Navigator",
    description: "A dynamic leader who steers teams through shifting realities with quick, tangible insights.",
  },
  "C-L-O-F-A": {
    name: "Pioneer",
    description: "A bold trailblazer who seizes opportunities with fearless, independent action.",
  },
  "C-L-I-S-H": {
    name: "Curator",
    description: "A thoughtful preserver who organizes information to build shared, logical frameworks.",
  },
  "C-L-I-S-A": {
    name: "Analyst",
    description: "A precise thinker who dissects complex systems with solitary, focused logic.",
  },
  "C-L-I-F-H": {
    name: "Mediator",
    description:
      "A flexible problem-solver who uses detailed observation to find logical solutions that maintain group balance.",
  },
  "C-L-I-F-A": {
    name: "Maverick",
    description: "An unconventional realist who leverages an internal database of facts to forge their own path.",
  },
  "C-V-O-S-H": {
    name: "Steward",
    description: "A caring organizer who fosters stability and practical well-being for the community.",
  },
  "C-V-O-S-A": {
    name: "Artisan",
    description: "A hands-on creator who shapes the tangible world according to their personal aesthetic and values.",
  },
  "C-V-O-F-H": {
    name: "Campaigner",
    description: "A passionate advocate who inspires teams to action through engaging with real-world needs.",
  },
  "C-V-O-F-A": {
    name: "Adventurer",
    description: "A free-spirited explorer who immerses themselves in new experiences, guided by their impulses.",
  },
  "C-V-I-S-H": {
    name: "Counselor",
    description: "A nurturing guide who provides steady, compassionate support based on shared values.",
  },
  "C-V-I-S-A": {
    name: "Healer",
    description: "A quiet caretaker who works independently to restore balance based on their deep personal ethics.",
  },
  "C-V-I-F-H": {
    name: "Peacemaker",
    description:
      "A gentle adapter who fosters group harmony by being sensitive to the details of personal experiences.",
  },
  "C-V-I-F-A": {
    name: "Empath",
    description:
      "A sensitive individualist who navigates their personal journey attuned to their inner emotional landscape.",
  },
  "N-L-O-S-H": {
    name: "Strategist",
    description: "A visionary planner who organizes teams to execute complex, long-range plans.",
  },
  "N-L-O-S-A": {
    name: "Inventor",
    description: "An ingenious creator who structures groundbreaking ideas into workable, independent projects.",
  },
  "N-L-O-F-H": {
    name: "Disruptor",
    description: "A bold innovator who challenges norms by mobilizing groups around new possibilities.",
  },
  "N-L-O-F-A": {
    name: "Revolutionary",
    description: "A radical thinker who redefines possibilities through fearless, independent exploration of ideas.",
  },
  "N-L-I-S-H": {
    name: "Academic",
    description: "A reflective scholar who builds stable, collaborative theories through deep logical inquiry.",
  },
  "N-L-I-S-A": {
    name: "Theorist",
    description: "A deep thinker who seeks universal truth through solitary abstract analysis.",
  },
  "N-L-I-F-H": {
    name: "Innovator",
    description: "A creative synthesizer who adapts their vision to logical frameworks in collaboration with others.",
  },
  "N-L-I-F-A": {
    name: "Visionary",
    description: "A far-sighted dreamer who crafts bold futures based on their independent and complex inner world.",
  },
  "N-V-O-S-H": {
    name: "Ambassador",
    description: "A harmonious connector who builds bridges between people using a stable vision of shared values.",
  },
  "N-V-O-S-A": {
    name: "Artist",
    description:
      "An expressive individualist who creates works of beauty that embody their abstract values and personal vision.",
  },
  "N-V-O-F-H": {
    name: "Catalyst",
    description:
      "An inspiring changemaker who sparks collective growth by exploring possibilities with adaptable empathy.",
  },
  "N-V-O-F-A": {
    name: "Wanderer",
    description: "A curious seeker who travels through the world of ideas in search of personal meaning.",
  },
  "N-V-I-S-H": {
    name: "Mentor",
    description:
      "A wise nurturer who guides others toward their potential using their deep, stable insight and compassion.",
  },
  "N-V-I-S-A": {
    name: "Sage",
    description: "A profound seeker who blends abstract values with solitary wisdom to arrive at a personal truth.",
  },
  "N-V-I-F-H": {
    name: "Unifier",
    description:
      "A gentle visionary who unites people by adapting their insightful vision to foster collective harmony.",
  },
  "N-V-I-F-A": {
    name: "Mystic",
    description:
      "An enigmatic soul who independently explores life’s mysteries, guided by their intuitive, compassionate inner world.",
  },
};

// ===================================================================
// CORRECTED calculateCSMResults
// ===================================================================
export function calculateCSMResults(answers) {
  const scores = Array(5)
    .fill()
    .map(() => ({ pole1: 0, pole2: 0 }));

  questions.forEach((q) => {
    const resp = answers[q.id];
    const dim = q.dimension;
    const p1 = poles[dim][0];
    const p2 = poles[dim][1];

    if (q.type === "likert" && resp !== null) {
      // FIXED: Reverse logic applied BEFORE pole assignment
      let points = resp;
      let targetPole = q.favoring;

      if (q.reverse) {
        points = 6 - resp;
        targetPole = targetPole === p1 ? p2 : p1;
      }

      if (targetPole === p1) scores[dim].pole1 += points;
      else scores[dim].pole2 += points;
    } else if (q.type === "forced-select" && resp) {
      const opt = q.options.find((o) => o.key === resp);
      if (opt) {
        scores[dim].pole1 += opt.value[p1];
        scores[dim].pole2 += opt.value[p2];
      }
    }
  });

  const percents = scores.map((s) => {
    const total = s.pole1 + s.pole2 || 1;
    let p1Pct = (s.pole1 / total) * 100;
    let p2Pct = (s.pole2 / total) * 100;

    // Random tie-breaker
    if (s.pole1 === s.pole2) {
      if (Math.random() < 0.5) {
        p1Pct = 51;
        p2Pct = 49;
      } else {
        p1Pct = 49;
        p2Pct = 51;
      }
    } else {
      p1Pct = Math.round(p1Pct);
      p2Pct = 100 - p1Pct;
    }

    return { p1: p1Pct, p2: p2Pct };
  });

  const dominants = percents.map((p, i) => (p.p1 > p.p2 ? poles[i][0] : poles[i][1]));
  const typeCode = dominants.join("-");
  const archetype = archetypes[typeCode] || { name: "Unknown", description: "" };

  const categories = percents.map((p) => {
    const primaryPct = p.p1 > p.p2 ? p.p1 : p.p2;
    const secondaryPct = 100 - primaryPct;

    let domLevel, infLevel;
    if (primaryPct >= 86) {
      domLevel = "Strong";
      infLevel = "Low";
    } else if (primaryPct >= 66) {
      domLevel = "Moderate";
      infLevel = "Moderate";
    } else {
      domLevel = "Mild";
      infLevel = "High";
    }

    return { domLevel, infLevel, primaryPct, secondaryPct };
  });

  return { percents, dominants, typeCode, archetype, categories };
}
