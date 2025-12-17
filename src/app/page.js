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
  Mail,
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
import Newsletter from "@/app/components/newsletter/subscribe/page";
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
                src="/logo_transparent.png"
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
                { id: "whats-inside", label: "O que é?" },
                { id: "how-it-works", label: "Como Funciona" },
                { id: "why-CSM-?", label: "Por que CSM?" },
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
                { id: "whats-inside", label: "O que é?" },
                { id: "how-it-works", label: "Como Funciona" },
                { id: "why-CSM-?", label: "Por que CSM?" },
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
                Relacionamentos Fortes
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
                Começam com
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
                Compreensão
              </motion.span>
            </h1>

            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto mb-10">
              O Modelo do Espectro Cognitivo (CSM) é uma estrutura que mapeia como você pensa e se conecta com os
              outros, oferecendo passos claros para o crescimento pessoal e relacionamentos mais fortes.
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
                <span>{loggingOut ? "Preparando…" : "Faça o Teste Gratuito"}</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <p className="text-[var(--text-secondary)] text-xs sm:text-sm">
                Leva apenas 10 minutos • Totalmente gratuito
              </p>
            </div>

            <div className="my-12 md:my-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2">
              <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-[rgba(var(--primary-rgb),0.1)] to-transparent border border-[rgba(var(--primary-rgb),0.2)] backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  <Counter target={25} suffix="k+" duration={3000} />
                </div>
                <div className="text-[var(--text-secondary)] text-sm sm:text-base">Casais ajudados</div>
              </div>
              <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-[rgba(var(--accent-rgb),0.1)] to-transparent border border-[rgba(var(--accent-rgb),0.2)] backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  <Counter target={95} suffix="%" duration={3000} />
                </div>
                <div className="text-[var(--text-secondary)] text-sm sm:text-base">Relataram melhorias</div>
              </div>
              <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-[rgba(var(--primary-rgb),0.1)] to-transparent border border-[rgba(var(--primary-rgb),0.2)] backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  <Counter target={4.9} suffix=" ★" duration={3000} decimals={1} />
                </div>
                <div className="text-[var(--text-secondary)] text-sm sm:text-base">Avaliação média</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Spectrum Preview */}
      <section
        id="whats-inside"
        className="pt-16 md:py-16 bg-gradient-to-b from-[var(--surface-variant)] to-[var(--surface)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold my-6 text-white">Sua mente mapeada. Não rotulada.</h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Personalidade não é uma caixa. É um espectro de como sua mente realmente funciona. O CSM mostra onde você
              brilha, onde pode se desenvolver e como você se conecta.
            </p>
          </div>

          {/* UPDATED RESPONSIVE LAYOUT */}
          <div className="flex flex-col mt-20">
            <div className="max-w-4xl mx-auto w-full space-y-8 lg:space-y-0">
              {/* Desktop: Two-column layout, Mobile: Stacked in specific order */}
              <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8 lg:mb-18">
                {/* Section 1: Image (order-1 on mobile, left column on desktop) */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="order-1 lg:order-none group min-h-[400px] flex flex-col space-y-4 lg:mb-0"
                >
                  <div className="relative mx-auto">
                    <img src="/phone.png" alt="Emma & David" className="relative z-10" />
                    {/* Gradient overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-[var(--surface)] to-transparent z-20 pointer-events-none"></div>
                  </div>
                </motion.div>

                {/* Section 2: Five Spectrum title (order-2 on mobile, right column on desktop) */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                  className="order-2 lg:order-none flex flex-col justify-center space-y-6 lg:pl-8 mb-8 lg:mb-0"
                >
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-center text-white">Análise Cruzada dos Cinco Espectros</h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed text-center md:text-center lg:text-left md:max-w-md mx-auto">
                      Explore como sua mente opera nas cinco dimensões centrais da cognição: Processamento de
                      Informações, Tomada de Decisão, Orientação de Energia, Abordagem de Mudança e Estilo Interpessoal.
                    </p>
                    <p className="text-[var(--text-secondary)] leading-relaxed text-center md:text-center lg:text-left">
                      Acesse gráficos visuais, pontuações por domínio e análises de perfil.
                    </p>
                  </div>
                </motion.div>

                {/* Section 4: Information Processing card (order-3 on mobile, right column on desktop) */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                  className="order-3 lg:order-none lg:col-start-2 lg:row-start-2 mt-10 md:mt-4 lg:mb-0 mb-4"
                >
                  <div
                    className="group bg-gradient-to-br from-[var(--surface-variant)] to-[var(--surface)] p-6 rounded-2xl 
                border border-[rgba(var(--primary-rgb),0.2)] shadow-[0_0_40px_rgba(var(--primary-rgb),0.3)] flex flex-col space-y-4 lg:mt-10"
                  >
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold text-[var(--text-primary)]">Processamento de Informações</h3>
                      <p className="text-sm text-[var(--text-secondary)] italic">
                        Como você percebe as informações de forma natural?
                      </p>
                    </div>

                    <div className="space-y-4 flex-grow">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
                        className="bg-gradient-to-r from-green-500/10 to-black/10 p-4 rounded-xl border border-green-400/20 space-y-2"
                      >
                        <div className="text-lg font-medium text-[var(--text-primary)] text-center">
                          Foco no Concreto (C)
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] text-center italic px-2">
                          Foca em dados tangíveis, verificáveis e em detalhes práticos do momento presente.
                        </p>
                        <div className="space-y-2">
                          <div className="text-base font-bold text-green-400 text-center">Dominância Leve</div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-[var(--text-primary)]">
                                Preferência Primária
                              </span>
                              <HelpCircle className="h-4 w-4 text-green-400" />
                            </div>
                            <span className="text-xl font-bold text-green-400">57%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: "57%" }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
                              className="bg-green-400 h-2 rounded-full"
                            ></motion.div>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
                        className="bg-gradient-to-r from-red-500/10 to-black/10 p-4 rounded-xl border border-red-400/20 space-y-2"
                      >
                        <div className="text-lg font-medium text-[var(--text-primary)] text-center">
                          Insight Abstrato (N)
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] text-center italic px-2">
                          Foca em padrões, possibilidades e implicações futuras.
                        </p>
                        <div className="space-y-2">
                          <div className="text-base font-bold text-red-400 text-center">Alta Influência</div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-[var(--text-primary)]">
                                Influência Secundária
                              </span>
                              <HelpCircle className="h-4 w-4 text-red-400" />
                            </div>
                            <span className="text-xl font-bold text-red-400">43%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: "43%" }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: "easeOut", delay: 0.9 }}
                              className="bg-red-400 h-2 rounded-full"
                            ></motion.div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Section 3: Depth description (order-4 on mobile, left column on desktop) */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                  className="order-4 lg:order-none flex flex-col justify-center space-y-6 lg:pl-8 mt-8 mb-8 lg:mb-0 lg:col-start-1"
                >
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-center text-white">Profundidade e Precisão</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[var(--text-secondary)] leading-relaxed text-center md:max-w-md mx-auto lg:text-left">
                      As cinco dimensões do CSM oferecem uma compreensão precisa e profunda de como você processa
                      informações, toma decisões e interage com os outros. Essa clareza ajuda a identificar pontos
                      fortes, revelar pontos de desenvolvimento e buscar crescimento com mais propósito.
                    </p>
                  </div>
                </motion.div>

                {/* Section 5: Image (order-5 on mobile, left column on desktop) */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="order-5 lg:order-none group min-h-[400px]  flex flex-col space-y-4 lg:mb-0 mt-14 md:mt-20"
                >
                  <div className="relative mx-auto border border-[rgba(var(--primary-rgb),0.2)] shadow-[0_0_40px_rgba(var(--primary-rgb),0.3)] ">
                    <video
                      src="/brain-compressed.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      width={350}
                      height={519}
                    >
                      Your browser does not support the video tag.
                    </video>
                    {/* Gradient overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-[var(--surface)] to-transparent z-20 pointer-events-none"></div>
                  </div>
                </motion.div>

                {/* Section 6: Blueprint title (order-6 on mobile, right column on desktop) */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                  className="order-6 lg:order-none flex flex-col justify-center space-y-6 lg:pl-8 my-8 lg:mb-0"
                >
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-center text-white">O Blueprint da Sua Mente</h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed text-center md:text-center md:max-w-md mx-auto lg:text-left">
                      O Modelo do Espectro Cognitivo (CSM) é uma estrutura moderna de personalidade que mapeia como sua
                      mente é estruturada. Nosso algoritmo revela os seus padrões cognitivos que impulsionam seus
                      pensamentos e decisões.
                    </p>
                  </div>
                </motion.div>
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
              Como Funciona
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
              Quatro passos simples para transformar a forma como você entende a si mesmo e um ao outro.
            </p>
          </div>

          {/* Grid - Added responsive gaps */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10" key={routeKey}>
            {[
              {
                title: "Faça a Avaliação Gratuita",
                text: "Você pode começar por conta própria. Responda a um questionário rápido de 10 minutos que revela seu perfil cognitivo único.",
              },
              {
                title: "Receba Seus Resultados",
                text: "Receba seu Arquétipo CSM instantaneamente, junto com espectros baseados em porcentagens e insights profundos sobre seus pontos fortes, áreas de crescimento e pontos cegos.",
              },
              {
                title: "Acesse Seu Dashboard",
                text: "Entre no seu painel para explorar seus resultados, acompanhar seu crescimento, salvar insights e usar ferramentas de relacionamento a qualquer momento, em qualquer dispositivo. Acesso vitalício.",
              },
              {
                title: "Convide Seu Parceiro(a)",
                text: "Envie um convite privado. Quando a outra pessoa concluir, você desbloqueia o Relatório de Insights do Casal, mostrando padrões de compatibilidade, estratégias de comunicação e oportunidades de crescimento.",
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
          <div className="text-center pt-14 pb-10 md:py-20">
            <button
              onClick={handleStartTest}
              className="group bg-[var(--primary)] hover:bg-[var(--primary-dark)] px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-3 mx-auto text-[var(--text-primary)]"
            >
              <span>Faça o Teste Gratuito</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[var(--text-secondary)] mt-4 text-xs sm:text-sm">
              Leva apenas 10 minutos • Totalmente gratuito
            </p>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="why-CSM-?" className="pt-20 md:py-16 relative section-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex flex-wrap items-center justify-center gap-1 md:gap-2">
              <span className="bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-primary)] gradient-text whitespace-nowrap">
                {" "}
                {/* Add gradient-text */}
                Por que os casais
              </span>
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-[var(--primary)] rounded-md"></span>
                <RotatingWord
                  words={["Escolhem a", "Amam a", "Confiam na", "Valorizam a"]}
                  interval={2000}
                  className="relative z-10 text-white font-bold flex items-center justify-center h-full px-3 py-1 md:px-4 md:py-2" // Ensure RotatingWord has text-white or similar
                />
              </span>
              <span className="bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-primary)] gradient-text whitespace-nowrap">
                {" "}
                {/* Add gradient-text */}
                nossa avaliação
              </span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
              Entendam um ao outro como nunca antes.
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" key={routeKey}>
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
                <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Autoconhecimento</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed flex-grow">
                  Obtenha um perfil preciso dos seus padrões cognitivos e emocionais. Isso oferece a base essencial para
                  uma conexão genuína e uma compreensão mútua mais profunda no seu relacionamento.
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
                <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Focado no Casal</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed flex-grow">
                  Diferentemente dos testes de personalidade individuais, nosso framework foi desenvolvido para revelar
                  como os parceiros interagem. Ele destaca as dinâmicas do relacionamento, onde vocês se alinham
                  naturalmente e onde o crescimento é possível.
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
                <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Insights Práticos</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed flex-grow">
                  Receba recomendações claras e práticas para seus padrões e estilos de comunicação únicos. Transforme o
                  entendimento em melhorias significativas no dia a dia.
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
                <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Baseado em Pesquisas</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed flex-grow">
                  Baseado em décadas de pesquisa em psicologia de relacionamentos e validado por milhares de casais
                  bem-sucedidos. É ciência em que você pode confiar.
                </p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="pt-20 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white"> O Que os Casais Dizem</h2>
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
                Essa avaliação revelou padrões de comunicação que nunca tínhamos percebido. Nosso relacionamento nunca
                esteve tão forte!
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
                Finalmente, um teste que nos analisa como casal, e não apenas como indivíduos. Os insights foram
                incrivelmente precisos.
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
                As recomendações personalizadas nos ajudaram a lidar com nossas diferenças com muito mais compreensão.
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
              Perguntas <span className="text-[var(--accent)]">Frequentes</span>
            </h2>
          </motion.div>

          <div className="space-y-4 mb-12">
            {[
              {
                question: "O que é o Modelo do Espectro Cognitivo (CSM) e por que devo me importar?",
                answer:
                  "O Modelo do Espectro Cognitivo (CSM) é uma estrutura moderna de personalidade que avalia como os indivíduos pensam e interagem em cinco espectros-chave: Processamento de Informações (Concreto versus Abstrato), Tomada de Decisão (Analítico versus Empático), Orientação de Energia (Voltado para Dentro versus Voltado para Fora), Abordagem de Mudança (Estável versus Adaptativa) e Estilo Interpessoal (Harmonia versus Autonomia). Ao avaliar essas dimensões, o CSM gera um dos 32 arquétipos, fornecendo um perfil detalhado que destaca seus padrões cognitivos únicos, individualmente e nos relacionamentos.",
              },
              {
                question: "Como o CSM é diferente do MBTI, Eneagrama ou Big Five?",
                answer:
                  "Enquanto o MBTI categoriza pessoas em 16 tipos, o Eneagrama foca em motivações e o Big Five mede traços amplos, o CSM oferece 32 arquétipos apoiados por análises baseadas em espectros para maior precisão. Integrando padrões cognitivos com insights interpessoais do mundo real, o CSM fornece estratégias práticas para crescimento pessoal e sucesso nos relacionamentos, que outros frameworks de personalidade não oferecem. É particularmente valioso para melhorar autoconhecimento, comunicação e compatibilidade em relacionamentos ou outros contextos interpessoais.",
              },
              {
                question: "Por que devo confiar no CSM em vez de quizzes online gratuitos?",
                answer:
                  "A maioria dos quizzes gratuitos simplifica demais o comportamento humano. O CSM é baseado em pesquisas, validado psicometricamente e projetado para aplicação prática em relacionamentos e crescimento pessoal. Usuários relatam consistentemente que os insights são precisos, relevantes e imediatamente aplicáveis, ao contrário de quizzes genéricos que fornecem resultados vagos ou apenas para entretenimento.",
              },
              {
                question: "O CSM realmente “lê” meu relacionamento como um leitor de mentes?",
                answer:
                  "O CSM não adivinha emoções nem prevê resultados intuitivamente. Ele analisa alinhamentos cognitivos, como a interação entre um parceiro que prefere Harmonia e outro que prefere Autonomia. Identifica áreas de sinergia e possíveis atritos. Cerca de 95% dos usuários relatam que o CSM oferece insights claros sobre a dinâmica do relacionamento, ajudando na comunicação e na conexão.",
              },
              {
                question: "O CSM é cientificamente legítimo ou é apenas mais um quiz da moda?",
                answer:
                  "O CSM é fundamentado em teoria psicológica, combinando funções cognitivas junguianas com traços do Big Five. Pesquisas contínuas apoiam sua confiabilidade na previsão de padrões relacionais, superando outros frameworks populares em insights aplicáveis. É baseado em evidências e projetado para aplicação prática, não para entretenimento.",
              },
              {
                question: "Como funciona a avaliação gratuita?",
                answer:
                  "A avaliação gratuita do CSM é concisa, geralmente levando de 10 a 15 minutos. Combina escalas de Likert com perguntas situacionais que revelam suas preferências cognitivas. Ao concluir, você recebe um relatório gratuito detalhando seu arquétipo, pontuações percentuais nos espectros, pontos fortes, áreas de desenvolvimento e insights relacionais preliminares. A avaliação é segura, compatível com dispositivos móveis e acessível em qualquer dispositivo.",
              },
              {
                question: "Preciso do meu parceiro para começar?",
                answer:
                  "Não. Você pode completar a avaliação gratuita sozinho e explorar seu perfil pessoal primeiro. Para obter o Relatório de Insights do Casal, seu parceiro também precisará realizar a avaliação. Muitos usuários começam individualmente e depois convidam o parceiro para uma análise conjunta.",
              },
              {
                question: "O CSM pode prever se somos almas gêmeas ou apenas identificar possíveis problemas?",
                answer:
                  "O CSM não prevê destino nem rotula ninguém como alma gêmea. Ele destaca compatibilidades potenciais e desafios, como diferenças Harmonia-Autonomia ou interações Analítico-Empático. Fornece estratégias para lidar com atritos comuns, ajudando casais a focarem em crescimento, compreensão e esforço consciente, em vez de sorte.",
              },
              {
                question: "Quão rápido receberei meus resultados?",
                answer: "Os resultados individuais da avaliação gratuita são gerados imediatamente.",
              },
              {
                question: "O CSM é uma terapia?",
                answer:
                  "Não. O CSM não é uma ferramenta terapêutica e não diagnostica nem trata condições de saúde mental. É uma estrutura de autoconhecimento e crescimento pessoal projetada para fornecer insights e estratégias estruturadas para relacionamentos e desafios da vida. Muitos usuários combinam com aconselhamento ou coaching, mas é totalmente eficaz como ferramenta de desenvolvimento independente. Nossos serviços são voltados apenas para crescimento pessoal, autorreflexão e insights sobre relacionamentos.",
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
            Pronto para Aprfundar a Sua Conexão?
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de casais que transformaram seus relacionamentos por meio da compreensão.
          </p>
          <button
            onClick={handleStartTest}
            className="group bg-[var(--primary)] hover:bg-[var(--primary-dark)] px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-3 mx-auto text-[var(--text-primary)]"
          >
            <span>Take Free Test</span>
            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-[var(--text-secondary)] mt-4">
            Não é necessário cartão de crédito • Resultados em minutos
          </p>
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
      {/*Newsletter*/}
      <section>
        <Newsletter />
      </section>
      {/* Footer */}
      <footer className="pt-12 md:py-16 px-4 bg-[var(--surface-variant)] border-t border-[var(--border)]">
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
                Capacitando casais com insights de relacionamento baseados em ciência através do Modelo do Espectro
                Cognitivo.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="https://x.com/csmdynamics"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  X/Twitter
                </Link>
                <Link
                  href="https://pinterest.com/csmdynamics/"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  Pinterest
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setShowTermsModal(true)}
                  className="block text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none cursor-pointer transition-colors"
                >
                  Termos de Serviço
                </button>
                <button
                  onClick={() => setShowPrivacyModal(true)}
                  className="block text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none cursor-pointer transition-colors"
                >
                  Política de Privacidade
                </button>

                <button
                  onClick={() => setShowRefundModal(true)}
                  className="block text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none cursor-pointer transition-colors"
                >
                  Política de Reembolso
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resursos</h4>
              <div className="space-y-2">
                <Link href="/affiliate" className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Programa de Afiliados
                </Link>
                <Link href="/blog" className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Blog
                </Link>
                <Link
                  href="mailto:csm@csmdynamics.com?subject=Abuse"
                  className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  Denunciar Abuso
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-[var(--border)] mt-8 pt-8 text-center text-[var(--text-secondary)]">
            <p>&copy; 2025 CSM Dynamics. Todos os direitos reservados.</p>
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
