//@/app/components/newsletter/unsubscribe/page.js

"use client";

import { useState } from "react";
import { Mail, Check, AlertCircle, X } from "lucide-react";
import Link from "next/link";

export default function UnsubscribePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const handleUnsubscribe = async (e) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Por favor, insira um endereço de e-mail válido");
      return;
    }

    setStatus("carregando");
    setMessage("");

    try {
      const response = await fetch("/api/email/newsletter/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Algo deu errado. Por favor, tente novamente.");
      }
    } catch (error) {
      console.error("Unsubscribe error:", error);
      setStatus("error");
      setMessage("Algo deu errado. Por favor, tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <section className="w-full max-w-4xl">
        <div className="bg-gradient-to-br from-[var(--primary)]/10 via-[var(--surface2)] to-[var(--accent)]/10 p-8 md:p-12 rounded-2xl">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-8 rounded-full bg-red-500/20">
              <X className="w-8 h-8 text-red-400" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Cancelar inscrição na newsletter
            </h1>

            <p className="text-lg text-[var(--text-secondary)] mb-8">
              Lamentamos vê-lo sair. Insira seu endereço de e-mail abaixo para cancelar a inscrição na nossa newsletter.
            </p>

            <form onSubmit={handleUnsubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Insira seu Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {status === "loading" ? "Processando..." : "Cancelar Inscrição"}
                <X className="w-4 h-4" />
              </button>
            </form>

            {/* Status Messages */}
            {message && (
              <div
                className={`mt-4 p-3 rounded-lg flex items-center justify-center gap-2 ${
                  status === "success" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                }`}
              >
                {status === "success" ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span className="text-sm">{message}</span>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-[var(--border)]">
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Mudou de ideia? Você sempre pode se inscrever novamente mais tarde.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--accent)] transition-colors font-medium"
              >
                <Mail className="w-4 h-4" />
                Voltar para a página inicial
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
