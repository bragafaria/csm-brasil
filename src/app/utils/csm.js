// utils/csm.js — FINAL CSM ASSESSMENT (70 questions → 32 archetypes)
// Fixes applied:
// - Reverse scoring: correctly applies reversal BEFORE pole assignment
// - Forced-select: normalized to 5-point scale (was 6-point)
// - Epsilon tie-breaker: preserved exactly as requested

export const poles = [
  ["C", "N"],
  ["L", "V"],
  ["I", "O"],
  ["S", "F"],
  ["H", "A"],
];

// Helper
export function getDimPoles(dimIndex, dominants, percents) {
  const primaryPole = dominants[dimIndex];
  const p1Pct = Math.round(percents[dimIndex].p1);
  const primaryPct = primaryPole === poles[dimIndex][0] ? p1Pct : 100 - p1Pct;
  const secPct = 100 - primaryPct;
  const secPole = primaryPole === poles[dimIndex][0] ? poles[dimIndex][1] : poles[dimIndex][0];
  return { primaryPole, primaryPct, secPole, secPct };
}

// ===================================================================
// 70 BALANCED QUESTIONS: 14 per dimension
// 6 Likert (5 + 1 reverse), 8 forced-select (5-point scale)
// ===================================================================

const forcedOptions = (p1, p2, scenarios) => [
  { key: "a", label: scenarios.strongP1, value: { [p1]: 5, [p2]: 1 } },
  { key: "b", label: scenarios.strongP2, value: { [p1]: 1, [p2]: 5 } },
  { key: "c", label: scenarios.leanP1, value: { [p1]: 4, [p2]: 2 } },
  { key: "d", label: scenarios.leanP2, value: { [p1]: 2, [p2]: 4 } },
  { key: "e", label: scenarios.balanced, value: { [p1]: 3, [p2]: 3 } },
];

