// app/components/sessions/WriteSession.js
"use client";

import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { supabase } from "@/app/utils/supabaseClient";
import Editor from "@/app/components/tiptap/Editor";
import SalesSession from "@/app/components/sessions/SalesSession";
import { motion } from "framer-motion";
import Spinner from "@/app/components/ui/Spinner";
import { Save, CircleCheckBig, Check } from "lucide-react";
import TermsModal from "@/app/components/terms-of-service/TermsModal";

export default function WriteSession({ onTabChange }) {
  const [content, setContent] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userStatus, setUserStatus] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [error, setError] = useState(null);
  const [showSalesPage, setShowSalesPage] = useState(true);
  const [useFreeSession, setUseFreeSession] = useState(false);
  const [justPaid, setJustPaid] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [draftKey, setDraftKey] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session) {
          setError("Please log in again");
          setLoadingStatus(false);
          return;
        }

        const key = `csm-session-draft-${session.user.id}`;
        setDraftKey(key);

        const draft = localStorage.getItem(key);
        if (draft && draft.trim()) {
          setContent(draft);
          const text = draft
            .replace(/<[^>]*>/g, " ")
            .replace(/\s+/g, " ")
            .trim();
          const words = text ? text.split(/\s+/).length : 0;
          setWordCount(words);
          setSavedMessage("(auto-saved)");
          setTimeout(() => setSavedMessage(""), 2500);
          setShowEditor(false);
        }

        const response = await fetch("/api/get-blueprint-status", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
            "Refresh-Token": session.refresh_token,
          },
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "No response body" }));
          throw new Error(errorData.error || `Failed to fetch status (Status: ${response.status})`);
        }

        const status = await response.json();
        setUserStatus(status);

        setShowSalesPage(
          !status.isActiveSubscriber &&
            (status.hasActiveSession || (!status.hasAvailablePerSession && !status.hasFreeSessionAvailable)) &&
            !justPaid
        );
      } catch (err) {
        console.error("Client-side error:", err.message);
        setError(err.message);
      } finally {
        setLoadingStatus(false);
      }
    }

    init();
  }, [justPaid]);

  const debouncedSave = useDebouncedCallback((html) => {
    if (draftKey) {
      localStorage.setItem(draftKey, html);
      setSavedMessage("(auto-saved)");
      setTimeout(() => setSavedMessage(""), 2000);
    }
  }, 1000);

  const handleEditorChange = (html) => {
    setContent(html);
    const text = html
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const words = text ? text.split(/\s+/).length : 0;
    setWordCount(words);
    if (words <= 2500) {
      debouncedSave(html);
    }
  };

  const handleStartFree = () => {
    setUseFreeSession(true);
    setShowSalesPage(false);
  };

  const handlePaymentSuccess = async () => {
    setJustPaid(true);
    setShowSalesPage(false);
  };

  async function handleSubmit() {
    if (!content.trim() || userStatus?.hasActiveSession || wordCount > 2500) return;

    setIsSubmitting(true);
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError || !session) throw new Error("No session for submission");

      const paymentType = userStatus.isActiveSubscriber
        ? "subscription"
        : useFreeSession || userStatus.hasFreeSessionAvailable
          ? "free"
          : "per_session";

      const response = await fetch("/api/create-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
          "Refresh-Token": session.refresh_token,
        },
        credentials: "include",
        body: JSON.stringify({ question: content, paymentType, paymentId: null }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Submission failed");
      }

      setUserStatus((prev) => ({
        ...prev,
        hasActiveSession: true,
        hasFreeSessionAvailable: paymentType === "free" ? false : prev.hasFreeSessionAvailable,
        hasAvailablePerSession: paymentType === "per_session" ? false : prev.hasAvailablePerSession,
      }));

      setContent("");
      if (draftKey) localStorage.removeItem(draftKey);
      setUseFreeSession(false);
      setShowSalesPage(true);
      setWordCount(0);
      setSavedMessage("");
      setShowEditor(false);
      alert("Session submitted! Report in 24 hours.");
      onTabChange("view");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loadingStatus) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex justify-center gap-3">
          <Spinner>Carregando status da sessão...</Spinner>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-[var(--surface-variant)] rounded-lg border border-red-400/20 shadow-custom">
        <p className="text-red-400 text-sm font-medium">Error: {error}</p>
        <button onClick={() => window.location.reload()} className="mt-3 text-xs text-[var(--accent)] hover:underline">
          Atualizar
        </button>
      </div>
    );
  }

  if (showSalesPage) {
    return (
      <SalesSession
        hasFreeAvailable={userStatus?.hasFreeSessionAvailable}
        onStartFree={handleStartFree}
        onStatusUpdate={handlePaymentSuccess}
        hasActiveSession={userStatus?.hasActiveSession}
        isActiveSubscriber={userStatus?.isActiveSubscriber}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-[var(--surface)] via-[var(--surface-variant)] to-[var(--surface)] p-4 md:p-8 mt-6 rounded-lg shadow-custom-lg border border-[var(--primary)]"
    >
      <div className="max-w-4xl mx-auto space-y-6 mt-10">
        {!showEditor && (
          <>
            <div className="flex flex-col items-center px-2 mb-6 md:px-20">
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-10 text-center">
                Inicie Sua Sessão Privada
              </h1>
              <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed text-center mb-2 md:mb-4">
                Conte para nós sobre o desafio, a pergunta ou a incerteza para a qual você gostaria de receber apoio.
                Quanto mais detalhes você compartilhar, com mais precisão poderemos moldar seu{" "}
                <strong>Relatório de Sessão Personalizado</strong> para refletir seu perfil CSM. Você pode focar em
                qualquer área da sua vida, incluindo:
              </p>

              <ul className="list-none space-y-2 mt-4 text-[var(--text-secondary)] text-sm md:text-base leading-relaxed mb-2 md:mb-4 max-w-2xl mx-auto">
                <li className="flex items-start justify-start">
                  <CircleCheckBig className="h-6 w-6 mr-2 text-[var(--accent)] flex-shrink-0" />
                  Uma situação pessoal ou de relacionamento que você está tentando lidar ou conduzir.
                </li>
                <li className="flex items-start justify-start">
                  <CircleCheckBig className="h-6 w-6 mr-2 text-[var(--accent)] flex-shrink-0" />
                  {`Patterns you’ve noticed in your thoughts, emotions, or behavior.`}
                </li>
                <li className="flex items-start justify-start">
                  <CircleCheckBig className="h-6 w-6 mr-2 text-[var(--accent)] flex-shrink-0" />
                  Perguntas sobre propósito, direção ou sobre como você se relaciona com os outros.
                </li>
              </ul>
              <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed text-center mt-4 mb-2 md:mb-4">
                Compartilhe o que for significativo para você, e nós ajudaremos você a ganhar clareza por meio de suas
                forças cognitivas únicas.
              </p>

              {/* ONLY THIS PART WAS CHANGED — PERFECTLY CENTERED, NO TYPOS */}
              <div className="mt-8 md:mt-10 w-full flex flex-col items-center">
                <label className="flex items-start gap-4 cursor-pointer select-none group max-w-2xl w-full">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-6 h-6 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${
                        termsAccepted
                          ? "bg-[var(--accent)] border-[var(--accent)]"
                          : "border-[var(--text-secondary)]/50 group-hover:border-[var(--accent)]"
                      }`}
                    >
                      {termsAccepted && <Check className="w-4 h-4 text-white font-bold" strokeWidth={3} />}
                    </div>
                  </div>
                  <span className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Confirmo que tenho pelo menos 18 anos de idade, li e concordo com os{" "}
                    <button
                      type="button"
                      onClick={() => setShowTermsModal(true)}
                      className="font-medium text-violet-400 hover:underline underline-offset-2 focus:outline-none underline"
                    >
                      Termos de Serviço
                    </button>
                    , entendo que as Sessões CSM são ferramentas de autoajuda (não são terapia nem aconselhamento
                    profissional) e aceito todos os avisos legais e limitações de responsabilidade.
                  </span>
                </label>

                <motion.button
                  whileHover={termsAccepted ? { scale: 1.02 } : {}}
                  whileTap={termsAccepted ? { scale: 0.98 } : {}}
                  onClick={() => termsAccepted && setShowEditor(true)}
                  disabled={!termsAccepted}
                  className={`mt-6 w-full max-w-md px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                    termsAccepted
                      ? "btn-primary hover:shadow-lg cursor-pointer"
                      : "bg-[var(--surface-variant)] text-[var(--text-secondary)]/60 cursor-not-allowed opacity-70"
                  }`}
                >
                  {termsAccepted ? "Iniciar Sessão" : "Aceite os Termos para Continuar"}
                </motion.button>

                {!termsAccepted && (
                  <p className="text-xs text-[var(--text-secondary)]/70 text-center mt-2 max-w-md">
                    Você deve aceitar os Termos de Serviço para começar
                  </p>
                )}
              </div>

              {showTermsModal && <TermsModal onClose={() => setShowTermsModal(false)} />}
            </div>
          </>
        )}

        {showEditor && (
          <>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] md:mb-6">Enviar Sua Sessão</h1>

              <p className="text-base max-w-md font-light italic text-[var(--text-primary)] md:mb-6 mt-4">
                Um especialista certificado em CSM revisará sua solicitação pessoalmente e entrará em contato com você
                em até 1–2 dias úteis.
              </p>
            </div>

            {userStatus?.hasActiveSession && (
              <div className="mb-8 mt-8 p-6 bg-red-600/10 border border-[var(--border)] rounded-lg">
                <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed text-center">
                  Você já possui uma <strong>sessão ativa</strong> aguardando uma resposta do seu Especialista
                  Certificado em CSM. Aguarde até que ela seja respondida antes de iniciar uma nova.
                </p>
              </div>
            )}

            <div className="flex justify-end h-1 gap-2">
              {savedMessage && (
                <>
                  <Save className="h-4 w-4" />
                  <span className="inline-block text-gray-400 text-xs rounded-md font-medium animate-pulse">
                    {savedMessage}
                  </span>
                </>
              )}
            </div>

            <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] shadow-sm overflow-hidden">
              <Editor content={content} onChange={handleEditorChange} />
            </div>

            <div>
              <p className="text-[var(--text-secondary)] text-sm font-light italic leading-relaxed text-center px-4">
                <strong>Nota:</strong> Este chat é completamente privado. Somente você tem acesso às suas perguntas e
                respostas. Seu parceiro não pode ver nem editar nada do que você compartilha aqui, embora você possa
                compartilhar suas reflexões posteriormente, se desejar.
              </p>

              <div className="flex flex-col gap-4 mt-4">
                <div className="flex justify-end items-center text-xs mt-3">
                  <div className={wordCount > 2500 ? "text-red-500 font-medium" : "text-[var(--text-secondary)]"}>
                    {wordCount} / 2,500 palavras
                  </div>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={isSubmitting || !content.trim() || userStatus?.hasActiveSession || wordCount > 2500}
                    className={`px-8 py-3 rounded-lg font-semibold transition-all shadow-md ${
                      isSubmitting || !content.trim() || userStatus?.hasActiveSession || wordCount > 2500
                        ? "bg-[var(--surface-variant)] text-[var(--text-secondary)] cursor-not-allowed opacity-70"
                        : "btn-primary hover:shadow-lg"
                    }`}
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : userStatus?.hasActiveSession
                        ? "Awaiting Response..."
                        : wordCount > 2500
                          ? "Trim to ≤ 2,500 words"
                          : `Submit Session (${wordCount} words)`}
                  </motion.button>
                </div>
              </div>
            </div>

            {content && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="border-t border-[var(--border)] pt-6"
              >
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Preview:</h2>
                <div className="p-5 bg-[var(--surface)] rounded-lg border border-[var(--border)] shadow-inner">
                  <div className="prose dark:prose-invert max-w-none text-[var(--text-primary)]">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
