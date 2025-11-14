// app/assessment/summary/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import Spinner from "@/app/components/ui/Spinner";

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

  useEffect(() => {
    const stored = localStorage.getItem("csmAssessmentData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setData(parsed.results);
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
      // 1. Save to Supabase
      const { error: dbError } = await supabase.from("visitors").insert({ name: name.trim(), email: email.trim() });

      if (dbError) throw dbError;

      // 2. Save userName to localStorage (only name, not email)
      const stored = localStorage.getItem("csmAssessmentData");
      if (stored) {
        const fullData = JSON.parse(stored);
        fullData.userName = name.trim(); // Add userName
        localStorage.setItem("csmAssessmentData", JSON.stringify(fullData));
      }

      // 3. Redirect to free report
      router.push(`/report/${data.typeCode}`);
    } catch (err) {
      console.error("Failed to save visitor:", err);
      setError("Failed to save your info. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-6">
        <div className="flex items-center gap-3">
          <Spinner>Validating results...</Spinner>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--surface)] via-[var(--surface-variant)] to-[var(--surface)] p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="hero-gradient rounded-3xl p-10 md:p-14 shadow-2xl border border-[var(--border)] backdrop-blur-xl"
        >
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
              You’ve completed the CSM assessment. Enter your details below to unlock your personalized report.
            </motion.p>
          </div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-10 border border-white/20 shadow-xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">Your Full Report Awaits</h3>

            <div className="space-y-6 max-w-md mx-auto">
              {/* Name Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="First Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 
                           focus:outline-none focus:border-white focus:ring-2 focus:ring-white/50 
                           transition-all duration-300 text-lg font-medium"
                  required
                />
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <motion.div
                    animate={{ scale: name ? 1 : 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="w-6 h-6 rounded-full bg-white/30"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 
                           focus:outline-none focus:border-white focus:ring-2 focus:ring-white/50 
                           transition-all duration-300 text-lg font-medium"
                  required
                />
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <motion.div
                    animate={{ scale: /\S+@\S+\.\S+/.test(email) ? 1 : 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="w-6 h-6 rounded-full bg-white/30"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-300 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={valid ? { scale: 1.03, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" } : {}}
                whileTap={valid ? { scale: 0.98 } : {}}
                onClick={handleSubmit}
                disabled={!valid || isSubmitting}
                className={`w-full py-5 rounded-xl font-bold text-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-3 ${
                  valid && !isSubmitting
                    ? "bg-white text-[var(--primary)] hover:shadow-2xl"
                    : "bg-white/30 text-white/70 cursor-not-allowed"
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
            <p className="text-white/60 text-xs text-center mt-6 max-w-sm mx-auto">
              Your data is secure and only used to personalize your report. We respect your privacy.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
