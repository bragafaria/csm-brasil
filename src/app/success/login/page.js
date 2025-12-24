// src/app/success/login/page.js
"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";
import { motion } from "framer-motion";

function LoginContent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    async function verifyAndRedirect() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          setLoading(false);
          return;
        }

        const userId = session.user.id;

        if (!sessionId) {
          router.push(`/dashboard/${userId}`);
          return;
        }

        const verifyRes = await fetch("/api/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ session_id: sessionId }),
        });

        const verifyData = await verifyRes.json();

        if (!verifyRes.ok || !verifyData.paid) {
          setError(verifyData.error || "Pagamento não confirmado.");
          setLoading(false);
          return;
        }

        router.push(`/dashboard/${userId}`);
      } catch (err) {
        console.error(err);
        setError("Unexpected error.");
        setLoading(false);
      }
    }

    verifyAndRedirect();
  }, [router, sessionId]);

  // === Loading screen ===
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center bg-[var(--surface)]"
      >
        <div className="text-[var(--text-primary)] text-xl">
          {sessionId ? "Pagamento bem-sucedido, redirecionando..." : "Verificando sessão..."}
        </div>
      </motion.div>
    );
  }

  // === Error state (optional) ===
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface)] text-[var(--text-primary)] text-xl">
      {error || "Ocorreu algo inesperado."}
    </div>
  );
}

export default function Login() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[var(--surface)]">
          <div className="text-[var(--text-primary)] text-xl">Loading...</div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