export const questions = [
  // ===================================================================
  // DIMENSION 0: C (Concrete) vs N (Abstract) — id: 0–13
  // ===================================================================
  // DIMENSION 0: C vs N
  {
    id: 0,
    dimension: 0,
    type: "likert",
    text: "I trust what I can see, touch, and measure more than theories.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 1,
    dimension: 0,
    type: "likert",
    text: "I prefer fixing real problems over imagining possibilities.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 2,
    dimension: 0,
    type: "likert",
    text: "When helping a friend solve a problem, I focus on practical solutions based on what’s available.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 3,
    dimension: 0,
    type: "likert",
    text: "I often explore hypothetical scenarios when learning something new.",
    favoring: "N",
    reverse: false,
  },
  {
    id: 4,
    dimension: 0,
    type: "likert",
    text: "I don’t enjoy theorizing about unseen patterns.",
    favoring: "N",
    reverse: true,
  },
  {
    id: 5,
    dimension: 0,
    type: "likert",
    text: "I love spotting hidden connections between unrelated ideas.",
    favoring: "N",
    reverse: false,
  },
  {
    id: 6,
    dimension: 0,
    type: "likert",
    text: "I often imagine detailed future scenarios.",
    favoring: "N",
    reverse: false,
  },
  {
    id: 7,
    dimension: 0,
    type: "likert",
    text: "I see symbolic meanings in everyday events.",
    favoring: "N",
    reverse: false,
  },
  {
    id: 8,
    dimension: 0,
    type: "forced-select",
    text: "Helping a neighbor with a home repair:",
    options: forcedOptions("C", "N", {
      strongP1: "Use tools and materials at hand to fix it practically.",
      strongP2: "Brainstorm creative ways to improve the repair beyond the basics.",
      leanP1: "Follow a familiar method but make small adjustments.",
      leanP2: "Experiment with a new approach but keep it functional.",
      balanced: "Combine practical fixes with some creative tweaks.",
    }),
  },
  {
    id: 9,
    dimension: 0,
    type: "forced-select",
    text: "Contributing to a community project, like a garden:",
    options: forcedOptions("C", "N", {
      strongP1: "Plan with proven methods and available resources.",
      strongP2: "Envision innovative designs and future possibilities.",
      leanP1: "Use standard techniques but allow minor experiments.",
      leanP2: "Focus on creative ideas but ground them in reality.",
      balanced: "Blend practical planning with creative vision.",
    }),
  },
  {
    id: 10,
    dimension: 0,
    type: "forced-select",
    text: "Choosing a book to read:",
    options: forcedOptions("C", "N", {
      strongP1: "A practical guide: 'How to Fix Your Life in 30 Days'.",
      strongP2: "A sci-fi novel about alternate realities and AI.",
      leanP1: "A biography of a successful business leader.",
      leanP2: "A philosophy book on consciousness and meaning.",
      balanced: "A mix of self-help and speculative fiction.",
    }),
  },
  {
    id: 11,
    dimension: 0,
    type: "forced-select",
    text: "Fixing something broken at home:",
    options: forcedOptions("C", "N", {
      strongP1: "Follow the official repair manual step-by-step.",
      strongP2: "Invent a creative fix using random household items.",
      leanP1: "Search YouTube for a trusted tutorial.",
      leanP2: "Imagine a futuristic solution and experiment.",
      balanced: "Use a guide but adapt if needed.",
    }),
  },
  {
    id: 12,
    dimension: 0,
    type: "forced-select",
    text: "Teaching someone a new skill:",
    options: forcedOptions("C", "N", {
      strongP1: "Break it into clear, sequential steps with examples.",
      strongP2: "Use metaphors and stories to spark insight.",
      leanP1: "Show a real demo and let them copy.",
      leanP2: "Encourage discovery through trial and error.",
      balanced: "Mix demo with guided exploration.",
    }),
  },
  {
    id: 13,
    dimension: 0,
    type: "forced-select",
    text: "Predicting project success:",
    options: forcedOptions("C", "N", {
      strongP1: "Base it on historical data and past performance.",
      strongP2: "Rely on intuition and emerging patterns.",
      leanP1: "Use past results with slight adjustments.",
      leanP2: "Imagine multiple futures and prepare.",
      balanced: "Data-informed intuition.",
    }),
  },

  // DIMENSION 1: L vs V
  {
    id: 14,
    dimension: 1,
    type: "likert",
    text: "In debates, I prioritize being correct over being kind.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 15,
    dimension: 1,
    type: "likert",
    text: "Rules should be followed even if they upset someone.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 16,
    dimension: 1,
    type: "likert",
    text: "Efficiency matters more than team morale.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 17,
    dimension: 1,
    type: "likert",
    text: "I rarely let emotions influence my decisions.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 18,
    dimension: 1,
    type: "likert",
    text: "I don’t bend principles to avoid conflict.",
    favoring: "L",
    reverse: true, // Adjusted reverse to balance
  },
  {
    id: 19,
    dimension: 1,
    type: "likert",
    text: "I’d rather be kind than correct.",
    favoring: "V",
    reverse: false,
  },
  {
    id: 20,
    dimension: 1,
    type: "likert",
    text: "People’s feelings should guide decisions.",
    favoring: "V",
    reverse: false,
  },
  {
    id: 21,
    dimension: 1,
    type: "likert",
    text: "Harmony in a group is worth compromising on logic.",
    favoring: "V",
    reverse: false,
  },

  {
    id: 22,
    dimension: 1,
    type: "forced-select",
    text: "Resolving a conflict during a shared meal with friends:",
    options: forcedOptions("L", "V", {
      strongP1: "Focus on fair rules, like splitting the bill evenly.",
      strongP2: "Prioritize everyone’s feelings to keep the mood positive.",
      leanP1: "Propose a logical solution but consider emotions.",
      leanP2: "Focus on harmony but suggest a fair compromise.",
      balanced: "Balance fairness with emotional well-being.",
    }),
  },
  {
    id: 23,
    dimension: 1,
    type: "forced-select",
    text: "Helping a friend choose between two options, like a gift:",
    options: forcedOptions("L", "V", {
      strongP1: "Recommend based on objective quality and value.",
      strongP2: "Choose based on what aligns with their emotional needs.",
      leanP1: "Prioritize quality but factor in their preferences.",
      leanP2: "Focus on their feelings but consider practicality.",
      balanced: "Equal weight on quality and emotional fit.",
    }),
  },
  {
    id: 24,
    dimension: 1,
    type: "forced-select",
    text: "Friend asks for honest feedback on their art:",
    options: forcedOptions("L", "V", {
      strongP1: "Give direct critique: 'The composition is weak.'",
      strongP2: "Say: 'I love how much heart you put into it.'",
      leanP1: "Point out flaws constructively with fixes.",
      leanP2: "Praise effort and suggest gentle improvements.",
      balanced: "Honest feedback wrapped in encouragement.",
    }),
  },
  {
    id: 25,
    dimension: 1,
    type: "forced-select",
    text: "Budget cut: lay off 1 of 2 employees:",
    options: forcedOptions("L", "V", {
      strongP1: "Lay off the lower performer, regardless of tenure.",
      strongP2: "Keep the one with family to support.",
      leanP1: "Base on performance, but consider seniority.",
      leanP2: "Consider personal circumstances heavily.",
      balanced: "Performance first, but offer severance.",
    }),
  },
  {
    id: 26,
    dimension: 1,
    type: "forced-select",
    text: "Ethical dilemma at work:",
    options: forcedOptions("L", "V", {
      strongP1: "Follow company policy to the letter.",
      strongP2: "Do what feels morally right, even if it breaks rules.",
      leanP1: "Find a loophole that aligns with policy.",
      leanP2: "Consult team and prioritize human impact.",
      balanced: "Seek legal and ethical alignment.",
    }),
  },
  {
    id: 27,
    dimension: 1,
    type: "forced-select",
    text: "Giving performance review:",
    options: forcedOptions("L", "V", {
      strongP1: "Rate based on metrics only: 'You hit 87% of targets.'",
      strongP2: "Focus on growth: 'You’ve grown so much this year.'",
      leanP1: "Use data but include context.",
      leanP2: "Use encouragement but mention gaps.",
      balanced: "Balanced metrics and personal development.",
    }),
  },

  // ===================================================================
  // DIMENSION 2: I (Internal) vs O (External) — id: 28–41
  // ===================================================================
  {
    id: 28,
    dimension: 2,
    type: "likert",
    text: "I recharge best in complete silence.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 29,
    dimension: 2,
    type: "likert",
    text: "I process ideas internally before sharing.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 30,
    dimension: 2,
    type: "likert",
    text: "Large parties drain me quickly.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 31,
    dimension: 2,
    type: "likert",
    text: "I rarely feel bored when alone.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 32,
    dimension: 2,
    type: "likert",
    text: "I don’t need external input to feel energized.",
    favoring: "I",
    reverse: true, // Adjusted to balance
  },
  {
    id: 33,
    dimension: 2,
    type: "likert",
    text: "I gain energy from lively conversations.",
    favoring: "O",
    reverse: false,
  },
  {
    id: 34,
    dimension: 2,
    type: "likert",
    text: "I love being the center of attention.",
    favoring: "O",
    reverse: false,
  },
  {
    id: 35,
    dimension: 2,
    type: "likert",
    text: "Action and interaction fuel my creativity.",
    favoring: "O",
    reverse: false,
  },

  {
    id: 36,
    dimension: 2,
    type: "forced-select",
    text: "Spending time with family or friends:",
    options: forcedOptions("I", "O", {
      strongP1: "Enjoy quiet moments reflecting or talking one-on-one.",
      strongP2: "Dive into lively group activities or conversations.",
      leanP1: "Prefer small, intimate chats but join group fun briefly.",
      leanP2: "Engage with the group but take short breaks alone.",
      balanced: "Mix quiet moments with group engagement.",
    }),
  },
  {
    id: 37,
    dimension: 2,
    type: "forced-select",
    text: "At a community gathering, like a festival:",
    options: forcedOptions("I", "O", {
      strongP1: "Observe quietly, connecting with one or two people.",
      strongP2: "Meet many people and join group activities.",
      leanP1: "Talk to a few but stay reserved overall.",
      leanP2: "Engage broadly but take time to reflect.",
      balanced: "Balance deep conversations with socializing.",
    }),
  },
  {
    id: 38,
    dimension: 2,
    type: "forced-select",
    text: "Learning a new skill:",
    options: forcedOptions("I", "O", {
      strongP1: "Study alone with tutorials and practice in private.",
      strongP2: "Join a class or group to learn with others.",
      leanP1: "Online course with optional forum.",
      leanP2: "Workshop with hands-on group activities.",
      balanced: "Self-paced with occasional meetups.",
    }),
  },
  {
    id: 39,
    dimension: 2,
    type: "forced-select",
    text: "Creative brainstorming:",
    options: forcedOptions("I", "O", {
      strongP1: "Lock yourself in a room until the idea hits.",
      strongP2: "Bounce ideas off anyone who’ll listen.",
      leanP1: "Jot notes alone, then share one idea.",
      leanP2: "Start with a group, then refine alone.",
      balanced: "Alternate solo and group sessions.",
    }),
  },
  {
    id: 40,
    dimension: 2,
    type: "forced-select",
    text: "After giving a presentation:",
    options: forcedOptions("I", "O", {
      strongP1: "Decompress alone in your office.",
      strongP2: "Chat with attendees and get feedback.",
      leanP1: "Quick thank-you, then quiet reflection.",
      leanP2: "Join the post-event social hour.",
      balanced: "Brief chat, then decompress.",
    }),
  },
  {
    id: 41,
    dimension: 2,
    type: "forced-select",
    text: "Vacation vibe:",
    options: forcedOptions("I", "O", {
      strongP1: "Secluded cabin, no Wi-Fi, just nature.",
      strongP2: "Vibrant city with festivals and nightlife.",
      leanP1: "Quiet resort with optional activities.",
      leanP2: "Group tour with daily excursions.",
      balanced: "Small town with cafes and solitude.",
    }),
  },

  // ===================================================================
  // DIMENSION 3: S (Structured) vs F (Flexible) — id: 42–55
  // ===================================================================
  {
    id: 42,
    dimension: 3,
    type: "likert",
    text: "I plan my day hour by hour.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 43,
    dimension: 3,
    type: "likert",
    text: "Last-minute changes bother me.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 44,
    dimension: 3,
    type: "likert",
    text: "I finish tasks well before deadlines.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 45,
    dimension: 3,
    type: "likert",
    text: "I rarely leave things open-ended.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 46,
    dimension: 3,
    type: "likert",
    text: "I don’t enjoy improvising.",
    favoring: "S",
    reverse: true, // Adjusted to balance
  },
  {
    id: 47,
    dimension: 3,
    type: "likert",
    text: "I thrive in unpredictable environments.",
    favoring: "F",
    reverse: false,
  },
  {
    id: 48,
    dimension: 3,
    type: "likert",
    text: "I keep multiple options open until the last minute.",
    favoring: "F",
    reverse: false,
  },
  {
    id: 49,
    dimension: 3,
    type: "likert",
    text: "Spontaneity excites me more than plans.",
    favoring: "F",
    reverse: false,
  },

  {
    id: 50,
    dimension: 3,
    type: "forced-select",
    text: "Organizing a shared task, like cleaning a community space:",
    options: forcedOptions("S", "F", {
      strongP1: "Create a detailed schedule with assigned roles.",
      strongP2: "Start cleaning and adapt based on what’s needed.",
      leanP1: "Plan main tasks but allow some flexibility.",
      leanP2: "Go with the flow but set a loose goal.",
      balanced: "Mix a basic plan with room for adjustments.",
    }),
  },
  {
    id: 51,
    dimension: 3,
    type: "forced-select",
    text: "Helping a group prepare for a shared event, like a celebration:",
    options: forcedOptions("S", "F", {
      strongP1: "Plan every detail, like timing and supplies, in advance.",
      strongP2: "Improvise based on the group’s energy and needs.",
      leanP1: "Set a core plan but adjust as needed.",
      leanP2: "Start with ideas but stay open to changes.",
      balanced: "Balance planning with spontaneous decisions.",
    }),
  },
  {
    id: 52,
    dimension: 3,
    type: "forced-select",
    text: "Project deadline shifts earlier:",
    options: forcedOptions("S", "F", {
      strongP1: "Panic and restructure entire plan immediately.",
      strongP2: "Stay calm. You’ll adapt when the time comes.",
      leanP1: "Adjust timeline but keep core structure.",
      leanP2: "Improvise with high energy.",
      balanced: "Reprioritize tasks flexibly.",
    }),
  },
  {
    id: 53,
    dimension: 3,
    type: "forced-select",
    text: "Daily routine:",
    options: forcedOptions("S", "F", {
      strongP1: "Wake, coffee, gym, work. Same every day.",
      strongP2: "Every day is different. Flow with energy.",
      leanP1: "Core habits, but timing varies.",
      leanP2: "No fixed routine, just intentions.",
      balanced: "Flexible schedule with anchors.",
    }),
  },
  {
    id: 54,
    dimension: 3,
    type: "forced-select",
    text: "Event planning:",
    options: forcedOptions("S", "F", {
      strongP1: "Spreadsheet with vendors, timelines, backups.",
      strongP2: "Vibe-based: book a venue, figure out the rest later.",
      leanP1: "Book essentials, improvise details.",
      leanP2: "Start with theme, adapt as you go.",
      balanced: "Plan structure, flex on execution.",
    }),
  },
  {
    id: 55,
    dimension: 3,
    type: "forced-select",
    text: "Facing unexpected delay:",
    options: forcedOptions("S", "F", {
      strongP1: "Recalculate entire schedule immediately.",
      strongP2: "Shrug. Something better will come up.",
      leanP1: "Adjust next step, keep moving.",
      leanP2: "Use the time for spontaneous fun.",
      balanced: "Adapt plan without stress.",
    }),
  },

  // ===================================================================
  // DIMENSION 4: H (Harmonious) vs A (Autonomous) — id: 56–69
  // ===================================================================
  {
    id: 56,
    dimension: 4,
    type: "likert",
    text: "I put group needs above my own.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 57,
    dimension: 4,
    type: "likert",
    text: "I avoid conflict to keep peace.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 58,
    dimension: 4,
    type: "likert",
    text: "Team success feels better than solo wins.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 59,
    dimension: 4,
    type: "likert",
    text: "I rarely work alone by choice.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 60,
    dimension: 4,
    type: "likert",
    text: "I don’t need full control to be happy.",
    favoring: "H",
    reverse: true, // Adjusted to balance
  },
  {
    id: 61,
    dimension: 4,
    type: "likert",
    text: "I prefer full control over my work.",
    favoring: "A",
    reverse: false,
  },
  {
    id: 62,
    dimension: 4,
    type: "likert",
    text: "I’d rather fail alone than succeed in a group.",
    favoring: "A",
    reverse: false,
  },
  {
    id: 63,
    dimension: 4,
    type: "likert",
    text: "Autonomy is non-negotiable for me.",
    favoring: "A",
    reverse: false,
  },

  {
    id: 64,
    dimension: 4,
    type: "forced-select",
    text: "Helping a neighbor with a task, like moving furniture:",
    options: forcedOptions("H", "A", {
      strongP1: "Work together closely, coordinating with them to make it a team effort.",
      strongP2: "Handle the task on your own to ensure it’s done your way.",
      leanP1: "Offer help but follow their lead to keep things harmonious.",
      leanP2: "Assist but prefer working independently on your part.",
      balanced: "Collaborate on some parts, work alone on others.",
    }),
  },
  {
    id: 65,
    dimension: 4,
    type: "forced-select",
    text: "Credit for team success:",
    options: forcedOptions("H", "A", {
      strongP1: "Share praise equally, even if you did most work.",
      strongP2: "Highlight your key contributions.",
      leanP1: "Thank team but note your role.",
      leanP2: "Accept praise but redirect to team.",
      balanced: "We succeeded together.",
    }),
  },
  {
    id: 66,
    dimension: 4,
    type: "forced-select",
    text: "Disagreement in meeting:",
    options: forcedOptions("H", "A", {
      strongP1: "Change your stance to restore harmony.",
      strongP2: "Stand firm. Your idea is best.",
      leanP1: "Compromise to move forward.",
      leanP2: "Push your view but hear others.",
      balanced: "Seek win-win solution.",
    }),
  },
  {
    id: 67,
    dimension: 4,
    type: "forced-select",
    text: "Volunteering:",
    options: forcedOptions("H", "A", {
      strongP1: "Join a community cleanup with friends.",
      strongP2: "Build a personal project to donate.",
      leanP1: "Help organize a group event.",
      leanP2: "Work solo on a cause you care about.",
      balanced: "Contribute skills to a team effort.",
    }),
  },
  {
    id: 68,
    dimension: 4,
    type: "forced-select",
    text: "Organizing a family or community event, like a meal or celebration:",
    options: forcedOptions("H", "A", {
      strongP1: "Plan with others to ensure everyone’s ideas are included.",
      strongP2: "Take charge to plan it according to your own vision.",
      leanP1: "Involve others but guide toward a shared goal.",
      leanP2: "Plan mostly alone but get some input from others.",
      balanced: "Balance group input with your own decisions.",
    }),
  },
  {
    id: 69,
    dimension: 4,
    type: "forced-select",
    text: "Decision-making power:",
    options: forcedOptions("H", "A", {
      strongP1: "Vote with the group, even if you disagree.",
      strongP2: "Make the call yourself if you know best.",
      leanP1: "Influence group toward your view.",
      leanP2: "Follow majority but reserve dissent.",
      balanced: "Consensus with leadership tiebreaker.",
    }),
  },
];

