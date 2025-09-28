// src/app/dashboard/[userId]/layout.js
"use client";
import { Inter } from "next/font/google";
import "../../../app/globals.css";
import DashboardLayout from "../../components/DashboardLayout"; // Adjust path if needed

const inter = Inter({ subsets: ["latin"] });

export default function DashLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardLayout>
        <div>{children}</div>
      </DashboardLayout>
    </div>
  );
}
