// src/app/components/couples/LeisureAdventurePage.js
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabaseClient"; // Use singleton
import { motion } from "framer-motion";
import LeisureAdventureTemplate from "@/app/lib/couple/LeisureAdventureTemplate";

export default function LeisureAdventurePage() {
  const { siteId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    async function fetchReportData() {
      try {
        if (!siteId) {
          console.error("Invalid siteId:", siteId);
          setError("Invalid report URL.");
          setLoading(false);
          return;
        }

        // Check session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError || !session) {
          console.error("Session error:", sessionError?.message || "No session found", sessionError);
          router.push("/login");
          return;
        }

        const userId = session.user.id;

        // Fetch current user to determine role and partner_id
        const { data: currentUser, error: userError } = await supabase
          .from("users")
          .select("id, name, typeCode, percents, dominants, categories, has_assessment, partner_id")
          .eq("id", userId)
          .maybeSingle();

        if (userError || !currentUser) {
          console.error("Error fetching current user:", userError?.message || "No user found", userId, userError);
          setError("User profile not found. Please log in again.");
          await supabase.auth.signOut();
          router.push("/login");
          return;
        }

        // Determine if user is Partner A (siteId = id) or Partner B (siteId = partner_id)
        const isPartnerA = currentUser.id === siteId;
        const isPartnerB = currentUser.partner_id === siteId;

        if (!isPartnerA && !isPartnerB) {
          console.error("Unauthorized access: siteId does not match user.id or partner_id", { userId, siteId });
          setError("You are not authorized to view this report.");
          setLoading(false);
          return;
        }

        // Fetch partner data (if partner_id exists)
        let partnerData = null;
        if (currentUser.partner_id) {
          const { data, error: partnerError } = await supabase
            .from("users")
            .select("id, name, typeCode, percents, dominants, categories, has_assessment")
            .eq("id", currentUser.partner_id)
            .maybeSingle();

          if (partnerError) {
            console.error("Error fetching partner data:", partnerError.message, partnerError);
            setError("Failed to load partner data.");
            setLoading(false);
            return;
          }
          partnerData = data;
        }

        // Parse JSONB data
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

        // Set report data
        const partnerA = isPartnerA ? currentUser : partnerData;
        const partnerB = isPartnerA ? partnerData : currentUser;

        setReportData({
          partnerA: partnerA
            ? {
                name: partnerA.name || "Partner A",
                typeCode: partnerA.typeCode || "",
                percents: parseJsonb(partnerA.percents),
                dominants: parseJsonb(partnerA.dominants),
                categories: parseJsonb(partnerA.categories),
                has_assessment: partnerA.has_assessment || false,
              }
            : null,
          partnerB: partnerB
            ? {
                name: partnerB.name || "Partner B",
                typeCode: partnerB.typeCode || "",
                percents: parseJsonb(partnerB.percents),
                dominants: parseJsonb(partnerB.dominants),
                categories: parseJsonb(partnerB.categories),
                has_assessment: partnerB.has_assessment || false,
              }
            : null,
        });
        setLoading(false);
      } catch (err) {
        console.error("Unexpected error in fetchReportData:", err.message, err);
        setError("An unexpected error occurred while loading the report.");
        setLoading(false);
      }
    }

    fetchReportData();
  }, [siteId, router]);

  if (loading) {
    console.log("Rendering loading state");
    return <div className="p-6 text-[var(--text-primary)]">Loading report...</div>;
  }
  if (error) {
    console.log("Rendering error state:", error);
    return <div className="p-6 text-red-400">{error}</div>;
  }

  if (!reportData?.partnerA?.has_assessment || !reportData?.partnerB?.has_assessment) {
    console.log("Rendering assessment incomplete state");
    return (
      <div className="p-6 mt-20">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Leisure & Adventure Report</h1>
        <div className="card-gradient p-6 rounded-xl shadow-custom">
          <p className="text-[var(--text-secondary)]">
            {reportData?.partnerA?.has_assessment
              ? "Your partner must complete the assessment to view this report."
              : "You must complete the assessment to view this report."}
          </p>
        </div>
      </div>
    );
  }

  const { partnerA, partnerB } = reportData;
  const { description } = LeisureAdventureTemplate.generateText(partnerA, partnerB);

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
            Leisure & Adventure for {partnerA.name} and {partnerB.name}
          </h1>
          <p className="text-xl italic text-[var(--text-secondary)] max-w-2xl mx-auto">
            Your shared leisure and adventurous pursuits bring joy and excitement to your relationship. Understanding
            how you both approach relaxation and exploration can help you create memorable experiences and deepen your
            bond.
          </p>
        </motion.div>

        <section className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-header text-3xl font-semibold text-[var(--text-primary)] border-b-2 border-[var(--accent)]/20 pb-3"
          >
            Your Leisure Harmony
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
