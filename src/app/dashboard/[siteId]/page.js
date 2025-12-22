// app/dashboard/[siteId]/page.js
"use client";

import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import InviteSection from "../../components/InviteSection";
import QuickStats from "@/app/components/QuickStatus";
import Spinner from "@/app/components/ui/Spinner";
import { motion } from "framer-motion";

function DashboardContent() {
  const { siteId } = useParams();
  const searchParams = useSearchParams();
  const inviteId = searchParams.get("invite");
  const sessionId = searchParams.get("session_id");
  const router = useRouter();
  const [showInviteSection, setShowInviteSection] = useState(false);
  const [showAssessmentPrompt, setShowAssessmentPrompt] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isPartnerA, setIsPartnerA] = useState(false);
  const [isPartnerB, setIsPartnerB] = useState(false);

  useEffect(() => {
    async function initializeDashboard() {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError || !session) {
          setError("You must be logged in to view this dashboard.");
          setLoading(false);
          router.push("/login");
          return;
        }

        const userId = session.user.id;

        setUserInfo(session.user);

        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("id, name, partner_id, has_paid, has_assessment, typeCode, report_status")
          .eq("id", userId)
          .single();

        if (userError || !userData) {
          setError("User profile not found.");
          await supabase.auth.signOut();
          setLoading(false);
          router.push("/login");
          return;
        }

        const isPartnerAVal = userId === siteId;
        const isPartnerBVal = userData.partner_id === siteId;
        setUserInfo(userData.name);

        if (!isPartnerAVal && !isPartnerBVal) {
          setError("You do not have access to this dashboard.");
          setLoading(false);
          return;
        }

        setCurrentUser(userData);
        setIsPartnerA(isPartnerAVal);
        setIsPartnerB(isPartnerBVal);

        if (isPartnerAVal) {
          const { data: partnerAData, error: partnerAError } = await supabase
            .from("users")
            .select("partner_id, has_paid")
            .eq("id", siteId)
            .single();

          if (partnerAError || !partnerAData) {
            setError("Failed to load dashboard data.");
            setLoading(false);
            return;
          }

          const { data: inviteData, error: inviteError } = await supabase
            .from("invite")
            .select("id")
            .eq("user_id", siteId)
            .single();

          setShowInviteSection(!partnerAData.partner_id && partnerAData.has_paid && !!inviteData);
        }

        if (isPartnerBVal && !userData.has_assessment) {
          setShowAssessmentPrompt(true);
        }

        setLoading(false);
      } catch (err) {
        setError("An unexpected error occurred.");
        setLoading(false);
      }
    }

    if (inviteId) {
      async function validateInvite() {
        try {
          const { data, error } = await supabase
            .from("invite")
            .select("id")
            .eq("user_id", siteId)
            .eq("invite", inviteId)
            .single();

          if (error || !data) {
            router.push("/error?message=Invalid invite link");
            return;
          }

          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (session) {
            const userId = session.user.id;
            const { data: userData } = await supabase.from("users").select("id, partner_id").eq("id", userId).single();

            if (userData && (userId === siteId || userData.partner_id === siteId)) {
              router.push(`/dashboard/${siteId}`);
              return;
            }
            await supabase.auth.signOut();
          }

          router.push(`/invite/signup?invite=${inviteId}&siteId=${siteId}`);
        } catch (err) {
          router.push("/error?message=Failed to validate invite link");
        }
      }
      validateInvite();
    } else if (sessionId) {
      router.replace(`/dashboard/${siteId}`);
    } else {
      initializeDashboard();
    }
  }, [inviteId, sessionId, siteId, router]);

  if (inviteId || sessionId || loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen p-6">
        <Spinner>Processing...</Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="text-red-400 text-lg font-medium text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 mt-10 max-w-7xl">
      <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-16 text-left">
        Bem-vindo ao seu dashboard, {userInfo}.
      </h1>

      {showAssessmentPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="hero-gradient p-6 rounded-lg shadow-custom hover:shadow-custom-lg transition-all mb-8"
        >
          <div className="flex flex-col items-center my-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-3">
              Conclua sua avaliação
            </h2>
            <p className="text-[var(--text-secondary)] text-center text-lg leading-relaxed">
              {"Por favor, conclua sua avaliação para visualizar seu relatório e o relatório do casal."}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={() => router.push(`/dashboard/${siteId}/csm-assessment`)}
              className="btn-primary border border-white py-3 px-6 rounded-lg font-semibold flex items-center gap-2 whitespace-nowrap shadow-md hover:shadow-lg transition-all"
            >
              Faça a avaliação
              <svg
                className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-6 items-start">
        {showInviteSection && <InviteSection siteId={siteId} />}
        <div className="card-gradient p-6 rounded-lg shadow-custom">
          <div className="flex flex-col items-start my-4">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-1">Status Atual</h2>
            <h3 className="text-sm font-light text-[var(--text-primary)] mb-3">
              <em>(Use o menu para acessar seus relatórios)</em>
            </h3>
          </div>
          <QuickStats userData={currentUser} siteId={siteId} isPartnerA={isPartnerA} isPartnerB={isPartnerB} />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-full min-h-screen p-6">
          <Spinner>Carregando dashboard...</Spinner>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
