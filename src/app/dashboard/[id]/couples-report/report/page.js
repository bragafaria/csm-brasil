"use client";

import { useEffect, useState } from "react";
import { Users, Heart, TrendingUp, Target, Star, Calendar } from "lucide-react";

export default function CouplesReportPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className={`transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      {/* Hero Section */}
      <div className="hero-gradient rounded-2xl p-8 mb-8 shadow-custom-lg">
        <div className="flex items-center mb-4">
          <Users className="text-white mr-4" size={32} />
          <div>
            <h1 className="text-3xl font-bold text-white">{`Couple's Progress Report`}</h1>
            <p className="text-[var(--text-secondary)] text-lg">Joint relationship assessment and milestones</p>
          </div>
        </div>
      </div>

      {/* Relationship Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Relationship Score", value: "8.9/10", icon: Heart, color: "text-pink-400" },
          { title: "Joint Sessions", value: "15", icon: Calendar, color: "text-blue-400" },
          { title: "Milestones Reached", value: "12/15", icon: Target, color: "text-green-400" },
          { title: "Satisfaction Rating", value: "4.8/5", icon: Star, color: "text-yellow-400" },
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className="card-gradient rounded-xl p-6 shadow-custom hover:shadow-custom-lg transition-custom"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`${metric.color}`} size={24} />
                <div className="text-green-400 text-sm">↑</div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-1">{metric.value}</h3>
              <p className="text-[var(--text-secondary)] text-sm">{metric.title}</p>
            </div>
          );
        })}
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Communication Patterns */}
        <div className="card-gradient rounded-xl p-6 shadow-custom">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6 flex items-center">
            <TrendingUp className="mr-3 text-[var(--accent)]" size={24} />
            Communication Patterns
          </h2>

          <div className="space-y-4">
            {[
              { skill: "Active Listening", score: 92, color: "bg-green-500" },
              { skill: "Conflict Resolution", score: 78, color: "bg-yellow-500" },
              { skill: "Emotional Expression", score: 85, color: "bg-blue-500" },
              { skill: "Compromise Skills", score: 88, color: "bg-purple-500" },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-primary)] text-sm font-medium">{item.skill}</span>
                  <span className="text-[var(--accent)]">{item.score}%</span>
                </div>
                <div className="w-full bg-[var(--surface)] rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: isLoaded ? `${item.score}%` : "0%" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Relationship Goals */}
        <div className="card-gradient rounded-xl p-6 shadow-custom">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6 flex items-center">
            <Target className="mr-3 text-[var(--accent)]" size={24} />
            Relationship Goals
          </h2>

          <div className="space-y-4">
            {[
              { goal: "Weekly Date Nights", status: "completed", progress: 100 },
              { goal: "Monthly Check-ins", status: "in-progress", progress: 80 },
              { goal: "Shared Hobby Discovery", status: "in-progress", progress: 60 },
              { goal: "Conflict Resolution Plan", status: "completed", progress: 100 },
              { goal: "Future Planning Session", status: "pending", progress: 25 },
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-[var(--surface)] rounded-lg">
                <div
                  className={`w-3 h-3 rounded-full ${
                    item.status === "completed"
                      ? "bg-green-400"
                      : item.status === "in-progress"
                      ? "bg-yellow-400"
                      : "bg-gray-400"
                  }`}
                ></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[var(--text-primary)] text-sm font-medium">{item.goal}</span>
                    <span className="text-[var(--text-secondary)] text-xs capitalize">{item.status}</span>
                  </div>
                  <div className="w-full bg-[var(--border)] rounded-full h-1">
                    <div
                      className={`h-1 rounded-full transition-all duration-1000 ease-out ${
                        item.status === "completed"
                          ? "bg-green-400"
                          : item.status === "in-progress"
                          ? "bg-yellow-400"
                          : "bg-gray-400"
                      }`}
                      style={{ width: isLoaded ? `${item.progress}%` : "0%" }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="card-gradient rounded-xl p-8 shadow-custom">
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6 flex items-center">
          <Star className="mr-3 text-[var(--accent)]" size={24} />
          Personalized Recommendations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-[var(--text-primary)] text-lg">Continue Strengths</h3>
            <div className="space-y-3">
              {[
                "Your communication has improved significantly",
                "Joint problem-solving skills are excellent",
                "Emotional support patterns are very positive",
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <span className="text-[var(--text-secondary)] text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-[var(--text-primary)] text-lg">Focus Areas</h3>
            <div className="space-y-3">
              {[
                "Practice more structured conflict resolution",
                "Increase frequency of appreciation expressions",
                "Develop shared future planning rituals",
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-[var(--text-secondary)] text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
