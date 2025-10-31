// src/app/components/DashboardHeader.js
"use client";

import { supabase } from "@/utils/supabaseClient";
import { motion } from "framer-motion";

export default function DashboardHeader() {
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error.message);
      } else {
        console.log("Logged out successfully");
        window.location.href = "/"; // Force redirect
      }
    } catch (err) {
      console.error("Unexpected logout error:", err);
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--dashboard)]/90 backdrop-blur-lg border-b border-[var(--border)] shadow-sm"
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Logo / Title */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
            CSM Dashboard
          </h1>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] hover:underline transition-all"
            aria-label="Logout"
          >
            Logout
          </motion.button>

          <div className="w-9 h-9 rounded-full primary-gradient flex items-center justify-center shadow-md">
            <span className="text-sm font-bold text-white">V</span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
