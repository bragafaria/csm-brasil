// src/app/success/login/page.js
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";
import { motion } from "framer-motion";

function LoginContent() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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

        // === STEP 1: If no session_id → just go to dashboard ===
        if (!sessionId) {
          router.push(`/dashboard/${userId}`);
          return;
        }

        // === STEP 2: Verify payment with Stripe API ===
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
          setError(verifyData.error || "Payment not confirmed. Please contact support.");
          setLoading(false);
          return;
        }

        // === STEP 3: Payment confirmed → go to dashboard ===
        console.log("Payment verified via Stripe API, redirecting...");
        router.push(`/dashboard/${userId}`);
      } catch (err) {
        console.error("Error in verifyAndRedirect:", err);
        setError("An unexpected error occurred.");
        setLoading(false);
      }
    }

    verifyAndRedirect();
  }, [router, sessionId]);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     if (!supabase) {
  //       throw new Error("Supabase client is not initialized");
  //     }

  //     console.log("Attempting login with:", { email });
  //     const { data, error } = await supabase.auth.signInWithPassword({
  //       email,
  //       password,
  //     });

  //     if (error) {
  //       console.error("Login error:", error.message, error);
  //       setError(error.message);
  //       setLoading(false);
  //       return;
  //     }

  //     if (!data.session || !data.user) {
  //       console.error("No session or user data returned:", { data });
  //       setError("No session or user data returned. Please try again.");
  //       setLoading(false);
  //       return;
  //     }

  //     const { data: userData, error: userError } = await supabase
  //       .from("users")
  //       .select("id")
  //       .eq("id", data.user.id)
  //       .single();

  //     if (userError || !userData) {
  //       console.error("User fetch error:", userError?.message || "No user found for userId", data.user.id, userError);
  //       setError("User profile not found. Please sign up or try again.");
  //       await supabase.auth.signOut();
  //       setLoading(false);
  //       return;
  //     }

  //     console.log("Login successful, redirecting:", {
  //       userId: data.user.id,
  //       redirectPath: `/dashboard/${data.user.id}`,
  //     });
  //     router.push(`/dashboard/${data.user.id}`);
  //   } catch (err) {
  //     console.error("Unexpected error in handleLogin:", err.message, err.stack);
  //     setError("An unexpected error occurred during login. Please try again.");
  //     setLoading(false);
  //   }
  // };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center bg-[var(--surface)]"
      >
        <div className="text-[var(--text-primary)] text-xl">
          {sessionId ? "Payment successful, redirecting to your dashboard..." : "Checking session..."}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-[var(--surface)]"
    >
      <div className="card-gradient p-8 rounded-lg shadow-custom max-w-md w-full">
        <div className="flex items-center justify-center space-x-1 mb-4">
          <h1 className="text-xl font-bold text-[var(--primary)]">CSM </h1>
          <h1 className="text-xl font-light text-[var(--text-primary)]">Dynamics</h1>
        </div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-6 text-center text-[var(--text-primary)]"
        >
          Login to Your Account
        </motion.h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <motion.input
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] transition-[var(--transition)]"
            required
          />
          <motion.input
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] transition-[var(--transition)]"
            required
          />
          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm">
              {error}
            </motion.p>
          )}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>
      </div>
    </motion.div>
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
