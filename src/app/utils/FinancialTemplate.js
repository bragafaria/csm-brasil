export const FinancesPlanningTemplate = {
  typeCodeToArchetype: {
    "N-L-I-S-H": "The Counselor",
    "C-L-I-S-H": "The Analyst",
  },
  mappings: {
    "Information Processing": {
      poleImportance: {
        C: "high (detailed financial tracking, budgeting)",
        N: "medium (long-term financial opportunities, trends)",
      },
      samePole: {
        mild: [
          "You both share a preference for {pole} financial approaches, creating a cohesive strategy that feels aligned and purposeful. Your shared focus on {poleImportance} fosters a reliable foundation for managing your finances together, whether through structured budgets or exploring future opportunities.",
          "This alignment can sometimes lead you to overlook alternative perspectives, such as {oppositePoleImportance}. Consider occasionally exploring {oppositePoleImportance} to add variety and flexibility to your financial planning.",
        ],
        moderate: [
          "Your mutual inclination toward {pole} financial strategies strengthens your ability to work as a team, emphasizing {poleImportance}. This shared approach ensures consistency in how you handle money, building trust and clarity in your financial decisions.",
          "Your strong focus on {poleImportance} might occasionally limit your adaptability. Setting aside time to consider {oppositePoleImportance} can help you balance your plans with new possibilities.",
        ],
        strong: [
          "You both deeply embrace {pole} financial methods, making {poleImportance} a cornerstone of your partnership. This intense alignment creates a highly organized and predictable financial life that feels secure and well-coordinated.",
          "Your commitment to {poleImportance} may sometimes restrict creative or spontaneous financial choices. Intentionally incorporating {oppositePoleImportance} can invigorate your planning with fresh ideas.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, tends to prefer detailed financial tracking, while ${partnerN.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, focuses on long-term financial opportunities, creating a balanced partnership. This combination allows you to build plans that blend precision with vision, ensuring both stability and growth in your financial journey.`,
          (partnerC, partnerN) =>
            `At times, ${partnerC.name} may find ${partnerN.name}’s focus on future opportunities less grounded, while ${partnerN.name} might find detailed tracking restrictive. Regular discussions to balance immediate budgets with long-term goals can strengthen your collaboration, fostering a harmonious financial approach.`,
        ],
        moderate: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, prioritizes detailed budgeting and expense tracking, while ${partnerN.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, emphasizes long-term financial opportunities, offering a complementary dynamic. This mix supports a financial plan that combines careful management with ambitious goals, creating a well-rounded partnership.`,
          (partnerC, partnerN) =>
            `${partnerC.name} might see ${partnerN.name}’s ideas as speculative, while ${partnerN.name} could view budgets as limiting. Schedule consistent check-ins to align on shared priorities, turning your differences into strengths for a cohesive financial strategy.`,
        ],
        strong: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, focuses on meticulous financial tracking, while ${partnerN.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, pursues long-term financial opportunities, creating a dynamic contrast. By blending careful budgeting with bold vision, you can craft a financial plan that is both secure and forward-looking, enhancing your partnership.`,
          (partnerC, partnerN) =>
            `Your differing approaches may spark tension, with ${partnerC.name} prioritizing caution and ${partnerN.name} embracing future possibilities. Establish clear boundaries for spending and investing, and hold regular planning sessions to align your goals, creating a powerful and balanced financial partnership.`,
        ],
      },
    },
    "Decision-Making": {
      poleImportance: { L: "high (logical budgeting, cost analysis)", V: "medium (value-driven spending)" },
      samePole: {
        mild: [
          "You both lean toward {pole} decision-making, grounding your financial choices in {poleImportance}. This shared approach fosters confidence in your budgeting and spending decisions, creating a sense of unity and clarity.",
          "Focusing on {poleImportance} may sometimes overlook {oppositePoleImportance}. Discussing what matters most to you both, such as meaningful purchases, can add depth to your financial strategy.",
        ],
        moderate: [
          "Your mutual preference for {pole} decision-making strengthens your financial partnership through {poleImportance}. This alignment ensures your choices are well-considered and aligned with your shared goals.",
          "Your emphasis on {poleImportance} might occasionally miss {oppositePoleImportance}. Exploring {oppositePoleImportance} together can bring balance and emotional resonance to your plans.",
        ],
        strong: [
          "You both strongly favor {pole} decision-making, relying heavily on {poleImportance} to guide your finances. This creates a precise and dependable financial strategy that leaves little room for uncertainty.",
          "Your focus on {poleImportance} may limit consideration of {oppositePoleImportance}. Setting aside a budget for meaningful or spontaneous spending can enrich your financial life.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, tends to prefer logical budgeting, while ${partnerV.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, leans toward value-driven spending, creating a balanced financial approach. This combination allows you to make smart, practical decisions while honoring what matters most to you both.`,
          (partnerL, partnerV) =>
            `At times, ${partnerL.name} may find ${partnerV.name}’s value-driven choices less practical, while ${partnerV.name} might see logical budgeting as restrictive. Open conversations about your priorities can help you blend both perspectives, fostering a cohesive financial strategy.`,
        ],
        moderate: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, focuses on cost analysis, while ${partnerV.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, prioritizes value-driven spending, offering a complementary mix. This dynamic supports both practical budgeting and meaningful purchases, enhancing your financial collaboration.`,
          (partnerL, partnerV) =>
            `${partnerL.name} might find ${partnerV.name}’s approach too emotional, while ${partnerV.name} could view cost analysis as limiting. Regular discussions about your financial values can align your approaches, turning differences into strengths.`,
        ],
        strong: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, is dedicated to logical budgeting, while ${partnerV.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, emphasizes value-driven spending, creating a bold contrast. By blending these strengths, you can craft a financial plan that is both practical and heartfelt.`,
          (partnerL, partnerV) =>
            `Your opposing styles may lead to disagreements, with ${partnerL.name} seeking practicality and ${partnerV.name} prioritizing passion. Setting shared goals that incorporate both logic and values can harmonize your decisions, creating a balanced partnership.`,
        ],
      },
    },
    "Energy Orientation": {
      poleImportance: { O: "medium (active financial discussions)", I: "low (reflective financial planning)" },
      samePole: {
        mild: [
          "You both share a {pole} approach to financial planning, engaging in {poleImportance} that make money matters feel collaborative and dynamic. This shared energy keeps your financial conversations productive and aligned.",
          "Your preference for {poleImportance} might sometimes rush decisions or overlook deeper reflection. Scheduling moments for {oppositePoleImportance} can ensure your plans are well-rounded.",
        ],
        moderate: [
          "Your mutual {pole} energy drives lively {poleImportance}, making financial planning a team effort. This approach fosters engagement and keeps your financial goals in focus.",
          "Your focus on {poleImportance} may occasionally skip thoughtful pauses. Incorporating {oppositePoleImportance} can add depth and clarity to your financial strategy.",
        ],
        strong: [
          "You both thrive on {pole} financial planning, immersing yourselves in {poleImportance} that feel vibrant and collaborative. This intensity strengthens your partnership and keeps money matters exciting.",
          "Your strong {poleImportance} might bypass careful consideration. Regular intervals of {oppositePoleImportance} can balance your dynamic approach with thoughtful review.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, enjoys active financial discussions, while ${partnerI.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, prefers reflective planning, creating a balanced dynamic. This mix allows you to combine lively conversations with thoughtful strategies for a well-rounded financial approach.`,
          (partnerO, partnerI) =>
            `At times, ${partnerO.name} may find ${partnerI.name} less engaged, while ${partnerI.name} might feel discussions are overwhelming. Alternating between discussion and reflection can harmonize your planning, fostering a cohesive strategy.`,
        ],
        moderate: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, brings energy to financial discussions, while ${partnerI.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, focuses on reflective planning, offering a complementary approach. This balance supports both active engagement and careful consideration in your financial strategy.`,
          (partnerO, partnerI) =>
            `${partnerO.name} might see ${partnerI.name}’s reflective style as disengaged, while ${partnerI.name} could find discussions intense. A routine blending both styles can align your efforts, creating a unified financial plan.`,
        ],
        strong: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, thrives on active financial discussions, while ${partnerI.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, prefers deep reflection, creating a dynamic contrast. Combining lively talks with thoughtful planning can lead to a robust financial strategy.`,
          (partnerO, partnerI) =>
            `Your differing energies may cause friction, with ${partnerO.name} wanting action and ${partnerI.name} seeking calm. Scheduling both discussion and reflection time can help you leverage both strengths, enhancing your partnership.`,
        ],
      },
    },
    "Change Approach": {
      poleImportance: { S: "high (structured savings, budgets)", F: "medium (flexible spending)" },
      samePole: {
        mild: [
          "You both favor a {pole} approach to financial changes, prioritizing {poleImportance} to keep your plans stable and predictable. This shared preference creates a secure foundation for your financial future.",
          "Your focus on {poleImportance} may limit flexibility in spending. Setting aside a small budget for {oppositePoleImportance} can add excitement to your financial life.",
        ],
        moderate: [
          "Your mutual {pole} approach to financial changes emphasizes {poleImportance}, ensuring a consistent and reliable financial strategy. This alignment strengthens your ability to plan together effectively.",
          "Your preference for {poleImportance} might resist unexpected expenses. Incorporating {oppositePoleImportance} can provide room for spontaneity while maintaining stability.",
        ],
        strong: [
          "You both strongly embrace a {pole} approach to financial changes, relying on {poleImportance} to create a rock-solid financial plan. This intensity fosters confidence and clarity in your shared goals.",
          "Your commitment to {poleImportance} may restrict spontaneous financial choices. Allocating space for {oppositePoleImportance} can bring balance and joy to your planning.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, prefers structured savings, while ${partnerF.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, leans toward flexible spending, creating a balanced financial approach. This mix allows you to maintain stability while enjoying some financial freedom.`,
          (partnerS, partnerF) =>
            `At times, ${partnerS.name} may find ${partnerF.name}’s flexibility too carefree, while ${partnerF.name} might feel restricted by budgets. Regular talks about your goals can help you find a balanced approach, fostering harmony in your financial planning.`,
        ],
        moderate: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, focuses on structured budgets, while ${partnerF.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, embraces flexible spending, offering a complementary dynamic. This blend supports both secure planning and spontaneous opportunities.`,
          (partnerS, partnerF) =>
            `${partnerS.name} might see ${partnerF.name}’s approach as too relaxed, while ${partnerF.name} could find budgets limiting. Clear rules for savings and spending can keep both of you aligned, creating a cohesive financial strategy.`,
        ],
        strong: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, is dedicated to structured budgets, while ${partnerF.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, prioritizes flexible spending, creating a bold contrast. By blending these approaches, you can craft a financial plan that is both secure and adaptable.`,
          (partnerS, partnerF) =>
            `Your opposing preferences may lead to clashes, with ${partnerS.name} seeking control and ${partnerF.name} valuing freedom. Agreeing on a budget with fixed and flexible elements can harmonize your styles, strengthening your partnership.`,
        ],
      },
    },
    "Interpersonal Style": {
      poleImportance: { H: "medium (joint financial goals)", A: "high (personal financial independence)" },
      samePole: {
        mild: [
          "You both share a {pole} approach to financial collaboration, focusing on {poleImportance} to create a unified financial strategy. This teamwork fosters a sense of partnership in your money decisions.",
          "Your emphasis on {poleImportance} might overlook {oppositePoleImportance}. Allowing space for {oppositePoleImportance} can ensure both partners feel valued in their financial choices.",
        ],
        moderate: [
          "Your mutual {pole} style strengthens your financial partnership through {poleImportance}, making budgeting a collaborative effort. This alignment builds trust and unity in your financial life.",
          "Your focus on {poleImportance} may sometimes neglect {oppositePoleImportance}. Setting aside room for {oppositePoleImportance} can balance your shared goals with individual needs.",
        ],
        strong: [
          "You both deeply embrace a {pole} approach to finances, prioritizing {poleImportance} to create a tightly knit financial partnership. This intensity fosters a strong sense of shared purpose.",
          "Your commitment to {poleImportance} may limit {oppositePoleImportance}. Allocating personal financial space can enhance your collaboration while respecting individual needs.",
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
            }, emphasizes shared financial goals, while ${partnerA.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, prioritizes personal independence, offering a complementary approach. This dynamic allows you to plan together while respecting individual needs.`,
          (partnerH, partnerA) =>
            `${partnerH.name} might see ${partnerA.name}’s independence as a lack of commitment, while ${partnerA.name} could find shared goals limiting. A budget with shared and personal sections can keep both partners satisfied, enhancing your collaboration.`,
        ],
        strong: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, is dedicated to joint financial goals, while ${partnerA.name}, as ${
              FinancesPlanningTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, craves personal independence, creating a dynamic contrast. By blending teamwork with autonomy, you can craft a financial plan that respects both priorities.`,
          (partnerH, partnerA) =>
            `Your opposing styles may lead to friction, with ${partnerH.name} seeking unity and ${partnerA.name} valuing freedom. A clear plan with shared and personal elements can align your financial goals, creating a strong partnership.`,
        ],
      },
    },
  },
  generateText: function (partnerA, partnerB) {
    const dimensions = [
      "Information Processing",
      "Decision-Making",
      "Energy Orientation",
      "Change Approach",
      "Interpersonal Style",
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
        textSet = this.mappings[dim].samePole[level].map((text) =>
          text
            .replace(
              "{pole}",
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
            )
            .replace("{poleImportance}", this.mappings[dim].poleImportance[pole])
            .replace("{oppositePoleImportance}", this.mappings[dim].poleImportance[oppositePole])
        );
      } else {
        // Determine which partner has which pole
        const poleMap = {
          "Information Processing": {
            first: "C",
            second: "N",
            firstPartner: aDominant === "C" ? partnerA : partnerB,
            secondPartner: aDominant === "C" ? partnerB : partnerA,
          },
          "Decision-Making": {
            first: "L",
            second: "V",
            firstPartner: aDominant === "L" ? partnerA : partnerB,
            secondPartner: aDominant === "L" ? partnerB : partnerA,
          },
          "Energy Orientation": {
            first: "O",
            second: "I",
            firstPartner: aDominant === "O" ? partnerA : partnerB,
            secondPartner: aDominant === "O" ? partnerB : partnerA,
          },
          "Change Approach": {
            first: "S",
            second: "F",
            firstPartner: aDominant === "S" ? partnerA : partnerB,
            secondPartner: aDominant === "S" ? partnerB : partnerA,
          },
          "Interpersonal Style": {
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

    // Add transition phrases for essay-like flow
    const transitions = [
      "", // First paragraph needs no transition
      "As you move from planning to decision-making,",
      "Turning to how you discuss and approach financial matters,",
      "When it comes to adapting to financial changes,",
      "Finally, in terms of how you collaborate on finances,",
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
export default FinancesPlanningTemplate;
