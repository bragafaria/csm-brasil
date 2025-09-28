"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { User, Users, BookOpen, Lightbulb, Settings, HelpCircle, X, ChevronLeft } from "lucide-react";

const menuItems = [
  {
    id: "personal-report",
    label: "Personal Report",
    icon: User,
    subItems: [
      { label: "Partner A", route: "/dashboard/[userId]/personal-report/partner-a" },
      { label: "Partner B", route: "/dashboard/[userId]/personal-report/partner-b" },
    ],
  },
  {
    id: "couples-report",
    label: "Couple’s Report",
    icon: Users,
    subItems: [{ label: "Report", route: "/dashboard/[userId]/couples-report/report" }],
  },
  {
    id: "coaching",
    label: "Coaching",
    icon: BookOpen,
    subItems: [{ label: "Sessions", route: "/dashboard/[userId]/coaching/sessions" }],
  },
  {
    id: "learn",
    label: "Learn",
    icon: Lightbulb,
    subItems: [
      { label: "Tips", route: "/dashboard/[userId]/learn/tips" },
      { label: "Glossary", route: "/dashboard/[userId]/learn/glossary" },
      { label: "About CSM", route: "/dashboard/[userId]/learn/about-csm" },
    ],
  },
  {
    id: "account",
    label: "Account",
    icon: Settings,
    subItems: [{ label: "Settings", route: "/dashboard/[userId]/account/settings" }],
  },
  {
    id: "support",
    label: "Support",
    icon: HelpCircle,
    subItems: [{ label: "Contact us", route: "/dashboard/[userId]/support/contact-us" }],
  },
];

export default function Sidebar({ sidebarOpen, toggleSidebar, isMobile }) {
  const [expandedItems, setExpandedItems] = useState([]);
  const pathname = usePathname();

  const toggleExpanded = (itemId) => {
    setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
  };

  const isActive = (route) => pathname === route;

  if (!sidebarOpen) return null;

  return (
    <div
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] ${
        isMobile ? "w-full" : "w-64"
      } bg-[var(--dashboard)] transition-all duration-300 z-30 overflow-hidden`}
    >
      <div className="p-4 overflow-y-auto h-full">
        {/* Dashboard Header */}
        <div className="flex justify-between mb-6 w-full">
          <h2 className="text-xs font-semibold text-secondary uppercase tracking-wider">Dashboard</h2>
          <div>
            {isMobile ? (
              <X className="absolute top-3 right-3 cursor-pointer" onClick={toggleSidebar} />
            ) : (
              <ChevronLeft className="absolute top-3 right-3 cursor-pointer" onClick={toggleSidebar} />
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedItems.includes(item.id);
            const hasActiveChild = item.subItems?.some((sub) => isActive(sub.route));

            return (
              <div key={item.id}>
                {/* Main Item */}
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-colors group ${
                    hasActiveChild
                      ? "bg-[var(--primary)] text-white"
                      : "hover:bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <Icon size={20} className="mr-3 flex-shrink-0" />
                  <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                </button>

                {/* Sub Items */}
                {isExpanded && item.subItems && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.route}
                        onClick={toggleSidebar} // Close sidebar on mobile when clicking a sub-item
                        className={`w-full flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                          isActive(subItem.route)
                            ? "bg-[var(--accent)] bg-opacity-20 text-[var(--accent)]"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]"
                        }`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-current mr-2 opacity-50"></div>
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
