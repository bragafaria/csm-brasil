// app/components/QuickStats.js
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import { CheckCircle, Clock, XCircle, Users, FileText, UserCheck, User } from "lucide-react"; // Added User icon for archetypes

const archetypes = {
  "C-L-O-S-H": "The Architect",
  "C-L-O-S-A": "The Engineer",
  "C-L-O-F-H": "The Navigator",
  "C-L-O-F-A": "The Pioneer",
  "C-L-I-S-H": "The Curator",
  "C-L-I-S-A": "The Analyst",
  "C-L-I-F-H": "The Mediator",
  "C-L-I-F-A": "The Maverick",
  "C-V-O-S-H": "The Steward",
  "C-V-O-S-A": "The Artisan",
  "C-V-O-F-H": "The Campaigner",
  "C-V-O-F-A": "The Adventurer",
  "C-V-I-S-H": "The Counselor",
  "C-V-I-S-A": "The Healer",
  "C-V-I-F-H": "The Peacemaker",
  "C-V-I-F-A": "The Empath",
  "N-L-O-S-H": "The Strategist",
  "N-L-O-S-A": "The Inventor",
  "N-L-O-F-H": "The Disruptor",
  "N-L-O-F-A": "The Revolutionary",
  "N-L-I-S-H": "The Academic",
  "N-L-I-S-A": "The Theorist",
  "N-L-I-F-H": "The Innovator",
  "N-L-I-F-A": "The Visionary",
  "N-V-O-S-H": "The Ambassador",
  "N-V-O-S-A": "The Artist",
  "N-V-O-F-H": "The Catalyst",
  "N-V-O-F-A": "The Wanderer",
  "N-V-I-S-H": "The Mentor",
  "N-V-I-S-A": "The Sage",
  "N-V-I-F-H": "The Unifier",
  "N-V-I-F-A": "The Mystic",
};

export default function QuickStats({ userData, siteId, isPartnerA, isPartnerB }) {
  const [partnerData, setPartnerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPartner() {
      if (!userData?.partner_id && !isPartnerB) {
        setLoading(false);
        return;
      }

      const partnerId = isPartnerA ? userData.partner_id : siteId;
      if (!partnerId) {
        setLoading(false);
        return;
      }

      const { data: partner, error } = await supabase
        .from("users")
        .select("id, name, has_assessment, typeCode, has_paid, report_status")
        .eq("id", partnerId)
        .single();

      if (!error && partner) {
        setPartnerData(partner);
      }
      setLoading(false);
    }

    fetchPartner();
  }, [userData, siteId, isPartnerA, isPartnerB]);

  if (loading) {
    return <p className="text-[var(--text-secondary)] text-sm animate-pulse">Loading stats...</p>;
  }

  const getArchetype = (typeCode) => archetypes[typeCode] || "Unknown";

  const yourAssessment = userData.has_assessment ? "Completed" : "Pending";
  const partnerAssessment = partnerData ? (partnerData.has_assessment ? "Completed" : "Pending") : "Not Signed Up";

  const reportReady = userData.has_assessment && partnerData?.has_assessment ? "Ready" : "Waiting";
  const yourType = userData.typeCode ? `${getArchetype(userData.typeCode)} (${userData.typeCode})` : "Not Available";
  const partnerType = partnerData?.typeCode
    ? `${getArchetype(partnerData.typeCode)} (${partnerData.typeCode})`
    : "Not Available";

  const getStatusIcon = (status) => {
    if (status === "Completed" || status === "Ready") {
      return <CheckCircle className="w-5 h-5 text-green-400" />;
    } else if (status === "Pending" || status === "Waiting") {
      return <Clock className="w-5 h-5 text-yellow-400" />;
    } else {
      return <XCircle className="w-5 h-5 text-red-400" />;
    }
  };

  const getStatusColor = (status) => {
    if (status === "Completed" || status === "Ready") return "text-green-400";
    if (status === "Pending" || status === "Waiting") return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="space-y-6">
      {/* Assessment Statuses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card-gradient p-4 rounded-lg shadow-custom">
          <div className="flex flex-wrap items-center justify-start gap-3">
            <div className="flex items-center space-x-3">
              <UserCheck className="w-6 h-6 text-[var(--text-secondary)]" />
              <span className="text-[var(--text-primary)] font-medium">Your Assessment</span>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(yourAssessment)}
              <span className={`font-semibold ${getStatusColor(yourAssessment)}`}>{yourAssessment}</span>
            </div>
          </div>
        </div>

        <div className="card-gradient p-4 rounded-lg shadow-custom">
          <div className="flex flex-wrap items-center justify-start gap-3">
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-[var(--text-secondary)]" />
              <span className="text-[var(--text-primary)] font-medium">{"Partner's Assessment"}</span>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(partnerAssessment)}
              <span className={`font-semibold ${getStatusColor(partnerAssessment)}`}>{partnerAssessment}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Report Status */}
      <div className="card-gradient p-4 rounded-lg shadow-custom">
        <div className="flex flex-wrap items-center justify-start gap-3">
          <div className="flex  items-center space-x-3">
            <FileText className="w-6 h-6 text-[var(--text-secondary)]" />
            <span className="text-[var(--text-primary)] font-medium">{"Couple's Insights Report"} </span>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon(reportReady)}
            <span className={`font-semibold ${getStatusColor(reportReady)}`}>{reportReady}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-[var(--border)] my-4" />

      {/* Archetypes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card-gradient p-4 rounded-lg shadow-custom">
          <div className="flex items-center space-x-3 mb-2">
            <User className="w-5 h-5 text-[var(--text-secondary)]" />
            <span className="text-[var(--text-secondary)] text-sm uppercase tracking-wide">Your Archetype</span>
          </div>
          <span className="text-[var(--text-primary)] font-semibold block">{yourType}</span>
        </div>

        <div className="card-gradient p-4 rounded-lg shadow-custom">
          <div className="flex items-center space-x-3 mb-2">
            <User className="w-5 h-5 text-[var(--text-secondary)]" />
            <span className="text-[var(--text-secondary)] text-sm uppercase tracking-wide">
              {"Partner's Archetype"}
            </span>
          </div>
          <span className="text-[var(--text-primary)] font-semibold block">{partnerType}</span>
        </div>
      </div>
    </div>
  );
}
