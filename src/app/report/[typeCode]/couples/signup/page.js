"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../../utils/supabaseClient";
import { z } from "zod";
import { ArrowRight } from "lucide-react";

const signupSchema = z
  .object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(6, { message: "Email must be at least 6 characters" }),
    confirmEmail: z.string(),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
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
      // Load assessment data
      const stored = localStorage.getItem("csmAssessmentData");
      if (stored) {
        const parsed = JSON.parse(stored);
        setAssessmentData(parsed.results);
        console.log("Stored assessment data:", parsed.results);
      }

      // Check and sign out if session exists
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        console.log("Existing session found on signup page - signing out");
        //await supabase.auth.signOut();
        //localStorage.removeItem("supabase.auth.token"); // Explicitly clear Supabase storage key
        //router.refresh(); // Refresh to reload without session
      }
    }
    init();
  }, [router]);

  const handleSignOut = async () => {
    console.log("Signing out...");
    const { error } = await supabase.auth.signOut();
    localStorage.clear();
    sessionStorage.clear();
    console.log("Cleared storage and signed out");

    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      router.push("/login");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setServerError(null);
    setConfirmationSent(false);

    const result = signupSchema.safeParse({ name, email, confirmEmail, password });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, typeCode },
          emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/report/${typeCode}/couples/signup`,
        },
      });

      if (error) {
        throw new Error(error.message || "Failed to sign up. Please try again.");
      }

      if (!data.user) {
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
          throw signInError;
        }
        session = signInData.session;
      }

      if (!session) {
        setConfirmationSent(true);
        setLoading(false);
        return;
      }

      // Test authentication token
      const { data: userData, error: authError } = await supabase.auth.getUser(session.access_token);
      console.log("Auth Test Result:", { userData, authError });
      if (authError || !userData.user) {
        throw new Error(authError?.message || "Failed to verify access token");
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
        throw new Error(responseData.error || "Failed to create checkout session");
      }

      const { url } = responseData;
      if (!url) {
        throw new Error("No checkout URL returned from server");
      }

      window.location.href = url;
    } catch (err) {
      console.error("Signup error:", err);
      setServerError(err.message || "An unexpected error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface)]">
      <div className="card-gradient p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-[var(--text-primary)]">
          Sign Up to Get Your Couple Insights Report
        </h1>
        {confirmationSent ? (
          <div className="text-center">
            <p className="text-[var(--text-primary)] mb-4">
              A confirmation email has been sent to {email}. Please verify your email to continue.
            </p>
            <button
              onClick={() => router.push(`/report/${typeCode}/couples`)}
              className="btn-primary w-full py-3 rounded-lg font-semibold inline-flex items-center justify-center group"
            >
              Return to Couples Page
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : (
          <>
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
              {serverError && <p className="text-red-400 text-sm">{serverError}</p>}
              <button
                type="submit"
                disabled={loading || !assessmentData}
                className="btn-primary w-full py-3 rounded-lg font-semibold inline-flex items-center justify-center group"
              >
                {loading ? "Processing..." : "Sign Up and Proceed to Payment"}
                {!loading && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
            <div className="mt-4">
              <button onClick={handleSignOut} className="text-[var(--text-secondary)] hover:text-[var(--accent)]">
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
