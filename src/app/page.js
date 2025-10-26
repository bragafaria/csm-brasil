"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Added for router.push
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
import { createClient } from "@supabase/supabase-js";

export default function Home() {
  // State for FAQ accordion
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [activeNav, setActiveNav] = useState("home");
  const router = useRouter(); // Added for navigation

  // Function to toggle FAQ
  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleStartTest = async () => {
    localStorage.removeItem("csmAnswers");

    // FIXED: Create Supabase client here (client-side safe with anon key)
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
      auth: { persistSession: true },
    });

    // Check and sign out if session exists
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      console.log("Existing session found on home page - signing out"); // FIXED: Updated log
      await supabase.auth.signOut();
      localStorage.removeItem("supabase.auth.token"); // Explicitly clear Supabase storage key
      router.refresh(); // Refresh to reload without session
    }
  };

  // Animation variants for the headline
  const headlineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.3, ease: "easeOut" },
    }),
  };

  // Animation variants for the button
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

  // Animation variants for How It Works items
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

  // Animation variants for Spectrum Preview card
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Animation variants for FAQ header
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Ref for FAQ header
  const faqHeaderRef = useRef(null);
  const isFaqHeaderInView = useInView(faqHeaderRef, { once: true, amount: 0.2 });

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text-primary)]">
      {/* Sticky Header */}
      <header className="fixed top-0 w-full z-50 header-gradient border-[var(--border)]">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-[var(--accent)]" />
              <span className="text-xl font-bold">CSM Insights</span>
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 via-transparent to-[var(--accent)]/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--primary)]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto mt-20 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text5xl font-bold leading-tight mb-6">
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

            <p className="text-lg md:text-lg text-[var(--text-secondary)] mb-12 max-w-3xl mx-auto leading-relaxed">
              The Cognitive Spectrum Model (CSM) is a framework that maps how you think and connect, providing clear
              steps for personal growth and stronger relationships.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/test">
                <motion.button
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  onClick={handleStartTest}
                  variants={buttonVariants}
                  className="group bg-[var(--primary)] hover:bg-[color-mix(in_srgb,var(--primary)_80%,black)] px-4 py-2 rounded-full text-lg font-semibold transition-all duration-300 shadow-2xl flex items-center space-x-2 text-[var(--text-primary)] hover:cursor-pointer"
                >
                  <span>Take Free Test</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <p className="text-[var(--text-secondary)] text-sm">Takes only 10 minutes • Completely free</p>
            </div>

            <div className="my-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[var(--primary)]/10 to-transparent border border-[var(--primary)]/20 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-2">
                  <Counter target={250} suffix="k+" duration={5000} />
                </div>
                <div className="text-[var(--text-secondary)]">Couples helped</div>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[var(--accent)]/10 to-transparent border border-[var(--accent)]/20 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-2">
                  <Counter target={94} suffix="%" duration={5000} />
                </div>
                <div className="text-[var(--text-secondary)]">Report improvement</div>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[var(--primary)]/10 to-transparent border border-[var(--primary)]/20 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-2">
                  <Counter target={4.9} suffix="★" duration={5000} decimals={1} />
                </div>
                <div className="text-[var(--text-secondary)]">Average rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-primary)] to-[var(--text-primary)] bg-clip-text text-transparent whitespace-nowrap">
                Why Couples
              </span>
              <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--primary)] bg-clip-text text-transparent whitespace-nowrap">
                {" Choose "}
              </span>
              <span className="bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-primary)] to-[var(--text-primary)] bg-clip-text text-transparent whitespace-nowrap">
                Our Assessment
              </span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
              Discover insights that strengthen your bond and improve communication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedCard>
              <div className="group p-8 rounded-3xl bg-gradient-to-b from-[var(--surface-variant)] to-[var(--surface)] border border-[var(--primary)]/20 hover:border-[var(--primary)]/40 transition-all duration-300 hover:transform hover:scale-105 h-full min-h-[250px] flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-[var(--primary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-[var(--text-primary)]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Couple-Focused</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed flex-grow">
                  Unlike individual personality tests, our framework is specifically designed to understand relationship
                  dynamics between partners.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <div className="group p-8 rounded-3xl bg-gradient-to-b from-[var(--surface-variant)] to-[var(--surface)] border border-[var(--primary)]/20 hover:border-[var(--primary)]/40 transition-all duration-300 hover:transform hover:scale-105 h-full min-h-[250px] flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-[var(--accent)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target className="h-8 w-8 text-[var(--text-primary)]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Actionable Insights</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed flex-grow">
                  Get specific recommendations and strategies tailored to your unique relationship patterns and
                  communication styles.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.4}>
              <div className="group p-8 rounded-3xl bg-gradient-to-b from-[var(--surface-variant)] to-[var(--surface)] border border-[var(--primary)]/20 hover:border-[var(--primary)]/40 transition-all duration-300 hover:transform hover:scale-105 h-full min-h-[250px] flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-[var(--primary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-[var(--text-primary)]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Research-Based</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed flex-grow">
                  Built on decades of relationship psychology research and validated by thousands of successful couples.
                </p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-[var(--surface)] to-[var(--surface-variant)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Simple steps to unlock deeper understanding in your relationship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stepVariants}
              className="text-center"
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={circleVariants}
                className="w-20 h-20 rounded-full bg-[var(--primary)] flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-[var(--text-primary)]"
              >
                1
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Take the Assessment</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Both partners complete our 10-minute scientifically-designed questionnaire about personality traits and
                relationship preferences.
              </p>
            </motion.div>

            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stepVariants}
              className="text-center"
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={circleVariants}
                className="w-20 h-20 rounded-full bg-[var(--accent)] flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-[var(--text-primary)]"
              >
                2
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Get Your Results</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Receive detailed insights about your individual personalities and how they interact as a couple, with
                visual compatibility maps.
              </p>
            </motion.div>

            <motion.div
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stepVariants}
              className="text-center"
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={circleVariants}
                className="w-20 h-20 rounded-full bg-[var(--primary)] flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-[var(--text-primary)]"
              >
                3
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Strengthen Your Bond</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Apply personalized recommendations and exercises designed specifically for your relationship dynamic and
                growth areas.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Preview Your Spectrum Insights */}
      <section className="py-20 bg-gradient-to-b from-[var(--surface-variant)] to-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
              Preview Your Spectrum Insights
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              See how CSM reveals your unique cognitive preferences with nuanced, percentage-based spectrums,unlocking
              personalized relationship strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Example Card for Information Processing */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="group bg-gradient-to-br from-[var(--surface-variant)] to-[var(--surface)] p-6 rounded-2xl shadow-lg border border-[var(--primary)]/20 hover:border-[var(--primary)]/40 hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-1 min-h-[400px] flex flex-col space-y-4"
            >
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Information Processing</h3>
                <p className="text-sm text-[var(--text-secondary)] italic">
                  How do you naturally perceive information?
                </p>
              </div>

              <div className="space-y-4 flex-grow">
                {/* Primary Preference */}
                <div className="bg-gradient-to-r from-green-500/10 to-black/10 p-4 rounded-xl border border-green-400/20 space-y-2">
                  <div className="text-lg font-medium text-[var(--text-primary)] text-center">Concrete Focus (C)</div>
                  <p className="text-sm text-[var(--text-secondary)] text-center italic px-2">
                    Focuses on tangible, verifiable data; practical, detail-oriented.{" "}
                    {`Trusts 'what is' over 'what if.'`}
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

                {/* Secondary Influence */}
                <div className="bg-gradient-to-r from-red-500/10 to-black/10 p-4 rounded-xl border border-red-400/20 space-y-2">
                  <div className="text-lg font-medium text-[var(--text-primary)] text-center">Abstract Insight (N)</div>
                  <p className="text-sm text-[var(--text-secondary)] text-center italic px-2">
                    Focuses on patterns, possibilities, theories; imaginative, forward-looking. Explores
                    {`'what could
                    be.'`}
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

              {/* Interpretation Intro */}
              <div className="bg-[var(--surface-variant)] p-4 rounded-lg border border-[var(--border)]/50 mt-auto">
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                  Balanced Harmony: Concrete Focus and Abstract Insight
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  With a Mild primary preference for Concrete Focus (C) at 57% and High secondary influence from
                  Abstract Insight (N) at 43%, your balanced spectrum suggests versatile application of the {`report's`}
                  insights. The general analysis provides a flexible foundation,lean into Concrete Focus for core
                  relational patterns but frequently blend in Abstract Insight elements for nuanced, context-specific
                  communication strategies. This adaptability makes the report a dynamic guide rather than a rigid
                  blueprint, allowing you to switch between C and N modes seamlessly across relationship scenarios.
                </p>
              </div>
            </motion.div>

            {/* Promotional Text Sidebar */}
            <div className="flex flex-col justify-center space-y-6 lg:pl-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">Unlock Nuanced Insights</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Imagine seeing exactly how your mind works,57% grounded in practical details, with 43% room for
                  creative possibilities. {`CSM's spectrum model doesn't`} box you in; it reveals the balance that makes
                  your relationships thrive.
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  This is just one dimension. Your full report dives into all five, with tailored advice to bridge gaps
                  and amplify strengths. Couples report 94% better communication after applying these insights.
                </p>
              </div>
              <Link href="/test">
                <button className="w-full bg-[var(--primary)] hover:bg-[color-mix(in_srgb,var(--primary)_80%,black)] px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl text-[var(--text-primary)]">
                  Start Your Assessment Now
                </button>
              </Link>
            </div>
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
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[var(--surface-variant)] to-[var(--surface)] border border-[var(--primary)]/20">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                This assessment revealed communication patterns we never noticed. Our relationship has never been
                stronger!
              </p>
              <div className="text-[var(--primary)] font-semibold">, Sarah & Mike</div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-b from-[var(--surface-variant)] to-[var(--surface)] border border-[var(--primary)]/20">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                Finally, a test that looks at us as a couple, not just individuals. The insights were incredibly
                accurate.
              </p>
              <div className="text-[var(--primary)] font-semibold">, Alex & Jordan</div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-b from-[var(--surface-variant)] to-[var(--surface)] border border-[var(--primary)]/20">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                The personalized recommendations helped us navigate our differences with so much more understanding.
              </p>
              <div className="text-[var(--primary)] font-semibold">, Emma & David</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Frequently Asked <span className="text-[var(--accent)]">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-4 mb-12">
            {[
              {
                question: "1. What is the Cognitive Spectrum Model (CSM), and why should I care?",
                answer:
                  "The Cognitive Spectrum Model, or CSM, is a modern personality framework that evaluates how individuals think and interact across five key spectrums: Information Processing (Concrete versus Abstract), Decision-Making (Analytical versus Empathic), Energy Orientation (Inward versus Outward), Change Approach (Stable versus Adaptive), and Interpersonal Style (Harmony versus Autonomy). By assessing these dimensions, CSM generates one of 32 archetypes, giving you percentage-based results for nuanced insight. CSM is particularly valuable for improving self-awareness, enhancing communication, and understanding compatibility in relationships or other interpersonal contexts.",
              },
              {
                question: "2. How is CSM different from MBTI, Enneagram, or Big Five?",
                answer:
                  "While MBTI categorizes people into 16 types, Enneagram focuses on motivations, and the Big Five measures broad traits, CSM provides 32 archetypes with spectrum-based percentages, offering far more precision. The model also introduces the unique Harmony/Autonomy dimension, which highlights how you naturally collaborate or seek independence in relationships. By integrating cognitive patterns and interpersonal applications, CSM provides actionable strategies for personal growth and relationship success that other personality frameworks don’t.",
              },
              {
                question: "3. Why should I trust CSM over free online quizzes?",
                answer:
                  "Most free personality quizzes oversimplify human behavior. CSM is research-based, psychometrically validated, and designed for practical application in relationships and self-growth. Users consistently report that the insights are accurate, relevant, and immediately actionable, unlike generic quizzes that provide vague or entertainment-focused results.",
              },
              {
                question: "4. Can CSM really “read” my relationship like a mind reader?",
                answer:
                  "CSM doesn’t guess emotions or predict outcomes intuitively. Instead, it analyzes cognitive alignments, such as how a partner who prefers Harmony might interact with someone who favors Autonomy. It identifies areas of synergy and potential friction, showing, for example, how Empathic values can complement Analytical logic in decision-making. About 94% of users report that CSM provides clearer insights into relationship dynamics, helping them communicate and connect more effectively.",
              },
              {
                question: "5. Is CSM scientifically legit, or just another buzzword quiz?",
                answer:
                  "CSM is grounded in psychological theory, combining Jungian cognitive functions with Big Five traits. Its psychometric validation demonstrates internal consistency above 0.8 and 75% user alignment in pilot studies. Ongoing research supports its reliability in predicting relational patterns, outperforming other popular personality frameworks in actionable insight. CSM is evidence-based and designed for practical application, not entertainment.",
              },
              {
                question: "6. How does the free assessment work?",
                answer:
                  "The free CSM assessment is designed to be concise, typically taking 10 to 15 minutes. It blends Likert-scale ratings with situational questions that reveal your cognitive preferences. Upon completion, you receive a report detailing your archetype, percentage-based spectrum scores, strengths, and preliminary relational insights. The assessment is secure, mobile-friendly, and accessible on any device.",
              },
              {
                question: "7. Do I need my partner to start?",
                answer:
                  "No. You can complete the free assessment on your own and explore your personal profile. If you wish to generate a full Couple Insights Report, your partner will also need to take the assessment. Many users prefer to start individually and invite their partner later for a joint analysis.",
              },
              {
                question: "8. Can CSM predict if we’re soulmates or just spot potential issues?",
                answer:
                  "CSM doesn’t predict destiny or label anyone as a soulmate. Instead, it highlights potential compatibilities and challenges, such as Harmony-Autonomy differences or Analytical-Empathic interactions. It provides strategies to navigate common frictions, helping couples focus on growth, understanding, and conscious effort rather than chance.",
              },
              {
                question: "9. How quickly will I get my results?",
                answer: "Your individual free assessment results are generated immediately.",
              },
              {
                question: "10. Is CSM therapy or coaching?",
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-primary)] bg-clip-text text-transparent">
            Ready to Deepen Your Connection?
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
            Join thousands of couples who have transformed their relationships through understanding
          </p>
          <Link href="/test">
            <button className="cursor-pointer group bg-[var(--primary)] hover:bg-[color-mix(in_srgb,var(--primary)_80%,black)] px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-3 mx-auto text-[var(--text-primary)]">
              <span>Start Your Free Assessment</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <p className="text-[var(--text-secondary)] mt-4">No credit card required • Results in minutes</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[var(--surface-variant)] border-t border-[var(--border)]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-8 w-8 text-[var(--accent)]" />
                <span className="text-xl font-bold">CSM Insights</span>
              </div>
              <p className="text-[var(--text-secondary)] mb-4">
                Empowering couples with science-backed relationship insights through the Cognitive Spectrum Model.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="https://facebook.com"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="https://instagram.com"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <a
                  href="/privacy"
                  className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="/refunds"
                  className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Refund Policy
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <a
                  href="/contact"
                  className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Contact Info
                </a>
                <a
                  href="/help"
                  className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Help Center
                </a>
                <a
                  href="/test"
                  className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Free Assessment
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-[var(--border)] mt-8 pt-8 text-center text-[var(--text-secondary)]">
            <p>&copy; 2025 CSM Insights. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Counter component for animated numbers
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

// AnimatedCard component for bottom-up animation on scroll
function AnimatedCard({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
