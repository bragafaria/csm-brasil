// src/app/components/DashboardLayout.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { supabase } from "@/app/utils/supabaseClient";
import { motion } from "framer-motion";
import Image from "next/image";

export default function DashboardLayout({ children }) {
  const params = useParams();
  const router = useRouter();
  const siteId = params.siteId;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 430);
      if (width >= 430) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error.message, error);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        console.error("Session still exists after signOut:", session);
        return;
      }

      console.log("Logged out successfully");
      localStorage.removeItem("supabase.auth.token");
      router.push("/");
    } catch (err) {
      console.error("Unexpected error in handleLogout:", err.message, err);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--dashboard)]/90 backdrop-blur-lg border-b border-[var(--border)]">
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleSidebar}
            className="flex items-center gap-2 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
            {!isMobile && <span className="text-sm font-medium">Menu</span>}
          </motion.button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src="/logo_transparent_svg.svg" alt="CSM Dynamics Logo" width={28} height={28} className="h-7 w-7" />
            <div className="flex items-center gap-1">
              <h1 className="text-xl font-bold text-[var(--primary)]">CSM</h1>
              <h1 className="text-xl font-light text-white">Dynamics</h1>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3 mr-4 border border-white rounded-lg px-4 py-2 hover:border-[var(--primary)] hover:bg-[var(--primary)] cursor-pointer">
            <button onClick={handleLogout} className="text-sm font-medium text-[var(--text-secondary)] ">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="flex pt-16 min-h-screen">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} siteId={siteId} />

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`flex-1 transition-all duration-300 ${!isMobile && sidebarOpen ? "ml-64" : "ml-0"}`}
        >
          <div className="p-4 md:p-6 lg:p-8">{(isMobile && !sidebarOpen) || !isMobile ? children : null}</div>
        </motion.main>
      </div>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-20"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
