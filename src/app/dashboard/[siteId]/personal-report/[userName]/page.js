// app/dashboard/[siteId]/personal-report/[userName]/page.js
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { archetypes, getDimPoles, poles } from "../../../../utils/csm";
import { reportTemplates } from "../../../../lib/personal/ReportTemplates";
import { HelpCircle, ArrowRight } from "lucide-react";

const fixedNextSteps = `You've uncovered the map to your unique cognitive blueprint, a crucial step toward self-insight. Now, explore how your mind connects with your partner's. Your strengths, style, and vulnerabilities interplay with theirs, shaping your relationship's dynamic. The CSM Couple's Insight Report illuminates this connection, offering a tailored guide to navigate alignments, resolve tensions, and build a stronger, more aware partnership through mutual understanding. Discover how your blueprints harmonize to create a shared journey.`;

export default function PersonalReportPage() {
  const { siteId, userName } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const [expanded, setExpanded] = useState({});

  const createSlug = (name) => {
    if (!name) return "";
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  useEffect(() => {
    async function fetchReportData() {
      if (!siteId || !userName) {
        setError("Invalid report URL.");
        setLoading(false);
        return;
      }

      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError || !session) {
          setError("You must be logged in to view this report.");
          setLoading(false);
          router.push("/login");
          return;
        }

        const userId = session.user.id;

        const { data: partnerAData, error: partnerAError } = await supabase
          .from("users")
          .select("id, name, partner_id, percents, dominants, categories, has_assessment")
          .eq("id", siteId)
          .maybeSingle();

        if (partnerAError || !partnerAData) {
          setError("Failed to load report data.");
          setLoading(false);
          return;
        }

        const isPartnerA = userId === siteId;
        const isPartnerB = partnerAData.partner_id && userId === partnerAData.partner_id;

        if (!isPartnerA && !isPartnerB) {
          setError("You do not have access to this report.");
          setLoading(false);
          return;
        }

        const partnerASlug = createSlug(partnerAData.name);

        if (userName === partnerASlug) {
          setReportData({
            name: partnerAData.name,
            percents: partnerAData.percents,
            dominants: partnerAData.dominants,
            categories: partnerAData.categories,
            has_assessment: partnerAData.has_assessment,
          });
          setLoading(false);
          return;
        }

        if (!partnerAData.partner_id) {
          setError("Partner B has not signed up yet.");
          setLoading(false);
          return;
        }

        const { data: partnerBData, error: partnerBError } = await supabase
          .from("users")
          .select("id, name, percents, dominants, categories, has_assessment")
          .eq("id", partnerAData.partner_id)
          .maybeSingle();

        if (partnerBError || !partnerBData) {
          setError("Failed to load Partner B's report data.");
          setLoading(false);
          return;
        }

        const partnerBSlug = createSlug(partnerBData.name);
        if (userName === partnerBSlug) {
          setReportData({
            name: partnerBData.name,
            percents: partnerBData.percents,
            dominants: partnerBData.dominants,
            categories: partnerBData.categories,
            has_assessment: partnerBData.has_assessment,
          });
        } else {
          setError("Invalid report URL.");
        }

        setLoading(false);
      } catch (err) {
        setError("An unexpected error occurred while loading the report.");
        setLoading(false);
      }
    }

    fetchReportData();
  }, [siteId, userName, router]);

  useEffect(() => {
    if (reportData) {
      const percents =
        typeof reportData.percents === "string" ? JSON.parse(reportData.percents || "[]") : reportData.percents || [];
      const categories =
        typeof reportData.categories === "string"
          ? JSON.parse(reportData.categories || "[]")
          : reportData.categories || [];
      const dominants =
        typeof reportData.dominants === "string"
          ? JSON.parse(reportData.dominants || "[]")
          : reportData.dominants || [];
      const typeCode = dominants.length === 5 ? dominants.join("-") : "";
      const archetype = archetypes[typeCode] || { name: "Unknown", description: "No archetype data available." };

      setData({
        percents,
        dominants,
        categories,
        archetype,
        typeCode,
      });
    }
  }, [reportData]);

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
    router.push(`/dashboard/${siteId}/couples-report/report`);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="text-[var(--text-primary)] text-lg font-medium">Loading report...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="text-red-400 text-lg font-medium text-center">{error}</div>
      </div>
    );

  if (!reportData?.has_assessment || !data || !reportTemplates[data.typeCode] || !archetypes[data.typeCode]) {
    return (
      <div className="container mx-auto p-6 mt-20 max-w-7xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-8 text-center">
          Personal Report for {reportData?.name}
        </h1>
        <div className="card-gradient p-6 rounded-lg shadow-custom max-w-2xl mx-auto">
          <p className="text-[var(--text-secondary)] text-center">
            No assessment data available. Please complete the assessment to view your report.
          </p>
        </div>
      </div>
    );
  }

  const { percents, dominants, categories, archetype, typeCode: archetypeType } = data;

  const overallDomLevel = (() => {
    const counts = categories.reduce((acc, { domLevel }) => {
      const key = (domLevel || "mild").toLowerCase();
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    if (counts.balanced) return "Balanced";
    if (counts.strong) return "Strong";
    if (counts.moderate) return "Moderate";
    return "Mild";
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
      Mild: "Your primary preference for {primaryFull} ({primaryPole}) has a slight advantage (51-65%), indicating good flexibility and frequent access to the secondary pole. You may switch between the two more easily in different contexts, leading to a balanced but gently tilted approach. This corresponds to a High secondary influence, making your style adaptable and versatile.",
      Moderate:
        "Your primary preference for {primaryFull} ({primaryPole}) is clearly dominant (66-85%), with noticeable but not overwhelming influence from the secondary. This common range suggests a reliable lean toward one side while still allowing for adaptability and growth through the other. This corresponds to a Moderate secondary influence, providing a solid foundation with room for balance.",
      Strong:
        "Your primary preference for {primaryFull} ({primaryPole}) heavily dominates (86-100%), highlighting a core strength but potential blind spots in the secondary pole. This can manifest as exceptional proficiency in the primary but may require intentional effort to engage the secondary for well-roundedness. This corresponds to a Low secondary influence, emphasizing focused expertise with targeted growth opportunities.",
      Balanced:
        "Your preference for {primaryFull} ({primaryPole}) is perfectly balanced with its opposite (50%), showing exceptional cognitive flexibility. You use both poles with equal ease, adapting fluidly to context. This rare equilibrium makes you highly versatile and adaptable across all situations.",
    };
    return (templates[domLevel] || templates.Mild)
      .replace("{primaryFull}", primaryFull)
      .replace("{primaryPole}", primaryPole);
  };

  const getSecondaryDesc = (secondaryFull, secondaryPole, infLevel) => {
    const templates = {
      High: "The secondary preference for {secondaryFull} ({secondaryPole}) is close to the primary (35-49%), suggesting strong accessibility and frequent use in certain contexts. You can easily tap into this pole, making it a reliable complement to your primary preference. This corresponds to a Mild primary dominance (51-65%), fostering a highly balanced and flexible cognitive style.",
      Moderate:
        "The secondary preference for {secondaryFull} ({secondaryPole}) has a noticeable but not dominant presence (15-34%). It emerges in specific situations but requires some effort to engage fully. This corresponds to a Moderate primary dominance (66-85%), offering a dependable core preference with accessible support for varied challenges.",
      Low: "The secondary preference for {secondaryFull} ({secondaryPole}) is rarely used naturally (0-14%), often functioning as a blind spot or area of discomfort. Engaging it requires significant conscious effort and may be a key growth area. This corresponds to a Strong primary dominance (86-100%), where your expertise shines but intentional development of this area can unlock greater versatility.",
      Balanced:
        "Your secondary preference for {secondaryFull} ({secondaryPole}) is equal in strength to the primary (50%), indicating full cognitive integration. You access both poles seamlessly, with no dominant bias. This perfect balance is a rare strength, enabling fluid adaptation in any context.",
    };
    return (templates[infLevel] || templates.High)
      .replace("{secondaryFull}", secondaryFull)
      .replace("{secondaryPole}", secondaryPole);
  };

  const getInterpretationTitle = (primaryFull, secondaryFull, domLevel, infLevel) => {
    const levelPhrases = {
      "Mild-High": "Balanced Harmony",
      "Moderate-Moderate": "Steady Alignment",
      "Strong-Low": "Focused Edge",
      "Balanced-Balanced": "Perfect Equilibrium",
    };
    const key = `${domLevel}-${infLevel}`;
    return `${levelPhrases[key] || "Dynamic Balance"}: ${primaryFull} and ${secondaryFull}`;
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
      "Mild-High": `With a Mild primary preference for ${primaryFull} and High secondary influence from ${secondaryFull}, your balanced spectrum suggests versatile application of the report's insights. The general analysis provides a flexible foundation—lean into ${primaryFull} for core relational patterns but frequently blend in ${secondaryFull} elements for nuanced, context-specific communication strategies. This adaptability makes the report a dynamic guide rather than a rigid blueprint, allowing you to switch between ${primaryPole} and ${secondaryPole} modes seamlessly across relationship scenarios.`,
      "Moderate-Moderate": `Your Moderate primary preference for ${primaryFull} paired with Moderate secondary influence from ${secondaryFull} indicates a reliable yet adjustable lens for interpreting the report. Use ${primaryFull} as your steady anchor for key themes in couple dynamics, while ${secondaryFull} offers practical support in everyday interactions. The report's general ideas shine here as a balanced roadmap: emphasize ${primaryPole} strengths for consistency, but integrate ${secondaryPole} perspectives to avoid over-reliance and enhance relational flexibility.`,
      "Strong-Low": `Featuring a Strong primary preference for ${primaryFull} and Low secondary influence from ${secondaryFull}, approach the report with focused intensity on ${primaryFull} while mindfully cultivating ${secondaryFull} as a growth edge. The general content highlights your core expertise in ${primaryPole}-driven approaches—apply it deeply where it excels in partnerships—but use the spectrum to identify blind spots, intentionally stretching into ${secondaryPole} areas for comprehensive interpretation. This transforms the report into a targeted tool for mastery and balanced development in relationships.`,
      "Balanced-Balanced": `Your perfect balance between ${primaryFull} and ${secondaryFull} reflects exceptional cognitive flexibility. You seamlessly integrate both ${primaryPole} and ${secondaryPole} approaches, adapting fluidly to any context. The report serves as a mirror of your versatility—use it to refine your already strong ability to shift between modes as needed in relationships. This equilibrium empowers you to navigate any dynamic with ease, making you a natural bridge-builder in partnerships.`,
    };

    const fullText =
      templates[`${domLevel}-${infLevel}`] ||
      `Leverage your ${primaryFull} dominance while exploring ${secondaryFull} for fuller insights.`;

    const previewLength = 140;
    if (fullText.length <= previewLength) {
      return <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{fullText}</p>;
    }
    const previewText = fullText.slice(0, previewLength).replace(/\s+\S*$/, "...");
    return (
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
        {expanded[index] ? fullText : previewText}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toggleExpand(index)}
          className="ml-2 text-[var(--accent)] hover:underline text-sm"
        >
          {expanded[index] ? "(Show less)" : "(Read more)"}
        </motion.button>
      </p>
    );
  };

  const getColorClass = (level) => {
    const colors = {
      Mild: "text-green-400 border-green-400/20",
      Moderate: "text-yellow-400 border-yellow-400/20",
      Strong: "text-red-400 border-red-400/20",
      High: "text-red-400 border-red-400/20",
      Low: "text-green-400 border-green-400/20",
      Balanced: "text-blue-400 border-blue-400/20",
    };
    return colors[level] || "text-gray-400 border-gray-400/20";
  };

  const getProgressColor = (level) => {
    const colors = {
      Mild: "bg-green-400",
      Moderate: "bg-yellow-400",
      Strong: "bg-red-400",
      High: "bg-red-400",
      Low: "bg-green-400",
      Balanced: "bg-blue-400",
    };
    return colors[level] || "bg-gray-400";
  };

  const renderSection = (sectionKey) => {
    const templates = reportTemplates[archetypeType]?.[sectionKey];
    if (!templates) return null;

    if (sectionKey === "dimensionalProfile") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 max-w-3xl mx-auto"
        >
          {templates.dimensions.map((dimTemp, dimIdx) => {
            const dim = { ...dimensionData[dimIdx], index: dimIdx };
            const primaryPole = dominants[dimIdx];
            const primary = percents[dimIdx].p1 > percents[dimIdx].p2 ? "p1" : "p2";
            const primPct = Math.round(primary === "p1" ? percents[dimIdx].p1 : percents[dimIdx].p2);
            const secPct = 100 - primPct;
            const primaryFull = primaryPole === poles[dimIdx][0] ? dim.p1 : dim.p2;
            const secondaryPole = primaryPole === poles[dimIdx][0] ? poles[dimIdx][1] : poles[dimIdx][0];
            const secondaryFull = primaryPole === poles[dimIdx][0] ? dim.p2 : dim.p1;
            const domLevel = categories[dimIdx]?.domLevel || "Mild";
            const infLevel = categories[dimIdx]?.infLevel || "High";
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
            const profileParas = dimTemp[domLevel.toLowerCase()] || dimTemp.mild || [];

            return (
              <motion.div
                key={dimIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: dimIdx * 0.1 }}
                className="card-gradient p-6 rounded-lg shadow-custom border border-[var(--border)] flex flex-col space-y-6"
              >
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-semibold text-[var(--text-primary)]">{dim.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] italic">{dim.subtitle}</p>
                </div>

                <div className="space-y-6">
                  <div className={`card-gradient p-5 rounded-lg border ${primaryColor} space-y-3`}>
                    <div className="text-lg font-medium text-[var(--text-primary)] text-center">
                      {primaryFull} ({primaryPole})
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] text-center italic px-4">{primaryDesc}</p>
                    <div className="space-y-3">
                      <div className={`text-base font-semibold ${primaryColor} text-center`}>{domLevel} Dominance</div>
                      <div className="flex items-center justify-between px-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-[var(--text-primary)]">Primary Preference</span>
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              openModal(
                                "Primary Preference Explanation",
                                getPrimaryDesc(primaryFull, primaryPole, domLevel)
                              )
                            }
                            className={`p-1 rounded-full ${primaryColor}`}
                          >
                            <HelpCircle className="h-4 w-4" />
                          </motion.button>
                        </div>
                        <span className={`text-xl font-bold ${primaryColor}`}>{primPct}%</span>
                      </div>
                      <div className="w-full bg-[var(--surface-variant)] rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${primPct}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`${primaryProgressColor} h-3 rounded-full`}
                        ></motion.div>
                      </div>
                    </div>
                  </div>

                  <div className={`card-gradient p-5 rounded-lg border ${secondaryColor} space-y-3`}>
                    <div className="text-lg font-medium text-[var(--text-primary)] text-center">
                      {secondaryFull} ({secondaryPole})
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] text-center italic px-4">{secondaryDesc}</p>
                    <div className="space-y-3">
                      <div className={`text-base font-semibold ${secondaryColor} text-center`}>
                        {infLevel} Influence
                      </div>
                      <div className="flex items-center justify-between px-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-[var(--text-primary)]">Secondary Influence</span>
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              openModal(
                                "Secondary Influence Explanation",
                                getSecondaryDesc(secondaryFull, secondaryPole, infLevel)
                              )
                            }
                            className={`p-1 rounded-full ${secondaryColor}`}
                          >
                            <HelpCircle className="h-4 w-4" />
                          </motion.button>
                        </div>
                        <span className={`text-xl font-bold ${secondaryColor}`}>{secPct}%</span>
                      </div>
                      <div className="w-full bg-[var(--surface-variant)] rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${secPct}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`${secondaryProgressColor} h-3 rounded-full`}
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-gradient p-5 rounded-lg border border-[var(--border)]/50">
                  <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">{interpretationTitle}</h4>
                  {interpretationIntro}
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[var(--accent)]">{profileTitle}</h4>
                  <div className="space-y-4">
                    {profileParas.map((p, pIdx) => (
                      <p key={pIdx} className="text-base leading-relaxed text-[var(--text-secondary)]">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      );
    }

    const levelKey = overallDomLevel.toLowerCase();
    const content = templates[levelKey] || templates.mild || [];
    if (!content.length) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {content.map((para, idx) => (
          <p key={idx} className="text-lg leading-relaxed text-[var(--text-secondary)] max-w-3xl mx-auto">
            {para}
          </p>
        ))}
      </motion.div>
    );
  };

  const spectrumBalance = percents
    .map((p, i) => {
      const primaryPole = dominants[i];
      const primary = p.p1 > p.p2 ? "p1" : "p2";
      const primPct = Math.round(primary === "p1" ? p.p1 : p.p2);
      const primaryFull = primaryPole === poles[i][0] ? dimensionData[i].p1 : dimensionData[i].p2;
      const domLevel = categories[i]?.domLevel || "Mild";
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
        className="text-base text-[var(--text-secondary)] leading-relaxed"
      >
        {summaries[dimensionKey]?.[domLevel] || fallback}
      </motion.li>
    );
  });

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex min-h-screen flex-col py-12 px-4 bg-[var(--surface)] text-[var(--text-primary)]"
    >
      <div className="w-full max-w-6xl mx-auto bg-[var(--surface-variant)] p-10 rounded-lg shadow-custom-lg border border-[var(--border)] space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 hero-gradient rounded-lg p-8 mb-8 shadow-custom-lg"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
            Your CSM Personality Report
          </h1>
          <p className="text-xl italic text-[var(--text-secondary)] max-w-2xl mx-auto">
            Uncover your cognitive blueprint, revealing how you think, connect, and evolve. Understanding yourself is
            the first step to exploring how you relate to others through the Couple Insights Report.
          </p>
        </motion.div>

        <section className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-header text-3xl font-semibold text-[var(--text-primary)] border-b-2 border-[var(--accent)]/20 pb-3"
          >
            Summary
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-gradient p-8 rounded-lg shadow-custom border border-[var(--border)] space-y-6"
          >
            <div>
              <p className="text-base font-medium text-[var(--text-primary)]">Your Type:</p>
              <p className="text-xl font-semibold text-[var(--text-primary)]">{archetype.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-base font-medium text-[var(--text-primary)]">5-letter Spectrum:</p>
              <p className="text-base font-semibold text-[var(--text-secondary)]">{archetypeType}</p>
            </div>
            <div className="space-y-2">
              <p className="text-base font-medium text-[var(--text-primary)]">Your Essence:</p>
              <p className="text-base italic text-[var(--text-primary)] max-w-2xl">
                {archetype.essencePhrase ||
                  "A wise nurturer who guides others toward their potential using deep insight and compassion."}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-base font-medium text-[var(--text-primary)]">Primary Spectrum:</p>
              <p className="text-base text-[var(--text-secondary)]">{spectrumBalance}</p>
            </div>
            <div>
              <ul className="list-disc list-inside text-base text-[var(--text-secondary)] space-y-3">
                {dimensionSummaries}
              </ul>
            </div>
          </motion.div>
        </section>

        <section className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-header text-3xl font-semibold text-[var(--text-primary)] border-b-2 border-[var(--accent)]/20 pb-3"
          >
            The Essence of the {archetype.name}
          </motion.h2>
          {renderSection("essence")}
        </section>

        <section className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-header text-3xl font-semibold text-[var(--text-primary)] border-b-2 border-[var(--accent)]/20 pb-3"
          >
            Your Dimensional Profile
          </motion.h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              The following section outlines your cognitive dimensions, highlighting your primary and secondary
              preferences across five key areas: Information Processing, Decision-Making, Energy Orientation, Change
              Approach, and Interpersonal Style. Each dimension reflects how you naturally perceive, process, and
              interact with the world, providing a foundation for understanding your unique cognitive style.
            </p>
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              Your primary preference represents your dominant cognitive approach in each dimension, guiding your
              natural tendencies, while the secondary preference indicates a less frequent but still accessible style.
              Understanding both is crucial for interpreting this report, as it reveals your core strengths and
              potential growth areas, enabling you to leverage your dominant traits effectively and develop flexibility
              through your secondary preferences for a more balanced and adaptive approach in relationships and
              decision-making.
            </p>
          </div>
          {renderSection("dimensionalProfile")}
        </section>

        <section className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-header text-3xl font-semibold text-[var(--text-primary)] border-b-2 border-[var(--accent)]/20 pb-3"
          >
            Next Steps: Understanding Your Relational Blueprint
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg leading-relaxed text-[var(--text-secondary)] max-w-3xl mx-auto space-y-4"
          >
            {reportTemplates[archetypeType]?.relationships?.[overallDomLevel.toLowerCase()]?.[0] && (
              <p>{reportTemplates[archetypeType].relationships[overallDomLevel.toLowerCase()][0]}</p>
            )}
            <div dangerouslySetInnerHTML={{ __html: fixedNextSteps.replace(/\n/g, "<br/><br/>") }} />
          </motion.div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCouplesReportClick}
            className="btn-primary font-semibold py-3 px-10 rounded-lg shadow-custom inline-flex items-center group transition-all"
          >
            Get Your Couple Insight Report
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="card-gradient p-8 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto shadow-custom-lg border border-[var(--border)]"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">{modalContent.title}</h3>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeModal}
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)]"
                >
                  ×
                </motion.button>
              </div>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed">{modalContent.body}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
