// app/dashboard/[userId]/coaching/sessions/page.js
"use client";

import { useEffect, useState } from "react";
import { BookOpen, Calendar, SquarePen, UserStar, List, Target } from "lucide-react";
import CoachProfile from "@/app/components/sessions/CoachProfile";
import StartSession from "@/app/components/sessions/StartSession";
import ViewSessions from "@/app/components/sessions/ViewSessions";
import WriteSession from "@/app/components/sessions/WriteSession";
import { handleClientScriptLoad } from "next/script";

export default function SessionsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState("start");

  const handleContentChange = (content) => {
    setShowContent(content);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className={`transition-all duration-700 ${
        isLoaded
          ? "bg-[var(--surface-v-secondary)] p-6 rounded-xl shadow-lg  flex flex-col space-y-6"
          : "opacity-0 translate-y-4"
      } p-16`}
    >
      {/* Hero Section */}
      <div className="hero-gradient rounded-2xl p-8 mb-8 shadow-custom-lg">
        <div className="flex items-center mb-4">
          <BookOpen className="text-white mr-4" size={32} />
          <div>
            <h1 className="text-3xl font-bold text-white">Life Coaching Sessions</h1>
            <p className="text-[var(--text-secondary)] text-lg">Manage your relationship coaching appointments</p>
          </div>
        </div>
      </div>

      {/* Submenu List */}
      <div className="card-gradient rounded-xl shadow-custom">
        <div className="flex items-center p-6 gap-6">
          <button className="flex items-center hover:cursor-pointer" onClick={() => setShowContent("start")}>
            <Target className="mr-2 text-[var(--accent)]" size={24} />
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Start Session</h2>
          </button>

          <button className="flex items-center hover:cursor-pointer" onClick={() => setShowContent("write")}>
            <SquarePen className="mr-2 text-[var(--accent)]" size={24} />
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Write a Question</h2>
          </button>

          <button className="flex items-center hover:cursor-pointer" onClick={() => setShowContent("view")}>
            <List className="mr-2 text-[var(--accent)]" size={24} />
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">View Sessions</h2>
          </button>

          <button className="flex items-center hover:cursor-pointer" onClick={() => setShowContent("coach")}>
            <UserStar className="mr-2 text-[var(--accent)]" size={24} />
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Coach</h2>
          </button>
        </div>

        <div className="p-6">
          {showContent === "start" && <StartSession setShowContent={setShowContent} />}
          {showContent === "write" && <WriteSession />}
          {showContent === "view" && <ViewSessions />}
          {showContent === "coach" && <CoachProfile />}
        </div>
      </div>
    </div>
  );
}
