export const HealthWellnessTemplate = {
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
        C: { level: "high", description: "practical health routines and evidence-based wellness" },
        N: { level: "medium", description: "holistic wellness and innovative health approaches" },
      },
      samePole: {
        mild: [
          "You both excel at {poleDescription}, creating a unified approach to health and wellness. You likely thrive on structured routines or innovative health practices, making your wellness journey feel cohesive and effective. This alignment fosters a partnership where health feels seamless and motivating.",
          "Your focus on {poleDescription} strengthens your wellness, but it might limit variety. Plan a weekly health activity, like a structured workout or a holistic practice, to keep your wellness journey dynamic and balanced.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a robust foundation for health and wellness. You probably shine at maintaining practical routines or exploring innovative health approaches, which fosters vitality and connection. This mutual focus makes your wellness feel reliable and inspiring.",
          "While your alignment creates a strong wellness foundation, it could benefit from new perspectives. Incorporate a monthly health activity, like a practical routine or a holistic practice, to add depth and keep your wellness vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making health and wellness a seamless partnership. You likely excel at evidence-based routines or bold holistic approaches, creating a relationship filled with vitality. This synergy transforms your wellness into a shared journey of health.",
          "Your strong focus is a strength, but it might overlook alternative approaches. Schedule a quarterly 'wellness reset' to explore a new style, like a practical or holistic health activity, to ensure your wellness remains multifaceted and engaging.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, excels at practical health routines and evidence-based wellness, grounding your approach, while ${
              partnerN.name
            }, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, focuses on holistic wellness and innovative health approaches, adding creativity. This subtle contrast creates a balanced dynamic that blends structure with innovation.`,
          (partnerC, partnerN) =>
            `${partnerC.name} might feel ${partnerN.name}'s holistic approaches lack evidence, while ${partnerN.name} could see ${partnerC.name}'s routines as rigid. Alternate between a practical health activity, like a structured workout, and a holistic one, like meditation, each week to strengthen your wellness.`,
        ],
        moderate: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, brings reliability through practical health routines and evidence-based wellness, while ${
              partnerN.name
            }, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, enriches your approach with holistic wellness and innovative health practices. Your moderate difference fosters a partnership that’s both grounded and inspiring.`,
          (partnerC, partnerN) =>
            `${partnerC.name} may find ${partnerN.name}'s holistic approaches less structured, while ${partnerN.name} might see ${partnerC.name}'s routines as limiting. Create a weekly plan with one practical health activity, like a fitness routine, and one holistic practice, like yoga, to harmonize your styles.`,
        ],
        strong: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, is a master of practical health routines and evidence-based wellness, building a solid foundation, while ${
              partnerN.name
            }, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, excels at holistic wellness and innovative health approaches, dreaming boldly. This stark contrast can create a vibrant wellness journey when you combine your strengths.`,
          (partnerC, partnerN) =>
            `Tensions may arise when ${partnerC.name} prioritizes practical routines and ${partnerN.name} seeks holistic approaches, but this is your opportunity. Plan a monthly ritual that pairs a practical health activity, like a structured diet plan, with a holistic practice, like mindfulness, to make your differences a strength.`,
        ],
      },
    },
    decisionMaking: {
      poleDetails: {
        L: { level: "high", description: "logical health decisions and data-driven wellness" },
        V: { level: "medium", description: "heartfelt wellness choices and value-driven health" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a seamless approach to health and wellness. You likely excel at data-driven decisions or heartfelt choices, making your wellness journey feel clear and meaningful. This alignment fosters a partnership where health feels unified and purposeful.",
          "Your focus on {poleDescription} drives a strong wellness approach, but it might limit other perspectives. Try a weekly wellness check-in to balance logical and heartfelt choices, ensuring your health journey deepens your connection in varied ways.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a strong foundation for health and wellness. You probably shine at logical health decisions or value-driven choices, which fosters clarity and motivation. This mutual focus makes your wellness feel reliable and warm.",
          "While your alignment creates a strong health foundation, it could benefit from variety. Incorporate a monthly wellness activity that blends logical and heartfelt perspectives, like tracking health metrics or prioritizing emotional well-being, to keep your wellness vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making health and wellness a cornerstone of your relationship. You likely excel at data-driven decisions or heartfelt choices, creating a partnership that feels unshakable. This synergy transforms your wellness into a unified journey.",
          "Your strong focus is a strength, but it might overlook other approaches. Schedule a quarterly reflection to explore alternative wellness styles, like blending logic and values in a health plan, to ensure your wellness remains dynamic.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, excels at logical health decisions and data-driven wellness, grounding your approach, while ${
              partnerV.name
            }, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, focuses on heartfelt wellness choices and value-driven health, deepening connection. This subtle contrast creates a balanced approach to your wellness journey.`,
          (partnerL, partnerV) =>
            `${partnerL.name} might feel ${partnerV.name}'s heartfelt choices lack data, while ${partnerV.name} could see ${partnerL.name}'s logic as detached. Try alternating between logical health decisions, like tracking fitness metrics, and heartfelt choices, like prioritizing emotional well-being, each week to blend your strengths.`,
        ],
        moderate: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, drives logical health decisions and data-driven wellness, ensuring clarity, while ${partnerV.name}, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, excels at heartfelt wellness choices and value-driven health, adding warmth. Your moderate contrast creates a dynamic partnership that balances reason and emotion.`,
          (partnerL, partnerV) =>
            `${partnerL.name} may find ${partnerV.name}'s heartfelt choices less structured, while ${partnerV.name} might see ${partnerL.name}'s logic as cold. Create a plan with one logical health decision, like a data-driven fitness goal, and one heartfelt choice, like a wellness ritual, to harmonize your approaches.`,
        ],
        strong: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, thrives on logical health decisions and data-driven wellness, providing stability, while ${
              partnerV.name
            }, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, excels at heartfelt wellness choices and value-driven health, fostering closeness. This stark contrast can spark vibrant wellness when you blend your strengths.`,
          (partnerL, partnerV) =>
            `Tensions might emerge when ${partnerL.name} seeks logical decisions and ${partnerV.name} prioritizes heartfelt choices, but this is your strength. Develop a weekly ritual that combines a logical health decision, like tracking nutrition, with a heartfelt choice, like a mindfulness practice, to make your differences a catalyst for wellness.`,
        ],
      },
    },
    energyOrientation: {
      poleDetails: {
        O: { level: "medium", description: "social wellness activities and group health goals" },
        I: { level: "medium", description: "individual wellness practices and introspective health" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a shared energy that enlivens your health and wellness. You likely excel at group fitness activities or introspective health practices, making your wellness journey feel vibrant and meaningful. This alignment fosters a bond where health feels connected and engaging.",
          "Your focus on {poleDescription} fuels a strong wellness approach, but it might limit variety. Plan a weekly wellness activity, like a group fitness class or a solo meditation session, to ensure your health journey remains balanced and dynamic.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a lively partnership in health and wellness. You probably shine at social wellness activities or introspective health practices, which deepens your connection. This mutual energy makes your wellness feel warm and inspiring.",
          "While your alignment drives strong wellness habits, it could benefit from new approaches. Incorporate a monthly wellness activity, like a group fitness event or a solo health practice, to add depth to your wellness journey.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making health and wellness a vibrant force. You likely excel at social wellness activities or introspective health practices, creating a partnership that feels deeply united. This synergy transforms your wellness into a dynamic journey.",
          "Your strong focus is powerful, but it might overlook other expressions. Schedule a quarterly wellness activity, like alternating between group and individual health practices, to keep your wellness multifaceted and fresh.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, excels at social wellness activities and group health goals, sparking energy, while ${
              partnerI.name
            }, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, focuses on individual wellness practices and introspective health, adding depth. This subtle contrast creates a balanced dynamic that blends engagement with reflection.`,
          (partnerO, partnerI) =>
            `${partnerO.name} might wish ${partnerI.name} was more socially engaged, while ${partnerI.name} could find ${partnerO.name}'s social energy intense. Alternate between a group wellness activity, like a fitness class, and an individual practice, like solo meditation, each week to combine your strengths.`,
        ],
        moderate: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, drives social wellness activities and group health goals, fueling excitement, while ${
              partnerI.name
            }, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, excels at individual wellness practices and introspective health, grounding your approach. Your moderate contrast creates a partnership that’s both lively and reflective.`,
          (partnerO, partnerI) =>
            `${partnerO.name} may find ${partnerI.name}'s introspective approach isolating, while ${partnerI.name} might feel ${partnerO.name}'s social energy overwhelming. Create a schedule with one group wellness activity, like a team sport, and one individual practice, like journaling, each month to leverage both styles effectively.`,
        ],
        strong: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, thrives on social wellness activities and group health goals, driving vibrancy, while ${
              partnerI.name
            }, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, excels at individual wellness practices and introspective health, fostering depth. This stark contrast can create a dynamic wellness journey when you align your energies.`,
          (partnerO, partnerI) =>
            `Tensions might arise when ${partnerO.name} pushes for group activities and ${partnerI.name} craves introspective practices, but this is your chance to excel. Plan a weekly mix of one group wellness activity, like a fitness class, and one individual practice, like meditation, to turn your differences into a vibrant strength.`,
        ],
      },
    },
    changeApproach: {
      poleDetails: {
        S: { level: "high", description: "structured health plans and organized wellness routines" },
        F: { level: "medium", description: "spontaneous health practices and flexible wellness" },
      },
      samePole: {
        mild: [
          "You both excel at {poleDescription}, creating a reliable rhythm in your health and wellness. You likely thrive on organized routines or spontaneous practices, making your wellness journey feel secure and engaging. This alignment builds a partnership where health feels natural and connected.",
          "Your focus on {poleDescription} fosters a strong wellness approach, but it might limit variety. Plan a monthly wellness ritual, like a structured fitness plan or a spontaneous health activity, to keep your health dynamic and engaging.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a strong foundation for health and wellness. You probably shine at creating organized health plans or embracing spontaneous wellness practices, which fosters consistency and excitement. This mutual focus makes your wellness feel reliable and vibrant.",
          "While your alignment is grounding, it could benefit from flexibility. Incorporate a quarterly wellness activity, like a planned fitness routine or an impromptu health practice, to add variety and keep your wellness vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making health and wellness a seamless partnership. You likely excel at crafting structured health plans or spontaneous wellness practices, creating a relationship filled with vitality. This synergy transforms your wellness into a shared triumph.",
          "Your strong focus is powerful, but it might overlook new possibilities. Schedule an annual 'wellness reset' to explore a new approach, like a structured or spontaneous health activity, to ensure your wellness remains fresh and multifaceted.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, excels at structured health plans and organized wellness routines, providing stability, while ${
              partnerF.name
            }, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, focuses on spontaneous health practices and flexible wellness, adding excitement. This subtle contrast creates a balanced partnership that blends predictability with spontaneity.`,
          (partnerS, partnerF) =>
            `${partnerS.name} might find ${partnerF.name}'s spontaneity unpredictable, while ${partnerF.name} could see ${partnerS.name}'s structure as rigid. Plan a monthly mix of one structured health activity, like a planned workout routine, and one spontaneous practice, like an impromptu hike, to blend your strengths.`,
        ],
        moderate: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, drives structured health plans and organized wellness routines, ensuring reliability, while ${
              partnerF.name
            }, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, excels at spontaneous health practices and flexible wellness, sparking joy. Your moderate contrast creates a partnership that’s both steady and exciting.`,
          (partnerS, partnerF) =>
            `${partnerS.name} may view ${partnerF.name}'s spontaneity as inconsistent, while ${partnerF.name} might find ${partnerS.name}'s structure limiting. Create a plan with one structured health activity, like a planned diet regimen, and one spontaneous practice, like a sudden fitness challenge, to harmonize your styles.`,
        ],
        strong: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, is dedicated to structured health plans and organized wellness routines, building a solid foundation, while ${
              partnerF.name
            }, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, excels at spontaneous health practices and flexible wellness, embracing excitement. This stark contrast can drive vibrant wellness when you work together.`,
          (partnerS, partnerF) =>
            `Tensions might arise when ${partnerS.name} seeks structure and ${partnerF.name} craves spontaneity, but this is your strength. Develop a monthly plan with one structured health activity, like a planned fitness schedule, and one spontaneous practice, like an impromptu wellness activity, to turn your differences into a powerful advantage.`,
        ],
      },
    },
    interpersonalStyle: {
      poleDetails: {
        H: { level: "medium", description: "collaborative wellness goals and shared health practices" },
        A: { level: "medium", description: "independent wellness routines and personal health goals" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a warm and connected approach to health and wellness. You likely excel at shared health practices or personal wellness goals, making your health journey feel united and supportive. This alignment strengthens your bond, making wellness a team effort.",
          "Your focus on {poleDescription} fosters unity, but it might limit individual exploration. Encourage each other to try one new wellness activity, like a collaborative fitness goal or a personal health practice, alongside your usual style to keep your wellness dynamic.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a powerful sense of togetherness in health and wellness. You probably shine at teaming up on wellness goals or honoring personal health routines, which fosters trust and engagement. This mutual focus makes your wellness feel natural and inspiring.",
          "While your alignment is heartwarming, it could benefit from individual space. Set one collaborative wellness goal, like a joint fitness challenge, and one personal health practice, like a solo wellness routine, to add variety and depth to your health journey.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, turning your health and wellness into a shared journey of unity. You likely excel at collaborative wellness goals or respecting personal health routines, creating a partnership that feels unbreakable. This synergy amplifies your wellness.",
          "Your strong focus is incredible, but it might overshadow personal pursuits. Dedicate time to one solo wellness activity, like a personal health goal, alongside your joint efforts to ensure your wellness remains balanced and vibrant.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, excels at collaborative wellness goals and shared health practices, fostering teamwork, while ${
              partnerA.name
            }, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, focuses on independent wellness routines and personal health goals, valuing individuality. This subtle contrast creates a balanced partnership that supports both unity and autonomy.`,
          (partnerH, partnerA) =>
            `${partnerH.name} might crave more collaboration from ${partnerA.name}, while ${partnerA.name} could need more personal space. Plan a weekly mix of one collaborative wellness activity, like a joint fitness session, and one personal health practice, like a solo workout, to strengthen your wellness.`,
        ],
        moderate: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, drives collaborative wellness goals and shared health practices, creating unity, while ${
              partnerA.name
            }, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, excels at independent wellness routines and personal health goals, driving individuality. Your moderate contrast adds depth to your wellness, blending togetherness with autonomy.`,
          (partnerH, partnerA) =>
            `${partnerH.name} may find ${partnerA.name}'s independence isolating, while ${partnerA.name} might feel collaboration limits freedom. Create a plan with one collaborative wellness activity, like a group fitness goal, and one personal health practice, like a solo routine, to balance your dynamic.`,
        ],
        strong: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, is passionate about collaborative wellness goals and shared health practices, building unity, while ${
              partnerA.name
            }, as ${
              HealthWellnessTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, excels at independent wellness routines and personal health goals, carving their own path. This stark contrast can inspire vibrant wellness when you align your efforts.`,
          (partnerH, partnerA) =>
            `Differences might spark tension, with ${partnerH.name} seeking collaboration and ${partnerA.name} valuing independence. Develop a monthly plan with check-ins on one collaborative wellness activity, like a joint health challenge, and one personal health practice, like a solo wellness routine, to turn your contrast into a strength.`,
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
                ? "holistic"
                : pole === "L"
                ? "logical"
                : pole === "V"
                ? "heartfelt"
                : pole === "O"
                ? "social"
                : pole === "I"
                ? "individual"
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
      "When it comes to making decisions about your health,",
      "In how you engage with wellness activities,",
      "As you approach your health routines,",
      "When balancing shared and individual wellness goals,",
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
export default HealthWellnessTemplate;
