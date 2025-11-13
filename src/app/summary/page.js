// app/assessment/summary/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Spinner from "@/app/components/ui/Spinner";

export default function Summary() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("csmAssessmentData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setData(parsed.results);
    }
  }, []);

  useEffect(() => {
    setValid(name.trim() !== "" && /\S+@\S+\.\S+/.test(email));
  }, [name, email]);

  const handleSubmit = () => {
    if (valid && data?.typeCode) {
      router.push(`/report/${data.typeCode}`);
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
    <>
      <main className="min-h-screen bg-[var(--surface)] p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="card-gradient p-8 md:p-10 rounded-2xl shadow-custom-lg border border-[var(--border)]"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[var(--surface-variant)] p-6 md:p-8 rounded-2xl border border-[var(--border)] shadow-md"
            >
              <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] text-center mb-6">
                Unlock Your Full Personalized Report
              </h3>
              <div className="space-y-4 max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
                  required
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
                  required
                />
                <motion.button
                  whileHover={valid ? { scale: 1.02 } : {}}
                  whileTap={valid ? { scale: 0.98 } : {}}
                  onClick={handleSubmit}
                  disabled={!valid}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all shadow-md ${
                    valid
                      ? "btn-primary hover:shadow-lg"
                      : "bg-[var(--surface)] text-[var(--text-secondary)] opacity-60 cursor-not-allowed"
                  }`}
                >
                  {valid ? "View Full Report →" : "Enter Name & Email"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Modal */}
    </>
  );
}
