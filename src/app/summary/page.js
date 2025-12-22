// app/assessment/summary/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Spinner from "@/app/components/ui/Spinner";
import { User, Mail, AlertCircle, CheckCircle } from "lucide-react";
import { createPermanentReportUrl } from "@/app/lib/sharable-url";

// Helper function to safely use localStorage with fallback
const safeLocalStorage = {
  getItem: (key) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return localStorage.getItem(key);
      }
    } catch (e) {
      console.warn("localStorage.getItem failed:", e);
    }
    return null;
  },
  setItem: (key, value) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(key, value);
        return true;
      }
    } catch (e) {
      console.warn("localStorage.setItem failed:", e);
    }
    return false;
  },
  removeItem: (key) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.removeItem(key);
        return true;
      }
    } catch (e) {
      console.warn("localStorage.removeItem failed:", e);
    }
    return false;
  },
};

export default function Summary() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [valid, setValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [confirmEmailTouched, setConfirmEmailTouched] = useState(false);

  useEffect(() => {
    // Add a small delay to ensure localStorage write has completed
    const loadData = () => {
      const stored = safeLocalStorage.getItem("csmAssessmentData");

      if (!stored) {
        console.warn("No assessment data found");
        // Redirect back to test if no data
        router.push("/csm-assessment");
        return;
      }

      try {
        const parsed = JSON.parse(stored);

        if (!parsed?.results?.typeCode) {
          console.error("Invalid assessment data structure:", parsed);
          setError("Assessment data is incomplete. Please retake the test.");
          setIsLoading(false);
          return;
        }

        setData(parsed.results);

        // Show spinner for smooth UX
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      } catch (parseError) {
        console.error("Failed to parse assessment data:", parseError);
        setError("Failed to load your results. Please retake the test.");
        setIsLoading(false);
      }
    };

    // Small delay to ensure navigation + localStorage write is complete
    const timer = setTimeout(loadData, 100);
    return () => clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    const isValid =
      name.trim() !== "" && /\S+@\S+\.\S+/.test(email) && email.toLowerCase() === confirmEmail.toLowerCase();
    setValid(isValid);
  }, [name, email, confirmEmail]);

  // Validation states
  const nameIsValid = name.trim() !== "";
  const showNameError = nameTouched && !nameIsValid;
  const showNameValid = nameTouched && nameIsValid;

  const emailsMatch = email.toLowerCase() === confirmEmail.toLowerCase();
  const showEmailMismatch = confirmEmailTouched && confirmEmail !== "" && !emailsMatch;
  const showEmailMatch = confirmEmailTouched && confirmEmail !== "" && emailsMatch;

  const handleSubmit = async () => {
    if (!valid || !data?.typeCode) {
      setError("Please complete all fields");
      return;
    }

    if (email.toLowerCase() !== confirmEmail.toLowerCase()) {
      setError("Email addresses do not match");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Get full data
      let fullData = {};
      const stored = safeLocalStorage.getItem("csmAssessmentData");

      if (stored) {
        try {
          fullData = JSON.parse(stored);
          fullData.userName = name.trim();
          fullData.userEmail = email.trim();
          fullData.permanentUrl = createPermanentReportUrl(fullData);
          safeLocalStorage.setItem("csmAssessmentData", JSON.stringify(fullData));
        } catch (e) {
          console.warn("Failed to update stored data:", e);
        }
      }

      // Single API call that handles both DB save and email
      const response = await fetch("/api/email/visitors/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          fullData: fullData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save visitor");
      }

      // Navigate to report
      router.push(`/report/${data.typeCode}`);
    } catch (err) {
      console.error("Failed to save visitor:", err);
      setError("Failed to save your info. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-6">
        <div className="flex items-center gap-3">
          <Spinner size="lg" />
          <span className="text-white text-lg">Carregando os resultados...</span>
        </div>
      </div>
    );
  }

  // Error state - no data found
  if (!data) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-6">
        <div className="card-gradient p-8 rounded-lg shadow-custom-lg border border-[var(--border)] max-w-md text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Avaliação não encontrada</h2>
          <p className="text-white/70 mb-6">
            {`We couldn't find your assessment results. This might happen if you're using private browsing mode.`}
          </p>
          <button
            onClick={() => router.push("/assessment/test")}
            className="btn-primary py-3 px-6 rounded-lg font-medium"
          >
            Refazer Avaliação
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--surface)] via-[var(--surface-variant)] to-[var(--surface)] p-2 md:p-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="card-gradient rounded-3xl py-10 px-4 md:p-14 shadow-2xl border border-[var(--border)] backdrop-blur-xl"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
              Parabéns!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-white/90 max-w-xl mx-auto"
            >
              {`Você concluiu a avaliação CSM. Insira seus dados abaixo para acessar seu relatório completo, personalizado.`}
            </motion.p>
          </div>

          {/* Progress Bar – 100% */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mb-10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[var(--accent)]">Avaliação Completa</span>
              <span className="text-sm font-medium text-[var(--accent)]">100%</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
                className="h-full bg-violet-900"
              />
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-indigo-950/10 backdrop-blur-3xl rounded-2xl px-4 py-8 md:p-10 border border-white/20 shadow-xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">Sua Avaliação Está Pronta</h3>

            <div className="space-y-6 max-w-md mx-auto">
              {/* Name */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <User className="w-5 h-5 text-white/70" />
                  <p className="text-white/90 text-sm font-medium">
                    Nome <span className="font-normal text-white/70">(personalizaremos seu relatório)</span>
                  </p>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setNameTouched(true)}
                    aria-label="Your first name"
                    className={`w-full px-5 py-4 rounded-xl bg-white/5 text-white placeholder-white/70 
                               focus:outline-none focus:ring-2 
                               transition-all duration-300 text-lg font-medium
                               ${
                                 showNameError
                                   ? "border-2 border-red-400 focus:border-red-400 focus:ring-red-400/30"
                                   : showNameValid
                                     ? "border-2 border-green-400 focus:border-green-400 focus:ring-green-400/30"
                                     : "border border-white/30 focus:border-white focus:ring-white/30"
                               }`}
                    required
                  />
                </div>

                {/* Name validation feedback */}
                {showNameError && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mt-2 text-red-300 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Por favor, insira seu nome</span>
                  </motion.div>
                )}

                {showNameValid && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mt-2 text-green-300 text-sm"
                  >
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Name parece correto</span>
                  </motion.div>
                )}
              </div>

              {/* Email */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-5 h-5 text-white/70" />
                  <p className="text-white/90 text-sm font-medium">
                    Email{" "}
                    <span className="font-normal text-white/70">(sua avaliação será enviada para este endereço)</span>
                  </p>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    aria-label="Your email address"
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/30 text-white placeholder-white/70 
                               focus:outline-none focus:border-white focus:ring-2 focus:ring-white/30 
                               transition-all duration-300 text-lg font-medium"
                    required
                  />
                </div>
              </div>

              {/* Confirm Email */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-5 h-5 text-white/70" />
                  <p className="text-white/90 text-sm font-medium">Confirme seu email</p>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Confirm your email"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    onBlur={() => setConfirmEmailTouched(true)}
                    aria-label="Confirm your email address"
                    className={`w-full px-5 py-4 rounded-xl bg-white/5 text-white placeholder-white/70 
                               focus:outline-none focus:ring-2 
                               transition-all duration-300 text-lg font-medium
                               ${
                                 showEmailMismatch
                                   ? "border-2 border-red-400 focus:border-red-400 focus:ring-red-400/30"
                                   : showEmailMatch
                                     ? "border-2 border-green-400 focus:border-green-400 focus:ring-green-400/30"
                                     : "border border-white/30 focus:border-white focus:ring-white/30"
                               }`}
                    required
                  />
                </div>

                {/* Real-time validation feedback */}
                {showEmailMismatch && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mt-2 text-red-300 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Endereço de email diferente</span>
                  </motion.div>
                )}

                {showEmailMatch && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mt-2 text-green-300 text-sm"
                  >
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Endereço de email correto</span>
                  </motion.div>
                )}
              </div>

              {/* Error */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-300 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}

              {/* Submit */}
              <motion.button
                whileHover={valid ? { scale: 1.03, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" } : {}}
                whileTap={valid ? { scale: 0.98 } : {}}
                onClick={handleSubmit}
                disabled={!valid || isSubmitting}
                className={`w-full py-5 rounded-xl font-bold text-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-3 ${
                  valid && !isSubmitting
                    ? "btn-primary text-[var(--primary)] hover:shadow-2xl"
                    : "btn-primary text-white/70 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Spinner className="text-white" size="sm" />
                    Carregando Relatório...
                  </>
                ) : valid ? (
                  <>
                    Veja seu relatório completo
                    <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                      →
                    </motion.div>
                  </>
                ) : (
                  "Enter Name & Email"
                )}
              </motion.button>
            </div>

            {/* Privacy Note */}
            <p className="text-white/60 text-center text-xs leading-relaxed mt-6">
              Seus dados nunca serão compartilhados com terceiros. Nós respectamos sua privacidade.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
