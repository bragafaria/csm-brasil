// app/report/[typeCode]/page.jsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CircleAlert,
  CheckCircle,
  HelpCircle,
  X,
  Lock,
  Share2,
  Twitter,
  Copy,
  MessageCircle,
  Send,
} from "lucide-react";
import { reportTemplates } from "@/app/lib/personal/personal-report-data";
import { motion, AnimatePresence } from "framer-motion";
import LZString from "lz-string";
import Spinner from "@/app/components/ui/Spinner";
import { PieChart } from "@mui/x-charts/PieChart";

export default function PersonalReport() {
  const { typeCode: urlCode } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const [showShareModal, setShowShareModal] = useState(false);
  const [isSharedView, setIsSharedView] = useState(false);
  const [isShortening, setIsShortening] = useState(false);

  // app/report/[typeCode]/page.jsx
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get("data");

    if (encodedData) {
      // SHARED LINK: Load from URL
      try {
        const decompressed = LZString.decompressFromEncodedURIComponent(encodedData);
        const parsed = JSON.parse(decompressed);
        setData(parsed); // ← Already includes userName
        setIsSharedView(true);
      } catch (err) {
        console.error("Invalid shared data", err);
      }
    } else {
      // ORIGINAL USER: Load from localStorage
      const stored = localStorage.getItem("csmAssessmentData");
      if (stored) {
        const parsed = JSON.parse(stored);
        setData(parsed); // ← Use full object: { userName, results: { ... } }
        setIsSharedView(false);
      }
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-6">
        <p className="text-lg text-[var(--text-primary)]">Loading…</p>
      </div>
    );
  }

  if (!data) return <Spinner />;

  // Extract top-level + nested
  const { userName, results = {} } = data;
  const { percents = [], dominants = [], archetype, typeCode: storedCode } = results;

  // Fallbacks prevent crashes
  if (!percents.length || !dominants.length) {
    return <div>Error: Invalid assessment data.</div>;
  }

  const archetypeName =
    typeof archetype === "object" && archetype?.name ? archetype.name : String(archetype || "Unknown Archetype");

  // Normalize: remove dashes, uppercase → then re-add dashes for template lookup
  const rawCode = (urlCode ?? storedCode)?.replace(/-/g, "").toUpperCase();
  const typeCodeWithDashes = rawCode.split("").join("-");

  const tmpl = reportTemplates[typeCodeWithDashes];
  if (!tmpl) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-6">
        <p className="text-lg text-red-400">Report not found for {typeCodeWithDashes}</p>
      </div>
    );
  }

  const openModal = (title, body) => {
    setModalContent({ title, body });
    setShowModal(true);
  };

  const PRIMARY_EXPLANATION = `
To add greater nuance to your CSM profile, each dimension's preference is expressed as a percentage split between the two poles. 

Primary Preference (above 50%) reflects your dominant approach, This is your natural, go-to way of thinking and processing information in that dimension.

DEGREES OF DOMINANCE:
• Mild Preference (51–65%): Slight advantage, good flexibility, easy access to secondary
• Moderate Preference (66–85%): Clear dominance, reliable lean with some adaptability  
• Strong Preference (86–100%): Heavy dominance, core strength but potential blind spots
`;

  const SECONDARY_EXPLANATION = `
Secondary Preference (below 50%) indicates how accessible the opposite pole is to you. This shows your flexibility and where you can stretch for balance.

DEGREES OF INFLUENCE:
• High Influence (35–49%): Strong accessibility, frequent use, reliable complement
• Moderate Influence (15–34%): Noticeable presence, emerges in specific situations
• Low Influence (0–14%): Rarely used naturally, often a blind spot or growth area


`;

  /* --------------------------------------------------------------
     Dominance Level Calculator (NO 50/50)
     -------------------------------------------------------------- */
  const getLevel = (primaryPct) => {
    if (primaryPct >= 86) return { dom: "Strong", inf: "Low" };
    if (primaryPct >= 66) return { dom: "Moderate", inf: "Moderate" };
    return { dom: "Mild", inf: "High" };
  };

  const poleMap = {
    C: "N",
    N: "C",
    L: "V",
    V: "L",
    O: "I",
    I: "O",
    S: "F",
    F: "S",
    H: "A",
    A: "H",
  };

  const dimensionLabels = [
    "Information Processing",
    "Decision-Making",
    "Energy Orientation",
    "Change Approach",
    "Interpersonal Style",
  ];

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

  const dps = percents.map((p) => Math.abs(p.p1 - p.p2));
  const totalDps = dps.reduce((sum, val) => sum + val, 0);
  const pieData = dps.map((value, index) => ({
    id: index,
    value,
    label: dimensionLabels[index],
    color: colors[index],
  }));

  const shortenUrl = async (longUrl) => {
    try {
      const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
      if (response.ok) return await response.text();
    } catch (err) {
      console.error("URL shorten failed", err);
    }
    return longUrl;
  };

  // === SHARE LOGIC ===
  const generateShareableLink = async () => {
    const payload = {
      ...data,
      userName: data.userName || "Anonymous", // ← ENSURE userName IS INCLUDED
    };
    const jsonStr = JSON.stringify(payload);
    const compressed = LZString.compressToEncodedURIComponent(jsonStr);
    const longUrl = `${window.location.origin}/report/${typeCodeWithDashes}?data=${compressed}`;
    return await shortenUrl(longUrl);
  };
  const shareVia = async (platform) => {
    // Show loading
    setIsShortening(true);

    // Generate short URL once
    const shareUrl = await generateShareableLink();
    const shareText = `Hey, it's ${userName}! I just took the CSM personality assessment and got “The ${archetypeName}” type. It was way more accurate than I expected. Take a look:`;

    const shareData = {
      title: `I'm The ${archetypeName} (${typeCodeWithDashes})`,
      text: shareText,
      url: shareUrl,
    };

    // Hide loading
    setIsShortening(false);

    if (platform === "native" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        fallbackCopy(shareData);
      }
    } else if (platform === "twitter") {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
      window.open(twitterUrl, "_blank");
    } else if (platform === "copy") {
      fallbackCopy(shareData);
    } else if (platform === "whatsapp") {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
      window.open(whatsappUrl, "_blank");
    } else if (platform === "telegram") {
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
        shareText
      )}`;
      window.open(telegramUrl, "_blank");
    } else if (platform === "facebook") {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
      window.open(facebookUrl, "_blank", "width=600,height=400");
    }
  };

  const fallbackCopy = ({ text, url }) => {
    const fullText = `${text} ${url}`;
    navigator.clipboard.writeText(fullText);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* ==================== HERO ==================== */}
      <header className="hero-gradient rounded-lg p-6 md:p-8 shadow-custom-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white">Your CSM Personality Report</h1>
            <p className="text-[var(--text-secondary)] text-base md:text-lg mt-2">
              {`Uncover your cognitive blueprint, revealing how you think, connect, and evolve. Understanding yourself is
              the first step to exploring how you relate to others through the Couple's Insight Report.`}
            </p>
          </div>
        </div>
      </header>

      {/* ==================== 1. Summary ==================== */}
      <section className="max-w-4xl mx-auto space-y-8 text-[var(--text-secondary)] leading-relaxed scroll mb-8">
        <div className="card-gradient p-4 md:p-6 rounded-lg shadow-custom">
          {/* ==================== CSM DIMENSIONS EXPLANATION ==================== */}
          <div className="mt-8 p-6 bg-[var(--surface-variant)] rounded-xl border border-[var(--border)]">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 text-left">Quick Explanation</h2>

            <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed mb-6 text-left max-w-3xl">
              The Cognitive Spectrum Model (CSM) breaks down how your mind works into five independent dimensions, each
              like a slider between two opposite poles that shape the way you think, decide, and interact.
            </p>

            <div className="space-y-6 text-left">
              {/* Dimension 1 */}
              <div>
                <h4 className="font-bold text-[var(--text-primary)] mb-1">Information Processing</h4>
                <ul className="space-y-1 ml-6 text-sm md:text-base text-[var(--text-secondary)]">
                  <li>
                    <strong>Concrete (C):</strong> Facts, details, real.
                  </li>
                  <li>
                    <strong>Abstract (N):</strong> Patterns, ideas, possibilities.
                  </li>
                </ul>
              </div>

              {/* Dimension 2 */}
              <div>
                <h4 className="font-bold text-[var(--text-primary)] mb-1">Decision-Making</h4>
                <ul className="space-y-1 ml-6 text-sm md:text-base text-[var(--text-secondary)]">
                  <li>
                    <strong>Analytical Logic (L):</strong> Rules, data, logic.
                  </li>
                  <li>
                    <strong>Empathic Values (V):</strong> Feelings, harmony, people.
                  </li>
                </ul>
              </div>

              {/* Dimension 3 */}
              <div>
                <h4 className="font-bold text-[var(--text-primary)] mb-1">Energy Orientation</h4>
                <ul className="space-y-1 ml-6 text-sm md:text-base text-[var(--text-secondary)]">
                  <li>
                    <strong>Outward (O):</strong> Action, social, external.
                  </li>
                  <li>
                    <strong>Inward (I):</strong> Reflection, solitude, inner.
                  </li>
                </ul>
              </div>

              {/* Dimension 4 */}
              <div>
                <h4 className="font-bold text-[var(--text-primary)] mb-1">Change Approach</h4>
                <ul className="space-y-1 ml-6 text-sm md:text-base text-[var(--text-secondary)]">
                  <li>
                    <strong>Stable Structure (S):</strong> Plans, order, predictable.
                  </li>
                  <li>
                    <strong>Adaptive Flexibility (F):</strong> Spontaneity, flow, flexible.
                  </li>
                </ul>
              </div>

              {/* Dimension 5 */}
              <div>
                <h4 className="font-bold text-[var(--text-primary)] mb-1">Interpersonal Style</h4>
                <ul className="space-y-1 ml-6 text-sm md:text-base text-[var(--text-secondary)]">
                  <li>
                    <strong>Collaborative Harmony (H):</strong> Team, consensus, group.
                  </li>
                  <li>
                    <strong>Independent Autonomy (A):</strong> Solo, freedom, self.
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-sm md:text-base italic text-[var(--text-secondary)] mt-6 text-left max-w-3xl">
              Your unique mix across these poles in each dimension creates your cognitive profile. No pole is better,
              just different strengths and growth areas.
            </p>
          </div>
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6 mt-8 text-left">Summary</h2>

          <div className="space-y-5">
            <div className="space-y-6 justify-between">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
                <div className="border border-white/20  bg-white/5  p-4 rounded-lg">
                  <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">User:</p>
                  <p className="text-xl font-bold text-[var(--text-primary)]">{userName || "Anonymous"}</p>
                </div>
                <div className="border border-white/20  bg-white/5 p-4 rounded-lg">
                  <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">Archetype:</p>
                  <p className="text-xl font-bold text-[var(--text-primary)]">
                    The {archetypeName}
                    <span></span>
                  </p>
                </div>
                <div className="border border-white/20  bg-white/5 p-4 rounded-lg">
                  <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">Archetype Code:</p>
                  <p className="text-xl font-bold text-[var(--text-primary)]">{typeCodeWithDashes}</p>
                </div>
              </div>
            </div>
            {/* === POLES PREFERENCES === */}
            <div className="space-y-6 border border-white/20  bg-white/5 rounded-lg md:px-4 py-6">
              {/* ==================== DPS DISTRIBUTION ==================== */}
              <div className="flex flex-col items-center p-4 bg-[var(--surface-variant)] rounded-lg">
                {/* Title – centred on every screen */}
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 text-center">
                  Dimensional Preference Strength (DPS)
                </h3>

                {/* Simple explanation */}
                <p className="text-sm text-[var(--text-secondary)] text-center max-w-md mb-6 leading-relaxed">
                  {`DPS measures how strongly you lean toward one pole over its opposite on each of the five
                  dimensions.Higher DPS means you rely heavily on one style of thinking (it's your natural
                  default).Lower DPS means you move easily between both poles (you're naturally flexible.)`}
                </p>

                {/* Pie chart – now uses the **DPS values** (0-100) */}
                <div className="pie-chart-container w-full max-w-md">
                  <PieChart
                    series={[
                      {
                        data: dps.map((value, i) => ({
                          id: i,
                          value, // <-- raw DPS (0-100)
                          label: dimensionLabels[i],
                          color: colors[i],
                        })),
                        innerRadius: 50,
                        outerRadius: 100,
                        paddingAngle: 3,
                        cornerRadius: 5,
                        // Show the **DPS value** directly on the arc
                        arcLabel: (item) => `${item.value}`,
                        arcLabelMinAngle: 20,
                      },
                    ]}
                    width={200}
                    height={300}
                    slotProps={{
                      legend: {
                        direction: "column",
                        position: { vertical: "bottom", horizontal: "middle" },
                        padding: { top: 8 },
                      },
                    }}
                    sx={{
                      /* ----- Legend responsive ----- */
                      "& .MuiChartsLegend-root": {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: { xs: "column", md: "row" },
                        flexWrap: "wrap",
                        gap: { xs: "8px", md: "12px" },
                        textAlign: "center",
                      },
                      "& .MuiChartsLegend-label": {
                        fontSize: { xs: "12px", md: "16px" },
                        fontWeight: 500,
                      },

                      /* ----- Text colour ----- */
                      "& text": { fill: "#f8fafc" },

                      /* ----- Remove any border / stroke ----- */
                      "& .MuiPieArc-root": { stroke: "none !important", strokeWidth: "0 !important" },
                      "& svg, & .MuiChartsSurface-root": { border: "none !important", outline: "none !important" },
                    }}
                  />
                </div>
                {/* DPS Strongest Dimension */}
                {/* DPS Strongest Dimension(s) */}
                <div className="mt-8 p-6 bg-gradient-to-br from-[var(--surface-variant)] to-[var(--surface)] rounded-xl border border-[var(--border)] shadow-lg">
                  {(() => {
                    // Find the maximum DPS value
                    const maxDpsValue = Math.max(...dps);

                    // Find ALL dimensions with that max value (handles ties)
                    const strongestIndices = dps
                      .map((value, index) => (value === maxDpsValue ? index : -1))
                      .filter((index) => index !== -1);

                    const poleToFull = {
                      C: "Concrete Focus",
                      N: "Abstract Insight",
                      L: "Analytical Logic",
                      V: "Empathic Values",
                      O: "Outward Engagement",
                      I: "Inward Reflection",
                      S: "Stable Structure",
                      F: "Adaptive Flexibility",
                      H: "Collaborative Harmony",
                      A: "Independent Autonomy",
                    };

                    return (
                      <>
                        <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-6 text-center">
                          {strongestIndices.length > 1 ? "Your Strongest Dimensions" : "Your Strongest Dimension"}
                        </h3>

                        <div className="space-y-8">
                          {strongestIndices.map((maxDpsIndex, idx) => {
                            const strongestDimension = dimensionLabels[maxDpsIndex];
                            const strongestDpsValue = dps[maxDpsIndex];

                            // Get the dominant pole for this dimension
                            const dominantPole = dominants[maxDpsIndex];
                            const oppositePole = poleMap[dominantPole];

                            const dominantPoleName = poleToFull[dominantPole];
                            const oppositePoleName = poleToFull[oppositePole];

                            return (
                              <div key={maxDpsIndex} className="flex flex-col items-center gap-6">
                                {/* Dimension Badge */}
                                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--primary)] to-purple-600 rounded-full shadow-lg">
                                  <span className="text-base md:text-xl font-bold text-white">
                                    {strongestDimension}
                                  </span>
                                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold text-white">
                                    DPS: {strongestDpsValue}
                                  </span>
                                </div>

                                {/* Two Cards: Natural Default & Growth Opportunity */}
                                <div className="grid md:grid-cols-2 gap-4 md:gap-6 w-full">
                                  {/* Natural Default Card */}
                                  <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                    className="relative overflow-hidden p-6 bg-gradient-to-br from-green-500/10 to-emerald-600/5 rounded-xl border-2 border-green-500/30 shadow-md"
                                  >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />

                                    <div className="relative z-10">
                                      <div className="flex items-center gap-2 mb-3">
                                        <CheckCircle className="w-6 h-6 text-green-400" />
                                        <span className="text-sm font-semibold text-green-400 uppercase tracking-wide">
                                          Natural Default
                                        </span>
                                      </div>

                                      <h4 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2">
                                        {dominantPoleName}
                                      </h4>

                                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                        This is your strongest cognitive preference, your go-to way of processing
                                        information in this dimension. You rely on this naturally and effortlessly.
                                      </p>
                                    </div>
                                  </motion.div>

                                  {/* Growth Opportunity Card */}
                                  <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + idx * 0.1 }}
                                    className="relative overflow-hidden p-6 bg-gradient-to-br from-purple-500/10 to-violet-600/5 rounded-xl border-2 border-purple-500/30 shadow-md"
                                  >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />

                                    <div className="relative z-10">
                                      <div className="flex items-center gap-2 mb-3">
                                        <CircleAlert className="w-6 h-6 text-purple-400" />
                                        <span className="text-sm font-semibold text-purple-400 uppercase tracking-wide">
                                          Growth Opportunity
                                        </span>
                                      </div>

                                      <h4 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2">
                                        {oppositePoleName}
                                      </h4>

                                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                        This is your opposite pole, the area where conscious development can create the
                                        biggest personal expansion and cognitive flexibility.
                                      </p>
                                    </div>
                                  </motion.div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Bottom Insight - Only shown once */}
                        <div className="w-full p-4 mt-6 bg-[var(--surface)]/50 rounded-lg border border-[var(--border)]/50">
                          <p className="text-sm text-center text-[var(--text-secondary)] italic">
                            <strong className="text-[var(--text-primary)]">Insight:</strong> Your high DPS in{" "}
                            {strongestIndices.length > 1
                              ? strongestIndices.map((i, idx) => (
                                  <span key={i}>
                                    {dimensionLabels[i]}
                                    {idx < strongestIndices.length - 2 ? ", " : ""}
                                    {idx === strongestIndices.length - 2 ? " and " : ""}
                                  </span>
                                ))
                              : dimensionLabels[strongestIndices[0]]}{" "}
                            {strongestIndices.length > 1 ? "mean" : "means"} you have pronounced default mode
                            {strongestIndices.length > 1 ? "s" : ""}. Developing your opposite pole
                            {strongestIndices.length > 1 ? "s" : ""} will bring the greatest balance and adaptability to
                            your cognitive toolkit.
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
              {/* === POLES PREFERENCES === */}
              <div className="mt-8 p-6 bg-gradient-to-br from-[var(--surface-variant)] to-[var(--surface)] rounded-xl border border-[var(--border)] shadow-lg">
                <h3 className="text-xl  font-bold text-[var(--text-primary)] mb-4 text-center">Poles Preferences</h3>
                <p className="text-sm text-[var(--text-secondary)] text-center max-w-2xl mx-auto mb-6 leading-relaxed">
                  Your natural defaults (Primary) and their opposite growth areas (Secondary) at a glance.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Primary Poles */}
                  <div className="space-y-4 border border-white/10 bg-white/5 rounded-lg p-5">
                    <div>
                      <p className="text-lg font-bold text-[var(--text-primary)] mb-3">Primary Poles</p>
                      <div className="flex flex-wrap gap-2">
                        {dominants.map((pole, i) => {
                          const pct = Math.round(percents[i].p1 > percents[i].p2 ? percents[i].p1 : percents[i].p2);
                          const level = getLevel(pct).dom;
                          const color = {
                            Mild: "bg-green-500/50",
                            Moderate: "bg-yellow-500/50",
                            Strong: "bg-red-500/50",
                          }[level];

                          const fullName = {
                            C: "Concrete Focus",
                            N: "Abstract Insight",
                            L: "Analytical Logic",
                            V: "Empathic Values",
                            O: "Outward Engagement",
                            I: "Inward Reflection",
                            S: "Stable Structure",
                            F: "Adaptive Flexibility",
                            H: "Collaborative Harmony",
                            A: "Independent Autonomy",
                          }[pole];

                          return (
                            <span
                              key={i}
                              className={`inline-block px-3 py-1.5 rounded-md text-sm md:text-base font-medium text-white ${color} shadow-sm`}
                            >
                              {fullName}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Legend BELOW */}
                    <div className="flex flex-col items-start gap-3 text-xs text-[var(--text-secondary)] pt-3 border-t border-white/10">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium">Primary Degrees of Dominance:</span>
                        <HelpCircle
                          onClick={() => openModal("Primary Degrees of Dominance", PRIMARY_EXPLANATION)}
                          className="h-4 w-4 text-[var(--text-secondary)] cursor-pointer hover:text-[var(--accent)] transition-colors"
                        />
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500/50" />
                          <span>Mild</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                          <span>Moderate</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500/50" />
                          <span>Strong</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Poles */}
                  <div className="space-y-4 border border-white/10 bg-white/5 rounded-lg p-5">
                    <div>
                      <p className="text-lg font-bold text-[var(--text-primary)] mb-3">Secondary Poles</p>
                      <div className="flex flex-wrap gap-2">
                        {dominants.map((pole, i) => {
                          const pct = Math.round(percents[i].p1 > percents[i].p2 ? percents[i].p1 : percents[i].p2);
                          const level = getLevel(pct).inf;
                          const color = {
                            High: "bg-red-500/50",
                            Moderate: "bg-yellow-500/50",
                            Low: "bg-green-500/50",
                          }[level];

                          const secondaryPole = poleMap[pole];
                          const fullName = {
                            C: "Concrete Focus",
                            N: "Abstract Insight",
                            L: "Analytical Logic",
                            V: "Empathic Values",
                            O: "Outward Engagement",
                            I: "Inward Reflection",
                            S: "Stable Structure",
                            F: "Adaptive Flexibility",
                            H: "Collaborative Harmony",
                            A: "Independent Autonomy",
                          }[secondaryPole];

                          return (
                            <span
                              key={i}
                              className={`inline-block px-3 py-1.5 rounded-md text-sm md:text-base font-medium text-white ${color} shadow-sm`}
                            >
                              {fullName}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Legend BELOW */}
                    <div className="flex flex-col items-start gap-3 text-xs text-[var(--text-secondary)] pt-3 border-t border-white/10">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium">Secondary Degrees of Influence:</span>
                        <HelpCircle
                          onClick={() => openModal("Secondary Degrees of Influence", SECONDARY_EXPLANATION)}
                          className="h-4 w-4 text-[var(--text-secondary)] cursor-pointer hover:text-[var(--accent)] transition-colors"
                        />
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500/50" />
                          <span>Low</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                          <span>Moderate</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500/50" />
                          <span>High</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Essence */}
            <div className=" border border-white/20  bg-white/5  p-4 rounded-lg">
              <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">Your Essence:</p>
              <p className="text-base italic text-[var(--text-primary)]">{tmpl.summaryEssence.title}</p>
            </div>
          </div>

          {/* SHARE BUTTON: Only for original user */}

          {!isSharedView && (
            <div className="container flex justify-center md:justify-end mx-auto mt-6 max-w-4xl">
              <button
                onClick={() => setShowShareModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[var(--surface3)] border border-[var(--border)] backdrop-blur-sm rounded-lg hover:bg-[var(--primary)] transition-all"
              >
                <Share2 className="w-5 h-5" />
                Share Your Results
              </button>
            </div>
          )}
        </div>
      </section>
      {/* ==================== 3. YOUR DIMENSIONAL PROFILE ==================== */}
      <section className="max-w-4xl mx-auto space-y-12 text-[var(--text-secondary)] leading-relaxed scroll">
        <div className="card-gradient md:p-6 rounded-lg shadow-custom">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6 mt-8 text-left">
            Your Dimensional Profile
          </h2>

          {/* Introduction */}
          <p className="text-lg leading-relaxed text-[var(--text-secondary)] mb-8">
            {tmpl.dimensionalProfile.introduction}
          </p>

          {/* Note */}
          {tmpl.detailedEssence.map((item, i) =>
            item.note ? (
              <p key={i} className="italic text-medium text-[var(--text-secondary)] mb-8">
                {item.note}
              </p>
            ) : null
          )}

          {/* Dimension Cards */}
          <div className="space-y-10">
            {tmpl.dimensionalProfile.dimensions.map((dim, dimIdx) => {
              const pct = percents[dimIdx];
              const primaryPole = dominants[dimIdx];
              const primaryPct = Math.round(pct.p1 > pct.p2 ? pct.p1 : pct.p2);
              const secondaryPct = 100 - primaryPct;
              const { dom, inf } = getLevel(primaryPct);

              // Map pole to full name
              const poleToFull = {
                C: "Concrete Focus",
                N: "Abstract Insight",
                L: "Analytical Logic",
                V: "Empathic Values",
                O: "Outward Engagement",
                I: "Inward Reflection",
                S: "Stable Structure",
                F: "Adaptive Flexibility",
                H: "Collaborative Harmony",
                A: "Independent Autonomy",
              };
              const primaryFull = poleToFull[primaryPole];
              const secondaryFull = poleToFull[poleMap[primaryPole]];

              // Descriptions
              const descriptions = {
                C: "Focuses on tangible, verifiable data; practical, detail-oriented. Trusts 'what is' over 'what if.'",
                N: "Focuses on patterns, possibilities, theories; imaginative, forward-looking. Explores 'what could be.'",
                L: "Objective logic, cause-and-effect; seeks truth via systemic analysis.",
                V: "Personal values, human impact; seeks harmony via emotional alignment.",
                O: "External stimulation via action; recharges socially.",
                I: "Internal stimulation via reflection; recharges in solitude.",
                S: "Prefers planning, organization; outward Judging (L/V).",
                F: "Prefers spontaneity, flexibility; outward Perceiving (C/N).",
                H: "Collaboration, collective goals; group-focused modes.",
                A: "Self-reliance, personal objectives; individual-focused modes.",
              };

              const primaryDesc = descriptions[primaryPole];
              const secondaryDesc = descriptions[poleMap[primaryPole]];

              // Color logic
              const getColor = (level) =>
                ({
                  Mild: {
                    border: "border-green-400/20",
                    text: "text-green-400",
                    bg: "bg-green-400",
                    from: "from-green-500/10",
                  },
                  Moderate: {
                    border: "border-yellow-400/20",
                    text: "text-yellow-400",
                    bg: "bg-yellow-400",
                    from: "from-yellow-500/10",
                  },
                  Strong: {
                    border: "border-red-400/20",
                    text: "text-red-400",
                    bg: "bg-red-400",
                    from: "from-red-500/10",
                  },
                  High: {
                    border: "border-red-400/20",
                    text: "text-red-400",
                    bg: "bg-red-400",
                    from: "from-red-500/10",
                  },
                  Low: {
                    border: "border-green-400/20",
                    text: "text-green-400",
                    bg: "bg-green-400",
                    from: "from-green-500/10",
                  },
                }[level] || getColor("Mild"));

              const primaryColor = getColor(dom);
              const secondaryColor = getColor(inf);

              return (
                <motion.div
                  key={dimIdx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: "easeOut" },
                    },
                  }}
                  className="group bg-gradient-to-br from-[var(--surface-variant)] to-[var(--surface)] p-2 md:p-6 rounded-2xl 
                       shadow-lg border border-[rgba(var(--primary-rgb),0.2)] 
                       hover:border-[rgba(var(--primary-rgb),0.4)] 
                       hover:shadow-2xl transition-all duration-300 
                       hover:-translate-y-1 min-h-[400px] flex flex-col space-y-6"
                >
                  {/* Title + Subtitle */}
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-[var(--text-primary)]">{dim.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] italic">{dim.subTitle}</p>
                  </div>

                  {/* PRIMARY POLE CARD */}
                  <div
                    className={`bg-gradient-to-r ${primaryColor.from} to-black/10 p-5 rounded-xl border ${primaryColor.border} space-y-3`}
                  >
                    <div className="text-lg font-medium text-[var(--text-primary)] text-center">
                      {primaryFull} ({primaryPole})
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] text-center italic px-4">{primaryDesc}</p>
                    <div className="space-y-3">
                      <div className={`text-base font-bold ${primaryColor.text} text-center`}>{dom} Dominance</div>
                      <div className="flex items-center justify-between px-4">
                        <div className="flex items-center space-x-2 flex-1">
                          <span className="text-sm font-medium text-[var(--text-primary)]">Primary Preference</span>
                          <HelpCircle
                            onClick={() => openModal("Primary Preference", PRIMARY_EXPLANATION)}
                            className={`h-4 w-4 ${primaryColor.text} cursor-pointer hover:scale-110 transition-transform`}
                          />
                        </div>
                        <span className={`text-xl font-bold ${primaryColor.text}`}>{primaryPct}%</span>
                      </div>
                      <div className="w-full bg-[var(--surface-variant)] rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${primaryPct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className={`${primaryColor.bg} h-3 rounded-full`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECONDARY POLE CARD */}
                  <div
                    className={`bg-gradient-to-r ${secondaryColor.from} to-black/10 p-5 rounded-xl border ${secondaryColor.border} space-y-3`}
                  >
                    <div className="text-lg font-medium text-[var(--text-primary)] text-center">
                      {secondaryFull} ({poleMap[primaryPole]})
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] text-center italic px-4">{secondaryDesc}</p>
                    <div className="space-y-3">
                      <div className={`text-base font-bold ${secondaryColor.text} text-center`}>{inf} Influence</div>
                      <div className="flex items-center justify-between px-4">
                        <div className="flex items-center space-x-2 flex-1">
                          <span className="text-sm font-medium text-[var(--text-primary)]">Secondary Influence</span>
                          <HelpCircle
                            onClick={() => openModal("Secondary Influence", SECONDARY_EXPLANATION)}
                            className={`h-4 w-4 ${secondaryColor.text} cursor-pointer hover:scale-110 transition-transform`}
                          />
                        </div>
                        <span className={`text-xl font-bold ${secondaryColor.text}`}>{secondaryPct}%</span>
                      </div>
                      <div className="w-full bg-[var(--surface-variant)] rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${secondaryPct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className={`${secondaryColor.bg} h-3 rounded-full`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* PERSONALIZED PARAGRAPHS */}
                  <div className="mt-6 space-y-4 border-t border-[var(--border)] pt-6">
                    {dim[dom.toLowerCase()]?.map((para, i) => (
                      <p key={i} className="text-base leading-relaxed text-[var(--text-secondary)]">
                        {para}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[var(--surface)] rounded-2xl p-6 md:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-custom-lg border border-[var(--border)]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">{modalContent.title}</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-[var(--text-secondary)] hover:text-[var(--accent)] text-2xl"
                  >
                    ×
                  </button>
                </div>
                <div className="prose dark:prose-invert max-w-none text-[var(--text-secondary)] text-sm leading-relaxed">
                  {modalContent.body.split("\n").map((line, i) => (
                    <p key={i} className="mb-3 last:mb-0">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      {!isSharedView && (
        <div className="container flex justify-center md:justify-end  mx-auto p-6 max-w-4xl">
          <button
            onClick={() => setShowShareModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[var(--surface3)] border border-[var(--border)] backdrop-blur-sm rounded-lg hover:bg-[var(--primary)] transition-all"
          >
            <Share2 className="w-5 h-5" />
            Share Your Results
          </button>
        </div>
      )}

      {/* ==================== 2. YOUR ARCHETYPE IN ACTION ==================== */}
      <section className="max-w-4xl mx-auto space-y-12 text-[var(--text-secondary)] leading-relaxed scroll">
        <div className="card-gradient p-6 rounded-lg shadow-custom">
          <div className="text-left space-y-3">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6 mt-8 text-left">
              Your Archetype in Action
            </h2>
            <p className="text-base md:text-lg text-[var(--text-secondary)] italic leading-relaxed max-w-3xl">
              Explore the real-world strengths that empower you and the challenges that invite growth.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            {/* Strengths */}
            <div>
              <h3 className="text-2xl font-bold text-[var(--accent)] mb-4 md:mb-6 mt-10">Strengths</h3>
              <ul className="space-y-4">
                {tmpl.strengths.results.map((s, i) => (
                  <li key={i} className="flex flex-col gap-3">
                    <div className="flex gap-2 items-start">
                      <CheckCircle className="w-6 h-6 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                      <span className="font-semibold text-[var(--text-primary)]">{s.result}:</span>
                    </div>
                    <div className="pl-8">
                      <span>{s.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges */}
            <div>
              <h3 className="text-2xl font-bold text-[var(--accent)] mb-4 md:mb-6 mt-10">Challenges</h3>
              <ul className="space-y-4">
                {tmpl.weaknesses.results.map((w, i) => (
                  <li key={i} className="flex flex-col gap-3">
                    <div className="flex gap-2 items-start">
                      <CircleAlert className="w-6 h-6 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                      <span className="font-semibold text-[var(--text-primary)]">{w.result}:</span>
                    </div>
                    <div className="pl-8">
                      <span>{w.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {!isSharedView && (
        <div className="container flex justify-center md:justify-end mx-auto p-6 max-w-4xl">
          <button
            onClick={() => setShowShareModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[var(--surface3)] border border-[var(--border)] backdrop-blur-sm rounded-lg hover:bg-[var(--primary)] transition-all"
          >
            <Share2 className="w-5 h-5" />
            Share Your Results
          </button>
        </div>
      )}

      {/* ==================== 4. HOW YOU CONNECT (PREVIEW) ==================== */}
      <section className="max-w-4xl mx-auto space-y-8 text-[var(--text-secondary)] leading-relaxed scroll mb-12">
        <div className="card-gradient p-6 rounded-lg shadow-custom">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6 mt-8 text-left">How You Connect</h2>

          {/* Intro Paragraph */}
          <p className="text-lg leading-relaxed text-[var(--text-secondary)] mb-8">{tmpl.relationships?.intro}</p>

          {/* Compatibility Introduction */}
          <p className="text-base italic text-[var(--text-secondary)] mb-6">
            {tmpl.relationships?.compatibility?.introduction}
          </p>

          {/* Compatibility Matches */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {tmpl.relationships?.compatibility?.matches?.map((match, i) => (
              <div
                key={i}
                onClick={() => {
                  document.getElementById("couples-report-cta")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="p-5 rounded-lg bg-[var(--surface)] border border-[var(--border)] shadow-sm transition-all hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center justify-center mb-2">
                  <span className="text-lg font-medium text-[var(--accent)]">{match.type}</span>
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <h4 className="font-semibold text-[var(--text-primary)] mb-1">{match.name}</h4>
                  <span className="text-sm font-mono text-[var(--text-secondary)]">({match.code})</span>
                </div>

                {/* BLURRED REASON + UNLOCK MESSAGE */}
                <div className="relative mt-8">
                  <p
                    className="text-sm text-[var(--text-secondary)] leading-relaxed blur-sm select-none pointer-events-none"
                    style={{ userSelect: "none" }}
                  >
                    {match.reason}
                  </p>

                  <div className="absolute inset-0 bg-[var(--surface)]/80 backdrop-blur-[1px] rounded-md flex items-center justify-center p-3">
                    <div className="text-center">
                      <Lock className="w-8 h-8 text-[var(--text-primary)] font-bold mx-auto mb-1 drop-shadow-sm" />
                      <p
                        className="text-lg font-extrabold text-[var(--text-secondary)]"
                        style={{
                          textShadow: `0 1px 2px rgba(0, 0, 0, 0.2),
0 0 8px rgba(0, 0, 0, 0.2)`,
                        }}
                      >
                        Unlock full insight
                      </p>
                      <p
                        className="text-sm text-[var(--text-secondary)] mt-1 mb-8"
                        style={{
                          textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        Click to Discover How You Connect
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ==================== NEXT STEPS SUBSECTION ==================== */}
          <div className="border-t border-[var(--border)] pt-8 mt-8">
            <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-4">
              Next Steps: Understanding Your Relationship Blueprint
            </h3>
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              Now that you’ve explored your own cognitive patterns, the natural next step is seeing how they interact
              with your partner’s.
            </p>
            <p className="text-lg leading-relaxed text-[var(--text-secondary)] mt-4">
              The CSM Couple’s Insight Report shows how your two minds interact, offering guidance to strengthen
              alignment, work through friction, and grow together with intention. Curious how your blueprints align?
              Find out in your Couple’s Report.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="max-w-4xl mx-auto text-center mt-12">
        <button
          id="couples-report-cta"
          onClick={() => {
            if (isSharedView) {
              router.push("/");
            } else {
              router.push(`/report/${typeCodeWithDashes}/couples`);
            }
          }}
          className={
            isSharedView
              ? ""
              : "inline-flex items-center btn-primary px-8 py-6 rounded-lg font-semibold cursor-pointer gap-2 transition-all hover:shadow-lg mb-10"
          }
        >
          {isSharedView ? (
            <div className="py-16 bg-gradient-to-r from-[var(--primary)] to-purple-800 rounded-3xl max-w-7xl mx-auto px-6 text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Take the Free Personality Test</h3>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Get your personalized CSM archetype report in under 10 minutes.
              </p>
              <span className="inline-block bg-white text-[var(--primary)] font-bold px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                Start Free Assessment
              </span>
            </div>
          ) : (
            <>
              Discover How You Connect
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </section>

      {/* ==================== SHARE MODAL (Minimal) ==================== */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[var(--surface)] rounded-2xl shadow-2xl max-w-sm w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">Share Your Results</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => shareVia("whatsapp")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#1da851] transition font-medium"
                >
                  <MessageCircle className="w-5 h-5" />
                  Share on WhatsApp
                </button>
                <button
                  onClick={() => shareVia("telegram")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#0088cc] text-white rounded-lg hover:bg-[#0077b3] transition font-medium"
                >
                  <Send className="w-5 h-5" />
                  Share on Telegram
                </button>
                <button
                  onClick={() => shareVia("facebook")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#166fe5] transition font-medium"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Share on Facebook
                </button>
                <button
                  onClick={() => shareVia("twitter")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a91da] transition font-medium"
                >
                  <Twitter className="w-5 h-5" />
                  Share on Twitter
                </button>

                <button
                  onClick={() => shareVia("copy")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--surface-variant)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--surface)] transition font-medium border border-[var(--border)]"
                >
                  <Copy className="w-5 h-5" />
                  Copy Link
                </button>
              </div>

              <div className="text-xs text-[var(--text-secondary)] text-center mt-4">
                {isShortening ? (
                  <div className="flex items-center justify-center gap-2">
                    <Spinner />
                    Generating short link...
                  </div>
                ) : (
                  "Your full report is included in the link."
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
