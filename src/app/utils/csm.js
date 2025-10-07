// Dimensions: 0: C/N, 1: L/V, 2: I/O, 3: S/F, 4: H/A
// Poles: [ ['C', 'N'], ['L', 'V'], ['I', 'O'], ['S', 'F'], ['H', 'A'] ]
export const poles = [
  ["C", "N"],
  ["L", "V"],
  ["I", "O"],
  ["S", "F"],
  ["H", "A"],
];

// Helper to get primary/secondary poles and percentages for a dimension
export function getDimPoles(dimIndex, dominants, percents) {
  const primaryPole = dominants[dimIndex];
  const p1Pct = Math.round(percents[dimIndex].p1);
  const primaryPct = primaryPole === poles[dimIndex][0] ? p1Pct : 100 - p1Pct;
  const secPct = 100 - primaryPct;
  const secPole = primaryPole === poles[dimIndex][0] ? poles[dimIndex][1] : poles[dimIndex][0];
  return { primaryPole, primaryPct, secPole, secPct };
}

export const questions = [
  // Dimension 0: C/N
  {
    id: 0,
    dimension: 0,
    type: "likert",
    text: "In my job or studies, I focus on facts I can check and practical details rather than big ideas or theories.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 1,
    dimension: 0,
    type: "likert",
    text: 'During hobbies like reading or gaming, I get excited by exploring "what if" scenarios and hidden meanings.',
    favoring: "N",
    reverse: false,
  },
  {
    id: 2,
    dimension: 0,
    type: "likert",
    text: "When making everyday purchases, I rely on real-world reviews and specs more than imagining how I might use it later.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 3,
    dimension: 0,
    type: "likert",
    text: "I prefer focusing on the present over daydreaming about future possibilities.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 4,
    dimension: 0,
    type: "forced-select",
    text: "In a family discussion about vacation plans, what captures your interest first?",
    options: [
      { key: "a", label: "Specific details like costs and locations available now.", value: { C: 5, N: 1 } },
      { key: "b", label: "Potential adventures and unique experiences that could unfold.", value: { C: 1, N: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { C: 4, N: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { C: 2, N: 4 } },
      { key: "e", label: "Equally balanced between both.", value: { C: 3, N: 3 } },
    ],
  },
  {
    id: 5,
    dimension: 0,
    type: "likert",
    text: 'In relationships, I prefer discussing concrete events from the day over philosophical "what could be" talks.',
    favoring: "C",
    reverse: false,
  },
  {
    id: 6,
    dimension: 0,
    type: "likert",
    text: "I enjoy puzzles or activities that involve connecting different ideas into fresh patterns.",
    favoring: "N",
    reverse: false,
  },
  {
    id: 7,
    dimension: 0,
    type: "likert",
    text: "Straightforward facts help me understand the world more than abstract theories or metaphors.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 8,
    dimension: 0,
    type: "likert",
    text: "When learning a new skill, like cooking, I stick to proven recipes rather than experimenting with new combinations.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 9,
    dimension: 0,
    type: "forced-select",
    text: "When exploring a new topic, like history or science, what draws you in most?",
    options: [
      { key: "a", label: "Gathering clear data and evidence.", value: { C: 5, N: 1 } },
      { key: "b", label: "Imagining trends and deeper implications.", value: { C: 1, N: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { C: 4, N: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { C: 2, N: 4 } },
      { key: "e", label: "Equally balanced.", value: { C: 3, N: 3 } },
    ],
  },
  {
    id: 10,
    dimension: 0,
    type: "likert",
    text: "When planning my day, I prioritize immediate tasks over thinking about future possibilities.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 11,
    dimension: 0,
    type: "likert",
    text: "I prefer working with clear facts over combining ideas from different sources for new insights.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 12,
    dimension: 0,
    type: "forced-select",
    text: "Choosing a new hobby, like art or sports, which approach feels right?",
    options: [
      { key: "a", label: "Based on practical tools and immediate steps.", value: { C: 5, N: 1 } },
      { key: "b", label: "Inspired by creative potentials and ideas.", value: { C: 1, N: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { C: 4, N: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { C: 2, N: 4 } },
      { key: "e", label: "Equally balanced.", value: { C: 3, N: 3 } },
    ],
  },
  {
    id: 13,
    dimension: 0,
    type: "likert",
    text: "In social situations, I trust what I see and hear over gut feelings or hunches.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 14,
    dimension: 0,
    type: "forced-select",
    text: "Which best matches how you see the world?",
    options: [
      { key: "a", label: "Focused on the here and now.", value: { C: 5, N: 1 } },
      { key: "b", label: "Drawn to possibilities and connections.", value: { C: 1, N: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { C: 4, N: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { C: 2, N: 4 } },
      { key: "e", label: "Perfectly balanced.", value: { C: 3, N: 3 } },
    ],
  },
  // Dimension 1: L/V
  {
    id: 15,
    dimension: 1,
    type: "likert",
    text: "In work decisions, I prioritize logical efficiency over emotional effects on colleagues.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 16,
    dimension: 1,
    type: "likert",
    text: "When facing ethical dilemmas, I focus on aligning choices with my values and others' well-being.",
    favoring: "V",
    reverse: false,
  },
  {
    id: 17,
    dimension: 1,
    type: "likert",
    text: "I base decisions on logical cause-and-effect rather than personal feelings.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 18,
    dimension: 1,
    type: "likert",
    text: "I prioritize factual analysis over emotions and relationships in my choices.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 19,
    dimension: 1,
    type: "forced-select",
    text: "Resolving a disagreement with a friend, what guides you?",
    options: [
      { key: "a", label: "Objective facts and fair principles.", value: { L: 5, V: 1 } },
      { key: "b", label: "Empathy for feelings and harmony.", value: { L: 1, V: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { L: 4, V: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { L: 2, V: 4 } },
      { key: "e", label: "Equally balanced.", value: { L: 3, V: 3 } },
    ],
  },
  {
    id: 20,
    dimension: 1,
    type: "likert",
    text: "In group projects, I aim for consistent outcomes more than boosting team morale.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 21,
    dimension: 1,
    type: "likert",
    text: "Decisions that build positive human connections feel more rewarding than purely logical ones.",
    favoring: "V",
    reverse: false,
  },
  {
    id: 22,
    dimension: 1,
    type: "likert",
    text: "I prioritize logical outcomes over letting personal values take over.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 23,
    dimension: 1,
    type: "likert",
    text: "When budgeting money, I focus on calculations over considering family impacts.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 24,
    dimension: 1,
    type: "forced-select",
    text: "When making tough decisions, what matters most to you?",
    options: [
      { key: "a", label: "Logical reasoning and effective results.", value: { L: 5, V: 1 } },
      { key: "b", label: "Values and impact on people.", value: { L: 1, V: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { L: 4, V: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { L: 2, V: 4 } },
      { key: "e", label: "Equally balanced.", value: { L: 3, V: 3 } },
    ],
  },
  {
    id: 25,
    dimension: 1,
    type: "likert",
    text: "In difficult choices, fairness through logic feels more important than empathy.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 26,
    dimension: 1,
    type: "likert",
    text: "I value objective evaluation over deeply considering others' perspectives.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 27,
    dimension: 1,
    type: "forced-select",
    text: "Selecting a community volunteer role, which factor weighs more?",
    options: [
      { key: "a", label: "Practical results and strategy.", value: { L: 5, V: 1 } },
      { key: "b", label: "Building relationships and support.", value: { L: 1, V: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { L: 4, V: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { L: 2, V: 4 } },
      { key: "e", label: "Equally balanced.", value: { L: 3, V: 3 } },
    ],
  },
  {
    id: 28,
    dimension: 1,
    type: "likert",
    text: "I prefer solutions grounded in evidence over those driven by compassion.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 29,
    dimension: 1,
    type: "forced-select",
    text: "Which best describes your decision-making style?",
    options: [
      { key: "a", label: "Logical and objective.", value: { L: 5, V: 1 } },
      { key: "b", label: "Empathetic and value-driven.", value: { L: 1, V: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { L: 4, V: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { L: 2, V: 4 } },
      { key: "e", label: "Perfectly balanced.", value: { L: 3, V: 3 } },
    ],
  },
  // Dimension 2: I/O
  {
    id: 30,
    dimension: 2,
    type: "likert",
    text: "I feel recharged by solitary reflection and inner thoughts during downtime.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 31,
    dimension: 2,
    type: "likert",
    text: "Engaging with others or the environment excites me more than alone time.",
    favoring: "O",
    reverse: false,
  },
  {
    id: 32,
    dimension: 2,
    type: "likert",
    text: "In work settings, I think through ideas internally before sharing them.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 33,
    dimension: 2,
    type: "likert",
    text: "I feel more excited by quiet contemplation than by social interactions.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 34,
    dimension: 2,
    type: "forced-select",
    text: "After a challenging task, how do you recharge?",
    options: [
      { key: "a", label: "Alone, thinking or relaxing inwardly.", value: { I: 5, O: 1 } },
      { key: "b", label: "Out with friends or in active pursuits.", value: { I: 1, O: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { I: 4, O: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { I: 2, O: 4 } },
      { key: "e", label: "Equally balanced.", value: { I: 3, O: 3 } },
    ],
  },
  {
    id: 35,
    dimension: 2,
    type: "likert",
    text: "Deep personal reflection energizes me more than external events.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 36,
    dimension: 2,
    type: "likert",
    text: "I thrive on social interactions and real-world experiences for motivation.",
    favoring: "O",
    reverse: false,
  },
  {
    id: 37,
    dimension: 2,
    type: "likert",
    text: "I prefer reflecting before acting rather than jumping into action quickly.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 38,
    dimension: 2,
    type: "likert",
    text: "In self-care routines, I choose quiet activities like journaling over social outings.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 39,
    dimension: 2,
    type: "forced-select",
    text: "What’s your preferred way to spend a free evening?",
    options: [
      { key: "a", label: "Quietly reflecting or relaxing alone.", value: { I: 5, O: 1 } },
      { key: "b", label: "Engaging with others or exploring new activities.", value: { I: 1, O: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { I: 4, O: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { I: 2, O: 4 } },
      { key: "e", label: "Equally balanced.", value: { I: 3, O: 3 } },
    ],
  },
  {
    id: 40,
    dimension: 2,
    type: "likert",
    text: "I focus more on my inner thoughts than on what’s happening around me.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 41,
    dimension: 2,
    type: "likert",
    text: "Being out and about excites me more than prolonged alone time.",
    favoring: "O",
    reverse: false,
  },
  {
    id: 42,
    dimension: 2,
    type: "forced-select",
    text: "At a cultural event, like a festival, what feels most comfortable?",
    options: [
      { key: "a", label: "Observing quietly and reflecting.", value: { I: 5, O: 1 } },
      { key: "b", label: "Participating and interacting actively.", value: { I: 1, O: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { I: 4, O: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { I: 2, O: 4 } },
      { key: "e", label: "Equally balanced.", value: { I: 3, O: 3 } },
    ],
  },
  {
    id: 43,
    dimension: 2,
    type: "likert",
    text: "I need solitude after busy periods to feel recharged.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 44,
    dimension: 2,
    type: "forced-select",
    text: "Which best fits your energy style?",
    options: [
      { key: "a", label: "Inward, thoughtful, and reserved.", value: { I: 5, O: 1 } },
      { key: "b", label: "Outward, interactive, and dynamic.", value: { I: 1, O: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { I: 4, O: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { I: 2, O: 4 } },
      { key: "e", label: "Perfectly balanced.", value: { I: 3, O: 3 } },
    ],
  },
  // Dimension 3: S/F
  {
    id: 45,
    dimension: 3,
    type: "likert",
    text: "I like detailed plans and routines for daily tasks to ensure things are predictable.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 46,
    dimension: 3,
    type: "likert",
    text: "Adapting on the fly to new opportunities excites me more than sticking to schedules.",
    favoring: "F",
    reverse: false,
  },
  {
    id: 47,
    dimension: 3,
    type: "likert",
    text: "In hobbies, I prefer organized steps over making impromptu changes.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 48,
    dimension: 3,
    type: "likert",
    text: "I prefer keeping things open-ended over rigid structures and final decisions.",
    favoring: "F",
    reverse: false,
  },
  {
    id: 49,
    dimension: 3,
    type: "forced-select",
    text: "Organizing a home event, like a dinner, what’s your style?",
    options: [
      { key: "a", label: "Detailed agenda and preparations.", value: { S: 5, F: 1 } },
      { key: "b", label: "Loose ideas, adjusting as guests arrive.", value: { S: 1, F: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { S: 4, F: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { S: 2, F: 4 } },
      { key: "e", label: "Equally balanced.", value: { S: 3, F: 3 } },
    ],
  },
  {
    id: 50,
    dimension: 3,
    type: "likert",
    text: "Planning for stability helps me handle life’s uncertainties.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 51,
    dimension: 3,
    type: "likert",
    text: "Flexibility allows me to embrace surprises in relationships.",
    favoring: "F",
    reverse: false,
  },
  {
    id: 52,
    dimension: 3,
    type: "likert",
    text: "I prefer having everything planned out over spontaneous, open options.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 53,
    dimension: 3,
    type: "likert",
    text: "At work, I aim for quick decisions to wrap things up.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 54,
    dimension: 3,
    type: "forced-select",
    text: "When facing unexpected changes, what feels most natural?",
    options: [
      { key: "a", label: "Sticking to a structured plan.", value: { S: 5, F: 1 } },
      { key: "b", label: "Adapting flexibly to new possibilities.", value: { S: 1, F: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { S: 4, F: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { S: 2, F: 4 } },
      { key: "e", label: "Equally balanced.", value: { S: 3, F: 3 } },
    ],
  },
  {
    id: 55,
    dimension: 3,
    type: "likert",
    text: "I organize my environment to avoid unexpected changes.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 56,
    dimension: 3,
    type: "likert",
    text: "The thrill of improvisation feels more exciting than fixed plans.",
    favoring: "F",
    reverse: false,
  },
  {
    id: 57,
    dimension: 3,
    type: "forced-select",
    text: "On a road trip, which feels natural?",
    options: [
      { key: "a", label: "Pre-booked routes and stops.", value: { S: 5, F: 1 } },
      { key: "b", label: "Detours based on discoveries.", value: { S: 1, F: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { S: 4, F: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { S: 2, F: 4 } },
      { key: "e", label: "Equally balanced.", value: { S: 3, F: 3 } },
    ],
  },
  {
    id: 58,
    dimension: 3,
    type: "likert",
    text: "Completing tasks with a clear plan feels more rewarding than open-ended exploration.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 59,
    dimension: 3,
    type: "forced-select",
    text: "Which best describes your approach to change?",
    options: [
      { key: "a", label: "Planned and orderly.", value: { S: 5, F: 1 } },
      { key: "b", label: "Spontaneous and adaptable.", value: { S: 1, F: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { S: 4, F: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { S: 2, F: 4 } },
      { key: "e", label: "Perfectly balanced.", value: { S: 3, F: 3 } },
    ],
  },
  // Dimension 4: H/A
  {
    id: 60,
    dimension: 4,
    type: "likert",
    text: "In team activities, like sports, I prioritize group harmony and shared goals.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 61,
    dimension: 4,
    type: "likert",
    text: "Pursuing individual projects where I control the direction excites me most.",
    favoring: "A",
    reverse: false,
  },
  {
    id: 62,
    dimension: 4,
    type: "likert",
    text: "In family settings, I focus on building agreement for everyone’s well-being.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 63,
    dimension: 4,
    type: "likert",
    text: "I find personal achievements more rewarding than contributing to group successes.",
    favoring: "A",
    reverse: false,
  },
  {
    id: 64,
    dimension: 4,
    type: "forced-select",
    text: "In a community volunteer group, what’s your impulse?",
    options: [
      { key: "a", label: "Collaborating for team cohesion.", value: { H: 5, A: 1 } },
      { key: "b", label: "Handling tasks independently.", value: { H: 1, A: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { H: 4, A: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { H: 2, A: 4 } },
      { key: "e", label: "Equally balanced.", value: { H: 3, A: 3 } },
    ],
  },
  {
    id: 65,
    dimension: 4,
    type: "likert",
    text: "Working together for shared goals drives my career choices.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 66,
    dimension: 4,
    type: "likert",
    text: "Maintaining personal freedom matters more than team responsibilities.",
    favoring: "A",
    reverse: false,
  },
  {
    id: 67,
    dimension: 4,
    type: "likert",
    text: "Contributing to a team feels more rewarding than pursuing individual goals.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 68,
    dimension: 4,
    type: "likert",
    text: "In social circles, I focus on group dynamics and teamwork.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 69,
    dimension: 4,
    type: "forced-select",
    text: "When working with others, what motivates you most?",
    options: [
      { key: "a", label: "Building team unity and collaboration.", value: { H: 5, A: 1 } },
      { key: "b", label: "Pursuing your own goals independently.", value: { H: 1, A: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { H: 4, A: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { H: 2, A: 4 } },
      { key: "e", label: "Equally balanced.", value: { H: 3, A: 3 } },
    ],
  },
  {
    id: 70,
    dimension: 4,
    type: "likert",
    text: "Shared successes feel more rewarding than solo victories.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 71,
    dimension: 4,
    type: "likert",
    text: "I prefer solitary pursuits over team-oriented environments.",
    favoring: "A",
    reverse: false,
  },
  {
    id: 72,
    dimension: 4,
    type: "forced-select",
    text: "In a work meeting, how do you contribute?",
    options: [
      { key: "a", label: "Mediating for group agreement.", value: { H: 5, A: 1 } },
      { key: "b", label: "Advocating your own ideas.", value: { H: 1, A: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { H: 4, A: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { H: 2, A: 4 } },
      { key: "e", label: "Equally balanced.", value: { H: 3, A: 3 } },
    ],
  },
  {
    id: 73,
    dimension: 4,
    type: "likert",
    text: "I thrive on working toward collective goals over personal priorities.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 74,
    dimension: 4,
    type: "forced-select",
    text: "Which best fits your interpersonal style?",
    options: [
      { key: "a", label: "Collaborative and group-focused.", value: { H: 5, A: 1 } },
      { key: "b", label: "Independent and self-reliant.", value: { H: 1, A: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { H: 4, A: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { H: 2, A: 4 } },
      { key: "e", label: "Perfectly balanced.", value: { H: 3, A: 3 } },
    ],
  },
];

// Archetype map (from CSM framework)
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

export function calculateCSMResults(answers) {
  const scores = Array(5)
    .fill(0)
    .map(() => ({ pole1: 0, pole2: 0 }));
  questions.forEach((q) => {
    const resp = answers[q.id];
    const dim = q.dimension;
    const p1 = poles[dim][0];
    const p2 = poles[dim][1];
    if (q.type === "likert") {
      let points = q.reverse ? 6 - resp : resp;
      if (q.favoring === p1) scores[dim].pole1 += points;
      else scores[dim].pole2 += points;
    } else if (q.type === "forced-select") {
      const opt = q.options.find((o) => o.key === resp);
      if (opt) {
        scores[dim].pole1 += opt.value[p1];
        scores[dim].pole2 += opt.value[p2];
      }
    } else if (q.type === "rank") {
      // resp: {a: pointsA, b: pointsB, c: pointsBalanced} (0-10 each, sum=10)
      const rankPoints = resp;
      Object.entries(rankPoints).forEach(([key, pts]) => {
        const opt = q.options.find((o) => o.key === key);
        if (opt.pole === p1) scores[dim].pole1 += pts;
        else if (opt.pole === p2) scores[dim].pole2 += pts;
        else if (opt.pole === "balanced") {
          scores[dim].pole1 += pts / 2;
          scores[dim].pole2 += pts / 2;
        }
      });
    }
  });

  const percents = scores.map((s) => {
    const total = s.pole1 + s.pole2 || 1; // Avoid div0
    let p1Pct = (s.pole1 / total) * 100;
    let p2Pct = (s.pole2 / total) * 100;

    // Prevent exact 50/50: Tip to 51/49 favoring p1 if tied
    const epsilon = 0.0001;
    if (Math.abs(p1Pct - p2Pct) < epsilon) {
      p1Pct = 51;
      p2Pct = 49;
    }

    // Round to whole numbers, ensuring sum=100
    p1Pct = Math.round(p1Pct);
    p2Pct = 100 - p1Pct; // Force sum to 100

    return { p1: p1Pct, p2: p2Pct };
  });

  const dominants = percents.map((p, i) => (p.p1 > p.p2 ? poles[i][0] : poles[i][1]));
  const typeCode = dominants.join("-");
  const archetype = archetypes[typeCode]; // No fallback needed

  // Categorize strengths (Mild/Moderate/Strong for primary, High/Moderate/Low for secondary)
  const categories = percents.map((p, i) => {
    const primary = p.p1 > p.p2 ? "p1" : "p2";
    const primPct = primary === "p1" ? p.p1 : p.p2;
    let domLevel = "Mild";
    if (primPct > 85) domLevel = "Strong";
    else if (primPct > 65) domLevel = "Moderate";
    const secPct = 100 - primPct;
    let infLevel = "High";
    if (secPct < 15) infLevel = "Low";
    else if (secPct < 35) infLevel = "Moderate";
    return { domLevel, infLevel };
  });

  return { percents, dominants, typeCode, archetype, categories };
}
