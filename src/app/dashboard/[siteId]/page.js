"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import InviteSection from "../../components/InviteSection";
import { use } from "react";

export default function DashboardPage({ params }) {
  const { siteId } = use(params);
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
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
        auth: { persistSession: true },
      });

      // Check session
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
      console.log("Initializing dashboard for user:", { userId, siteId });
      console.log("Session:", session);

      // Validate access: user must be Partner A (siteId) or Partner B (partner_id = siteId)
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id, partner_id, has_paid, has_assessment")
        .eq("id", userId)
        .single();

      if (userError || !userData) {
        console.error("User fetch error:", userError?.message);
        setError("User profile not found. Please sign up or log in again.");
        await supabase.auth.signOut();
        router.push("/login");
        setLoading(false);
        return;
      }

      const isPartnerA = userId === siteId;
      const isPartnerB = userData.partner_id === siteId;

      if (!isPartnerA && !isPartnerB) {
        console.error("Access denied: User not associated with this dashboard", { userId, siteId });
        setError("You do not have access to this dashboard.");
        setLoading(false);
        return;
      }

      // Check if InviteSection should be shown (only for Partner A if partner_id is null and has_paid is true)
      if (isPartnerA) {
        const { data: partnerAData, error: partnerAError } = await supabase
          .from("users")
          .select("partner_id, has_paid")
          .eq("id", siteId)
          .single();

        if (partnerAError) {
          console.error("Partner A fetch error:", partnerAError.message);
          setError("Failed to load dashboard data.");
          setLoading(false);
          return;
        }

        setShowInviteSection(!partnerAData.partner_id && partnerAData.has_paid);
      }

      console.log("isPartnerB?", isPartnerB);
      console.log("userId", userId);
      console.log("userData.has_assessment", userData.has_assessment);
      console.log("userdata", userData);

      // Show assessment prompt for Partner B if has_assessment is false
      if (isPartnerB && !userData.has_assessment) {
        setShowAssessmentPrompt(true);
      }

      setLoading(false);
    }

    if (inviteId) {
      async function validateInvite() {
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
          auth: { persistSession: true },
        });

        console.log("Validating invite:", { siteId, inviteId });

        const { data, error } = await supabase
          .from("invite")
          .select("id")
          .eq("user_id", siteId)
          .eq("invite", inviteId)
          .single();

        if (error || !data) {
          console.error("Invalid invite:", error?.message);
          router.push("/error?message=Invalid invite link");
        } else {
          // Check and sign out if session exists
          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (session) {
            console.log("Existing session found on invite validation - signing out");
            await supabase.auth.signOut();
            localStorage.removeItem("supabase.auth.token");
            localStorage.removeItem("csmAnswers");
            router.refresh();
          }
          router.push(`/invite/signup?invite=${inviteId}&siteId=${siteId}`);
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
    return <div>Processing...</div>;
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
            onClick={() => router.push(`/dashboard/${siteId}/test`)} // Adjust route as needed
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
