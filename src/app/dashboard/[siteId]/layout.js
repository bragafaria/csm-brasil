// src/app/dashboard/[siteId]/layout.js
"use client";

import { Inter } from "next/font/google";
import "../../../app/globals.css";
import DashboardLayout from "../../components/DashboardLayout";

const inter = Inter({ subsets: ["latin"] });

export default function DashLayout({ children, params }) {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardLayout params={params}>
        <div>{children}</div>
      </DashboardLayout>
    </div>
  );
}
