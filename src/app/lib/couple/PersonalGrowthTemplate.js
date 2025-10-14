export const PersonalGrowthTemplate = {
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
        C: { level: "high", description: "practical self-improvement and actionable goals" },
        N: { level: "medium", description: "visionary growth and conceptual self-discovery" },
      },
      samePole: {
        mild: [
          "You both excel at {poleDescription}, creating a unified approach to personal growth. You likely thrive on setting actionable goals or exploring visionary self-discovery, making your development feel aligned and purposeful. This alignment fosters a partnership where growth feels seamless and inspiring.",
          "Your focus on {poleDescription} strengthens your personal development, but it might limit variety. Plan a weekly growth activity, like a practical goal or a visionary exploration, to keep your journey dynamic and balanced.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a robust foundation for personal growth. You probably shine at pursuing practical goals or conceptual self-discovery, which fosters motivation and connection. This mutual focus makes your development feel reliable and inspiring.",
          "While your alignment creates momentum, it could benefit from new perspectives. Incorporate a monthly growth activity, like a practical task or a visionary reflection, to add depth and keep your journey vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making personal growth a seamless partnership. You likely excel at actionable goals or bold visionary pursuits, creating a relationship filled with purposeful development. This synergy transforms your growth into a shared journey of progress.",
          "Your strong focus is a strength, but it might overlook alternative approaches. Schedule a quarterly 'growth reset' to explore a new style, like a practical or visionary activity, to ensure your development remains multifaceted and engaging.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, excels at practical self-improvement and actionable goals, grounding your growth, while ${
              partnerN.name
            }, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, focuses on visionary growth and conceptual self-discovery, dreaming big. This subtle contrast creates a balanced dynamic that blends structure with inspiration.`,
          (partnerC, partnerN) =>
            `${partnerC.name} might feel ${partnerN.name}'s visionary pursuits lack focus, while ${partnerN.name} could see ${partnerC.name}'s practical goals as limiting. Alternate between a practical growth task, like a skill-building exercise, and a visionary one, like a reflective journal, each week to strengthen your development.`,
        ],
        moderate: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, brings reliability through practical self-improvement and actionable goals, while ${partnerN.name}, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, enriches growth with visionary pursuits and conceptual self-discovery. Your moderate difference fosters a partnership that’s both grounded and inspiring.`,
          (partnerC, partnerN) =>
            `${partnerC.name} may find ${partnerN.name}'s visionary focus less actionable, while ${partnerN.name} might see ${partnerC.name}'s practicality as routine. Create a weekly plan with one practical growth task, like a measurable goal, and one visionary pursuit, like a self-discovery exercise, to harmonize your styles.`,
        ],
        strong: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, is a master of practical self-improvement and actionable goals, building a solid foundation, while ${
              partnerN.name
            }, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, excels at visionary growth and conceptual self-discovery, dreaming boldly. This stark contrast can create a rich growth journey when you combine your strengths.`,
          (partnerC, partnerN) =>
            `Tensions may arise when ${partnerC.name} prioritizes practical goals and ${partnerN.name} seeks visionary exploration, but this is your opportunity. Plan a monthly ritual that pairs a practical growth task, like learning a skill, with a visionary pursuit, like exploring personal values, to make your differences a strength.`,
        ],
      },
    },
    decisionMaking: {
      poleDetails: {
        L: { level: "high", description: "logical self-assessment and structured growth plans" },
        V: { level: "medium", description: "heartfelt reflection and value-driven growth" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a seamless approach to personal growth. You likely excel at logical self-assessment or heartfelt reflection, making your development feel clear and meaningful. This alignment fosters a partnership where growth feels unified and purposeful.",
          "Your focus on {poleDescription} drives progress, but it might limit other approaches. Try a weekly reflection to balance logical and heartfelt growth, ensuring your development deepens your connection in varied ways.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a strong foundation for personal growth. You probably shine at structured plans or value-driven reflection, which fosters clarity and motivation. This mutual focus makes your development feel reliable and inspiring.",
          "While your alignment creates momentum, it could benefit from variety. Incorporate a monthly reflection that blends logical and heartfelt perspectives, like assessing progress and exploring values, to keep your growth vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making personal growth a cornerstone of your relationship. You likely excel at logical assessments or heartfelt reflections, creating a partnership that feels unshakable. This synergy transforms your growth into a unified journey.",
          "Your strong focus is a strength, but it might overlook other perspectives. Schedule a quarterly reflection to explore alternative growth styles, like blending logic and values in a personal plan, to ensure your development remains dynamic.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, excels at logical self-assessment and structured growth plans, grounding your development, while ${
              partnerV.name
            }, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, focuses on heartfelt reflection and value-driven growth, deepening connection. This subtle contrast creates a balanced approach to your personal growth.`,
          (partnerL, partnerV) =>
            `${partnerL.name} might feel ${partnerV.name}'s heartfelt approach lacks structure, while ${partnerV.name} could see ${partnerL.name}'s logic as detached. Try alternating between logical assessments, like tracking progress, and heartfelt reflections, like exploring values, each week to blend your strengths.`,
        ],
        moderate: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, drives logical self-assessment and structured growth plans, ensuring clarity, while ${
              partnerV.name
            }, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, excels at heartfelt reflection and value-driven growth, adding warmth. Your moderate contrast creates a dynamic partnership that balances reason and emotion.`,
          (partnerL, partnerV) =>
            `${partnerL.name} may find ${partnerV.name}'s heartfelt reflection less structured, while ${partnerV.name} might see ${partnerL.name}'s logic as cold. Create a plan with one logical assessment, like a growth metric, and one heartfelt reflection, like a value-driven goal, to harmonize your approaches.`,
        ],
        strong: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, thrives on logical self-assessment and structured growth plans, providing stability, while ${
              partnerV.name
            }, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, excels at heartfelt reflection and value-driven growth, fostering closeness. This stark contrast can spark vibrant growth when you blend your strengths.`,
          (partnerL, partnerV) =>
            `Tensions might emerge when ${partnerL.name} seeks logic and ${partnerV.name} prioritizes emotion, but this is your strength. Develop a weekly ritual that combines a logical assessment, like tracking progress, with a heartfelt reflection, like exploring personal values, to make your differences a catalyst for growth.`,
        ],
      },
    },
    energyOrientation: {
      poleDetails: {
        O: { level: "medium", description: "outward-focused growth and social learning" },
        I: { level: "medium", description: "inward-focused growth and introspective development" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a shared energy that enlivens your personal growth. You likely excel at social learning or introspective development, making your journey feel vibrant and meaningful. This alignment fosters a bond where growth feels connected and engaging.",
          "Your focus on {poleDescription} fuels progress, but it might limit variety. Plan a weekly growth activity, like a social workshop or a reflective practice, to ensure your development remains balanced and dynamic.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a lively partnership in personal growth. You probably shine at group learning or introspective reflection, which deepens your connection. This mutual energy makes your growth feel warm and inspiring.",
          "While your alignment drives progress, it could benefit from new approaches. Incorporate a monthly activity, like a social seminar or a solo reflection, to add depth to your growth journey.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making personal growth a vibrant force. You likely excel at social learning or introspective development, creating a partnership that feels deeply united. This synergy transforms your growth into a dynamic journey.",
          "Your strong focus is powerful, but it might overlook other expressions. Schedule a quarterly activity, like alternating between social and introspective growth practices, to keep your development multifaceted and fresh.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, excels at outward-focused growth and social learning, sparking energy, while ${partnerI.name}, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, focuses on inward-focused growth and introspective development, adding depth. This subtle contrast creates a balanced dynamic that blends engagement with reflection.`,
          (partnerO, partnerI) =>
            `${partnerO.name} might wish ${partnerI.name} was more socially engaged, while ${partnerI.name} could find ${partnerO.name}'s energy intense. Alternate between a social growth activity, like a workshop, and an introspective one, like journaling, each week to combine your strengths.`,
        ],
        moderate: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, drives outward-focused growth and social learning, fueling engagement, while ${partnerI.name}, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, excels at inward-focused growth and introspective development, grounding your journey. Your moderate contrast creates a partnership that’s both lively and meaningful.`,
          (partnerO, partnerI) =>
            `${partnerO.name} may find ${partnerI.name}'s introspection slow, while ${partnerI.name} might feel ${partnerO.name}'s social energy is overwhelming. Create a schedule with one social growth activity and one introspective practice each month to leverage both styles effectively.`,
        ],
        strong: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, thrives on outward-focused growth and social learning, driving vibrancy, while ${partnerI.name}, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, excels at inward-focused growth and introspective development, fostering depth. This stark contrast can create a dynamic growth journey when you align your energies.`,
          (partnerO, partnerI) =>
            `Tensions might arise when ${partnerO.name} pushes for social learning and ${partnerI.name} craves introspection, but this is your chance to excel. Plan a weekly mix of one social growth activity, like a group class, and one introspective practice, like a personal reflection, to turn your differences into a vibrant strength.`,
        ],
      },
    },
    changeApproach: {
      poleDetails: {
        S: { level: "high", description: "structured growth plans and consistent practices" },
        F: { level: "medium", description: "flexible growth and adaptive self-discovery" },
      },
      samePole: {
        mild: [
          "You both excel at {poleDescription}, creating a reliable rhythm in your personal growth. You likely thrive on consistent practices or adaptive self-discovery, making your development feel secure and effective. This alignment builds a partnership where growth feels natural and connected.",
          "Your focus on {poleDescription} fosters progress, but it might limit variety. Plan a monthly growth ritual, like a structured practice or a flexible exploration, to keep your development dynamic and engaging.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a strong foundation for personal growth. You probably shine at creating consistent plans or embracing adaptive self-discovery, which fosters trust and motivation. This mutual focus makes your growth feel reliable and vibrant.",
          "While your alignment is grounding, it could benefit from flexibility. Incorporate a quarterly activity, like a structured growth plan or an adaptive exploration, to add variety and keep your development vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making personal growth a seamless partnership. You likely excel at crafting consistent plans or adaptive explorations, creating a relationship filled with purposeful development. This synergy transforms your growth into a shared triumph.",
          "Your strong focus is powerful, but it might overlook new possibilities. Schedule an annual 'growth reset' to explore a new approach, like a structured or flexible growth activity, to ensure your development remains fresh and multifaceted.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, excels at structured growth plans and consistent practices, providing stability, while ${
              partnerF.name
            }, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, focuses on flexible growth and adaptive self-discovery, adding spontaneity. This subtle contrast creates a balanced partnership that blends predictability with adaptability.`,
          (partnerS, partnerF) =>
            `${partnerS.name} might find ${partnerF.name}'s flexibility unpredictable, while ${partnerF.name} could see ${partnerS.name}'s structure as rigid. Plan a monthly mix of one structured growth practice, like a daily habit, and one flexible exploration, like a spontaneous reflection, to blend your strengths.`,
        ],
        moderate: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, drives structured growth plans and consistent practices, ensuring reliability, while ${
              partnerF.name
            }, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, excels at flexible growth and adaptive self-discovery, sparking spontaneity. Your moderate contrast creates a partnership that’s both steady and dynamic.`,
          (partnerS, partnerF) =>
            `${partnerS.name} may view ${partnerF.name}'s flexibility as inconsistent, while ${partnerF.name} might find ${partnerS.name}'s structure limiting. Create a plan with one structured growth practice, like a scheduled goal, and one flexible exploration, like a spontaneous reflection, to harmonize your styles.`,
        ],
        strong: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, is dedicated to structured growth plans and consistent practices, building a solid foundation, while ${
              partnerF.name
            }, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, excels at flexible growth and adaptive self-discovery, embracing spontaneity. This stark contrast can drive vibrant growth when you work together.`,
          (partnerS, partnerF) =>
            `Tensions might arise when ${partnerS.name} seeks structure and ${partnerF.name} craves flexibility, but this is your strength. Develop a monthly plan with one structured growth practice, like a consistent habit, and one flexible exploration, like a spontaneous reflection, to turn your differences into a powerful advantage.`,
        ],
      },
    },
    interpersonalStyle: {
      poleDetails: {
        H: { level: "medium", description: "collaborative growth and shared learning" },
        A: { level: "medium", description: "independent growth and personal reflection" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a warm and connected approach to personal growth. You likely excel at shared learning or valuing personal reflection, making your development feel united and supportive. This alignment strengthens your bond, making growth a team effort.",
          "Your focus on {poleDescription} fosters unity, but it might limit individual exploration. Encourage each other to try one new growth activity, like a shared learning session or a solo reflection, alongside your usual style to keep your development dynamic.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a powerful sense of togetherness in personal growth. You probably shine at teaming up on learning or honoring personal reflection, which fosters trust and motivation. This mutual focus makes your growth feel natural and inspiring.",
          "While your alignment is heartwarming, it could benefit from individual space. Set one collaborative growth goal, like a shared learning session, and one personal reflection, like a solo insight, to add variety and depth to your growth journey.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, turning personal growth into a shared journey of progress. You likely excel at collaborative learning or respecting personal reflection, creating a partnership that feels unbreakable. This synergy amplifies your connection.",
          "Your strong focus is incredible, but it might overshadow personal pursuits. Dedicate time to one solo growth activity, like a personal reflection, alongside your joint efforts to ensure your development remains balanced and vibrant.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, excels at collaborative growth and shared learning, fostering teamwork, while ${partnerA.name}, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, focuses on independent growth and personal reflection, valuing individuality. This subtle contrast creates a balanced partnership that supports both unity and autonomy.`,
          (partnerH, partnerA) =>
            `${partnerH.name} might crave more collaboration from ${partnerA.name}, while ${partnerA.name} could need more personal space. Plan a weekly mix of one shared growth activity, like a joint learning session, and one solo reflection, like a personal insight, to strengthen your development.`,
        ],
        moderate: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, drives collaborative growth and shared learning, creating unity, while ${partnerA.name}, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, excels at independent growth and personal reflection, driving individuality. Your moderate contrast adds depth to your growth journey, blending togetherness with autonomy.`,
          (partnerH, partnerA) =>
            `${partnerH.name} may find ${partnerA.name}'s independence isolating, while ${partnerA.name} might feel collaboration limits freedom. Create a plan with one shared growth activity, like a team learning session, and one personal reflection, like a solo insight, to balance your dynamic.`,
        ],
        strong: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, is passionate about collaborative growth and shared learning, building unity, while ${
              partnerA.name
            }, as ${
              PersonalGrowthTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, excels at independent growth and personal reflection, carving their own path. This stark contrast can inspire vibrant growth when you align your efforts.`,
          (partnerH, partnerA) =>
            `Differences might spark tension, with ${partnerH.name} seeking collaboration and ${partnerA.name} valuing independence. Develop a monthly plan with check-ins on one shared growth activity, like a joint learning session, and one personal reflection, like a solo insight, to turn your contrast into a strength.`,
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
                ? "outward-focused"
                : pole === "I"
                ? "inward-focused"
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
      "When it comes to reflecting on your growth,",
      "In how you engage with your personal development,",
      "As you navigate changes in your growth journey,",
      "When balancing shared and individual growth,",
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
export default PersonalGrowthTemplate;
