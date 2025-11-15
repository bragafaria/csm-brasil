// app/assessment/summary/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import Spinner from "@/app/components/ui/Spinner";
import { Shield, User, Mail } from "lucide-react";

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function Summary() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true); // ← Added for delay

  useEffect(() => {
    const stored = localStorage.getItem("csmAssessmentData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setData(parsed.results);

      // Smooth UX: Show spinner for 300ms even if data loads instantly
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const isValid = name.trim() !== "" && /\S+@\S+\.\S+/.test(email);
    setValid(isValid);
  }, [name, email]);

  const handleSubmit = async () => {
    if (!valid || !data?.typeCode) return;

    setIsSubmitting(true);
    setError("");

    try {
      const { error: dbError } = await supabase.from("visitors").insert({ name: name.trim(), email: email.trim() });
      if (dbError) throw dbError;

      const stored = localStorage.getItem("csmAssessmentData");
      if (stored) {
        const fullData = JSON.parse(stored);
        fullData.userName = name.trim();
        localStorage.setItem("csmAssessmentData", JSON.stringify(fullData));
      }

      router.push(`/report/${data.typeCode}`);
    } catch (err) {
      console.error("Failed to save visitor:", err);
      setError("Failed to save your info. Please try again.");
      setIsSubmitting(false);
    }
  };

  // ← Show spinner during artificial delay
  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-6">
        <div className="flex items-center gap-3">
          <Spinner size="lg" />
          <span className="text-white text-lg">Loading your results...</span>
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
          {/* ... rest of your JSX (unchanged) ... */}
          {/* Header */}
          <div className="text-center mb-10">
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
              Congratulations!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-white/90 max-w-xl mx-auto"
            >
              You’ve completed the CSM assessment. Enter your details below to access your personalized report.
            </motion.p>
          </div>

          {/* Progress Bar – 100% */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mb-10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[var(--accent)]">Assessment Complete</span>
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
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">Your Full Report Is Ready</h3>

            <div className="space-y-6 max-w-md mx-auto">
              {/* Name */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <User className="w-5 h-5 text-white/70" />
                  <p className="text-white/90 text-sm font-medium">
                    Name <span className="font-normal text-white/70">(will personalize your report)</span>
                  </p>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-label="Your first name"
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/30 text-white placeholder-white/70 
                               focus:outline-none focus:border-white focus:ring-2 focus:ring-white/30 
                               transition-all duration-300 text-lg font-medium"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-5 h-5 text-white/70" />
                  <p className="text-white/90 text-sm font-medium">
                    Email{" "}
                    <span className="font-normal text-white/70">
                      (report will also be sent directly to your inbox, instantly)
                    </span>
                  </p>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Your email address"
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/30 text-white placeholder-white/70 
                               focus:outline-none focus:border-white focus:ring-2 focus:ring-white/30 
                               transition-all duration-300 text-lg font-medium"
                    required
                  />
                </div>
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
                    Saving...
                  </>
                ) : valid ? (
                  <>
                    View Full Report
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
              Your data is secure and only used to personalize your report. We respect your privacy.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
