"use client";

import { useEffect, useState } from "react";
import { User, Heart, TrendingUp, Calendar, Award } from "lucide-react";

export default function PartnerAPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="mt-20 mx-8">
      {/* Hero Section */}
      <div className="hero-gradient rounded-2xl p-8 mb-8 shadow-custom-lg">
        <div className="flex items-center mb-4">
          <User className="text-white mr-4" size={32} />
          <div>
            <h1 className="text-3xl font-bold text-white">Partner A Report</h1>
            <p className="text-[var(--text-secondary)] text-lg">Individual progress and insights</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: "Communication Score", value: "8.7/10", icon: Heart, trend: "+0.3" },
          { title: "Sessions Attended", value: "12", icon: Calendar, trend: "+2" },
          { title: "Goals Achieved", value: "85%", icon: Award, trend: "+5%" },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="card-gradient rounded-xl p-6 shadow-custom hover:shadow-custom-lg transition-custom"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="text-[var(--accent)]" size={24} />
                <span className="text-green-400 text-sm font-medium">+{stat.trend}</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-1">{stat.value}</h3>
              <p className="text-[var(--text-secondary)] text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Detailed Report */}
      <div className="card-gradient rounded-xl p-8 shadow-custom">
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6 flex items-center">
          <TrendingUp className="mr-3 text-[var(--accent)]" size={24} />
          Progress Analysis
        </h2>

        <div className="space-y-6">
          <div className="p-6 bg-[var(--surface)] rounded-lg">
            <h3 className="font-medium text-[var(--text-primary)] mb-3">Strengths</h3>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3"></div>
                Excellent active listening skills demonstrated in recent sessions
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3"></div>
                Strong emotional regulation during conflict resolution exercises
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3"></div>
                Consistent engagement with homework assignments
              </li>
            </ul>
          </div>

          <div className="p-6 bg-[var(--surface)] rounded-lg">
            <h3 className="font-medium text-[var(--text-primary)] mb-3">Areas for Growth</h3>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3"></div>
                Practice expressing needs more directly during discussions
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3"></div>
                Work on maintaining eye contact during emotional conversations
              </li>
            </ul>
          </div>

          <div className="p-6 bg-[var(--surface)] rounded-lg">
            <h3 className="font-medium text-[var(--text-primary)] mb-3">Recommended Actions</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="w-4 h-4 text-[var(--primary)] rounded" />
                <span className="text-[var(--text-secondary)]">Complete communication style assessment</span>
              </div>
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="w-4 h-4 text-[var(--primary)] rounded" />
                <span className="text-[var(--text-secondary)]">Practice daily appreciation exercises</span>
              </div>
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="w-4 h-4 text-[var(--primary)] rounded" />
                <span className="text-[var(--text-secondary)]">Schedule individual reflection time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
