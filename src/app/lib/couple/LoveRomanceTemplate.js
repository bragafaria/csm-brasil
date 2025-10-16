export const LoveRomanceTemplate = {
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
        C: { level: "high", description: "tangible expressions of love and practical support" },
        N: { level: "medium", description: "emotional depth and visionary connection" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a shared rhythm in how you nurture your relationship. You likely excel at gestures like planning thoughtful dates or envisioning a shared future, making your bond feel grounded and meaningful. This alignment fosters a deep sense of connection and mutual understanding.",
          "Your focus on {poleDescription} strengthens your romance, but it might limit variety. Plan a weekly ritual, like a practical date night or a visionary discussion about your dreams, to keep your connection vibrant and balanced.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a powerful foundation for your romantic life. You probably shine at creating consistent acts of love, like organizing special moments or dreaming together, which deepens your intimacy. This mutual focus makes your relationship feel like a true partnership.",
          "While your alignment creates warmth, it could benefit from new perspectives. Incorporate a monthly activity that stretches your approach, like a spontaneous outing or a reflective talk, to add depth and keep your bond dynamic.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your romantic connection a vibrant force. You likely excel at crafting meaningful moments, like detailed plans or grand visions for your future, creating a relationship that feels deeply united. This synergy transforms your love into a shared journey.",
          "Your strong focus is a strength, but it might overlook alternative expressions. Schedule a quarterly 'romance reset' to explore a new way of connecting, like a practical gesture or a visionary goal, to ensure your love stays fresh and multifaceted.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, excels at tangible expressions of love and practical support, grounding the relationship, while ${
              partnerN.name
            }, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, focuses on emotional depth and visionary connection, dreaming of your future together. This subtle contrast creates a balanced dynamic that blends practicality with romance.`,
          (partnerC, partnerN) =>
            `${partnerC.name} might feel ${partnerN.name}'s dreams lack immediate action, while ${partnerN.name} could see ${partnerC.name}'s practicality as less romantic. Alternate between a practical gesture, like a planned date, and a visionary one, like discussing future dreams, to strengthen your bond.`,
        ],
        moderate: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, brings reliability through tangible expressions of love and practical support, while ${
              partnerN.name
            }, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, deepens the connection with emotional depth and visionary ideas. Your moderate difference fosters a partnership that’s both steady and inspiring.`,
          (partnerC, partnerN) =>
            `${partnerC.name} may find ${partnerN.name}'s visionary focus less actionable, while ${partnerN.name} might see ${partnerC.name}'s practicality as routine. Create a weekly plan with one practical act, like a thoughtful gift, and one visionary moment, like a deep conversation, to harmonize your styles.`,
        ],
        strong: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, is a master of tangible expressions of love and practical support, building a solid foundation, while ${
              partnerN.name
            }, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, excels at emotional depth and visionary connection, dreaming boldly. This stark contrast can create a rich, multifaceted romance when you combine your strengths.`,
          (partnerC, partnerN) =>
            `Tensions may arise when ${partnerC.name} prioritizes practical acts and ${partnerN.name} seeks emotional depth, but this is your opportunity. Plan a monthly ritual that pairs a practical gesture, like a planned evening, with a visionary one, like dreaming about your future, to make your differences a strength.`,
        ],
      },
    },
    decisionMaking: {
      poleDetails: {
        L: { level: "high", description: "logical resolutions and clear communication" },
        V: { level: "medium", description: "heartfelt decisions and emotional alignment" },
      },
      samePole: {
        mild: [
          "You both excel at {poleDescription}, creating a seamless flow in how you navigate your relationship. You likely thrive on clear discussions or heartfelt choices, like resolving conflicts logically or prioritizing emotional connection, making your bond feel aligned and supportive.",
          "Your focus on {poleDescription} fosters clarity, but it might limit other approaches. Try a weekly check-in to balance logical resolutions with emotional discussions, ensuring your decisions deepen your connection in varied ways.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a strong foundation for your romantic decisions. You probably shine at making clear, logical choices or heartfelt commitments, which fosters trust and unity. This mutual focus makes your relationship feel reliable and intimate.",
          "While your alignment is powerful, it could benefit from variety. Incorporate a monthly discussion that blends logical and emotional perspectives, like planning a date with both structure and feeling, to keep your decision-making vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your romantic decisions a cornerstone of your bond. You likely excel at resolving issues with logic or deepening emotional ties, creating a partnership that feels unshakable. This synergy transforms your love into a unified force.",
          "Your strong focus is a strength, but it might overlook other perspectives. Schedule a quarterly reflection to explore alternative decision-making styles, like blending logic and emotion in a conflict resolution, to ensure your bond remains dynamic.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, excels at logical resolutions and clear communication, grounding your decisions, while ${
              partnerV.name
            }, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, focuses on heartfelt decisions and emotional alignment, deepening your connection. This subtle contrast creates a balanced approach to your romantic choices.`,
          (partnerL, partnerV) =>
            `${partnerL.name} might feel ${partnerV.name}'s emotional approach lacks clarity, while ${partnerV.name} could see ${partnerL.name}'s logic as detached. Try alternating between logical discussions and heartfelt check-ins each week to blend your strengths and enhance intimacy.`,
        ],
        moderate: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, drives logical resolutions and clear communication, ensuring clarity, while ${partnerV.name}, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, excels at heartfelt decisions and emotional alignment, adding warmth. Your moderate contrast creates a dynamic partnership that balances reason and emotion.`,
          (partnerL, partnerV) =>
            `${partnerL.name} may find ${partnerV.name}'s emotional decisions less structured, while ${partnerV.name} might see ${partnerL.name}'s logic as cold. Create a decision-making plan that includes one logical step, like scheduling time together, and one emotional act, like sharing feelings, to harmonize your approaches.`,
        ],
        strong: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, thrives on logical resolutions and clear communication, providing stability, while ${
              partnerV.name
            }, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, excels at heartfelt decisions and emotional alignment, fostering intimacy. This stark contrast can spark a vibrant romance when you blend your strengths.`,
          (partnerL, partnerV) =>
            `Tensions might emerge when ${partnerL.name} seeks logic and ${partnerV.name} prioritizes emotion, but this is your strength. Develop a weekly ritual that combines a logical plan, like organizing a date, with an emotional check-in, like sharing your feelings, to make your differences a catalyst for deeper connection.`,
        ],
      },
    },
    energyOrientation: {
      poleDetails: {
        O: { level: "medium", description: "expressive interactions and social connection" },
        I: { level: "medium", description: "intimate reflection and deep conversations" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a shared energy that enlivens your romance. You likely excel at vibrant interactions or deep conversations, making your time together feel dynamic and meaningful. This alignment fosters a bond that feels connected and engaging.",
          "Your focus on {poleDescription} fuels intimacy, but it might limit variety. Plan a weekly activity, like a social outing or a quiet evening, to ensure your connection remains balanced and vibrant.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a lively romantic partnership. You probably shine at creating engaging moments, like social outings or reflective talks, which deepens your connection. This mutual energy makes your relationship feel warm and inspiring.",
          "While your alignment drives closeness, it could benefit from new approaches. Incorporate a monthly activity that stretches your style, like a quiet night in or a social event, to add depth to your bond.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your romantic connection a vibrant force. You likely excel at lively interactions or intimate reflections, creating a partnership that feels deeply united. This synergy transforms your love into a dynamic journey.",
          "Your strong focus is powerful, but it might overlook other expressions. Schedule a quarterly activity, like alternating between social and intimate moments, to keep your connection multifaceted and fresh.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, excels at expressive interactions and social connection, sparking energy, while ${partnerI.name}, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, focuses on intimate reflection and deep conversations, adding depth. This subtle contrast creates a balanced dynamic that blends excitement with intimacy.`,
          (partnerO, partnerI) =>
            `${partnerO.name} might wish ${partnerI.name} was more outgoing, while ${partnerI.name} could find ${partnerO.name}'s energy intense. Alternate between a social outing and a quiet evening each week to combine your strengths and deepen your bond.`,
        ],
        moderate: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, drives expressive interactions and social connection, fueling excitement, while ${partnerI.name}, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, excels at intimate reflection and deep conversations, grounding your bond. Your moderate contrast creates a partnership that’s both lively and meaningful.`,
          (partnerO, partnerI) =>
            `${partnerO.name} may find ${partnerI.name}'s introspection slow, while ${partnerI.name} might feel ${partnerO.name}'s energy is overwhelming. Create a schedule with one social event and one reflective talk each month to leverage both styles effectively.`,
        ],
        strong: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, thrives on expressive interactions and social connection, sparking vibrancy, while ${
              partnerI.name
            }, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, excels at intimate reflection and deep conversations, fostering closeness. This stark contrast can create a dynamic romance when you align your energies.`,
          (partnerO, partnerI) =>
            `Tensions might arise when ${partnerO.name} seeks social moments and ${partnerI.name} craves reflection, but this is your strength. Plan a weekly mix of one social activity, like a group date, and one intimate moment, like a deep talk, to turn your differences into a vibrant bond.`,
        ],
      },
    },
    changeApproach: {
      poleDetails: {
        S: { level: "high", description: "structured routines and planned romance" },
        F: { level: "medium", description: "spontaneous gestures and flexible connection" },
      },
      samePole: {
        mild: [
          "You both excel at {poleDescription}, creating a reliable rhythm in your romantic life. You likely thrive on planned date nights or spontaneous surprises, making your bond feel secure and joyful. This alignment builds a partnership where romance feels natural and connected.",
          "Your focus on {poleDescription} fosters stability, but it might limit variety. Plan a monthly ritual, like a structured date or a spontaneous outing, to keep your romantic connection dynamic and engaging.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a strong foundation for your romantic life. You probably shine at creating consistent routines or embracing spontaneous moments, which fosters trust and excitement. This mutual focus makes your relationship feel warm and reliable.",
          "While your alignment is grounding, it could benefit from flexibility. Incorporate a quarterly activity, like a planned getaway or an impromptu adventure, to add variety and keep your romance vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your romantic life a seamless journey. You likely excel at crafting structured plans or spontaneous gestures, creating a partnership that feels solid and joyful. This synergy transforms your love into a shared triumph.",
          "Your strong focus is powerful, but it might overlook new possibilities. Schedule an annual 'romance reset' to explore a new approach, like a planned or spontaneous gesture, to ensure your connection remains fresh and multifaceted.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, excels at structured routines and planned romance, providing stability, while ${partnerF.name}, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, focuses on spontaneous gestures and flexible connection, adding excitement. This subtle contrast creates a balanced partnership that blends predictability with spontaneity.`,
          (partnerS, partnerF) =>
            `${partnerS.name} might find ${partnerF.name}'s spontaneity unpredictable, while ${partnerF.name} could see ${partnerS.name}'s routines as rigid. Plan a monthly mix of one structured date and one spontaneous gesture to blend your strengths and enhance your romance.`,
        ],
        moderate: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, drives structured routines and planned romance, ensuring reliability, while ${partnerF.name}, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, excels at spontaneous gestures and flexible connection, sparking joy. Your moderate contrast creates a dynamic partnership that’s both steady and exciting.`,
          (partnerS, partnerF) =>
            `${partnerS.name} may view ${partnerF.name}'s spontaneity as inconsistent, while ${partnerF.name} might find ${partnerS.name}'s plans limiting. Create a plan with one structured date, like a reserved dinner, and one spontaneous act, like a surprise outing, to harmonize your styles.`,
        ],
        strong: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, is dedicated to structured routines and planned romance, building a solid foundation, while ${
              partnerF.name
            }, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, excels at spontaneous gestures and flexible connection, embracing excitement. This stark contrast can drive a vibrant romance when you work together.`,
          (partnerS, partnerF) =>
            `Tensions might arise when ${partnerS.name} seeks structure and ${partnerF.name} craves spontaneity, but this is your strength. Develop a monthly plan with one structured activity, like a planned getaway, and one spontaneous gesture, like a surprise gift, to turn your differences into a powerful advantage.`,
        ],
      },
    },
    interpersonalStyle: {
      poleDetails: {
        H: { level: "medium", description: "collaborative bonding and shared experiences" },
        A: { level: "medium", description: "independent expressions and personal space" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a warm and connected romantic partnership. You likely excel at shared moments or valuing personal space, making your bond feel united and supportive. This alignment strengthens your love, making it a true team effort.",
          "Your focus on {poleDescription} fosters closeness, but it might limit variety. Encourage each other to try one new activity, like a shared outing or a solo hobby, alongside your usual approach to keep your romance dynamic and balanced.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a powerful sense of togetherness in your romantic life. You probably shine at creating joint experiences or honoring personal boundaries, which fosters trust and intimacy. This mutual focus makes your love feel natural and inspiring.",
          "While your alignment is heartwarming, it could benefit from variety. Set one shared romantic goal, like a couple’s retreat, and one personal activity, like a solo interest, to add depth and keep your connection vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, turning your romantic life into a shared journey of love. You likely excel at collaborative moments or respecting independence, creating a partnership that feels unbreakable. This synergy amplifies your romantic connection.",
          "Your strong focus is incredible, but it might overshadow other expressions. Dedicate time to one new activity, like a joint experience or a personal pursuit, alongside your usual approach to ensure your love remains balanced and vibrant.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, excels at collaborative bonding and shared experiences, fostering togetherness, while ${
              partnerA.name
            }, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, focuses on independent expressions and personal space, valuing individuality. This subtle contrast creates a balanced partnership that supports both unity and autonomy.`,
          (partnerH, partnerA) =>
            `${partnerH.name} might crave more togetherness from ${partnerA.name}, while ${partnerA.name} could need more personal space. Plan a weekly mix of one shared activity, like a couple’s outing, and one solo moment, like personal time, to strengthen your bond.`,
        ],
        moderate: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, drives collaborative bonding and shared experiences, creating unity, while ${partnerA.name}, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, excels at independent expressions and personal space, fostering individuality. Your moderate contrast adds depth to your romantic connection, blending togetherness with autonomy.`,
          (partnerH, partnerA) =>
            `${partnerH.name} may find ${partnerA.name}'s independence isolating, while ${partnerA.name} might feel collaboration limits freedom. Create a plan with one shared activity, like a date night, and one personal pursuit, like a hobby, to balance your dynamic.`,
        ],
        strong: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, is passionate about collaborative bonding and shared experiences, building unity, while ${
              partnerA.name
            }, as ${
              LoveRomanceTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, excels at independent expressions and personal space, carving their own path. This stark contrast can inspire a vibrant romance when you align your efforts.`,
          (partnerH, partnerA) =>
            `Differences might spark tension, with ${partnerH.name} seeking togetherness and ${partnerA.name} valuing independence. Develop a monthly plan with check-ins on one shared activity, like a joint experience, and one personal pursuit, like a solo hobby, to turn your contrast into a strength.`,
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
                ? "visionary"
                : pole === "L"
                ? "logical"
                : pole === "V"
                ? "heartfelt"
                : pole === "O"
                ? "expressive"
                : pole === "I"
                ? "intimate"
                : pole === "S"
                ? "structured"
                : pole === "F"
                ? "spontaneous"
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
      "When it comes to making decisions in your relationship,",
      "In how you express and share your love,",
      "As you navigate changes in your romantic life,",
      "When supporting each other’s emotional needs,",
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
export default LoveRomanceTemplate;
