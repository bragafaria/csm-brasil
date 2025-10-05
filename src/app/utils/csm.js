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
    text: "In my job or studies, I focus on verifiable facts and practical details rather than theoretical ideas.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 1,
    dimension: 0,
    type: "likert",
    text: 'During hobbies like reading or gaming, I get energized by exploring "what if" scenarios and hidden meanings.',
    favoring: "N",
    reverse: false,
  },
  {
    id: 2,
    dimension: 0,
    type: "likert",
    text: "When making everyday purchases, I rely on real-world reviews and specs more than imagining future uses.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 3,
    dimension: 0,
    type: "likert",
    text: "I rarely get caught up in daydreams about abstract concepts or future possibilities.",
    favoring: "N",
    reverse: true,
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
    text: "I enjoy puzzles or activities that involve connecting disparate ideas into innovative patterns.",
    favoring: "N",
    reverse: false,
  },
  {
    id: 7,
    dimension: 0,
    type: "likert",
    text: "Abstract theories and metaphors do not help me make sense of the world as much as straightforward facts do.",
    favoring: "N",
    reverse: true,
  },
  {
    id: 8,
    dimension: 0,
    type: "likert",
    text: "When learning a new skill, like cooking, I stick to proven recipes rather than experimenting with untested combinations.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 9,
    dimension: 0,
    type: "rank",
    text: "Rank these in order of preference when researching a topic (1 = most preferred, 3 = least):",
    options: [
      { key: "a", label: "Collecting observable data and evidence.", pole: "C" },
      { key: "b", label: "Analyzing trends and theoretical implications.", pole: "N" },
      { key: "c", label: "Treating both equally.", pole: "balanced" },
    ],
  },
  {
    id: 10,
    dimension: 0,
    type: "likert",
    text: "In daily routines, I prioritize what's happening right now over speculating about long-term trends.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 11,
    dimension: 0,
    type: "likert",
    text: "I don't often synthesize information from various sources to create new insights.",
    favoring: "N",
    reverse: true,
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
    text: "I trust my direct senses more than intuitive hunches in social situations.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 14,
    dimension: 0,
    type: "forced-select",
    text: "Which best matches your overall perception style?",
    options: [
      { key: "a", label: "Anchored in the tangible and present.", value: { C: 5, N: 1 } },
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
    text: "In work decisions, I emphasize logical efficiency over emotional effects on colleagues.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 16,
    dimension: 1,
    type: "likert",
    text: "When facing ethical dilemmas in life, I consider how choices align with personal values and affect others' well-being.",
    favoring: "V",
    reverse: false,
  },
  {
    id: 17,
    dimension: 1,
    type: "likert",
    text: "I base judgments on cause-and-effect principles rather than subjective feelings.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 18,
    dimension: 1,
    type: "likert",
    text: "People's emotions and relationships rarely take priority over factual analysis in my choices.",
    favoring: "V",
    reverse: true,
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
    text: "In group projects, I seek systemic consistency more than boosting team morale.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 21,
    dimension: 1,
    type: "likert",
    text: "Decisions that foster positive human connections feel more satisfying than purely rational ones.",
    favoring: "V",
    reverse: false,
  },
  {
    id: 22,
    dimension: 1,
    type: "likert",
    text: "I don't often let personal ethics override logical outcomes.",
    favoring: "V",
    reverse: true,
  },
  {
    id: 23,
    dimension: 1,
    type: "likert",
    text: "When budgeting money, I use impersonal calculations over considering family impacts.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 24,
    dimension: 1,
    type: "rank",
    text: "Rank these in order of priority for judgments (1 = most, 3 = least):",
    options: [
      { key: "a", label: "Analytical truth and effectiveness.", pole: "L" },
      { key: "b", label: "Values-driven impact on people.", pole: "V" },
      { key: "c", label: "Equal emphasis on both.", pole: "balanced" },
    ],
  },
  {
    id: 25,
    dimension: 1,
    type: "likert",
    text: "Fairness through logic trumps empathy in tough choices.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 26,
    dimension: 1,
    type: "likert",
    text: "Understanding others' perspectives isn't as crucial as objective evaluation.",
    favoring: "V",
    reverse: true,
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
    text: "I prefer solutions based on evidence over those centered on compassion.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 29,
    dimension: 1,
    type: "forced-select",
    text: "Which describes your decision style best?",
    options: [
      { key: "a", label: "Logic-oriented and impersonal.", value: { L: 5, V: 1 } },
      { key: "b", label: "Value-oriented and empathetic.", value: { L: 1, V: 5 } },
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
    text: "I gain energy from solitary reflection and inner thoughts during downtime.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 31,
    dimension: 2,
    type: "likert",
    text: "Engaging with others or the environment revives me more than alone time.",
    favoring: "O",
    reverse: false,
  },
  {
    id: 32,
    dimension: 2,
    type: "likert",
    text: "In work settings, I process ideas internally before contributing.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 33,
    dimension: 2,
    type: "likert",
    text: "Social interactions and activities don't energize me as much as quiet contemplation.",
    favoring: "O",
    reverse: true,
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
    text: "Deep personal contemplation stimulates me more than external events.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 36,
    dimension: 2,
    type: "likert",
    text: "I thrive on interactions and real-world experiences for motivation.",
    favoring: "O",
    reverse: false,
  },
  {
    id: 37,
    dimension: 2,
    type: "likert",
    text: "Jumping into action without much prior thought isn't my preferred way.",
    favoring: "O",
    reverse: true,
  },
  {
    id: 38,
    dimension: 2,
    type: "likert",
    text: "In self-care routines, I prefer quiet activities like journaling over outings.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 39,
    dimension: 2,
    type: "rank",
    text: "Rank these for energy sources (1 = most, 3 = least):",
    options: [
      { key: "a", label: "Internal processing and solitude.", pole: "I" },
      { key: "b", label: "External engagement and action.", pole: "O" },
      { key: "c", label: "Equal balance.", pole: "balanced" },
    ],
  },
  {
    id: 40,
    dimension: 2,
    type: "likert",
    text: "My focus is more on my inner world than on surrounding stimuli.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 41,
    dimension: 2,
    type: "likert",
    text: "Prolonged alone time doesn't recharge me like being out and about does.",
    favoring: "I",
    reverse: true,
  },
  {
    id: 42,
    dimension: 2,
    type: "forced-select",
    text: "At a cultural event, like a festival, what's comfortable?",
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
    text: "I need solitude after busy periods to restore energy.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 44,
    dimension: 2,
    type: "forced-select",
    text: "Which fits your energy style?",
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
    text: "I like detailed plans and routines for daily tasks to ensure predictability.",
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
    text: "In hobbies, I prefer organized steps over impromptu changes.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 48,
    dimension: 3,
    type: "likert",
    text: "Rigid structures and closures don't appeal to me as much as keeping things open-ended.",
    favoring: "S",
    reverse: true,
  },
  {
    id: 49,
    dimension: 3,
    type: "forced-select",
    text: "Organizing a home event, like a dinner, what's your style?",
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
    text: "Stability through planning helps me handle life's uncertainties.",
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
    text: "Spontaneity and open options aren't as comfortable as having everything mapped out.",
    favoring: "F",
    reverse: true,
  },
  {
    id: 53,
    dimension: 3,
    type: "likert",
    text: "At work, I aim for quick decisions to achieve closure.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 54,
    dimension: 3,
    type: "rank",
    text: "Rank these for dealing with change (1 = most, 3 = least):",
    options: [
      { key: "a", label: "Structured organization and stability.", pole: "S" },
      { key: "b", label: "Flexible adaptation and openness.", pole: "F" },
      { key: "c", label: "Equal balance.", pole: "balanced" },
    ],
  },
  {
    id: 55,
    dimension: 3,
    type: "likert",
    text: "I organize my environment to minimize unexpected shifts.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 56,
    dimension: 3,
    type: "likert",
    text: "Fixed plans don't motivate me like the thrill of improvisation does.",
    favoring: "S",
    reverse: true,
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
    text: "Completing tasks with structure satisfies me over endless exploration.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 59,
    dimension: 3,
    type: "forced-select",
    text: "Which describes your change approach?",
    options: [
      { key: "a", label: "Structured, planned, and orderly.", value: { S: 5, F: 1 } },
      { key: "b", label: "Adaptive, spontaneous, and flexible.", value: { S: 1, F: 5 } },
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
    text: "Pursuing individual projects where I control the direction motivates me most.",
    favoring: "A",
    reverse: false,
  },
  {
    id: 62,
    dimension: 4,
    type: "likert",
    text: "In family settings, I focus on building consensus for collective well-being.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 63,
    dimension: 4,
    type: "likert",
    text: "Working toward group successes doesn't fulfill me as much as personal achievements do.",
    favoring: "H",
    reverse: true,
  },
  {
    id: 64,
    dimension: 4,
    type: "forced-select",
    text: "In a community volunteer group, what's your impulse?",
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
    text: "Collective efforts and unity drive my career choices.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 66,
    dimension: 4,
    type: "likert",
    text: "Maintaining personal freedom is more important than team dependencies.",
    favoring: "A",
    reverse: false,
  },
  {
    id: 67,
    dimension: 4,
    type: "likert",
    text: "Individual objectives aren't as rewarding as contributing to a team.",
    favoring: "A",
    reverse: true,
  },
  {
    id: 68,
    dimension: 4,
    type: "likert",
    text: "I orient actions toward group dynamics in social circles.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 69,
    dimension: 4,
    type: "rank",
    text: "Rank these motivations (1 = most, 3 = least):",
    options: [
      { key: "a", label: "Harmony in collaboration.", pole: "H" },
      { key: "b", label: "Autonomy in independence.", pole: "A" },
      { key: "c", label: "Equal balance.", pole: "balanced" },
    ],
  },
  {
    id: 70,
    dimension: 4,
    type: "likert",
    text: "Shared successes feel better than solo victories.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 71,
    dimension: 4,
    type: "likert",
    text: "Team-oriented environments don't suit me like solitary pursuits do.",
    favoring: "H",
    reverse: true,
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
    text: "I thrive on collective goals over personal boundaries.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 74,
    dimension: 4,
    type: "forced-select",
    text: "Which fits your interpersonal motivation?",
    options: [
      { key: "a", label: "Collaborative and group-focused.", value: { H: 5, A: 1 } },
      { key: "b", label: "Autonomous and self-reliant.", value: { H: 1, A: 5 } },
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
