// app/components/QuickStats.js
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import { CheckCircle, Clock, XCircle, Users, FileText, UserCheck, User } from "lucide-react"; // Added User icon for archetypes

const archetypes = {
  "C-L-O-S-H": "O Arquiteto",
  "C-L-O-S-A": "O Engenheiro",
  "C-L-O-F-H": "O Navegador",
  "C-L-O-F-A": "O Pioneiro",
  "C-L-I-S-H": "O Curador",
  "C-L-I-S-A": "O Analista",
  "C-L-I-F-H": "O Mediador",
  "C-L-I-F-A": "O Independente",
  "C-V-O-S-H": "O Guardião",
  "C-V-O-S-A": "O Artesão",
  "C-V-O-F-H": "O Mobilizador",
  "C-V-O-F-A": "O Aventureiro",
  "C-V-I-S-H": "O Conselheiro",
  "C-V-I-S-A": "O Restaurador",
  "C-V-I-F-H": "O Pacificador",
  "C-V-I-F-A": "O Empático",
  "N-L-O-S-H": "O Estrategista",
  "N-L-O-S-A": "O Inventor",
  "N-L-O-F-H": "O Disruptor",
  "N-L-O-F-A": "O Revolucionário",
  "N-L-I-S-H": "O Acadêmico",
  "N-L-I-S-A": "O Teórico",
  "N-L-I-F-H": "O Inovador",
  "N-L-I-F-A": "O Visionário",
  "N-V-O-S-H": "O Embaixador",
  "N-V-O-S-A": "O Artista",
  "N-V-O-F-H": "O Catalisador",
  "N-V-O-F-A": "O Andarilho",
  "N-V-I-S-H": "O Mentor",
  "N-V-I-S-A": "O Sábio",
  "N-V-I-F-H": "O Unificador",
  "N-V-I-F-A": "O Místico",
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
    return <p className="text-[var(--text-secondary)] text-sm animate-pulse">Carregando Status...</p>;
  }

  const getArchetype = (typeCode) => archetypes[typeCode] || "Unknown";

  const yourAssessment = userData.has_assessment ? "Concluído" : "Pendente";
  const partnerAssessment = partnerData ? (partnerData.has_assessment ? "Concluído" : "Pendente") : "Não Inscrito";

  const reportReady = userData.has_assessment && partnerData?.has_assessment ? "Pronto" : "Aguardando";
  const yourType = userData.typeCode ? `${getArchetype(userData.typeCode)} (${userData.typeCode})` : "Não Disponível";
  const partnerType = partnerData?.typeCode
    ? `${getArchetype(partnerData.typeCode)} (${partnerData.typeCode})`
    : "Não Disponível";

  const getStatusIcon = (status) => {
    if (status === "Concluído" || status === "Pronto") {
      return <CheckCircle className="w-5 h-5 text-green-400" />;
    } else if (status === "Pendente" || status === "Aguardando") {
      return <Clock className="w-5 h-5 text-yellow-400" />;
    } else {
      return <XCircle className="w-5 h-5 text-red-400" />;
    }
  };

  const getStatusColor = (status) => {
    if (status === "Concluído" || status === "Pronto") return "text-green-400";
    if (status === "Pendente" || status === "Aguardando") return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="space-y-6">
      {/* Assessment Statuses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg">
          <div className="flex flex-wrap items-center justify-start gap-3">
            <div className="flex items-center space-x-3">
              <UserCheck className="w-6 h-6 text-[var(--text-secondary)]" />
              <span className="text-[var(--text-primary)] font-medium">Sua avaliação</span>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(yourAssessment)}
              <span className={`font-semibold ${getStatusColor(yourAssessment)}`}>{yourAssessment}</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg">
          <div className="flex flex-wrap items-center justify-start gap-3">
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-[var(--text-secondary)]" />
              <span className="text-[var(--text-primary)] font-medium">{"Avaliação do(a) Parceiro(a)"}</span>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(partnerAssessment)}
              <span className={`font-semibold ${getStatusColor(partnerAssessment)}`}>{partnerAssessment}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Report Status */}
      <div className="p-4 rounded-lg">
        <div className="flex flex-wrap items-center justify-start gap-3">
          <div className="flex  items-center space-x-3">
            <FileText className="w-6 h-6 text-[var(--text-secondary)]" />
            <span className="text-[var(--text-primary)] font-medium">{"Relatório de Insights do Casal"} </span>
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
        <div className="p-4 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <User className="w-5 h-5 text-[var(--text-secondary)]" />
            <span className="text-[var(--text-secondary)] text-sm uppercase tracking-wide">Seu Arquétipo</span>
          </div>
          <span className="text-[var(--text-primary)] font-semibold block">{yourType}</span>
        </div>

        <div className="p-4 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <User className="w-5 h-5 text-[var(--text-secondary)]" />
            <span className="text-[var(--text-secondary)] text-sm uppercase tracking-wide">
              {"Arquétipo do(a) parceiro(a)"}
            </span>
          </div>
          <span className="text-[var(--text-primary)] font-semibold block">{partnerType}</span>
        </div>
      </div>
    </div>
  );
}
