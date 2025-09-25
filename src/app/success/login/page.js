"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../utils/supabase/client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else if (data.session && data.user) {
      const userId = data.user.id;
      const redirectUrl = `/dashboard/${userId}${sessionId ? `?session_id=${sessionId}` : ""}`;
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
          {` Don't have an account?`}
          <a href="/signup" className="text-[var(--accent)] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
