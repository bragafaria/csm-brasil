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
        `${pole} is your natural lean (used ${pct}% of the time), but the opposite pole (${oppositePole} at ${oppositePct}%) is still accessible and shows up with little effort when situations call for it.`,
    },
    "66-85": {
      label: "Moderate Preference",
      desc: (pct, pole, oppositePole, oppositePct) =>
        `${pole} is your clear default (used ${pct}% of the time). The opposite pole (${oppositePole} at ${oppositePct}%) appears when needed, although it is not your automatic response.`,
    },
    "86-100": {
      label: "Strong Preference",
      desc: (pct, pole, oppositePole, oppositePct) =>
        `${pole} is your dominant mode (used ${pct}% of the time). The opposite pole (${oppositePole} at ${oppositePct}%) shows up rarely and usually requires conscious effort.`,
    },
  },
  secondary: {
    "35-49": {
      label: "High Influence",
      desc: (pct, pole, primaryPole, primaryPct) =>
        `${pole} is not your default, but it plays a noticeable role (appearing in ${pct}% of situations) and feels natural when the context fits. Your primary pole is ${primaryPole} at ${primaryPct}%.`,
    },
    "15-34": {
      label: "Moderate Influence",
      desc: (pct, pole, primaryPole, primaryPct) =>
        `${pole} is not your default and shows up occasionally (in ${pct}% of situations), usually triggered by specific contexts or needs. Your primary pole is ${primaryPole} at ${primaryPct}%.`,
    },
    "0-14": {
      label: "Low Influence",
      desc: (pct, pole, primaryPole, primaryPct) =>
        `${pole} is not your default and appears rarely (only ${pct}% of the time). It feels less familiar and usually requires intentional effort. Your primary pole is ${primaryPole} at ${primaryPct}%.`,
    },
  },
};

// ← ADD THIS LINE
export const CAS_TIERS = {
  "80-100": {
    label: "Easy Alignment",
    desc: (pole) =>
      `Both partners rely on similar patterns within ${pole}, making the dimension feel natural and easy to navigate together. Communication flows with minimal friction, and understanding each other's perspective often happens automatically.`,
  },
  "60-79": {
    label: "Manageable Alignment",
    desc: (pole) =>
      `Partners share the same general orientation toward ${pole}, but differ enough in intensity that their default reactions do not always match. Most interactions feel smooth, but certain situations may reveal gaps that require intention, clarification, or small adjustments to stay aligned.`,
  },
  "0-59": {
    label: "Challenging Alignment",
    desc: (pole) =>
      `Partners approach ${pole} from different cognitive starting points. Their natural ways of processing or responding often diverge, making alignment a more active process. Clear communication, curiosity, and conscious bridging are essential to avoid misunderstandings and maintain harmony.`,
  },
};
