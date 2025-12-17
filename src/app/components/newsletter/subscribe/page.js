"use client";

import { useState } from "react";
import { Mail, Check, AlertCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Por favor, insira um endereço de e-mail válido.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/email/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Inscrição realizada com sucesso!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Algo deu errado. Por favor, tente novamente.");
      }
    } catch (error) {
      console.error("Subscribe error:", error);
      setStatus("error");
      setMessage("Algo deu errado. Por favor, tente novamente.");
    }
  };

  return (
    <div className="my-20">
      <div className="bg-gradient-to-br from-[var(--primary)]/10 via-[var(--surface2)] to-[var(--accent)]/10 rounded-3xl p-1">
        <div className="bg-gradient-to-br from-[var(--primary)]/10 via-[var(--surface2)] to-[var(--accent)]/10 rounded-3xl pb-10 md:p-0">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--primary)]/20 mb-6">
              <Mail className="w-8 h-8 text-violet-400" />
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">Nunca Perca uma História</h3>

            <p className="text-lg text-[var(--text-secondary)] mb-8">
              Receba semanalmente insights sobre relacionamentos, crescimento pessoal e bem-estar diretamente na sua
              caixa de entrada.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                className="flex-1 px-4 py-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary px-6 py-3 rounded-lg font-semibold whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Inscrevendo..." : "Assinar"}
                <Mail className="w-4 h-4" />
              </button>
            </form>

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

            <p className="text-xs text-[var(--text-secondary)] mt-4">
              Junte-se a mais de 10.000 leitores. Cancele a inscrição a qualquer momento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
