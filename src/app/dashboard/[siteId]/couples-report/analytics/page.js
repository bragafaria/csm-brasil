// app/dashboard/[siteId]/couples-report/analytics/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import CsmRadarChart from "@/app/components/ui/radar/CsmRadarChart";
import CsmDimensionAnalysis from "@/app/components/couples/CsmDimensionAnalysis";
import NavButtons from "@/app/components/couples/NavButtons";
import { getCoupleAnalyticsData } from "@/app/lib/couple/getCoupleAnalyticsData";
import { CSM_DIMENSIONS } from "@/app/lib/data/csmConfig";
import Spinner from "@/app/components/ui/Spinner";
import CompatibilityRiskRanking from "@/app/components/couples/CompatibilityRiskRanking";
import IntroAnalytics from "@/app/components/couples/IntroAnalytics";
import IntroCsmDimension from "@/app/components/couples/IntroCsmDimension";
import WhatsNextAnalytics from "@/app/components/couples/WhatsNextAnalytics";

export default function CoupleAnalyticsPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getCoupleAnalyticsData(params.siteId);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params.siteId]);

  if (loading) return <Spinner>Loading analytics...</Spinner>;
  if (error) return <ErrorCard error={error} siteId={params.siteId} router={router} />;

  const pageTitle = "Couple Analytics";
  const subHeading = `Visual comparison of ${data.partnerA.name} and ${data.partnerB.name}'s cognitive preferences.`;

  const pole1A = data.partnerA.percents.map((p) => p.p1);
  const pole1B = data.partnerB.percents.map((p) => p.p1);
  const pole2A = data.partnerA.percents.map((p) => p.p2);
  const pole2B = data.partnerB.percents.map((p) => p.p2);

  const metricsPole1 = ["(C)", "(L)", "(I)", "(S)", "(H)"];
  const metricsPole2 = ["(N)", "(V)", "(O)", "(F)", "(A)"];

  const analysisData = {
    partnerA: { name: data.partnerA.name },
    partnerB: { name: data.partnerB.name },
  };

  // MOVE THIS INSIDE THE COMPONENT
  const dimensionScores = CSM_DIMENSIONS.map((dim, i) => {
    const aPct1 = pole1A[i],
      bPct1 = pole1B[i];
    const aPct2 = pole2A[i],
      bPct2 = pole2B[i];
    const cas1 = Math.round(100 - Math.abs(aPct1 - bPct1));
    const cas2 = Math.round(100 - Math.abs(aPct2 - bPct2));
    const avg1 = (aPct1 + bPct1) / 2;
    const avg2 = (aPct2 + bPct2) / 2;
    const isPole1 = avg1 > avg2;

    return {
      dim,
      pole: isPole1 ? dim.pole1.name : dim.pole2.name,
      cas: isPole1 ? cas1 : cas2,
    };
  });

  const rankedDimensions = [...dimensionScores].sort((a, b) => a.cas - b.cas);

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={subHeading} />

      <div className="container mx-auto max-w-4xl">
        <header className="hero-gradient rounded-lg p-6 md:p-8 mb-8 shadow-custom-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{pageTitle}</h1>
              <p className="text-[var(--text-secondary)] text-base md:text-lg mt-2">{subHeading}</p>
            </div>
          </div>
        </header>
        {/* Introduction */}
        <div className="space-y-8">
          <IntroAnalytics />
        </div>
        <div className="space-y-8">
          <IntroCsmDimension />
        </div>

        {/* POLE 1 CHART + ANALYSIS */}
        <div className="space-y-8">
          <CsmRadarChart
            partnerA={{ name: data.partnerA.name, values: pole1A }}
            partnerB={{ name: data.partnerB.name, values: pole1B }}
            metrics={metricsPole1}
            title="Foundational Orientation Poles"
          />
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] my-8 text-start">
              Foundational Orientation Analysis:
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {CSM_DIMENSIONS.map((dim, i) => (
                <CsmDimensionAnalysis
                  key={`p1-${i}`}
                  dim={{ ...dim, ...analysisData }}
                  aPct={pole1A[i]}
                  bPct={pole1B[i]}
                  poleName={dim.pole1.name}
                  poleDesc={dim.pole1.desc}
                  isPole1={true}
                  primaryPoleA={dim.pole2.name}
                  primaryPoleB={dim.pole2.name}
                  primaryPctA={pole2A[i]}
                  primaryPctB={pole2B[i]}
                  oppositePoleA={dim.pole2.name}
                  oppositePoleB={dim.pole2.name}
                  oppositePctA={pole2A[i]}
                  oppositePctB={pole2B[i]}
                />
              ))}
            </div>
          </div>
        </div>

        {/* POLE 2 CHART + ANALYSIS */}
        <div className="space-y-8 mt-12">
          <CsmRadarChart
            partnerA={{ name: data.partnerA.name, values: pole2A }}
            partnerB={{ name: data.partnerB.name, values: pole2B }}
            metrics={metricsPole2}
            title="Expansive Orientation Poles"
          />
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] my-8 text-start">
              Expansive Orientation Analysis:
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {CSM_DIMENSIONS.map((dim, i) => (
                <CsmDimensionAnalysis
                  key={`p2-${i}`}
                  dim={{ ...dim, ...analysisData }}
                  aPct={pole2A[i]}
                  bPct={pole2B[i]}
                  poleName={dim.pole2.name}
                  poleDesc={dim.pole2.desc}
                  isPole1={false}
                  primaryPoleA={dim.pole1.name}
                  primaryPoleB={dim.pole1.name}
                  primaryPctA={pole1A[i]}
                  primaryPctB={pole1B[i]}
                  oppositePoleA={dim.pole1.name}
                  oppositePoleB={dim.pole1.name}
                  oppositePctA={pole1A[i]}
                  oppositePctB={pole1B[i]}
                />
              ))}
            </div>
          </div>
        </div>

        {/* COMPATIBILITY RISK RANKING */}
        <CompatibilityRiskRanking rankedDimensions={rankedDimensions} />

        <WhatsNextAnalytics />

        <NavButtons current="analytics" siteId={params.siteId} />
      </div>
    </>
  );
}

function ErrorCard({ error, siteId, router }) {
  return (
    <div className="container mx-auto p-6 mt-20 max-w-7xl">
      <div className="card-gradient p-8 rounded-lg shadow-custom max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Analytics Not Available</h1>
        <p className="text-red-400 text-lg">{error}</p>
        <button onClick={() => router.push(`/dashboard/${siteId}`)} className="btn-primary mt-6 px-6 py-3 rounded-lg">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
