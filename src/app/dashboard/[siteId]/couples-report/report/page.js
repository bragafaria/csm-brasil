// app/components/couples/CouplesReportPage.js
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import FinancesPlanningPage from "@/app/components/couples/FinancesPlanningPage";
import CareerPlanningPage from "../../../../components/couples/CarrerPlanningPage"; // Fixed typo
import LoveRomancePage from "../../../../components/couples/LoveRomancePage";
import FamilyHomePage from "../../../../components/couples/FamilyHomePage";
import CommunicationConflictPage from "../../../../components/couples/CommunicationConflictPage";
import LeisureAdventurePage from "../../../../components/couples/LeisureAdventurePage";
import PersonalGrowthPage from "../../../../components/couples/PersonalGrowthPage";
import SocialConnectionsPage from "../../../../components/couples/SocialConnectionPage";
import HealthWellnessPage from "../../../../components/couples/HealthWellnessPage";
import LegacyImpactPage from "../../../../components/couples/LegacyImpactPage";

export default function CouplesReportPage() {
  const { siteId } = useParams();
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReportData() {
      if (!siteId) {
        console.error("Invalid siteId:", siteId);
        setError("Invalid report URL.");
        setIsLoaded(true);
        return;
      }

      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError || !session) {
          console.error("Session error:", sessionError?.message || "No session found", sessionError);
          setError("You must be logged in to view this report.");
          setIsLoaded(true);
          router.push("/login");
          return;
        }
        console.log("CouplesReportPage session user ID:", session.user.id);

        const userId = session.user.id;

        const { data: partnerAData, error: partnerAError } = await supabase
          .from("users")
          .select("id, name, typeCode, dominants, percents, categories, has_assessment, partner_id")
          .eq("id", siteId)
          .maybeSingle();

        if (partnerAError || !partnerAData) {
          console.error("Error fetching Partner A:", partnerAError?.message || "No user found for siteId", siteId);
          setError("Failed to load report data.");
          setIsLoaded(true);
          return;
        }

        const isPartnerA = userId === siteId;
        const isPartnerB = partnerAData.partner_id && userId === partnerAData.partner_id;

        if (!isPartnerA && !isPartnerB) {
          console.error("Access denied: User not associated with this report", { userId, siteId });
          setError("You do not have access to this report.");
          setIsLoaded(true);
          return;
        }

        if (!partnerAData.partner_id) {
          console.error("Partner B not found: No partner_id for siteId", siteId);
          setError("Partner B has not signed up yet.");
          setIsLoaded(true);
          return;
        }

        const { data: partnerBData, error: partnerBError } = await supabase
          .from("users")
          .select("id, name, typeCode, dominants, percents, categories, has_assessment")
          .eq("id", partnerAData.partner_id)
          .maybeSingle();

        if (partnerBError || !partnerBData) {
          console.error(
            "Error fetching Partner B:",
            partnerBError?.message || "No user found for partner_id",
            partnerAData.partner_id
          );
          setError("Failed to load Partner B's report data.");
          setIsLoaded(true);
          return;
        }

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
            id: partnerAData.id,
            name: partnerAData.name,
            typeCode: partnerAData.typeCode,
            dominants: parseJsonb(partnerAData.dominants),
            percents: parseJsonb(partnerAData.percents),
            categories: parseJsonb(partnerAData.categories),
            has_assessment: partnerAData.has_assessment,
          },
          partnerB: {
            id: partnerBData.id,
            name: partnerBData.name,
            typeCode: partnerBData.typeCode,
            dominants: parseJsonb(partnerBData.dominants),
            percents: parseJsonb(partnerBData.percents),
            categories: parseJsonb(partnerBData.categories),
            has_assessment: partnerBData.has_assessment,
          },
        });
        setIsLoaded(true);
      } catch (err) {
        console.error("Unexpected error in fetchReportData:", err.message, err);
        setError("An unexpected error occurred while loading the report.");
        setIsLoaded(true);
      }
    }

    fetchReportData();
  }, [siteId, router]);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6 bg-[var(--surface)]">
        <div className="text-[var(--text-primary)] text-lg font-medium">Loading report...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6 bg-[var(--surface)]">
        <div className="text-red-400 text-center text-lg font-medium">{error}</div>
      </div>
    );
  }

  if (!reportData?.partnerA.has_assessment || !reportData?.partnerB.has_assessment) {
    return (
      <div className="container mx-auto p-6 mt-20 max-w-7xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-8 text-center">
          Couple Insights Report
        </h1>
        <div className="card-gradient p-6 rounded-lg shadow-custom max-w-2xl mx-auto text-center">
          <p className="text-[var(--text-secondary)] text-lg">
            Both partners must complete the assessment to view this report.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="container mx-auto p-6 mt-20 max-w-7xl space-y-12"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] text-center mb-10"
      >
        Couple Insights Report
      </motion.h1>

      <div className="grid gap-8 md:gap-12">
        <LoveRomancePage reportData={reportData} />
        <CareerPlanningPage reportData={reportData} />
        <FamilyHomePage reportData={reportData} />
        <FinancesPlanningPage reportData={reportData} />
        <CommunicationConflictPage reportData={reportData} />
        <LeisureAdventurePage reportData={reportData} />
        <PersonalGrowthPage reportData={reportData} />
        <SocialConnectionsPage reportData={reportData} />
        <HealthWellnessPage reportData={reportData} />
        <LegacyImpactPage reportData={reportData} />
      </div>
    </motion.div>
  );
}
