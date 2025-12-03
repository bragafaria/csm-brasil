// app/layout.js
import "./globals.css";
import SupabaseListener from "@/app/lib/supabase/SupabaseListerner";

// app/layout.tsx or wherever you export metadata
// FINAL VERSION – copy-paste this exactly into your root layout.tsx

export const metadata = {
  title: "CSM Personality Test for Couples | Free Cognitive Compatibility Quiz",
  description:
    "Discover your relationship’s hidden strengths and weaknesses with the Cognitive Spectrum Model (CSM) — the first personality framework built for couples. Take the free test and get your Cognitive Alignment Score (CAS).",

  openGraph: {
    title: "CSM Personality Test for Couples | Free Cognitive Compatibility Quiz",
    description:
      "Understand how you and your partner truly think. The only personality test that shows your exact cognitive compatibility with a science-backed score.",
    url: "https://csmdynamics.com",
    siteName: "Cognitive Spectrum Model",
    images: [
      {
        url: "https://csmdynamics.com/csm.png",
        width: 1200,
        height: 630,
        alt: "CSM Personality Test for Couples – Cognitive Alignment Score",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Free CSM Personality Test for Couples",
    description: "Finally understand why you click (or clash). Get your Cognitive Alignment Score in minutes.",
    images: ["https://csmdynamics.com/csm.png"],
    creator: "@csmdynamics", // ← change this if you have a real handle
  },

  icons: {
    icon: ["/favicon.svg"], // ← array = Next.js picks the best one automatically
    apple: "/apple-touch-icon.png",
  },

  alternates: {
    canonical: "https://csmdynamics.com",
  },

  keywords:
    "personality test for couples, mbti for couples, relationship compatibility test, cognitive compatibility, love language alternative, attachment style test, marriage quiz, couple personality framework, free relationship test",

  authors: [{ name: "Rodrigo Faria" }],
  creator: "Rodrigo Faria",
  publisher: "Cognitive Spectrum Model",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SupabaseListener />
        {children}
      </body>
    </html>
  );
}
