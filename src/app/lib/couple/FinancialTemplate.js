export const FinancesPlanningTemplate = {
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
        C: { level: "high", description: "detailed financial tracking and budgeting" },
        N: { level: "medium", description: "long-term financial opportunities and trends" },
      },
      samePole: {
        mild: [
          "You both tend to favor {pole} financial approaches, which often results in a unified strategy that emphasizes alignment and purpose. This shared inclination towards {poleDescription} can build a solid base for joint money management, allowing for either meticulous tracking or visionary planning that supports your collective goals over time. As a result, your partnership may experience greater reliability in handling everyday finances or pursuing ambitious investments.",
          "However, this common tendency might occasionally cause you to overlook contrasting viewpoints, such as those involving {oppositePoleDescription}. To enhance your financial flexibility, you could periodically delve into {oppositePoleDescription}, perhaps by reviewing broader market trends if focused on details, or grounding ideas with specific data if oriented towards the future, thereby introducing new dimensions to your planning process.",
        ],
        moderate: [
          "Your joint preference for {pole} financial strategies frequently enhances teamwork, with a strong emphasis on {poleDescription} that promotes steady progress. This mutual lean can lead to consistent decision-making in money matters, fostering trust through either precise record-keeping or forward-thinking explorations that align with your shared vision. Consequently, you are prone to developing financial habits that feel intuitive and supportive within your relationship.",
          "That said, your pronounced focus on {poleDescription} could at times reduce adaptability to changing circumstances. By allocating moments to explore {oppositePoleDescription}, such as incorporating creative forecasts into structured budgets or adding practical details to big-picture plans, you might achieve a more balanced and resilient approach to your finances.",
        ],
        strong: [
          "You both are inclined to deeply adopt {pole} financial methods, positioning {poleDescription} as a fundamental element of your partnership. This intense shared orientation often creates an environment of high organization and foresight, where finances are managed with either unwavering precision or expansive imagination that secures long-term harmony. In turn, your relationship may benefit from a sense of security derived from these well-established patterns.",
          "Nevertheless, your dedication to {poleDescription} might sometimes constrain opportunities for spontaneity or innovation in money handling. Purposefully integrating aspects of {oppositePoleDescription} could refresh your strategies, like blending immediate data analysis with future-oriented brainstorming, ultimately enriching your financial collaboration with diverse insights.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, is inclined to prefer detailed financial tracking and budgeting, while ${partnerN.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, tends to focus on long-term financial opportunities and trends, forming a well-rounded partnership. This blend often allows for strategies that merge accuracy with aspiration, promoting both immediate control and future expansion in your shared financial path. As a result, you may find your plans more comprehensive, covering day-to-day needs alongside visionary goals.`,
          (partnerC, partnerN) =>
            `Occasionally, ${partnerC.name} might perceive ${partnerN.name}’s emphasis on future prospects as somewhat unanchored, whereas ${partnerN.name} could view detailed tracking as confining. Through consistent dialogues aimed at integrating short-term budgets with extended objectives, you are likely to fortify your teamwork, transforming potential differences into a source of balanced and effective financial guidance. This approach can help cultivate a more harmonious and adaptive money management style.`,
        ],
        moderate: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, often prioritizes detailed financial tracking and budgeting, while ${partnerN.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, is prone to emphasize long-term financial opportunities and trends, providing a synergistic dynamic. Such a combination tends to support plans that unite thorough oversight with bold ambitions, resulting in a partnership that balances prudence with growth potential. Over time, this can lead to more robust financial decisions that cater to both stability and innovation.`,
          (partnerC, partnerN) =>
            `${partnerC.name} may occasionally regard ${partnerN.name}’s ideas as overly speculative, while ${partnerN.name} might consider budgets too restrictive. By arranging regular reviews to synchronize mutual priorities, you have a tendency to convert these variances into assets, fostering a unified financial framework that accommodates diverse perspectives. This practice can enhance overall resilience in your joint planning efforts.`,
        ],
        strong: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, tends to concentrate on meticulous financial tracking and budgeting, while ${partnerN.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, is inclined to pursue long-term financial opportunities and trends, generating a vibrant contrast. Merging these approaches often yields plans that are both grounded and visionary, strengthening your partnership through a fusion of caution and optimism. Ultimately, this can create a more dynamic and forward-thinking financial landscape.`,
          (partnerC, partnerN) =>
            `Differing inclinations could occasionally ignite tensions, with ${partnerC.name} favoring prudence and ${partnerN.name} leaning towards expansive possibilities. Establishing defined guidelines for expenditures and investments, coupled with frequent strategy sessions, you are prone to align your objectives effectively, forging a potent and equilibrated financial alliance. This method can turn contrasts into opportunities for mutual growth and understanding.`,
        ],
      },
    },
    decisionMaking: {
      poleDetails: {
        L: { level: "high", description: "logical budgeting and cost analysis" },
        V: { level: "medium", description: "value-driven spending" },
      },
      samePole: {
        mild: [
          "You both often lean towards {pole} decision-making in finances, anchoring choices in {poleDescription} that promote a unified perspective. This common propensity can enhance confidence in handling budgets or expenditures, leading to decisions that feel coherent and purposeful within your relationship. Consequently, your partnership may cultivate a stronger sense of clarity and mutual agreement in money matters.",
          "Yet, this shared focus on {poleDescription} might at times overshadow {oppositePoleDescription}. Engaging in conversations about core priorities, like impactful investments or efficient allocations, could infuse additional layers into your strategy, allowing for a more nuanced and fulfilling financial journey together.",
        ],
        moderate: [
          "Your collective preference for {pole} decision-making typically bolsters your financial bond through emphasis on {poleDescription}. This alignment is likely to result in well-thought-out choices that resonate with your joint objectives, building a foundation of reliability and shared intent. Over time, it can contribute to smoother navigation of economic challenges as a team.",
          "However, your notable emphasis on {poleDescription} could occasionally diminish attention to {oppositePoleDescription}. By jointly investigating {oppositePoleDescription}, perhaps through evaluating emotional or principled aspects of spending, you might achieve greater equilibrium and depth in your financial deliberations.",
        ],
        strong: [
          "You both have a strong inclination for {pole} decision-making, heavily relying on {poleDescription} to shape your financial path. This profound shared orientation often establishes a precise framework for money management, minimizing ambiguities and enhancing overall assurance. As such, your relationship is prone to thrive in an atmosphere of structured and intentional fiscal practices.",
          "Nonetheless, your firm dedication to {poleDescription} may constrain exploration of {oppositePoleDescription}. Designating resources for thoughtful or impulsive expenditures could vitalize your plans, introducing elements of joy and personalization to your otherwise methodical approach.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, often prefers logical budgeting and cost analysis, while ${partnerV.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, tends to favor value-driven spending, establishing a harmonious financial method. This pairing is likely to enable intelligent, pragmatic choices that also respect personal significances, blending efficiency with heartfelt considerations. In essence, it can lead to a more enriched and considerate handling of resources.`,
          (partnerL, partnerV) =>
            `From time to time, ${partnerL.name} might regard ${partnerV.name}’s value-oriented selections as less rational, whereas ${partnerV.name} could perceive logical frameworks as constraining. Through candid exchanges on individual priorities, you are inclined to merge these viewpoints seamlessly, promoting an integrated strategy that values both reason and sentiment in finances. This can ultimately deepen your collaborative efforts.`,
        ],
        moderate: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, frequently concentrates on logical budgeting and cost analysis, while ${partnerV.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, prioritizes value-driven spending, delivering a supportive interplay. This fusion tends to facilitate both sensible allocations and purposeful outlays, elevating your joint financial interactions. Over the long term, it may foster a more versatile and empathetic approach to money.`,
          (partnerL, partnerV) =>
            `${partnerL.name} may sometimes view ${partnerV.name}’s method as excessively sentimental, while ${partnerV.name} might find analytical assessments limiting. Conducting periodic talks on fiscal principles can help synchronize your methods, converting disparities into advantages for a solid framework. Such practices are prone to enhance unity and effectiveness in planning.`,
        ],
        strong: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, is typically committed to logical budgeting and cost analysis, while ${partnerV.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, stresses value-driven spending, producing a striking juxtaposition. Integrating these forces often results in a plan that is rational yet compassionate, leveraging strengths from both sides. This can create a more profound and balanced financial narrative for your partnership.`,
          (partnerL, partnerV) =>
            `Contrasting styles could lead to occasional disputes, with ${partnerL.name} pursuing practicality and ${partnerV.name} favoring enthusiasm. Defining objectives that encompass both reasoning and principles may reconcile your choices, yielding a harmonious and resilient alliance. You are likely to discover greater satisfaction through this integrated perspective.`,
        ],
      },
    },
    energyOrientation: {
      poleDetails: {
        O: { level: "medium", description: "open and dynamic financial conversations" },
        I: { level: "medium", description: "thoughtful and introspective financial planning" },
      },
      samePole: {
        mild: [
          "You both tend to favor a {pole} approach to financial discussions, gravitating toward {poleDescription} that keep your exchanges lively or introspective. This shared tendency often fosters engaging and aligned conversations, strengthening your ability to make joint financial decisions with clarity. As a result, your partnership is likely to benefit from a cohesive and energized approach to money management.",
          "However, your preference for {poleDescription} might occasionally limit your perspective, potentially overlooking {oppositePoleDescription}. Incorporating elements of {oppositePoleDescription}, such as scheduling reflective planning sessions if you lean toward open discussions, or encouraging open dialogue if focused on introspection, can add depth and balance to your financial strategy.",
        ],
        moderate: [
          "Your mutual inclination toward a {pole} style in financial matters emphasizes {poleDescription}, creating a collaborative and purposeful dynamic. This alignment is prone to enhance transparency and connection, enabling you to address financial goals as a unified team. Over time, this shared energy can lead to more effective and motivated financial planning within your relationship.",
          "That said, your focus on {poleDescription} could sometimes bypass the benefits of {oppositePoleDescription}. By intentionally blending in {oppositePoleDescription}, such as balancing dynamic conversations with periods of quiet reflection or vice versa, you might cultivate a more well-rounded and resilient financial approach.",
        ],
        strong: [
          "You both strongly embrace a {pole} approach to financial discussions, immersing yourselves in {poleDescription} that feel vibrant or deeply considered. This intense shared orientation often builds a robust financial partnership, minimizing misunderstandings through consistent and intentional engagement. Consequently, your relationship may thrive in an environment of clear and driven financial collaboration.",
          "Nevertheless, your deep commitment to {poleDescription} might restrict opportunities to explore {oppositePoleDescription}. Actively integrating {oppositePoleDescription}, like setting aside time for thoughtful analysis if you favor open discussions, or fostering lively exchanges if you prefer introspection, can enrich your planning with fresh perspectives and greater equilibrium.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, tends to thrive in open and dynamic financial conversations, while ${partnerI.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, gravitates toward thoughtful and introspective financial planning, creating a balanced dynamic. This combination often blends energetic exchanges with careful consideration, resulting in a well-rounded approach that supports both immediate engagement and long-term strategy. Your partnership is likely to benefit from this complementary mix, fostering both connection and depth in financial decisions.`,
          (partnerO, partnerI) =>
            `At times, ${partnerO.name} may perceive ${partnerI.name}’s introspective approach as disengaged, while ${partnerI.name} might find dynamic conversations overwhelming. By alternating between open discussions and quiet planning sessions, you are inclined to harmonize your approaches, leveraging both energies to create a unified and effective financial strategy. This practice can enhance mutual understanding and collaboration.`,
        ],
        moderate: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, is prone to energize open and dynamic financial conversations, while ${partnerI.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, focuses on thoughtful and introspective financial planning, offering a synergistic interplay. This blend tends to support both lively engagement and deliberate reflection, strengthening your ability to craft comprehensive financial plans. Over time, this dynamic can lead to more adaptive and insightful money management.`,
          (partnerO, partnerI) =>
            `${partnerO.name} might occasionally view ${partnerI.name}’s reflective style as reserved, while ${partnerI.name} could see dynamic discussions as intense. Establishing a routine that incorporates both open dialogue and introspective planning can align your efforts, transforming differences into strengths for a cohesive financial framework. This approach is likely to amplify your collective effectiveness.`,
        ],
        strong: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, excels in open and dynamic financial conversations, while ${partnerI.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, prioritizes thoughtful and introspective financial planning, creating a striking contrast. By merging animated discussions with deep reflection, you can develop a robust financial strategy that balances immediacy with foresight. This integration often enhances your partnership with diverse and powerful insights, fostering a dynamic financial collaboration.`,
          (partnerO, partnerI) =>
            `Differing energies may spark occasional tension, with ${partnerO.name} seeking lively interaction and ${partnerI.name} favoring calm introspection. Scheduling both dynamic discussions and reflective planning sessions can help you capitalize on both strengths, forging a balanced and resilient financial partnership. You are prone to achieve greater harmony and success through this integrated approach.`,
        ],
      },
    },
    changeApproach: {
      poleDetails: {
        S: { level: "high", description: "structured savings and budgets" },
        F: { level: "medium", description: "flexible spending" },
      },
      samePole: {
        mild: [
          "You both commonly choose a {pole} method for financial adjustments, highlighting {poleDescription} to sustain steady and foreseeable plans. This joint preference often establishes a firm groundwork for your economic future, enabling consistent progress. Your partnership might thus enjoy increased security in navigating fiscal shifts.",
          "Even so, your attention to {poleDescription} could restrict spending adaptability. Reserving a modest allowance for {oppositePoleDescription} might inject vitality into your financial routine, offering opportunities for unexpected joys without derailing overall stability.",
        ],
        moderate: [
          "Your shared {pole} tactic for financial variations typically underscores {poleDescription}, guaranteeing a uniform and dependable strategy. This congruence strengthens your collaborative planning capabilities, fostering reliability in joint endeavors. Consequently, you may find greater ease in achieving long-term objectives together.",
          "Your choice for {poleDescription} might oppose unforeseen costs. Embedding {oppositePoleDescription} can allow for impromptu elements while preserving order, such as flexible categories in budgets for spontaneous decisions",
        ],
        strong: [
          "You both strongly adopt a {pole} tactic for financial changes, depending on {poleDescription} to forge a steadfast plan. This vigorous mutual focus often instills assurance and precision in your common aims, minimizing risks effectively. Your relationship is likely to prosper in this structured environment.",
          "Your resolve to {poleDescription} may hinder impromptu fiscal options. Designating areas for {oppositePoleDescription} could equilibrate and delight your planning, introducing adaptability without compromising core principles",
        ],
      },
      oppositePole: {
        mild: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, often prefers structured savings and budgets, while ${partnerF.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, inclines towards flexible spending, forming an equilibrated financial tactic. This mixture tends to sustain steadiness alongside some liberty in handling money. It can lead to a more enjoyable and secure joint experience.`,
          (partnerS, partnerF) =>
            `Sometimes, ${partnerS.name} might deem ${partnerF.name}’s adaptability overly casual, while ${partnerF.name} could feel confined by frameworks. Frequent conversations on aims may aid in discovering equilibrium, promoting accord in your fiscal strategies. This can enhance overall satisfaction.`,
        ],
        moderate: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, typically centers on structured savings and budgets, while ${partnerF.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, adopts flexible spending, delivering a supportive interplay. This fusion supports both reliable preparation and impromptu chances, enriching your collaboration. Over time, it might yield a more versatile financial outlook.`,
          (partnerS, partnerF) =>
            `${partnerS.name} may view ${partnerF.name}’s style as lax, while ${partnerF.name} might find frameworks confining. Defining guidelines for savings and spending can keep both of you aligned, creating a cohesive financial strategy.`,
        ],
        strong: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, is dedicated to structured savings and budgets, while ${partnerF.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, prioritizes flexible spending, creating a bold contrast. By blending these approaches, you can craft a financial plan that is both secure and adaptable.`,
          (partnerS, partnerF) =>
            `Your opposing preferences may lead to clashes, with ${partnerS.name} seeking control and ${partnerF.name} valuing freedom. Agreeing on a budget with fixed and flexible elements can harmonize your styles, strengthening your partnership.`,
        ],
      },
    },
    interpersonalStyle: {
      poleDetails: {
        H: { level: "medium", description: "joint financial goals" },
        A: { level: "medium", description: "personal financial independence" },
      },
      samePole: {
        mild: [
          "You both favor a {pole} approach to financial collaboration, prioritizing {poleDescription} to build a unified financial strategy. This shared style fosters a strong sense of partnership in your money decisions.",
          "Your focus on {poleDescription} might overlook {oppositePoleDescription}. Allowing space for {oppositePoleDescription} can ensure both partners feel valued in their financial choices.",
        ],
        moderate: [
          "Your mutual {pole} style strengthens your financial partnership by emphasizing {poleDescription}, making budgeting a collaborative effort. This alignment builds trust and unity in your financial life.",
          "Your emphasis on {poleDescription} may sometimes neglect {oppositePoleDescription}. Setting aside room for {oppositePoleDescription} can balance your shared goals with individual needs",
        ],
        strong: [
          "You both deeply embrace a {pole} approach to finances, prioritizing {poleDescription} to create a tightly knit financial partnership. This intensity fosters a strong sense of shared purpose.",
          "Your commitment to {poleDescription} may limit {oppositePoleDescription}. Allocating space for {oppositePoleDescription} can enhance your collaboration while respecting individual needs",
        ],
      },
      oppositePole: {
        mild: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, focuses on joint financial goals, while ${partnerA.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, values personal financial independence, creating a balanced dynamic. This mix supports both shared dreams and individual freedom in your financial planning.`,
          (partnerH, partnerA) =>
            `At times, ${partnerH.name} may feel ${partnerA.name} is too detached, while ${partnerA.name} might find joint plans restrictive. Open discussions can help balance both perspectives, fostering a harmonious financial approach.`,
        ],
        moderate: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, emphasizes joint financial goals, while ${partnerA.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, prioritizes personal financial independence, offering a complementary approach. This dynamic allows you to plan together while respecting individual needs.`,
          (partnerH, partnerA) =>
            `${partnerH.name} might see ${partnerA.name}’s independence as a lack of commitment, while ${partnerA.name} could find shared goals limiting. A budget with shared and personal sections can keep both partners satisfied, enhancing your collaboration.`,
        ],
        strong: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, is dedicated to joint financial goals, while ${partnerA.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, craves personal financial independence, creating a dynamic contrast. By blending teamwork with autonomy, you can craft a financial plan that respects both priorities.`,
          (partnerH, partnerA) =>
            `Your opposing styles may lead to friction, with ${partnerH.name} seeking unity and ${partnerA.name} valuing freedom. A clear plan with shared and personal elements can align your financial goals, creating a strong partnership.`,
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
        const oppositePole =
          pole === "C"
            ? "N"
            : pole === "N"
            ? "C"
            : pole === "L"
            ? "V"
            : pole === "V"
            ? "L"
            : pole === "O"
            ? "I"
            : pole === "I"
            ? "O"
            : pole === "S"
            ? "F"
            : pole === "F"
            ? "S"
            : pole === "H"
            ? "A"
            : "H";
        console.log(`Processing ${dim}: pole=${pole}, oppositePole=${oppositePole}`);
        const poleDescription = this.mappings[dim].poleDetails[pole]?.description || "unknown";
        const oppositePoleDescription = this.mappings[dim].poleDetails[oppositePole]?.description || "unknown";
        console.log(`Pole description: ${poleDescription}, Opposite pole description: ${oppositePoleDescription}`);
        textSet = this.mappings[dim].samePole[level].map((text) => {
          console.log(`Raw text for ${dim}: ${text}`);
          let result = text;
          result = result.replace(
            /{pole}/g,
            pole === "C"
              ? "detailed"
              : pole === "N"
              ? "future-oriented"
              : pole === "L"
              ? "logical"
              : pole === "V"
              ? "value-driven"
              : pole === "O"
              ? "active"
              : pole === "I"
              ? "reflective"
              : pole === "S"
              ? "structured"
              : pole === "F"
              ? "flexible"
              : pole === "H"
              ? "collaborative"
              : "independent"
          );
          result = result.replace(/{poleDescription}/g, poleDescription);
          result = result.replace(/{oppositePoleDescription}/g, oppositePoleDescription);
          console.log(`Processed text for ${dim}: ${result}`);
          return result;
        });
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
      "As you move from planning to decision-making,",
      "Turning to how you discuss and approach financial matters,",
      "When it comes to adapting to financial changes,",
      "Finally, in terms of how you collaborate on finances,",
    ];
    const finalDescription = description.map((text, idx) =>
      idx % 2 === 0 && transitions[Math.floor(idx / 2)]
        ? `${transitions[Math.floor(idx / 2)]} ${text.charAt(0).toLowerCase() + text.slice(1)}`
        : text
    );
    console.log("Final description:", finalDescription);
    return { description: finalDescription };
  },
};

export default FinancesPlanningTemplate;
