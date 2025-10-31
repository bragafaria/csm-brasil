// app/assessment/summary/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { poles } from "@/app/utils/csm";
import { motion } from "framer-motion";
import { HelpCircle, X } from "lucide-react";

export default function Summary() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });

  useEffect(() => {
    const stored = localStorage.getItem("csmAssessmentData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setData(parsed.results);
    }
  }, []);

  useEffect(() => {
    setValid(name.trim() !== "" && /\S+@\S+\.\S+/.test(email));
  }, [name, email]);

  const handleSubmit = () => {
    if (valid && data?.typeCode) {
      router.push(`/report/${data.typeCode}`);
    }
  };

  const openModal = (title, body) => {
    setModalContent({ title, body });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent({ title: "", body: "" });
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[var(--text-secondary)] font-medium">Loading your results...</span>
        </div>
      </div>
    );
  }

  const dimensionData = [
    {
      title: "Information Processing",
      subtitle: "How do you naturally perceive information?",
      p1: "Concrete Focus (C)",
      p2: "Abstract Insight (N)",
      descriptions: {
        C: "Focuses on tangible, verifiable data; practical, detail-oriented. Trusts 'what is' over 'what if.'",
        N: "Focuses on patterns, possibilities, theories; imaginative, forward-looking. Explores 'what could be.'",
      },
    },
    {
      title: "Decision-Making",
      subtitle: "What is your primary basis for judgments?",
      p1: "Analytical Logic (L)",
      p2: "Empathic Values (V)",
      descriptions: {
        L: "Objective logic, cause-and-effect; seeks truth via systemic analysis.",
        V: "Personal values, human impact; seeks harmony via emotional alignment.",
      },
    },
    {
      title: "Energy Orientation",
      subtitle: "Where do you direct mental energy?",
      p1: "Inward Reflection (I)",
      p2: "Outward Engagement (O)",
      descriptions: {
        I: "Internal stimulation via reflection; recharges in solitude.",
        O: "External stimulation via action; recharges socially.",
      },
    },
    {
      title: "Change Approach",
      subtitle: "How do you approach the outer world and change?",
      p1: "Stable Structure (S)",
      p2: "Adaptive Flexibility (F)",
      descriptions: {
        S: "Prefers planning, organization; outward Judging (L/V).",
        F: "Prefers spontaneity, flexibility; outward Perceiving (C/N).",
      },
    },
    {
      title: "Interpersonal Style",
      subtitle: "What motivates your cognitive processes?",
      p1: "Collaborative Harmony (H)",
      p2: "Independent Autonomy (A)",
      descriptions: {
        H: "Collaboration, collective goals; group-focused modes.",
        A: "Self-reliance, personal objectives; individual-focused modes.",
      },
    },
  ];

  const getPrimaryDesc = (primaryPoleName, primaryPoleCode, domLevel) => {
    const templates = {
      Mild: `Your primary preference for **${primaryPoleName} (${primaryPoleCode})** has a slight advantage (51–65%), indicating good flexibility and frequent access to the secondary pole. You may switch between the two more easily in different contexts, leading to a balanced but gently tilted approach. This corresponds to a **High** secondary influence, making your style adaptable and versatile.`,
      Moderate: `Your primary preference for **${primaryPoleName} (${primaryPoleCode})** is clearly dominant (66–85%), with noticeable but not overwhelming influence from the secondary. This common range suggests a reliable lean toward one side while still allowing for adaptability and growth through the other. This corresponds to a **Moderate** secondary influence, providing a solid foundation with room for balance.`,
      Strong: `Your primary preference for **${primaryPoleName} (${primaryPoleCode})** heavily dominates (86–100%), highlighting a core strength but potential blind spots in the secondary pole. This can manifest as exceptional proficiency in the primary but may require intentional effort to engage the secondary for well-roundedness. This corresponds to a **Low** secondary influence, emphasizing focused expertise with targeted growth opportunities.`,
    };
    return templates[domLevel] || "";
  };

  const getSecondaryDesc = (secondaryPoleName, secondaryPoleCode, infLevel) => {
    const templates = {
      High: `The secondary preference for **${secondaryPoleName} (${secondaryPoleCode})** is close to the primary (35–49%), suggesting strong accessibility and frequent use in certain contexts. You can easily tap into this pole, making it a reliable complement to your primary preference. This corresponds to a **Mild** primary dominance (51–65%), fostering a highly balanced and flexible cognitive style.`,
      Moderate: `The secondary preference for **${secondaryPoleName} (${secondaryPoleCode})** has a noticeable but not dominant presence (15–34%). It emerges in specific situations but requires some effort to engage fully. This corresponds to a **Moderate** primary dominance (66–85%), offering a dependable core preference with accessible support for varied challenges.`,
      Low: `The secondary preference for **${secondaryPoleName} (${secondaryPoleCode})** is rarely used naturally (0–14%), often functioning as a blind spot or area of discomfort. Engaging it requires significant conscious effort and may be a key growth area. This corresponds to a **Strong** primary dominance (86–100%), where your expertise shines but intentional development of this area can unlock greater versatility.`,
    };
    return templates[infLevel] || "";
  };

  const getInterpretationTitle = (primaryFull, secondaryFull, domLevel, infLevel) => {
    const levelPhrases = {
      "Mild-High": "Balanced Harmony",
      "Moderate-Moderate": "Steady Alignment",
      "Strong-Low": "Focused Edge",
      "Balanced-Balanced": "Perfect Equilibrium",
    };
    return `${levelPhrases[`${domLevel}-${infLevel}`] || "Dynamic Balance"}: ${primaryFull} & ${secondaryFull}`;
  };

  const getInterpretationIntro = (primaryFull, primaryPole, secondaryFull, secondaryPole, domLevel, infLevel) => {
    const templates = {
      "Mild-High": `With a **Mild** primary preference for **${primaryFull}** and **High** secondary influence from **${secondaryFull}**, your balanced spectrum suggests versatile application of the report's insights. The general analysis provides a flexible foundation—lean into **${primaryFull}** for core relational patterns but frequently blend in **${secondaryFull}** elements for nuanced, context-specific communication strategies. This adaptability makes the report a **dynamic guide** rather than a rigid blueprint, allowing you to switch between **${primaryPole}** and **${secondaryPole}** modes seamlessly across relationship scenarios.`,
      "Moderate-Moderate": `Your **Moderate** primary preference for **${primaryFull}** paired with **Moderate** secondary influence from **${secondaryFull}** indicates a reliable yet adjustable lens for interpreting the report. Use **${primaryFull}** as your steady anchor for key themes in couple dynamics, while **${secondaryFull}** offers practical support in everyday interactions. The report's general ideas shine here as a **balanced roadmap**: emphasize **${primaryPole}** strengths for consistency, but integrate **${secondaryPole}** perspectives to avoid over-reliance and enhance relational flexibility.`,
      "Strong-Low": `Featuring a **Strong** primary preference for **${primaryFull}** and **Low** secondary influence from **${secondaryFull}**, approach the report with focused intensity on **${primaryFull}** while mindfully cultivating **${secondaryFull}** as a growth edge. The general content highlights your core expertise in **${primaryPole}**-driven approaches—apply it deeply where it excels in partnerships—but use the spectrum to identify blind spots, intentionally stretching into **${secondaryPole}** areas for comprehensive interpretation. This transforms the report into a **targeted tool** for mastery and balanced development in relationships.`,
      "Balanced-Balanced": `Your near-perfect balance between **${primaryFull}** and **${secondaryFull}** reflects exceptional cognitive flexibility. You naturally integrate both **${primaryPole}** and **${secondaryPole}** approaches, adapting fluidly to context. The report serves as a **mirror of your versatility**—use it to refine your already strong ability to shift between modes as needed in relationships.`,
    };
    return (
      templates[`${domLevel}-${infLevel}`] ||
      `Leverage your **${primaryFull}** dominance while exploring **${secondaryFull}** for fuller insights.`
    );
  };

  const getColorClass = (level) => {
    const colors = {
      Mild: "text-green-400 border-green-400/30",
      Moderate: "text-yellow-400 border-yellow-400/30",
      Strong: "text-red-400 border-red-400/30",
      High: "text-green-400 border-green-400/30",
      Low: "text-red-400 border-red-400/30",
      Balanced: "text-blue-400 border-blue-400/30",
    };
    return colors[level] || "text-gray-400 border-gray-400/30";
  };

  const getGradientClass = (level) => {
    const gradients = {
      Mild: "from-green-500/10 to-[var(--surface)]",
      Moderate: "from-yellow-500/10 to-[var(--surface)]",
      Strong: "from-red-500/10 to-[var(--surface)]",
      High: "from-green-500/10 to-[var(--surface)]",
      Low: "from-red-500/10 to-[var(--surface)]",
      Balanced: "from-blue-500/10 to-[var(--surface)]",
    };
    return gradients[level] || "from-gray-500/10 to-[var(--surface)]";
  };

  const getProgressColor = (level) => {
    const colors = {
      Mild: "bg-green-400",
      Moderate: "bg-yellow-400",
      Strong: "bg-red-400",
      High: "bg-green-400",
      Low: "bg-red-400",
      Balanced: "bg-blue-400",
    };
    return colors[level] || "bg-gray-400";
  };

  return (
    <>
      <main className="min-h-screen bg-[var(--surface)] p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="card-gradient p-8 md:p-10 rounded-2xl shadow-custom-lg border border-[var(--border)]"
          >
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">Your CSM Archetype</h1>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-4">{data.archetype.name}</h2>
              <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
                {data.archetype.description}
              </p>
            </div>

            {/* Dimensions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              {data.percents.map((p, i) => {
                const dim = { ...dimensionData[i], index: i };
                const primaryPole = data.dominants[i];
                const primary = p.p1 > p.p2 ? "p1" : "p2";
                const primPct = Math.round(primary === "p1" ? p.p1 : p.p2);
                const secPct = 100 - primPct;
                const primaryFull = primaryPole === poles[i][0] ? dim.p1 : dim.p2;
                const secondaryPole = primaryPole === poles[i][0] ? poles[i][1] : poles[i][0];
                const secondaryFull = primaryPole === poles[i][0] ? dim.p2 : dim.p1;
                const domLevel = data.categories[i].domLevel;
                const infLevel = data.categories[i].infLevel;
                const primaryDesc = dim.descriptions[primaryPole];
                const secondaryDesc = dim.descriptions[secondaryPole];
                const interpretationTitle = getInterpretationTitle(primaryFull, secondaryFull, domLevel, infLevel);
                const interpretationIntro = getInterpretationIntro(
                  primaryFull,
                  primaryPole,
                  secondaryFull,
                  secondaryPole,
                  domLevel,
                  infLevel
                );

                const primaryColor = getColorClass(domLevel);
                const secondaryColor = getColorClass(infLevel);
                const primaryGradient = getGradientClass(domLevel);
                const secondaryGradient = getGradientClass(infLevel);
                const primaryProgressColor = getProgressColor(domLevel);
                const secondaryProgressColor = getProgressColor(infLevel);

                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[var(--surface-variant)] rounded-2xl border border-[var(--border)] p-6 shadow-md hover:shadow-lg transition-all duration-300 group"
                  >
                    {/* Title */}
                    <div className="text-center mb-5">
                      <h3 className="text-xl font-bold text-[var(--text-primary)]">{dim.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)] italic mt-1">{dim.subtitle}</p>
                    </div>

                    <div className="space-y-5">
                      {/* Primary Preference */}
                      <div
                        className={`bg-gradient-to-r ${primaryGradient} p-5 rounded-xl border ${primaryColor} space-y-3`}
                      >
                        <div className="text-center">
                          <p className="text-lg font-bold text-[var(--text-primary)]">
                            {primaryFull} <span className="text-sm font-normal">({primaryPole})</span>
                          </p>
                          <p className="text-sm text-[var(--text-secondary)] italic mt-1">{primaryDesc}</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-[var(--text-primary)]">Primary</span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  openModal("Primary Preference", getPrimaryDesc(primaryFull, primaryPole, domLevel))
                                }
                                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                aria-label="Explain primary"
                              >
                                <HelpCircle size={16} />
                              </motion.button>
                            </div>
                            <span className={`font-bold ${primaryColor}`}>{primPct}%</span>
                          </div>
                          <div className="w-full bg-[var(--surface)] rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${primPct}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className={`${primaryProgressColor} h-full rounded-full`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Secondary Influence */}
                      <div
                        className={`bg-gradient-to-r ${secondaryGradient} p-5 rounded-xl border ${secondaryColor} space-y-3`}
                      >
                        <div className="text-center">
                          <p className="text-lg font-bold text-[var(--text-primary)]">
                            {secondaryFull} <span className="text-sm font-normal">({secondaryPole})</span>
                          </p>
                          <p className="text-sm text-[var(--text-secondary)] italic mt-1">{secondaryDesc}</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-[var(--text-primary)]">Secondary</span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  openModal(
                                    "Secondary Influence",
                                    getSecondaryDesc(secondaryFull, secondaryPole, infLevel)
                                  )
                                }
                                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                aria-label="Explain secondary"
                              >
                                <HelpCircle size={16} />
                              </motion.button>
                            </div>
                            <span className={`font-bold ${secondaryColor}`}>{secPct}%</span>
                          </div>
                          <div className="w-full bg-[var(--surface)] rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${secPct}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className={`${secondaryProgressColor} h-full rounded-full`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Interpretation */}
                      <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border)]">
                        <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2">{interpretationTitle}</h4>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed prose dark:prose-invert max-w-none">
                          {interpretationIntro}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Unlock Report */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[var(--surface-variant)] p-6 md:p-8 rounded-2xl border border-[var(--border)] shadow-md"
            >
              <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] text-center mb-6">
                Unlock Your Full Personalized Report
              </h3>
              <div className="space-y-4 max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
                  required
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
                  required
                />
                <motion.button
                  whileHover={valid ? { scale: 1.02 } : {}}
                  whileTap={valid ? { scale: 0.98 } : {}}
                  onClick={handleSubmit}
                  disabled={!valid}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all shadow-md ${
                    valid
                      ? "btn-primary hover:shadow-lg"
                      : "bg-[var(--surface)] text-[var(--text-secondary)] opacity-60 cursor-not-allowed"
                  }`}
                >
                  {valid ? "View Full Report →" : "Enter Name & Email"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--surface)] rounded-2xl p-6 md:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-custom-lg border border-[var(--border)] card-gradient"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] pr-8">{modalContent.title}</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-[var(--surface-variant)] transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </motion.button>
            </div>
            <div className="prose dark:prose-invert max-w-none text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
              {modalContent.body.split("\n").map((line, i) => (
                <p key={i} className="mb-3 last:mb-0" dangerouslySetInnerHTML={{ __html: line }} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
