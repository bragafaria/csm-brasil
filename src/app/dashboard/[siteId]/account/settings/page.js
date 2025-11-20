"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";
import Image from "next/image";

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
      // Fetch subscription status
      const { data: subData, error } = await supabase
        .from("blueprint_subscriptions")
        .select("display_status, status")
        .eq("user_id", session.user.id)
        .maybeSingle(); // ← This prevents the crash when no subscription exists

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
          return_url: window.location.href + "?portal_return=1", // add flag
        }),
      });

      const { url } = await response.json();

      if (url) {
        // Open in new tab — user can close it anytime
        const newWindow = window.open(url, "_blank");
        if (!newWindow) {
          alert("Please allow popups for this site");
        }

        // Optional: Auto-refresh when they come back (detect flag)
        const checkReturn = setInterval(() => {
          if (document.hidden === false && window.location.search.includes("portal_return=1")) {
            clearInterval(checkReturn);
            window.history.replaceState({}, "", window.location.pathname); // clean URL
            window.location.reload(); // refresh subscription status
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

    setEmailLoading(true);
    setEmailStatus(null);

    const { error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (error) {
      setEmailStatus({ success: false, message: error.message });
    } else {
      setEmailStatus({
        success: true,
        message: "Email change requested! Check your NEW email for the confirmation link.",
      });
      setNewEmail("");
    }

    setEmailLoading(false);
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
      <div className="min-h-screen flex items-center justify-center bg-[var(--surface)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--surface)] p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[var(--text-primary)]">Account Settings</h2>
        </div>

        {/* Current Email */}
        <section className="card-gradient p-6 rounded-xl shadow-custom-lg">
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Current Email</h3>
          <p className="text-lg text-[var(--text-secondary)] break-all">{currentEmail}</p>
        </section>

        {/* Change Email Form */}
        <section className="card-gradient p-6 rounded-xl shadow-custom-lg">
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Change Email Address</h3>

          <form onSubmit={handleEmailChange} className="space-y-4">
            <input
              type="email"
              placeholder="New email address"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition"
            />

            {emailStatus && (
              <p
                className={`text-sm p-3 rounded-lg text-center ${
                  emailStatus.success ? "bg-green-900/50 text-green-300" : "bg-red-900/50 text-red-300"
                }`}
              >
                {emailStatus.message}
              </p>
            )}

            <button
              type="submit"
              disabled={emailLoading}
              className="btn-primary w-full py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {emailLoading ? "Sending Confirmation..." : "Change Email"}
            </button>

            <p className="text-xs text-[var(--text-secondary)] text-center">
              A confirmation link will be sent to your <strong>new</strong> email.
            </p>
          </form>
        </section>

        {/* Change Password Form */}
        <section className="card-gradient p-6 rounded-xl shadow-custom-lg">
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Change Password</h3>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition"
            />

            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength="6"
              className="w-full px-4 py-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition"
            />

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength="6"
              className="w-full px-4 py-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] transition"
            />

            {passwordStatus && (
              <p
                className={`text-sm p-3 rounded-lg text-center ${
                  passwordStatus.success ? "bg-green-900/50 text-green-300" : "bg-red-900/50 text-red-300"
                }`}
              >
                {passwordStatus.message}
              </p>
            )}

            <button
              type="submit"
              disabled={passwordLoading}
              className="btn-primary w-full py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {passwordLoading ? "Updating Password..." : "Update Password"}
            </button>
          </form>
        </section>

        {/* Subscription Management */}
        <section className="card-gradient p-6 rounded-xl shadow-custom-lg">
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Subscription</h3>

          {subscriptionStatus ? (
            <div className="space-y-4">
              <div>
                <p className="text-[var(--text-secondary)]">Status</p>

                <p
                  className={`font-bold text-lg ${
                    subscriptionStatus === "active" || subscriptionStatus === "trialing"
                      ? "text-green-400" // Good states = green
                      : subscriptionStatus === "canceled" ||
                          subscriptionStatus === "past_due" ||
                          subscriptionStatus === "unpaid" ||
                          subscriptionStatus === "incomplete" ||
                          subscriptionStatus === "incomplete_expired"
                        ? "text-orange-400" // Warning / problem states = orange
                        : "text-[var(--text-secondary)]" // Unknown = neutral
                  }`}
                >
                  {subscriptionStatus === "active" && "Active"}
                  {subscriptionStatus === "trialing" && "Active: Trial period"}
                  {subscriptionStatus === "canceled" && "Canceled: access until end of billing period"}
                  {subscriptionStatus === "past_due" && "Payment failed: please update card"}
                  {subscriptionStatus === "unpaid" && "Unpaid: please update payment"}
                  {subscriptionStatus === "incomplete" && "Incomplete: setup failed"}
                  {subscriptionStatus === "incomplete_expired" && "Incomplete: expired"}

                  {/* Fallback */}
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

              <button
                onClick={openCustomerPortal}
                disabled={portalLoading}
                className="btn-primary w-full py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {portalLoading ? "Opening Portal..." : "Manage Subscription → Update Card / Cancel"}
              </button>

              <p className="text-xs text [var(--text-secondary)] text-center">
                Update payment method, renew or cancel anytime in the secure Stripe portal.
              </p>
            </div>
          ) : (
            <p className="text-[var(--text-secondary)] text-center py-8">No active subscription</p>
          )}
        </section>
      </div>
    </div>
  );
}
