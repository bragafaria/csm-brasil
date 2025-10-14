"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useParams, useRouter } from "next/navigation";
import { Users, Heart, Calendar, Target, Star } from "lucide-react";
import FinancesPlanningPage from "@/app/components/couples/FinancesPlanningPage";
import { motion } from "framer-motion";
import CareerPlanningPage from "@/app/components/couples/CarrerPlanningPage";
import LoveRomancePage from "@/app/components/couples/LoveRomancePage";
import FamilyHomePage from "@/app/components/couples/FamilyHomePage";
import CommunicationConflictPage from "@/app/components/couples/CommunicationConflictPage";
import LeisureAdventurePage from "@/app/components/couples/LeisureAdventurePage";
import PersonalGrowthPage from "@/app/components/couples/PersonalGrowthPage";
import SocialConnectionsPage from "@/app/components/couples/SocialConnectionPage";
import HealthWellnessPage from "@/app/components/couples/HealthWellnessPage";
import LegacyImpactPage from "@/app/components/couples/LegacyImpactPage";

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
        .select("id, name, typeCode, dominants, percents, categories, has_assessment, partner_id")
        .eq("site_id", siteId)
        .eq("report_status", "pending")
        .in("id", [
          userId,
          (await supabase.from("users").select("partner_id").eq("id", userId).single()).data.partner_id,
        ]);

      if (error || !userData || userData.length < 2) {
        console.error("Error fetching user data:", error?.message || "Insufficient data");
        setError("Failed to load partner data.");
        setIsLoaded(true);
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
          id: partnerA.id,
          name: partnerA.name,
          typeCode: partnerA.typeCode,
          dominants: parseJsonb(partnerA.dominants),
          percents: parseJsonb(partnerA.percents),
          categories: parseJsonb(partnerA.categories),
          has_assessment: partnerA.has_assessment,
        },
        partnerB: {
          id: partnerB.id,
          name: partnerB.name,
          typeCode: partnerB.typeCode,
          dominants: parseJsonb(partnerB.dominants),
          percents: parseJsonb(partnerB.percents),
          categories: parseJsonb(partnerB.categories),
          has_assessment: partnerB.has_assessment,
        },
      });
      setIsLoaded(true);
    }

    fetchReportData();
  }, [siteId, router]);

  if (!isLoaded) {
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
      <div className="p-6">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Couple Insights Report</h1>
        <div className="card-gradient p-6 rounded-xl shadow-custom">
          <p className="text-[var(--text-secondary)]">
            Both partners must complete the assessment to view this report.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      {/* Hero Section */}

      {/* Love and Romance */}
      <LoveRomancePage />
      {/* Carrer Planning */}
      <CareerPlanningPage />
      {/* Family and Home */}
      <FamilyHomePage />
      {/* Financial Harmony */}
      <FinancesPlanningPage />
      {/* Communication and Conflict */}
      <CommunicationConflictPage />
      {/* Leisure and Adventure */}
      <LeisureAdventurePage />
      {/* Personal Growth */}
      <PersonalGrowthPage />
      {/* Social Connections */}
      <SocialConnectionsPage />
      {/* Health and Wellness */}
      <HealthWellnessPage />
      {/* Legacy Impact */}
      <LegacyImpactPage />
    </div>
  );
}
