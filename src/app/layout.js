// src/app/layout.js
"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth State Change:", event, session);
      if (session) {
        await supabase.auth.setSession({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
        });
      }
    });
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
