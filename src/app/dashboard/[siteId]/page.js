// app/dashboard/[siteId]/page.js
"use client";

import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import InviteSection from "../../components/InviteSection";

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

  useEffect(() => {
    async function initializeDashboard() {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError || !session) {
          console.error("Session error:", sessionError?.message || "No session found", sessionError);
          setError("You must be logged in to view this dashboard.");
          setLoading(false);
          router.push("/login");
          return;
        }
        console.log("Initializing dashboard for user:", { userId: session.user.id, siteId });

        const userId = session.user.id;

        // Validate access
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("id, partner_id, has_paid, has_assessment")
          .eq("id", userId)
          .single();

        if (userError || !userData) {
          console.error("User fetch error:", userError?.message || "No user found", userError);
          setError("User profile not found. Please sign up or log in again.");
          await supabase.auth.signOut();
          setLoading(false);
          router.push("/login");
          return;
        }

        const isPartnerA = userId === siteId;
        const isPartnerB = userData.partner_id === siteId;

        if (!isPartnerA && !isPartnerB) {
          console.error("Access denied: User not associated with this dashboard", {
            userId,
            siteId,
            partnerId: userData.partner_id,
          });
          setError("You do not have access to this dashboard.");
          setLoading(false);
          return;
        }

        // Check if InviteSection should be shown (only for Partner A)
        if (isPartnerA) {
          const { data: partnerAData, error: partnerAError } = await supabase
            .from("users")
            .select("partner_id, has_paid")
            .eq("id", siteId)
            .single();

          if (partnerAError || !partnerAData) {
            console.error("Partner A fetch error:", partnerAError?.message || "No user found for siteId", siteId);
            setError("Failed to load dashboard data.");
            setLoading(false);
            return;
          }

          // Check for invite existence
          const { data: inviteData, error: inviteError } = await supabase
            .from("invite")
            .select("id")
            .eq("user_id", siteId)
            .single();

          setShowInviteSection(!partnerAData.partner_id && partnerAData.has_paid && !!inviteData);
          console.log("InviteSection visibility:", {
            partnerId: partnerAData.partner_id,
            hasPaid: partnerAData.has_paid,
            inviteExists: !!inviteData,
            inviteError: inviteError?.message,
          });
        }

        if (isPartnerB && !userData.has_assessment) {
          setShowAssessmentPrompt(true);
        }

        setLoading(false);
      } catch (err) {
        console.error("Unexpected error in initializeDashboard:", err.message, err.stack);
        setError("An unexpected error occurred while loading the dashboard.");
        setLoading(false);
      }
    }

    if (inviteId) {
      async function validateInvite() {
        try {
          console.log("Validating invite:", { siteId, inviteId });
          const { data, error } = await supabase
            .from("invite")
            .select("id")
            .eq("user_id", siteId)
            .eq("invite", inviteId)
            .single();

          if (error || !data) {
            console.error("Invalid invite:", error?.message || "No invite found", { siteId, inviteId });
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
              console.log("User already associated with dashboard, redirecting:", { userId, siteId });
              router.push(`/dashboard/${siteId}`);
              return;
            }

            console.log("Existing session found on invite validation - signing out");
            await supabase.auth.signOut();
          }

          router.push(`/invite/signup?invite=${inviteId}&siteId=${siteId}`);
        } catch (err) {
          console.error("Unexpected error in validateInvite:", err.message, err.stack);
          router.push("/error?message=Failed to validate invite link");
        }
      }
      validateInvite();
    } else if (sessionId) {
      console.log("Handling post-payment redirect with session_id:", sessionId);
      router.replace(`/dashboard/${siteId}`);
    } else {
      initializeDashboard();
    }
  }, [inviteId, sessionId, siteId, router]);

  if (inviteId || sessionId || loading) {
    return <div className="p-6 text-[var(--text-primary)]">Processing...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-400">{error}</div>;
  }

  return (
    <div className="p-6 mt-20">
      <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Welcome to Your Dashboard</h1>
      {showAssessmentPrompt && (
        <div className="bg-[var(--surface)] p-6 rounded-xl shadow-custom mb-6">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Complete Your Assessment</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            Please complete your assessment to view your personal report.
          </p>
          <button
            onClick={() => router.push(`/dashboard/${siteId}/csm-assessment`)}
            className="btn-primary py-2 px-4 rounded-lg font-semibold"
          >
            Take Assessment
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[var(--surface)] p-6 rounded-xl shadow-custom">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Quick Stats</h2>
          <p className="text-[var(--text-secondary)]">View your latest insights here.</p>
        </div>
        <div className="bg-[var(--surface)] p-6 rounded-xl shadow-custom">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Recent Activity</h2>
          <p className="text-[var(--text-secondary)]">Check your recent sessions.</p>
        </div>
        <div className="bg-[var(--surface)] p-6 rounded-xl shadow-custom">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Notifications</h2>
          <p className="text-[var(--text-secondary)]">Stay updated with alerts.</p>
        </div>
        {showInviteSection && <InviteSection siteId={siteId} />}
      </div>
    </div>
  );
}
