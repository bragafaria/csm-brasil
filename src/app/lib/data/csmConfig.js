// app/lib/data/csmConfig.js

export const CSM_DIMENSIONS = [
  {
    name: "Information Processing",
    subtitle: "How you perceive and interpret data",
    pole1: {
      letter: "C",
      name: "Concrete Focus",
      desc: "Preference for tangible, verifiable, real-world data; what is practical and observable now.",
    },
    pole2: {
      letter: "N",
      name: "Abstract Insight",
      desc: "Preference for patterns, possibilities, and theoretical connections: what could be.",
    },
  },
  {
    name: "Decision-Making",
    subtitle: "How you evaluate and decide",
    pole1: {
      letter: "L",
      name: "Analytical Logic",
      desc: "Preference for objective, impersonal logic and principles of cause and effect.",
    },
    pole2: {
      letter: "V",
      name: "Empathic Values",
      desc: "Decisions based on personal values and the impact on people.",
    },
  },
  {
    name: "Energy Orientation",
    subtitle: "Where your focus and energy flow",
    pole1: {
      letter: "I",
      name: "Inward Reflection",
      desc: "Directs energy internally, finding stimulation in reflection and deep thought.",
    },
    pole2: {
      letter: "O",
      name: "Outward Engagement",
      desc: "Directs energy externally, finding stimulation in action and interaction.",
    },
  },
  {
    name: "Change Approach",
    subtitle: "How you approach change and structure",
    pole1: {
      letter: "S",
      name: "Stable Structure",
      desc: "Preference for closure, planning, and organized systems.",
    },
    pole2: {
      letter: "F",
      name: "Adaptive Flexibility",
      desc: "Preference for spontaneity, open options, and adapting to new information.",
    },
  },
  {
    name: "Interpersonal Style",
    subtitle: "How your cognition orients to others",
    pole1: {
      letter: "H",
      name: "Collaborative Harmony",
      desc: "Oriented toward group dynamics, collaboration, and collective goals.",
    },
    pole2: {
      letter: "A",
      name: "Independent Autonomy",
      desc: "Oriented toward self-reliance, personal objectives, and individual freedom.",
    },
  },
];

export const PREFERENCE_TIERS = {
  // app/lib/data/csmConfig.js → Replace primary block

  // app/lib/data/csmConfig.js → Replace primary block

  primary: {
    "51-65": {
      label: "Mild Preference",
      desc: (pct, pole, oppositePole, oppositePct) =>
        `${pole} is your default (used ${pct}% of the time), but the opposite pole (${oppositePole} with ${oppositePct}%) is still easy to access in different situations.`,
    },
    "66-85": {
      label: "Moderate Preference",
      desc: (pct, pole, oppositePole, oppositePct) =>
        `${pole} is your clear default (used ${pct}% of the time). The opposite pole (${oppositePole} with ${oppositePct}%) appears when needed, but not automatically.`,
    },
    "86-100": {
      label: "Strong Preference",
      desc: (pct, pole, oppositePole, oppositePct) =>
        `${pole} is your dominant mode (used ${pct}% of the time). The opposite pole (${oppositePole} with ${oppositePct}%) rarely appears without effort.`,
    },
  },
  secondary: {
    "35-49": {
      label: "High Influence",
      desc: (pct, pole, primaryPole, primaryPct) =>
        `${pole} is not your default, but it shows up often (in ${pct}% of cases) and feels natural in the right context. Your primary pole is ${primaryPole} with ${primaryPct}%.`,
    },
    "15-34": {
      label: "Moderate Influence",
      desc: (pct, pole, primaryPole, primaryPct) =>
        `${pole} is not your default and appears only sometimes (in ${pct}% of cases), usually under specific conditions. Your primary pole is ${primaryPole} with ${primaryPct}%.`,
    },
    "0-14": {
      label: "Low Influence",
      desc: (pct, pole, primaryPole, primaryPct) =>
        `${pole} is not your default and is rare (only ${pct}% of the time). It feels unfamiliar and requires effort. Your primary pole is ${primaryPole} with ${primaryPct}%.`,
    },
  },
};

// ← ADD THIS LINE
export const CAS_TIERS = {
  "80-100": {
    label: "Strong Alignment",
    desc: (pole) =>
      `Both partners exhibit a high degree of preference for ${pole}. This indicates consistent cognitive processing and high mutual comprehension within this dimension with minimal adjustment.`,
  },
  "60-79": {
    label: "Moderate Alignment",
    desc: (pole) =>
      `Partners show moderate alignment in preference for ${pole}. Differences in intensity exist but remain within a functional range, supporting cooperation with some adjustment.`,
  },
  "0-59": {
    label: "Low Alignment",
    desc: (pole) =>
      `Partners diverge significantly in preference for ${pole}. This reflects contrasting cognitive approaches, requiring conscious effort to achieve alignment and reduce potential miscommunication.`,
  },
};
