export const CommunicationConflictTemplate = {
  typeCodeToArchetype: {
    "C-L-O-S-H": "The Architect",
    "C-L-O-S-A": "The Engineer",
    "C-L-O-F-H": "The Navigator",
    "C-L-O-F-A": "The Pioneer",
    "C-L-I-S-H": "The Curator",
    "C-L-I-S-A": "The Analyst",
    "C-L-I-F-H": "The Mediator",
    "C-L-I-F-A": "The Maverick",
    "C-V-O-S-H": "The Steward",
    "C-V-O-S-A": "The Artisan",
    "C-V-O-F-H": "The Campaigner",
    "C-V-O-F-A": "The Adventurer",
    "C-V-I-S-H": "The Counselor",
    "C-V-I-S-A": "The Healer",
    "C-V-I-F-H": "The Peacemaker",
    "C-V-I-F-A": "The Empath",
    "N-L-O-S-H": "The Strategist",
    "N-L-O-S-A": "The Inventor",
    "N-L-O-F-H": "The Disruptor",
    "N-L-O-F-A": "The Revolutionary",
    "N-L-I-S-H": "The Academic",
    "N-L-I-S-A": "The Theorist",
    "N-L-I-F-H": "The Innovator",
    "N-L-I-F-A": "The Visionary",
    "N-V-O-S-H": "The Ambassador",
    "N-V-O-S-A": "The Artist",
    "N-V-O-F-H": "The Catalyst",
    "N-V-O-F-A": "The Wanderer",
    "N-V-I-S-H": "The Mentor",
    "N-V-I-S-A": "The Sage",
    "N-V-I-F-H": "The Unifier",
    "N-V-I-F-A": "The Mystic",
  },
  mappings: {
    informationProcessing: {
      poleDetails: {
        C: { level: "high", description: "clear, practical communication and direct solutions" },
        N: { level: "medium", description: "conceptual discussions and nuanced resolutions" },
      },
      samePole: {
        mild: [
          "You both excel at {poleDescription}, creating a unified approach to how you communicate and resolve conflicts. You likely thrive on straightforward discussions or exploring deeper ideas, making your conversations feel clear and connected. This alignment fosters a partnership where misunderstandings are minimized.",
          "Your focus on {poleDescription} strengthens your communication, but it might limit variety. Schedule a weekly check-in to explore a new communication style, like discussing practical plans or abstract ideas, to keep your interactions dynamic and balanced.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a robust foundation for communication and conflict resolution. You probably shine at clear exchanges or nuanced discussions, which fosters trust and clarity in your relationship. This mutual focus makes your conversations feel reliable and engaging.",
          "While your alignment creates harmony, it could benefit from broader perspectives. Incorporate a monthly discussion that stretches your style, like a structured debate or a reflective talk, to add depth and keep your communication vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your communication and conflict resolution a seamless partnership. You likely excel at direct exchanges or deep conceptual talks, creating a relationship that feels united and purposeful. This synergy transforms your discussions into a cornerstone of your bond.",
          "Your strong focus is a strength, but it might overlook alternative approaches. Schedule a quarterly 'communication reset' to explore a new style, like a practical or conceptual discussion, to ensure your interactions remain multifaceted and engaging.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, excels at clear, practical communication and direct solutions, grounding discussions, while ${
              partnerN.name
            }, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, focuses on conceptual discussions and nuanced resolutions, adding depth. This subtle contrast creates a balanced dynamic that blends clarity with insight.`,
          (partnerC, partnerN) =>
            `${partnerC.name} might feel ${partnerN.name}'s abstract approach lacks focus, while ${partnerN.name} could see ${partnerC.name}'s directness as simplistic. Alternate between a practical discussion, like addressing a specific issue, and a conceptual one, like exploring feelings, each week to strengthen your communication.`,
        ],
        moderate: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, brings reliability through clear, practical communication and direct solutions, while ${
              partnerN.name
            }, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, enriches discussions with conceptual ideas and nuanced resolutions. Your moderate difference fosters a partnership that’s both clear and insightful.`,
          (partnerC, partnerN) =>
            `${partnerC.name} may find ${partnerN.name}'s conceptual focus less actionable, while ${partnerN.name} might see ${partnerC.name}'s directness as blunt. Create a weekly plan with one practical discussion, like a task resolution, and one conceptual talk, like exploring perspectives, to harmonize your styles.`,
        ],
        strong: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, is a master of clear, practical communication and direct solutions, building a solid foundation, while ${
              partnerN.name
            }, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, excels at conceptual discussions and nuanced resolutions, dreaming broadly. This stark contrast can create rich communication when you combine your strengths.`,
          (partnerC, partnerN) =>
            `Tensions may arise when ${partnerC.name} prioritizes clarity and ${partnerN.name} seeks nuance, but this is your opportunity. Plan a monthly ritual that pairs a practical discussion, like resolving a conflict, with a conceptual one, like exploring shared values, to make your differences a strength.`,
        ],
      },
    },
    decisionMaking: {
      poleDetails: {
        L: { level: "high", description: "logical analysis and structured resolutions" },
        V: { level: "medium", description: "emotion-driven dialogue and empathetic resolutions" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a seamless flow in how you handle communication and conflicts. You likely excel at logical discussions or empathetic exchanges, making your resolutions feel fair and connected. This alignment fosters a partnership where conflicts are resolved with mutual understanding.",
          "Your focus on {poleDescription} drives clarity, but it might limit other approaches. Try a weekly check-in to balance logical and empathetic discussions, ensuring your resolutions deepen your connection in varied ways.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a strong foundation for resolving conflicts. You probably shine at structured resolutions or heartfelt dialogue, which fosters trust and unity. This mutual focus makes your communication feel reliable and warm.",
          "While your alignment creates harmony, it could benefit from variety. Incorporate a monthly discussion that blends logical and emotional perspectives, like analyzing an issue and sharing feelings, to keep your resolutions vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your communication and conflict resolution a cornerstone of your relationship. You likely excel at logical analysis or empathetic resolutions, creating a partnership that feels unshakable. This synergy transforms your discussions into a unified force.",
          "Your strong focus is a strength, but it might overlook other perspectives. Schedule a quarterly reflection to explore alternative resolution styles, like blending logic and empathy in a conflict discussion, to ensure your communication remains dynamic.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, excels at logical analysis and structured resolutions, grounding discussions, while ${
              partnerV.name
            }, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, focuses on emotion-driven dialogue and empathetic resolutions, deepening connection. This subtle contrast creates a balanced approach to your communication.`,
          (partnerL, partnerV) =>
            `${partnerL.name} might feel ${partnerV.name}'s emotional approach lacks structure, while ${partnerV.name} could see ${partnerL.name}'s logic as detached. Try alternating between logical analysis, like discussing a plan, and empathetic dialogue, like sharing emotions, each week to blend your strengths.`,
        ],
        moderate: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, drives logical analysis and structured resolutions, ensuring clarity, while ${partnerV.name}, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, excels at emotion-driven dialogue and empathetic resolutions, adding warmth. Your moderate contrast creates a dynamic partnership that balances reason and emotion.`,
          (partnerL, partnerV) =>
            `${partnerL.name} may find ${partnerV.name}'s emotional dialogue less structured, while ${partnerV.name} might see ${partnerL.name}'s logic as cold. Create a discussion plan with one logical step, like analyzing an issue, and one empathetic act, like sharing feelings, to harmonize your approaches.`,
        ],
        strong: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, thrives on logical analysis and structured resolutions, providing stability, while ${
              partnerV.name
            }, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, excels at emotion-driven dialogue and empathetic resolutions, fostering closeness. This stark contrast can spark vibrant communication when you blend your strengths.`,
          (partnerL, partnerV) =>
            `Tensions might emerge when ${partnerL.name} seeks logic and ${partnerV.name} prioritizes emotion, but this is your strength. Develop a weekly ritual that combines a logical discussion, like resolving an issue, with an empathetic check-in, like sharing feelings, to make your differences a catalyst for deeper connection.`,
        ],
      },
    },
    energyOrientation: {
      poleDetails: {
        O: { level: "medium", description: "expressive communication and open dialogue" },
        I: { level: "medium", description: "reflective listening and introspective exchanges" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a shared energy that enlivens your communication. You likely excel at open discussions or introspective exchanges, making your conversations feel vibrant and meaningful. This alignment fosters a bond where you feel heard and understood.",
          "Your focus on {poleDescription} fuels connection, but it might limit variety. Plan a weekly activity, like an open discussion or a reflective talk, to ensure your communication remains balanced and dynamic.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a lively partnership in communication. You probably shine at expressive dialogue or reflective listening, which deepens your connection. This mutual energy makes your conversations feel warm and engaging.",
          "While your alignment drives closeness, it could benefit from new approaches. Incorporate a monthly activity, like an open debate or a quiet reflection, to add depth to your communication.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your communication a vibrant force. You likely excel at expressive exchanges or introspective discussions, creating a partnership that feels deeply united. This synergy transforms your conversations into a dynamic strength.",
          "Your strong focus is powerful, but it might overlook other expressions. Schedule a quarterly activity, like alternating between expressive and reflective discussions, to keep your communication multifaceted and fresh.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, excels at expressive communication and open dialogue, sparking energy, while ${partnerI.name}, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, focuses on reflective listening and introspective exchanges, adding depth. This subtle contrast creates a balanced dynamic that blends energy with insight.`,
          (partnerO, partnerI) =>
            `${partnerO.name} might wish ${partnerI.name} was more expressive, while ${partnerI.name} could find ${partnerO.name}'s openness intense. Alternate between an open discussion and a reflective talk each week to combine your strengths and deepen your connection.`,
        ],
        moderate: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, drives expressive communication and open dialogue, fueling engagement, while ${partnerI.name}, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, excels at reflective listening and introspective exchanges, grounding discussions. Your moderate contrast creates a partnership that’s both lively and meaningful.`,
          (partnerO, partnerI) =>
            `${partnerO.name} may find ${partnerI.name}'s introspection slow, while ${partnerI.name} might feel ${partnerO.name}'s expressiveness is overwhelming. Create a schedule with one expressive discussion and one reflective talk each month to leverage both styles effectively.`,
        ],
        strong: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, thrives on expressive communication and open dialogue, driving vibrancy, while ${partnerI.name}, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, excels at reflective listening and introspective exchanges, fostering depth. This stark contrast can create dynamic communication when you align your energies.`,
          (partnerO, partnerI) =>
            `Tensions might arise when ${partnerO.name} pushes for open dialogue and ${partnerI.name} seeks reflection, but this is your chance to excel. Plan a weekly mix of one expressive discussion, like a lively debate, and one introspective talk, like a deep check-in, to turn your differences into a vibrant strength.`,
        ],
      },
    },
    changeApproach: {
      poleDetails: {
        S: { level: "high", description: "structured communication and planned resolutions" },
        F: { level: "medium", description: "flexible dialogue and adaptive resolutions" },
      },
      samePole: {
        mild: [
          "You both excel at {poleDescription}, creating a reliable rhythm in your communication and conflict resolution. You likely thrive on planned discussions or adaptive exchanges, making your interactions feel secure and effective. This alignment builds a partnership where communication feels natural and connected.",
          "Your focus on {poleDescription} fosters stability, but it might limit variety. Plan a monthly ritual, like a structured discussion or a spontaneous talk, to keep your communication dynamic and engaging.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a strong foundation for communication. You probably shine at creating structured plans or embracing adaptive dialogue, which fosters trust and clarity. This mutual focus makes your conversations feel reliable and supportive.",
          "While your alignment is grounding, it could benefit from flexibility. Incorporate a quarterly activity, like a planned discussion or an impromptu talk, to add variety and keep your communication vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your communication and conflict resolution a seamless partnership. You likely excel at crafting structured discussions or adaptive resolutions, creating a relationship that feels solid and purposeful. This synergy transforms your communication into a shared triumph.",
          "Your strong focus is powerful, but it might overlook new possibilities. Schedule an annual 'communication reset' to explore a new approach, like a planned or spontaneous discussion, to ensure your interactions remain fresh and multifaceted.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, excels at structured communication and planned resolutions, providing stability, while ${
              partnerF.name
            }, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, focuses on flexible dialogue and adaptive resolutions, adding spontaneity. This subtle contrast creates a balanced partnership that blends predictability with adaptability.`,
          (partnerS, partnerF) =>
            `${partnerS.name} might find ${partnerF.name}'s flexibility unpredictable, while ${partnerF.name} could see ${partnerS.name}'s structure as rigid. Plan a monthly mix of one structured discussion, like a scheduled talk, and one spontaneous conversation to blend your strengths.`,
        ],
        moderate: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, drives structured communication and planned resolutions, ensuring reliability, while ${
              partnerF.name
            }, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, excels at flexible dialogue and adaptive resolutions, sparking spontaneity. Your moderate contrast creates a partnership that’s both steady and dynamic.`,
          (partnerS, partnerF) =>
            `${partnerS.name} may view ${partnerF.name}'s flexibility as inconsistent, while ${partnerF.name} might find ${partnerS.name}'s structure limiting. Create a plan with one structured discussion, like a planned resolution, and one spontaneous talk, like an impromptu check-in, to harmonize your styles.`,
        ],
        strong: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, is dedicated to structured communication and planned resolutions, building a solid foundation, while ${
              partnerF.name
            }, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, excels at flexible dialogue and adaptive resolutions, embracing spontaneity. This stark contrast can drive vibrant communication when you work together.`,
          (partnerS, partnerF) =>
            `Tensions might arise when ${partnerS.name} seeks structure and ${partnerF.name} craves flexibility, but this is your strength. Develop a monthly plan with one structured discussion, like a planned conflict resolution, and one spontaneous talk, like a surprise check-in, to turn your differences into a powerful advantage.`,
        ],
      },
    },
    interpersonalStyle: {
      poleDetails: {
        H: { level: "medium", description: "collaborative discussions and mutual understanding" },
        A: { level: "medium", description: "independent perspectives and personal clarity" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a warm and connected approach to communication. You likely excel at collaborative discussions or valuing personal clarity, making your interactions feel united and supportive. This alignment strengthens your bond, making communication a team effort.",
          "Your focus on {poleDescription} fosters unity, but it might limit individual exploration. Encourage each other to try one new communication approach, like a joint discussion or a solo reflection, alongside your usual style to keep your interactions dynamic.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a powerful sense of togetherness in communication. You probably shine at teaming up on discussions or honoring personal perspectives, which fosters trust and clarity. This mutual focus makes your conversations feel natural and inspiring.",
          "While your alignment is heartwarming, it could benefit from individual space. Set one collaborative discussion goal, like a joint resolution, and one personal reflection, like a solo insight, to add variety and depth to your communication.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, turning communication into a shared journey of understanding. You likely excel at collaborative discussions or respecting personal clarity, creating a partnership that feels unbreakable. This synergy amplifies your connection.",
          "Your strong focus is incredible, but it might overshadow personal pursuits. Dedicate time to one solo communication goal, like a personal reflection, alongside your joint efforts to ensure your interactions remain balanced and vibrant.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, excels at collaborative discussions and mutual understanding, fostering teamwork, while ${
              partnerA.name
            }, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, focuses on independent perspectives and personal clarity, valuing individuality. This subtle contrast creates a balanced partnership that supports both unity and autonomy.`,
          (partnerH, partnerA) =>
            `${partnerH.name} might crave more collaboration from ${partnerA.name}, while ${partnerA.name} could need more personal space. Plan a weekly mix of one collaborative discussion, like a joint resolution, and one solo reflection, like a personal insight, to strengthen your communication.`,
        ],
        moderate: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, drives collaborative discussions and mutual understanding, creating unity, while ${partnerA.name}, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, excels at independent perspectives and personal clarity, driving individuality. Your moderate contrast adds depth to your communication, blending togetherness with autonomy.`,
          (partnerH, partnerA) =>
            `${partnerH.name} may find ${partnerA.name}'s independence isolating, while ${partnerA.name} might feel collaboration limits clarity. Create a plan with one collaborative discussion, like a team resolution, and one personal reflection, like a solo insight, to balance your dynamic.`,
        ],
        strong: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, is passionate about collaborative discussions and mutual understanding, building unity, while ${
              partnerA.name
            }, as ${
              CommunicationConflictTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, excels at independent perspectives and personal clarity, carving their own path. This stark contrast can inspire vibrant communication when you align your efforts.`,
          (partnerH, partnerA) =>
            `Differences might spark tension, with ${partnerH.name} seeking collaboration and ${partnerA.name} valuing independence. Develop a monthly plan with check-ins on one collaborative discussion, like a joint resolution, and one personal reflection, like a solo insight, to turn your contrast into a strength.`,
        ],
      },
    },
  },
  generateText: function (partnerA, partnerB) {
    const dimensions = [
      "informationProcessing",
      "decisionMaking",
      "energyOrientation",
      "changeApproach",
      "interpersonalStyle",
    ];
    const description = [];

    dimensions.forEach((dim, i) => {
      const aPercent = partnerA.percents[i];
      const bPercent = partnerB.percents[i];
      const aDominant = partnerA.dominants[i];
      const bDominant = partnerB.dominants[i];

      // Calculate distance
      const aPct = aDominant === ["C", "L", "O", "S", "H"][i] ? aPercent.p1 : 100 - aPercent.p2;
      const bPct = bDominant === ["C", "L", "O", "S", "H"][i] ? bPercent.p1 : 100 - bPercent.p2;
      const distance = Math.abs(aPct - bPct);
      const level = distance <= 30 ? "mild" : distance <= 60 ? "moderate" : "strong";
      const isSamePole = aDominant === bDominant;

      // Select text set
      let textSet;
      if (isSamePole) {
        const pole = aDominant;
        const poleDescription = this.mappings[dim].poleDetails[pole].description;
        textSet = this.mappings[dim].samePole[level].map((text) =>
          text
            .replace(
              "{pole}",
              pole === "C"
                ? "practical"
                : pole === "N"
                ? "conceptual"
                : pole === "L"
                ? "logical"
                : pole === "V"
                ? "empathetic"
                : pole === "O"
                ? "expressive"
                : pole === "I"
                ? "reflective"
                : pole === "S"
                ? "structured"
                : pole === "F"
                ? "flexible"
                : pole === "H"
                ? "collaborative"
                : "independent"
            )
            .replace("{poleDescription}", poleDescription)
        );
      } else {
        const poleMap = {
          informationProcessing: {
            first: "C",
            second: "N",
            firstPartner: aDominant === "C" ? partnerA : partnerB,
            secondPartner: aDominant === "C" ? partnerB : partnerA,
          },
          decisionMaking: {
            first: "L",
            second: "V",
            firstPartner: aDominant === "L" ? partnerA : partnerB,
            secondPartner: aDominant === "L" ? partnerB : partnerA,
          },
          energyOrientation: {
            first: "O",
            second: "I",
            firstPartner: aDominant === "O" ? partnerA : partnerB,
            secondPartner: aDominant === "O" ? partnerB : partnerA,
          },
          changeApproach: {
            first: "S",
            second: "F",
            firstPartner: aDominant === "S" ? partnerA : partnerB,
            secondPartner: aDominant === "S" ? partnerB : partnerA,
          },
          interpersonalStyle: {
            first: "H",
            second: "A",
            firstPartner: aDominant === "H" ? partnerA : partnerB,
            secondPartner: aDominant === "H" ? partnerB : partnerA,
          },
        };
        const { firstPartner, secondPartner } = poleMap[dim];
        textSet = this.mappings[dim].oppositePole[level].map((fn) => fn(firstPartner, secondPartner));
      }

      description.push(...textSet);
    });

    const transitions = [
      "",
      "When it comes to resolving conflicts,",
      "In how you express and listen to each other,",
      "As you navigate changes in your communication style,",
      "When fostering mutual understanding in discussions,",
    ];
    return {
      description: description.map((text, idx) =>
        idx % 2 === 0 && transitions[Math.floor(idx / 2)]
          ? `${transitions[Math.floor(idx / 2)]} ${text.charAt(0).toLowerCase() + text.slice(1)}`
          : text
      ),
    };
  },
};
export default CommunicationConflictTemplate;
