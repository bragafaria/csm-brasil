// app/dashboard/[userId]/coaching/sessions/page.js
"use client";

import { useEffect, useState } from "react";
import { BookOpen, Calendar, Clock, Users, Video, CircleCheck as CheckCircle } from "lucide-react";

export default function SessionsPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const sessions = [
    {
      id: 1,
      title: "Communication Fundamentals",
      date: "2024-01-15",
      time: "2:00 PM",
      duration: "60 min",
      status: "completed",
      type: "video",
    },
    {
      id: 2,
      title: "Conflict Resolution Workshop",
      date: "2024-01-22",
      time: "3:30 PM",
      duration: "90 min",
      status: "completed",
      type: "video",
    },
    {
      id: 3,
      title: "Emotional Intelligence Training",
      date: "2024-01-29",
      time: "2:00 PM",
      duration: "75 min",
      status: "scheduled",
      type: "video",
    },
    {
      id: 4,
      title: "Building Trust & Intimacy",
      date: "2024-02-05",
      time: "2:30 PM",
      duration: "60 min",
      status: "scheduled",
      type: "in-person",
    },
  ];

  return (
    <div
      className={`transition-all duration-700 ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } pt-16`}
    >
      {/* Hero Section */}
      <div className="hero-gradient rounded-2xl p-8 mb-8 shadow-custom-lg">
        <div className="flex items-center mb-4">
          <BookOpen className="text-white mr-4" size={32} />
          <div>
            <h1 className="text-3xl font-bold text-white">Coaching Sessions</h1>
            <p className="text-[var(--text-secondary)] text-lg">Manage your relationship coaching appointments</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Sessions", value: "15", icon: Calendar },
          { title: "Completed", value: "12", icon: CheckCircle },
          { title: "Upcoming", value: "3", icon: Clock },
          { title: "This Month", value: "4", icon: Users },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card-gradient rounded-xl p-6 shadow-custom">
              <div className="flex items-center justify-between mb-4">
                <Icon className="text-[var(--accent)]" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-1">{stat.value}</h3>
              <p className="text-[var(--text-secondary)] text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Sessions List */}
      <div className="card-gradient rounded-xl shadow-custom">
        <div className="p-6 border-b border-custom">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] flex items-center">
            <Calendar className="mr-3 text-[var(--accent)]" size={24} />
            Session Schedule
          </h2>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {sessions.map((session, index) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 bg-[var(--surface)] rounded-lg hover:bg-opacity-80 transition-custom"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-2 rounded-lg ${
                      session.status === "completed"
                        ? "bg-green-500 bg-opacity-20"
                        : "bg-[var(--primary)] bg-opacity-20"
                    }`}
                  >
                    {session.type === "video" ? (
                      <Video
                        className={`${session.status === "completed" ? "text-green-400" : "text-[var(--primary)]"}`}
                        size={20}
                      />
                    ) : (
                      <Users
                        className={`${session.status === "completed" ? "text-green-400" : "text-[var(--primary)]"}`}
                        size={20}
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-[var(--text-primary)]">{session.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-[var(--text-secondary)] mt-1">
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {new Date(session.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {session.time}
                      </span>
                      <span>({session.duration})</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      session.status === "completed"
                        ? "bg-green-500 bg-opacity-20 text-green-400"
                        : "bg-[var(--primary)] bg-opacity-20 text-[var(--primary)]"
                    }`}
                  >
                    {session.status === "completed" ? "Completed" : "Scheduled"}
                  </span>

                  {session.status === "scheduled" && (
                    <button className="px-4 py-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-lg transition-custom text-sm">
                      {session.type === "video" ? "Join Call" : "View Details"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <button className="px-6 py-3 primary-gradient text-white rounded-lg hover:opacity-90 transition-custom font-medium">
              Schedule New Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
