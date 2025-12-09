"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";
import { checkLoginRateLimit, sendResetEmail } from "@/app/actions/auth-rate-limit";
import Image from "next/image";
import { X, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetStatus, setResetStatus] = useState(null);
  const [resetLoading, setResetLoading] = useState(false);
  const [urlMessage, setUrlMessage] = useState("");
  const [rateLimitInfo, setRateLimitInfo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const msg = params.get("message");
    if (msg === "email_changed") {
      setUrlMessage("Email changed successfully! Please log in with your new email.");
    }
  }, []);

  const handleSendReset = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    setResetStatus(null);

    const result = await sendResetEmail(resetEmail);

    if (result.success) {
      setResetStatus({ success: true, message: result.message });
    } else {
      setResetStatus({ success: false, message: result.error });
    }
    setResetLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRateLimitInfo(null);

    try {
      // Step 1: Check rate limit on server (can't be bypassed)
      const rateLimitCheck = await checkLoginRateLimit(email);

      if (rateLimitCheck.rateLimit) {
        setRateLimitInfo(rateLimitCheck.rateLimit);
      }

      if (!rateLimitCheck.allowed) {
        setError(rateLimitCheck.error);
        setLoading(false);
        return;
      }

      // Step 2: Perform login on client (secure with HTTPS + RLS)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      if (!data.session) {
        setError("No session returned. Please try again.");
        setLoading(false);
        return;
      }

      console.log("Login successful, fetching user data:", { userId: data.session.user.id });

      // Step 3: Fetch user data (protected by RLS policies)
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("site_id")
        .eq("id", data.session.user.id)
        .maybeSingle();

      if (userError) {
        console.error("Error fetching user data:", userError.message, userError);
        setError("Failed to load user data.");
        setLoading(false);
        return;
      }

      if (!userData) {
        console.error("No user found for ID:", data.session.user.id);
        setError("User not found.");
        setLoading(false);
        return;
      }

      if (!userData.site_id) {
        console.log("No siteId found for user, showing modal");
        setShowModal(true);
        setLoading(false);
        return;
      }

      console.log("Redirecting to dashboard with siteId:", userData.site_id);
      router.push(`/dashboard/${userData.site_id}`);
    } catch (err) {
      console.error("Unexpected error during login:", err.message, err);
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface)] p-4">
      <div className="relative card-gradient p-8 rounded-lg shadow-custom-lg max-w-md w-full">
        <button
          onClick={() => router.push("/")}
          className="absolute top-4 right-4 text-gray-500 hover:text-[var(--accent)] transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Image src="/logo_transparent.png" alt="CSM Dynamics Logo" width={28} height={28} className="h-7 w-7" />
          <div className="flex items-center space-x-1">
            <h1 className="text-xl font-bold text-[var(--primary)]">CSM</h1>
            <h1 className="text-xl font-light text-[var(--text-primary)]">Dynamics</h1>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center text-[var(--text-primary)]">Login to Your Account</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
          </div>
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsResetModalOpen(true)}
              className="text-[var(--accent)] text-sm hover:underline font-medium"
            >
              Forgot password?
            </button>
          </div>

          {/* Rate limit info display */}
          {/* {rateLimitInfo && !rateLimitInfo.limited && (
            <p className="text-xs text-[var(--text-secondary)] text-center">
              Login attempts remaining: {rateLimitInfo.remaining}
            </p>
          )} */}

          {error && (
            <div className="p-3 bg-red-900/50 border border-red-500/50 rounded-lg">
              <p className="text-red-300 text-sm text-center">{error}</p>
            </div>
          )}

          {urlMessage && (
            <div className="p-4 bg-green-900/50 border border-green-500/50 rounded-lg text-green-300 text-center text-sm">
              {urlMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || rateLimitInfo?.limited}
            className="btn-primary w-full py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-[var(--text-secondary)] text-sm">
          {`Don't have an account?`}{" "}
          <a href="/csm-assessment" className="text-[var(--accent)] hover:underline font-medium">
            Take your free assessment now!
          </a>
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="card-gradient p-6 rounded-lg shadow-custom-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Action Required</h2>
            <p className="text-[var(--text-secondary)] mb-6 text-sm leading-relaxed">
              {`Please complete the personal assessment test and purchase the couple's report to access your dashboard.`}
            </p>
            <button
              onClick={handleModalClose}
              className="btn-primary w-full py-3 rounded-lg font-semibold transition-all"
            >
              Ok
            </button>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {isResetModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4 transition-opacity duration-300 ease-in-out border border-[var(--border)]">
          <div className="card-gradient p-6 rounded-xl shadow-2xl max-w-sm w-full transform transition-transform duration-300 ease-in-out scale-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">Reset Your Password</h2>
              <button
                type="button"
                onClick={() => {
                  setIsResetModalOpen(false);
                  setResetEmail("");
                  setResetStatus(null);
                }}
                className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSendReset} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 transition-[var(--transition)]"
              />

              {resetStatus && (
                <p
                  className={`text-sm text-center p-2 rounded-md ${
                    resetStatus.success ? "bg-green-900/50 text-green-300" : "bg-red-900/50 text-red-300"
                  }`}
                >
                  {resetStatus.message}
                </p>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsResetModalOpen(false);
                    setResetEmail("");
                    setResetStatus(null);
                  }}
                  className="flex-1 py-3 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--surface-variant)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="flex-1 btn-primary py-3 rounded-lg font-semibold disabled:opacity-50 transition-all hover:brightness-110"
                >
                  {resetLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
