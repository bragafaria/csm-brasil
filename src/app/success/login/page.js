// src/app/success/login/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    async function checkSession() {
      try {
        if (!supabase) {
          throw new Error("Supabase client is not initialized");
        }

        console.log("Checking session with session_id:", sessionId);
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        console.log("Session check result:", { session, error: sessionError?.message });

        if (sessionError) {
          console.error("Session check error:", sessionError.message, sessionError);
          setError("Failed to verify session. Please log in.");
          setLoading(false);
          return;
        }

        if (session) {
          const userId = session.user.id;
          const { data: userData, error: userError } = await supabase
            .from("users")
            .select("id, has_paid")
            .eq("id", userId)
            .single();

          if (userError || !userData) {
            console.error("User fetch error:", userError?.message || "No user found for userId", userId, userError);
            setError("User profile not found. Please log in again.");
            await supabase.auth.signOut();
            setLoading(false);
            router.push("/login");
            return;
          }

          // Delay redirect to allow webhook processing
          if (sessionId) {
            console.log("Post-payment redirect, waiting 2s for webhook...");
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }

          console.log("Authenticated user, redirecting:", { userId, redirectPath: `/dashboard/${userId}` });
          router.push(`/dashboard/${userId}`);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Unexpected error in checkSession:", err.message, err.stack);
        setError("An unexpected error occurred. Please try again.");
        setLoading(false);
      }
    }

    checkSession();
  }, [router, sessionId]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!supabase) {
        throw new Error("Supabase client is not initialized");
      }

      console.log("Attempting login with:", { email });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message, error);
        setError(error.message);
        setLoading(false);
        return;
      }

      if (!data.session || !data.user) {
        console.error("No session or user data returned:", { data });
        setError("No session or user data returned. Please try again.");
        setLoading(false);
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("id", data.user.id)
        .single();

      if (userError || !userData) {
        console.error("User fetch error:", userError?.message || "No user found for userId", data.user.id, userError);
        setError("User profile not found. Please sign up or try again.");
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      console.log("Login successful, redirecting:", {
        userId: data.user.id,
        redirectPath: `/dashboard/${data.user.id}`,
      });
      router.push(`/dashboard/${data.user.id}`);
    } catch (err) {
      console.error("Unexpected error in handleLogin:", err.message, err.stack);
      setError("An unexpected error occurred during login. Please try again.");
      setLoading(false);
    }
  };

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
      <div className="card-gradient p-8 rounded-xl shadow-lg max-w-md w-full">
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
            className="w-full p-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] focus:border-[var(--accent)] text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
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
            className="w-full p-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] focus:border-[var(--accent)] text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
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
            className="btn-primary w-full py-3 rounded-lg font-semibold disabled:opacity-50 hover:cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-4 text-[var(--text-secondary)] hover:cursor-pointer"
        >
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-[var(--accent)] hover:underline">
            Sign up
          </a>
        </motion.p>
      </div>
    </motion.div>
  );
}
