// app/error/page.js
import { Suspense } from "react";
import ErrorContent from "@/app/components/ErrorContent"; // ← your existing client component
import Spinner from "@/app/components/ui/Spinner";

// This ONE line fixes the Vercel build error forever
export const dynamic = "force-dynamic";

export default function ErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[var(--surface)]">
          <Spinner>Loading...</Spinner>
        </div>
      }
    >
      <ErrorContent />
    </Suspense>
  );
}
