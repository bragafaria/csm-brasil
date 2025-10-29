// @/app/access/login/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/app/utils/supabaseClient";

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
            console.error("User fetch error:", userError?.message || "No user found for userId", userId);
            setError("User profile not found. Please log in again.");
            await supabase.auth.signOut();
            localStorage.removeItem("supabase.auth.token");
            router.push("/access/login");
            return;
          }

          // Check if user is a coach
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
            // If user is not a coach, force logout
            console.log("Non-coach session detected, signing out:", { userId, userType: userData.user_type });
            await supabase.auth.signOut();
            localStorage.removeItem("supabase.auth.token");
            router.push("/access/login");
            return;
          }

          console.log("Authenticated coach, redirecting:", { userId, redirectPath: "/access/coaching" });
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

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
        setError(error.message);
        return;
      }

      if (!data.session || !data.user) {
        console.error("No session or user data returned:", { data });
        setError("No session or user data returned. Please try again.");
        return;
      }

      const userId = data.user.id;
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id, user_type")
        .eq("id", userId)
        .maybeSingle();

      if (userError || !userData) {
        console.error("User fetch error:", userError?.message || "No user found for userId", userId);
        setError("User profile not found. Please sign up or try again.");
        await supabase.auth.signOut();
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

      const redirectPath = coachData ? "/access/coaching" : "/dashboard";
      console.log("Login successful, redirecting:", { userId, redirectPath });
      router.push(redirectPath);
    } catch (err) {
      console.error("Unexpected error in handleLogin:", err.message);
      setError("An unexpected error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-[var(--surface)]"
    >
      <div className="card-gradient p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="flex items-center justify-center space-x-1 mb-4">
          <h1 className="text-xl font-bold text-primary text-[var(--primary)] ">CSM </h1>
          <h1 className="text-xl font-light text-white">Dynamics</h1>
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
      </div>
    </motion.div>
  );
}
