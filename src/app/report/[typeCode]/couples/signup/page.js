// src/app/components/couples/Signup.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const signupSchema = z
  .object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(6, { message: "Email must be at least 6 characters" }),
    confirmEmail: z.string(),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    typeCode: z.string().regex(/^[A-Z0-9-]+$/, { message: "Invalid type code" }),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Emails do not match",
    path: ["confirmEmail"],
  });

export default function Signup() {
  const { typeCode } = useParams();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [assessmentData, setAssessmentData] = useState(null);

  useEffect(() => {
    async function init() {
      try {
        // Load assessment data
        const stored = localStorage.getItem("csmAssessmentData");
        if (stored) {
          const parsed = JSON.parse(stored);
          setAssessmentData(parsed.results);
          console.log("Stored assessment data:", parsed.results);
        } else {
          console.warn("No assessment data found in localStorage");
          setServerError("Please complete the assessment before signing up.");
        }

        // Check session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError) {
          console.error("Session check error:", sessionError.message, sessionError);
          return;
        }

        if (session) {
          console.log("Existing session found, redirecting to dashboard:", session.user.id);
          router.push(`/dashboard/${session.user.id}`);
        }
      } catch (err) {
        console.error("Unexpected error in init:", err.message, err);
        setServerError("An unexpected error occurred. Please try again.");
      }
    }
    init();
  }, [router]);

  const handleSignOut = async () => {
    try {
      console.log("Signing out...");
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error.message, error);
        setServerError("Failed to sign out. Please try again.");
        return;
      }
      // Preserve csmAssessmentData
      const savedAssessment = localStorage.getItem("csmAssessmentData");
      if (savedAssessment) {
        localStorage.setItem("csmAssessmentData", savedAssessment);
      }
      console.log("Signed out successfully, preserved csmAssessmentData");
      router.push(`/report/${typeCode}/couples`);
    } catch (err) {
      console.error("Unexpected error in handleSignOut:", err.message, err);
      setServerError("An unexpected error occurred during sign out.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setServerError(null);
    setConfirmationSent(false);

    const result = signupSchema.safeParse({ name, email, confirmEmail, password, typeCode });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      setLoading(false);
      return;
    }

    try {
      // Check if user already exists
      const { data: existingUser, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (userError) {
        console.error("Error checking existing user:", userError.message, userError);
        throw new Error("Failed to verify email availability.");
      }

      if (existingUser) {
        console.warn("User already exists with email:", email);
        setServerError("An account with this email already exists. Please log in.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, typeCode, has_assessment: !!assessmentData },
          emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/success/login`,
        },
      });

      if (error) {
        console.error("Signup error:", error.message, error);
        throw new Error(error.message || "Failed to sign up. Please try again.");
      }

      if (!data.user) {
        console.error("User creation failed: No user data returned");
        throw new Error("User creation failed. No user data returned.");
      }

      let session = data.session;

      if (!session) {
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) {
          if (signInError.message.includes("Email not confirmed")) {
            setConfirmationSent(true);
            setLoading(false);
            return;
          }
          console.error("Sign-in error:", signInError.message, signInError);
          throw signInError;
        }
        session = signInData.session;
      }

      if (!session) {
        setConfirmationSent(true);
        setLoading(false);
        return;
      }

      // Update users table with assessment data
      if (assessmentData) {
        const updateData = {
          name,
          typeCode,
          has_assessment: true,
          percents: assessmentData.percents?.length === 5 ? assessmentData.percents : [],
          dominants: assessmentData.dominants?.length === 5 ? assessmentData.dominants : [],
          categories: assessmentData.categories?.length === 5 ? assessmentData.categories : [],
        };

        const { error: updateError } = await supabase.from("users").update(updateData).eq("id", data.user.id);

        if (updateError) {
          console.error("Error updating user data:", updateError.message, updateError);
          throw new Error("Failed to save assessment data.");
        }
      }

      // Create Stripe checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ typeCode, assessmentData }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        console.error("Checkout session error:", responseData.error, responseData);
        throw new Error(responseData.error || "Failed to create checkout session.");
      }

      const { url } = responseData;
      if (!url) {
        console.error("No checkout URL returned:", responseData);
        throw new Error("No checkout URL returned from server.");
      }

      // Clear assessment data after successful signup
      localStorage.removeItem("csmAssessmentData");
      console.log("Cleared csmAssessmentData from localStorage");
      window.location.href = url;
    } catch (err) {
      console.error("Signup error:", err.message, err);
      setServerError(
        err.message.includes("already exists")
          ? "An account with this email already exists. Please log in."
          : err.message || "An unexpected error occurred during signup."
      );
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-[var(--surface)] p-4"
    >
      <div className="card-gradient p-8 rounded-lg shadow-custom-lg max-w-md w-full">
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
          Sign Up to Get Your Couple Insights Report
        </motion.h1>

        {confirmationSent ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-[var(--text-primary)] mb-4">
              A confirmation email has been sent to {email}. Please verify your email to continue.
            </p>
            <motion.button
              onClick={() => router.push(`/report/${typeCode}/couples`)}
              className="btn-primary w-full py-3 rounded-lg font-semibold inline-flex items-center justify-center group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Return to Couples Page
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        ) : (
          <>
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <motion.input
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
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
                <motion.input
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
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
                <motion.input
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
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
                <motion.input
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
                  required
                />
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password[0]}</p>}
              </div>

              {serverError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm text-center"
                >
                  {serverError}
                </motion.p>
              )}

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                type="submit"
                disabled={loading || !assessmentData}
                className="btn-primary w-full py-3 rounded-lg font-semibold inline-flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: !loading && assessmentData ? 1.05 : 1 }}
                whileTap={{ scale: !loading && assessmentData ? 0.95 : 1 }}
              >
                {loading ? "Processing..." : "Sign Up and Proceed to Payment"}
                {!loading && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
              </motion.button>
            </form>

            {!assessmentData && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-red-400 text-sm mt-4 text-center"
              >
                Complete your assessment:
                <a href={`/report/${typeCode}/couples`} className="text-[var(--accent)] hover:underline ml-1">
                  <span className="text-[var(--primary)] font-medium">Click here!</span>
                </a>
              </motion.p>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
