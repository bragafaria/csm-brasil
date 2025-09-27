"use client";

import { useEffect, useState } from "react";
import { Lightbulb, Heart, MessageCircle, Clock, Bookmark, TrendingUp } from "lucide-react";

export default function TipsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const tips = [
    {
      id: 1,
      title: "The Power of Daily Appreciation",
      category: "communication",
      readTime: "3 min",
      excerpt: "Learn how expressing gratitude daily can transform your relationship dynamics...",
      icon: Heart,
      color: "text-pink-400",
    },
    {
      id: 2,
      title: "Active Listening Techniques That Work",
      category: "communication",
      readTime: "5 min",
      excerpt: "Master the art of truly hearing your partner with these proven strategies...",
      icon: MessageCircle,
      color: "text-blue-400",
    },
    {
      id: 3,
      title: "Creating Quality Time in Busy Schedules",
      category: "connection",
      readTime: "4 min",
      excerpt: "Practical ways to prioritize your relationship even with hectic lifestyles...",
      icon: Clock,
      color: "text-green-400",
    },
    {
      id: 4,
      title: "Building Financial Harmony Together",
      category: "planning",
      readTime: "6 min",
      excerpt: "Navigate money conversations with confidence and create shared financial goals...",
      icon: TrendingUp,
      color: "text-yellow-400",
    },
    {
      id: 5,
      title: "Conflict Resolution: From Fight to Flow",
      category: "communication",
      readTime: "4 min",
      excerpt: "Transform disagreements into opportunities for deeper understanding...",
      icon: MessageCircle,
      color: "text-purple-400",
    },
    {
      id: 6,
      title: "Maintaining Individual Identity in Partnership",
      category: "connection",
      readTime: "5 min",
      excerpt: "Balance togetherness with personal growth and individual interests...",
      icon: Heart,
      color: "text-indigo-400",
    },
  ];

  const categories = [
    { id: "all", label: "All Tips", count: tips.length },
    {
      id: "communication",
      label: "Communication",
      count: tips.filter((tip) => tip.category === "communication").length,
    },
    { id: "connection", label: "Connection", count: tips.filter((tip) => tip.category === "connection").length },
    { id: "planning", label: "Planning", count: tips.filter((tip) => tip.category === "planning").length },
  ];

  const filteredTips = selectedCategory === "all" ? tips : tips.filter((tip) => tip.category === selectedCategory);

  return (
    <div
      className={`transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      {/* Hero Section */}
      <div className="hero-gradient rounded-2xl p-8 mb-8 shadow-custom-lg">
        <div className="flex items-center mb-4">
          <Lightbulb className="text-white mr-4" size={32} />
          <div>
            <h1 className="text-3xl font-bold text-white">Relationship Tips</h1>
            <p className="text-[var(--text-secondary)] text-lg">Expert insights to strengthen your partnership</p>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg transition-custom ${
              selectedCategory === category.id
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--surface-variant)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]"
            }`}
          >
            {category.label} ({category.count})
          </button>
        ))}
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <div
              key={tip.id}
              className="card-gradient rounded-xl p-6 shadow-custom hover:shadow-custom-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-[var(--surface)] rounded-lg">
                  <Icon className={tip.color} size={24} />
                </div>
                <button className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-custom">
                  <Bookmark size={18} />
                </button>
              </div>

              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 leading-tight">{tip.title}</h3>

              <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">{tip.excerpt}</p>

              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium bg-[var(--surface)] ${tip.color}`}>
                  {tip.category}
                </span>
                <span className="text-[var(--text-secondary)] text-xs flex items-center">
                  <Clock size={12} className="mr-1" />
                  {tip.readTime}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More */}
      <div className="mt-12 text-center">
        <button className="px-8 py-3 primary-gradient text-white rounded-lg hover:opacity-90 transition-custom font-medium">
          Load More Tips
        </button>
      </div>
    </div>
  );
}
