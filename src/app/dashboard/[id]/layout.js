// src/app/layout.js
"use client";
import { Inter } from "next/font/google";
import "../../../app/globals.css";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import DashboardHeader from "../../components/DashboardHeader";
import DashboardLayout from "@/app/components/DashboardLayout";
import { set } from "zod";

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
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <DashboardLayout>
            <div>{children}</div>
          </DashboardLayout>
        </div>
      </body>
    </html>
  );
}
