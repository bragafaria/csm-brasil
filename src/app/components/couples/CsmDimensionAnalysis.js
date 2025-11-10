// app/components/couples/CsmDimensionAnalysis.jsx
import { CheckCircle, AlertCircle } from "lucide-react";
import { PREFERENCE_TIERS, CAS_TIERS } from "@/app/lib/data/csmConfig";

const getTier = (pct, isPrimary, poleName, primaryPoleName, primaryPct, oppositePoleName, oppositePct) => {
  const tiers = isPrimary ? PREFERENCE_TIERS.primary : PREFERENCE_TIERS.secondary;
  if (pct >= 86)
    return { ...tiers["86-100"], desc: tiers["86-100"].desc(pct, poleName, oppositePoleName, oppositePct) };
  if (pct >= 66) return { ...tiers["66-85"], desc: tiers["66-85"].desc(pct, poleName, oppositePoleName, oppositePct) };
  if (pct >= 51) return { ...tiers["51-65"], desc: tiers["51-65"].desc(pct, poleName, oppositePoleName, oppositePct) };
  if (pct >= 35) return { ...tiers["35-49"], desc: tiers["35-49"].desc(pct, poleName, primaryPoleName, primaryPct) };
  if (pct >= 15) return { ...tiers["15-34"], desc: tiers["15-34"].desc(pct, poleName, primaryPoleName, primaryPct) };
  return { ...tiers["0-14"], desc: tiers["0-14"].desc(pct, poleName, primaryPoleName, primaryPct) };
};

const getCasTier = (cas, poleName) => {
  if (cas >= 80) return { ...CAS_TIERS["80-100"], desc: CAS_TIERS["80-100"].desc(poleName) };
  if (cas >= 60) return { ...CAS_TIERS["60-79"], desc: CAS_TIERS["60-79"].desc(poleName) };
  return { ...CAS_TIERS["0-59"], desc: CAS_TIERS["0-59"].desc(poleName) };
};

export default function CsmDimensionAnalysis({
  dim,
  aPct,
  bPct,
  poleName,
  poleDesc,
  isPole1,
  primaryPoleA,
  primaryPoleB,
  primaryPctA,
  primaryPctB,
  oppositePoleA,
  oppositePoleB,
  oppositePctA,
  oppositePctB,
}) {
  const cas = Math.round(100 - Math.abs(aPct - bPct));
  const casTier = getCasTier(cas, poleName);
  const aPrimary = aPct > 50;
  const bPrimary = bPct > 50;

  const aTier = getTier(
    aPct,
    aPrimary,
    poleName,
    aPrimary ? null : primaryPoleA,
    aPrimary ? null : primaryPctA,
    aPrimary ? oppositePoleA : null,
    aPrimary ? oppositePctA : null
  );
  const bTier = getTier(
    bPct,
    bPrimary,
    poleName,
    bPrimary ? null : primaryPoleB,
    bPrimary ? null : primaryPctB,
    bPrimary ? oppositePoleB : null,
    bPrimary ? oppositePctB : null
  );

  return (
    <div className="bg-[var(--surface2)] rounded-2xl p-6 border border-[var(--border)] shadow-lg">
      {/* Header */}
      <div className="relative z-10 flex items-center justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-[var(--primary)]/20 blur-xl rounded-full scale-150"></div>
          <div
            className="relative bg-[var(--surface3)]  
                       text-white font-black text-3xl w-16 h-16 rounded-full 
                       flex items-center justify-center shadow-lg"
          >
            {isPole1 ? dim.pole1.letter : dim.pole2.letter}
          </div>
        </div>
        <h4 className="ml-4 text-2xl font-bold text-[var(--text-primary)]">{poleName}</h4>
      </div>

      <p className="text-center text-[var(--text-secondary)] text-base leading-relaxed px-4 mb-8 italic">{poleDesc}</p>

      {/* === PARTNER A === */}
      <div className="space-y-6 mb-8">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-[var(--text-primary)] text-lg">{dim.partnerA.name}</span>
            <span className="font-bold text-xl text-[var(--quartary)]">{aPct}%</span>
          </div>

          {/* PARTNER A PROGRESS BAR — ALWAYS QUARTARY */}
          <div className="h-3 bg-[var(--surface)] rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out
                     bg-[var(--quartary)]"
              style={{ width: `${aPct}%` }}
            ></div>
          </div>

          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            <span className="font-medium text-[var(--text-primary)] text-lg mr-2 ">{aTier.label}:</span>{" "}
            {aPrimary ? (
              <>{aTier.desc}</>
            ) : (
              <>
                {aTier.desc.split("is not")[0]}
                <span className="font-bold">is not</span>
                {aTier.desc.split("is not")[1]}
              </>
            )}
          </p>
        </div>

        {/* === PARTNER B === */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-[var(--text-primary)] text-lg">{dim.partnerB.name}</span>
            <span className="font-bold text-xl text-[var(--quinary)]">{bPct}%</span>
          </div>

          {/* PARTNER B PROGRESS BAR — ALWAYS QUINARY */}
          <div className="h-3 bg-[var(--surface)] rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out
                     bg-[var(--quinary)]"
              style={{ width: `${bPct}%` }}
            ></div>
          </div>

          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            <span className="font-medium text-[var(--text-primary)] text-lg mr-2 ">{bTier.label}:</span>{" "}
            {bPrimary ? (
              <>{bTier.desc}</>
            ) : (
              <>
                {bTier.desc.split("is not")[0]}
                <span className="font-bold">is not</span>
                {bTier.desc.split("is not")[1]}
              </>
            )}
          </p>
        </div>
      </div>

      {/* CAS Badge */}
      <div className="relative z-10 mt-10 pt-6 border-t border-[var(--border)]">
        <p className="text-center font-bold text-[var(--text-primary)] text-xl mb-8">Compatibility Alignment Score</p>
        <div className="flex items-center justify-center gap-3 mb-8">
          <div
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-lg
                       shadow-lg transform transition-all duration-300
                       ${
                         cas >= 80
                           ? "bg-green-800 text-white"
                           : cas >= 60
                           ? "bg-yellow-800 text-white"
                           : "bg-red-800 text-white"
                       }`}
          >
            <span>{cas} pts</span>
            {cas >= 80 ? (
              <CheckCircle className="w-5 h-5 animate-pulse" />
            ) : (
              <AlertCircle className="w-5 h-5 animate-pulse" />
            )}
          </div>
        </div>
        <p className="text-center mt-4 text-base font-medium text-[var(--text-secondary)]">
          <span className={"font-bold text-lg"}>{casTier.label}:</span> {casTier.desc}
        </p>
      </div>
    </div>
  );
}
