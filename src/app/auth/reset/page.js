// app/auth/reset/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";
import Image from "next/image";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isValidLink, setIsValidLink] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const type = params.get("type");
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (type === "recovery" && access_token && refresh_token) {
      supabase.auth.setSession({ access_token, refresh_token }).then(({ data, error }) => {
        if (error) {
          setError("Link de redefinição inválido ou expirado");
        } else {
          setIsValidLink(true);
        }
      });
    } else {
      setError("Link de redefinição inválido");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não correspondem");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message || "Falha ao atualizar a senha");
      setLoading(false);
      return;
    }

    await supabase.auth.signOut();
    setSuccess(true);
    setTimeout(() => router.push("/login"), 3000);
  };

  if (!isValidLink && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--surface)] p-4">
        <div className="card-gradient p-8 rounded-lg shadow-custom-lg max-w-md w-full text-center">
          <p className="text-[var(--text-secondary)]">Verificando link de redefinição...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface)] p-4">
      <div className="card-gradient p-8 rounded-lg shadow-custom-lg max-w-md w-full">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Image src="/logo_transparent.png" alt="CSM Dynamics Logo" width={28} height={28} className="h-7 w-7" />
          <div className="flex items-center space-x-1">
            <h1 className="text-xl font-bold text-[var(--primary)]">CSM</h1>
            <h1 className="text-xl font-light text-[var(--text-primary)]">Dynamics</h1>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center text-[var(--text-primary)]">Definir nova senha</h1>

        {success ? (
          <div className="text-center py-8">
            <p className="text-green-400 text-lg mb-2">Senha alterada com sucesso!</p>
            <p className="text-[var(--text-secondary)] text-sm">Redirecionando para o login...</p>
          </div>
        ) : (
          <>
            {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                placeholder="Nova senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
              />
              <input
                type="password"
                placeholder="Confirme Nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength="6"
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
              />

              <button
                type="submit"
                disabled={loading || !isValidLink}
                className="btn-primary w-full py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Atualizando..." : "Atualizar senha"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