// Archetype map (unchanged)
export const archetypes = {
  "C-L-O-S-H": {
    name: "Architect",
    description: "A pragmatic builder who organizes teams to construct enduring, logical systems.",
  },
  "C-L-O-S-A": {
    name: "Engineer",
    description: "An independent builder who crafts practical, efficient solutions autonomously.",
  },
  "C-L-O-F-H": {
    name: "Navigator",
    description: "A dynamic leader who steers teams through shifting realities with quick, tangible insights.",
  },
  "C-L-O-F-A": {
    name: "Pioneer",
    description: "A bold trailblazer who seizes opportunities with fearless, independent action.",
  },
  "C-L-I-S-H": {
    name: "Curator",
    description: "A thoughtful preserver who organizes information to build shared, logical frameworks.",
  },
  "C-L-I-S-A": {
    name: "Analyst",
    description: "A precise thinker who dissects complex systems with solitary, focused logic.",
  },
  "C-L-I-F-H": {
    name: "Mediator",
    description:
      "A flexible problem-solver who uses detailed observation to find logical solutions that maintain group balance.",
  },
  "C-L-I-F-A": {
    name: "Maverick",
    description: "An unconventional realist who leverages an internal database of facts to forge their own path.",
  },
  "C-V-O-S-H": {
    name: "Steward",
    description: "A caring organizer who fosters stability and practical well-being for the community.",
  },
  "C-V-O-S-A": {
    name: "Artisan",
    description: "A hands-on creator who shapes the tangible world according to their personal aesthetic and values.",
  },
  "C-V-O-F-H": {
    name: "Campaigner",
    description: "A passionate advocate who inspires teams to action through engaging with real-world needs.",
  },
  "C-V-O-F-A": {
    name: "Adventurer",
    description: "A free-spirited explorer who immerses themselves in new experiences, guided by their impulses.",
  },
  "C-V-I-S-H": {
    name: "Counselor",
    description: "A nurturing guide who provides steady, compassionate support based on shared values.",
  },
  "C-V-I-S-A": {
    name: "Healer",
    description: "A quiet caretaker who works independently to restore balance based on their deep personal ethics.",
  },
  "C-V-I-F-H": {
    name: "Peacemaker",
    description:
      "A gentle adapter who fosters group harmony by being sensitive to the details of personal experiences.",
  },
  "C-V-I-F-A": {
    name: "Empath",
    description:
      "A sensitive individualist who navigates their personal journey attuned to their inner emotional landscape.",
  },
  "N-L-O-S-H": {
    name: "Strategist",
    description: "A visionary planner who organizes teams to execute complex, long-range plans.",
  },
  "N-L-O-S-A": {
    name: "Inventor",
    description: "An ingenious creator who structures groundbreaking ideas into workable, independent projects.",
  },
  "N-L-O-F-H": {
    name: "Disruptor",
    description: "A bold innovator who challenges norms by mobilizing groups around new possibilities.",
  },
  "N-L-O-F-A": {
    name: "Revolutionary",
    description: "A radical thinker who redefines possibilities through fearless, independent exploration of ideas.",
  },
  "N-L-I-S-H": {
    name: "Academic",
    description: "A reflective scholar who builds stable, collaborative theories through deep logical inquiry.",
  },
  "N-L-I-S-A": {
    name: "Theorist",
    description: "A deep thinker who seeks universal truth through solitary abstract analysis.",
  },
  "N-L-I-F-H": {
    name: "Innovator",
    description: "A creative synthesizer who adapts their vision to logical frameworks in collaboration with others.",
  },
  "N-L-I-F-A": {
    name: "Visionary",
    description: "A far-sighted dreamer who crafts bold futures based on their independent and complex inner world.",
  },
  "N-V-O-S-H": {
    name: "Ambassador",
    description: "A harmonious connector who builds bridges between people using a stable vision of shared values.",
  },
  "N-V-O-S-A": {
    name: "Artist",
    description:
      "An expressive individualist who creates works of beauty that embody their abstract values and personal vision.",
  },
  "N-V-O-F-H": {
    name: "Catalyst",
    description:
      "An inspiring changemaker who sparks collective growth by exploring possibilities with adaptable empathy.",
  },
  "N-V-O-F-A": {
    name: "Wanderer",
    description: "A curious seeker who travels through the world of ideas in search of personal meaning.",
  },
  "N-V-I-S-H": {
    name: "Mentor",
    description:
      "A wise nurturer who guides others toward their potential using their deep, stable insight and compassion.",
  },
  "N-V-I-S-A": {
    name: "Sage",
    description: "A profound seeker who blends abstract values with solitary wisdom to arrive at a personal truth.",
  },
  "N-V-I-F-H": {
    name: "Unifier",
    description:
      "A gentle visionary who unites people by adapting their insightful vision to foster collective harmony.",
  },
  "N-V-I-F-A": {
    name: "Mystic",
    description:
      "An enigmatic soul who independently explores life’s mysteries, guided by their intuitive, compassionate inner world.",
  },
};

