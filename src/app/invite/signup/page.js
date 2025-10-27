// src/app/invite/signup/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient"; // Use singleton
import { ArrowRight } from "lucide-react";

export default function InviteSignupPage() {
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

  useEffect(() => {
    const invite = searchParams.get("invite");
    const siteId = searchParams.get("siteId");
    if (!invite || !siteId) {
      console.error("Missing invite or siteId:", { invite, siteId });
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
      console.error("Missing invite or siteId in form submission:", { invite, siteId });
      setServerError("Invalid invite link. Please use a valid link.");
      setShowModal(true);
      setLoading(false);
      return;
    }

    try {
      // Sign up Partner B
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });

      if (authError) {
        console.error("Signup error:", authError.message);
        setServerError(authError.message);
        setShowModal(true);
        setLoading(false);
        return;
      }

      const partnerBId = authData.user.id;
      console.log("Partner B signed up:", { partnerBId, email });

      // Call the invite-signup API to link users and delete invite
      const response = await fetch("/api/invite-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, confirmEmail, password, invite, siteId, partnerBId }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("API error:", result.error);
        setServerError(result.error || "An unexpected error occurred.");
        setShowModal(true);
        setLoading(false);
        return;
      }

      // Ensure session is active
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        console.error("No session after signup:", sessionError?.message);
        // Attempt to sign in manually
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) {
          console.error("Sign-in error after signup:", signInError.message);
          setServerError(signInError.message || "Failed to establish session.");
          setShowModal(true);
          setLoading(false);
          return;
        }
      }

      console.log("Signup and session established successfully, redirecting to dashboard");
      router.push(`/dashboard/${siteId}/personal-report/${createSlug(name)}`);
    } catch (err) {
      console.error("Unexpected error in handleSignup:", err.message, err.stack);
      setServerError(err.message || "An unexpected error occurred. Please try again.");
      setShowModal(true);
      setLoading(false);
    }
  };

  const createSlug = (name) => {
    if (!name) return "";
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const closeModal = () => {
    setShowModal(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface)]">
      <div className="card-gradient p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-[var(--text-primary)]">Sign Up to Join Your Partner</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] focus:border-[var(--accent)] text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
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
              className="w-full p-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] focus:border-[var(--accent)] text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
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
              className="w-full p-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] focus:border-[var(--accent)] text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
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
              className="w-full p-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] focus:border-[var(--accent)] text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
              required
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password[0]}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 rounded-lg font-semibold inline-flex items-center justify-center group"
          >
            {loading ? "Processing..." : "Sign Up"}
            {!loading && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-[var(--surface)] p-6 rounded-xl shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Error</h2>
              <p className="text-[var(--text-secondary)] mb-4">{serverError}</p>
              <button onClick={closeModal} className="btn-primary w-full py-3 rounded-lg font-semibold">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
