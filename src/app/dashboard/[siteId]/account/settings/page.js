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
    async function loadUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      setUser(session.user);
      setCurrentEmail(session.user.email || "");
      setLoading(false);
    }
    loadUser();
  }, [router]);

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
        message: "Email change requested! Please check your NEW email and click the confirmation link.",
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

    // Re-authenticate with current password (Supabase requires this for password changes)
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: currentEmail,
      password: currentPassword,
    });

    if (authError) {
      setPasswordStatus({ success: false, message: "Current password is incorrect" });
      setPasswordLoading(false);
      return;
    }

    // Now update the password
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
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Image src="/logo_transparent_svg.svg" alt="Logo" width={32} height={32} className="h-8 w-8" />
            <div className="flex items-center space-x-1">
              <h1 className="text-2xl font-bold text-[var(--primary)]">CSM</h1>
              <h1 className="text-2xl font-light text-[var(--text-primary)]">Dynamics</h1>
            </div>
          </div>
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

        {/* Sign Out */}
        <div className="text-center pt-8">
          <button
            onClick={() => supabase.auth.signOut()}
            className="text-[var(--text-secondary)] hover:text-red-400 underline transition-colors"
          >
            Sign out from all devices
          </button>
        </div>
      </div>
    </div>
  );
}