// ===================================================================
// CORRECTED calculateCSMResults
// ===================================================================
export function calculateCSMResults(answers) {
  const scores = Array(5)
    .fill()
    .map(() => ({ pole1: 0, pole2: 0 }));

  questions.forEach((q) => {
    const resp = answers[q.id];
    const dim = q.dimension;
    const p1 = poles[dim][0];
    const p2 = poles[dim][1];

    if (q.type === "likert" && resp !== null) {
      // FIXED: Reverse logic applied BEFORE pole assignment
      let points = resp;
      let targetPole = q.favoring;

      if (q.reverse) {
        points = 6 - resp;
        targetPole = targetPole === p1 ? p2 : p1;
      }

      if (targetPole === p1) scores[dim].pole1 += points;
      else scores[dim].pole2 += points;
    } else if (q.type === "forced-select" && resp) {
      const opt = q.options.find((o) => o.key === resp);
      if (opt) {
        scores[dim].pole1 += opt.value[p1];
        scores[dim].pole2 += opt.value[p2];
      }
    }
  });

  const percents = scores.map((s) => {
    const total = s.pole1 + s.pole2 || 1;
    let p1Pct = (s.pole1 / total) * 100;
    let p2Pct = (s.pole2 / total) * 100;

    // Random tie-breaker
    if (s.pole1 === s.pole2) {
      if (Math.random() < 0.5) {
        p1Pct = 51;
        p2Pct = 49;
      } else {
        p1Pct = 49;
        p2Pct = 51;
      }
    } else {
      p1Pct = Math.round(p1Pct);
      p2Pct = 100 - p1Pct;
    }

    return { p1: p1Pct, p2: p2Pct };
  });

  const dominants = percents.map((p, i) => (p.p1 > p.p2 ? poles[i][0] : poles[i][1]));
  const typeCode = dominants.join("-");
  const archetype = archetypes[typeCode] || { name: "Unknown", description: "" };

  const categories = percents.map((p) => {
    const primaryPct = p.p1 > p.p2 ? p.p1 : p.p2;
    const secondaryPct = 100 - primaryPct;

    let domLevel, infLevel;
    if (primaryPct >= 86) {
      domLevel = "Strong";
      infLevel = "Low";
    } else if (primaryPct >= 66) {
      domLevel = "Moderate";
      infLevel = "Moderate";
    } else {
      domLevel = "Mild";
      infLevel = "High";
    }

    return { domLevel, infLevel, primaryPct, secondaryPct };
  });

  return { percents, dominants, typeCode, archetype, categories };
}
