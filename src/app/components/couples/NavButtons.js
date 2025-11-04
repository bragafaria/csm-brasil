// app/components/couples/NavButtons.js
import Link from "next/link";

const SECTIONS = [
  { id: "connect", label: "How You Connect", icon: "Heart" },
  { id: "challenges", label: "Your 10 Life Challenges", icon: "Home" },
  { id: "analytics", label: "Analytics", icon: "Sparkles" },
];

export default function NavButtons({ current, siteId }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-12">
      {SECTIONS.map((s) => {
        const path =
          s.id === "connect"
            ? `/dashboard/${siteId}/couples-report/how-you-connect`
            : s.id === "challenges"
            ? `/dashboard/${siteId}/couples-report/your-10-life-challenges`
            : `/dashboard/${siteId}/couples-report/analytics`;

        return (
          <Link
            key={s.id}
            href={path}
            className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
              current === s.id
                ? "bg-[var(--primary)] text-white shadow-md"
                : "bg-[var(--surface-variant)] text-[var(--text-secondary)] hover:bg-[var(--surface-variant-hover)]"
            }`}
          >
            <span className="text-lg">{s.icon}</span>
            <span>{s.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
