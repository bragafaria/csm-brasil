"use client";
import Link from "next/link";
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
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { supabase } from "@/app/utils/supabaseClient";
import { RotatingWord } from "@/app/components/ui/RotatingWord";
import ConnectionsParticles from "@/app/components/ConnectionsParticles";
import ConnectionsTitle from "@/app/components/ConnectionsTitle";
import Image from "next/image";

export default function Home() {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [activeNav, setActiveNav] = useState("home");
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Force re-mount of animated sections on route change
  const [routeKey, setRouteKey] = useState(0);
  useEffect(() => {
    setRouteKey((prev) => prev + 1);
  }, [pathname]);

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

  const headlineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.3, ease: "easeOut" },
    }),
  };

  const buttonVariants = {
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
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2, ease: "easeOut" },
    }),
  };

  const circleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const faqHeaderRef = useRef(null);
  const isFaqHeaderInView = useInView(faqHeaderRef, { once: false, amount: 0.2 });

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text-primary)]">
      {/* Sticky Header */}
      <header className="fixed top-0 w-full left-0 right-0 z-50 bg-[var(--dashboard)]/90 backdrop-blur-lg border-b border-[var(--border)]">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo_transparent_svg.svg"
                alt="CSM Dynamics Logo"
                width={32} // same visual size as h-8 w-8
                height={32}
                className="h-8 w-8"
              />
              <div className="flex items-center space-x-1">
                <h1 className="text-xl font-bold text-[var(--primary)]">CSM</h1>
                <h1 className="text-xl font-light text-white">Dynamics</h1>
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
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
                  className={`transition-colors ${
                    activeNav === item.id
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => router.push("/login")}
              className="btn-primary px-6 py-2 rounded-lg font-semibold cursor-pointer"
            >
              Login
            </button>
          </div>
        </nav>
      </header>
      {/* Hero Section */}
      <section className="relative section-full flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--primary-rgb),0.2)] via-transparent to-[rgba(var(--accent-rgb),0.2)]"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-[rgba(var(--primary-rgb),0.1)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[rgba(var(--accent-rgb),0.1)] rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto mt-20 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              <motion.span
                custom={0}
                initial="hidden"
                animate="visible"
                variants={headlineVariants}
                className="block bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-primary)] to-[var(--text-primary)] bg-clip-text text-transparent"
              >
                Stronger Relationships Start with
              </motion.span>
              <motion.span
                custom={1}
                initial="hidden"
                animate="visible"
                variants={headlineVariants}
                className="block bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--primary)] bg-clip-text text-transparent"
              >
                Understanding
              </motion.span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-12 max-w-3xl mx-auto leading-relaxed">
              The Cognitive Spectrum Model (CSM) is a framework that maps how you think and connect, providing clear
              steps for personal growth and stronger relationships.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                initial="hidden"
                animate="visible"
                whileHover="hover"
                onClick={handleStartTest}
                disabled={loggingOut}
                variants={buttonVariants}
                className="group bg-[var(--primary)] hover:bg-[var(--primary-dark)] px-4 py-2 rounded-full text-lg font-semibold transition-all duration-300 shadow-2xl flex items-center space-x-2 text-[var(--text-primary)]"
              >
                <span>{loggingOut ? "Preparing…" : "Take Free Test"}</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <p className="text-[var(--text-secondary)] text-sm">Takes only 10 minutes • Completely free</p>
            </div>

            <div className="my-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[rgba(var(--primary-rgb),0.1)] to-transparent border border-[rgba(var(--primary-rgb),0.2)] backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-2">
                  <Counter target={25} suffix="k+" duration={3000} />
                </div>
                <div className="text-[var(--text-secondary)]">Couples helped</div>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[rgba(var(--accent-rgb),0.1)] to-transparent border border-[rgba(var(--accent-rgb),0.2)] backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-2">
                  <Counter target={94} suffix="%" duration={3000} />
                </div>
                <div className="text-[var(--text-secondary)]">Report improvement</div>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[rgba(var(--primary-rgb),0.1)] to-transparent border border-[rgba(var(--primary-rgb),0.2)] backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-2">
                  <Counter target={4.9} suffix=" ★" duration={3000} decimals={1} />
                </div>
                <div className="text-[var(--text-secondary)]">Average rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Spectrum Preview */}
      <section className="py-20 bg-gradient-to-b from-[var(--surface-variant)] to-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Your mind mapped. Not labeled.</h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Personality isn’t a box. It’s a spectrum of how your mind actually works. CSM shows you where you shine,
              where you stretch, and how you connect.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto" key={routeKey}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={cardVariants}
              className="group bg-gradient-to-br from-[var(--surface-variant)] to-[var(--surface)] p-6 rounded-2xl 
                        shadow-lg border border-[rgba(var(--primary-rgb),0.2)] 
                        hover:border-[rgba(var(--primary-rgb),0.4)] 
                        hover:shadow-2xl transition-all duration-300 
                        hover:-translate-y-1 min-h-[400px] flex flex-col space-y-4"
            >
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Information Processing</h3>
                <p className="text-sm text-[var(--text-secondary)] italic">
                  How do you naturally perceive information?
                </p>
              </div>

              <div className="space-y-4 flex-grow">
                <div className="bg-gradient-to-r from-green-500/10 to-black/10 p-4 rounded-xl border border-green-400/20 space-y-2">
                  <div className="text-lg font-medium text-[var(--text-primary)] text-center">Concrete Focus (C)</div>
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
                  <div className="text-lg font-medium text-[var(--text-primary)] text-center">Abstract Insight (N)</div>
                  <p className="text-sm text-[var(--text-secondary)] text-center italic px-2">
                    Focuses on patterns, possibilities, and future implications.
                  </p>
                  <div className="space-y-2">
                    <div className="text-base font-bold text-red-400 text-center">High Influence</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-[var(--text-primary)]">Secondary Influence</span>
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
            </motion.div>

            <div className="flex flex-col justify-center space-y-6 lg:pl-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[var(--primary)]">Five Spectrum Cross-Analysis</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Explore how your mind operates across the five core dimensions of cognition - Information Processing,
                  Decision-Making, Energy Orientation, Change Approach, and Interpersonal Style.
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Percentage values quantify the relative dominance of one pole and the corresponding influence of its
                  opposite, providing a precise view of your cognitive orientation and areas for potential growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — FULL TEXT, NO ELLIPSES */}
      <section
        id="how-it-works"
        className="py-20 section-full bg-gradient-to-b from-[var(--surface)] to-[var(--surface-variant)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--text-primary)]">How It Works</h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Four simple steps to transform how you understand yourself and each other.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" key={routeKey}>
            {[
              {
                title: "Take the Free Assessment",
                text: "Answer a quick, 10-minute questionnaire that uncovers your unique Cognitive Spectrum profile: how you think, decide, feel, and connect. No partner needed.",
              },
              {
                title: "Get Your Results",
                text: "Instantly receive your CSM Archetype, percentage-based spectrums, and deep insights into your cognitive strengths, growth areas, and blind spots.",
              },
              {
                title: "Access Your Dashboard",
                text: "Step into your lifetime dashboard to explore results, track growth, save insights, and use relationship tools - anytime, on any device.",
              },
              {
                title: "Invite Your Partner",
                text: "Send a private invite. When they finish, unlock your joint Couple Insights Report: compatibility patterns, communication strategies, and growth opportunities.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={stepVariants}
                className="text-center"
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  variants={circleVariants}
                  className="w-20 h-20 rounded-full bg-[var(--accent)] flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-[var(--text-primary)]"
                >
                  {i + 1}
                </motion.div>
                <h3 className="mx-auto max-w-[200px] text-[clamp(1.125rem,4vw,1.5rem)] font-bold mb-4 text-[var(--text-primary)] leading-tight tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="whats-inside" className="py-20 relative section-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex flex-wrap items-center justify-center gap-1 md:gap-2">
              <span className="bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-primary)] bg-clip-text text-transparent whitespace-nowrap">
                Why Couples
              </span>
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-[var(--primary)] rounded-md"></span>
                <RotatingWord
                  words={["Choose", "Love", "Trust", "Value"]}
                  interval={2000}
                  className="relative z-10 text-white font-bold flex items-center justify-center h-full px-3 py-1 md:px-4"
                />
              </span>
              <span className="bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-primary)] bg-clip-text text-transparent whitespace-nowrap">
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
                  Gain a precise profile of your cognitive and emotional patterns. This establishes the essential
                  foundation for authentic connection and mutual understanding in your relationship.
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
                  Unlike individual personality tests, our framework is specifically designed to understand relationship
                  dynamics between partners. It reveals how you interact and where growth is possible.
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
                  Get specific recommendations and strategies tailored to your unique relationship patterns and
                  communication styles. Turn insights into real-world improvements.
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
                  Built on decades of relationship psychology research and validated by thousands of successful couples.
                  Science you can trust.
                </p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
              What Couples Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sarah & Mike */}
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
                <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold text-sm">
                  S
                </div>
                <div className="text-[var(--primary)] font-semibold">Sarah & Mike</div>
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
                <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-bold text-sm">
                  A
                </div>
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
                <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold text-sm">
                  E
                </div>
                <div className="text-[var(--primary)] font-semibold">Emma & David</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ — ALL 10 FULL QUESTIONS & ANSWERS */}
      <section id="faq" className="py-16 px-4 bg-[var(--surface)]">
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
                  "The Cognitive Spectrum Model, or CSM, is a modern personality framework that evaluates how individuals think and interact across five key spectrums: Information Processing (Concrete versus Abstract), Decision-Making (Analytical versus Empathic), Energy Orientation (Inward versus Outward), Change Approach (Stable versus Adaptive), and Interpersonal Style (Harmony versus Autonomy). By assessing these dimensions, CSM generates one of 32 archetypes, giving you percentage-based results for nuanced insight. CSM is particularly valuable for improving self-awareness, enhancing communication, and understanding compatibility in relationships or other interpersonal contexts.",
              },
              {
                question: "How is CSM different from MBTI, Enneagram, or Big Five?",
                answer:
                  "While MBTI categorizes people into 16 types, Enneagram focuses on motivations, and the Big Five measures broad traits, CSM provides 32 archetypes with spectrum-based percentages, offering far more precision. The model also introduces the unique Harmony/Autonomy dimension, which highlights how you naturally collaborate or seek independence in relationships. By integrating cognitive patterns and interpersonal applications, CSM provides actionable strategies for personal growth and relationship success that other personality frameworks don’t.",
              },
              {
                question: "Why should I trust CSM over free online quizzes?",
                answer:
                  "Most free personality quizzes oversimplify human behavior. CSM is research-based, psychometrically validated, and designed for practical application in relationships and self-growth. Users consistently report that the insights are accurate, relevant, and immediately actionable, unlike generic quizzes that provide vague or entertainment-focused results.",
              },
              {
                question: "Can CSM really “read” my relationship like a mind reader?",
                answer:
                  "CSM doesn’t guess emotions or predict outcomes intuitively. Instead, it analyzes cognitive alignments, such as how a partner who prefers Harmony might interact with someone who favors Autonomy. It identifies areas of synergy and potential friction, showing, for example, how Empathic values can complement Analytical logic in decision-making. About 94% of users report that CSM provides clearer insights into relationship dynamics, helping them communicate and connect more effectively.",
              },
              {
                question: "Is CSM scientifically legit, or just another buzzword quiz?",
                answer:
                  "CSM is grounded in psychological theory, combining Jungian cognitive functions with Big Five traits. Its psychometric validation demonstrates internal consistency above 0.8 and 75% user alignment in pilot studies. Ongoing research supports its reliability in predicting relational patterns, outperforming other popular personality frameworks in actionable insight. CSM is evidence-based and designed for practical application, not entertainment.",
              },
              {
                question: "How does the free assessment work?",
                answer:
                  "The free CSM assessment is designed to be concise, typically taking 10 to 15 minutes. It blends Likert-scale ratings with situational questions that reveal your cognitive preferences. Upon completion, you receive a report detailing your archetype, percentage-based spectrum scores, strengths, and preliminary relational insights. The assessment is secure, mobile-friendly, and accessible on any device.",
              },
              {
                question: "Do I need my partner to start?",
                answer:
                  "No. You can complete the free assessment on your own and explore your personal profile. If you wish to generate a full Couple Insights Report, your partner will also need to take the assessment. Many users prefer to start individually and invite their partner later for a joint analysis.",
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
                question: "Is CSM therapy or coaching?",
                answer:
                  "No. CSM is not a therapeutic tool and does not diagnose or treat mental health conditions. It is a self-awareness and personal growth framework designed to provide structured insights and strategies for relationships and life challenges. Many users combine it with counseling or coaching, but it is fully effective as a standalone growth tool.",
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
      <section className="py-20 bg-gradient-to-r from-[rgba(var(--primary-rgb),0.2)] to-[rgba(var(--accent-rgb),0.2)]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-primary)] bg-clip-text text-transparent">
            Ready to Deepen Your Connection?
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
            Join thousands of couples who have transformed their relationships through understanding
          </p>
          <button className="group bg-[var(--primary)] hover:bg-[var(--primary-dark)] px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-3 mx-auto text-[var(--text-primary)]">
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
      <footer className="py-12 px-4 bg-[var(--surface-variant)] border-t border-[var(--border)]">
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
                <a href="/privacy" className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Privacy Policy
                </a>
                <a href="/terms" className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Terms of Service
                </a>
                <a href="/refunds" className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Refund Policy
                </a>
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
    </div>
  );
}

// Counter Component
function Counter({ target, suffix = "", duration = 2000, decimals = 0 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = target;
    const increment = end / (duration / 10);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, 10);
    return () => clearInterval(timer);
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
