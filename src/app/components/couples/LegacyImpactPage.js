// app/components/couples/LegacyImpactPage.js
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabaseClient"; // Use singleton
import { motion } from "framer-motion";
import LegacyImpactTemplate from "@/app/lib/couple/LegacyImpactTemplate";

export default function LegacyImpactPage({ reportData: propReportData }) {
  const { siteId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState(propReportData);

  useEffect(() => {
    // If reportData is provided as a prop, use it and skip fetching
    if (propReportData) {
      setLoading(false);
      return;
    }

    // Fallback to fetching data if no prop is provided
    async function fetchReportData() {
      if (!siteId) {
        console.error("Invalid siteId:", siteId);
        setError("Invalid report URL.");
        setLoading(false);
        return;
      }

      try {
        // Check session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError || !session) {
          console.error("Session error:", sessionError?.message || "No session found", sessionError);
          setError("You must be logged in to view this report.");
          setLoading(false);
          router.push("/login");
          return;
        }
        console.log("LegacyImpactPage session user ID:", session.user.id);

        const userId = session.user.id;

        // Fetch Partner A's data (siteId is Partner A's id)
        const { data: partnerAData, error: partnerAError } = await supabase
          .from("users")
          .select("id, name, typeCode, percents, dominants, categories, has_assessment, partner_id")
          .eq("id", siteId)
          .maybeSingle(); // Use maybeSingle

        if (partnerAError || !partnerAData) {
          console.error("Error fetching Partner A:", partnerAError?.message || "No user found for siteId", siteId);
          setError("Failed to load report data.");
          setLoading(false);
          return;
        }

        // Validate access: user must be Partner A or Partner B
        const isPartnerA = userId === siteId;
        const isPartnerB = partnerAData.partner_id && userId === partnerAData.partner_id;

        if (!isPartnerA && !isPartnerB) {
          console.error("Access denied: User not associated with this report", { userId, siteId });
          setError("You do not have access to this report.");
          setLoading(false);
          return;
        }

        // Check if Partner B exists
        if (!partnerAData.partner_id) {
          console.error("Partner B not found: No partner_id for siteId", siteId);
          setError("Partner B has not signed up yet.");
          setLoading(false);
          return;
        }

        // Fetch Partner B's data
        const { data: partnerBData, error: partnerBError } = await supabase
          .from("users")
          .select("id, name, typeCode, percents, dominants, categories, has_assessment")
          .eq("id", partnerAData.partner_id)
          .maybeSingle(); // Use maybeSingle

        if (partnerBError || !partnerBData) {
          console.error(
            "Error fetching Partner B:",
            partnerBError?.message || "No user found for partner_id",
            partnerAData.partner_id
          );
          setError("Failed to load Partner B's report data.");
          setLoading(false);
          return;
        }

        // Handle jsonb data
        const parseJsonb = (data) => {
          if (!data) return [];
          if (typeof data === "string") {
            try {
              return JSON.parse(data);
            } catch (e) {
              console.error("JSON parse error:", e.message, "Data:", data);
              return [];
            }
          }
          return data;
        };

        setReportData({
          partnerA: {
            name: partnerAData.name,
            typeCode: partnerAData.typeCode,
            percents: parseJsonb(partnerAData.percents),
            dominants: parseJsonb(partnerAData.dominants),
            categories: parseJsonb(partnerAData.categories),
            has_assessment: partnerAData.has_assessment,
          },
          partnerB: {
            name: partnerBData.name,
            typeCode: partnerBData.typeCode,
            percents: parseJsonb(partnerBData.percents),
            dominants: parseJsonb(partnerBData.dominants),
            categories: parseJsonb(partnerBData.categories),
            has_assessment: partnerBData.has_assessment,
          },
        });
        setLoading(false);
      } catch (err) {
        console.error("Unexpected error in fetchReportData:", err.message, err);
        setError("An unexpected error occurred while loading the report.");
        setLoading(false);
      }
    }

    if (!propReportData) {
      fetchReportData();
    }
  }, [siteId, router, propReportData]);

  if (loading) {
    console.log("Rendering loading state");
    return <div className="p-6 text-[var(--text-primary)]">Loading report...</div>;
  }
  if (error) {
    console.log("Rendering error state:", error);
    return <div className="p-6 text-red-400">{error}</div>;
  }

  if (!reportData?.partnerA.has_assessment || !reportData?.partnerB.has_assessment) {
    console.log("Rendering assessment incomplete state");
    return (
      <div className="p-6 mt-20">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Legacy & Impact Report</h1>
        <div className="card-gradient p-6 rounded-xl shadow-custom">
          <p className="text-[var(--text-secondary)]">
            Both partners must complete the assessment to view this report.
          </p>
        </div>
      </div>
    );
  }

  const { partnerA, partnerB } = reportData;
  const { description } = LegacyImpactTemplate.generateText(partnerA, partnerB);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex min-h-screen flex-col py-12 px-4 bg-[var(--surface)] text-[var(--text-primary)]"
    >
      <div className="w-full max-w-6xl bg-[var(--surface-variant)] p-10 rounded-2xl shadow-xl border border-[var(--border)] space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 hero-gradient rounded-2xl p-8 mb-8 shadow-custom-lg"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
            Legacy & Impact for {partnerA.name} and {partnerB.name}
          </h1>
          <p className="text-xl italic text-[var(--text-secondary)] max-w-2xl mx-auto">
            Your shared legacy and impact reflect the lasting mark you leave together. Understanding how you both
            approach creating meaning and influence can help you build a purposeful partnership that inspires and
            endures.
          </p>
        </motion.div>

        <section className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-header text-3xl font-semibold text-[var(--text-primary)] border-b-2 border-[var(--accent)]/20 pb-3"
          >
            Your Shared Legacy
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 max-w-3xl mx-auto"
          >
            {description.map((para, idx) => (
              <p key={idx} className="text-lg leading-relaxed text-[var(--text-secondary)]">
                {para}
              </p>
            ))}
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
            onClick={() => router.push(`/dashboard/${siteId}/couples-report`)}
            className="btn-primary font-semibold py-3 px-10 rounded-lg shadow-lg inline-flex items-center group"
          >
            View Full Couple Insight Report
            <span className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform">→</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.main>
  );
}
