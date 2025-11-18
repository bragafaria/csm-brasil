// app/dashboard/[siteId]/coaching/redirect-handler/page.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/ui/Spinner";

export default function RedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/\/dashboard\/([^/]+)\//);
    const siteId = match?.[1];

    setTimeout(() => {
      router.replace(`/dashboard/${siteId}/coaching/sessions`);
    }, 3000);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Spinner>Finalizing purchase...</Spinner>
        <p className="mt-4">Please wait...</p>
      </div>
    </div>
  );
}
