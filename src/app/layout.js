// app/layout.js
import "./globals.css";
import SupabaseListener from "@/app/lib/supabase/SupabaseListerner";

export const metadata = {
  title: "Personality Assessment for Couples | CSM Dynamics",
  description:
    "Take a free 10-minute personality test to unlock your Cognitive Alignment Score, understand thinking differences, and build deeper connection & intimacy fast.",

  metadataBase: new URL("https://csmdynamics.com"),

  // === Open Graph (Facebook, LinkedIn, WhatsApp, iMessage, etc.) ===
  openGraph: {
    title: "Personality Assessment for Couples | CSM Dynamics",
    description:
      "Take a free 10-minute personality test to unlock your Cognitive Alignment Score, understand thinking differences, and build deeper connection & intimacy fast.",
    url: "https://csmdynamics.com",
    siteName: "CSM Dynamics",
    images: [
      {
        url: "https://csmdynamics.com/csm.png", // absolute URL (best practice)
        width: 1200,
        height: 630,
        alt: "Cognitive Alignment Score™ – Free Personality Test for Couples",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // === Twitter / X ===
  twitter: {
    card: "summary_large_image",
    title: "Personality Assessment for Couples – Cognitive Alignment Score™",
    description:
      "Take a free 10-minute personality test to unlock your Cognitive Alignment Score, understand thinking differences, and build deeper connection & intimacy fast.",
    images: ["https://csmdynamics.com/csm.png"], // absolute URL
    creator: "@csmdynamics",
    site: "@csmdynamics",
  },

  // === Canonical & Robots ===
  alternates: {
    canonical: "https://csmdynamics.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // === Icons ===
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },

  // === Google verification (add your code later) ===
  verification: {
    google: "your-google-site-verification-code-here",
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
