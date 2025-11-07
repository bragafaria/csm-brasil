// app/components/ConnectionsTitle.jsx
export default function ConnectionsTitle() {
  const archetypes = [
    "Architect",
    "Engineer",
    "Navigator",
    "Pioneer",
    "Curator",
    "Analyst",
    "Mediator",
    "Maverick",
    "Steward",
    "Artisan",
    "Campaigner",
    "Adventurer",
    "Counselor",
    "Healer",
    "Peacemaker",
    "Empath",
    "Strategist",
    "Inventor",
    "Disruptor",
    "Revolutionary",
    "Academic",
    "Theorist",
    "Innovator",
    "Visionary",
    "Ambassador",
    "Artist",
    "Catalyst",
    "Wanderer",
    "Mentor",
    "Sage",
    "Unifier",
    "Mystic",
  ];

  return (
    <div className="relative z-10 text-center">
      <h3 className="text-2xl md:text-4xl font-light tracking-widest text-gray-400 mb-4">
        CSM Dynamics<sup className="text-sm md:text-base align-super">&reg;</sup>
      </h3>
      <h1 className="text-4xl md:text-8xl font-bold text-white drop-shadow-2xl">32 ARCHETYPES</h1>
      <h3 className="text-xl font-light tracking-wider text-gray-400 mt-6 mb-10">
        A personalized cognitive blueprint with unparalleled depth and precision.
      </h3>

      {/* 32 Archetypes — Hidden on mobile, visible on md+ */}
      <div className="hidden md:block max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 px-4">
          {archetypes.map((name, i) => (
            <span
              key={i}
              className="text-xs md:text-sm font-medium text-gray-300 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
