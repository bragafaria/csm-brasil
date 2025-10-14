export const CareerAmbitionTemplate = {
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
        C: { level: "high", description: "practical tasks and immediate project goals" },
        N: { level: "medium", description: "strategic vision and long-term career growth" },
      },
      samePole: {
        mild: [
          "You both excel at {poleDescription}, creating a unified momentum in your professional lives. You likely thrive on tackling daily tasks like optimizing workflows or meeting project deadlines, which fosters a sense of shared accomplishment. This alignment makes your collaboration seamless, as you both understand the importance of immediate results in building a strong career foundation.",
          "Your focus on {poleDescription} drives efficiency, but overemphasizing it might narrow your perspective. To enhance your approach, create a shared project tracker to monitor progress on immediate deliverables while setting one long-term goal, like pursuing a leadership role, to ensure your efforts contribute to broader career aspirations.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a powerful partnership in your career endeavors. You probably shine at managing tasks like streamlining processes or hitting short-term milestones, which creates a reliable rhythm that strengthens your bond. This mutual focus allows you to support each other’s daily wins while building toward bigger successes.",
          "While your alignment fuels progress, it could limit strategic foresight. Schedule quarterly reviews to assess how your current tasks, like completing a certification, align with future ambitions, such as a career pivot, to add depth and ensure sustained growth in your professional lives.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your career efforts a dynamic force. You likely excel at diving into practical tasks, such as refining project plans or boosting efficiency, which creates a sense of unity and purpose. This deep alignment transforms your professional lives into a shared journey of achievement and momentum.",
          "Your strong focus on {poleDescription} is a major strength, but it might overshadow long-term planning. Introduce a monthly strategy session to evaluate how your immediate efforts, like optimizing a work process, connect to a five-year career vision, ensuring your momentum leads to lasting impact.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, excels at practical tasks and immediate project goals, driving steady progress, while ${
              partnerN.name
            }, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, focuses on strategic vision and long-term career growth, envisioning future opportunities. This subtle contrast creates a complementary dynamic, balancing today’s tasks with tomorrow’s ambitions for a well-rounded partnership.`,
          (partnerC, partnerN) =>
            `${partnerC.name} might feel ${partnerN.name} overlooks urgent tasks for long-term plans, while ${partnerN.name} could think ${partnerC.name} misses broader opportunities. To align, schedule biweekly check-ins to pair one immediate task, like a project deadline, with a long-term goal, like a career transition, turning your differences into a strategic strength.`,
        ],
        moderate: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, brings precision to practical tasks and immediate project goals, ensuring consistent results, while ${
              partnerN.name
            }, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, drives strategic vision and long-term career growth, aiming for transformative outcomes. Your moderate difference forms a dynamic partnership that blends short-term wins with long-term aspirations.`,
          (partnerC, partnerN) =>
            `${partnerC.name} may find ${partnerN.name}'s focus on future goals less actionable, while ${partnerN.name} might see ${partnerC.name}'s task-driven approach as narrow. Create a joint career roadmap with short-term milestones, like mastering a new skill, tied to long-term objectives, like a senior role, to leverage both perspectives for success.`,
        ],
        strong: [
          (partnerC, partnerN) =>
            `${partnerC.name}, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerC.typeCode] || "your type"
            }, is a powerhouse in practical tasks and immediate project goals, building a solid foundation, while ${
              partnerN.name
            }, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerN.typeCode] || "your type"
            }, excels at strategic vision and long-term career growth, charting bold paths forward. This stark contrast can fuel remarkable progress when you combine your strengths, creating a partnership that’s both productive and visionary.`,
          (partnerC, partnerN) =>
            `Tensions may arise when ${partnerC.name} prioritizes immediate results and ${partnerN.name} focuses on future possibilities, but this is your opportunity to shine. Develop a shared action plan that pairs one practical task, like streamlining a process, with a strategic goal, like entering a new industry, to make your differences a catalyst for growth.`,
        ],
      },
    },
    decisionMaking: {
      poleDetails: {
        L: { level: "high", description: "data-driven career choices and efficiency" },
        V: { level: "medium", description: "value-driven roles and personal fulfillment" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a seamless alignment in how you approach career decisions. You likely excel at analyzing opportunities with precision, such as comparing job benefits or growth potential, which makes your planning sessions clear and collaborative. This shared perspective fosters a supportive environment where you confidently navigate your professional paths together.",
          "Your focus on {poleDescription} drives clarity, but it might limit deeper considerations. To enhance your decisions, create a priority list for your next career move, ranking factors like salary or alignment with personal goals, to ensure your choices are both practical and meaningful.",
        ],
        moderate: [
          "Your shared commitment to {poleDescription} strengthens your career decision-making process, fostering a deep sense of partnership. You probably shine at evaluating roles with a clear lens, such as weighing data-driven metrics like job stability, which makes your discussions productive and aligned. This mutual focus builds a foundation for confident, joint planning.",
          "While your alignment is powerful, it could benefit from broader perspectives. Develop a decision-making framework that includes a pros-and-cons list for one choice, supplemented by a discussion on how it supports your long-term aspirations, to add depth to your approach.",
        ],
        strong: [
          "You both demonstrate an intense focus on {poleDescription}, making your career decisions a unified and powerful process. You likely dive into detailed analyses, such as researching market trends or job metrics, turning complex choices into clear plans. This deep synergy transforms your decision-making into a cornerstone of your shared success.",
          "Your strong focus is a major asset, but it might overlook alternative factors. Try a structured exercise, like mapping your top career priorities and linking them to a five-year vision, to ensure your decisions remain balanced and forward-looking.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, excels at data-driven career choices and efficiency, ensuring practical outcomes, while ${
              partnerV.name
            }, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, seeks value-driven roles and personal fulfillment, prioritizing meaning. This subtle difference creates a balanced approach, blending logic with passion for well-rounded decisions.`,
          (partnerL, partnerV) =>
            `${partnerL.name} might feel ${partnerV.name}'s choices prioritize feelings over logic, while ${partnerV.name} could view ${partnerL.name}'s approach as too rigid. Try a decision-making session where you list data-driven factors, like salary, alongside value-based factors, like job satisfaction, to find a role that satisfies both perspectives.`,
        ],
        moderate: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, drives data-driven career choices and efficiency, grounding decisions in logic, while ${
              partnerV.name
            }, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, pursues value-driven roles and personal fulfillment, adding purpose. Your moderate contrast fosters a partnership that combines clarity with meaning, enhancing your career paths.`,
          (partnerL, partnerV) =>
            `${partnerL.name} may find ${partnerV.name}'s value-driven approach less practical, while ${partnerV.name} might see ${partnerL.name}'s logic as detached. Create a decision matrix that scores options on efficiency and fulfillment to ensure both perspectives shape your choices effectively.`,
        ],
        strong: [
          (partnerL, partnerV) =>
            `${partnerL.name}, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerL.typeCode] || "your type"
            }, thrives on data-driven career choices and efficiency, optimizing for success, while ${
              partnerV.name
            }, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerV.typeCode] || "your type"
            }, excels at value-driven roles and personal fulfillment, seeking meaningful impact. This stark contrast can spark innovative decisions that blend logic and passion, strengthening your partnership.`,
          (partnerL, partnerV) =>
            `Tensions might arise when ${partnerL.name} emphasizes data and ${partnerV.name} prioritizes values, but this is your strength. Develop a shared process that evaluates options based on measurable benefits and personal alignment, like a role that’s both stable and fulfilling, to create choices that excite you both.`,
        ],
      },
    },
    energyOrientation: {
      poleDetails: {
        O: { level: "medium", description: "energetic networking and quick action" },
        I: { level: "medium", description: "thoughtful planning and self-reflection" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, infusing your career discussions with a shared energy that drives progress. You likely excel at seizing opportunities like attending networking events or acting on quick career moves, making your conversations vibrant and motivating. This alignment creates a dynamic space where you inspire each other to take bold steps forward.",
          "Your focus on {poleDescription} fuels momentum, but it might lead to hasty decisions. Schedule regular check-ins to review your networking efforts or actions, ensuring they align with your broader career goals, like building a professional network that supports long-term growth.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} creates a lively partnership in your career discussions. You probably shine at driving quick actions, such as connecting with industry contacts or pursuing rapid opportunities, which keeps your talks productive and engaging. This mutual energy strengthens your ability to push each other toward professional success.",
          "While your focus drives results, it could benefit from periodic grounding. Add a monthly review to assess whether your actions, like attending a conference, are building toward long-term ambitions, such as a leadership role, to ensure your energy leads to sustained progress.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, making your career conversations a powerhouse of motivation. You likely excel at diving into networking or quick career decisions, creating a partnership that feels unstoppable. This deep synergy transforms your discussions into a driving force for professional growth.",
          "Your strong focus is incredible, but it might overlook the need for consolidation. Introduce a quarterly strategy session to evaluate how your networking or actions, like securing a new contact, align with a five-year career vision, ensuring your momentum drives lasting results.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, excels at energetic networking and quick action, sparking immediate momentum, while ${
              partnerI.name
            }, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, focuses on thoughtful planning and self-reflection, adding depth to discussions. This subtle contrast creates a balanced dynamic that blends action with insight.`,
          (partnerO, partnerI) =>
            `${partnerO.name} might wish ${partnerI.name} would act faster, while ${partnerI.name} could find ${partnerO.name}'s pace overwhelming. Alternate between a networking event and a reflective planning session each month to combine your strengths and keep discussions productive.`,
        ],
        moderate: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, drives energetic networking and quick action, fueling rapid progress, while ${partnerI.name}, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, excels at thoughtful planning and self-reflection, ensuring meaningful direction. Your moderate difference creates a partnership that’s both dynamic and deliberate, enhancing your career conversations.`,
          (partnerO, partnerI) =>
            `${partnerO.name} may find ${partnerI.name}'s reflective approach slow, while ${partnerI.name} could feel ${partnerO.name}'s energy is intense. Create a 'talk and think' schedule, with one week for networking and one for reflection, to leverage both styles effectively.`,
        ],
        strong: [
          (partnerO, partnerI) =>
            `${partnerO.name}, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerO.typeCode] || "your type"
            }, thrives on energetic networking and quick action, driving momentum, while ${partnerI.name}, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerI.typeCode] || "your type"
            }, excels at thoughtful planning and self-reflection, grounding ambitions. This stark contrast can spark innovative discussions that propel your careers forward when combined.`,
          (partnerO, partnerI) =>
            `Tensions might emerge when ${partnerO.name} pushes for action and ${partnerI.name} seeks reflection, but this is your chance to excel. Develop a weekly plan that blends one networking goal, like attending an industry event, with a reflective strategy session to turn your differences into a winning formula.`,
        ],
      },
    },
    changeApproach: {
      poleDetails: {
        S: { level: "high", description: "consistent routines and structured plans" },
        F: { level: "medium", description: "flexible adjustments and new opportunities" },
      },
      samePole: {
        mild: [
          "You both excel at {poleDescription}, creating a stable foundation for navigating career changes. You likely thrive on crafting detailed plans, such as setting timelines for promotions or certifications, which makes transitions feel manageable and collaborative. This alignment builds a partnership where you confidently face professional shifts together.",
          "Your focus on {poleDescription} provides stability, but it might limit adaptability. Review your career plans quarterly to ensure they remain relevant, incorporating small tweaks, like adjusting a timeline, to keep your strategies dynamic and effective.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} fosters a reliable partnership in handling career transitions. You probably shine at creating structured roadmaps, such as planning a career move with clear steps, which keeps you aligned and confident. This mutual focus makes career changes a joint effort that strengthens your bond.",
          "While your alignment is grounding, it could benefit from occasional flexibility. Conduct a biannual review to assess whether your plans, like a promotion timeline, need slight adjustments to seize new opportunities, ensuring your approach remains responsive.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, turning career transitions into a seamless process. You likely excel at crafting detailed strategies, such as mapping a five-year career trajectory, creating a partnership that feels solid and purposeful. This deep synergy makes your professional journeys a shared triumph.",
          "Your strong focus is powerful, but it might overlook emerging possibilities. Hold an annual 'reset' session to evaluate your plans, like a structured career path, and incorporate one new opportunity, like a side project, to keep your strategies vibrant and forward-looking.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, excels at consistent routines and structured plans, providing career stability, while ${
              partnerF.name
            }, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, focuses on flexible adjustments and new opportunities, adding adaptability. This subtle difference creates a balanced partnership that’s both steady and open to change.`,
          (partnerS, partnerF) =>
            `${partnerS.name} might find ${partnerF.name}'s flexibility unpredictable, while ${partnerF.name} could see ${partnerS.name}'s structure as rigid. Create a career plan with fixed milestones, like a promotion timeline, and one flexible goal, like exploring a new role, to blend your strengths.`,
        ],
        moderate: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, drives success through consistent routines and structured plans, ensuring reliability, while ${
              partnerF.name
            }, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, excels at flexible adjustments and new opportunities, seizing possibilities. Your moderate contrast creates a partnership that’s both grounded and adventurous.`,
          (partnerS, partnerF) =>
            `${partnerS.name} may view ${partnerF.name}'s adaptability as inconsistent, while ${partnerF.name} might find ${partnerS.name}'s routines limiting. Develop a hybrid plan with a stable core, like a fixed work schedule, and a flexible element, like a side hustle, to make transitions smoother.`,
        ],
        strong: [
          (partnerS, partnerF) =>
            `${partnerS.name}, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerS.typeCode] || "your type"
            }, is dedicated to consistent routines and structured plans, building a solid foundation, while ${
              partnerF.name
            }, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerF.typeCode] || "your type"
            }, excels at flexible adjustments and new opportunities, embracing change. This stark contrast can drive innovative career paths when you work together.`,
          (partnerS, partnerF) =>
            `Tensions might arise when ${partnerS.name} seeks stability and ${partnerF.name} chases change, but this is your strength. Craft a career strategy with a fixed routine, like a weekly task list, and an open-ended goal, like exploring a new industry, to turn your differences into a powerful advantage.`,
        ],
      },
    },
    interpersonalStyle: {
      poleDetails: {
        H: { level: "medium", description: "collaborative projects and shared goals" },
        A: { level: "medium", description: "independent achievements and personal growth" },
      },
      samePole: {
        mild: [
          "You both thrive on {poleDescription}, creating a warm and connected partnership in your career support. You likely excel at joint efforts, such as co-developing a business idea or supporting shared goals, which makes your encouragement feel deeply united. This alignment strengthens your bond, making your professional lives a true team effort.",
          "Your focus on {poleDescription} fosters unity, but it might limit individual exploration. Encourage each other to pursue one personal career goal, like a solo training course, alongside your joint efforts to keep your support dynamic and balanced.",
        ],
        moderate: [
          "Your shared strength in {poleDescription} builds a powerful sense of togetherness in supporting each other’s careers. You probably shine at teaming up on shared goals, like launching a joint project, which fosters mutual encouragement and alignment. This mutual focus makes your career support feel natural and inspiring.",
          "While your alignment is heartwarming, it could benefit from individual space. Set one collaborative goal, like a team project, and one personal goal, like a solo achievement, to add variety and depth to your support system.",
        ],
        strong: [
          "You both demonstrate an intense commitment to {poleDescription}, turning career support into a shared journey of success. You likely excel at working together, such as co-managing a project or brainstorming career moves, creating a partnership that feels unbreakable. This deep synergy amplifies your professional growth as a couple.",
          "Your strong focus is incredible, but it might overshadow personal pursuits. Dedicate time to one solo career milestone, like earning a certification, alongside your joint efforts to ensure your support remains balanced and vibrant.",
        ],
      },
      oppositePole: {
        mild: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, excels at collaborative projects and shared goals, fostering teamwork, while ${partnerA.name}, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, focuses on independent achievements and personal growth, pursuing individual ambitions. This subtle contrast creates a balanced partnership that supports both teamwork and individuality.`,
          (partnerH, partnerA) =>
            `${partnerH.name} might crave more collaboration from ${partnerA.name}, while ${partnerA.name} could need more personal space. Celebrate one joint project, like a shared presentation, and one solo achievement, like a personal milestone, to strengthen your support.`,
        ],
        moderate: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, drives success through collaborative projects and shared goals, creating unity, while ${
              partnerA.name
            }, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, excels at independent achievements and personal growth, driving individual progress. Your moderate contrast adds depth to your career support, blending togetherness with autonomy.`,
          (partnerH, partnerA) =>
            `${partnerH.name} may find ${partnerA.name}'s independence isolating, while ${partnerA.name} might feel collaboration limits growth. Create a plan with one shared goal, like a team project, and one personal goal, like a solo skill, to balance your dynamic.`,
        ],
        strong: [
          (partnerH, partnerA) =>
            `${partnerH.name}, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerH.typeCode] || "your type"
            }, is passionate about collaborative projects and shared goals, building a united front, while ${
              partnerA.name
            }, as ${
              CareerAmbitionTemplate.typeCodeToArchetype[partnerA.typeCode] || "your type"
            }, excels at independent achievements and personal growth, carving their own path. This stark contrast can inspire innovative support when you align your efforts.`,
          (partnerH, partnerA) =>
            `Differences might spark tension, with ${partnerH.name} seeking teamwork and ${partnerA.name} valuing independence. Develop a support system with regular check-ins on one shared goal, like a joint venture, and one personal goal, like a promotion, to turn your contrast into a strength.`,
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
                ? "energetic"
                : pole === "I"
                ? "thoughtful"
                : pole === "S"
                ? "steady"
                : pole === "F"
                ? "adaptable"
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
      "When it comes to making career decisions,",
      "In how you discuss and energize your ambitions,",
      "As you navigate changes in your professional lives,",
      "When supporting each other’s career journeys,",
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
export default CareerAmbitionTemplate;
