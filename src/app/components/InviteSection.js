// src/app/components/InviteSection.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import Spinner from "@/app/components/ui/Spinner.js";

export default function InviteSection({ siteId }) {
  const [inviteLink, setInviteLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchInvite() {
      if (!siteId) {
        console.error("siteId inválido", siteId);
        setError("Dashboard URL inválido.");
        setLoading(false);
        return;
      }

      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError || !session) {
          console.error("Session error:", sessionError?.message || "Nenhuma sessão encontrada");
          setError("Você precisa estar logado para gerar um convite.");
          setLoading(false);
          router.push("/login");
          return;
        }
        console.log("ID do usuário da sessão (InviteSection):", session.user.id);

        const userId = session.user.id;

        // Verify user is associated with siteId
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("id, partner_id")
          .eq("id", siteId)
          .single();

        if (userError || !userData) {
          console.error("Error fetching user data:", userError?.message || "No user found for siteId", siteId);
          setError("Failed to load dashboard data.");
          setLoading(false);
          return;
        }

        if (userId !== userData.id && userId !== userData.partner_id) {
          console.error("Access denied: User not associated with siteId", { userId, siteId });
          setError("You do not have access to this dashboard.");
          setLoading(false);
          return;
        }

        const token = session.access_token;
        const response = await fetch("/api/get-invite", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        if (response.ok) {
          setInviteLink(result.inviteLink);
        } else {
          console.error("API error:", result.error || "Failed to fetch invite link", result);
          setError(result.error || "Failed to fetch invite link. Please try again.");
        }
      } catch (err) {
        console.error("Unexpected error in fetchInvite:", err.message, err.stack);
        setError("Failed to load invite link. Please refresh the page or contact support.");
      } finally {
        setLoading(false);
      }
    }

    fetchInvite();
  }, [siteId, router]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = inviteLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card-gradient p-6 rounded-lg shadow-custom"
      >
        <div className="flex items-center space-x-3">
          <Spinner>{"Loading invite..."}</Spinner>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[var(--surface-variant)] p-6 rounded-lg border border-red-400/20 shadow-custom"
      >
        <p className="text-red-400 text-sm font-medium mb-2">{error}</p>
        <button onClick={() => window.location.reload()} className="text-xs text-[var(--accent)] hover:underline">
          Refresh
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="hero-gradient p-6 rounded-lg shadow-custom hover:shadow-custom-lg transition-all"
    >
      <div className="flex flex-col items-center my-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-3">Convide seu parceiro(a)</h2>
        <p className="text-[var(--text-secondary)] text-center text-lg leading-relaxed">
          Compartilhe este link privado com seu parceiro(a) para que ele(a) acesse o painel e realize a avaliação.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center my-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyToClipboard}
            className="btn-primary border border-white py-3 px-6 rounded-lg font-semibold flex items-center gap-2 whitespace-nowrap shadow-md hover:shadow-lg transition-all"
          >
            Copiar Link
          </motion.button>

          {/* Copied confirmation message */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-3 flex items-center gap-2 text-green-400 font-medium"
              >
                <Check className="h-5 w-5" />
                <span>Copiado!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success feedback */}
          {inviteLink && (
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`text-base text-center text-white font-medium flex items-center gap-1 ${
                copied ? "mt-2" : "mt-3"
              }`}
            >
              ✅ Pronto para compartilhar com seu parceiro(a)!
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
