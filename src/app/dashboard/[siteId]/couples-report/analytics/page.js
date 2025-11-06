// app/dashboard/[siteId]/couples-report/analytics/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import NavButtons from "@/app/components/couples/NavButtons";
import Spinner from "@/app/components/ui/Spinner";
// import { validateAndGetCoupleData } from "@/app/lib/couple/";

export default function AnalyticsPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await validateAndGetCoupleData(params.siteId);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [params.siteId]);

  if (loading) {
    return (
      <div className="container mx-auto p-6 mt-20 max-w-7xl flex items-center justify-center min-h-[60vh]">
        <Spinner>Loading report...</Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 mt-20 max-w-7xl">
        <div className="card-gradient p-8 rounded-lg shadow-custom max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Report Not Available</h1>
          <p className="text-red-400 text-lg">{error}</p>
          <button
            onClick={() => router.push(`/dashboard/${params.siteId}`)}
            className="btn-primary mt-6 px-6 py-3 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 mt-20 max-w-7xl text-center py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--text-primary)]">
        {data.partnerA.name} & {data.partnerB.name}
        {"'s Report"}
      </h1>

      <div className="card-gradient p-12 rounded-lg shadow-custom max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">✨ Analytics</h2>
        <p className="text-lg text-[var(--text-secondary)]">
          Coming soon — your unique match in charts, spectrums, and synergy scores.
        </p>
      </div>

      <NavButtons current="analytics" siteId={params.siteId} />
    </div>
  );
}
