// app/blog/layout.js
"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function BlogLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { name: "Home", slug: "/blog" },
    { name: "Relationship", slug: "/blog/love-relationship" },
    { name: "Wellness", slug: "/blog/self-wellness" },
    { name: "Heartbreak", slug: "/blog/heartbreak-divorce" },
    { name: "Sex", slug: "/blog/sex-seduction" },
    { name: "Entertainment", slug: "/blog/entertainment-news" },
    { name: "Expert Advice", slug: "/blog/expert-advice" },
    { name: "CSM Homepage", slug: "/" },
    { name: "Login", slug: "/login" },
  ];

  // Mobile menu effects (scroll lock + click outside + escape key)
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

  return (
    <div className="min-h-screen bg-[var(--surface-variant)]">
      {/* Header */}
      <header className="sticky top-0 z-50 header-gradient shadow-lg backdrop-blur-sm border-b border-[var(--border)]">
        <nav className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Mobile & Tablet: Hamburger Menu (Left) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-[var(--surface)]/20 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-[var(--text-primary)]" />
              ) : (
                <Menu className="h-6 w-6 text-[var(--text-primary)]" />
              )}
            </button>

            {/* Mobile & Tablet: Logo (Center) | Desktop: Logo (Left) */}
            <Link
              href="/blog"
              className="flex items-center space-x-2 absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0"
            >
              <Image
                src="/logo_transparent.png"
                alt="CSM Blog Logo"
                width={28}
                height={28}
                className="h-6 w-6 lg:h-8 lg:w-8"
              />
              <div className="flex items-center space-x-1">
                <span className="text-base lg:text-xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                  CSM
                </span>
                <span className="text-white font-light text-base lg:text-xl">Insights</span>
              </div>
            </Link>

            {/* Desktop: Navigation Links (Center-Right) */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={cat.slug}
                  className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--accent)] after:transition-all hover:after:w-full whitespace-nowrap"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Spacer for mobile/tablet to keep logo centered */}
            <div className="lg:hidden w-10"></div>
          </div>
        </nav>

        {/* Mobile & Tablet Menu Dropdown */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-4 py-4 bg-[var(--dashboard)] border-t border-[var(--border)]">
            <div className="flex flex-col space-y-1">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={cat.slug}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left px-4 py-3 rounded-lg transition-colors text-[var(--text-secondary)] hover:bg-[var(--surface)]/20 hover:text-[var(--text-primary)]"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Overlay when mobile menu is open */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      <main>{children}</main>

      <footer className="bg-[var(--surface2)] border-t border-[var(--border)] py-12 mt-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[var(--text-secondary)]">
            © 2025 CSM Dynamics. Empowering couples with science-backed relationship insights through the Cognitive
            Spectrum Model.
          </p>
        </div>
      </footer>
    </div>
  );
}
