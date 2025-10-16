export const FamilyHomeTemplate = {
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
        C: { level: "high", description: "practical home management and tangible routines" },
        N: { level: "medium", description: "visionary family goals and emotional connections" },
      },
      samePole: {
        mild: [
          "You both excel at {poleDescription}, creating a unified approach to your family and home life. You likely thrive on managing daily tasks or envisioning shared family dreams, making your home a place of stability and connection. This alignment fosters a nurturing environment where you both feel at ease.",
          "Your focus on {poleDescription} builds a strong foundation, but it might limit variety. Plan a weekly family ritual, like organizing chores or discussing future goals, to keep your home life dynamic and balanced.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} creates a cohesive partnership in managing your home and family. You probably shine at handling practical routines or dreaming about your family’s future, which strengthens your bond. This mutual focus makes your home a warm and supportive space.",
          "While your alignment fosters harmony, it could benefit from new perspectives. Incorporate a monthly activity, like a practical home project or a visionary family discussion, to add depth and keep your home life vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your family and home life a seamless partnership. You likely excel at creating structured routines or bold family visions, turning your home into a unified haven. This synergy transforms your family life into a shared journey of purpose.",
          "Your strong focus is a strength, but it might overlook alternative approaches. Schedule a quarterly family meeting to explore new ways of connecting, like a practical task or a visionary goal, to ensure your home life stays multifaceted and engaging.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, excels at practical home management and tangible routines, keeping things organized, while ${
              partnerN.name
            }, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, focuses on visionary family goals and emotional connections, dreaming of your future. This subtle contrast creates a balanced dynamic that blends structure with aspiration.`,
          (partnerC, partnerN) =>
            `${partnerC.name} might feel ${partnerN.name}'s dreams lack immediate action, while ${partnerN.name} could see ${partnerC.name}'s routines as limiting. Alternate between a practical task, like organizing the home, and a visionary discussion, like planning a family milestone, to strengthen your home life.`,
        ],
        moderate: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, brings reliability through practical home management and tangible routines, while ${partnerN.name}, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, enriches your family with visionary goals and emotional connections. Your moderate difference fosters a partnership that’s both grounded and inspiring.`,
          (partnerC, partnerN) =>
            `${partnerC.name} may find ${partnerN.name}'s visionary focus less actionable, while ${partnerN.name} might see ${partnerC.name}'s routines as routine. Create a weekly plan with one practical task, like a chore schedule, and one visionary goal, like a family aspiration, to harmonize your styles.`,
        ],
        strong: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, is a master of practical home management and tangible routines, building a solid foundation, while ${
              partnerN.name
            }, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, excels at visionary family goals and emotional connections, dreaming boldly. This stark contrast can create a rich family life when you combine your strengths.`,
          (partnerC, partnerN) =>
            `Tensions may arise when ${partnerC.name} prioritizes practical tasks and ${partnerN.name} seeks emotional depth, but this is your opportunity. Plan a monthly ritual that pairs a practical task, like home organization, with a visionary goal, like a family legacy, to make your differences a strength.`,
        ],
      },
    },
    decisionMaking: {
      poleDetails: {
        L: { level: "high", description: "logical planning and fair resolutions" },
        V: { level: "medium", description: "value-driven choices and emotional harmony" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a seamless approach to family decisions. You likely excel at logical planning or prioritizing emotional harmony, making your home a place of clarity and connection. This alignment fosters a supportive environment where family choices feel unified.",
          "Your focus on {poleDescription} drives harmony, but it might limit other approaches. Try a weekly family meeting to balance logical plans with emotional discussions, ensuring your decisions nurture your home in varied ways.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a strong foundation for family decisions. You probably shine at making fair plans or heartfelt choices, which fosters trust and unity in your home. This mutual focus makes your family life feel reliable and warm.",
          "While your alignment creates stability, it could benefit from variety. Incorporate a monthly discussion that blends logical and emotional perspectives, like planning a family event with both structure and feeling, to keep your decision-making vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making family decisions a cornerstone of your home. You likely excel at resolving issues logically or deepening emotional ties, creating a partnership that feels unshakable. This synergy transforms your family life into a unified force.",
          "Your strong focus is a strength, but it might overlook other perspectives. Schedule a quarterly reflection to explore alternative decision-making styles, like blending logic and emotion in a family plan, to ensure your home remains dynamic.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, excels at logical planning and fair resolutions, grounding family decisions, while ${
              partnerV.name
            }, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, focuses on value-driven choices and emotional harmony, deepening connections. This subtle contrast creates a balanced approach to your family life.`,
          (partnerL, partnerV) =>
            `${partnerL.name} might feel ${partnerV.name}'s emotional approach lacks structure, while ${partnerV.name} could see ${partnerL.name}'s logic as detached. Try alternating between logical planning, like scheduling family tasks, and emotional check-ins, like sharing feelings, each week to blend your strengths.`,
        ],
        moderate: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, drives logical planning and fair resolutions, ensuring clarity, while ${partnerV.name}, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, excels at value-driven choices and emotional harmony, adding warmth. Your moderate contrast creates a dynamic partnership that balances reason and emotion.`,
          (partnerL, partnerV) =>
            `${partnerL.name} may find ${partnerV.name}'s emotional decisions less structured, while ${partnerV.name} might see ${partnerL.name}'s logic as cold. Create a decision-making plan with one logical step, like a chore chart, and one emotional act, like a family bonding activity, to harmonize your approaches.`,
        ],
        strong: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, thrives on logical planning and fair resolutions, providing stability, while ${partnerV.name}, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, excels at value-driven choices and emotional harmony, fostering closeness. This stark contrast can spark a vibrant family life when you blend your strengths.`,
          (partnerL, partnerV) =>
            `Tensions might emerge when ${partnerL.name} seeks logic and ${partnerV.name} prioritizes emotion, but this is your strength. Develop a weekly ritual that combines a logical plan, like organizing family tasks, with an emotional check-in, like sharing family goals, to make your differences a catalyst for harmony.`,
        ],
      },
    },
    energyOrientation: {
      poleDetails: {
        O: { level: "medium", description: "active engagement and social family activities" },
        I: { level: "medium", description: "reflective bonding and intimate family moments" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a shared energy that enlivens your family life. You likely excel at hosting family gatherings or fostering intimate moments, making your home feel vibrant and connected. This alignment fosters a bond that feels engaging and supportive.",
          "Your focus on {poleDescription} fuels family harmony, but it might limit variety. Plan a weekly activity, like a family outing or a quiet evening, to ensure your home life remains balanced and dynamic.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a lively partnership in your family life. You probably shine at creating social events or reflective moments, which deepens your family’s connection. This mutual energy makes your home feel warm and inspiring.",
          "While your alignment drives closeness, it could benefit from new approaches. Incorporate a monthly activity, like a social gathering or a quiet family talk, to add depth to your family life.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your family life a vibrant force. You likely excel at active engagement or intimate reflections, creating a home that feels deeply united. This synergy transforms your family into a dynamic haven.",
          "Your strong focus is powerful, but it might overlook other expressions. Schedule a quarterly activity, like alternating between social and intimate moments, to keep your family life multifaceted and fresh.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, excels at active engagement and social family activities, sparking energy, while ${partnerI.name}, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, focuses on reflective bonding and intimate family moments, adding depth. This subtle contrast creates a balanced dynamic that blends excitement with intimacy.`,
          (partnerO, partnerI) =>
            `${partnerO.name} might wish ${partnerI.name} was more outgoing, while ${partnerI.name} could find ${partnerO.name}'s energy intense. Alternate between a social family event and a quiet family moment each week to combine your strengths and deepen your bond.`,
        ],
        moderate: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, drives active engagement and social family activities, fueling excitement, while ${partnerI.name}, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, excels at reflective bonding and intimate family moments, grounding your home. Your moderate contrast creates a partnership that’s both lively and meaningful.`,
          (partnerO, partnerI) =>
            `${partnerO.name} may find ${partnerI.name}'s introspection slow, while ${partnerI.name} might feel ${partnerO.name}'s energy is overwhelming. Create a schedule with one social family event and one reflective family talk each month to leverage both styles effectively.`,
        ],
        strong: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, thrives on active engagement and social family activities, driving vibrancy, while ${
              partnerI.name
            }, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, excels at reflective bonding and intimate family moments, fostering closeness. This stark contrast can create a dynamic family life when you align your energies.`,
          (partnerO, partnerI) =>
            `Tensions might arise when ${partnerO.name} pushes for social activities and ${partnerI.name} craves reflection, but this is your chance to excel. Plan a weekly mix of one social family activity, like a group outing, and one intimate moment, like a family discussion, to turn your differences into a vibrant bond.`,
        ],
      },
    },
    changeApproach: {
      poleDetails: {
        S: { level: "high", description: "structured family routines and planned home tasks" },
        F: { level: "medium", description: "flexible adjustments and spontaneous family moments" },
      },
      samePole: {
        mild: [
          "You both excel at {poleDescription}, creating a reliable rhythm in your family and home life. You likely thrive on organized routines or spontaneous family moments, making your home feel secure and joyful. This alignment builds a partnership where family life feels natural and connected.",
          "Your focus on {poleDescription} fosters stability, but it might limit variety. Plan a monthly family ritual, like a structured schedule or a spontaneous activity, to keep your home life dynamic and engaging.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a strong foundation for your family and home. You probably shine at creating consistent routines or embracing spontaneous moments, which fosters trust and excitement. This mutual focus makes your home feel warm and reliable.",
          "While your alignment is grounding, it could benefit from flexibility. Incorporate a quarterly activity, like a planned family event or an impromptu adventure, to add variety and keep your home life vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your family and home life a seamless partnership. You likely excel at crafting structured plans or spontaneous moments, creating a home that feels solid and joyful. This synergy transforms your family life into a shared triumph.",
          "Your strong focus is powerful, but it might overlook new possibilities. Schedule an annual 'family reset' to explore a new approach, like a planned or spontaneous family activity, to ensure your home life remains fresh and multifaceted.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, excels at structured family routines and planned home tasks, providing stability, while ${
              partnerF.name
            }, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, focuses on flexible adjustments and spontaneous family moments, adding excitement. This subtle contrast creates a balanced partnership that blends predictability with spontaneity.`,
          (partnerS, partnerF) =>
            `${partnerS.name} might find ${partnerF.name}'s spontaneity unpredictable, while ${partnerF.name} could see ${partnerS.name}'s routines as rigid. Plan a monthly mix of one structured family task, like a chore schedule, and one spontaneous activity, like a family outing, to blend your strengths.`,
        ],
        moderate: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, drives structured family routines and planned home tasks, ensuring reliability, while ${
              partnerF.name
            }, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, excels at flexible adjustments and spontaneous family moments, sparking joy. Your moderate contrast creates a partnership that’s both steady and exciting.`,
          (partnerS, partnerF) =>
            `${partnerS.name} may view ${partnerF.name}'s spontaneity as inconsistent, while ${partnerF.name} might find ${partnerS.name}'s routines limiting. Create a plan with one structured task, like a family schedule, and one spontaneous act, like a surprise family activity, to harmonize your styles.`,
        ],
        strong: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, is dedicated to structured family routines and planned home tasks, building a solid foundation, while ${
              partnerF.name
            }, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, excels at flexible adjustments and spontaneous family moments, embracing excitement. This stark contrast can drive a vibrant family life when you work together.`,
          (partnerS, partnerF) =>
            `Tensions might arise when ${partnerS.name} seeks structure and ${partnerF.name} craves spontaneity, but this is your strength. Develop a monthly plan with one structured task, like a family routine, and one spontaneous activity, like a surprise outing, to turn your differences into a powerful advantage.`,
        ],
      },
    },
    interpersonalStyle: {
      poleDetails: {
        H: { level: "medium", description: "collaborative family goals and shared responsibilities" },
        A: { level: "medium", description: "independent contributions and personal family roles" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a warm and connected family partnership. You likely excel at shared responsibilities or valuing personal roles, making your home feel united and supportive. This alignment strengthens your family bond, making it a true team effort.",
          "Your focus on {poleDescription} fosters unity, but it might limit individual exploration. Encourage each other to pursue one personal family goal, like a solo task, alongside your joint efforts to keep your home life dynamic and balanced.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a powerful sense of togetherness in your family life. You probably shine at teaming up on family goals or honoring personal contributions, which fosters trust and intimacy. This mutual focus makes your home feel natural and inspiring.",
          "While your alignment is heartwarming, it could benefit from individual space. Set one collaborative family goal, like a shared project, and one personal task, like a solo responsibility, to add variety and depth to your family dynamic.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, turning your family life into a shared journey of success. You likely excel at working together on family goals or respecting individual roles, creating a home that feels unbreakable. This synergy amplifies your family connection.",
          "Your strong focus is incredible, but it might overshadow personal pursuits. Dedicate time to one solo family task, like a personal project, alongside your joint efforts to ensure your home life remains balanced and vibrant.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, excels at collaborative family goals and shared responsibilities, fostering teamwork, while ${
              partnerA.name
            }, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, focuses on independent contributions and personal family roles, valuing individuality. This subtle contrast creates a balanced partnership that supports both unity and autonomy.`,
          (partnerH, partnerA) =>
            `${partnerH.name} might crave more collaboration from ${partnerA.name}, while ${partnerA.name} could need more personal space. Plan a weekly mix of one shared family task, like a group project, and one solo task, like a personal responsibility, to strengthen your family bond.`,
        ],
        moderate: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, drives collaborative family goals and shared responsibilities, creating unity, while ${
              partnerA.name
            }, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, excels at independent contributions and personal family roles, driving individuality. Your moderate contrast adds depth to your family life, blending togetherness with autonomy.`,
          (partnerH, partnerA) =>
            `${partnerH.name} may find ${partnerA.name}'s independence isolating, while ${partnerA.name} might feel collaboration limits freedom. Create a plan with one shared family goal, like a team project, and one personal task, like a solo role, to balance your dynamic.`,
        ],
        strong: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, is passionate about collaborative family goals and shared responsibilities, building unity, while ${
              partnerA.name
            }, as ${
              FamilyHomeTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, excels at independent contributions and personal family roles, carving their own path. This stark contrast can inspire a vibrant family life when you align your efforts.`,
          (partnerH, partnerA) =>
            `Differences might spark tension, with ${partnerH.name} seeking teamwork and ${partnerA.name} valuing independence. Develop a monthly plan with check-ins on one shared family goal, like a joint project, and one personal task, like a solo responsibility, to turn your contrast into a strength.`,
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
                ? "active"
                : pole === "I"
                ? "reflective"
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
      "When it comes to making family decisions,",
      "In how you engage with your family and home,",
      "As you navigate changes in your family life,",
      "When supporting each other’s roles in the family,",
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
export default FamilyHomeTemplate;
