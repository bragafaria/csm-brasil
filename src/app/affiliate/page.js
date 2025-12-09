"use client";
import { ArrowRight, Users, DollarSign, TrendingUp, Mail, Bell } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AffiliateComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add your email collection logic here
    console.log("Email submitted:", email);
    setSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text-primary)]">
      {/* Header */}
      <header className="fixed top-0 w-full left-0 right-0 z-50 bg-[var(--dashboard)]/90 backdrop-blur-lg border-b border-[var(--border)]">
        <nav className="container mx-auto px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <Image
                src="/logo_transparent.png"
                alt="CSM Dynamics Logo"
                width={32}
                height={32}
                className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8"
              />
              <Link href="/">
                <div className="flex items-center space-x-0.5 sm:space-x-1">
                  <h1 className="text-sm sm:text-base md:text-xl font-bold text-[var(--primary)] drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
                    CSM
                  </h1>
                  <h1 className="text-sm sm:text-base md:text-xl font-light text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
                    Dynamics
                  </h1>
                </div>
              </Link>
            </div>

            <Link
              href="/"
              className="btn-primary px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-6 md:py-2 rounded-lg text-xs sm:text-sm md:text-base font-semibold cursor-pointer whitespace-nowrap"
            >
              Back to Home
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative section-full flex items-center justify-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--primary-rgb),0.2)] via-transparent to-[rgba(var(--accent-rgb),0.2)]"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-[rgba(var(--primary-rgb),0.1)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[rgba(var(--accent-rgb),0.1)] rounded-full blur-3xl"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20">
            <span className="text-[var(--primary)] font-semibold flex items-center gap-2 justify-center">
              <Bell className="h-4 w-4" />
              Coming Soon
            </span>
          </div>

          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6">
            <span className="block bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-primary)] to-[var(--text-primary)] gradient-text pb-2">
              Join Our
            </span>
            <span className="block bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--primary)] gradient-text pb-4">
              Affiliate Program
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-10">
            Help couples transform their relationships and earn generous commissions. Our affiliate program is launching
            soon with competitive rates and powerful tools.
          </p>

          {/* Email Signup */}
          <div className="max-w-md mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
              <button
                onClick={handleSubmit}
                disabled={submitted}
                className="group bg-[var(--primary)] hover:bg-[var(--primary-dark)] px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 text-[var(--text-primary)] disabled:opacity-50"
              >
                <Mail className="h-5 w-5" />
                <span>{submitted ? "Subscribed!" : "Notify Me"}</span>
              </button>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-3">Be the first to know when we launch</p>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[rgba(var(--primary-rgb),0.1)] to-transparent border border-[rgba(var(--primary-rgb),0.2)] backdrop-blur-sm">
              <DollarSign className="h-8 w-8 text-[var(--primary)] mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">Competitive</div>
              <div className="text-[var(--text-secondary)] text-sm">Commission Rates</div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[rgba(var(--accent-rgb),0.1)] to-transparent border border-[rgba(var(--accent-rgb),0.2)] backdrop-blur-sm">
              <Users className="h-8 w-8 text-[var(--accent)] mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">Lifetime</div>
              <div className="text-[var(--text-secondary)] text-sm">Cookie Duration</div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[rgba(var(--primary-rgb),0.1)] to-transparent border border-[rgba(var(--primary-rgb),0.2)] backdrop-blur-sm">
              <TrendingUp className="h-8 w-8 text-[var(--primary)] mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">Real-Time</div>
              <div className="text-[var(--text-secondary)] text-sm">Analytics Dashboard</div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-20 bg-gradient-to-b from-[var(--surface-variant)] to-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What to Expect</h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              {`We're`} building an affiliate program that rewards you for making a difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "High Conversion Rates",
                description:
                  "Our proven assessment and couple-focused approach converts visitors into customers at industry-leading rates.",
              },
              {
                title: "Marketing Materials",
                description:
                  "Access professional banners, email templates, social media content, and landing pages designed to convert.",
              },
              {
                title: "Dedicated Support",
                description:
                  "Get personalized assistance from our affiliate team to maximize your earnings and optimize your strategy.",
              },
              {
                title: "Transparent Tracking",
                description:
                  "Monitor your clicks, conversions, and commissions in real-time with our intuitive affiliate dashboard.",
              },
              {
                title: "Recurring Commissions",
                description:
                  "Earn ongoing revenue from subscription renewals and upgrades, not just initial purchases.",
              },
              {
                title: "Fast Payouts",
                description:
                  "Receive your earnings quickly with multiple payment options and low minimum payout thresholds.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-gradient-to-b from-[var(--surface-variant)] to-[var(--surface)] border border-[rgba(var(--primary-rgb),0.2)] hover:border-[rgba(var(--primary-rgb),0.4)] transition-all duration-300 hover:scale-105"
              >
                <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]">{feature.title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[var(--surface-variant)] border-t border-[var(--border)]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Image src="/logo_transparent.png" alt="CSM Dynamics Logo" width={40} height={40} className="h-8 w-8" />
              <div className="flex items-center space-x-1">
                <h1 className="text-2xl font-bold text-[var(--primary)]">CSM</h1>
                <h1 className="text-2xl font-light text-white">Dynamics</h1>
                <sup className="text-sm align-super">&reg;</sup>
              </div>
            </div>
            <p className="text-[var(--text-secondary)] mb-2">
              Empowering couples with science-backed relationship insights
            </p>
            <div className="mt-2 pt-2 text-center text-[var(--text-secondary)]">
              <p>&copy; 2025 CSM Dynamics. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        :root {
          --text-primary: #ffffff;
          --text-secondary: #a0a0a0;
          --surface-variant: #1a1a1a;
          --surface: #0a0a0a;
          --dashboard: #0a0a0a;
          --primary-rgb: 100, 100, 255;
          --accent-rgb: 191, 0, 255;
          --primary: #6464ff;
          --primary-dark: #5050cc;
          --accent: #bf00ff;
          --border: rgba(255, 255, 255, 0.1);
        }

        body {
          background: #000000;
          margin: 0;
          padding: 0;
        }

        .btn-primary {
          background: var(--primary);
          color: var(--text-primary);
        }

        .btn-primary:hover {
          background: var(--primary-dark);
        }

        .gradient-text {
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-full {
          min-height: 100vh;
        }

        .gradient-bg-with-vars {
          background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.2), rgba(var(--accent-rgb), 0.2));
        }
      `}</style>
    </div>
  );
}
