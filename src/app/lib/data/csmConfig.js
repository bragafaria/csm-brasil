// app/lib/data/csmConfig.js

export const CSM_DIMENSIONS = [
  {
    name: "Processamento de Informações",
    subtitle: "Como você percebe e interpreta dados",
    pole1: {
      letter: "C",
      name: "Foco Concreto",
      desc: "Preferência por dados tangíveis, verificáveis e do mundo real; aquilo que é prático e observável no presente.",
    },
    pole2: {
      letter: "N",
      name: "Percepção Abstrata",
      desc: "Preferência por padrões, possibilidades e conexões teóricas: aquilo que poderia ser.",
    },
  },
  {
    name: "Tomada de Decisão",
    subtitle: "Como você avalia e decide",
    pole1: {
      letter: "L",
      name: "Lógica Analítica",
      desc: "Preferência por lógica objetiva e impessoal, baseada em princípios de causa e efeito.",
    },
    pole2: {
      letter: "V",
      name: "Valores Empáticos",
      desc: "Decisões baseadas em valores pessoais e no impacto sobre as pessoas.",
    },
  },
  {
    name: "Orientação de Energia",
    subtitle: "Para onde fluem seu foco e sua energia",
    pole1: {
      letter: "I",
      name: "Reflexão Interna",
      desc: "Direciona a energia para dentro, encontrando estímulo na reflexão e no pensamento profundo.",
    },
    pole2: {
      letter: "O",
      name: "Engajamento Externo",
      desc: "Direciona a energia para fora, encontrando estímulo na ação e na interação.",
    },
  },
  {
    name: "Abordagem em Relação à Mudança",
    subtitle: "Como você lida com mudanças e estrutura",
    pole1: {
      letter: "S",
      name: "Estrutura Estável",
      desc: "Preferência por fechamento, planejamento e sistemas organizados.",
    },
    pole2: {
      letter: "F",
      name: "Flexibilidade Adaptativa",
      desc: "Preferência por espontaneidade, opções em aberto e adaptação a novas informações.",
    },
  },
  {
    name: "Estilo Interpessoal",
    subtitle: "Como sua cognição se orienta em relação aos outros",
    pole1: {
      letter: "H",
      name: "Harmonia Colaborativa",
      desc: "Orientação para dinâmicas de grupo, colaboração e objetivos coletivos.",
    },
    pole2: {
      letter: "A",
      name: "Autonomia Independente",
      desc: "Orientação para autossuficiência, objetivos pessoais e liberdade individual.",
    },
  },
];

export const PREFERENCE_TIERS = {
  // app/lib/data/csmConfig.js → Substituir bloco primary

  primary: {
    "51-65": {
      label: "Preferência Leve",
      desc: (pct, pole, oppositePole, oppositePct) =>
        `${pole} é sua inclinação natural (usada em ${pct}% do tempo), mas o polo oposto (${oppositePole}, com ${oppositePct}%) ainda é acessível e surge com pouco esforço quando a situação exige.`,
    },
    "66-85": {
      label: "Preferência Moderada",
      desc: (pct, pole, oppositePole, oppositePct) =>
        `${pole} é seu padrão claro (usado em ${pct}% do tempo). O polo oposto (${oppositePole}, com ${oppositePct}%) aparece quando necessário, embora não seja sua resposta automática.`,
    },
    "86-100": {
      label: "Preferência Forte",
      desc: (pct, pole, oppositePole, oppositePct) =>
        `${pole} é seu modo dominante (usado em ${pct}% do tempo). O polo oposto (${oppositePole}, com ${oppositePct}%) aparece raramente e geralmente exige esforço consciente.`,
    },
  },
  secondary: {
    "35-49": {
      label: "Alta Influência",
      desc: (pct, pole, primaryPole, primaryPct) =>
        `${pole} não é seu padrão principal, mas exerce um papel perceptível (aparecendo em ${pct}% das situações) e soa natural quando o contexto favorece. Seu polo primário é ${primaryPole}, com ${primaryPct}%.`,
    },
    "15-34": {
      label: "Influência Moderada",
      desc: (pct, pole, primaryPole, primaryPct) =>
        `${pole} não é seu padrão principal e surge ocasionalmente (em ${pct}% das situações), geralmente acionado por contextos ou necessidades específicas. Seu polo primário é ${primaryPole}, com ${primaryPct}%.`,
    },
    "0-14": {
      label: "Baixa Influência",
      desc: (pct, pole, primaryPole, primaryPct) =>
        `${pole} não é seu padrão principal e aparece raramente (apenas ${pct}% do tempo). É menos familiar e normalmente requer esforço intencional. Seu polo primário é ${primaryPole}, com ${primaryPct}%.`,
    },
  },
};

// ← ADD THIS LINE
export const CAS_TIERS = {
  "80-100": {
    label: "Alinhamento Fácil",
    desc: (pole) =>
      `Ambos os parceiros se apoiam em padrões semelhantes dentro de ${pole}, fazendo com que essa dimensão pareça natural e fácil de navegar em conjunto. A comunicação flui com atrito mínimo, e a compreensão da perspectiva um do outro costuma acontecer de forma quase automática.`,
  },
  "60-79": {
    label: "Alinhamento Gerenciável",
    desc: (pole) =>
      `Os parceiros compartilham a mesma orientação geral em relação a ${pole}, mas diferem o suficiente em intensidade para que suas reações padrão nem sempre coincidam. A maioria das interações flui bem, porém certas situações podem revelar diferenças que exigem intenção, esclarecimento ou pequenos ajustes para manter o alinhamento.`,
  },
  "0-59": {
    label: "Alinhamento Desafiador",
    desc: (pole) =>
      `Os parceiros abordam ${pole} a partir de pontos de partida cognitivos diferentes. Suas formas naturais de processar ou responder frequentemente divergem, tornando o alinhamento um processo mais ativo. Comunicação clara, curiosidade e esforço consciente para criar pontes são essenciais para evitar mal-entendidos e preservar a harmonia.`,
  },
};
