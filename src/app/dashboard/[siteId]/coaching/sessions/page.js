// app/dashboard/[siteId]/coaching/sessions/page.js
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import { BookOpen, SquarePen, List, UserStar } from "lucide-react";
import CoachProfile from "@/app/components/sessions/CoachProfile";
import ViewSessions from "@/app/components/sessions/ViewSessions";
import WriteSession from "@/app/components/sessions/WriteSession";
import { motion } from "framer-motion";
import Spinner from "@/app/components/ui/Spinner";

export default function SessionsPage() {
  const router = useRouter();
  const { siteId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState("write");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPartnerA, setIsPartnerA] = useState(false);
  const [isPartnerB, setIsPartnerB] = useState(false);

  const handleTabChange = (tab) => {
    setShowContent(tab);
  };

  useEffect(() => {
    async function initializeSessions() {
      if (!siteId) {
        console.error("Invalid siteId:", siteId);
        setError("Invalid dashboard URL.");
        setLoading(false);
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
          setError("You must be logged in to view this page.");
          setLoading(false);
          setIsLoaded(true);
          router.push("/login");
          return;
        }

        const userId = session.user.id;

        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("id, partner_id")
          .eq("id", userId)
          .maybeSingle();

        if (userError || !userData) {
          console.error("User fetch error:", userError?.message || "No user found", userError);
          setError("User profile not found. Please sign up or log in again.");
          setLoading(false);
          setIsLoaded(true);
          await supabase.auth.signOut();
          router.push("/login");
          return;
        }

        const isPartnerA = userId === siteId;
        const isPartnerB = userData.partner_id && siteId === userData.partner_id;

        if (!isPartnerA && !isPartnerB) {
          console.error("Access denied: User not associated with this dashboard", {
            userId,
            siteId,
            partnerId: userData.partner_id,
          });
          setError("You do not have access to this dashboard.");
          setLoading(false);
          setIsLoaded(true);
          return;
        }

        setIsPartnerA(isPartnerA);
        setIsPartnerB(isPartnerB);
        setLoading(false);
        setIsLoaded(true);
      } catch (err) {
        console.error("Unexpected error in initializeSessions:", err.message, err);
        setError("An unexpected error occurred while loading the page.");
        setLoading(false);
        setIsLoaded(true);
      }
    }

    initializeSessions();
  }, [router, siteId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6 bg-[var(--surface)]">
        <Spinner>Loading...</Spinner>
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

  return (
    <div className="min-h-screen bg-[var(--surface)] py-4 px-2 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="container mx-auto max-w-4xl"
      >
        {/* Hero Header */}
        <div className="hero-gradient rounded-lg p-6 md:p-8 mb-8 shadow-custom-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <BookOpen className="text-white flex-shrink-0" size={32} />
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-white">Sessões de CSM</h1>
              <p className="text-[var(--text-secondary)] text-base md:text-lg mt-2">
                Participe de uma autorreflexão guiada com base no seu arquétipo CSM.
              </p>
            </div>
          </div>
        </div>

        {/* Tabbed Content */}
        <div className="card-gradient rounded-lg shadow-custom overflow-hidden">
          <div className="flex flex-col pl-2 md:pl-10 gap-6 mt-10">
            <p className="text-base font-semibold text-center md:text-left">Escolha:</p>

            {/* Mobile: forced horizontal, smart shrinking via smaller text + tighter padding */}
            <div className="flex justify-center sm:justify-start gap-2 md:gap-4">
              <button
                onClick={() => setShowContent("write")}
                className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-lg font-medium transition-all flex-shrink-0 ${
                  showContent === "write"
                    ? "bg-[var(--primary)] text-white shadow-md"
                    : "text-[var(--text-primary)] hover:bg-[var(--primary)] border border-[var(--border)]"
                }`}
              >
                <SquarePen className="text-[var(--accent)] flex-shrink-0" size={18} />
                <span className="text-sm md:text-base lg:text-lg whitespace-nowrap">Iniciar Sessão</span>
              </button>

              <button
                onClick={() => setShowContent("view")}
                className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-lg font-medium transition-all flex-shrink-0 ${
                  showContent === "view"
                    ? "bg-[var(--primary)] text-white shadow-md"
                    : "text-[var(--text-primary)] hover:bg-[var(--primary)] border border-[var(--border)]"
                }`}
              >
                <List className="text-[var(--accent)] flex-shrink-0" size={18} />
                <span className="text-sm md:text-base lg:text-lg whitespace-nowrap">Ver Sessões</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={showContent}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="px-2 py-6 md:p-8"
          >
            {showContent === "write" && <WriteSession isPartnerA={isPartnerA} onTabChange={handleTabChange} />}
            {showContent === "view" && <ViewSessions />}
            {showContent === "coach" && <CoachProfile />}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
