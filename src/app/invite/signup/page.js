// src/app/invite/signup/page.js
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

function InviteSignupContent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // const createSlug = (name) => {
  //   if (!name) return "";
  //   return name
  //     .toLowerCase()
  //     .replace(/[^a-z0-9]+/g, "-")
  //     .replace(/(^-|-$)/g, "");
  // };

  useEffect(() => {
    const invite = searchParams.get("invite");
    const siteId = searchParams.get("siteId");
    if (!invite || !siteId) {
      setServerError("Invalid invite link. Please use a valid link.");
      setShowModal(true);
    }
  }, [searchParams]);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = ["Name is required"];
    if (!email) newErrors.email = ["Email is required"];
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = ["Invalid email format"];
    if (!confirmEmail) newErrors.confirmEmail = ["Confirm email is required"];
    else if (email !== confirmEmail) newErrors.confirmEmail = ["Emails do not match"];
    if (!password) newErrors.password = ["Password is required"];
    else if (password.length < 6) newErrors.password = ["Password must be at least 6 characters"];
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setServerError("");
    setShowModal(false);
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const invite = searchParams.get("invite");
    const siteId = searchParams.get("siteId");

    if (!invite || !siteId) {
      setServerError("Invalid invite link.");
      setShowModal(true);
      setLoading(false);
      return;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });

      if (authError) {
        setServerError(authError.message);
        setShowModal(true);
        setLoading(false);
        return;
      }

      const partnerBId = authData.user.id;

      const response = await fetch("/api/invite-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, confirmEmail, password, invite, siteId, partnerBId }),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result.error || "An unexpected error occurred.");
        setShowModal(true);
        setLoading(false);
        return;
      }

      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) {
          setServerError(signInError.message);
          setShowModal(true);
          setLoading(false);
          return;
        }
      }

      // GET site_id FROM PARTNER A
      const { data: partnerA } = await supabase.from("users").select("site_id").eq("id", siteId).single();

      const dashboardId = partnerA?.site_id || siteId;
      router.push(`/dashboard/${dashboardId}`);
    } catch (err) {
      setServerError(err.message || "An unexpected error occurred.");
      setShowModal(true);
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface)] p-4">
      <div className="card-gradient p-8 rounded-lg shadow-custom-lg max-w-md w-full">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Image src="/logo_transparent_svg.svg" alt="CSM Dynamics Logo" width={28} height={28} className="h-7 w-7" />
          <div className="flex items-center space-x-1">
            <h1 className="text-xl font-bold text-[var(--primary)]">CSM</h1>
            <h1 className="text-xl font-light text-[var(--text-primary)]">Dynamics</h1>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center text-[var(--text-primary)]">Sign Up to Join Your Partner</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
              required
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name[0]}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
              required
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email[0]}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Confirm Email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              onPaste={(e) => e.preventDefault()}
              className="w-full px-4 py-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
              required
            />
            {errors.confirmEmail && <p className="text-red-400 text-sm mt-1">{errors.confirmEmail[0]}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
              required
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password[0]}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 rounded-lg font-semibold inline-flex items-center justify-center group transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Sign Up"}
            {!loading && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
            <div className="card-gradient p-6 rounded-lg shadow-custom-lg max-w-sm w-full">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Error</h2>
              <p className="text-[var(--text-secondary)] mb-6 text-sm leading-relaxed">{serverError}</p>
              <button onClick={closeModal} className="btn-primary w-full py-3 rounded-lg font-semibold transition-all">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function InviteSignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[var(--surface)]">
          <div className="text-[var(--text-primary)]">Loading...</div>
        </div>
      }
    >
      <InviteSignupContent />
    </Suspense>
  );
}
