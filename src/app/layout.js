// app/layout.js
import "./globals.css";
import SupabaseListener from "@/app/lib/supabase/SupabaseListerner";

export const metadata = {
  title: "Free Personality Test – Unlock Your Couple’s Compatibility Report | CSM",

  description:
    "Take the free CSM personality test and discover how you and your partner truly think, decide, and connect. Then unlock your full Cognitive Alignment Score and personalized couple report.",

  metadataBase: new URL("https://csmdynamics.com"),

  openGraph: {
    title: "Free Personality Test – Unlock Your Couple’s Compatibility Report | CSM",
    description:
      "Understand your cognitive differences and turn them into your greatest strength. Built for couples who want deeper connection.",
    url: "https://csmdynamics.com",
    siteName: "CSM Dynamics",
    images: [
      {
        url: "/csm.png",
        width: 1200,
        height: 630,
        alt: "CSM – Free Personality Test → Full Couple Compatibility Report",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Free Personality Test → Full Couple Compatibility Report | CSM",
    description: "Stop guessing why you click or clash. Get your Cognitive Alignment Score in minutes.",
    images: ["/csm.png"],
    creator: "@csmdynamics",
  },

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
    },
  },

  icons: {
    icon: ["/favicon.ico"],
    shortcut: ["/favicon-32x32.png"],
    apple: ["/apple-touch-icon.png"],
  },

  verification: {
    google: "your-google-site-verification-code-here", // add when you verify
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
