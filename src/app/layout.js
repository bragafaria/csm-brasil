// app/layout.js
import "./globals.css";
import SupabaseListener from "@/app/lib/supabase/SupabaseListerner";

export const metadata = {
  title: "Couples Personality Test | CSM Dynamics",
  description:
    "Discover your unique CSM cognitive profile — a modern personality system designed specifically for couples. Understand each other more clearly and strengthen your relationship today.",

  metadataBase: new URL("https://csmdynamics.com"), // ← THIS IS CRUCIAL – fixes og:url auto-generation

  openGraph: {
    title: "Couples Personality Test | CSM Dynamics",
    description:
      "Discover how you and your partner think, communicate, and connect. A modern cognitive assessment built to reveal your true compatibility.",
    url: "https://csmdynamics.com", // ← will be overridden per-page automatically
    siteName: "Cognitive Spectrum Model", // ← this fixes the "og:site_name Not Provided"
    images: [
      {
        url: "/csm.png", // ← simplified to relative (metadataBase makes it full: https://csmdynamics.com/csm.png)
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
    images: ["/csm.png"], // ← relative works now thanks to metadataBase
    creator: "@csmdynamics",
  },

  alternates: {
    canonical: "https://csmdynamics.com",
  },

  icons: {
    icon: ["/favicon.svg"],
    apple: "/apple-touch-icon.png",
  },
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
