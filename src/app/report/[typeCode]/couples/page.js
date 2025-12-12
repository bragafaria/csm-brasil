"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowRight,
  Mail,
  Users,
  Brain,
  Heart,
  MessageCircle,
  TrendingUp,
  Shield,
  List,
  Star,
  ChevronDown,
  ChevronUp,
  Scale,
  BarChart3,
  Target,
  Lock,
  BookHeart,
  Clock,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import TermsModal from "@/app/components/terms-of-service/TermsModal";
import PrivacyModal from "@/app/components/terms-of-service/PrivacyModal";
import RefundModal from "@/app/components/terms-of-service/RefundModal";
import Newsletter from "@/app/components/newsletter/subscribe/page";

export default function Sales() {
  const { typeCode } = useParams();
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("home");
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [email, setEmail] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);

  useEffect(() => {
    if (typeCode) {
      localStorage.setItem("userTypeCode", typeCode);
    }

    const handleScroll = () => {
      const sections = ["home", "why-csm", "how-it-works", "whats-inside", "faq", "buy-now"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveNav(currentSection);

      const elements = document.querySelectorAll(".section-header");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.8) {
          el.classList.add("animate");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [typeCode]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handlePurchase = () => {
    router.push(`/report/${typeCode}/couples/signup`);
  };

  const faqs = [
    {
      question: "What's the refund policy?",
      answer:
        "We offer a 14-day satisfaction guarantee, no questions asked. If you're not completely satisfied with your Couple's Insights Report, we'll provide a full refund. We're confident in the value CSM provides to couples.",
    },
    {
      question: "Are CSM Sessions therapy?",
      answer:
        "CSM Sessions are not a therapeutic tool and does not diagnose or treat mental health conditions. It is a self-awareness and personal growth service designed to provide structured insights and strategies for relationships and life challenges. Many users combine it with counseling or coaching, but it is fully effective as a standalone growth tool. Our services are designed for personal growth, self-reflection, and relationship insights only.",
    },
    {
      question: "Is CSM scientifically legit, or just another buzzword quiz?",
      answer:
        "The Cognitive Spectrum Model is built on established psychological research, combining elements from cognitive science, behavioral psychology, and systems theory. Unlike pop psychology quizzes, CSM uses psychometrically validated questions and has been tested with over 25,000 couples to ensure reliable, actionable insights.",
    },
    {
      question: "What is the Cognitive Spectrum Model (CSM), and why should I care?",
      answer:
        "CSM maps how your mind processes information, makes decisions, and approaches life's domains. Instead of putting you in a box, it shows you as a spectrum across multiple cognitive dimensions. This helps couples understand not just what they do differently, but why, leading to deeper empathy and more effective communication.",
    },
    {
      question: "How is CSM different from MBTI, Enneagram, or Big Five?",
      answer:
        "While those systems categorize personality, CSM focuses on cognitive processing patterns and how they apply to real-life situations. It's more actionable for couples because it shows how your thinking styles interact across specific life domains like finances, parenting, and career decisions.",
    },
    {
      question: "Why should I trust CSM over free online quizzes?",
      answer:
        "Free quizzes often lack scientific rigor and provide generic results. CSM uses advanced algorithms to analyze your responses across multiple dimensions, providing personalized insights specific to your relationship dynamic. Our reports are generated by licensed relationship experts, not automated generic templates.",
    },
    {
      question: "Can CSM really 'read' my relationship like a mind reader?",
      answer:
        "CSM doesn't predict the future, but it reveals patterns in how you and your partner approach life's challenges. Think of it as a GPS for your relationship, it shows you where you are now and suggests the best routes forward based on your unique dynamic.",
    },
    {
      question: "Can CSM predict if we're soulmates or just spot potential issues?",
      answer:
        "CSM focuses on compatibility and growth opportunities rather than making destiny predictions. It shows you where you naturally complement each other and where you might face challenges, giving you tools to navigate both successfully.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Sticky Header */}
      <header className="fixed top-0 w-full left-0 right-0 z-50 bg-[var(--dashboard)]/90 backdrop-blur-lg border-b border-[var(--border)]">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo_transparent.png"
                alt="CSM Dynamics Logo"
                width={32}
                height={32}
                className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8"
              />
              <button onClick={() => scrollToSection("home")}>
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
            <div className="hidden md:flex space-x-8">
              {[
                { id: "home", label: "Home" },
                { id: "why-csm", label: "Why CSM?" },
                { id: "how-it-works", label: "How It Works" },
                { id: "whats-inside", label: "What's Inside" },
                { id: "faq", label: "FAQ" },
                // { id: "buy-now", label: "Buy Now" },
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
              onClick={() => scrollToSection("buy-now")}
              className="btn-primary px-6 py-2 rounded-lg font-semibold"
            >
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-0 md:pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-0 md:gap-6 lg:gap-12 items-center">
            <div className="section-header md:mt-10 lg:mt-0">
              {/* <div className="bg-[var(--accent)]/20 text-[var(--accent)] px-4 py-2 rounded-full inline-flex items-center mb-6">
                <Star className="h-4 w-4 mr-2" />
                Limited-time: Get 10% off with code FUTURE10
              </div> */}
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Chart the Future of Your
                <span className="text-[var(--accent)]"> Relationship</span>
              </h1>
              <p className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
                The CSM {`Couple's`} Insight Report is a personalized guide to your relationship dynamic, grounded in
                modern psychology. Understand your combined strengths, navigate future challenges, and build a more
                conscious connection.
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => scrollToSection("whats-inside")}
                  className="btn-primary px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center group"
                >
                  {` What's inside?`}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            <div className="relative flex flex-col w-full pb-12 md:pb-8 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 rounded-lg overflow-hidden items-center justify-center mt-6">
              <img
                src="/note.png"
                className="w-full h-full object-contain md:object-cover lg:object-contain"
                alt="Couple's Insights Report preview"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Opportunity Section */}
      <section id="why-csm" className="py-4 md:py-16 px-4 pt-10 bg-[var(--surface-variant)]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 section-header">
            <h2 className="text-4xl font-bold mb-6">
              For Couples Who <span className="text-[var(--accent)]">Build</span>, Not Just Repair
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Great relationships {`aren't`} just about fixing problems, {`they're`} about understanding what lies
              ahead. The
              <span>
                <strong className="text-[var(--accent)]"> CSM {`Couple's`} Insights Report</strong>
              </span>{" "}
              gives you the foresight to navigate {`life's`} biggest domains before challenges arise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: Target,
                title: "Plan Your Future",
                desc: "Align your visions for career, money, family, and legacy so you build a life that excites both of you.",
              },
              {
                icon: Heart,
                title: "Deepen Your Connection",
                desc: "Uncover the patterns behind your conflicts and affection, and turn everyday moments into true intimacy.",
              },
              {
                icon: MessageCircle,
                title: "Communicate with Clarity",
                desc: "Learn the “why” behind your different communication styles and identify the signals that help you truly understand each other.",
              },
              {
                icon: TrendingUp,
                title: "Grow as a Team",
                desc: "Watch your different ways of thinking shift from friction to momentum, creating a relationship that feels more aligned and supportive.",
              },
            ].map((item, index) => (
              <div key={index} className="card-gradient p-6 rounded-lg text-center">
                <item.icon className="h-12 w-12 text-[var(--accent)] mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="pb-16 pt-2 md:pb-2 md:pt-4 px-4 bg-[var(--surface-variant)]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 section-header">
            <h2 className="text-4xl font-bold mb-6">
              Your Blueprint in <span className="text-[var(--accent)]">Three Simple Steps</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                step: "1",
                title: "Access Your Dashboard",
                desc: "Access your dashboard and invite your partner to take the personality assessment.",
                icon: Users,
              },
              {
                step: "2",
                title: "Invite Your Partner",
                desc: "Invite your partner to take the assessment and give both of you access to your lifetime dashboard.",
                icon: BarChart3,
              },
              {
                step: "3",
                title: "Transform Your Relationship",
                desc: "The full Couple's Insights Report is generated by our algorithm based on your individual results.",
                icon: Heart,
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-[var(--text-secondary)]">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-10">
            <p className="text-[var(--accent)] text-lg mb-6">
              <Users className="h-5 w-5 inline mr-2" />
              {`Join 25,000+ couples who've strengthened their bond with the CSM Couple's Insights Report.`}
            </p>
            <button
              onClick={() => scrollToSection("buy-now")}
              className="btn-primary px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center"
            >
              Get Your Report
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>

          {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { icon: Shield, text: "Secure & Private" },
              { icon: Award, text: "95% Report Clearer Insights" },
              { icon: Brain, text: "Psychometrically Validated" },
              { icon: Lock, text: "Backed by Modern Psychology" },
            ].map((badge, index) => (
              <div key={index} className="card-gradient p-4 rounded-lg">
                <badge.icon className="h-8 w-8 text-[var(--accent)] mx-auto mb-2" />
                <p className="text-sm font-medium">{badge.text}</p>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/* What's Inside Section */}
      <section
        id="whats-inside"
        className="pt-4 pb-12 sm:pb-16 md:pt-16 md:py-16 bg-gradient-to-b from-[var(--surface-variant)] to-[var(--surface)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
              A Comprehensive Guide
              <br /> to <span className="text-[var(--accent)]">Your Relationship</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Your personalized roadmap for alignment, clarity, and lasting connection.
            </p>
          </div>

          <div className="max-w-4xl mx-auto w-full space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
            {/* Block 1: Visual Analytics - Image first on mobile, then text */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                className="flex justify-center mb-6 sm:mb-8 lg:mb-0 order-1 lg:order-1"
              >
                <img
                  src="/pgraph.png"
                  alt="Visual Analytics Graph"
                  className="w-full max-w-[200px] sm:max-w-[220px] md:max-w-[250px]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                className="flex flex-col justify-center space-y-3 sm:space-y-4 md:space-y-6 lg:pr-8 px-4 sm:px-0 order-2 lg:order-2"
              >
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-center lg:text-left text-white">
                    Visual Analytics & Charts
                  </h3>
                  <p className="text-sm sm:text-base mx-auto md:max-w-md text-[var(--text-secondary)] leading-relaxed text-center lg:text-left">
                    CSM Visual Analytics places both partners side-by-side so you can clearly see how each of you
                    perceives the world and makes decisions, instantly spotting friction points while watching your
                    shared strengths and individual differences light up in real time.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Block 2: Compatibility Risk Ranking - Image first on mobile, text below */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                className="flex justify-center mb-6 sm:mb-8 lg:mb-0 order-1 lg:order-2"
              >
                <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px]">
                  <img src="/rank.png" alt="Life Blueprint Video" className="w-full" />
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-[var(--surface)] to-transparent z-20 pointer-events-none"></div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="flex flex-col justify-center space-y-3 sm:space-y-4 md:space-y-6 lg:pl-8 px-4 sm:px-0 order-2 lg:order-1"
              >
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-center lg:text-left text-white">
                    Compatibility Risk Ranking
                  </h3>
                  <p className="text-sm sm:text-base mx-auto md:max-w-md text-[var(--text-secondary)] leading-relaxed text-center lg:text-left">
                    CSM Compatibility Risk Ranking gives you a clear{" "}
                    <span className="font-bold">Compatibility Alignment Scores (CAS)</span>, revealing which dimension
                    creates the most friction and where small adjustments can lead to major breakthroughs. Most couples
                    discover their real risk {`isn't`} where they expected, and improving just the top one or two areas
                    often transforms the relationship quickly.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Block 3: 10 Life-Area Challenges - Image first on mobile, text below */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                className="flex justify-center mb-6 sm:mb-8 lg:mb-0 order-1 lg:order-1"
              >
                <div className="relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-[520px] lg:max-w-[600px] border border-[rgba(var(--primary-rgb),0.2)] shadow-[0_0_40px_rgba(var(--primary-rgb),0.3)]">
                  <img src="/life.png" alt="Life Blueprint Video" className="w-full" />
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-[var(--surface)] to-transparent z-20 pointer-events-none"></div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                className="flex flex-col justify-center space-y-3 sm:space-y-4 md:space-y-6 lg:pl-8 px-4 sm:px-0 order-2 lg:order-2"
              >
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-center lg:text-left text-white">
                    10 Life-Area Challenges
                  </h3>
                  <p className="text-sm sm:text-base mx-auto md:max-w-md text-[var(--text-secondary)] leading-relaxed text-center lg:text-left">
                    CSM goes far beyond {`"you think differently"`} by showing how your unique cognitive patterns play
                    out across the ten areas. In each domain, you see exactly where your preferences clash or overwhelm
                    the other, making it easy to apply small adjustments that turn daily friction into effortless
                    teamwork.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Block 4: CSM Sessions - Video first on mobile, text below */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex justify-center mb-6 sm:mb-8 lg:mb-0 order-1 lg:order-2"
              >
                <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px]">
                  <video src="/csm-sessions.mp4" autoPlay muted loop playsInline preload="metadata" className="w-full">
                    Your browser does not support the video tag.
                  </video>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="flex flex-col justify-center space-y-3 sm:space-y-4 md:space-y-6 lg:pl-8 px-4 sm:px-0 order-2 lg:order-1"
              >
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-center lg:text-left text-white">CSM Sessions</h3>
                  <p className="text-sm sm:text-base mx-auto md:max-w-md text-[var(--text-secondary)] leading-relaxed text-center lg:text-left">
                    Whenever a disagreement, decision, or moment of disconnect appears, just open a private CSM Session,
                    describe {`what's`} happening, and a CSM-Certified Expert delivers a personalized report built for
                    your exact cognitive profiles: fast, precise, and fully private. Your first session is free with
                    every Couple’s Insights Report.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Block 5: Lifetime Dashboard Access - Image first on mobile, text below */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                className="flex justify-center mb-6 sm:mb-8 lg:mb-0 order-1 lg:order-1"
              >
                <div className="relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-[520px] lg:max-w-[600px]">
                  <img src="/dashboard.png" alt="Life Blueprint Video" className="w-full" />
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-[var(--surface)] to-transparent z-20 pointer-events-none"></div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                className="flex flex-col justify-center space-y-3 sm:space-y-4 md:space-y-6 lg:pl-8 px-4 sm:px-0 order-2 lg:order-2"
              >
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-center lg:text-left text-white">
                    Lifetime Dashboard Access
                  </h3>
                  <p className="text-sm sm:text-base mx-auto md:max-w-md text-[var(--text-secondary)] leading-relaxed text-center lg:text-left">
                    You get permanent, lifetime access to your dashboard. All your personal profiles, your complete
                    couple report, and every CSM Session are saved forever for quick and easy reference.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Buy Now Section */}
      <section id="buy-now" className="py-2 mdpy-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 section-header">
            <h2 className="text-4xl font-bold mb-6">
              Transform Your Relationship <span className="text-[var(--accent)]">Today</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 ">
            {/* Pricing Card */}
            <div className="lg:col-span-2">
              <div className="card-gradient p-8 rounded-lg mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold">CSM {`Couple's`} Insights Report</h3>
                    <p className="text-[var(--text-secondary)]">Complete relationship blueprint</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[var(--accent)]">$49</div>
                    <div className="text-sm text-[var(--text-secondary)]">One-time payment</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {[
                    { icon: Target, text: "10 Life-Area Challenges" },
                    { icon: BarChart3, text: "Visual Analytics & Charts" },
                    { icon: List, text: "Compatibility Alignment Scores" },
                    { icon: Users, text: "'How You Connect' Analysis" },
                    { icon: BookHeart, text: "Personality Reports" },
                    { icon: Scale, text: "Couple's Strengths and Weaknesses" },
                    { icon: MessageCircle, text: "Free CSM Session" },
                    { icon: Clock, text: "Lifetime Dashboard Access" },
                    { icon: RefreshCw, text: "14-Day Money-Back Guarantee" },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <feature.icon className="h-5 w-5 text-[var(--accent)]" />
                      <span className="text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-[var(--accent)]/10 p-4 rounded-lg mb-6">
                  <p className="text-[var(--accent)] font-semibold text-center">
                    Limited Offer: Free CSM Session available to first 500 sign-ups
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handlePurchase}
                    className="btn-primary px-8 py-4 rounded-lg font-bold text-lg flex-1 flex items-center justify-center"
                  >
                    Buy Now for $49
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-[var(--text-secondary)]">
                  <Shield className="h-4 w-4" />
                  <span>Secure checkout with Stripe/PayPal</span>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="space-y-6 md:mb-8">
              <div className="card-gradient p-6 rounded-lg">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  {`"We're getting married next year, and this report gave us a roadmap for conversations we didn't even
                  know we needed to have."`}
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <img
                    src="https://prehqtlubbqfxsdbtypb.supabase.co/storage/v1/object/public/customer-profiles/couple1.png"
                    alt="Emma & David"
                    className="w-10 h-10 rounded-full object-cover"
                    width="40"
                    height="40"
                  />
                  <span className="font-semibold text-sm">David (The Analyst) & Maria (The Explorer)</span>
                </div>
              </div>

              <div className="card-gradient p-6 rounded-lg">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  {` "Seeing our financial styles laid out so clearly was an eye-opener. We created a joint plan that
                  honors both my need for security and her love for adventure."`}
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <img
                    src="https://prehqtlubbqfxsdbtypb.supabase.co/storage/v1/object/public/customer-profiles/couple2.png"
                    alt="Emma & David"
                    className="w-10 h-10 rounded-full object-cover"
                    width="40"
                    height="40"
                  />
                  <span className="font-semibold text-sm">Sofia (The Mentor) & Leo (The Pioneer)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center card-gradient p-6 rounded-lg mt-6 md:mt-0 md:mb-6 mb-4 border-4 border-[rgba(var(--primary-rgb),0.2)] shadow-[0_0_40px_rgba(var(--primary-rgb),0.3)] ">
            <p className="text-[var(--text-secondary)] mb-4">
              Worry-free. {`You're`} protected by our 14-day money-back guarantee, no questions asked.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-[var(--accent)]" />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center">
                <RefreshCw className="h-4 w-4 mr-2 text-[var(--accent)]" />
                <span>Money-Back Guarantee</span>
              </div>
              <div className="flex items-center">
                <Lock className="h-4 w-4 mr-2 text-[var(--accent)]" />
                <span>Privacy Protected</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="pt-12 pb-4 md:py-16 px-4 bg-[var(--surface-variant)]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 section-header">
            <h2 className="text-4xl font-bold mb-6">
              Frequently Asked <span className="text-[var(--accent)]">Questions</span>
            </h2>
          </div>

          <div className="space-y-4 mb-12">
            {faqs.map((faq, index) => (
              <div key={index} className="card-gradient rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[var(--surface)]/20 transition-colors"
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

      {/*Newsletter*/}
      <section>
        <Newsletter />
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[var(--surface-variant)] border-t border-[var(--border)]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Image src="/logo_transparent.png" alt="CSM Dynamics Logo" width={40} height={40} className="h-8 w-8" />
                <div className="flex items-center space-x-1">
                  <h1 className="text-2xl font-bold text-[var(--primary)]">CSM</h1>
                  <h1 className="text-2xl font-light text-white">Dynamics</h1>
                  <sup className="text-sm md:text-base align-super">&reg;</sup>
                </div>
              </div>
              <p className="text-[var(--text-secondary)] mb-4">
                Empowering couples with science-backed relationship insights through the Cognitive Spectrum Model.
              </p>
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
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2">
                <Link
                  href="mailto:csm@csmdynamics.com?subject=Abuse"
                  className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  Report Abuse
                </Link>
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
