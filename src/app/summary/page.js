"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { poles } from "../utils/csm";
import { HelpCircle } from "lucide-react";

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
    if (stored) setData(JSON.parse(stored).results);
  }, []);

  useEffect(() => {
    setValid(name.trim() !== "" && /\S+@\S+\.\S+/.test(email));
  }, [name, email]);

  const handleSubmit = () => {
    if (valid) {
      router.push(`/report/${data.typeCode}`);
    }
  };

  console.log("data summary", data);

  const openModal = (title, body) => {
    setModalContent({ title, body });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent({ title: "", body: "" });
  };

  if (!data)
    return <div className="flex min-h-screen items-center justify-center text-[var(--text-primary)]">Loading...</div>;

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
      Mild: "Your primary preference for {primaryPoleName} ({primaryPoleCode}) has a slight advantage (51-65%), indicating good flexibility and frequent access to the secondary pole. You may switch between the two more easily in different contexts, leading to a balanced but gently tilted approach. This corresponds to a High secondary influence, making your style adaptable and versatile.",
      Moderate:
        "Your primary preference for {primaryPoleName} ({primaryPoleCode}) is clearly dominant (66-85%), with noticeable but not overwhelming influence from the secondary. This common range suggests a reliable lean toward one side while still allowing for adaptability and growth through the other. This corresponds to a Moderate secondary influence, providing a solid foundation with room for balance.",
      Strong:
        "Your primary preference for {primaryPoleName} ({primaryPoleCode}) heavily dominates (86-100%), highlighting a core strength but potential blind spots in the secondary pole. This can manifest as exceptional proficiency in the primary but may require intentional effort to engage the secondary for well-roundedness. This corresponds to a Low secondary influence, emphasizing focused expertise with targeted growth opportunities.",
    };
    return templates[domLevel]
      .replace("{primaryPoleName}", primaryPoleName)
      .replace("{primaryPoleCode}", primaryPoleCode);
  };

  const getSecondaryDesc = (secondaryPoleName, secondaryPoleCode, infLevel) => {
    const templates = {
      High: "The secondary preference for {secondaryPoleName} ({secondaryPoleCode}) is close to the primary (35-49%), suggesting strong accessibility and frequent use in certain contexts. You can easily tap into this pole, making it a reliable complement to your primary preference. This corresponds to a Mild primary dominance (51-65%), fostering a highly balanced and flexible cognitive style.",
      Moderate:
        "The secondary preference for {secondaryPoleName} ({secondaryPoleCode}) has a noticeable but not dominant presence (15-34%). It emerges in specific situations but requires some effort to engage fully. This corresponds to a Moderate primary dominance (66-85%), offering a dependable core preference with accessible support for varied challenges.",
      Low: "The secondary preference for {secondaryPoleName} ({secondaryPoleCode}) is rarely used naturally (0-14%), often functioning as a blind spot or area of discomfort. Engaging it requires significant conscious effort and may be a key growth area. This corresponds to a Strong primary dominance (86-100%), where your expertise shines but intentional development of this area can unlock greater versatility.",
    };
    return templates[infLevel]
      .replace("{secondaryPoleName}", secondaryPoleName)
      .replace("{secondaryPoleCode}", secondaryPoleCode);
  };

  const getInterpretationTitle = (primaryFull, secondaryFull, domLevel, infLevel) => {
    const levelPhrases = {
      "Mild-High": "Balanced Harmony",
      "Moderate-Moderate": "Steady Alignment",
      "Strong-Low": "Focused Edge",
      "Balanced-Balanced": "Perfect Equilibrium", // ← ADD
    };
    return `${levelPhrases[`${domLevel}-${infLevel}`] || "Dynamic Balance"}: ${primaryFull} and ${secondaryFull}`;
  };

  const getInterpretationIntro = (primaryFull, primaryPole, secondaryFull, secondaryPole, domLevel, infLevel) => {
    const templates = {
      "Mild-High": `With a Mild primary preference for ${primaryFull}  and High secondary influence from ${secondaryFull} , your balanced spectrum suggests versatile application of the report's insights. The general analysis provides a flexible foundation,lean into ${primaryFull} for core relational patterns but frequently blend in ${secondaryFull} elements for nuanced, context-specific communication strategies. This adaptability makes the report a dynamic guide rather than a rigid blueprint, allowing you to switch between ${primaryPole} and ${secondaryPole} modes seamlessly across relationship scenarios.`,
      "Moderate-Moderate": `Your Moderate primary preference for ${primaryFull}  paired with Moderate secondary influence from ${secondaryFull}  indicates a reliable yet adjustable lens for interpreting the report. Use ${primaryFull} as your steady anchor for key themes in couple dynamics, while ${secondaryFull} offers practical support in everyday interactions. The report's general ideas shine here as a balanced roadmap: emphasize ${primaryPole} strengths for consistency, but integrate ${secondaryPole} perspectives to avoid over-reliance and enhance relational flexibility.`,
      "Strong-Low": `Featuring a Strong primary preference for ${primaryFull}  and Low secondary influence from ${secondaryFull} , approach the report with focused intensity on ${primaryFull} while mindfully cultivating ${secondaryFull} as a growth edge. The general content highlights your core expertise in ${primaryPole}-driven approaches,apply it deeply where it excels in partnerships,but use the spectrum to identify blind spots, intentionally stretching into ${secondaryPole} areas for comprehensive interpretation. This transforms the report into a targeted tool for mastery and balanced development in relationships.`,
      "Balanced-Balanced": `Your near-perfect balance between ${primaryFull} and ${secondaryFull} reflects exceptional cognitive flexibility. You naturally integrate both ${primaryPole} and ${secondaryPole} approaches, adapting fluidly to context. The report serves as a mirror of your versatility—use it to refine your already strong ability to shift between modes as needed in relationships.`,
    };
    return (
      templates[`${domLevel}-${infLevel}`] ||
      `Leverage your ${primaryFull} dominance while exploring ${secondaryFull} for fuller insights.`
    );
  };

  const getColorClass = (level) => {
    const colors = {
      Mild: "text-green-400 border-green-400/20 hover:bg-green-400/40",
      Moderate: "text-yellow-400 border-yellow-400/20 hover:bg-yellow-400/40",
      Strong: "text-red-400 border-red-400/20 hover:bg-red-400/40",
      High: "text-red-400 border-red-400/20 hover:bg-red-400/40",
      Low: "text-green-400 border-green-400/20 hover:bg-green-400/40",
      Balanced: "text-blue-400 border-blue-400/20 hover:bg-blue-400/40", // ← ADD
    };
    return colors[level] || "text-gray-400 border-gray-400/20 hover:bg-gray-400/40";
  };

  const getGradientClass = (level) => {
    const gradients = {
      Mild: "from-green-500/10 to-black/10",
      Moderate: "from-yellow-500/10 to-black/10",
      Strong: "from-red-500/10 to-black/10",
      High: "from-red-500/10 to-black/10",
      Low: "from-green-500/10 to-black/10",
      Balanced: "from-blue-500/10 to-black/10", // ← ADD
    };
    return gradients[level] || "from-gray-500/10 to-black/10";
  };

  const getProgressColor = (level) => {
    const colors = {
      Mild: "bg-green-400",
      Moderate: "bg-yellow-400",
      Strong: "bg-red-400",
      High: "bg-red-400",
      Low: "bg-green-400",
      Balanced: "bg-blue-400", // ← ADD
    };
    return colors[level] || "bg-gray-400";
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-[var(--surface)]">
        <div className="w-full max-w-4xl card-gradient p-8 rounded-xl shadow-2xl border border-[var(--border)] space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Your CSM Archetype</h1>
            <h2 className="text-2xl font-semibold text-[var(--primary)] mb-4">{data.archetype.name}</h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">{data.archetype.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
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
                <div
                  key={i}
                  className="group bg-gradient-to-br from-[var(--surface-variant)] to-[var(--surface)] p-6 rounded-2xl shadow-lg border border-[var(--primary)]/20 hover:border-[var(--primary)]/40 hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-1 min-h-[400px] flex flex-col space-y-4"
                >
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">{dim.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] italic">{dim.subtitle}</p>
                  </div>

                  <div className="space-y-4 flex-grow">
                    {/* Primary Preference */}
                    <div
                      className={`bg-gradient-to-r ${primaryGradient} p-4 rounded-xl border ${primaryColor} space-y-2`}
                    >
                      <div className="text-lg font-medium text-[var(--text-primary)] text-center">
                        {primaryFull}
                        <div className="text-lg font-medium text-[var(--text-primary)] text-center">
                          {primaryFull} ({primaryPole})
                        </div>
                        <div className="text-lg font-medium text-[var(--text-primary)] text-center">
                          {secondaryFull} ({secondaryPole})
                        </div>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] text-center italic px-2">{primaryDesc}</p>
                      <div className="space-y-2">
                        <div className={`text-base font-bold ${primaryColor} text-center`}>{domLevel} Dominance</div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-[var(--text-primary)]">Primary Preference</span>
                            <button
                              onClick={() =>
                                openModal(
                                  "Primary Preference Explanation",
                                  getPrimaryDesc(primaryFull, primaryPole, domLevel)
                                )
                              }
                              className={`p-1 rounded-full ${primaryColor} transition-colors`}
                            >
                              <HelpCircle className="h-4 w-4" />
                            </button>
                          </div>
                          <span className={`text-xl font-bold ${primaryColor}`}>{primPct}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className={`${primaryProgressColor} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${primPct}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Secondary Influence */}
                    <div
                      className={`bg-gradient-to-r ${secondaryGradient} p-4 rounded-xl border ${secondaryColor} space-y-2`}
                    >
                      <div className="text-lg font-medium text-[var(--text-primary)] text-center">
                        {secondaryFull}
                        {/* ({secondaryPole}) */}
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] text-center italic px-2">{secondaryDesc}</p>
                      <div className="space-y-2">
                        <div className={`text-base font-bold ${secondaryColor} text-center`}>{infLevel} Influence</div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-[var(--text-primary)]">Secondary Influence</span>
                            <button
                              onClick={() =>
                                openModal(
                                  "Secondary Influence Explanation",
                                  getSecondaryDesc(secondaryFull, secondaryPole, infLevel)
                                )
                              }
                              className={`p-1 rounded-full ${secondaryColor} transition-colors`}
                            >
                              <HelpCircle className="h-4 w-4" />
                            </button>
                          </div>
                          <span className={`text-xl font-bold ${secondaryColor}`}>{secPct}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className={`${secondaryProgressColor} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${secPct}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interpretation Intro */}
                  <div className="bg-[var(--surface-variant)] p-4 rounded-lg border border-[var(--border)]/50 mt-auto">
                    <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">{interpretationTitle}</h4>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{interpretationIntro}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-[var(--surface-variant)] p-6 rounded-lg shadow-md border border-[var(--border)]">
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4 text-center">
              Unlock Your Full Report
            </h3>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-3 p-3 bg-[var(--surface)] text-[var(--text-primary)] rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] transition duration-300"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-3 bg-[var(--surface)] text-[var(--text-primary)] rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] transition duration-300"
            />
            <button
              onClick={handleSubmit}
              disabled={!valid}
              className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
                valid
                  ? "bg-[var(--primary)] text-[var(--text-primary)] hover:bg-[color-mix(in_srgb,var(--primary)_80%,black)] shadow-md"
                  : "bg-[var(--surface-variant)] text-[var(--text-secondary)] cursor-not-allowed"
              }`}
            >
              See Full Report
            </button>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--surface)] rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-[var(--primary)]/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[var(--text-primary)]">{modalContent.title}</h3>
              <button onClick={closeModal} className="text-[var(--text-secondary)] hover:text-[var(--primary)]">
                ×
              </button>
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed">{modalContent.body}</p>
          </div>
        </div>
      )}
    </>
  );
}
