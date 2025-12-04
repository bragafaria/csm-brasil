"use client";
import Link from "next/link";
import FaqJsonLd from "@/app/components/FaqJsonLd";
import { useRouter, usePathname } from "next/navigation";
import {
  Heart,
  Users,
  Target,
  Shield,
  ArrowRight,
  Star,
  HelpCircle,
  Brain,
  ChevronUp,
  ChevronDown,
  X,
  Menu,
} from "lucide-react";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { supabase } from "@/app/utils/supabaseClient";
import { RotatingWord } from "@/app/components/ui/RotatingWord";
import ConnectionsParticles from "@/app/components/ConnectionsParticles";
import ConnectionsTitle from "@/app/components/ConnectionsTitle";
import Image from "next/image";
import TermsModal from "@/app/components/terms-of-service/TermsModal";
import PrivacyModal from "@/app/components/terms-of-service/PrivacyModal";
import RefundModal from "@/app/components/terms-of-service/RefundModal";
//import BrazilGeoModal from "@/app/components/geolocation/BrazilGeoModal";

export default function Home() {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [activeNav, setActiveNav] = useState("home");
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // Force re-mount of animated sections on route change
  const [routeKey, setRouteKey] = useState(0);
  useEffect(() => {
    setRouteKey((prev) => prev + 1);
  }, [pathname]);

  // CONSOLIDATED: Mobile menu effects (scroll lock + click outside)
  useEffect(() => {
    if (!mobileMenuOpen) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Handle click outside
    const handleClickOutside = (event) => {
      if (!event.target.closest("nav")) {
        setMobileMenuOpen(false);
      }
    };

    // Handle escape key
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    // Cleanup
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMenuOpen]);

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleStartTest = async () => {
    localStorage.removeItem("csmAnswers");
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      setLoggingOut(true);
      try {
        const res = await fetch("/api/auth/logout", { method: "POST" });
        if (!res.ok) throw new Error("Logout failed");
      } catch (e) {
        console.error(e);
        await supabase.auth.signOut();
      } finally {
        setLoggingOut(false);
      }
    }
    router.push("/csm-assessment");
  };

  const headlineVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay: i * 0.3, ease: "easeOut" },
      }),
    }),
    []
  );

  const buttonVariants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut", delay: 0.9 },
      },
      hover: {
        scale: 1.05,
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
        transition: { duration: 0.3, ease: "easeOut", yoyo: Infinity },
      },
    }),
    []
  );

  // Do the same for: stepVariants, circleVariants, cardVariants, headerVariants

  const stepVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 30 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.2, ease: "easeOut" },
      }),
    }),
    []
  );

  const circleVariants = useMemo(
    () => ({
      hidden: { scale: 0.8, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    }),
    []
  );

  const headerVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    }),
    []
  );

  const faqHeaderRef = useRef(null);
  const isFaqHeaderInView = useInView(faqHeaderRef, { once: false, amount: 0.2 });

  const scrollToSection = useCallback(
    (id) => {
      if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (id === "blog") {
        router.push("/blog");
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
      setActiveNav(id);
      setMobileMenuOpen(false);
    },
    [router]
  );

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text-primary)]">
      {/* <BrazilGeoModal /> */}
      <FaqJsonLd />
      {/* Sticky Header */}
      <header className="fixed top-0 w-full left-0 right-0 z-50 bg-[var(--dashboard)]/90 backdrop-blur-lg border-b border-[var(--border)]">
        <nav className="container mx-auto px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Mobile: Hamburger Menu (Left) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 hover:bg-[var(--surface)]/20 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6 text-[var(--text-primary)]" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-[var(--text-primary)]" />
              )}
            </button>

            {/* Mobile: Logo (Center) & Desktop: Logo (Left) */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 md:flex-none absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0">
              <Image
                src="/logo_transparent_svg.svg"
                alt="CSM Dynamics Logo"
                width={32}
                height={32}
                className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8"
              />
              <button onClick={() => router.push("/")}>
                <div className="flex items-center space-x-0.5 sm:space-x-1">
                  <h1 className="text-sm sm:text-base md:text-xl font-bold text-[var(--primary)] drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
                    CSM
                  </h1>
                  <h1 className="text-sm sm:text-base md:text-xl font-light text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
                    Dynamics
                  </h1>
                </div>
              </button>
            </div>

            {/* Desktop: Navigation Links (Center) */}
            <div className="hidden md:flex space-x-4 lg:space-x-8">
              {[
                { id: "home", label: "Home" },
                { id: "how-it-works", label: "How It Works" },
                { id: "whats-inside", label: "What's Inside" },
                { id: "faq", label: "FAQ" },
                { id: "blog", label: "Blog" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm lg:text-base transition-colors ${
                    activeNav === item.id
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile & Desktop: Login Button (Right) */}
            <button
              onClick={() => router.push("/login")}
              className="btn-primary px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-6 md:py-2 rounded-lg text-xs sm:text-sm md:text-base font-semibold cursor-pointer whitespace-nowrap"
            >
              Login
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-3 sm:px-4 py-3 sm:py-4 bg-[var(--dashboard)] border-t border-[var(--border)]">
            <div className="flex flex-col space-y-1">
              {[
                { id: "home", label: "Home" },
                { id: "how-it-works", label: "How It Works" },
                { id: "whats-inside", label: "What's Inside" },
                { id: "faq", label: "FAQ" },
                { id: "blog", label: "Blog" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                    activeNav === item.id
                      ? "bg-[var(--primary)]/10 text-[var(--accent)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--surface)]/20 hover:text-[var(--text-primary)]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Overlay when mobile menu is open */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
      {/* Hero Section */}
      <section className="relative section-full flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--primary-rgb),0.2)] via-transparent to-[rgba(var(--accent-rgb),0.2)]"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-[rgba(var(--primary-rgb),0.1)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[rgba(var(--accent-rgb),0.1)] rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto md:mt-12 mt-8 px-3 sm:px-4 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              <motion.span
                custom={0}
                initial="hidden"
                animate="visible"
                variants={headlineVariants}
                className="block bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-primary)] to-[var(--text-primary)] gradient-text md:pb-4"
              >
                Stronger Relationships
              </motion.span>
            </h1>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              <motion.span
                custom={1}
                initial="hidden"
                animate="visible"
                variants={headlineVariants}
                className="block bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-primary)] to-[var(--text-primary)] gradient-text md:pb-4"
              >
                Start With
              </motion.span>
            </h1>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl  font-bold leading-tight mb-4 sm:mb-6">
              <motion.span
                custom={2}
                initial="hidden"
                animate="visible"
                variants={headlineVariants}
                className="block bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--primary)] gradient-text pb-4"
              >
                Understanding
              </motion.span>
            </h1>

            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto mb-10">
              The Cognitive Spectrum Model (CSM) is a framework that maps how you think and connect, providing clear
              steps for personal growth and stronger relationships.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2">
              <motion.button
                initial="hidden"
                animate="visible"
                whileHover="hover"
                onClick={handleStartTest}
                disabled={loggingOut}
                variants={buttonVariants}
                className="group bg-[var(--primary)] hover:bg-[var(--primary-dark)] px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 shadow-2xl flex items-center space-x-2 text-[var(--text-primary)] max-w-sm md:max-w-md sm:w-auto justify-center"
              >
                <span>{loggingOut ? "Preparing…" : "Take Free Test"}</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <p className="text-[var(--text-secondary)] text-xs sm:text-sm">Takes only 10 minutes • Completely free</p>
            </div>

            <div className="my-12 md:my-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2">
              <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-[rgba(var(--primary-rgb),0.1)] to-transparent border border-[rgba(var(--primary-rgb),0.2)] backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  <Counter target={25} suffix="k+" duration={3000} />
                </div>
                <div className="text-[var(--text-secondary)] text-sm sm:text-base">Couples helped</div>
              </div>
              <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-[rgba(var(--accent-rgb),0.1)] to-transparent border border-[rgba(var(--accent-rgb),0.2)] backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  <Counter target={94} suffix="%" duration={3000} />
                </div>
                <div className="text-[var(--text-secondary)] text-sm sm:text-base">Report improvement</div>
              </div>
              <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-[rgba(var(--primary-rgb),0.1)] to-transparent border border-[rgba(var(--primary-rgb),0.2)] backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  <Counter target={4.9} suffix=" ★" duration={3000} decimals={1} />
                </div>
                <div className="text-[var(--text-secondary)] text-sm sm:text-base">Average rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Spectrum Preview */}
      {/* Spectrum Preview */}
      <section className="pt-16 md:py-16 bg-gradient-to-b from-[var(--surface-variant)] to-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold my-6 text-white">Your mind mapped. Not labeled.</h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Personality {`isn't a box. It's`} a spectrum of how your mind actually works. CSM shows you where you
              shine, where you stretch, and how you connect.
            </p>
          </div>

          {/* UPDATED RESPONSIVE LAYOUT */}
          <div className="flex flex-col mt-20">
            <div className="max-w-4xl mx-auto w-full space-y-8 lg:space-y-0">
              {/* Desktop: Two-column layout, Mobile: Stacked in specific order */}
              <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8 lg:mb-18">
                {/* Section 1: Image (order-1 on mobile, left column on desktop) */}
                <div className="order-1 lg:order-none group min-h-[400px] flex flex-col space-y-4 lg:mb-0">
                  <img src="/phone.png" alt="Emma & David" className="mx-auto" />
                </div>

                {/* Section 2: Five Spectrum title (order-2 on mobile, right column on desktop) */}
                <div className="order-2 lg:order-none flex flex-col justify-center space-y-6 lg:pl-8 mb-8 lg:mb-0">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-center text-white">Five Spectrum Cross-Analysis</h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      Explore how your mind operates across the five core dimensions of cognition - Information
                      Processing, Decision-Making, Energy Orientation, Change Approach, and Interpersonal Style.
                    </p>
                  </div>
                </div>

                {/* Section 4: Information Processing card (order-3 on mobile, right column on desktop) */}
                <div className="order-3 lg:order-none lg:col-start-2 lg:row-start-2 mt-4 lg:mb-0">
                  <div
                    className="group bg-gradient-to-br from-[var(--surface-variant)] to-[var(--surface)] p-6 rounded-2xl 
                      shadow-lg border border-[rgba(var(--primary-rgb),0.2)] 
                      hover:border-[rgba(var(--primary-rgb),0.4)] 
                      hover:shadow-2xl transition-all duration-300 
                      hover:-translate-y-1 min-h-[400px] flex flex-col space-y-4 lg:mt-10"
                  >
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold text-[var(--text-primary)]">Information Processing</h3>
                      <p className="text-sm text-[var(--text-secondary)] italic">
                        How do you naturally perceive information?
                      </p>
                    </div>

                    <div className="space-y-4 flex-grow">
                      <div className="bg-gradient-to-r from-green-500/10 to-black/10 p-4 rounded-xl border border-green-400/20 space-y-2">
                        <div className="text-lg font-medium text-[var(--text-primary)] text-center">
                          Concrete Focus (C)
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] text-center italic px-2">
                          Focuses on tangible, verifiable data and practical details in the present moment.
                        </p>
                        <div className="space-y-2">
                          <div className="text-base font-bold text-green-400 text-center">Mild Dominance</div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-[var(--text-primary)]">Primary Preference</span>
                              <HelpCircle className="h-4 w-4 text-green-400" />
                            </div>
                            <span className="text-xl font-bold text-green-400">57%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-green-400 h-2 rounded-full" style={{ width: "57%" }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-red-500/10 to-black/10 p-4 rounded-xl border border-red-400/20 space-y-2">
                        <div className="text-lg font-medium text-[var(--text-primary)] text-center">
                          Abstract Insight (N)
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] text-center italic px-2">
                          Focuses on patterns, possibilities, and future implications.
                        </p>
                        <div className="space-y-2">
                          <div className="text-base font-bold text-red-400 text-center">High Influence</div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-[var(--text-primary)]">
                                Secondary Influence
                              </span>
                              <HelpCircle className="h-4 w-4 text-red-400" />
                            </div>
                            <span className="text-xl font-bold text-red-400">43%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-red-400 h-2 rounded-full" style={{ width: "43%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Depth description (order-4 on mobile, left column on desktop) */}
                <div className="order-4 lg:order-none flex flex-col justify-center space-y-6 lg:pl-8 mt-8 mb-8 lg:mb-0 lg:col-start-1">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-center text-white">Depth and Precision</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      The five CSM dimensions give you a precise and deep look into how you process information, make
                      decisions, and interact with others. This clarity helps you identify strengths, uncover blind
                      spots, and pursue growth with greater purpose.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — FULL TEXT, NO ELLIPSES */}
      <section
        id="how-it-works"
        className="pt-16 md:py-16 py-4 section-full bg-gradient-to-b from-[var(--surface)] to-[var(--surface-variant)]"
      >
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {/* Header - Added responsive text sizes and margins */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-[var(--text-primary)] px-2">
              How It Works
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
              Four simple steps to transform how you understand yourself and each other.
            </p>
          </div>

          {/* Grid - Added responsive gaps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10" key={routeKey}>
            {[
              {
                title: "Take the Free Assessment",
                text: "You can start on your own. Answer a quick, 10-minute questionnaire that reveals your unique Cognitive Spectrum profile.",
              },
              {
                title: "Get Your Results",
                text: "Receive your CSM Archetype instantly, along with percentage-based spectrums and deep insights into your strengths, growth areas, and blind spots",
              },
              {
                title: "Access Your Dashboard",
                text: "Enter your lifetime dashboard to explore your results, track growth, save insights, and use relationship tools anytime, on any device.",
              },
              {
                title: "Invite Your Partner",
                text: "Send a private invite. When they finish, you unlock your joint Couple's Insight Report, showing compatibility patterns, communication strategies, and opportunities for growth.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={stepVariants}
                className="text-center py-2 sm:px-3"
              >
                {/* Circle - Added responsive sizes */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  variants={circleVariants}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[var(--accent)] flex items-center justify-center mx-auto mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-[var(--text-primary)]"
                >
                  {i + 1}
                </motion.div>

                {/* Title - Increased max-width for better mobile display */}
                <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">{step.title}</h3>

                {/* Text - Added max-width for better readability */}
                <p className="text-[var(--text-secondary)] px-4 leading-relaxed flex-grow">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="whats-inside" className="pt-20 md:py-16 relative section-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex flex-wrap items-center justify-center gap-1 md:gap-2">
              <span className="bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-primary)] gradient-text whitespace-nowrap">
                {" "}
                {/* Add gradient-text */}
                Why Couples
              </span>
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-[var(--primary)] rounded-md"></span>
                <RotatingWord
                  words={["Choose", "Love", "Trust", "Value"]}
                  interval={2000}
                  className="relative z-10 text-white font-bold flex items-center justify-center h-full px-3 py-1 md:px-4 md:py-2" // Ensure RotatingWord has text-white or similar
                />
              </span>
              <span className="bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-primary)] gradient-text whitespace-nowrap">
                {" "}
                {/* Add gradient-text */}
                Our Assessment
              </span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
              Understand each other like never before.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8" key={routeKey}>
            {/* NEW: Self-Awareness Card - First Position */}
            <AnimatedCard delay={0}>
              <div
                className="group p-8 rounded-3xl bg-gradient-to-b from-[var(--surface-variant)] to-[var(--surface)] 
                       border border-[rgba(var(--primary-rgb),0.2)] 
                       hover:border-[rgba(var(--primary-rgb),0.4)] 
                       transition-all duration-300 hover:scale-105 
                       h-full min-h-[250px] flex flex-col"
              >
                <div className="w-16 h-16 rounded-2xl bg-[var(--primary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Brain className="h-8 w-8 text-[var(--text-primary)]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Self-Awareness</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed flex-grow">
                  Gain a precise profile of your cognitive and emotional patterns. This gives you the essential
                  foundation for genuine connection and deeper mutual understanding in your relationship.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.1}>
              <div
                className="group p-8 rounded-3xl bg-gradient-to-b from-[var(--surface-variant)] to-[var(--surface)] 
                       border border-[rgba(var(--primary-rgb),0.2)] 
                       hover:border-[rgba(var(--primary-rgb),0.4)] 
                       transition-all duration-300 hover:scale-105 
                       h-full min-h-[250px] flex flex-col"
              >
                <div className="w-16 h-16 rounded-2xl bg-[var(--primary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-[var(--text-primary)]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Couple-Focused</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed flex-grow">
                  Unlike individual personality tests, our framework is crafted to reveal how partners interact. It
                  highlights your relationship dynamics, where you naturally align, and where growth is possible.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <div
                className="group p-8 rounded-3xl bg-gradient-to-b from-[var(--surface-variant)] to-[var(--surface)] 
                       border border-[rgba(var(--primary-rgb),0.2)] 
                       hover:border-[rgba(var(--primary-rgb),0.4)] 
                       transition-all duration-300 hover:scale-105 
                       h-full min-h-[250px] flex flex-col"
              >
                <div className="w-16 h-16 rounded-2xl bg-[var(--primary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target className="h-8 w-8 text-[var(--text-primary)]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Actionable Insights</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed flex-grow">
                  Receive clear, practical recommendations for your unique patterns and communication styles. Turn
                  understanding into meaningful daily improvements.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.3}>
              <div
                className="group p-8 rounded-3xl bg-gradient-to-b from-[var(--surface-variant)] to-[var(--surface)] 
                       border border-[rgba(var(--primary-rgb),0.2)] 
                       hover:border-[rgba(var(--primary-rgb),0.4)] 
                       transition-all duration-300 hover:scale-105 
                       h-full min-h-[250px] flex flex-col"
              >
                <div className="w-16 h-16 rounded-2xl bg-[var(--primary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-[var(--text-primary)]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Research-Based</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed flex-grow">
                  Grounded in decades of relationship psychology research and validated by thousands of thriving
                  couples. It’s science you can trust.
                </p>
              </div>
            </AnimatedCard>
          </div>
        </div>
        <div className="text-center py-10 md:py-20">
          <button
            onClick={handleStartTest}
            className="group bg-[var(--primary)] hover:bg-[var(--primary-dark)] px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-3 mx-auto text-[var(--text-primary)]"
          >
            <span>Take Free Test</span>
            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-[var(--text-secondary)] mt-4 text-xs sm:text-sm">
            Takes only 10 minutes • Completely free
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="pt-20 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white"> What Couples Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Keisha & Darius */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[var(--surface-variant)] to-[var(--surface)] border border-[rgba(var(--primary-rgb),0.2)] flex flex-col h-full">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed flex-grow">
                This assessment revealed communication patterns we never noticed. Our relationship has never been
                stronger!
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src="https://prehqtlubbqfxsdbtypb.supabase.co/storage/v1/object/public/customer-profiles/1.png"
                  alt="Sarah & Mike"
                  className="w-10 h-10 rounded-full object-cover"
                  width="40"
                  height="40"
                />
                <div className="text-[var(--primary)] font-semibold">Keisha & Darius</div>
              </div>
            </div>

            {/* Alex & Jordan */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[var(--surface-variant)] to-[var(--surface)] border border-[rgba(var(--primary-rgb),0.2)] flex flex-col h-full">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed flex-grow">
                Finally, a test that looks at us as a couple, not just individuals. The insights were incredibly
                accurate.
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src="https://prehqtlubbqfxsdbtypb.supabase.co/storage/v1/object/public/customer-profiles/2.png"
                  alt="Alex & Jordan"
                  className="w-10 h-10 rounded-full object-cover"
                  width="40"
                  height="40"
                />
                <div className="text-[var(--primary)] font-semibold">Alex & Jordan</div>
              </div>
            </div>

            {/* Emma & David */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[var(--surface-variant)] to-[var(--surface)] border border-[rgba(var(--primary-rgb),0.2)] flex flex-col h-full">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed flex-grow">
                The personalized recommendations helped us navigate our differences with so much more understanding.
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src="https://prehqtlubbqfxsdbtypb.supabase.co/storage/v1/object/public/customer-profiles/3.png"
                  alt="Emma & David"
                  className="w-10 h-10 rounded-full object-cover"
                  width="40"
                  height="40"
                />
                <div className="text-[var(--primary)] font-semibold">Emma & David</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ — ALL 10 FULL QUESTIONS & ANSWERS */}
      <section id="faq" className="pt-20 md:py-16 px-4 bg-[var(--surface)]">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            ref={faqHeaderRef}
            initial="hidden"
            animate={isFaqHeaderInView ? "visible" : "hidden"}
            variants={headerVariants}
            className="text-center mb-12 section-header"
          >
            <h2 className="text-4xl font-bold mb-6">
              Frequently <span className="text-[var(--accent)]">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-4 mb-12">
            {[
              {
                question: "What is the Cognitive Spectrum Model (CSM), and why should I care?",
                answer:
                  "The Cognitive Spectrum Model, or CSM, is a modern personality framework that evaluates how individuals think and interact across five key spectrums: Information Processing (Concrete versus Abstract), Decision-Making (Analytical versus Empathic), Energy Orientation (Inward versus Outward), Change Approach (Stable versus Adaptive), and Interpersonal Style (Harmony versus Autonomy). By assessing these dimensions, CSM generates one of 32 archetypes, providing a detailed analytics profile that highlights your unique cognitive patterns, individually and within relationships.",
              },
              {
                question: "How is CSM different from MBTI, Enneagram, or Big Five?",
                answer:
                  "While MBTI categorizes people into 16 types, Enneagram focuses on motivations, and the Big Five measures broad traits, CSM provides 32 archetypes supported by spectrum-based analyses for greater precision. By integrating cognitive patterns with real-world interpersonal insights, CSM provides actionable strategies for personal growth and relationship success that other personality frameworks don’t. CSM is particularly valuable for improving self-awareness, enhancing communication, and understanding compatibility in relationships or other interpersonal contexts.",
              },
              {
                question: "Why should I trust CSM over free online quizzes?",
                answer:
                  "Most free personality quizzes oversimplify human behavior. CSM is research-based, psychometrically validated, and designed for practical application in relationships and self-growth. Users consistently report that the insights are accurate, relevant, and immediately actionable, unlike generic quizzes that provide vague or entertainment-focused results.",
              },
              {
                question: "Can CSM really “read” my relationship like a mind reader?",
                answer:
                  "CSM doesn’t guess emotions or predict outcomes intuitively. Instead, it analyzes cognitive alignments, such as how a partner who prefers Harmony might interact with someone who favors Autonomy. It identifies areas of synergy and potential friction. About 94% of users report that CSM provides clearer insights into relationship dynamics, helping them communicate and connect more effectively.",
              },
              {
                question: "Is CSM scientifically legit, or just another buzzword quiz?",
                answer:
                  "CSM is grounded in psychological theory, combining Jungian cognitive functions with Big Five traits. Ongoing research supports its reliability in predicting relational patterns, outperforming other popular personality frameworks in actionable insight. CSM is evidence-based and designed for practical application, not entertainment.",
              },
              {
                question: "How does the free assessment work?",
                answer:
                  "The free CSM assessment is designed to be concise, typically taking 10 to 15 minutes. It blends Likert-scale ratings with situational questions that reveal your cognitive preferences. Upon completion, you receive a free report detailing your archetype, percentage-based spectrum scores, strengths, weaknesses, and preliminary relational insights. The assessment is secure, mobile-friendly, and accessible on any device.",
              },
              {
                question: "Do I need my partner to start?",
                answer:
                  "No. You can complete the free assessment on your own and explore your personal profile first. If you want a full Couple’s Insights Report, your partner will also need to take the assessment. Many users start individually and later invite their partner for a joint analysis.",
              },
              {
                question: "Can CSM predict if we’re soulmates or just spot potential issues?",
                answer:
                  "CSM doesn’t predict destiny or label anyone as a soulmate. Instead, it highlights potential compatibilities and challenges, such as Harmony-Autonomy differences or Analytical-Empathic interactions. It provides strategies to navigate common frictions, helping couples focus on growth, understanding, and conscious effort rather than chance.",
              },
              {
                question: "How quickly will I get my results?",
                answer: "Your individual free assessment results are generated immediately.",
              },
              {
                question: "Is CSM therapy?",
                answer:
                  "No. CSM is not a therapeutic tool and does not diagnose or treat mental health conditions. It is a self-awareness and personal growth framework designed to provide structured insights and strategies for relationships and life challenges. Many users combine it with counseling or coaching, but it is fully effective as a standalone growth tool. Our services are designed for personal growth, self-reflection, and relationship insight only.",
              },
            ].map((faq, index) => (
              <div key={index} className="card-gradient rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[var(--surface)]/20 transition-colors cursor-pointer"
                >
                  <span className="font-semibold">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-[var(--accent)]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[var(--accent)]" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="pt-6 md:py-16 gradient-bg-with-vars from-[rgba(var(--primary-rgb),0.2)] to-[rgba(var(--accent-rgb),0.2)]">
        <div className="max-w-4xl mx-auto text-center px-4 py-6 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-primary)] bg-clip-text text-transparent">
            Ready to Deepen Your Connection?
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
            Join thousands of couples who have transformed their relationships through understanding
          </p>
          <button
            onClick={handleStartTest}
            className="group bg-[var(--primary)] hover:bg-[var(--primary-dark)] px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-3 mx-auto text-[var(--text-primary)]"
          >
            <span>Take Free Test</span>
            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-[var(--text-secondary)] mt-4">No credit card required • Results in minutes</p>
        </div>
      </section>
      {/* CONNECTIONS PARTICLE SECTION - FULL WIDTH, CONTAINED */}
      <section className="relative overflow-hidden bg-[var(--surface)]">
        <div className="relative w-full mx-auto px-2">
          <div className="relative h-[600px] min-h-[600px] flex items-center justify-center rounded-3xl overflow-hidden">
            {/* Canvas container - particles stay inside */}
            <div className="absolute inset-0">
              <ConnectionsParticles />
            </div>

            {/* Title */}
            <ConnectionsTitle />

            {/* Subtle corner glows */}
            <div className="absolute top-10 left-10 w-96 h-96 bg-[#5033c0]/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#bf00ff]/20 rounded-full blur-3xl animate-pulse"></div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="pt-12 md:py-16 px-4 bg-[var(--surface-variant)] border-t border-[var(--border)]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/logo_transparent_svg.svg"
                  alt="CSM Dynamics Logo"
                  width={40}
                  height={40}
                  className="h-8 w-8"
                />
                <div className="flex items-center space-x-1">
                  <h1 className="text-2xl font-bold text-[var(--primary)]">CSM</h1>
                  <h1 className="text-2xl font-light text-white">Dynamics</h1>
                  <sup className="text-sm md:text-base align-super">&reg;</sup>
                </div>
              </div>
              <p className="text-[var(--text-secondary)] mb-4">
                Empowering couples with science-backed relationship insights through the Cognitive Spectrum Model.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Twitter
                </a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Facebook
                </a>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Instagram
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setShowTermsModal(true)}
                  className="block text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none cursor-pointer transition-colors"
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => setShowPrivacyModal(true)}
                  className="block text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none cursor-pointer transition-colors"
                >
                  Privacy Policy
                </button>

                <button
                  onClick={() => setShowRefundModal(true)}
                  className="block text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none cursor-pointer transition-colors"
                >
                  Refund Policy
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <a href="/contact" className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Contact Info
                </a>
                <a href="/help" className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Help Center
                </a>
                <a
                  href="/csm-assessment"
                  className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  Free Assessment
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-[var(--border)] mt-8 pt-8 text-center text-[var(--text-secondary)]">
            <p>&copy; 2025 CSM Dynamics. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {showTermsModal && <TermsModal onClose={() => setShowTermsModal(false)} />}
      {showPrivacyModal && <PrivacyModal onClose={() => setShowPrivacyModal(false)} />}
      {showRefundModal && <RefundModal onClose={() => setShowRefundModal(false)} />}
    </div>
  );
}

// Counter Component
function Counter({ target, suffix = "", duration = 2000, decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let start = 0;
    const end = target;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = progress * end;
      setCount(value);

      if (progress < 1) {
        ref.current = requestAnimationFrame(animate);
      }
    };

    ref.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(ref.current);
  }, [target, duration]);

  return (
    <>
      {count.toFixed(decimals)}
      {suffix}
    </>
  );
}

// AnimatedCard Component — Fixed to re-trigger on navigation
function AnimatedCard({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
