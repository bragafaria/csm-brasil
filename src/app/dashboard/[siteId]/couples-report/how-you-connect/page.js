// app/dashboard/[siteId]/couples-report/how-you-connect/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import HowYouConnectPage from "@/app/components/couples/HowYouConnect";
import NavButtons from "@/app/components/couples/NavButtons";
import { getHowYouConnectData } from "@/app/lib/couple/getHowYouConnectData";
import IntroConnectContext from "@/app/components/couples/IntroConnectContext";

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
        <div className="text-[var(--text-primary)] text-lg font-medium">Loading report...</div>
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
    <div className="container mx-auto p-6 mt-20 max-w-7xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[var(--text-primary)]">
        {data.partnerA.name} & {data.partnerB.name}
        {" - How you Connect"}
      </h1>
      <IntroConnectContext partnerA={data.partnerA} partnerB={data.partnerB} />

      <HowYouConnectPage {...data} />

      <NavButtons current="connect" siteId={params.siteId} />
    </div>
  );
}
