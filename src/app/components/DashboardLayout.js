"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar hidden by default on mobile
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      setIsMobile(width < 430);
      if (width >= 430) {
        setSidebarOpen(true); // Sidebar open by default on desktop
      } else {
        setSidebarOpen(false); // Sidebar closed by default on mobile
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen surface">
      {/* Top Navbar */}
      <nav className="fixed top-0 w-full bg-[var(--surface)]/80 backdrop-blur-md border-b border-[var(--primary)]/20 z-50">
        <div className="flex items-center justify-between px-4 py-3 h-full">
          {/* Hamburger Menu for both Mobile and Desktop when sidebar is closed */}
          {!sidebarOpen && (isMobile || !isMobile) && (
            <div className="ml-4 flex items-center gap-2">
              <Menu onClick={toggleSidebar} size={24} />
              {!isMobile && <span>Menu</span>} {/* Optional: Show "Menu" text on desktop */}
            </div>
          )}
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold text-primary bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
              CSM Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full primary-gradient flex items-center justify-center">
              <span className="text-sm font-medium text-white">U</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Layout Container */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${!isMobile && sidebarOpen ? "ml-64" : ""}`}>
          {(isMobile && !sidebarOpen) || !isMobile ? <div>{children}</div> : null}
        </main>
      </div>
    </div>
  );
}
