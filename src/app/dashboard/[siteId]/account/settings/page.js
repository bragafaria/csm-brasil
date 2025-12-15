"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";
import { motion } from "framer-motion";
import { Mail, Lock, CreditCard, AlertCircle, CheckCircle } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [currentEmail, setCurrentEmail] = useState("");
  const [loading, setLoading] = useState(true);

  // Subscription state
  const [subscriptionStatus, setSubscriptionStatus] = useState(""); // "active" | "canceled" | null
  const [portalLoading, setPortalLoading] = useState(false);

  // Change Email
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);

  // Change Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(null);

  useEffect(() => {
    async function loadUserAndSubscription() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      setUser(session.user);
      setCurrentEmail(session.user.email || "");

      // Fetch subscription status
      const { data: subData, error } = await supabase
        .from("blueprint_subscriptions")
        .select("display_status, status")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (subData) {
        setSubscriptionStatus(subData.display_status || subData.status || "");
      }

      setLoading(false);
    }
    loadUserAndSubscription();
  }, [router]);

  // ==================== STRIPE CUSTOMER PORTAL ====================
  const openCustomerPortal = async () => {
    setPortalLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        alert("You must be logged in");
        return;
      }

      const response = await fetch("/api/create-portal-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          return_url: window.location.href + "?portal_return=1",
        }),
      });

      const { url } = await response.json();

      if (url) {
        const newWindow = window.open(url, "_blank");
        if (!newWindow) {
          alert("Please allow popups for this site");
        }

        const checkReturn = setInterval(() => {
          if (document.hidden === false && window.location.search.includes("portal_return=1")) {
            clearInterval(checkReturn);
            window.history.replaceState({}, "", window.location.pathname);
            window.location.reload();
          }
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      alert("Error opening billing portal");
    } finally {
      setPortalLoading(false);
    }
  };

  // ==================== CHANGE EMAIL ====================
  const handleEmailChange = async (e) => {
    e.preventDefault();

    if (!newEmail || !newEmail.includes("@")) {
      setEmailStatus({ success: false, message: "Please enter a valid email address" });
      return;
    }

    if (newEmail.toLowerCase() !== confirmEmail.toLowerCase()) {
      setEmailStatus({ success: false, message: "Email addresses do not match" });
      return;
    }

    if (newEmail.toLowerCase() === currentEmail.toLowerCase()) {
      setEmailStatus({ success: false, message: "New email must be different from current email" });
      return;
    }

    setEmailLoading(true);
    setEmailStatus(null);

    try {
      // Step 1: Request email change from Supabase Auth
      const { data, error } = await supabase.auth.updateUser({
        email: newEmail,
      });

      if (error) {
        setEmailStatus({ success: false, message: error.message });
        setEmailLoading(false);
        return;
      }

      // Step 2: Success - Email change confirmation sent
      setEmailStatus({
        success: true,
        message:
          "Email change requested! Check your NEW email for the confirmation link. Once confirmed, your account will be updated automatically.",
      });
      setNewEmail("");
      setConfirmEmail("");
    } catch (err) {
      console.error("Email change error:", err);
      setEmailStatus({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setEmailLoading(false);
    }
  };

  // ==================== CHANGE PASSWORD ====================
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordStatus({ success: false, message: "New passwords do not match" });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordStatus({ success: false, message: "Password must be at least 6 characters" });
      return;
    }

    setPasswordLoading(true);
    setPasswordStatus(null);

    // Re-authenticate with current password (required by Supabase)
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: currentEmail,
      password: currentPassword,
    });

    if (authError) {
      setPasswordStatus({ success: false, message: "Current password is incorrect" });
      setPasswordLoading(false);
      return;
    }

    // Update password
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setPasswordStatus({ success: false, message: error.message });
    } else {
      setPasswordStatus({ success: true, message: "Password updated successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }

    setPasswordLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--surface)] via-[var(--surface-variant)] to-[var(--surface)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--surface)] via-[var(--surface-variant)] to-[var(--surface)] p-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-gradient rounded-3xl p-8 md:p-12 shadow-2xl border border-[var(--border)]"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Account Settings</h1>
            <p className="text-lg text-white/80">Manage your account, subscription, and security settings.</p>
          </div>

          <div className="space-y-8">
            {/* Current Email Display */}
            <div className="p-6 bg-white/5 border border-white/30 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-5 h-5 text-white/90" />
                <h3 className="text-lg font-semibold text-white/90">Current Email</h3>
              </div>
              <p className="text-white text-lg break-all ml-8">{currentEmail}</p>
            </div>

            {/* Change Email Form */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-white/90" />
                <h3 className="text-xl font-semibold text-white/90">Change Email Address</h3>
              </div>

              <form onSubmit={handleEmailChange} className="space-y-4">
                <input
                  type="email"
                  placeholder="New email address"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white transition"
                />

                <input
                  type="email"
                  placeholder="Confirm new email address"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white transition"
                />

                {emailStatus && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-xl flex items-center gap-3 ${
                      emailStatus.success
                        ? "bg-green-500/20 border border-green-500/50"
                        : "bg-red-500/20 border border-red-500/50"
                    }`}
                  >
                    {emailStatus.success ? (
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    )}
                    <p className={`text-sm ${emailStatus.success ? "text-green-300" : "text-red-300"}`}>
                      {emailStatus.message}
                    </p>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={emailLoading}
                  className="w-full py-4 rounded-xl btn-primary font-bold text-lg shadow-lg hover:shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {emailLoading ? "Sending Confirmation..." : "Change Email"}
                </motion.button>

                <p className="text-xs text-white/50 text-center">
                  A confirmation link will be sent to your <strong className="text-white/80">new</strong> email.
                </p>
              </form>
            </div>

            {/* Change Password Form */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-white/90" />
                <h3 className="text-xl font-semibold text-white/90">Change Password</h3>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <input
                  type="password"
                  placeholder="Current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white transition"
                />

                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength="6"
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white transition"
                />

                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength="6"
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white transition"
                />

                {passwordStatus && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-xl flex items-center gap-3 ${
                      passwordStatus.success
                        ? "bg-green-500/20 border border-green-500/50"
                        : "bg-red-500/20 border border-red-500/50"
                    }`}
                  >
                    {passwordStatus.success ? (
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    )}
                    <p className={`text-sm ${passwordStatus.success ? "text-green-300" : "text-red-300"}`}>
                      {passwordStatus.message}
                    </p>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={passwordLoading}
                  className="w-full py-4 rounded-xl btn-primary font-bold text-lg shadow-lg hover:shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {passwordLoading ? "Updating Password..." : "Update Password"}
                </motion.button>
              </form>
            </div>

            {/* Subscription Management */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-white/90" />
                <h3 className="text-xl font-semibold text-white/90">Subscription</h3>
              </div>

              {subscriptionStatus ? (
                <div className="space-y-4">
                  <div className="p-6 bg-white/5 border border-white/30 rounded-xl">
                    <p className="text-white/70 text-sm mb-2">Status</p>
                    <p
                      className={`font-bold text-lg ${
                        subscriptionStatus === "active" || subscriptionStatus === "trialing"
                          ? "text-green-400"
                          : subscriptionStatus === "canceled" ||
                              subscriptionStatus === "past_due" ||
                              subscriptionStatus === "unpaid" ||
                              subscriptionStatus === "incomplete" ||
                              subscriptionStatus === "incomplete_expired"
                            ? "text-orange-400"
                            : "text-white/70"
                      }`}
                    >
                      {subscriptionStatus === "active" && "Active"}
                      {subscriptionStatus === "trialing" && "Active: Trial period"}
                      {subscriptionStatus === "canceled" && "Canceled: access until end of billing period"}
                      {subscriptionStatus === "past_due" && "Payment failed: please update card"}
                      {subscriptionStatus === "unpaid" && "Unpaid: please update payment"}
                      {subscriptionStatus === "incomplete" && "Incomplete: setup failed"}
                      {subscriptionStatus === "incomplete_expired" && "Incomplete: expired"}
                      {![
                        "active",
                        "trialing",
                        "canceled",
                        "past_due",
                        "unpaid",
                        "incomplete",
                        "incomplete_expired",
                      ].includes(subscriptionStatus) &&
                        (subscriptionStatus
                          ? subscriptionStatus.charAt(0).toUpperCase() + subscriptionStatus.slice(1).replace(/_/g, " ")
                          : "Unknown")}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openCustomerPortal}
                    disabled={portalLoading}
                    className="w-full py-4 rounded-xl btn-primary font-bold text-lg shadow-lg hover:shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {portalLoading ? "Opening Portal..." : "Manage Subscription → Update Card / Cancel"}
                  </motion.button>

                  <p className="text-xs text-white/50 text-center">
                    Update payment method, renew or cancel anytime in the secure Stripe portal.
                  </p>
                </div>
              ) : (
                <div className="p-8 bg-white/5 border border-white/30 rounded-xl text-center">
                  <p className="text-white/60">No active subscription</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
