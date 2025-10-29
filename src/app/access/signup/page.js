// @/app/access/signup/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/app/utils/supabaseClient"; // Your Supabase client

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            typeCode: "X-X-X-X-X",
            user_type: "client",
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      setSuccess("Signup successful! Please check your email to confirm.");
      setTimeout(() => router.push("/access/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-6 bg-[var(--surface)] flex items-center justify-center"
    >
      <div className="max-w-md w-full p-6 card-gradient rounded-lg">
        <div className="flex items-center justify-center space-x-1 mb-4">
          <h1 className="text-xl font-bold text-primary text-[var(--primary)] ">CSM </h1>
          <h1 className="text-xl font-light text-white">Dynamics</h1>
        </div>
        <h1 className="text-lg font-bold text-[var(--text-primary)] mb-6">Sign Up</h1>
        {success && <p className="text-green-400 mb-4">{success}</p>}
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="text-[var(--text-primary)] font-semibold">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="text-[var(--text-primary)] font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-[var(--text-primary)] font-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary py-2 px-4 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
