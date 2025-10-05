"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    async function checkSession() {
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
        auth: { persistSession: true },
      });
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      console.log("Session check result:", { session, error });
      if (error) {
        console.error("Session check error:", error.message);
        setError("Failed to verify session. Please log in.");
        return;
      }
      if (session) {
        await supabase.auth.signOut();
        router.refresh();
      }
    }
    checkSession();
  }, [router, sessionId]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
      auth: { persistSession: true },
    });
    console.log("email:", email);
    console.log("password:", password);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
      setError(error.message);
    } else if (data.session && data.user) {
      // CHANGED: Use the regular 'supabase' client instead of 'supabaseAdmin'.
      // This queries with the authenticated session, so RLS applies safely.
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id, site_id")
        .eq("id", data.user.id)
        .single();
      console.log("User check:", { userData, userError: userError?.message });
      console.log("Login successful, redirecting to dashboard:", data.user.id);
      const redirectUrl = `/dashboard/${userData?.site_id}${sessionId ? `?session_id=${sessionId}` : ""}`;
      router.push(redirectUrl);
    } else {
      setError("No session or user data returned");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface)]">
      <div className="card-gradient p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-[var(--text-primary)]">Login to Your Account</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] focus:border-[var(--accent)] text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] focus:border-[var(--accent)] text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
            required
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full py-3 rounded-lg font-semibold">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-4 text-[var(--text-secondary)]">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-[var(--accent)] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
