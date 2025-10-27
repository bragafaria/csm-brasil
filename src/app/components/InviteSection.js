// src/app/components/InviteSection.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";

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
          method: "GET", // Changed to GET
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    alert("Invite link copied to clipboard!");
  };

  if (loading) return <p className="p-4 text-[var(--text-primary)]">Loading invite...</p>;
  if (error) return <p className="p-4 text-red-400">{error}</p>;

  return (
    <div className="bg-[var(--surface)] p-6 rounded-xl shadow-custom">
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Invite Your Partner</h2>
      <p className="text-[var(--text-secondary)] mb-4">
        Share this link with your partner to join the dashboard and take their assessment.
      </p>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={inviteLink}
          readOnly
          className="w-full p-2 rounded-lg bg-[var(--surface-variant)] border border-[var(--border)] text-[var(--text-primary)]"
        />
        <button onClick={copyToClipboard} className="btn-primary py-2 px-4 rounded-lg">
          Copy
        </button>
      </div>
    </div>
  );
}
