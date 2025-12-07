// app/dashboard/[siteId]/couples-report/your-10-life-challenges/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import LifeChallengesPage from "@/app/components/couples/LifeChallengesPage";
import NavButtons from "@/app/components/couples/NavButtons";
import { getLifeChallengesData } from "@/app/lib/couple/getLifeChallengesData";
import IntroContext from "@/app/components/couples/IntroChallengesContext";
import Spinner from "@/app/components/ui/Spinner";

export default function LifeChallengesPageRoute() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getLifeChallengesData(params.siteId);
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
  const pageTitle = `Life Challenges`;
  const subHeading = `Explore the natural chemistry and connection patterns between ${data.partnerA.name} and ${data.partnerB.name}.`;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="hero-gradient rounded-lg p-6 md:p-8 mb-8 shadow-custom-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-white">{pageTitle}</h1>
            <p className="text-[var(--text-secondary)] text-base md:text-lg mt-2">{subHeading}</p>
          </div>
        </div>
      </div>

      <IntroContext partnerA={data.partnerA} partnerB={data.partnerB} />

      <LifeChallengesPage lifeChallenges={data.lifeChallenges} />

      <NavButtons current="challenges" siteId={params.siteId} />
    </div>
  );
}
