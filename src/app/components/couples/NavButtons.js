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
      <div className="border-t border-[var(--border)] mt-8 pt-8 text-center text-[var(--text-secondary)]">
        <p>&copy; 2025 CSM Dynamics. Todos os direitos reservados.</p>
      </div>
    </div>
  );
}
