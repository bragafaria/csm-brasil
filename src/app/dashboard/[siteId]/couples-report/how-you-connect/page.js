// app/dashboard/[siteId]/couples-report/how-you-connect/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import HowYouConnectPage from "@/app/components/couples/HowYouConnect";
import IntroContext from "@/app/components/couples/IntroConnectContext";
import NavButtons from "@/app/components/couples/NavButtons";
import { getHowYouConnectData } from "@/app/lib/couple/getHowYouConnectData";
import Spinner from "@/app/components/ui/Spinner";

export default function HowYouConnectPageRoute() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getHowYouConnectData(params.siteId);
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

  const pageTitle = `How You Connect`;
  const subHeading = `Explore the natural chemistry and connection patterns between ${data.partnerA.name} and ${data.partnerB.name}.`;

  return (
    <>
      <title>{pageTitle}</title>
      <meta
        name="description"
        content={`Explore the natural chemistry and connection patterns between ${data.partnerA.name} and ${data.partnerB.name}.`}
      />

      <div className="container mx-auto p-6 max-w-7xl">
        <header className=" mb-12 py-16 bg-gradient-to-r from-[var(--primary)] to-purple-800 rounded-3xl max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl mb-4 font-bold text-[var(--text-primary)]">{pageTitle}</h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">{subHeading}</p>
        </header>

        {/* 1. INTRODUCTION */}
        <IntroContext partnerA={data.partnerA} partnerB={data.partnerB} />

        {/* 2. DYNAMICS + HARMONY + STRENGTHS/GROWTH */}
        <HowYouConnectPage dynamics={data.dynamics} />

        <NavButtons current="connect" siteId={params.siteId} />
      </div>
    </>
  );
}
