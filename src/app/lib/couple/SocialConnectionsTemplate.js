export const SocialConnectionsTemplate = {
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
        C: { level: "high", description: "practical social interactions and structured networking" },
        N: { level: "medium", description: "visionary social connections and idea-driven interactions" },
      },
      samePole: {
        mild: [
          "You both excel at {poleDescription}, creating a unified approach to building social connections. You likely thrive on organizing social events or fostering idea-driven interactions, making your community feel cohesive and engaging. This alignment fosters a partnership where social connections feel seamless and purposeful.",
          "Your focus on {poleDescription} strengthens your social network, but it might limit variety. Plan a weekly social activity, like a structured gathering or a visionary discussion, to keep your interactions dynamic and balanced.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a robust foundation for your social connections. You probably shine at planning social events or sparking idea-driven conversations, which fosters engagement and connection. This mutual focus makes your social life feel reliable and inspiring.",
          "While your alignment creates a strong network, it could benefit from new perspectives. Incorporate a monthly social activity, like a planned event or a creative discussion, to add depth and keep your connections vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your social connections a seamless partnership. You likely excel at structured networking or visionary interactions, creating a relationship filled with meaningful social bonds. This synergy transforms your social life into a shared journey of connection.",
          "Your strong focus is a strength, but it might overlook alternative approaches. Schedule a quarterly 'social reset' to explore a new style, like a practical or visionary social activity, to ensure your connections remain multifaceted and engaging.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, excels at practical social interactions and structured networking, grounding your social circle, while ${
              partnerN.name
            }, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, focuses on visionary social connections and idea-driven interactions, sparking creativity. This subtle contrast creates a balanced dynamic that blends structure with inspiration.`,
          (partnerC, partnerN) =>
            `${partnerC.name} might feel ${partnerN.name}'s visionary interactions lack focus, while ${partnerN.name} could see ${partnerC.name}'s practicality as limiting. Alternate between a practical social activity, like a planned gathering, and a visionary one, like a creative discussion, each week to strengthen your social bonds.`,
        ],
        moderate: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, brings reliability through practical social interactions and structured networking, while ${
              partnerN.name
            }, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, enriches connections with visionary interactions and idea-driven discussions. Your moderate difference fosters a partnership that’s both grounded and inspiring.`,
          (partnerC, partnerN) =>
            `${partnerC.name} may find ${partnerN.name}'s visionary focus less actionable, while ${partnerN.name} might see ${partnerC.name}'s practicality as routine. Create a weekly plan with one practical social activity, like a scheduled event, and one visionary interaction, like a creative discussion, to harmonize your styles.`,
        ],
        strong: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, is a master of practical social interactions and structured networking, building a solid foundation, while ${
              partnerN.name
            }, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, excels at visionary social connections and idea-driven interactions, dreaming boldly. This stark contrast can create a rich social life when you combine your strengths.`,
          (partnerC, partnerN) =>
            `Tensions may arise when ${partnerC.name} prioritizes practical networking and ${partnerN.name} seeks visionary interactions, but this is your opportunity. Plan a monthly ritual that pairs a practical social activity, like a planned gathering, with a visionary one, like a creative discussion, to make your differences a strength.`,
        ],
      },
    },
    decisionMaking: {
      poleDetails: {
        L: { level: "high", description: "logical choices in social connections and strategic networking" },
        V: { level: "medium", description: "heartfelt relationships and value-driven social bonds" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a seamless approach to building social connections. You likely excel at strategic networking or heartfelt relationships, making your social life feel clear and meaningful. This alignment fosters a partnership where connections feel unified and purposeful.",
          "Your focus on {poleDescription} drives strong social bonds, but it might limit other approaches. Try a weekly social activity to balance logical and heartfelt connections, ensuring your network deepens your relationship in varied ways.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a strong foundation for your social connections. You probably shine at strategic networking or value-driven relationships, which fosters trust and engagement. This mutual focus makes your social life feel reliable and warm.",
          "While your alignment creates strong bonds, it could benefit from variety. Incorporate a monthly social activity that blends logical and heartfelt perspectives, like planning a strategic event or fostering a meaningful connection, to keep your network vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your social connections a cornerstone of your relationship. You likely excel at strategic networking or heartfelt relationships, creating a partnership that feels unshakable. This synergy transforms your social life into a unified force.",
          "Your strong focus is a strength, but it might overlook other perspectives. Schedule a quarterly reflection to explore alternative social styles, like blending logic and values in a networking event, to ensure your connections remain dynamic.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, excels at logical choices in social connections and strategic networking, grounding your social circle, while ${
              partnerV.name
            }, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, focuses on heartfelt relationships and value-driven social bonds, deepening connection. This subtle contrast creates a balanced approach to your social life.`,
          (partnerL, partnerV) =>
            `${partnerL.name} might feel ${partnerV.name}'s heartfelt approach lacks strategy, while ${partnerV.name} could see ${partnerL.name}'s logic as detached. Try alternating between strategic networking, like attending a professional event, and heartfelt bonding, like a meaningful gathering, each week to blend your strengths.`,
        ],
        moderate: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, drives logical choices in social connections and strategic networking, ensuring clarity, while ${
              partnerV.name
            }, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, excels at heartfelt relationships and value-driven social bonds, adding warmth. Your moderate contrast creates a dynamic partnership that balances reason and emotion.`,
          (partnerL, partnerV) =>
            `${partnerL.name} may find ${partnerV.name}'s heartfelt bonds less strategic, while ${partnerV.name} might see ${partnerL.name}'s logic as cold. Create a plan with one strategic networking event, like a professional gathering, and one heartfelt social activity, like a close-knit gathering, to harmonize your approaches.`,
        ],
        strong: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, thrives on logical choices in social connections and strategic networking, providing stability, while ${
              partnerV.name
            }, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, excels at heartfelt relationships and value-driven social bonds, fostering closeness. This stark contrast can spark vibrant social connections when you blend your strengths.`,
          (partnerL, partnerV) =>
            `Tensions might emerge when ${partnerL.name} seeks strategic networking and ${partnerV.name} prioritizes heartfelt bonds, but this is your strength. Develop a weekly ritual that combines a strategic networking event, like a professional gathering, with a heartfelt social activity, like a meaningful gathering, to make your differences a catalyst for connection.`,
        ],
      },
    },
    energyOrientation: {
      poleDetails: {
        O: { level: "medium", description: "extroverted socializing and group interactions" },
        I: { level: "medium", description: "introverted connections and intimate relationships" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a shared energy that enlivens your social connections. You likely excel at group interactions or intimate relationships, making your social life feel vibrant and meaningful. This alignment fosters a bond where connections feel connected and engaging.",
          "Your focus on {poleDescription} fuels strong social bonds, but it might limit variety. Plan a weekly social activity, like a group event or an intimate gathering, to ensure your connections remain balanced and dynamic.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a lively partnership in your social connections. You probably shine at extroverted socializing or introverted bonding, which deepens your relationship. This mutual energy makes your social life feel warm and inspiring.",
          "While your alignment drives strong connections, it could benefit from new approaches. Incorporate a monthly social activity, like a group event or a one-on-one gathering, to add depth to your social life.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your social connections a vibrant force. You likely excel at extroverted socializing or intimate relationships, creating a partnership that feels deeply united. This synergy transforms your social life into a dynamic journey.",
          "Your strong focus is powerful, but it might overlook other expressions. Schedule a quarterly social activity, like alternating between group and intimate gatherings, to keep your connections multifaceted and fresh.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, excels at extroverted socializing and group interactions, sparking energy, while ${partnerI.name}, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, focuses on introverted connections and intimate relationships, adding depth. This subtle contrast creates a balanced dynamic that blends excitement with intimacy.`,
          (partnerO, partnerI) =>
            `${partnerO.name} might wish ${partnerI.name} was more outgoing, while ${partnerI.name} could find ${partnerO.name}'s energy intense. Alternate between a group social activity, like a party, and an intimate gathering, like a one-on-one dinner, each week to combine your strengths.`,
        ],
        moderate: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, drives extroverted socializing and group interactions, fueling excitement, while ${partnerI.name}, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, excels at introverted connections and intimate relationships, grounding your social life. Your moderate contrast creates a partnership that’s both lively and meaningful.`,
          (partnerO, partnerI) =>
            `${partnerO.name} may find ${partnerI.name}'s introversion slow, while ${partnerI.name} might feel ${partnerO.name}'s extroversion is overwhelming. Create a schedule with one group social activity and one intimate gathering each month to leverage both styles effectively.`,
        ],
        strong: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, thrives on extroverted socializing and group interactions, driving vibrancy, while ${
              partnerI.name
            }, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, excels at introverted connections and intimate relationships, fostering depth. This stark contrast can create dynamic social connections when you align your energies.`,
          (partnerO, partnerI) =>
            `Tensions might arise when ${partnerO.name} pushes for group socializing and ${partnerI.name} craves intimate connections, but this is your chance to excel. Plan a weekly mix of one group activity, like a social event, and one intimate gathering, like a close-knit dinner, to turn your differences into a vibrant strength.`,
        ],
      },
    },
    changeApproach: {
      poleDetails: {
        S: { level: "high", description: "structured social plans and organized gatherings" },
        F: { level: "medium", description: "spontaneous social interactions and flexible connections" },
      },
      samePole: {
        mild: [
          "You both excel at {poleDescription}, creating a reliable rhythm in your social connections. You likely thrive on organized gatherings or spontaneous interactions, making your social life feel secure and exciting. This alignment builds a partnership where connections feel natural and connected.",
          "Your focus on {poleDescription} fosters strong social bonds, but it might limit variety. Plan a monthly social ritual, like a structured event or a spontaneous gathering, to keep your connections dynamic and engaging.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a strong foundation for your social connections. You probably shine at creating organized plans or embracing spontaneous interactions, which fosters trust and excitement. This mutual focus makes your social life feel reliable and vibrant.",
          "While your alignment is grounding, it could benefit from flexibility. Incorporate a quarterly social activity, like a planned event or an impromptu gathering, to add variety and keep your connections vibrant.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your social connections a seamless partnership. You likely excel at crafting structured plans or spontaneous interactions, creating a relationship filled with meaningful connections. This synergy transforms your social life into a shared triumph.",
          "Your strong focus is powerful, but it might overlook new possibilities. Schedule an annual 'social reset' to explore a new approach, like a structured or spontaneous social activity, to ensure your connections remain fresh and multifaceted.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, excels at structured social plans and organized gatherings, providing stability, while ${
              partnerF.name
            }, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, focuses on spontaneous social interactions and flexible connections, adding excitement. This subtle contrast creates a balanced partnership that blends predictability with spontaneity.`,
          (partnerS, partnerF) =>
            `${partnerS.name} might find ${partnerF.name}'s spontaneity unpredictable, while ${partnerF.name} could see ${partnerS.name}'s structure as rigid. Plan a monthly mix of one structured social event, like a planned gathering, and one spontaneous interaction, like a surprise outing, to blend your strengths.`,
        ],
        moderate: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, drives structured social plans and organized gatherings, ensuring reliability, while ${
              partnerF.name
            }, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, excels at spontaneous social interactions and flexible connections, sparking joy. Your moderate contrast creates a partnership that’s both steady and exciting.`,
          (partnerS, partnerF) =>
            `${partnerS.name} may view ${partnerF.name}'s spontaneity as inconsistent, while ${partnerF.name} might find ${partnerS.name}'s structure limiting. Create a plan with one structured social event, like a planned gathering, and one spontaneous interaction, like a surprise outing, to harmonize your styles.`,
        ],
        strong: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, is dedicated to structured social plans and organized gatherings, building a solid foundation, while ${
              partnerF.name
            }, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, excels at spontaneous social interactions and flexible connections, embracing excitement. This stark contrast can drive vibrant connections when you work together.`,
          (partnerS, partnerF) =>
            `Tensions might arise when ${partnerS.name} seeks structure and ${partnerF.name} craves spontaneity, but this is your strength. Develop a monthly plan with one structured social event, like a planned gathering, and one spontaneous interaction, like a surprise outing, to turn your differences into a powerful advantage.`,
        ],
      },
    },
    interpersonalStyle: {
      poleDetails: {
        H: { level: "medium", description: "collaborative social bonds and group harmony" },
        A: { level: "medium", description: "independent social interactions and personal connections" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a warm and connected approach to social connections. You likely excel at fostering group harmony or valuing personal connections, making your social life feel united and supportive. This alignment strengthens your bond, making social interactions a team effort.",
          "Your focus on {poleDescription} fosters unity, but it might limit individual exploration. Encourage each other to try one new social activity, like a collaborative event or a personal connection, alongside your usual style to keep your social life dynamic.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a powerful sense of togetherness in your social connections. You probably shine at teaming up on social events or honoring personal interactions, which fosters trust and engagement. This mutual focus makes your social life feel natural and inspiring.",
          "While your alignment is heartwarming, it could benefit from individual space. Set one collaborative social goal, like a group event, and one personal connection, like a one-on-one interaction, to add variety and depth to your social life.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, turning your social connections into a shared journey of unity. You likely excel at collaborative social bonds or respecting personal interactions, creating a partnership that feels unbreakable. This synergy amplifies your connection.",
          "Your strong focus is incredible, but it might overshadow personal pursuits. Dedicate time to one solo social activity, like a personal connection, alongside your joint efforts to ensure your social life remains balanced and vibrant.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, excels at collaborative social bonds and group harmony, fostering teamwork, while ${partnerA.name}, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, focuses on independent social interactions and personal connections, valuing individuality. This subtle contrast creates a balanced partnership that supports both unity and autonomy.`,
          (partnerH, partnerA) =>
            `${partnerH.name} might crave more collaboration from ${partnerA.name}, while ${partnerA.name} could need more personal space. Plan a weekly mix of one collaborative social event, like a group gathering, and one personal interaction, like a one-on-one connection, to strengthen your social life.`,
        ],
        moderate: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, drives collaborative social bonds and group harmony, creating unity, while ${partnerA.name}, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, excels at independent social interactions and personal connections, driving individuality. Your moderate contrast adds depth to your social life, blending togetherness with autonomy.`,
          (partnerH, partnerA) =>
            `${partnerH.name} may find ${partnerA.name}'s independence isolating, while ${partnerA.name} might feel collaboration limits freedom. Create a plan with one collaborative social event, like a group gathering, and one personal interaction, like a one-on-one connection, to balance your dynamic.`,
        ],
        strong: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, is passionate about collaborative social bonds and group harmony, building unity, while ${
              partnerA.name
            }, as ${
              SocialConnectionsTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, excels at independent social interactions and personal connections, carving their own path. This stark contrast can inspire vibrant social connections when you align your efforts.`,
          (partnerH, partnerA) =>
            `Differences might spark tension, with ${partnerH.name} seeking collaboration and ${partnerA.name} valuing independence. Develop a monthly plan with check-ins on one collaborative social event, like a group gathering, and one personal interaction, like a one-on-one connection, to turn your contrast into a strength.`,
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
                ? "extroverted"
                : pole === "I"
                ? "introverted"
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
      "When it comes to making decisions in your social life,",
      "In how you engage socially,",
      "As you approach social planning,",
      "When balancing shared and individual social interactions,",
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
export default SocialConnectionsTemplate;
