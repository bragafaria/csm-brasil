"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import FinancesPlanningTemplate from "../../utils/FinancialTemplate";

export default function FinancesPlanningPage() {
  const { siteId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    async function fetchReportData() {
      if (!siteId) {
        console.error("Invalid siteId:", siteId);
        setError("Invalid report URL.");
        setLoading(false);
        return;
      }

      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
        auth: { persistSession: true },
      });

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError || !session) {
        console.error("Session error:", sessionError?.message || "No session found");
        router.push("/login");
        return;
      }

      const userId = session.user.id;

      // Fetch both partners using site_id
      const { data: userData, error } = await supabase
        .from("users")
        .select("id, name, typeCode, percents, dominants, categories, has_assessment, partner_id")
        .eq("site_id", siteId)
        .eq("report_status", "pending")
        .in("id", [
          userId,
          (await supabase.from("users").select("partner_id").eq("id", userId).single()).data.partner_id,
        ]);

      if (error || !userData || userData.length < 2) {
        console.error("Error fetching user data:", error?.message || "Insufficient data");
        setError("Failed to load partner data.");
        setLoading(false);
        return;
      }

      // Handle jsonb data (Supabase may return objects or strings)
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

      const [partnerA, partnerB] = userData[0].id === userId ? [userData[0], userData[1]] : [userData[1], userData[0]];

      setReportData({
        partnerA: {
          name: partnerA.name,
          typeCode: partnerA.typeCode,
          percents: parseJsonb(partnerA.percents),
          dominants: parseJsonb(partnerA.dominants),
          categories: parseJsonb(partnerA.categories),
          has_assessment: partnerA.has_assessment,
        },
        partnerB: {
          name: partnerB.name,
          typeCode: partnerB.typeCode,
          percents: parseJsonb(partnerB.percents),
          dominants: parseJsonb(partnerB.dominants),
          categories: parseJsonb(partnerB.categories),
          has_assessment: partnerB.has_assessment,
        },
      });
      setLoading(false);
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

  if (!reportData?.partnerA.has_assessment || !reportData?.partnerB.has_assessment) {
    console.log("Rendering assessment incomplete state");
    return (
      <div className="p-6 mt-20">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Finances & Planning Report</h1>
        <div className="card-gradient p-6 rounded-xl shadow-custom">
          <p className="text-[var(--text-secondary)]">
            Both partners must complete the assessment to view this report.
          </p>
        </div>
      </div>
    );
  }

  const { partnerA, partnerB } = reportData;
  const { description } = FinancesPlanningTemplate.generateText(partnerA, partnerB);

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
            Finances & Planning for {partnerA.name} and {partnerB.name}
          </h1>
          <p className="text-xl italic text-[var(--text-secondary)] max-w-2xl mx-auto">
            Money matters can shape your shared journey, and understanding how you both approach finances helps build a
            stronger partnership. By exploring your unique styles in budgeting, spending, and planning, you can create a
            financial life that feels secure, exciting, and aligned with your dreams together.
          </p>
        </motion.div>

        <section className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-header text-3xl font-semibold text-[var(--text-primary)] border-b-2 border-[var(--accent)]/20 pb-3"
          >
            Your Financial Harmony
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
