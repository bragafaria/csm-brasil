export const LeisureAdventureTemplate = {
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
        C: { level: "high", description: "practical leisure plans and tangible experiences" },
        N: { level: "medium", description: "imaginative adventures and visionary pursuits" },
      },
      samePole: {
        mild: [
          "You both excel at {poleDescription}, creating a unified approach to your leisure and adventures. You likely thrive on organizing fun outings or dreaming up creative experiences, making your shared time vibrant and fulfilling. This alignment fosters a partnership where leisure feels seamless and exciting.",
          "Your focus on {poleDescription} strengthens your adventures, but it might limit variety. Plan a weekly leisure activity, like a practical outing or a visionary exploration, to keep your experiences dynamic and balanced.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a robust foundation for your leisure pursuits. You probably shine at planning enjoyable activities or envisioning unique adventures, which fosters joy and connection. This mutual focus makes your leisure time feel reliable and inspiring.",
          "While your alignment creates excitement, it could benefit from new perspectives. Incorporate a monthly activity, like a planned trip or a creative pursuit, to add depth and keep your adventures vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your leisure and adventures a seamless partnership. You likely excel at crafting practical plans or bold visionary experiences, creating a relationship filled with thrilling moments. This synergy transforms your leisure into a shared journey of joy.",
          "Your strong focus is a strength, but it might overlook alternative approaches. Schedule a quarterly 'adventure reset' to explore a new style, like a practical or imaginative activity, to ensure your leisure remains multifaceted and engaging.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, excels at practical leisure plans and tangible experiences, grounding your adventures, while ${
              partnerN.name
            }, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, focuses on imaginative adventures and visionary pursuits, dreaming big. This subtle contrast creates a balanced dynamic that blends structure with creativity.`,
          (partnerC, partnerN) =>
            `${partnerC.name} might feel ${partnerN.name}'s dreams lack practicality, while ${partnerN.name} could see ${partnerC.name}'s plans as limiting. Alternate between a practical activity, like a planned hike, and a visionary one, like a creative project, each week to strengthen your leisure time.`,
        ],
        moderate: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, brings reliability through practical leisure plans and tangible experiences, while ${
              partnerN.name
            }, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, enriches your time with imaginative adventures and visionary pursuits. Your moderate difference fosters a partnership that’s both grounded and inspiring.`,
          (partnerC, partnerN) =>
            `${partnerC.name} may find ${partnerN.name}'s visionary pursuits less actionable, while ${partnerN.name} might see ${partnerC.name}'s plans as routine. Create a weekly plan with one practical activity, like a scheduled outing, and one visionary pursuit, like a creative adventure, to harmonize your styles.`,
        ],
        strong: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, is a master of practical leisure plans and tangible experiences, building a solid foundation, while ${
              partnerN.name
            }, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, excels at imaginative adventures and visionary pursuits, dreaming boldly. This stark contrast can create thrilling leisure time when you combine your strengths.`,
          (partnerC, partnerN) =>
            `Tensions may arise when ${partnerC.name} prioritizes practical plans and ${partnerN.name} seeks imaginative pursuits, but this is your opportunity. Plan a monthly ritual that pairs a practical activity, like a planned trip, with a visionary one, like a creative adventure, to make your differences a strength.`,
        ],
      },
    },
    decisionMaking: {
      poleDetails: {
        L: { level: "high", description: "logical choices for leisure and structured adventure plans" },
        V: { level: "medium", description: "heartfelt decisions and emotionally driven adventures" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a seamless approach to planning your leisure and adventures. You likely excel at logical choices or heartfelt decisions, making your shared experiences feel organized and meaningful. This alignment fosters a partnership where leisure feels unified and joyful.",
          "Your focus on {poleDescription} drives excitement, but it might limit other approaches. Try a weekly planning session to balance logical and heartfelt choices, ensuring your adventures deepen your connection in varied ways.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a strong foundation for your leisure decisions. You probably shine at structured planning or emotionally driven choices, which fosters trust and joy. This mutual focus makes your adventures feel reliable and warm.",
          "While your alignment creates harmony, it could benefit from variety. Incorporate a monthly discussion that blends logical and heartfelt perspectives, like planning an adventure with both structure and emotion, to keep your leisure vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your leisure and adventure planning a cornerstone of your relationship. You likely excel at logical choices or heartfelt decisions, creating a partnership that feels unshakable. This synergy transforms your adventures into a unified force.",
          "Your strong focus is a strength, but it might overlook other perspectives. Schedule a quarterly reflection to explore alternative decision-making styles, like blending logic and emotion in an adventure plan, to ensure your leisure remains dynamic.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, excels at logical choices for leisure and structured adventure plans, grounding your experiences, while ${
              partnerV.name
            }, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, focuses on heartfelt decisions and emotionally driven adventures, deepening connection. This subtle contrast creates a balanced approach to your leisure time.`,
          (partnerL, partnerV) =>
            `${partnerL.name} might feel ${partnerV.name}'s emotional choices lack structure, while ${partnerV.name} could see ${partnerL.name}'s logic as detached. Try alternating between logical planning, like scheduling an outing, and heartfelt choices, like picking an emotional adventure, each week to blend your strengths.`,
        ],
        moderate: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, drives logical choices for leisure and structured adventure plans, ensuring clarity, while ${
              partnerV.name
            }, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, excels at heartfelt decisions and emotionally driven adventures, adding warmth. Your moderate contrast creates a dynamic partnership that balances reason and emotion.`,
          (partnerL, partnerV) =>
            `${partnerL.name} may find ${partnerV.name}'s emotional choices less structured, while ${partnerV.name} might see ${partnerL.name}'s logic as cold. Create a plan with one logical step, like organizing an adventure, and one heartfelt choice, like a meaningful activity, to harmonize your approaches.`,
        ],
        strong: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, thrives on logical choices for leisure and structured adventure plans, providing stability, while ${
              partnerV.name
            }, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, excels at heartfelt decisions and emotionally driven adventures, fostering closeness. This stark contrast can spark vibrant adventures when you blend your strengths.`,
          (partnerL, partnerV) =>
            `Tensions might emerge when ${partnerL.name} seeks logic and ${partnerV.name} prioritizes emotion, but this is your strength. Develop a weekly ritual that combines a logical plan, like organizing an outing, with a heartfelt choice, like a meaningful adventure, to make your differences a catalyst for excitement.`,
        ],
      },
    },
    energyOrientation: {
      poleDetails: {
        O: { level: "medium", description: "social leisure and group adventures" },
        I: { level: "medium", description: "intimate leisure and personal exploration" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a shared energy that enlivens your leisure time. You likely excel at group adventures or intimate explorations, making your activities feel vibrant and meaningful. This alignment fosters a bond where leisure feels connected and engaging.",
          "Your focus on {poleDescription} fuels excitement, but it might limit variety. Plan a weekly activity, like a group outing or a quiet exploration, to ensure your leisure remains balanced and dynamic.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a lively partnership in your leisure pursuits. You probably shine at social events or personal explorations, which deepens your connection. This mutual energy makes your adventures feel warm and inspiring.",
          "While your alignment drives closeness, it could benefit from new approaches. Incorporate a monthly activity, like a group adventure or a solo pursuit, to add depth to your leisure time.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your leisure and adventures a vibrant force. You likely excel at social engagements or intimate explorations, creating a partnership that feels deeply united. This synergy transforms your leisure into a dynamic journey.",
          "Your strong focus is powerful, but it might overlook other expressions. Schedule a quarterly activity, like alternating between social and intimate adventures, to keep your leisure multifaceted and fresh.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, excels at social leisure and group adventures, sparking energy, while ${partnerI.name}, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, focuses on intimate leisure and personal exploration, adding depth. This subtle contrast creates a balanced dynamic that blends excitement with intimacy.`,
          (partnerO, partnerI) =>
            `${partnerO.name} might wish ${partnerI.name} was more outgoing, while ${partnerI.name} could find ${partnerO.name}'s energy intense. Alternate between a social adventure, like a group outing, and an intimate activity, like a quiet exploration, each week to combine your strengths.`,
        ],
        moderate: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, drives social leisure and group adventures, fueling excitement, while ${partnerI.name}, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, excels at intimate leisure and personal exploration, grounding your experiences. Your moderate contrast creates a partnership that’s both lively and meaningful.`,
          (partnerO, partnerI) =>
            `${partnerO.name} may find ${partnerI.name}'s introspection slow, while ${partnerI.name} might feel ${partnerO.name}'s energy is overwhelming. Create a schedule with one social adventure and one intimate activity each month to leverage both styles effectively.`,
        ],
        strong: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, thrives on social leisure and group adventures, driving vibrancy, while ${partnerI.name}, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, excels at intimate leisure and personal exploration, fostering depth. This stark contrast can create dynamic adventures when you align your energies.`,
          (partnerO, partnerI) =>
            `Tensions might arise when ${partnerO.name} pushes for social adventures and ${partnerI.name} craves personal exploration, but this is your chance to excel. Plan a weekly mix of one social activity, like a group outing, and one intimate pursuit, like a solo adventure, to turn your differences into a vibrant strength.`,
        ],
      },
    },
    changeApproach: {
      poleDetails: {
        S: { level: "high", description: "structured leisure plans and organized adventures" },
        F: { level: "medium", description: "spontaneous leisure and flexible adventures" },
      },
      samePole: {
        mild: [
          "You both excel at {poleDescription}, creating a reliable rhythm in your leisure and adventures. You likely thrive on organized plans or spontaneous outings, making your experiences feel secure and exciting. This alignment builds a partnership where leisure feels natural and connected.",
          "Your focus on {poleDescription} fosters joy, but it might limit variety. Plan a monthly ritual, like a structured trip or a spontaneous adventure, to keep your leisure dynamic and engaging.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a strong foundation for your leisure pursuits. You probably shine at creating organized plans or embracing spontaneous adventures, which fosters trust and excitement. This mutual focus makes your leisure time feel reliable and vibrant.",
          "While your alignment is grounding, it could benefit from flexibility. Incorporate a quarterly activity, like a planned trip or an impromptu adventure, to add variety and keep your leisure vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your leisure and adventures a seamless partnership. You likely excel at crafting structured plans or spontaneous outings, creating a relationship filled with joyful moments. This synergy transforms your leisure into a shared triumph.",
          "Your strong focus is powerful, but it might overlook new possibilities. Schedule an annual 'leisure reset' to explore a new approach, like a planned or spontaneous adventure, to ensure your experiences remain fresh and multifaceted.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, excels at structured leisure plans and organized adventures, providing stability, while ${
              partnerF.name
            }, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, focuses on spontaneous leisure and flexible adventures, adding excitement. This subtle contrast creates a balanced partnership that blends predictability with spontaneity.`,
          (partnerS, partnerF) =>
            `${partnerS.name} might find ${partnerF.name}'s spontaneity unpredictable, while ${partnerF.name} could see ${partnerS.name}'s structure as rigid. Plan a monthly mix of one structured adventure, like a planned trip, and one spontaneous activity, like a surprise outing, to blend your strengths.`,
        ],
        moderate: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, drives structured leisure plans and organized adventures, ensuring reliability, while ${
              partnerF.name
            }, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, excels at spontaneous leisure and flexible adventures, sparking joy. Your moderate contrast creates a partnership that’s both steady and exciting.`,
          (partnerS, partnerF) =>
            `${partnerS.name} may view ${partnerF.name}'s spontaneity as inconsistent, while ${partnerF.name} might find ${partnerS.name}'s structure limiting. Create a plan with one structured adventure, like a planned outing, and one spontaneous activity, like a surprise adventure, to harmonize your styles.`,
        ],
        strong: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, is dedicated to structured leisure plans and organized adventures, building a solid foundation, while ${
              partnerF.name
            }, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, excels at spontaneous leisure and flexible adventures, embracing excitement. This stark contrast can drive vibrant adventures when you work together.`,
          (partnerS, partnerF) =>
            `Tensions might arise when ${partnerS.name} seeks structure and ${partnerF.name} craves spontaneity, but this is your strength. Develop a monthly plan with one structured adventure, like a planned trip, and one spontaneous activity, like a surprise outing, to turn your differences into a powerful advantage.`,
        ],
      },
    },
    interpersonalStyle: {
      poleDetails: {
        H: { level: "medium", description: "collaborative leisure and shared adventures" },
        A: { level: "medium", description: "independent leisure and personal pursuits" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a warm and connected approach to leisure. You likely excel at shared adventures or valuing personal pursuits, making your experiences feel united and supportive. This alignment strengthens your bond, making leisure a team effort.",
          "Your focus on {poleDescription} fosters unity, but it might limit individual exploration. Encourage each other to try one new leisure activity, like a shared adventure or a solo pursuit, alongside your usual style to keep your experiences dynamic.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a powerful sense of togetherness in your leisure time. You probably shine at teaming up on adventures or honoring personal pursuits, which fosters trust and joy. This mutual focus makes your leisure feel natural and inspiring.",
          "While your alignment is heartwarming, it could benefit from individual space. Set one collaborative leisure goal, like a shared adventure, and one personal pursuit, like a solo activity, to add variety and depth to your leisure time.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, turning your leisure into a shared journey of excitement. You likely excel at collaborative adventures or respecting personal pursuits, creating a partnership that feels unbreakable. This synergy amplifies your connection.",
          "Your strong focus is incredible, but it might overshadow personal pursuits. Dedicate time to one solo leisure activity, like a personal pursuit, alongside your joint efforts to ensure your experiences remain balanced and vibrant.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, excels at collaborative leisure and shared adventures, fostering teamwork, while ${partnerA.name}, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, focuses on independent leisure and personal pursuits, valuing individuality. This subtle contrast creates a balanced partnership that supports both unity and autonomy.`,
          (partnerH, partnerA) =>
            `${partnerH.name} might crave more collaboration from ${partnerA.name}, while ${partnerA.name} could need more personal space. Plan a weekly mix of one shared adventure, like a group outing, and one solo pursuit, like a personal activity, to strengthen your leisure time.`,
        ],
        moderate: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, drives collaborative leisure and shared adventures, creating unity, while ${partnerA.name}, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, excels at independent leisure and personal pursuits, driving individuality. Your moderate contrast adds depth to your leisure time, blending togetherness with autonomy.`,
          (partnerH, partnerA) =>
            `${partnerH.name} may find ${partnerA.name}'s independence isolating, while ${partnerA.name} might feel collaboration limits freedom. Create a plan with one shared adventure, like a team outing, and one personal pursuit, like a solo activity, to balance your dynamic.`,
        ],
        strong: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, is passionate about collaborative leisure and shared adventures, building unity, while ${
              partnerA.name
            }, as ${
              LeisureAdventureTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, excels at independent leisure and personal pursuits, carving their own path. This stark contrast can inspire vibrant adventures when you align your efforts.`,
          (partnerH, partnerA) =>
            `Differences might spark tension, with ${partnerH.name} seeking collaboration and ${partnerA.name} valuing independence. Develop a monthly plan with check-ins on one shared adventure, like a joint outing, and one personal pursuit, like a solo activity, to turn your contrast into a strength.`,
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
                ? "imaginative"
                : pole === "L"
                ? "logical"
                : pole === "V"
                ? "heartfelt"
                : pole === "O"
                ? "social"
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
      "When it comes to planning your leisure and adventures,",
      "In how you engage in your shared activities,",
      "As you navigate changes in your leisure pursuits,",
      "When balancing shared and personal adventures,",
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
export default LeisureAdventureTemplate;
