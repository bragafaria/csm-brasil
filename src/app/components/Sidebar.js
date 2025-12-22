// src/app/components/Sidebar.js
"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/utils/supabaseClient";
import { User, Users, BookOpen, Settings, HelpCircle, X, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import Spinner from "@/app/components/ui/Spinner";

export default function Sidebar({ sidebarOpen, toggleSidebar, isMobile, siteId }) {
  const [expandedItems, setExpandedItems] = useState([]);
  const [partnerNames, setPartnerNames] = useState({ partnerA: "Partner A", partnerB: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuItems, setMenuItems] = useState([
    {
      id: "home",
      label: "Home",
      icon: User,
      route: `/dashboard/${siteId}`,
    },
    {
      id: "personal-report",
      label: "Personal Report",
      icon: User,
      subItems: [],
    },
    {
      id: "couples-report",
      label: "Couple’s Report",
      icon: Users,
      subItems: [
        {
          label: "How You Connect",
          route: `/dashboard/${siteId}/couples-report/how-you-connect`,
        },

        {
          label: "Life Challenges",
          route: `/dashboard/${siteId}/couples-report/your-10-life-challenges`,
        },
        {
          label: "Analytics",
          route: `/dashboard/${siteId}/couples-report/analytics`,
        },
      ],
    },
    {
      id: "coaching",
      label: "CSM Sessions",
      icon: BookOpen,
      subItems: [{ label: "Private Sessions", route: `/dashboard/${siteId}/coaching/sessions` }],
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
  ]);

  const pathname = usePathname();
  const router = useRouter();

  const createSlug = (name) => {
    if (!name) return "";
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const toggleExpanded = (itemId) => {
    setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
  };

  // ONLY THIS useEffect IS NEW — everything else is YOUR original code
  useEffect(() => {
    const activeParentId = menuItems.find((item) => item.subItems?.some((sub) => sub.route === pathname))?.id;

    if (activeParentId) {
      setExpandedItems([activeParentId]); // ONLY the current section stays open
    }
  }, [pathname, menuItems]);
  // END OF CHANGE

  useEffect(() => {
    async function fetchPartnerNames() {
      if (!siteId) {
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
          setError("Please log in to access the dashboard.");
          setLoading(false);
          router.push("/login");
          return;
        }

        const userId = session.user.id;

        const { data: partnerAData, error: partnerAError } = await supabase
          .from("users")
          .select("id, name, partner_id, has_assessment, site_id")
          .eq("id", siteId)
          .single();

        if (partnerAError || !partnerAData) {
          setError("Failed to load partner data.");
          setLoading(false);
          return;
        }

        if (userId !== partnerAData.id && userId !== partnerAData.partner_id) {
          setError("You do not have access to this dashboard.");
          setLoading(false);
          return;
        }

        const partnerAName = partnerAData.name || "Partner A";
        const partnerASlug = createSlug(partnerAName);
        const site_id = partnerAData.site_id;

        const personalReportSubItems = [
          {
            label: `${partnerAName}`,
            route: `/dashboard/${site_id}/personal-report/${partnerASlug}`,
          },
        ];

        let partnerBName = null;

        if (partnerAData.partner_id) {
          const { data: partnerBData, error: partnerBError } = await supabase
            .from("users")
            .select("name, has_assessment")
            .eq("id", partnerAData.partner_id)
            .single();

          if (!partnerBError && partnerBData) {
            partnerBName = partnerBData.name || "Partner B";
            const partnerBSlug = createSlug(partnerBName);

            personalReportSubItems.push({
              label: `${partnerBName}`,
              route: `/dashboard/${site_id}/personal-report/${partnerBSlug}`,
            });
          }
        }

        setPartnerNames({ partnerA: partnerAName, partnerB: partnerBName });

        setMenuItems((prev) =>
          prev.map((item) => (item.id === "personal-report" ? { ...item, subItems: personalReportSubItems } : item))
        );

        setLoading(false);
      } catch (err) {
        console.error("Error fetching partners:", err);
        setError("Failed to load sidebar.");
        setLoading(false);
      }
    }

    fetchPartnerNames();
  }, [siteId, router]);

  const isActive = (route) => pathname === route;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-6 bg-[var(--surface)]">
        <Spinner></Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full p-6 bg-[var(--surface)]">
        <div className="text-red-400 text-center text-sm font-medium">{error}</div>
      </div>
    );
  }

  if (!sidebarOpen) return null;

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: sidebarOpen ? 0 : -300 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] ${
        isMobile ? "w-full" : "w-64"
      } bg-[var(--dashboard)] z-30 flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 ">
        <h2 className="text-xs md:text-base font-semibold text-[var(--text-secondary)] uppercase tracking-widest">
          Dashboard
        </h2>
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-lg hover:bg-[var(--surface-variant-hover)] transition-all"
          aria-label="Close sidebar"
        >
          {isMobile ? <X size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isExpanded = expandedItems.includes(item.id);
          const hasActiveChild = item.subItems?.some((sub) => isActive(sub.route));

          if (item.id === "home") {
            return (
              <Link
                key={item.id}
                href={item.route}
                onClick={isMobile ? toggleSidebar : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all group ${
                  isActive(item.route)
                    ? "bg-[var(--primary)] text-white shadow-md"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface-variant)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          }

          return (
            <div key={item.id} className="space-y-1">
              <button
                onClick={() => toggleExpanded(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all group ${
                  hasActiveChild
                    ? "bg-[var(--primary)] text-white shadow-md"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface-variant)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                <motion.div animate={{ rotate: isExpanded ? 0 : -90 }} transition={{ duration: 0.2 }}>
                  <ChevronLeft size={16} className="text-current opacity-70" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {isExpanded && item.subItems?.length > 0 && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.route}
                        href={sub.route}
                        onClick={isMobile ? toggleSidebar : undefined}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                          isActive(sub.route)
                            ? "text-violet-400"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-variant)]"
                        }`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-current opacity-50"></div>
                        <span>{sub.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          );
        })}
      </nav>

      {partnerNames.partnerB && (
        <div className="p-4 border-t border-[var(--border)] text-xs">
          <p className="text-[var(--text-secondary)]">
            <strong>{partnerNames.partnerA}</strong> & <strong>{partnerNames.partnerB}</strong>
          </p>
        </div>
      )}
    </motion.div>
  );
}
