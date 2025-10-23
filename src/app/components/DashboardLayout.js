// src/app/components/DashboardLayout.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Added useRouter
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { supabase } from "@/app/utils/supabaseClient";

export default function DashboardLayout({ children }) {
  const params = useParams();
  const router = useRouter(); // Added for redirect after logout
  const siteId = params.siteId; // Use siteId instead of userId
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
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
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error.message, error);
        return;
      }
      console.log("Logged out successfully");
      router.push("/login"); // Redirect to login page
    } catch (err) {
      console.error("Unexpected error in handleLogout:", err.message, err);
    }
  };

  return (
    <div className="min-h-screen surface">
      <nav className="fixed top-0 w-full bg-[var(--dashboard)]/80 backdrop-blur-md border-b border-[var(--primary)]/20 z-50">
        <div className="flex items-center justify-between px-4 py-3 h-full">
          {!sidebarOpen && (isMobile || !isMobile) && (
            <div className="ml-4 flex items-center gap-2">
              <Menu onClick={toggleSidebar} size={24} />
              {!isMobile && <span>Menu</span>}
            </div>
          )}
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold text-primary bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
              CSM Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-sm font-medium text-primary hover:underline" onClick={handleLogout}>
              Logout
            </button>
            <div className="w-8 h-8 rounded-full primary-gradient flex items-center justify-center">
              <span className="text-sm font-medium text-white">U</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} siteId={siteId} />
        <main className={`flex-1 transition-all duration-300 ${!isMobile && sidebarOpen ? "ml-64" : ""}`}>
          {(isMobile && !sidebarOpen) || !isMobile ? <div>{children}</div> : null}
        </main>
      </div>
    </div>
  );
}
