// app/dashboard/[siteId]/coaching/sessions/page.js
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { BookOpen, SquarePen, List, UserStar, Target } from "lucide-react";
import CoachProfile from "@/app/components/sessions/CoachProfile";
import StartSession from "@/app/components/sessions/StartSession";
import ViewSessions from "@/app/components/sessions/ViewSessions";
import WriteSession from "@/app/components/sessions/WriteSession";

export default function SessionsPage() {
  const router = useRouter();
  const { siteId } = useParams(); // siteId is Partner A's ID
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState("start");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPartnerA, setIsPartnerA] = useState(false);
  const [isPartnerB, setIsPartnerB] = useState(false);

  useEffect(() => {
    async function initializeSessions() {
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
      console.log("Initializing sessions for user:", { userId, siteId });

      // Validate access: user must be Partner A (id === siteId) or Partner B (partner_id === siteId)
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id, partner_id")
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

      const partnerA = userId === siteId;
      const partnerB = userData.partner_id === siteId;

      if (!partnerA && !partnerB) {
        console.error("Access denied: User not associated with this dashboard", { userId, siteId });
        setError("You do not have access to this page.");
        setLoading(false);
        return;
      }

      setIsPartnerA(partnerA);
      setIsPartnerB(partnerB);
      setLoading(false);
      setIsLoaded(true);
    }

    initializeSessions();
  }, [router, siteId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-[var(--text-primary)]">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-400">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--surface)] p-4 md:p-8 lg:p-12">
      <div
        className={`max-w-7xl mx-auto transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Hero Section */}
        <div className="hero-gradient rounded-2xl p-6 md:p-8 mb-8 shadow-custom-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
            <BookOpen className="text-white flex-shrink-0" size={32} />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Blueprint Dialogue Sessions</h1>
              <p className="text-[var(--text-secondary)] text-base md:text-lg mt-2">
                Engage in guided self-reflection tailored to your CSM archetype.
              </p>
            </div>
          </div>
        </div>

        {/* Submenu - Responsive Tabs */}
        <div className="card-gradient rounded-xl shadow-custom overflow-hidden">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-around p-4 md:p-6 gap-4 md:gap-6 border-b border-[var(--border)]">
            <button
              className={`flex items-center hover:cursor-pointer transition-colors p-2 rounded-md ${
                showContent === "start" ? "bg-[var(--primary-hover)] text-white" : "text-[var(--text-primary)]"
              }`}
              onClick={() => setShowContent("start")}
            >
              <Target className="mr-2 text-[var(--accent)]" size={20} />
              <span className="text-base md:text-lg font-semibold">Start Session</span>
            </button>
            <button
              className={`flex items-center hover:cursor-pointer transition-colors p-2 rounded-md ${
                showContent === "write" ? "bg-[var(--primary-hover)] text-white" : "text-[var(--text-primary)]"
              }`}
              onClick={() => setShowContent("write")}
            >
              <SquarePen className="mr-2 text-[var(--accent)]" size={20} />
              <span className="text-base md:text-lg font-semibold">Write Question</span>
            </button>
            <button
              className={`flex items-center hover:cursor-pointer transition-colors p-2 rounded-md ${
                showContent === "view" ? "bg-[var(--primary-hover)] text-white" : "text-[var(--text-primary)]"
              }`}
              onClick={() => setShowContent("view")}
            >
              <List className="mr-2 text-[var(--accent)]" size={20} />
              <span className="text-base md:text-lg font-semibold">View Sessions</span>
            </button>
            <button
              className={`flex items-center hover:cursor-pointer transition-colors p-2 rounded-md ${
                showContent === "coach" ? "bg-[var(--primary-hover)] text-white" : "text-[var(--text-primary)]"
              }`}
              onClick={() => setShowContent("coach")}
            >
              <UserStar className="mr-2 text-[var(--accent)]" size={20} />
              <span className="text-base md:text-lg font-semibold">Coach Profile</span>
            </button>
          </div>

          <div className="p-4 md:p-6">
            {showContent === "start" && <StartSession setShowContent={setShowContent} />}
            {showContent === "write" && <WriteSession />}
            {showContent === "view" && <ViewSessions />}
            {showContent === "coach" && <CoachProfile />}
          </div>
        </div>
      </div>
    </div>
  );
}
