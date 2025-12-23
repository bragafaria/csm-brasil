// @/app/components/ui/form/support.js"
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Spinner from "@/app/components/ui/Spinner";
import { Send, AlertCircle, CheckCircle } from "lucide-react";

const areas = ["Suporte", "Faturamento", "Parceria", "Licenciamento", "Sugestões"];

function generateTicket() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function SupportForm({ userName, userEmail, siteId }) {
  const [form, setForm] = useState({
    area: areas[0],
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.message.trim()) return;

    setSubmitting(true);
    setError("");
    setSuccess(false);

    const ticket = generateTicket();
    const emailSubject = `[Ticket #${ticket}] - ${form.area} [${userName}]`;

    try {
      await fetch("/api/email/support/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: emailSubject,
          name: userName,
          email: userEmail,
          area: form.area,
          userSubject: form.subject,
          message: form.message,
          ticket,
          confirmationSubject: `Recebemos sua solicitação de suporte – Ticket #${ticket}`, // optional, or let server default
        }),
      });

      setSuccess(true);
      setForm({ area: areas[0], subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--surface)] via-[var(--surface-variant)] to-[var(--surface)] p-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-gradient rounded-3xl p-8 md:p-12 shadow-2xl border border-[var(--border)]"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Central de Suporte</h1>
            <p className="text-lg text-white/80">
              Estamos aqui para ajudar você e seu parceiro(a). Espere uma resposta dentro de 24 horas.
            </p>
          </div>

          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-6 bg-green-500/20 border border-green-500/50 rounded-xl flex items-center justify-center gap-3"
            >
              <CheckCircle className="w-8 h-8 text-green-400" />
              <p className="text-green-300 font-semibold text-lg">
                Mensagem enviada! Responderemos dentro de 24 horas.
              </p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 p-6 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center gap-3"
            >
              <AlertCircle className="w-6 h-6 text-red-400" />
              <p className="text-red-300">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Area */}
            <div>
              <label className="block text-white/90 font-medium mb-3">
                Area <span className="text-white/60 text-sm">(Obrigatório)</span>
              </label>
              <select
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-gray-900 text-white border border-white/30 focus:outline-none focus:border-white transition appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23cbd5e1' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: "right 1rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "12px",
                }}
              >
                {areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-white/90 font-medium mb-3">
                Subject <span className="text-white/60 text-sm">(Obrigatório)</span>
              </label>
              <input
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="Resumo breve da sua pergunta"
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white transition"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-white/90 font-medium mb-3">
                Mensagem <span className="text-white/60 text-sm">(Obrigatório)</span>
              </label>
              <textarea
                required
                rows={9}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Por favor, descreva sua pergunta ou problema em detalhes..."
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white resize-none transition"
              />
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={submitting}
              className="w-full py-5 rounded-xl btn-primary font-bold text-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl transition"
            >
              {submitting ? (
                <>
                  <Spinner size="sm" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Enviar Mensagem
                </>
              )}
            </motion.button>
          </form>

          <p className="text-white/50 text-center text-sm mt-10">
            Você está conectado(a) como <span className="font-medium text-white">{userName}</span> ({userEmail})
          </p>
        </motion.div>
      </div>
    </div>
  );
}
