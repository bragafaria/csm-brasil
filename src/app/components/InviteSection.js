"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default function InviteSection({ siteId }) {
  const [inviteLink, setInviteLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchInvite() {
      setLoading(true);
      setError("");

      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
        auth: { persistSession: true },
      });

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

      const token = session.access_token;
      const response = await fetch("/api/get-invite", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (response.ok) {
        setInviteLink(result.inviteLink);
      } else {
        setError(result.error || "Failed to fetch invite link.");
      }
      setLoading(false);
    }

    fetchInvite();
  }, [router]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    alert("Invite link copied to clipboard!");
  };

  if (loading) return <p>Loading invite...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

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
