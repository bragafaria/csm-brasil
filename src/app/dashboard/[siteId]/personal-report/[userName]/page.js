"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function PersonalReportPage() {
  const { siteId, userName } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState(null);

  // Function to create URL-friendly slug from name
  const createSlug = (name) => {
    if (!name) return "";
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  useEffect(() => {
    async function fetchReportData() {
      if (!siteId || !userName) {
        console.error("Missing siteId or userName:", { siteId, userName });
        setError("Invalid report URL.");
        setLoading(false);
        return;
      }

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

      // Fetch Partner A's data (siteId is Partner A's id)
      const { data: partnerAData, error: partnerAError } = await supabase
        .from("users")
        .select("id, name, partner_id, percents, dominants, categories, has_assessment")
        .eq("id", siteId)
        .single();

      if (partnerAError || !partnerAData) {
        console.error("Error fetching Partner A:", partnerAError?.message);
        setError("Failed to load report data.");
        setLoading(false);
        return;
      }

      // Validate access: user must be Partner A or Partner B
      const isPartnerA = userId === siteId;
      const isPartnerB = partnerAData.partner_id && userId === partnerAData.partner_id;

      if (!isPartnerA && !isPartnerB) {
        console.error("Access denied: User not associated with this report", { userId, siteId });
        setError("You do not have access to this report.");
        setLoading(false);
        return;
      }

      // Determine which report to show based on userName slug
      const partnerASlug = createSlug(partnerAData.name);

      if (userName === partnerASlug) {
        setReportData({
          name: partnerAData.name,
          percents: partnerAData.percents,
          dominants: partnerAData.dominants,
          categories: partnerAData.categories,
          has_assessment: partnerAData.has_assessment,
        });
        setLoading(false);
        return;
      }

      // Fetch Partner B's data if partner_id exists
      if (!partnerAData.partner_id) {
        setError("Partner B has not signed up yet.");
        setLoading(false);
        return;
      }

      const { data: partnerBData, error: partnerBError } = await supabase
        .from("users")
        .select("id, name, percents, dominants, categories, has_assessment")
        .eq("id", partnerAData.partner_id)
        .single();

      if (partnerBError || !partnerBData) {
        console.error("Error fetching Partner B:", partnerBError?.message);
        setError("Failed to load Partner B's report data.");
        setLoading(false);
        return;
      }

      const partnerBSlug = createSlug(partnerBData.name);
      if (userName === partnerBSlug) {
        setReportData({
          name: partnerBData.name,
          percents: partnerBData.percents,
          dominants: partnerBData.dominants,
          categories: partnerBData.categories,
          has_assessment: partnerBData.has_assessment,
        });
      } else {
        setError("Invalid report URL.");
      }

      setLoading(false);
    }

    fetchReportData();
  }, [siteId, userName, router]);

  if (loading) return <div>Loading report...</div>;
  if (error) return <div className="p-6 text-red-400">{error}</div>;

  return (
    <div className="p-6 mt-20">
      <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Personal Report for {reportData?.name}</h1>
      <div className="bg-[var(--surface)] p-6 rounded-xl shadow-custom">
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Assessment Results</h2>
        {reportData?.has_assessment ? (
          <>
            {reportData?.percents && (
              <div className="mb-4">
                <h3 className="text-lg font-medium text-[var(--text-primary)]">Percentages</h3>
                <pre className="text-[var(--text-secondary)]">{JSON.stringify(reportData.percents, null, 2)}</pre>
              </div>
            )}
            {reportData?.dominants && (
              <div className="mb-4">
                <h3 className="text-lg font-medium text-[var(--text-primary)]">Dominants</h3>
                <pre className="text-[var(--text-secondary)]">{JSON.stringify(reportData.dominants, null, 2)}</pre>
              </div>
            )}
            {reportData?.categories && (
              <div className="mb-4">
                <h3 className="text-lg font-medium text-[var(--text-primary)]">Categories</h3>
                <pre className="text-[var(--text-secondary)]">{JSON.stringify(reportData.categories, null, 2)}</pre>
              </div>
            )}
          </>
        ) : (
          <p className="text-[var(--text-secondary)]">
            No assessment data available. Please complete the assessment to view your report.
          </p>
        )}
      </div>
    </div>
  );
}
