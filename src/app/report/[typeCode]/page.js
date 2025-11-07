// app/report/[typeCode]/page.js
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { archetypes, getDimPoles, poles } from "@/app/utils/csm";
import { reportTemplates } from "@/app/lib/personal/ReportTemplates";
import { HelpCircle, ArrowRight, X } from "lucide-react";

const fixedNextSteps = `You’ve uncovered the map to your unique cognitive blueprint, a crucial step toward self-insight. Now, explore how your mind connects with your partner’s. Your strengths, style, and vulnerabilities interplay with theirs, shaping your relationship’s dynamic. The CSM Couple’s Insight Report illuminates this connection, offering a tailored guide to navigate alignments, resolve tensions, and build a stronger, more aware partnership through mutual understanding. Discover how your blueprints harmonize to create a shared journey.`;

export default function Report() {
  const params = useParams();
  const typeCode = params.typeCode?.toUpperCase();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem("csmAssessmentData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setData(parsed.results);
    }
  }, []);

  const openModal = (title, body) => {
    setModalContent({ title, body });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent({ title: "", body: "" });
  };

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleCouplesReportClick = () => {
    router.push(`/report/${typeCode}/couples`);
  };

  if (!data || !reportTemplates[typeCode] || !archetypes[typeCode]) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-6">
        <div className="text-center p-8 bg-[var(--surface-variant)] rounded-lg border border-[var(--border)] shadow-md">
          <p className="text-lg font-medium text-[var(--text-primary)]">
            Loading or Report Not Found for <span className="text-red-400">{typeCode}</span>
          </p>
        </div>
      </div>
    );
  }

  const { percents, dominants, categories, archetype, typeCode: archetypeType } = data;

  if (typeCode !== archetypeType) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex flex-col items-center justify-center p-6 gap-4">
        <div className="text-center p-8 bg-red-500/10 border border-red-500/30 rounded-lg shadow-md max-w-md">
          <p className="text-lg font-medium text-red-400">
            Your assessment report is for <strong className="text-red-500">{archetypeType}</strong>, not{" "}
            <strong className="text-red-500">{typeCode}</strong>.
          </p>
          <p className="text-sm text-[var(--text-secondary)] mt-2">Please check your URL and try again.</p>
        </div>
      </div>
    );
  }

  // Calculate overall dominance level
  const overallDomLevel = (() => {
    const counts = categories.reduce((acc, { domLevel }) => {
      const key = domLevel.toLowerCase();
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    if (counts.strong) return "strong";
    if (counts.moderate) return "moderate";
    if (counts.mild) return "mild";
    if (counts.balanced) return "balanced";
    return "mild";
  })();

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

  const getPrimaryDesc = (primaryFull, primaryPole, domLevel) => {
    const templates = {
      Mild: `Your primary preference for **${primaryFull} (${primaryPole})** has a slight advantage (51–65%), indicating good flexibility and frequent access to the secondary pole. You may switch between the two more easily in different contexts, leading to a balanced but gently tilted approach. This corresponds to a **High** secondary influence, making your style adaptable and versatile.`,
      Moderate: `Your primary preference for **${primaryFull} (${primaryPole})** is clearly dominant (66–85%), with noticeable but not overwhelming influence from the secondary. This common range suggests a reliable lean toward one side while still allowing for adaptability and growth through the other. This corresponds to a **Moderate** secondary influence, providing a solid foundation with room for balance.`,
      Strong: `Your primary preference for **${primaryFull} (${primaryPole})** heavily dominates (86–100%), highlighting a core strength but potential blind spots in the secondary pole. This can manifest as exceptional proficiency in the primary but may require intentional effort to engage the secondary for well-roundedness. This corresponds to a **Low** secondary influence, emphasizing focused expertise with targeted growth opportunities.`,
      Balanced: `Your preference for **${primaryFull} (${primaryPole})** is perfectly balanced with its opposite (50%), showing exceptional cognitive flexibility. You use both poles with equal ease, adapting fluidly to context. This rare equilibrium makes you highly versatile and adaptable across all situations.`,
    };
    return templates[domLevel] || templates.Mild;
  };

  const getSecondaryDesc = (secondaryFull, secondaryPole, infLevel) => {
    const templates = {
      High: `The secondary preference for **${secondaryFull} (${secondaryPole})** is close to the primary (35–49%), suggesting strong accessibility and frequent use in certain contexts. You can easily tap into this pole, making it a reliable complement to your primary preference. This corresponds to a **Mild** primary dominance (51–65%), fostering a highly balanced and flexible cognitive style.`,
      Moderate: `The secondary preference for **${secondaryFull} (${secondaryPole})** has a noticeable but not dominant presence (15–34%). It emerges in specific situations but requires some effort to engage fully. This corresponds to a **Moderate** primary dominance (66–85%), offering a dependable core preference with accessible support for varied challenges.`,
      Low: `The secondary preference for **${secondaryFull} (${secondaryPole})** is rarely used naturally (0–14%), often functioning as a blind spot or area of discomfort. Engaging it requires significant conscious effort and may be a key growth area. This corresponds to a **Strong** primary dominance (86–100%), where your expertise shines but intentional development of this area can unlock greater versatility.`,
      Balanced: `Your secondary preference for **${secondaryFull} (${secondaryPole})** is equal in strength to the primary (50%), indicating full cognitive integration. You access both poles seamlessly, with no dominant bias. This perfect balance is a rare strength, enabling fluid adaptation in any context.`,
    };
    return templates[infLevel] || templates.High;
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

  const getInterpretationIntro = (
    primaryFull,
    primaryPole,
    secondaryFull,
    secondaryPole,
    domLevel,
    infLevel,
    index
  ) => {
    const templates = {
      "Mild-High": `With a **Mild** primary preference for **${primaryFull}** and **High** secondary influence from **${secondaryFull}**, your balanced spectrum suggests versatile application of the report's insights. The general analysis provides a flexible foundation—lean into **${primaryFull}** for core relational patterns but frequently blend in **${secondaryFull}** elements for nuanced, context-specific communication strategies. This adaptability makes the report a **dynamic guide** rather than a rigid blueprint, allowing you to switch between **${primaryPole}** and **${secondaryPole}** modes seamlessly across relationship scenarios.`,
      "Moderate-Moderate": `Your **Moderate** primary preference for **${primaryFull}** paired with **Moderate** secondary influence from **${secondaryFull}** indicates a reliable yet adjustable lens for interpreting the report. Use **${primaryFull}** as your steady anchor for key themes in couple dynamics, while **${secondaryFull}** offers practical support in everyday interactions. The report's general ideas shine here as a **balanced roadmap**: emphasize **${primaryPole}** strengths for consistency, but integrate **${secondaryPole}** perspectives to avoid over-reliance and enhance relational flexibility.`,
      "Strong-Low": `Featuring a **Strong** primary preference for **${primaryFull}** and **Low** secondary influence from **${secondaryFull}**, approach the report with focused intensity on **${primaryFull}** while mindfully cultivating **${secondaryFull}** as a growth edge. The general content highlights your core expertise in **${primaryPole}**-driven approaches—apply it deeply where it excels in partnerships—but use the spectrum to identify blind spots, intentionally stretching into **${secondaryPole}** areas for comprehensive interpretation. This transforms the report into a **targeted tool** for mastery and balanced development in relationships.`,
      "Balanced-Balanced": `Your perfect balance between **${primaryFull}** and **${secondaryFull}** reflects exceptional cognitive flexibility. You seamlessly integrate both **${primaryPole}** and **${secondaryPole}** approaches, adapting fluidly to any context. The report serves as a **mirror of your versatility**—use it to refine your already strong ability to shift between modes as needed in relationships. This equilibrium empowers you to navigate any dynamic with ease, making you a natural bridge-builder in partnerships.`,
    };

    const fullText =
      templates[`${domLevel}-${infLevel}`] ||
      `Leverage your **${primaryFull}** dominance while exploring **${secondaryFull}** for fuller insights.`;
    const previewLength = 160;

    if (fullText.length <= previewLength || expanded[index]) {
      return <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{fullText}</p>;
    }

    const previewText = fullText.slice(0, previewLength).replace(/\s+\S*$/, "...");
    return (
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
        {previewText}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleExpand(index)}
          className="ml-2 text-[var(--accent)] hover:underline text-xs font-medium"
        >
          (Read more)
        </motion.button>
      </p>
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

  const renderSection = (sectionKey) => {
    const templates = reportTemplates[typeCode][sectionKey];
    if (!templates) return null;

    if (sectionKey === "dimensionalProfile") {
      return (
        <div className="space-y-8 max-w-4xl mx-auto">
          {templates.dimensions.map((dimTemp, dimIdx) => {
            const dim = { ...dimensionData[dimIdx], index: dimIdx };
            const primaryPole = dominants[dimIdx];
            const primary = percents[dimIdx].p1 > percents[dimIdx].p2 ? "p1" : "p2";
            const primPct = Math.round(primary === "p1" ? percents[dimIdx].p1 : percents[dimIdx].p2);
            const secPct = 100 - primPct;
            const primaryFull = primaryPole === poles[dimIdx][0] ? dim.p1 : dim.p2;
            const secondaryPole = primaryPole === poles[dimIdx][0] ? poles[dimIdx][1] : poles[dimIdx][0];
            const secondaryFull = primaryPole === poles[dimIdx][0] ? dim.p2 : dim.p1;
            const domLevel = categories[dimIdx].domLevel;
            const infLevel = categories[dimIdx].infLevel;
            const primaryDesc = dim.descriptions[primaryPole];
            const secondaryDesc = dim.descriptions[secondaryPole];
            const interpretationTitle = getInterpretationTitle(primaryFull, secondaryFull, domLevel, infLevel);
            const interpretationIntro = getInterpretationIntro(
              primaryFull,
              primaryPole,
              secondaryFull,
              secondaryPole,
              domLevel,
              infLevel,
              dimIdx
            );
            const primaryColor = getColorClass(domLevel);
            const secondaryColor = getColorClass(infLevel);
            const primaryProgressColor = getProgressColor(domLevel);
            const secondaryProgressColor = getProgressColor(infLevel);
            const profileTitle = dimTemp.title(primPct, secPct, domLevel, infLevel);
            const profileParas = dimTemp[domLevel.toLowerCase()] || dimTemp.mild;

            return (
              <motion.div
                key={dimIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: dimIdx * 0.1 }}
                className="card-gradient p-6 md:p-8 rounded-2xl shadow-custom-lg border border-[var(--border)]"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">{dim.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] italic mt-2">{dim.subtitle}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Primary */}
                  <div
                    className={`bg-gradient-to-br from-[var(--surface)] to-[var(--surface-variant)] p-5 rounded-xl border ${primaryColor}`}
                  >
                    <div className="text-center mb-3">
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
                        <span className={`font-bold ${primaryColor.split(" ")[0]}`}>{primPct}%</span>
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

                  {/* Secondary */}
                  <div
                    className={`bg-gradient-to-br from-[var(--surface)] to-[var(--surface-variant)] p-5 rounded-xl border ${secondaryColor}`}
                  >
                    <div className="text-center mb-3">
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
                              openModal("Secondary Influence", getSecondaryDesc(secondaryFull, secondaryPole, infLevel))
                            }
                            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            aria-label="Explain secondary"
                          >
                            <HelpCircle size={16} />
                          </motion.button>
                        </div>
                        <span className={`font-bold ${secondaryColor.split(" ")[0]}`}>{secPct}%</span>
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
                </div>

                {/* Interpretation */}
                <div className="bg-[var(--surface)] p-5 rounded-lg border border-[var(--border)] mb-6">
                  <h4 className="text-sm font-bold text-[var(--text-primary)] mb-3">{interpretationTitle}</h4>
                  {interpretationIntro}
                </div>

                {/* Profile */}
                <div>
                  <h4 className="text-lg font-bold text-[var(--accent)] mb-3">{profileTitle}</h4>
                  <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed prose dark:prose-invert max-w-none">
                    {profileParas.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      );
    }

    const levelKey = overallDomLevel.toLowerCase();
    const content = templates[levelKey];
    if (!content) return null;

    return (
      <div className="space-y-4 max-w-4xl mx-auto">
        {content.map((para, idx) => (
          <p key={idx} className="text-base md:text-lg leading-relaxed text-[var(--text-secondary)]">
            {para}
          </p>
        ))}
      </div>
    );
  };

  const spectrumBalance = percents
    .map((p, i) => {
      const primaryPole = dominants[i];
      const primary = p.p1 > p.p2 ? "p1" : "p2";
      const primPct = Math.round(primary === "p1" ? p.p1 : p.p2);
      const primaryFull = primaryPole === poles[i][0] ? dimensionData[i].p1 : dimensionData[i].p2;
      const domLevel = categories[i].domLevel;
      const primaryColor = getColorClass(domLevel).split(" ")[0];
      return (
        <span key={i} className={primaryColor}>
          <strong>{primaryFull}</strong>
        </span>
      );
    })
    .reduce((acc, curr, i) => {
      if (i > 0) acc.push(<span key={`sep-${i}`}> · </span>);
      acc.push(curr);
      return acc;
    }, []);

  const dimensionSummaries = percents.map((p, i) => {
    const dimData = getDimPoles(i, dominants, percents);
    const primaryPole = dimData.primaryPole;
    const secPole = dimData.secPole;
    const primaryPct = dimData.primaryPct;
    const secPct = dimData.secPct;
    const domLevel = categories[i]?.domLevel?.toLowerCase() || "mild";
    const infLevel = categories[i]?.infLevel?.toLowerCase() || "high";
    const primaryFull = primaryPole === poles[i][0] ? dimensionData[i].p1 : dimensionData[i].p2;
    const secondaryFull = primaryPole === poles[i][0] ? dimensionData[i].p2 : dimensionData[i].p1;
    const primaryColor = getColorClass(domLevel).split(" ")[0];
    const secondaryColor = getColorClass(infLevel).split(" ")[0];
    const dimensionKey = dimensionData[i]?.title?.replace(/[\s-]/g, "") || "";

    const summaries = {
      InformationProcessing: {
        mild: (
          <>
            You lean slightly toward{" "}
            <span className={primaryColor}>
              <strong>
                {primaryFull} ({primaryPct}%)
              </strong>
            </span>{" "}
            for big ideas and possibilities, but frequently check{" "}
            <span className={secondaryColor}>
              <strong>
                {secondaryFull} ({secPct}%)
              </strong>
            </span>{" "}
            for practical details.
          </>
        ),
        balanced: (
          <>
            You are perfectly balanced between{" "}
            <span className={primaryColor}>
              <strong>
                {primaryFull} ({primaryPct}%)
              </strong>
            </span>{" "}
            and{" "}
            <span className={secondaryColor}>
              <strong>
                {secondaryFull} ({secPct}%)
              </strong>
            </span>
            , using both with equal ease.
          </>
        ),
      },
      DecisionMaking: {
        mild: (
          <>
            You make decisions with a slight preference for{" "}
            <span className={primaryColor}>
              <strong>
                {primaryFull} ({primaryPct}%)
              </strong>
            </span>{" "}
            guided by values, but often incorporate{" "}
            <span className={secondaryColor}>
              <strong>
                {secondaryFull} ({secPct}%)
              </strong>
            </span>{" "}
            for balance.
          </>
        ),
        balanced: (
          <>
            You are perfectly balanced between{" "}
            <span className={primaryColor}>
              <strong>
                {primaryFull} ({primaryPct}%)
              </strong>
            </span>{" "}
            and{" "}
            <span className={secondaryColor}>
              <strong>
                {secondaryFull} ({secPct}%)
              </strong>
            </span>
            , blending logic and empathy fluidly.
          </>
        ),
      },
      EnergyOrientation: {
        mild: (
          <>
            You draw energy slightly more from{" "}
            <span className={primaryColor}>
              <strong>
                {primaryFull} ({primaryPct}%)
              </strong>
            </span>
            , but comfortably tap into{" "}
            <span className={secondaryColor}>
              <strong>
                {secondaryFull} ({secPct}%)
              </strong>
            </span>{" "}
            in social or reflective contexts.
          </>
        ),
        balanced: (
          <>
            You are perfectly balanced between{" "}
            <span className={primaryColor}>
              <strong>
                {primaryFull} ({primaryPct}%)
              </strong>
            </span>{" "}
            and{" "}
            <span className={secondaryColor}>
              <strong>
                {secondaryFull} ({secPct}%)
              </strong>
            </span>
            , recharging equally in solitude and company.
          </>
        ),
      },
      ChangeApproach: {
        mild: (
          <>
            You prefer a slightly structured{" "}
            <span className={primaryColor}>
              <strong>
                {primaryFull} ({primaryPct}%)
              </strong>
            </span>{" "}
            approach, but adapt to{" "}
            <span className={secondaryColor}>
              <strong>
                {secondaryFull} ({secPct}%)
              </strong>
            </span>{" "}
            when flexibility is needed.
          </>
        ),
        balanced: (
          <>
            You are perfectly balanced between{" "}
            <span className={primaryColor}>
              <strong>
                {primaryFull} ({primaryPct}%)
              </strong>
            </span>{" "}
            and{" "}
            <span className={secondaryColor}>
              <strong>
                {secondaryFull} ({secPct}%)
              </strong>
            </span>
            , thriving in both order and spontaneity.
          </>
        ),
      },
      InterpersonalStyle: {
        mild: (
          <>
            You lean toward{" "}
            <span className={primaryColor}>
              <strong>
                {primaryFull} ({primaryPct}%)
              </strong>
            </span>{" "}
            for collaborative or independent work, but comfortably use{" "}
            <span className={secondaryColor}>
              <strong>
                {secondaryFull} ({secPct}%)
              </strong>
            </span>{" "}
            when needed.
          </>
        ),
        balanced: (
          <>
            You are perfectly balanced between{" "}
            <span className={primaryColor}>
              <strong>
                {primaryFull} ({primaryPct}%)
              </strong>
            </span>{" "}
            and{" "}
            <span className={secondaryColor}>
              <strong>
                {secondaryFull} ({secPct}%)
              </strong>
            </span>
            , excelling in both solo and team settings.
          </>
        ),
      },
    };

    const fallback = (
      <>
        <span className={primaryColor}>
          <strong>
            {primaryFull} ({primaryPct}%)
          </strong>
        </span>{" "}
        ↔{" "}
        <span className={secondaryColor}>
          <strong>
            {secondaryFull} ({secPct}%)
          </strong>
        </span>
      </>
    );

    return (
      <motion.li
        key={i}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: i * 0.1 }}
        className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed"
      >
        {summaries[dimensionKey]?.[domLevel] || fallback}
      </motion.li>
    );
  });

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[var(--surface)] p-6 md:p-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-gradient p-8 md:p-12 rounded-2xl shadow-custom-lg border border-[var(--border)] space-y-12"
        >
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4 p-8 md:p-12 bg-gradient-to-br from-[var(--surface-variant)] to-[var(--surface)] rounded-2xl shadow-md"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
              Your CSM Personality Report
            </h1>
            <p className="text-lg md:text-xl italic text-[var(--text-secondary)] max-w-4xl mx-auto leading-relaxed">
              Uncover your cognitive blueprint, revealing how you think, connect, and evolve. Understanding yourself is
              the first step to exploring how you relate to others through the Couple Insights Report.
            </p>
          </motion.div>

          {/* Summary */}
          <section className="space-y-6">
            <h2 className="section-header text-3xl md:text-4xl font-bold text-[var(--text-primary)] border-b-2 border-[var(--accent)]/20 pb-3">
              Summary
            </h2>
            <div className="card-gradient p-6 md:p-8 rounded-2xl shadow-md border border-[var(--border)] space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-[var(--text-secondary)]">Your Type:</p>
                  <p className="text-2xl font-bold text-[var(--text-primary)]">{archetype.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-secondary)]">5-letter Spectrum:</p>
                  <p className="text-xl font-mono text-[var(--accent)]">{typeCode}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--text-secondary)]">Your Essence:</p>
                <p className="text-base italic text-[var(--text-primary)] leading-relaxed">
                  {archetype.essencePhrase ||
                    "A wise nurturer who guides others toward their potential using deep insight and compassion."}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">Primary Spectrum:</p>
                <p className="text-base text-[var(--text-secondary)]">{spectrumBalance}</p>
              </div>
              <div>
                <ul className="space-y-3 text-sm md:text-base">{dimensionSummaries}</ul>
              </div>
            </div>
          </section>

          {/* Essence */}
          <section className="space-y-6">
            <h2 className="section-header text-3xl md:text-4xl font-bold text-[var(--text-primary)] border-b-2 border-[var(--accent)]/20 pb-3">
              The Essence of the {archetype.name}
            </h2>
            {renderSection("essence")}
          </section>

          {/* Dimensional Profile */}
          <section className="space-y-6">
            <h2 className="section-header text-3xl md:text-4xl font-bold text-[var(--text-primary)] border-b-2 border-[var(--accent)]/20 pb-3">
              Your Dimensional Profile
            </h2>
            <div className="text-center space-y-4 max-w-4xl mx-auto mb-8">
              <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
                The following section outlines your cognitive dimensions, highlighting your primary and secondary
                preferences across five key areas: Information Processing, Decision-Making, Energy Orientation, Change
                Approach, and Interpersonal Style.
              </p>
              <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
                Your primary preference represents your dominant cognitive approach, while the secondary indicates a
                less frequent but accessible style. Understanding both reveals your core strengths and growth areas.
              </p>
            </div>
            {renderSection("dimensionalProfile")}
          </section>

          {/* Next Steps */}
          <section className="space-y-6">
            <h2 className="section-header text-3xl md:text-4xl font-bold text-[var(--text-primary)] border-b-2 border-[var(--accent)]/20 pb-3">
              Next Steps: Understanding Your Relational Blueprint
            </h2>
            <div className="max-w-4xl mx-auto space-y-4 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
              {reportTemplates[typeCode]?.relationships?.[overallDomLevel.toLowerCase()] && (
                <p>{reportTemplates[typeCode].relationships[overallDomLevel.toLowerCase()][0]}</p>
              )}
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: fixedNextSteps.replace(/\n/g, "<br/><br/>") }}
              />
            </div>
          </section>

          {/* CTA */}
          <div className="text-center pt-8">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCouplesReportClick}
              className="btn-primary py-4 px-10 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl inline-flex items-center gap-3 group"
            >
              Get Your Couple Insight Report
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
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
      </AnimatePresence>
    </motion.main>
  );
}
