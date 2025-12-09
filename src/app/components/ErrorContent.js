// app/error/ErrorContent.js
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { AlertTriangle } from "lucide-react";
export const revalidate = 0;

export default function ErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(null);

  const message = searchParams.get("message");
  const retryAfter = searchParams.get("retryAfter");

  useEffect(() => {
    if (message === "too_many_requests" && retryAfter) {
      const seconds = parseInt(retryAfter, 10);
      setCountdown(seconds);

      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [message, retryAfter]);

  const getErrorContent = () => {
    switch (message) {
      case "too_many_requests":
        return {
          title: "Too Many Requests",
          description: "You've made too many requests. Please wait a moment before trying again.",
          showCountdown: true,
        };
      default:
        return {
          title: "Something Went Wrong",
          description: "An unexpected error occurred. Please try again later.",
          showCountdown: false,
        };
    }
  };

  const errorContent = getErrorContent();

  const handleGoBack = () => {
    if (countdown === 0 || !errorContent.showCountdown) {
      router.back();
    }
  };

  const formatTime = (seconds) => {
    if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${seconds}s`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface)] p-4">
      <div className="card-gradient p-8 rounded-lg shadow-custom-lg max-w-md w-full text-center">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Image src="/logo_transparent.png" alt="CSM Dynamics Logo" width={28} height={28} className="h-7 w-7" />
          <div className="flex items-center space-x-1">
            <h1 className="text-xl font-bold text-[var(--primary)]">CSM</h1>
            <h1 className="text-xl font-light text-[var(--text-primary)]">Dynamics</h1>
          </div>
        </div>

        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-yellow-500/20 p-4">
            <AlertTriangle className="h-12 w-12 text-yellow-500" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">{errorContent.title}</h2>

        <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">{errorContent.description}</p>

        {errorContent.showCountdown && countdown !== null && (
          <div className="mb-6 p-4 bg-[var(--surface-variant)] rounded-lg border border-[var(--border)]">
            <p className="text-sm text-[var(--text-secondary)] mb-2">You can try again in:</p>
            <p className="text-3xl font-bold text-[var(--accent)]">{formatTime(countdown)}</p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={handleGoBack}
            disabled={countdown > 0}
            className="btn-primary w-full py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {countdown > 0 ? `Wait ${formatTime(countdown)}` : "Go Back"}
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full py-3 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--surface-variant)] transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
