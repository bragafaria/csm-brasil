// src/app/components/Sidebar.js
"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // Add useRouter
import Link from "next/link";
import { supabase } from "@/app/utils/supabaseClient";
import { User, Users, BookOpen, Lightbulb, Settings, HelpCircle, X, ChevronLeft } from "lucide-react";

export default function Sidebar({ sidebarOpen, toggleSidebar, isMobile, siteId }) {
  const [expandedItems, setExpandedItems] = useState([]);
  const [partnerNames, setPartnerNames] = useState({ partnerA: "Partner A", partnerB: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state
  const pathname = usePathname();
  const router = useRouter(); // Add router for redirect

  const createSlug = (name) => {
    if (!name) return "";
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  useEffect(() => {
    async function fetchPartnerNames() {
      if (!siteId) {
        console.error("siteId is undefined in Sidebar");
        setError("Invalid dashboard URL.");
        setLoading(false);
        return;
      }

      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError || !session) {
          console.error("No session found:", sessionError?.message);
          router.push("/login"); // Redirect to login
          return;
        }
        console.log("Sidebar session user ID:", session.user.id);

        const userId = session.user.id;

        // Fetch Partner A data and verify user access
        const { data: partnerAData, error: partnerAError } = await supabase
          .from("users")
          .select("id, name, partner_id")
          .eq("id", siteId)
          .maybeSingle();

        if (partnerAError) {
          console.error("Error fetching Partner A:", partnerAError.message, partnerAError);
          setError("Failed to load partner data.");
          setLoading(false);
          return;
        }

        if (!partnerAData) {
          console.error("No user found for siteId:", siteId);
          setError("No user found for this dashboard.");
          setLoading(false);
          return;
        }

        // Verify user is Partner A or Partner B
        if (userId !== partnerAData.id && userId !== partnerAData.partner_id) {
          console.error("Access denied: User not associated with siteId", { userId, siteId });
          setError("You do not have access to this dashboard.");
          setLoading(false);
          return;
        }

        const partnerAName = partnerAData.name || "Partner A";
        let partnerBName = null;

        if (partnerAData.partner_id) {
          const { data: partnerBData, error: partnerBError } = await supabase
            .from("users")
            .select("name")
            .eq("id", partnerAData.partner_id)
            .maybeSingle();

          if (partnerBError) {
            console.error("Error fetching Partner B:", partnerBError.message, partnerBError);
          } else if (partnerBData) {
            partnerBName = partnerBData.name || "Partner B";
          }
        }

        setPartnerNames({
          partnerA: partnerAName,
          partnerB: partnerBName,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching partner names:", err.message, err);
        setError("An unexpected error occurred.");
        setLoading(false);
      }
    }

    fetchPartnerNames();
  }, [siteId, router]);

  const menuItems = [
    {
      id: "personal-report",
      label: "Personal Report",
      icon: User,
      subItems: [
        {
          label: partnerNames.partnerA,
          route: `/dashboard/${siteId}/personal-report/${createSlug(partnerNames.partnerA)}`,
        },
        ...(partnerNames.partnerB
          ? [
              {
                label: partnerNames.partnerB,
                route: `/dashboard/${siteId}/personal-report/${createSlug(partnerNames.partnerB)}`,
              },
            ]
          : []),
      ],
    },
    {
      id: "couples-report",
      label: "Couple’s Report",
      icon: Users,
      subItems: [{ label: "Report", route: `/dashboard/${siteId}/couples-report/report` }],
    },
    {
      id: "coaching",
      label: "Life Coaching",
      icon: BookOpen,
      subItems: [{ label: "Sessions", route: `/dashboard/${siteId}/coaching/sessions` }],
    },
    {
      id: "learn",
      label: "Learn",
      icon: Lightbulb,
      subItems: [
        { label: "Tips", route: `/dashboard/${siteId}/learn/tips` },
        { label: "Glossary", route: `/dashboard/${siteId}/learn/glossary` },
        { label: "About CSM", route: `/dashboard/${siteId}/learn/about-csm` },
      ],
    },
    {
      id: "account",
      label: "Account",
      icon: Settings,
      subItems: [{ label: "Settings", route: `/dashboard/${siteId}/account/settings` }],
    },
    {
      id: "support",
      label: "Support",
      icon: HelpCircle,
      subItems: [{ label: "Contact us", route: `/dashboard/${siteId}/support/contact-us` }],
    },
  ];

  const toggleExpanded = (itemId) => {
    setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
  };

  const isActive = (route) => pathname === route;

  if (loading) {
    return <div className="p-4 text-[var(--text-primary)]">Loading sidebar...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-400">{error}</div>;
  }

  if (!sidebarOpen) return null;

  return (
    <div
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] ${
        isMobile ? "w-full" : "w-64"
      } bg-[var(--dashboard)] transition-all duration-300 z-30 overflow-hidden`}
    >
      <div className="p-4 overflow-y-auto h-full">
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

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedItems.includes(item.id);
            const hasActiveChild = item.subItems?.some((sub) => isActive(sub.route));

            return (
              <div key={item.id}>
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

                {isExpanded && item.subItems && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.route}
                        href={subItem.route}
                        onClick={toggleSidebar}
                        className={`w-full flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                          isActive(subItem.route)
                            ? "bg-[var(--accent)] bg-opacity-20 text-[var(--text-primary)]"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]"
                        }`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-current mr-2 opacity-50"></div>
                        {subItem.label}
                      </Link>
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
