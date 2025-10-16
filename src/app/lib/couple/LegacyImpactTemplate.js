export const LegacyImpactTemplate = {
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
        C: { level: "high", description: "practical contributions and tangible legacy projects" },
        N: { level: "medium", description: "visionary impact and innovative legacy ideas" },
      },
      samePole: {
        mild: [
          "You both excel at {poleDescription}, creating a unified approach to building your legacy. You likely thrive on creating tangible outcomes or visionary ideas, making your impact feel cohesive and purposeful. This alignment fosters a partnership where your legacy feels seamless and inspiring.",
          "Your focus on {poleDescription} strengthens your shared impact, but it might limit variety. Plan a quarterly legacy project, like a practical initiative or a visionary goal, to keep your contributions dynamic and balanced.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a robust foundation for your legacy. You probably shine at delivering tangible results or fostering innovative ideas, which fosters purpose and connection. This mutual focus makes your impact feel reliable and motivating.",
          "While your alignment creates a strong legacy foundation, it could benefit from new perspectives. Incorporate a semi-annual legacy activity, like a practical project or a creative vision, to add depth and keep your impact vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your legacy a seamless partnership. You likely excel at tangible contributions or bold visionary ideas, creating a relationship filled with meaningful impact. This synergy transforms your legacy into a shared journey of influence.",
          "Your strong focus is a strength, but it might overlook alternative approaches. Schedule an annual 'legacy reset' to explore a new style, like a practical or visionary initiative, to ensure your impact remains multifaceted and engaging.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, excels at practical contributions and tangible legacy projects, grounding your impact, while ${
              partnerN.name
            }, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, focuses on visionary impact and innovative legacy ideas, sparking creativity. This subtle contrast creates a balanced dynamic that blends structure with inspiration.`,
          (partnerC, partnerN) =>
            `${partnerC.name} might feel ${partnerN.name}'s visionary ideas lack practicality, while ${partnerN.name} could see ${partnerC.name}'s focus as limiting. Alternate between a practical legacy project, like a community initiative, and a visionary one, like a creative endeavor, each quarter to strengthen your impact.`,
        ],
        moderate: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, brings reliability through practical contributions and tangible legacy projects, while ${
              partnerN.name
            }, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, enriches your approach with visionary impact and innovative ideas. Your moderate difference fosters a partnership that’s both grounded and inspiring.`,
          (partnerC, partnerN) =>
            `${partnerC.name} may find ${partnerN.name}'s visionary ideas less actionable, while ${partnerN.name} might see ${partnerC.name}'s practicality as routine. Create a semi-annual plan with one practical legacy project, like a charitable contribution, and one visionary initiative, like a creative vision, to harmonize your styles.`,
        ],
        strong: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, is a master of practical contributions and tangible legacy projects, building a solid foundation, while ${
              partnerN.name
            }, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, excels at visionary impact and innovative legacy ideas, dreaming boldly. This stark contrast can create a vibrant legacy when you combine your strengths.`,
          (partnerC, partnerN) =>
            `Tensions may arise when ${partnerC.name} prioritizes practical projects and ${partnerN.name} seeks visionary ideas, but this is your opportunity. Plan an annual ritual that pairs a practical legacy project, like a community effort, with a visionary initiative, like a bold creative goal, to make your differences a strength.`,
        ],
      },
    },
    decisionMaking: {
      poleDetails: {
        L: { level: "high", description: "logical legacy decisions and strategic impact planning" },
        V: { level: "medium", description: "heartfelt legacy choices and value-driven impact" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a seamless approach to shaping your legacy. You likely excel at strategic planning or heartfelt choices, making your impact feel clear and meaningful. This alignment fosters a partnership where your legacy feels unified and purposeful.",
          "Your focus on {poleDescription} drives a strong legacy approach, but it might limit other perspectives. Try a quarterly legacy discussion to balance logical and heartfelt choices, ensuring your impact deepens your connection in varied ways.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a strong foundation for your legacy. You probably shine at logical planning or value-driven choices, which fosters clarity and motivation. This mutual focus makes your impact feel reliable and warm.",
          "While your alignment creates a strong legacy foundation, it could benefit from variety. Incorporate a semi-annual legacy activity that blends logical and heartfelt perspectives, like strategic planning or a values-based project, to keep your impact vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your legacy a cornerstone of your relationship. You likely excel at strategic decisions or heartfelt choices, creating a partnership that feels unshakable. This synergy transforms your legacy into a unified journey.",
          "Your strong focus is a strength, but it might overlook other approaches. Schedule an annual reflection to explore alternative legacy styles, like blending logic and values in a legacy plan, to ensure your impact remains dynamic.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, excels at logical legacy decisions and strategic impact planning, grounding your approach, while ${
              partnerV.name
            }, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, focuses on heartfelt legacy choices and value-driven impact, deepening connection. This subtle contrast creates a balanced approach to your legacy.`,
          (partnerL, partnerV) =>
            `${partnerL.name} might feel ${partnerV.name}'s heartfelt choices lack strategy, while ${partnerV.name} could see ${partnerL.name}'s logic as detached. Try alternating between a strategic legacy decision, like planning a long-term project, and a heartfelt choice, like a values-driven initiative, each quarter to blend your strengths.`,
        ],
        moderate: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, drives logical legacy decisions and strategic impact planning, ensuring clarity, while ${
              partnerV.name
            }, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, excels at heartfelt legacy choices and value-driven impact, adding warmth. Your moderate contrast creates a dynamic partnership that balances reason and emotion.`,
          (partnerL, partnerV) =>
            `${partnerL.name} may find ${partnerV.name}'s heartfelt choices less strategic, while ${partnerV.name} might see ${partnerL.name}'s logic as cold. Create a plan with one strategic legacy decision, like a structured impact goal, and one heartfelt choice, like a community-driven project, to harmonize your approaches.`,
        ],
        strong: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, thrives on logical legacy decisions and strategic impact planning, providing stability, while ${
              partnerV.name
            }, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, excels at heartfelt legacy choices and value-driven impact, fostering closeness. This stark contrast can spark vibrant impact when you blend your strengths.`,
          (partnerL, partnerV) =>
            `Tensions might emerge when ${partnerL.name} seeks strategic planning and ${partnerV.name} prioritizes heartfelt choices, but this is your strength. Develop a semi-annual ritual that combines a strategic legacy decision, like a structured impact plan, with a heartfelt choice, like a values-based initiative, to make your differences a catalyst for impact.`,
        ],
      },
    },
    energyOrientation: {
      poleDetails: {
        O: { level: "medium", description: "outward-focused legacy projects and community impact" },
        I: { level: "medium", description: "inward-focused legacy goals and personal impact" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a shared energy that enlivens your legacy. You likely excel at community-focused projects or personal impact goals, making your legacy feel vibrant and meaningful. This alignment fosters a bond where impact feels connected and engaging.",
          "Your focus on {poleDescription} fuels a strong legacy approach, but it might limit variety. Plan a quarterly legacy activity, like a community project or a personal goal, to ensure your impact remains balanced and dynamic.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a lively partnership in your legacy. You probably shine at outward-focused projects or introspective goals, which deepens your connection. This mutual energy makes your impact feel warm and inspiring.",
          "While your alignment drives strong legacy habits, it could benefit from new approaches. Incorporate a semi-annual legacy activity, like a community initiative or a personal project, to add depth to your legacy journey.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your legacy a vibrant force. You likely excel at community-focused projects or personal impact goals, creating a partnership that feels deeply united. This synergy transforms your legacy into a dynamic journey.",
          "Your strong focus is powerful, but it might overlook other expressions. Schedule an annual legacy activity, like alternating between community and personal projects, to keep your impact multifaceted and fresh.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, excels at outward-focused legacy projects and community impact, sparking energy, while ${
              partnerI.name
            }, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, focuses on inward-focused legacy goals and personal impact, adding depth. This subtle contrast creates a balanced dynamic that blends engagement with reflection.`,
          (partnerO, partnerI) =>
            `${partnerO.name} might wish ${partnerI.name} was more community-oriented, while ${partnerI.name} could find ${partnerO.name}'s outward focus intense. Alternate between a community-focused legacy project, like a public initiative, and a personal impact goal, like a reflective project, each quarter to combine your strengths.`,
        ],
        moderate: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, drives outward-focused legacy projects and community impact, fueling excitement, while ${
              partnerI.name
            }, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, excels at inward-focused legacy goals and personal impact, grounding your approach. Your moderate contrast creates a partnership that’s both lively and reflective.`,
          (partnerO, partnerI) =>
            `${partnerO.name} may find ${partnerI.name}'s inward focus limiting, while ${partnerI.name} might feel ${partnerO.name}'s outward energy overwhelming. Create a schedule with one community-focused legacy project and one personal impact goal each semi-annually to leverage both styles effectively.`,
        ],
        strong: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, thrives on outward-focused legacy projects and community impact, driving vibrancy, while ${
              partnerI.name
            }, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, excels at inward-focused legacy goals and personal impact, fostering depth. This stark contrast can create a dynamic legacy when you align your energies.`,
          (partnerO, partnerI) =>
            `Tensions might arise when ${partnerO.name} pushes for community projects and ${partnerI.name} craves personal goals, but this is your chance to excel. Plan a semi-annual mix of one community-focused project, like a public initiative, and one personal impact goal, like a reflective project, to turn your differences into a vibrant strength.`,
        ],
      },
    },
    changeApproach: {
      poleDetails: {
        S: { level: "high", description: "structured legacy plans and organized impact strategies" },
        F: { level: "medium", description: "spontaneous legacy actions and flexible impact goals" },
      },
      samePole: {
        mild: [
          "You both excel at {poleDescription}, creating a reliable rhythm in your legacy. You likely thrive on organized strategies or spontaneous actions, making your impact feel secure and engaging. This alignment builds a partnership where legacy feels natural and connected.",
          "Your focus on {poleDescription} fosters a strong legacy approach, but it might limit variety. Plan a semi-annual legacy ritual, like a structured plan or a spontaneous action, to keep your impact dynamic and engaging.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a strong foundation for your legacy. You probably shine at creating organized strategies or embracing spontaneous actions, which fosters consistency and excitement. This mutual focus makes your impact feel reliable and vibrant.",
          "While your alignment is grounding, it could benefit from flexibility. Incorporate an annual legacy activity, like a planned strategy or an impromptu action, to add variety and keep your impact vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your legacy a seamless partnership. You likely excel at crafting structured strategies or spontaneous actions, creating a relationship filled with meaningful impact. This synergy transforms your legacy into a shared triumph.",
          "Your strong focus is powerful, but it might overlook new possibilities. Schedule a biennial 'legacy reset' to explore a new approach, like a structured or spontaneous legacy activity, to ensure your impact remains fresh and multifaceted.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, excels at structured legacy plans and organized impact strategies, providing stability, while ${
              partnerF.name
            }, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, focuses on spontaneous legacy actions and flexible impact goals, adding excitement. This subtle contrast creates a balanced partnership that blends predictability with spontaneity.`,
          (partnerS, partnerF) =>
            `${partnerS.name} might find ${partnerF.name}'s spontaneity unpredictable, while ${partnerF.name} could see ${partnerS.name}'s structure as rigid. Plan a semi-annual mix of one structured legacy project, like a planned initiative, and one spontaneous action, like an impromptu contribution, to blend your strengths.`,
        ],
        moderate: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, drives structured legacy plans and organized impact strategies, ensuring reliability, while ${
              partnerF.name
            }, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, excels at spontaneous legacy actions and flexible impact goals, sparking joy. Your moderate contrast creates a partnership that’s both steady and exciting.`,
          (partnerS, partnerF) =>
            `${partnerS.name} may view ${partnerF.name}'s spontaneity as inconsistent, while ${partnerF.name} might find ${partnerS.name}'s structure limiting. Create a plan with one structured legacy project, like a planned initiative, and one spontaneous action, like an impromptu contribution, to harmonize your styles.`,
        ],
        strong: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, is dedicated to structured legacy plans and organized impact strategies, building a solid foundation, while ${
              partnerF.name
            }, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, excels at spontaneous legacy actions and flexible impact goals, embracing excitement. This stark contrast can drive vibrant impact when you work together.`,
          (partnerS, partnerF) =>
            `Tensions might arise when ${partnerS.name} seeks structure and ${partnerF.name} craves spontaneity, but this is your strength. Develop a semi-annual plan with one structured legacy project, like a planned initiative, and one spontaneous action, like an impromptu contribution, to turn your differences into a powerful advantage.`,
        ],
      },
    },
    interpersonalStyle: {
      poleDetails: {
        H: { level: "medium", description: "collaborative legacy goals and shared impact initiatives" },
        A: { level: "medium", description: "independent legacy pursuits and personal impact goals" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a warm and connected approach to your legacy. You likely excel at shared impact initiatives or personal legacy goals, making your impact feel united and supportive. This alignment strengthens your bond, making legacy a team effort.",
          "Your focus on {poleDescription} fosters unity, but it might limit individual exploration. Encourage each other to try one new legacy activity, like a collaborative initiative or a personal goal, alongside your usual style to keep your impact dynamic.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a powerful sense of togetherness in your legacy. You probably shine at teaming up on impact initiatives or honoring personal goals, which fosters trust and engagement. This mutual focus makes your impact feel natural and inspiring.",
          "While your alignment is heartwarming, it could benefit from individual space. Set one collaborative legacy goal, like a joint initiative, and one personal impact goal, like an individual project, to add variety and depth to your legacy.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, turning your legacy into a shared journey of unity. You likely excel at collaborative impact initiatives or respecting personal goals, creating a partnership that feels unbreakable. This synergy amplifies your impact.",
          "Your strong focus is incredible, but it might overshadow personal pursuits. Dedicate time to one solo legacy activity, like a personal goal, alongside your joint efforts to ensure your impact remains balanced and vibrant.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, excels at collaborative legacy goals and shared impact initiatives, fostering teamwork, while ${
              partnerA.name
            }, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, focuses on independent legacy pursuits and personal impact goals, valuing individuality. This subtle contrast creates a balanced partnership that supports both unity and autonomy.`,
          (partnerH, partnerA) =>
            `${partnerH.name} might crave more collaboration from ${partnerA.name}, while ${partnerA.name} could need more personal space. Plan a quarterly mix of one collaborative legacy project, like a joint initiative, and one personal impact goal, like an individual project, to strengthen your legacy.`,
        ],
        moderate: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, drives collaborative legacy goals and shared impact initiatives, creating unity, while ${
              partnerA.name
            }, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, excels at independent legacy pursuits and personal impact goals, driving individuality. Your moderate contrast adds depth to your legacy, blending togetherness with autonomy.`,
          (partnerH, partnerA) =>
            `${partnerH.name} may find ${partnerA.name}'s independence isolating, while ${partnerA.name} might feel collaboration limits freedom. Create a plan with one collaborative legacy project, like a joint initiative, and one personal impact goal, like an individual project, to balance your dynamic.`,
        ],
        strong: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, is passionate about collaborative legacy goals and shared impact initiatives, building unity, while ${
              partnerA.name
            }, as ${
              LegacyImpactTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, excels at independent legacy pursuits and personal impact goals, carving their own path. This stark contrast can inspire vibrant impact when you align your efforts.`,
          (partnerH, partnerA) =>
            `Differences might spark tension, with ${partnerH.name} seeking collaboration and ${partnerA.name} valuing independence. Develop a semi-annual plan with check-ins on one collaborative legacy project, like a joint initiative, and one personal impact goal, like an individual project, to turn your contrast into a strength.`,
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
      "When it comes to making decisions about your legacy,",
      "In how you direct your legacy efforts,",
      "As you approach planning your impact,",
      "When balancing shared and individual legacy goals,",
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
export default LegacyImpactTemplate;
