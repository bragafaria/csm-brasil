"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/app/utils/supabaseClient";
import { checkCoachLoginRateLimit } from "@/app/actions/auth-rate-limit"; // ✅ NEW IMPORT

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState(null); // ✅ NEW STATE
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    async function checkSession() {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Session check error:", sessionError.message);
          setError("Failed to verify session. Please log in.");
          return;
        }

        if (session) {
          const userId = session.user.id;

          const { data: userData, error: userError } = await supabase
            .from("users")
            .select("id, user_type")
            .eq("id", userId)
            .maybeSingle();

          if (userError || !userData) {
            console.error("User fetch error:", userError?.message || "No user found", userId);
            setError("User profile not found. Please log in again.");
            await supabase.auth.signOut();
            localStorage.removeItem("supabase.auth.token");
            router.push("/access/login");
            return;
          }

          if (userData.user_type !== "coach") {
            console.log("Non-coach user_type detected, signing out:", {
              userId,
              userType: userData.user_type,
            });
            await supabase.auth.signOut();
            localStorage.removeItem("supabase.auth.token");
            router.push("/access/login");
            return;
          }

          const { data: coachData, error: coachError } = await supabase
            .from("coaches")
            .select("id")
            .eq("user_id", userId)
            .maybeSingle();

          if (coachError) {
            console.error("Coach fetch error:", coachError.message);
            setError("Failed to verify coach status. Please try again.");
            return;
          }

          if (!coachData) {
            console.log("Coach not found in coaches table, signing out:", {
              userId,
              userType: userData.user_type,
            });
            await supabase.auth.signOut();
            localStorage.removeItem("supabase.auth.token");
            router.push("/access/login");
            return;
          }

          console.log("Authenticated coach, redirecting to /access/coaching");
          router.push("/access/coaching");
        }
      } catch (err) {
        console.error("Unexpected error in checkSession:", err.message);
        setError("An unexpected error occurred. Please try again.");
      }
    }

    checkSession();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRateLimitInfo(null); // ✅ RESET

    try {
      // ✅ STEP 1: Check rate limit on server (can't be bypassed)
      const rateLimitCheck = await checkCoachLoginRateLimit(email);

      if (rateLimitCheck.rateLimit) {
        setRateLimitInfo(rateLimitCheck.rateLimit);
      }

      if (!rateLimitCheck.allowed) {
        setError(rateLimitCheck.error);
        setLoading(false);
        return;
      }

      // ✅ STEP 2: Perform login (now protected by rate limit)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
        setError(error.message);
        setLoading(false);
        return;
      }

      if (!data.session || !data.user) {
        console.error("No session or user data returned:", data);
        setError("Login failed. Please try again.");
        setLoading(false);
        return;
      }

      const userId = data.user.id;

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id, user_type, name, email")
        .eq("id", userId)
        .maybeSingle();

      if (userError || !userData) {
        console.error("User fetch error:", userError?.message || "No user found", userId);
        setError("User profile not found. Please sign up or try again.");
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      if (userData.user_type !== "coach") {
        console.log("Login attempt with non-coach user_type:", {
          userId,
          userType: userData.user_type,
          email: userData.email,
        });
        setError("Access denied. This login is for coaches only.");
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      const { data: coachData, error: coachError } = await supabase
        .from("coaches")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

      if (coachError) {
        console.error("Coach fetch error:", coachError.message);
        setError("Failed to verify coach status. Please try again.");
        setLoading(false);
        return;
      }

      if (!coachData) {
        console.log("User has coach user_type but not in coaches table:", {
          userId,
          userType: userData.user_type,
          email: userData.email,
        });
        setError("Coach profile not found. Please contact support.");
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      console.log("Coach login successful:", {
        userId,
        coachId: coachData.id,
        name: userData.name,
      });

      router.push("/access/coaching");
    } catch (err) {
      console.error("Unexpected error in handleLogin:", err.message);
      setError("An unexpected error occurred during login. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="card-gradient p-8 rounded-lg shadow-custom-lg border border-[var(--border)]">
          <div className="flex items-center justify-center gap-1 mb-6">
            <h1 className="text-2xl font-bold text-[var(--primary)]">CSM</h1>
            <h1 className="text-2xl font-light text-white">Dynamics</h1>
          </div>

          <h2 className="text-xl font-bold text-[var(--text-primary)] text-center mb-6">Coach Login</h2>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-5 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
            >
              <p className="text-red-400 text-sm font-medium text-center">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <label htmlFor="email" className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="coach@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label htmlFor="password" className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)} placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
                required
              />
            </motion.div>

            {/* ✅ NEW: Show rate limit info */}
            {rateLimitInfo && !rateLimitInfo.limited && (
              <p className="text-xs text-[var(--text-secondary)] text-center">
                Login attempts remaining: {rateLimitInfo.remaining}
              </p>
            )}

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || rateLimitInfo?.limited}
              className={`w-full py-3.5 rounded-lg font-bold text-white transition-all shadow-md hover:shadow-lg ${
                loading || rateLimitInfo?.limited
                  ? "bg-[var(--surface-variant)] text-[var(--text-secondary)] opacity-70 cursor-not-allowed"
                  : "btn-primary"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-[var(--text-secondary)]">
            <p className="flex items-center justify-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>CSM-Expert access only</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center">
          <div className="text-[var(--text-primary)]">Loading...</div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
