// app/dashboard/[siteId]/support/contact-us/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient"; // ← YOUR WORKING CLIENT
import SupportForm from "@/app/components/ui/form/support";
import Spinner from "@/app/components/ui/Spinner";

export default function SupportPage() {
  const router = useRouter();
  const { siteId } = useParams();

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase.from("users").select("name, email").eq("id", session.user.id).single();

      if (error || !data) {
        router.push("/login");
        return;
      }

      setUserProfile(data);
      setLoading(false);
    }

    loadUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return <SupportForm userName={userProfile.name} userEmail={userProfile.email} siteId={siteId} />;
}
