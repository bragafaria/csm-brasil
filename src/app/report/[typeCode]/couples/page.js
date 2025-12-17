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
      question: "Qual é a política de reembolso?",
      answer:
        "Oferecemos uma garantia de satisfação de 14 dias. Se você não ficar completamente satisfeito com o seu Relatório de Insights do Casal, forneceremos um reembolso total. Temos confiança no valor que o CSM oferece aos casais.",
    },
    {
      question: "As Sessões CSM são terapia?",
      answer:
        "As Sessões CSM não são uma ferramenta terapêutica e não diagnosticam nem tratam condições de saúde mental. Trata-se de um serviço de autoconhecimento e desenvolvimento pessoal, criado para fornecer insights estruturados e estratégias para relacionamentos e desafios da vida. Muitos usuários combinam o CSM com terapia ou coaching, mas ele é totalmente eficaz como uma ferramenta independente de crescimento. Nossos serviços são destinados exclusivamente ao crescimento pessoal, à autorreflexão e a insights sobre relacionamentos.",
    },
    {
      question: "O CSM é cientificamente legítimo ou apenas mais um teste cheio de palavras da moda?",
      answer:
        "O Modelo do Espectro Cognitivo é construído com base em pesquisas psicológicas consolidadas, combinando elementos da ciência cognitiva, da psicologia comportamental e da teoria dos sistemas. Diferentemente dos testes populares de psicologia, o CSM utiliza perguntas psicometricamente validadas e foi testado com mais de 25.000 casais para garantir insights confiáveis e acionáveis.",
    },
    {
      question: "O que é o Modelo do Espectro Cognitivo (CSM) e por que isso deveria importar para mim?",
      answer:
        "O CSM mapeia como sua mente processa informações, toma decisões e aborda diferentes áreas da vida. Em vez de colocá-lo em uma caixa, ele mostra você como um espectro ao longo de múltiplas dimensões cognitivas. Isso ajuda os casais a entender não apenas o que fazem de forma diferente, mas o porquê, levando a mais empatia e a uma comunicação mais eficaz.",
    },
    {
      question: "Como o CSM é diferente do MBTI, Eneagrama ou Big Five?",
      answer:
        "Enquanto esses sistemas categorizam a personalidade, o CSM se concentra em padrões de processamento cognitivo e em como eles se aplicam a situações da vida real. Ele é mais acionável para casais porque mostra como os estilos de pensamento interagem em áreas específicas da vida, como finanças, parentalidade e decisões de carreira.",
    },
    {
      question: "Por que eu deveria confiar no CSM em vez de testes gratuitos online?",
      answer:
        "Testes gratuitos geralmente carecem de rigor científico e oferecem resultados genéricos. O CSM utiliza algoritmos avançados para analisar suas respostas em múltiplas dimensões, fornecendo insights personalizados e específicos para a dinâmica do seu relacionamento. Nossos relatórios são elaborados por especialistas licenciados em relacionamentos, e não por modelos genéricos automatizados.",
    },
    {
      question: "O CSM realmente consegue 'ler' meu relacionamento como um leitor de mentes?",
      answer:
        "O CSM não prevê o futuro, mas revela padrões de como você e seu parceiro enfrentam os desafios da vida. Pense nele como um GPS para o seu relacionamento: ele mostra onde vocês estão agora e sugere os melhores caminhos a seguir com base na dinâmica única de vocês.",
    },
    {
      question: "O CSM pode prever se somos almas gêmeas ou apenas apontar possíveis problemas?",
      answer:
        "O CSM se concentra em compatibilidade e oportunidades de crescimento, em vez de fazer previsões sobre destino. Ele mostra onde vocês se complementam naturalmente e onde podem enfrentar desafios, oferecendo ferramentas para navegar ambos com sucesso.",
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
                { id: "why-csm", label: "Por que CSM?" },
                { id: "how-it-works", label: "Como Funciona" },
                { id: "whats-inside", label: "O que está incluído?" },
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
              Começar
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
                Trace o Futuro do Seu
                <span className="text-[var(--accent)]"> Relacionamento</span>
              </h1>
              <p className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
                O Relatório de Insights do Casal CSM é um guia personalizado sobre a dinâmica do seu relacionamento,
                fundamentado na psicologia moderna. Compreenda suas forças combinadas, navegue pelos desafios futuros e
                construa uma conexão mais consciente.
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => scrollToSection("whats-inside")}
                  className="btn-primary px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center group"
                >
                  {` Saiba Mais `}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            <div className="relative flex flex-col w-full pb-12 md:pb-8 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 rounded-lg overflow-hidden items-center justify-center mt-10 md:mt-6">
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
              Para Casais Que <span className="text-[var(--accent)]">Constroem</span>, Não Apenas Consertam
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Relacionamentos fortes não são apenas sobre consertar problemas, mas sobre entender o que vem pela frente.
              O
              <span>
                <strong className="text-[var(--accent)]"> Relatório de Insights do Casal CSM</strong>
              </span>{" "}
              oferece a clareza necessária para navegar pelos principais aspectos da vida antes que os desafios surjam.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: Target,
                title: "Planeje o seu Futuro",
                desc: "Alinhe suas visões sobre carreira, dinheiro, família e legado para construir uma vida que entusiasme os dois.",
              },
              {
                icon: Heart,
                title: "Aprofunde sua Conexão",
                desc: "Descubra os padrões por trás dos seus conflitos e demonstrações de afeto, e transforme momentos do dia a dia em verdadeira intimidade.",
              },
              {
                icon: MessageCircle,
                title: "Comunique-se com Clareza",
                desc: "Entenda o “porquê” por trás dos diferentes estilos de comunicação de vocês e identifique os sinais que ajudam a se compreenderem de verdade.",
              },
              {
                icon: TrendingUp,
                title: "Cresçam como uma Equipe",
                desc: "Veja como as diferentes formas de pensar de vocês podem deixar de gerar atrito e passar a criar momento, construindo um relacionamento mais alinhado e acolhedor.",
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
              Seu Relatório em <span className="text-[var(--accent)]">Três Passos Simples</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                step: "1",
                title: "Acesse Seu Dashboard",
                desc: "Todos os seus relatórios completos, insights e sessões CSM ficam salvos para sempre, oferecendo um espaço para você voltar sempre que buscar clareza, crescimento ou uma compreensão mais profunda.",
                icon: Users,
              },
              {
                step: "2",
                title: "Convide Seu Parceiro",
                desc: "Convide seu parceiro para fazer a avaliação e dar a ambos acesso ao dashboard vitalício de vocês.",
                icon: BarChart3,
              },
              {
                step: "3",
                title: "Transforme Seu Relacionamento",
                desc: "Assim que seu parceiro concluir a avaliação, o Relatório de Insights do Casal, personalizado para vocês, é gerado pelo nosso algoritmo com base nos resultados individuais de cada um.",
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
                <p className="text-[var(--text-secondary)] md:max-w-md mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-10">
            <p className="text-[var(--accent)] text-lg mb-6">
              <Users className="h-5 w-5 inline mr-2" />
              {`Junte-se a mais de 25,000+ casais que fortaleceram seu vínculo com o Relatório de Insights do Casal CSM.`}
            </p>
            <button
              onClick={() => scrollToSection("buy-now")}
              className="btn-primary px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center"
            >
              Obtenha seu relatório
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
              Um Guia Completo
              <br /> Para o <span className="text-[var(--accent)]"> Seu Relacionamento</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Seu roteiro personalizado para alinhamento, clareza e uma conexão duradoura.
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
                    Análises Visuais & Gráficos
                  </h3>
                  <p className="text-sm sm:text-base mx-auto md:max-w-md text-[var(--text-secondary)] leading-relaxed text-center lg:text-left">
                    O CSM Visual Analytics coloca os dois parceiros lado a lado para que vocês possam ver com clareza
                    como cada um percebe o mundo e toma decisões, identificando instantaneamente pontos de atrito
                    enquanto observam suas qualidades compartilhadas e diferenças individuais ganharem vida em tempo
                    real.
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
                    Classificação de Riscos de Compatibilidade
                  </h3>
                  <p className="text-sm sm:text-base mx-auto md:max-w-md text-[var(--text-secondary)] leading-relaxed text-center lg:text-left">
                    O Ranking de Risco de Compatibilidade CSM oferece informações claras de{" "}
                    <span className="font-bold">Pontuações de Alinhamento de Compatibilidade (CAS)</span>, revelando
                    quais dimensões geram mais atrito e onde pequenos ajustes podem levar a grandes avanços. A maioria
                    dos casais descobre que o verdadeiro risco não está onde imaginava, e melhorar apenas uma ou duas
                    áreas principais costuma transformar o relacionamento rapidamente.
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
                    10 áreas da vida e seus desafios
                  </h3>
                  <p className="text-sm sm:text-base mx-auto md:max-w-md text-[var(--text-secondary)] leading-relaxed text-center lg:text-left">
                    O CSM vai muito além de “vocês pensam de forma diferente” ao mostrar como seus padrões cognitivos
                    únicos se manifestam nas dez áreas da vida. Em cada domínio, fica claro exatamente onde as
                    preferências de um entram em choque ou se sobrepõem às do outro, facilitando a aplicação de pequenos
                    ajustes que transformam o atrito do dia a dia em trabalho em equipe fluido.
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
                  <h3 className="text-xl sm:text-2xl font-bold text-center lg:text-left text-white">Sessões CSM</h3>
                  <p className="text-sm sm:text-base mx-auto md:max-w-md text-[var(--text-secondary)] leading-relaxed text-center lg:text-left">
                    Sempre que surgir um desacordo, uma decisão importante ou um momento de desconexão, basta abrir uma
                    Sessão CSM privada, descrever o que está acontecendo, e um Especialista Certificado em CSM entrega
                    um relatório personalizado, criado especificamente para os perfis cognitivos de vocês: rápido,
                    preciso e totalmente confidencial. A primeira sessão é gratuita com cada Relatório de Insights do
                    Casal.
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
                    Acesso Vitalício ao Dashboard
                  </h3>
                  <p className="text-sm sm:text-base mx-auto md:max-w-md text-[var(--text-secondary)] leading-relaxed text-center lg:text-left">
                    Você tem acesso permanente e vitalício ao seu dashboard. Todos os seus perfis pessoais, o relatório
                    completo do casal e todas as Sessões CSM ficam salvos para sempre, para consulta rápida e fácil.
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
              Transforme seu Relacionamento <span className="text-[var(--accent)]">Hoje</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 ">
            {/* Pricing Card */}
            <div className="lg:col-span-2">
              <div className="card-gradient p-8 rounded-lg mb-0 lg:mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold">Relatório de Insights do Casal CSM</h3>
                    <p className="text-[var(--text-secondary)]">Mapeamento completo do relacionamento</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[var(--accent)]">R$49</div>
                    <div className="text-sm text-[var(--text-secondary)]">Pagamento único</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {[
                    { icon: Target, text: "10 Áreas da Vida e Seus Desafios" },
                    { icon: BarChart3, text: "Análises Visuais e Gráficos" },
                    { icon: List, text: "Pontuações de Alinhamento de Compatibilidade" },
                    { icon: Users, text: "Análise 'Como Vocês se Conectam'" },
                    { icon: BookHeart, text: "Relatórios Completos de Personalidade" },
                    { icon: Scale, text: "Pontos Fortes e Fracos do Casal" },
                    { icon: MessageCircle, text: "Sessão CSM Gratuita" },
                    { icon: Clock, text: "Acesso Vitalício ao Dashboard" },
                    { icon: RefreshCw, text: "Garantia de Satisfação de 14 dias" },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <feature.icon className="h-5 w-5 text-[var(--accent)]" />
                      <span className="text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-[var(--accent)]/10 p-4 rounded-lg mb-6">
                  <p className="text-[var(--accent)] font-semibold text-center">
                    Oferta Limitada: Sessão CSM gratuita disponível para os primeiros 500 inscritos
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handlePurchase}
                    className="btn-primary px-8 py-4 rounded-lg font-bold text-lg flex-1 flex items-center justify-center"
                  >
                    Compre agora por R$ 49
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-[var(--text-secondary)]">
                  <Shield className="h-4 w-4" />
                  <span>Checkout seguro com Stripe e PayPal</span>
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
                  {`"Vamos nos casar no próximo ano, e este relatório nos deu um roteiro para conversas que nem sabíamos que precisávamos ter."`}
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <img
                    src="https://prehqtlubbqfxsdbtypb.supabase.co/storage/v1/object/public/customer-profiles/couple1.png"
                    alt="Emma & David"
                    className="w-10 h-10 rounded-full object-cover"
                    width="40"
                    height="40"
                  />
                  <span className="font-semibold text-sm">David (O Analsita) & Maria (O Explorador)</span>
                </div>
              </div>

              <div className="card-gradient p-6 rounded-lg">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  {` "Ver nossos estilos financeiros apresentados de forma tão clara foi revelador. Criamos um plano conjunto que respeita tanto a minha necessidade de segurança quanto o amor dela por aventura."`}
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <img
                    src="https://prehqtlubbqfxsdbtypb.supabase.co/storage/v1/object/public/customer-profiles/couple2.png"
                    alt="Emma & David"
                    className="w-10 h-10 rounded-full object-cover"
                    width="40"
                    height="40"
                  />
                  <span className="font-semibold text-sm">Sofia (O Mentor) & Leo (O Pioneiro)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center card-gradient p-6 rounded-lg mt-6 md:mt-0 md:mb-6 mb-4 border-4 border-[rgba(var(--primary-rgb),0.2)] shadow-[0_0_40px_rgba(var(--primary-rgb),0.3)] ">
            <p className="text-[var(--text-secondary)] mb-4">
              Satisfação garantida. Você está protegido pela nossa garantia de reembolso de 14 dias.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-[var(--accent)]" />
                <span>Criptografia SSL</span>
              </div>
              <div className="flex items-center">
                <RefreshCw className="h-4 w-4 mr-2 text-[var(--accent)]" />
                <span>Garantia de Reembolso</span>
              </div>
              <div className="flex items-center">
                <Lock className="h-4 w-4 mr-2 text-[var(--accent)]" />
                <span>Privacidade Protegida</span>
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
              <span className="text-[var(--accent)]">Perguntas</span> Frequentes
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
                Capacitando casais com insights de relacionamento baseados na ciência por meio do Modelo do Espectro
                Cognitivo.
              </p>
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
              <h4 className="font-semibold mb-4">Recursos</h4>
              <div className="space-y-2">
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
