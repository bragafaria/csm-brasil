// app/dashboard/[siteId]/personal-report/[userName]/page.js
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import {
  CircleAlert,
  CheckCircle,
  HelpCircle,
  X,
  Share2,
  Twitter,
  Copy,
  MessageCircle,
  Send,
  ArrowRight,
} from "lucide-react";
import { reportTemplates } from "@/app/lib/personal/personal-report-data";
import Spinner from "@/app/components/ui/Spinner";
import LZString from "lz-string";
import { PieChart } from "@mui/x-charts/PieChart";

// === SAFE JSON PARSER ===
const safeParse = (value, fallback = []) => {
  if (!value) return fallback;
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch (e) {
      console.warn("Failed to parse JSON field:", e, value);
      return fallback;
    }
  }
  return value;
};

// === CONSTANTS ===
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

const poleFullName = {
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

const dimensionLabels = [
  "Information Processing",
  "Decision-Making",
  "Energy Orientation",
  "Change Approach",
  "Interpersonal Style",
];

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

export default function PersonalReportPage() {
  const { siteId, userName } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const [showShareModal, setShowShareModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [shareUrl, setShareUrl] = useState(null);

  const params = useParams();

  const createSlug = (name) =>
    name
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "";

  // === FETCH DATA FROM DB ===
  useEffect(() => {
    async function fetchData() {
      if (!siteId || !userName) {
        setError("Invalid URL.");
        setLoading(false);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }

      const userId = session.user.id;

      const { data: partnerA, error: errA } = await supabase
        .from("users")
        .select("id, name, partner_id, percents, dominants, categories, has_assessment")
        .eq("id", siteId)
        .single();

      if (errA || !partnerA) {
        setError("Failed to load data.");
        setLoading(false);
        return;
      }

      const isPartnerA = userId === siteId;
      const isPartnerB = partnerA.partner_id && userId === partnerA.partner_id;

      if (!isPartnerA && !isPartnerB) {
        setError("Access denied.");
        setLoading(false);
        return;
      }

      let userData;
      if (createSlug(partnerA.name) === userName) {
        userData = partnerA;
      } else if (partnerA.partner_id) {
        const { data: partnerB, error: errB } = await supabase
          .from("users")
          .select("name, percents, dominants, categories, has_assessment")
          .eq("id", partnerA.partner_id)
          .single();
        if (errB || !partnerB || createSlug(partnerB.name) !== userName) {
          setError("User not found.");
          setLoading(false);
          return;
        }
        userData = partnerB;
      } else {
        setError("Partner not found.");
        setLoading(false);
        return;
      }

      if (!userData.has_assessment) {
        setError("Assessment not completed.");
        setLoading(false);
        return;
      }

      const percents = safeParse(userData.percents, []);
      const dominants = safeParse(userData.dominants, []);
      const categories = safeParse(userData.categories, []);

      // === VALIDATE DATA FORMAT ===
      if (
        !Array.isArray(percents) ||
        percents.length !== 5 ||
        !Array.isArray(dominants) ||
        dominants.length !== 5 ||
        !Array.isArray(categories) ||
        categories.length !== 5
      ) {
        setError("Invalid assessment data format.");
        setLoading(false);
        return;
      }

      const typeCodeWithDashes = dominants.join("-");
      const tmpl = reportTemplates[typeCodeWithDashes];
      if (!tmpl || !tmpl.dimensionalProfile?.dimensions) {
        setError("Report template not found or missing dimensions.");
        setLoading(false);
        return;
      }

      setData({
        name: userData.name,
        percents,
        dominants,
        categories,
        typeCode: typeCodeWithDashes,
        archetypeName: tmpl.summaryEssence.name || "Unknown",
        tmpl,
      });
      setLoading(false);
    }

    fetchData();
  }, [siteId, userName, router]);

  const openModal = (title, body) => {
    setModalContent({ title, body });
    setShowModal(true);
  };

  // === SHARE LOGIC ===
  const generateShareableLink = async () => {
    const jsonStr = JSON.stringify({
      userName: data.name,
      results: {
        percents: data.percents,
        dominants: data.dominants,
        archetype: { name: data.archetypeName },
        typeCode: data.typeCode,
      },
    });
    const compressed = LZString.compressToEncodedURIComponent(jsonStr);
    const longUrl = `${window.location.origin}/report/${data.typeCode}?data=${compressed}`;
    return await shortenUrl(longUrl);
  };

  const shortenUrl = async (longUrl) => {
    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalURL: longUrl,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.secureShortURL; // Returns: https://go.csmynamics.com/xxxxx
      }
    } catch (err) {
      console.error("URL shorten failed", err);
    }
    return longUrl; // Fallback to long URL if shortening fails
  };

  const shareVia = async (platform) => {
    if (!shareUrl || isGeneratingLink) {
      console.error("Share URL not ready");
      return;
    }

    // FIX: Use 'name' from data, not 'userName' from params
    const shareText = `Hey, it's ${name}! I just took the CSM personality assessment and got "${archetypeName}" type. It was way more accurate than I expected. Take a look:`;
    const shareData = {
      title: `I'm The ${archetypeName} (${typeCode})`,
      text: shareText,
      url: shareUrl,
    };

    if (platform === "native" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== "AbortError") {
          fallbackCopy(shareData);
        }
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
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
      window.open(telegramUrl, "_blank");
    } else if (platform === "facebook") {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
      window.open(facebookUrl, "_blank", "width=600,height=400");
    }
  };

  const fallbackCopy = ({ text, url }) => {
    const fullText = `${text} ${url}`;

    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(fullText)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 3000);
        })
        .catch((err) => {
          console.error("Clipboard write failed:", err);
          // Fallback to textarea method for iOS
          fallbackToTextArea(fullText);
        });
    } else {
      // Use textarea method for older browsers/iOS
      fallbackToTextArea(fullText);
    }
  };

  const fallbackToTextArea = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);

    // For iOS
    textArea.contentEditable = true;
    textArea.readOnly = false;

    // Select text
    if (navigator.userAgent.match(/ipad|iphone/i)) {
      const range = document.createRange();
      range.selectNodeContents(textArea);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      }
    } catch (err) {
      console.error("Fallback copy failed:", err);
    }

    document.body.removeChild(textArea);
  };

  const getLevel = (primaryPct) => {
    if (primaryPct >= 86) return { dom: "Strong", inf: "Low" };
    if (primaryPct >= 66) return { dom: "Moderate", inf: "Moderate" };
    return { dom: "Mild", inf: "High" };
  };

  const getColor = (level) =>
    ({
      Mild: { border: "border-green-400/20", text: "text-green-400", bg: "bg-green-400", from: "from-green-500/10" },
      Moderate: {
        border: "border-yellow-400/20",
        text: "text-yellow-400",
        bg: "bg-yellow-400",
        from: "from-yellow-500/10",
      },
      Strong: { border: "border-red-400/20", text: "text-red-400", bg: "bg-red-400", from: "from-red-500/10" },
      High: { border: "border-red-400/20", text: "text-red-400", bg: "bg-red-400", from: "from-red-500/10" },
      Low: { border: "border-green-400/20", text: "text-green-400", bg: "bg-green-400", from: "from-green-500/10" },
    })[level] || { border: "border-gray-400/20", text: "text-gray-400", bg: "bg-gray-400", from: "from-gray-500/10" };

  // === RENDER STATES ===
  if (loading)
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-6">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto p-6 mt-20 max-w-7xl">
        <div className="card-gradient p-8 rounded-lg shadow-custom max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{error}</h1>
          <button onClick={() => router.push(`/dashboard/${siteId}`)} className="btn-primary mt-6 px-6 py-3 rounded-lg">
            Back to Dashboard
          </button>
        </div>
      </div>
    );

  if (!data) return null;

  const { name, percents, dominants, typeCode, archetypeName, tmpl } = data;

  // Calculate DPS values
  const dps = percents.map((p) => Math.abs(p.p1 - p.p2));
  const pieData = dps.map((value, index) => ({
    id: index,
    value,
    label: dimensionLabels[index],
    color: colors[index],
  }));

  // === FALLBACK DESCRIPTIONS ===
  const fallbackDesc = {
    C: "Focuses on tangible, verifiable data; practical, detail-oriented.",
    N: "Focuses on patterns, possibilities, theories; imaginative, forward-looking.",
    L: "Objective logic, cause-and-effect; seeks truth via systemic analysis.",
    V: "Personal values, human impact; seeks harmony via emotional alignment.",
    O: "External stimulation via action; recharges socially.",
    I: "Internal stimulation via reflection; recharges in solitude.",
    S: "Prefers planning, organization; outward Judging (L/V).",
    F: "Prefers spontaneity, flexibility; outward Perceiving (C/N).",
    H: "Collaboration, collective goals; group-focused modes.",
    A: "Self-reliance, personal objectives; individual-focused modes.",
  };

  return (
    <div className="container mx-auto p-2 md:p-6 max-w-4xl">
      {/* HERO */}
      <div className="hero-gradient rounded-lg p-6 md:p-8 shadow-custom-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white">Your CSM Personality Report</h1>
            <p className="text-[var(--text-secondary)] text-base md:text-lg mt-2">
              {`Uncover your cognitive blueprint, revealing how you think, connect, and evolve. Understanding yourself is
              the first step to exploring how you relate to others through the Couple's Insights Report.`}
            </p>
          </div>
        </div>
      </div>

      {/* ==================== SUMMARY ==================== */}
      <section className="max-w-4xl mx-auto mt-8 space-y-8 text-[var(--text-secondary)] leading-relaxed scroll mb-8">
        <div className="card-gradient md:p-6 rounded-lg shadow-custom">
          {/* ==================== CSM DIMENSIONS EXPLANATION ==================== */}
          <div className="mt-8 p-6 md:p-8 bg-gradient-to-br from-[var(--surface-variant)] to-[var(--surface)] rounded-xl border border-[var(--border)] shadow-lg">
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4 text-center">
                Quick Overview
              </h3>

              <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed text-center">
                The Cognitive Spectrum Model (CSM) breaks down how your mind works into five independent dimensions,
                each like a slider between two opposite poles that shape the way you think, decide, and interact.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Dimension 1 - Information Processing */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-5 hover:bg-white/10 transition-all">
                <h4 className="font-bold text-[var(--accent)] text-lg mb-3 text-center">Information Processing</h4>
                <div className="space-y-3 text-sm text-[var(--text-secondary)]">
                  {/* Concrete */}
                  <div className="flex items-center gap-3">
                    <div className="bg-[var(--surface3)] text-white font-black text-xs w-7 h-7 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                      C
                    </div>
                    <div>
                      <strong className="text-[var(--text-primary)]">Concrete (C):</strong> Facts, details, real.
                    </div>
                  </div>

                  {/* Abstract */}
                  <div className="flex items-center gap-3">
                    <div className="bg-[var(--surface3)] text-white font-black text-xs w-7 h-7 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                      N
                    </div>
                    <div>
                      <strong className="text-[var(--text-primary)]">Abstract (N):</strong> Patterns, ideas,
                      possibilities.
                    </div>
                  </div>
                </div>
              </div>

              {/* Dimension 2 - Decision-Making */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-5 hover:bg-white/10 transition-all">
                <h4 className="font-bold text-[var(--accent)] text-lg mb-3 text-center">Decision-Making</h4>
                <div className="space-y-3 text-sm text-[var(--text-secondary)]">
                  <div className="flex items-center gap-3">
                    <div className="bg-[var(--surface3)] text-white font-black text-xs w-7 h-7 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                      L
                    </div>
                    <div>
                      <strong className="text-[var(--text-primary)]">Analytical Logic (L):</strong> Rules, data, logic.
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-[var(--surface3)] text-white font-black text-xs w-7 h-7 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                      V
                    </div>
                    <div>
                      <strong className="text-[var(--text-primary)]">Empathic Values (V):</strong> Feelings, harmony,
                      people.
                    </div>
                  </div>
                </div>
              </div>

              {/* Dimension 3 - Energy Orientation */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-5 hover:bg-white/10 transition-all">
                <h4 className="font-bold text-[var(--accent)] text-lg mb-3 text-center">Energy Orientation</h4>
                <div className="space-y-3 text-sm text-[var(--text-secondary)]">
                  <div className="flex items-center gap-3">
                    <div className="bg-[var(--surface3)] text-white font-black text-xs w-7 h-7 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                      O
                    </div>
                    <div>
                      <strong className="text-[var(--text-primary)]">Outward (O):</strong> Action, social, external.
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-[var(--surface3)] text-white font-black text-xs w-7 h-7 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                      I
                    </div>
                    <div>
                      <strong className="text-[var(--text-primary)]">Inward (I):</strong> Reflection, solitude, inner.
                    </div>
                  </div>
                </div>
              </div>

              {/* Dimension 4 - Change Approach */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-5 hover:bg-white/10 transition-all">
                <h4 className="font-bold text-[var(--accent)] text-lg mb-3 text-center">Change Approach</h4>
                <div className="space-y-3 text-sm text-[var(--text-secondary)]">
                  <div className="flex items-center gap-3">
                    <div className="bg-[var(--surface3)] text-white font-black text-xs w-7 h-7 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                      S
                    </div>
                    <div>
                      <strong className="text-[var(--text-primary)]">Stable Structure (S):</strong> Plans, order,
                      predictable.
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-[var(--surface3)] text-white font-black text-xs w-7 h-7 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                      F
                    </div>
                    <div>
                      <strong className="text-[var(--text-primary)]">Adaptive Flexibility (F):</strong> Spontaneity,
                      flow, flexible.
                    </div>
                  </div>
                </div>
              </div>

              {/* Dimension 5 - Interpersonal Style (centered) */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-5 hover:bg-white/10 transition-all md:col-span-2 md:max-w-md md:mx-auto">
                <h4 className="font-bold text-[var(--accent)] text-lg mb-3 text-center">Interpersonal Style</h4>
                <div className="space-y-3 text-sm text-[var(--text-secondary)]">
                  <div className="flex items-center gap-3">
                    <div className="bg-[var(--surface3)] text-white font-black text-xs w-7 h-7 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                      H
                    </div>
                    <div>
                      <strong className="text-[var(--text-primary)]">Collaborative Harmony (H):</strong> Team,
                      consensus, group.
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-[var(--surface3)] text-white font-black text-xs w-7 h-7 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                      A
                    </div>
                    <div>
                      <strong className="text-[var(--text-primary)]">Independent Autonomy (A):</strong> Solo, freedom,
                      self.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--border)] pt-6">
              <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed text-center italic">
                Your unique mix across these poles in each dimension creates your cognitive profile. No pole is better,
                just different strengths and growth areas.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-[var(--text-primary)] pl-4 md:pl-1 mb-6 mt-10 md:mt-20 text-left">
            Summary
          </h2>

          <div className="space-y-5">
            <div className="space-y-6 justify-between">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border border-white/20 bg-white/5 p-4 rounded-lg">
                  <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">User:</p>
                  <p className="text-xl font-bold text-[var(--text-primary)]">{name}</p>
                </div>
                <div className="border border-white/20 bg-white/5 p-4 rounded-lg">
                  <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">Archetype:</p>
                  <p className="text-xl font-bold text-[var(--text-primary)]">{archetypeName}</p>
                </div>
                <div className="border border-white/20 bg-white/5 p-4 rounded-lg">
                  <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">Archetype Code:</p>
                  <p className="text-xl font-bold text-[var(--text-primary)]">{typeCode}</p>
                </div>
              </div>
            </div>
            {/* Essence */}
            <div className="mt-8 md:p-4 bg-white/5 rounded-xl  shadow-lg">
              <div className="flex flex-col max-w-3xl mx-auto border border-white/10 bg-[var(--surface-variant)] rounded-lg p-8 space-y-4 text-left">
                <div className="mb-2">
                  <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mt-8 mb-4 text-center">
                    Your Archetype&apos;s Essence
                  </h3>

                  <p className="text-base text-[var(--text-secondary)] max-w-md mx-auto mb-6 leading-relaxed text-center">
                    Discover the core patterns that define your cognitive style and how you naturally engage with the
                    world.
                  </p>
                </div>
                <div className="space-y-4">
                  {tmpl.detailedEssence.find((item) => item.deepAnalysis)?.deepAnalysis?.length ? (
                    tmpl.detailedEssence
                      .find((item) => item.deepAnalysis)
                      .deepAnalysis.map((paragraph, index) => (
                        <p key={index} className="text-[var(--text-primary)] leading-relaxed">
                          {paragraph}
                        </p>
                      ))
                  ) : (
                    <p className="text-[var(--text-primary)] leading-relaxed">No detailed analysis available.</p>
                  )}
                </div>
              </div>
            </div>

            {/* === POLES PREFERENCES === */}
            <div className="space-y-6 border border-[var(--border)] shadow-lg  bg-white/5 rounded-lg md:p-4">
              {/* ==================== DPS DISTRIBUTION ==================== */}
              <div className="flex flex-col items-center p-4 bg-[var(--surface-variant)] rounded-lg">
                <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mt-10 mb-4 text-center">
                  Dimensional Preference Strength (DPS)
                </h3>

                <p className="text-base text-[var(--text-secondary)] max-w-md mx-auto mb-6 leading-relaxed text-center">
                  {` DPS measures how strongly you lean toward one pole over its opposite on each of the five dimensions.
                  Higher DPS means you rely heavily on one style of thinking (it's your natural default). Lower DPS
                  means you move easily between both poles (you are naturally flexible).`}
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
                <div className="mt-20 p-6 bg-gradient-to-br from-[var(--surface-variant)] to-[var(--surface)] rounded-xl border border-[var(--border)] shadow-lg">
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
                        <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-6 text-center mt-6 md:mt-10">
                          {strongestIndices.length > 1 ? "Your Strongest Dimensions" : "Your Strongest Dimension"}
                        </h3>

                        <div className="space-y-8">
                          {strongestIndices.map((maxDpsIndex, idx) => {
                            const strongestDimension = dimensionLabels[maxDpsIndex];
                            const strongestDpsValue = dps[maxDpsIndex];
                            const dominantPole = dominants[maxDpsIndex];
                            const oppositePole = poleMap[dominantPole];
                            const dominantPoleName = poleToFull[dominantPole];
                            const oppositePoleName = poleToFull[oppositePole];
                            const dimensionColor = colors[maxDpsIndex];

                            return (
                              <div key={maxDpsIndex} className="flex flex-col items-center gap-6">
                                {/* Dimension Badge */}
                                <div className="inline-flex items-center gap-2 md:px-6 py-3 shadow-lg mb-4">
                                  <span className="text-base md:text-xl font-semibold text-white">
                                    {strongestDimension}
                                    {":"}
                                  </span>
                                  <span
                                    className="px-2 md:px-4 py-2 rounded-full text-sm md:text-base font-bold text-white shadow-md"
                                    style={{
                                      backgroundColor: dimensionColor,
                                      boxShadow: `0 4px 14px ${dimensionColor}60`,
                                    }}
                                  >
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
                        <div className="w-full p-4 mt-6 bg-[var(--surface)]/50 rounded-lg ">
                          <p className="text-sm text-center text-[var(--text-secondary)] italic font-light">
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
                {/* === POLES PREFERENCES === */}
                <div className="mt-8 p-6  bg-gradient-to-br from-[var(--surface-variant)] to-[var(--surface)] rounded-xl border border-[var(--border)] shadow-lg">
                  <div className="flex flex-col mt-8 mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-4 text-center">
                      Poles Preferences
                    </h3>
                    <p className="text-base text-[var(--text-secondary)] text-center max-w-md mx-auto mb-6 leading-relaxed">
                      Your natural defaults (Primary) and their opposite growth areas (Secondary) at a glance.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Primary Poles */}
                    <div className="space-y-4 border border-white/10 bg--[var(--surface-variant)] rounded-lg p-5">
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
                    <div className="space-y-4 border border-white/10 bg--[var(--surface-variant)] rounded-lg p-5">
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
            </div>
          </div>

          {/* SHARE BUTTON */}
          <div className="container flex justify-center md:justify-end align-center mx-auto mt-6 max-w-4xl">
            <button
              onClick={async () => {
                setCopySuccess(false); // Reset copy success
                setShareUrl(null); // Clear old URL
                setShowShareModal(true);
                setIsGeneratingLink(true);

                try {
                  const url = await generateShareableLink();
                  console.log("Generated new share URL:", url); // Debug log
                  setShareUrl(url);
                } catch (error) {
                  console.error("Failed to generate share link:", error);
                  setShareUrl(null); // Ensure it's null on error
                } finally {
                  setIsGeneratingLink(false);
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[var(--surface3)] border border-[var(--border)] backdrop-blur-sm rounded-lg hover:bg-[var(--primary)] transition-all mb-6 md:mb-1"
            >
              <Share2 className="w-5 h-5" />
              Share Your Results
            </button>
          </div>
        </div>
      </section>

      {/* ==================== ARCHETYPE IN ACTION ==================== */}
      <section className="max-w-4xl mx-auto space-y-12 text-[var(--text-secondary)] leading-relaxed scroll my-8">
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
            {/* SHARE BUTTON */}
            <div className="container flex justify-center md:justify-end align-center mx-auto mt-6 max-w-4xl">
              <button
                onClick={async () => {
                  setCopySuccess(false); // Reset copy success
                  setShareUrl(null); // Clear old URL
                  setShowShareModal(true);
                  setIsGeneratingLink(true);

                  try {
                    const url = await generateShareableLink();
                    console.log("Generated new share URL:", url); // Debug log
                    setShareUrl(url);
                  } catch (error) {
                    console.error("Failed to generate share link:", error);
                    setShareUrl(null); // Ensure it's null on error
                  } finally {
                    setIsGeneratingLink(false);
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[var(--surface3)] border border-[var(--border)] backdrop-blur-sm rounded-lg hover:bg-[var(--primary)] transition-all mb-6 md:mb-1"
              >
                <Share2 className="w-5 h-5" />
                Share Your Results
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== DIMENSIONAL PROFILE ==================== */}
      <section className="max-w-4xl mx-auto space-y-12 text-[var(--text-secondary)] leading-relaxed scroll">
        <div className="card-gradient p-4 md:p-6 rounded-lg shadow-custom">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6 mt-8 text-left">
            Your Dimensional Profile
          </h2>

          <p className="text-base leading-relaxed text-[var(--text-secondary)] mb-8">
            The five dimensions of the Cognitive Spectrum Model represent the key spectrums that shape how you
            experience and interact with the world. They are not fixed categories but fluid scales that highlight your
            natural tendencies. Understanding them helps you recognize your strengths, notice blind spots, and create
            more balance in how you think and relate to others.
          </p>

          <p className="text-base leading-relaxed text-[var(--text-secondary)] mb-8">
            Each dimension offers insight into your cognitive design, from how you process information to how you make
            decisions, manage energy, approach change, and connect with people. By seeing where you fall on these
            spectrums, you can better appreciate what makes your style unique while also learning how to flex into the
            opposite side when needed.
          </p>

          <p className="text-base leading-relaxed text-[var(--text-secondary)] mb-8">
            This profile is personalized to your results, showing percentages that reveal your specific leanings. Use it
            to reflect on how these preferences show up in your daily choices, relationships, and growth.
          </p>

          {/* {tmpl.detailedEssence.map((item, i) =>
            item.note ? (
              <p key={i} className="italic text-medium text-[var(--text-secondary)] mb-8">
                {item.note}
              </p>
            ) : null
          )} */}

          <div className="space-y-10 mt-20">
            {tmpl.dimensionalProfile.dimensions.map((dim, dimIdx) => {
              const pct = percents[dimIdx];
              const primaryPole = dominants[dimIdx];
              const primaryPct = Math.round(pct.p1 > pct.p2 ? pct.p1 : pct.p2);
              const secondaryPct = 100 - primaryPct;
              const { dom, inf } = getLevel(primaryPct);

              const primaryFull = poleFullName[primaryPole];
              const secondaryFull = poleFullName[poleMap[primaryPole]];

              const primaryDesc =
                dim.descriptions?.[primaryPole] || fallbackDesc[primaryPole] || "Description unavailable.";
              const secondaryDesc =
                dim.descriptions?.[poleMap[primaryPole]] ||
                fallbackDesc[poleMap[primaryPole]] ||
                "Description unavailable.";

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
                  className="group bg-gradient-to-br from-[var(--surface-variant)] to-[var(--surface)] px-2 py-6 md:p-6 rounded-2xl 
                       shadow-lg border border-[rgba(var(--primary-rgb),0.2)] 
                       hover:border-[rgba(var(--primary-rgb),0.4)] 
                       hover:shadow-2xl transition-all duration-300 
                       hover:-translate-y-1 min-h-[400px] flex flex-col space-y-6"
                >
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold text-[var(--text-primary)]">{dim.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] italic ">{dim.subTitle}</p>
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
                  {/* SUMMARY BASED ON DOMINANCE LEVEL */}
                  <div className="mt-6 bg-[var(--surface3)] rounded-2xl px-2 md:px-0 py-6 border-t border-[var(--border)]">
                    <p className="text-base leading-relaxed text-[var(--text-secondary)] italic text-center max-w-2xl mx-auto">
                      {dimIdx === 0 && "Information Processing"}
                      {dimIdx === 1 && "Decision-Making"}
                      {dimIdx === 2 && "Energy Orientation"}
                      {dimIdx === 3 && "Change Approach"}
                      {dimIdx === 4 && "Interpersonal Style"} summary:{" "}
                      <span className="font-semibold not-italic text-[var(--text-primary)]">
                        {primaryPct <= 65 && (
                          <>
                            You have a <span className="text-green-400">Mild Preference</span> ({primaryPct}%{" "}
                            {primaryPole}). This is the most balanced range. You naturally lean toward{" "}
                            {primaryFull.toLowerCase()}, but you switch to the opposite pole often and comfortably. Most
                            people with a Mild preference feel they can “go either way” depending on the situation.
                          </>
                        )}
                        {primaryPct >= 66 && primaryPct <= 85 && (
                          <>
                            You have a <span className="text-yellow-400">Moderate Preference</span> ({primaryPct}%{" "}
                            {primaryPole}). This is the “classic” clear-but-not-extreme lean:{" "}
                            {primaryFull.toLowerCase()} is unmistakably your default mode and feels most natural, yet
                            you can still access and use the opposite side without too much friction when needed.
                          </>
                        )}
                        {primaryPct >= 86 && (
                          <>
                            You have a <span className="text-red-400">Strong Preference</span> ({primaryPct}%{" "}
                            {primaryPole}).
                            {primaryFull} is deeply wired into who you are, and it’s your automatic, effortless way of
                            operating. The opposite pole ({secondaryFull.toLowerCase()}) tends to feel foreign or
                            draining and usually only shows up under pressure or with deliberate effort.
                          </>
                        )}
                      </span>
                    </p>
                  </div>

                  {/* PERSONALIZED PARAGRAPHS */}
                  <div className="mt-6 space-y-4 border-t border-[var(--border)] pt-6 px-2">
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
          {/* SHARE BUTTON */}
          <div className="container flex justify-center md:justify-end align-center mx-auto mt-6 max-w-4xl">
            <button
              onClick={async () => {
                setCopySuccess(false); // Reset copy success
                setShareUrl(null); // Clear old URL
                setShowShareModal(true);
                setIsGeneratingLink(true);

                try {
                  const url = await generateShareableLink();
                  console.log("Generated new share URL:", url); // Debug log
                  setShareUrl(url);
                } catch (error) {
                  console.error("Failed to generate share link:", error);
                  setShareUrl(null); // Ensure it's null on error
                } finally {
                  setIsGeneratingLink(false);
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[var(--surface3)] border border-[var(--border)] backdrop-blur-sm rounded-lg hover:bg-[var(--primary)] transition-all mb-6 md:mb-1"
            >
              <Share2 className="w-5 h-5" />
              Share Your Results
            </button>
          </div>
        </div>
      </section>

      {/* ==================== HOW YOU CONNECT ==================== */}
      <section className="max-w-4xl mx-auto space-y-8 text-[var(--text-secondary)] leading-relaxed scroll mt-8 mb-12">
        <div className="card-gradient p-6 rounded-lg shadow-custom">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6 mt-8 text-left">How You Connect</h2>

          <p className="text-base leading-relaxed text-[var(--text-secondary)] mb-8">{tmpl.relationships?.intro}</p>

          <p className="text-base leading-relaxed text-[var(--text-secondary)] mb-8">
            Every relationship creates a different dynamic based on how two personalities think, feel, and interact.
            Below, you will see how your archetype relates to others in four types of compatibility. Each one highlights
            what the connection may feel like, whether it flows easily, brings balance, encourages growth, or may
            require more effort.{" "}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {tmpl.relationships?.compatibility?.matches?.map((match, i) => (
              <div
                key={i}
                className="p-5 rounded-lg bg-[var(--surface)] border border-[var(--border)] shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-center mb-2">
                  <span className="text-lg font-medium text-[var(--accent)]">{match.type}</span>
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <h4 className="font-semibold text-[var(--text-primary)] mb-1">{match.name}</h4>
                  <span className="text-sm font-mono text-[var(--text-secondary)]">({match.code})</span>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-4 text-center">{match.reason}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-[var(--border)] pt-8 mt-8">
            <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-4">
              Next Steps: Understanding Your Relationship Blueprint
            </h3>
            <p className="text-base leading-relaxed text-[var(--text-secondary)]">
              {`Now that you've explored your own cognitive patterns, the natural next step is seeing how they interact
              with your partner's.`}
            </p>
            <p className="text-base leading-relaxed text-[var(--text-secondary)] mt-4">
              {`The CSM Couple's Insights Report shows how your two minds interact, offering guidance to strengthen
              alignment, work through friction, and grow together with intention. Curious how your blueprints align?
              Find out in your Couple's Report.`}
            </p>
          </div>
        </div>
      </section>
      <section className="max-w-4xl mx-auto text-center mt-12">
        <button
          id="couples-report-cta"
          onClick={() => {
            router.push(`/dashboard/${siteId}/couples-report/how-you-connect`);
          }}
          className={
            "inline-flex items-center btn-primary px-8 py-6 rounded-lg font-semibold cursor-pointer gap-2 transition-all hover:shadow-lg mb-10"
          }
        >
          Discover How You Connect
          <ArrowRight className="h-5 w-5" />
        </button>
      </section>

      {/* ==================== SHARE MODAL ==================== */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowShareModal(false);
              setShareUrl(null);
              setIsGeneratingLink(false);
              setCopySuccess(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[var(--surface2)] border border-[var(--border)] backdrop-blur-surface2 rounded-2xl shadow-2xl max-w-sm w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <Share2 className="w-6 h-6 text-[var(--text-primary)]" />
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">Share Your Results</h3>
                </div>
                <button
                  onClick={() => {
                    setShowShareModal(false);
                    setShareUrl(null);
                    setIsGeneratingLink(false);
                    setCopySuccess(false);
                  }}
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)]"
                  disabled={isGeneratingLink}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Loading State */}
              {isGeneratingLink && (
                <div className="space-y-4 mb-6">
                  <div className="flex flex-col items-center justify-center py-8">
                    <Spinner />
                    <p className="text-[var(--text-secondary)] mt-4 text-sm">Generating your shareable link...</p>
                  </div>
                </div>
              )}

              {/* Share Buttons - Disabled during loading */}
              <div className={`space-y-3 ${isGeneratingLink ? "opacity-50 pointer-events-none" : ""}`}>
                <button
                  onClick={() => shareVia("whatsapp")}
                  disabled={isGeneratingLink || !shareUrl}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#1da851] transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MessageCircle className="w-5 h-5" />
                  Share on WhatsApp
                </button>
                <button
                  onClick={() => shareVia("telegram")}
                  disabled={isGeneratingLink || !shareUrl}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#0088cc] text-white rounded-lg hover:bg-[#0077b3] transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  Share on Telegram
                </button>
                <button
                  onClick={() => shareVia("facebook")}
                  disabled={isGeneratingLink || !shareUrl}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#166fe5] transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Share on Facebook
                </button>
                <button
                  onClick={() => shareVia("twitter")}
                  disabled={isGeneratingLink || !shareUrl}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a91da] transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Twitter className="w-5 h-5" />
                  Share on Twitter
                </button>
                <button
                  onClick={() => shareVia("copy")}
                  disabled={isGeneratingLink || !shareUrl}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--surface-variant)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--surface)] transition font-medium border border-[var(--border)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Copy className="w-5 h-5" />
                  Copy Link
                </button>
              </div>

              {/* Status Messages */}
              <div className="text-xs text-[var(--text-secondary)] text-center mt-4">
                {isGeneratingLink ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
                    Generating short link...
                  </div>
                ) : copySuccess ? (
                  <div className="flex items-center justify-center gap-2 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    Link copied successfully!
                  </div>
                ) : shareUrl ? (
                  "Your full report is included in the link."
                ) : (
                  <div className="text-red-400">Failed to generate link. Please try again.</div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== HELP MODAL ==================== */}
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
    </div>
  );
}
