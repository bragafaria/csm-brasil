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
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--dashboard)]/90 backdrop-blur-lg border-b border-[var(--border)]">
        <nav className="flex items-center justify-between px-2 sm:px-4 py-2.5 sm:py-3 md:px-6">
          {/* Mobile Menu Toggle (Left) */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleSidebar}
            className="flex items-center gap-1 sm:gap-2 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors p-1.5 sm:p-0"
            aria-label="Toggle menu"
          >
            <Menu size={20} className="sm:w-6 sm:h-6" />
            {!isMobile && <span className="text-sm font-medium">Menu</span>}
          </motion.button>

          {/* Logo (Center on mobile, natural position on desktop) */}
          <div className="flex items-center gap-1.5 sm:gap-2 absolute left-1/2 -translate-x-1/2 sm:relative sm:left-0 sm:translate-x-0">
            <Image
              src="/logo_transparent_svg.svg"
              alt="CSM Dynamics Logo"
              width={24}
              height={24}
              className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
            />
            <div className="flex items-center gap-0.5 sm:gap-1">
              <h1 className="text-base sm:text-lg md:text-xl font-bold text-[var(--primary)]">CSM</h1>
              <h1 className="text-base sm:text-lg md:text-xl font-light text-white">Dynamics</h1>
            </div>
          </div>

          {/* Logout Button (Right) */}
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="btn-primary px-3 py-1.5 md:px-6 md:py-2 rounded-lg text-sm md:text-base font-semibold cursor-pointer"
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

      {/* Main Layout */}
      <div className="flex pt-14 sm:pt-16 min-h-screen">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} siteId={siteId} />

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`flex-1 transition-all duration-300 ${!isMobile && sidebarOpen ? "ml-64" : "ml-0"}`}
        >
          <div className="py-4 sm:px-2 md:p-6 lg:p-8">{(isMobile && !sidebarOpen) || !isMobile ? children : null}</div>
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
