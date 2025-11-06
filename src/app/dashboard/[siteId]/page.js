// app/dashboard/[siteId]/page.js
"use client";

import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import InviteSection from "../../components/InviteSection";
import Spinner from "@/app/components/ui/Spinner";

export default function DashboardPage() {
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
          .select("id, name, partner_id, has_paid, has_assessment")
          .eq("id", userId)
          .single();

        if (userError || !userData) {
          setError("User profile not found.");
          await supabase.auth.signOut();
          setLoading(false);
          router.push("/login");
          return;
        }

        const isPartnerA = userId === siteId;
        const isPartnerB = userData.partner_id === siteId;
        setUserInfo(userData.name);

        if (!isPartnerA && !isPartnerB) {
          setError("You do not have access to this dashboard.");
          setLoading(false);
          return;
        }

        if (isPartnerA) {
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

        if (isPartnerB && !userData.has_assessment) {
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
      <div className="flex items-center justify-center min-h-screen p-6">
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
    <div className="container mx-auto p-6 mt-20 max-w-7xl">
      <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-8 text-center md:text-left">
        Welcome to Your Dashboard, {userInfo}.
      </h1>

      {showAssessmentPrompt && (
        <div className="card-gradient p-6 rounded-lg shadow-custom mb-8">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Complete Your Assessment</h2>
          <p className="text-[var(--text-secondary)] mb-5 text-sm md:text-base">
            {"Please complete your assessment to view your report and your couple’s report."}
          </p>
          <button
            onClick={() => router.push(`/dashboard/${siteId}/csm-assessment`)}
            className="btn-primary py-3 px-6 rounded-lg font-semibold transition-all inline-flex items-center group"
          >
            Take Assessment
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
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card-gradient p-6 rounded-lg shadow-custom">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Quick Stats</h2>
          <p className="text-[var(--text-secondary)] text-sm">View your latest insights here.</p>
        </div>
        <div className="card-gradient p-6 rounded-lg shadow-custom">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Recent Activity</h2>
          <p className="text-[var(--text-secondary)] text-sm">Check your recent sessions.</p>
        </div>
        <div className="card-gradient p-6 rounded-lg shadow-custom">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Notifications</h2>
          <p className="text-[var(--text-secondary)] text-sm">Stay updated with alerts.</p>
        </div>
        {showInviteSection && <InviteSection siteId={siteId} />}
      </div>
    </div>
  );
}
