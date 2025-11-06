// src/app/components/InviteSection.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";
import { motion } from "framer-motion";
import Spinner from "@/app/components/ui/Spinner.js";

export default function InviteSection({ siteId }) {
  const [inviteLink, setInviteLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchInvite() {
      if (!siteId) {
        console.error("Invalid siteId:", siteId);
        setError("Invalid dashboard URL.");
        setLoading(false);
        return;
      }

      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError || !session) {
          console.error("Session error:", sessionError?.message || "No session found");
          setError("You must be logged in to generate an invite.");
          setLoading(false);
          router.push("/login");
          return;
        }
        console.log("InviteSection session user ID:", session.user.id);

        const userId = session.user.id;

        // Verify user is associated with siteId
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("id, partner_id")
          .eq("id", siteId)
          .single();

        if (userError || !userData) {
          console.error("Error fetching user data:", userError?.message || "No user found for siteId", siteId);
          setError("Failed to load dashboard data.");
          setLoading(false);
          return;
        }

        if (userId !== userData.id && userId !== userData.partner_id) {
          console.error("Access denied: User not associated with siteId", { userId, siteId });
          setError("You do not have access to this dashboard.");
          setLoading(false);
          return;
        }

        const token = session.access_token;
        const response = await fetch("/api/get-invite", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        if (response.ok) {
          setInviteLink(result.inviteLink);
        } else {
          console.error("API error:", result.error || "Failed to fetch invite link", result);
          setError(result.error || "Failed to fetch invite link. Please try again.");
        }
      } catch (err) {
        console.error("Unexpected error in fetchInvite:", err.message, err.stack);
        setError("Failed to load invite link. Please refresh the page or contact support.");
      } finally {
        setLoading(false);
      }
    }

    fetchInvite();
  }, [siteId, router]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      // Visual feedback (you can add toast notification here)
      console.log("Invite link copied!");
    } catch (err) {
      console.error("Failed to copy:", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = inviteLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card-gradient p-6 rounded-lg shadow-custom"
      >
        <div className="flex items-center space-x-3">
          <Spinner>{"Loading invite..."}</Spinner>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[var(--surface-variant)] p-6 rounded-lg border border-red-400/20 shadow-custom"
      >
        <p className="text-red-400 text-sm font-medium mb-2">{error}</p>
        <button onClick={() => window.location.reload()} className="text-xs text-[var(--accent)] hover:underline">
          Refresh
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card-gradient p-6 rounded-lg shadow-custom hover:shadow-custom-lg transition-all"
    >
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Invite Your Partner</h2>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
          Share this private link with your partner to join the dashboard and take their assessment.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3">
        {/* <div className="flex-1 relative group">
          <input
            type="text"
            value={inviteLink}
            readOnly
            className="w-full px-4 py-3 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent)] transition-[var(--transition)] pr-12"
            placeholder="Invite link will appear here..."
          />
          <div className="absolute inset-0 flex items-center justify-end px-3 pointer-events-none">
            <span className="text-xs text-[var(--text-secondary)] opacity-70 group-hover:opacity-100 transition-opacity">
              Click {"Copy"} to share
            </span>
          </div>
        </div> */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          className="btn-primary py-3 px-6 rounded-lg font-semibold flex items-center gap-2 whitespace-nowrap shadow-md hover:shadow-lg transition-all"
        >
          Copy Link
        </motion.button>
      </div>

      {/* Success feedback */}
      {inviteLink && (
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-3 text-xs text-[var(--accent)] font-medium flex items-center gap-1"
        >
          ✅ Ready to share with your partner!
        </motion.p>
      )}
    </motion.div>
  );
}
