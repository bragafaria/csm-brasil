"use client";

import { useState, useEffect } from "react";
import { X, Globe } from "lucide-react";
import Image from "next/image";

export default function BrazilGeoModal() {
  const [showModal, setShowModal] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkUserLocation();
  }, []);

  async function checkUserLocation() {
    try {
      // Try multiple geolocation services with fallbacks
      let countryCode = null;

      // Method 1: Try ipapi.co first
      try {
        const response = await fetch("https://ipapi.co/json/", {
          signal: AbortSignal.timeout(5000), // 5 second timeout
        });
        if (response.ok) {
          const data = await response.json();
          countryCode = data.country_code;
        }
      } catch (e) {
        console.log("ipapi.co failed, trying fallback...");
      }

      // Method 2: Fallback to ip-api.com (no rate limit for non-commercial)
      if (!countryCode) {
        try {
          const response = await fetch("http://ip-api.com/json/", {
            signal: AbortSignal.timeout(5000),
          });
          if (response.ok) {
            const data = await response.json();
            countryCode = data.countryCode;
          }
        } catch (e) {
          console.log("ip-api.com failed, trying next fallback...");
        }
      }

      // Method 3: Fallback to cloudflare trace
      if (!countryCode) {
        try {
          const response = await fetch("https://www.cloudflare.com/cdn-cgi/trace", {
            signal: AbortSignal.timeout(5000),
          });
          if (response.ok) {
            const text = await response.text();
            const match = text.match(/loc=([A-Z]{2})/);
            if (match) {
              countryCode = match[1];
            }
          }
        } catch (e) {
          console.log("Cloudflare trace failed");
        }
      }

      // Check if user is from Brazil
      if (countryCode === "BR") {
        // Check if user has already dismissed the modal in this session
        const dismissed = sessionStorage.getItem("brazil-modal-dismissed");
        if (!dismissed) {
          setShowModal(true);
        }
      }
    } catch (error) {
      console.error("All geolocation methods failed:", error);
      // Fail silently - don't block users if geolocation fails
    } finally {
      setIsChecking(false);
    }
  }

  function handleRedirect() {
    // sessionStorage.setItem("brazil-modal-dismissed", "true");
    //window.location.href = "https://dinamicascsm.com.br";
  }

  function handleStay() {
    // sessionStorage.setItem("brazil-modal-dismissed", "true");
    setShowModal(false);
  }

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-[100] p-4 transition-opacity duration-300 ease-in-out">
      <div className="relative card-gradient p-8 rounded-xl shadow-custom-lg max-w-md w-full transform transition-transform duration-300 ease-in-out scale-100">
        {/* Close button */}
        <button
          onClick={handleStay}
          className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          aria-label="Fechar"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Logo and Company Name */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Image src="/logo_transparent_svg.svg" alt="CSM Dynamics Logo" width={32} height={32} className="h-8 w-8" />
          <div className="flex items-center space-x-1">
            <h1 className="text-xl font-bold text-[var(--primary)]">CSM</h1>
            <h1 className="text-xl font-light text-[var(--text-primary)]">Dynamics</h1>
          </div>
        </div>

        {/* Brazilian Flag Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <Globe className="w-16 h-16 text-[var(--primary)]" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-2 border-[var(--surface)]"></div>
          </div>
        </div>

        {/* Title in Portuguese */}
        <h2 className="text-2xl font-bold text-[var(--text-primary)] text-center mb-4">Olá!</h2>

        {/* Message in Portuguese */}
        <p className="text-[var(--text-secondary)] text-center mb-6 leading-relaxed text-base">
          Detectamos que você está acessando do <strong className="text-[var(--text-primary)]">Brasil</strong>. Temos um
          site específico com conteúdo e preços em reais para você!
        </p>

        {/* Buttons */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={handleRedirect}
            className="w-full btn-primary py-3 rounded-lg text-[var(--text-primary)] font-semibold transition-all hover:brightness-110 flex items-center justify-center space-x-2"
          >
            <span>Ir para o site brasileiro</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <button
            onClick={handleStay}
            className="w-full py-3 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-thin hover:bg-[var(--surface-variant)] transition-colors"
          >
            Continuar no site internacional
          </button>
        </div>

        {/* Small note */}
        <p className="text-xs text-[var(--text-secondary)] text-center mt-6">dinamicascsm.com.br</p>
      </div>
    </div>
  );
}
