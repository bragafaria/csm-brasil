// src/app/layout.js
"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import { supabase } from "./utils/supabaseClient"; // Adjust path

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth State Change:", event, session);
      // Remove setSession - Supabase handles session persistence
      // If you need to update app state (e.g., user context), do it here without setSession
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
