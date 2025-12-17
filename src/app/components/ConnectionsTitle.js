// app/components/ConnectionsTitle.jsx

export default function ConnectionsTitle() {
  // const archetypes = [
  //   "Architect",
  //   "Engineer",
  //   "Navigator",
  //   "Pioneer",
  //   "Curator",
  //   "Analyst",
  //   "Mediator",
  //   "Maverick",
  //   "Steward",
  //   "Artisan",
  //   "Campaigner",
  //   "Adventurer",
  //   "Counselor",
  //   "Healer",
  //   "Peacemaker",
  //   "Empath",
  //   "Strategist",
  //   "Inventor",
  //   "Disruptor",
  //   "Revolutionary",
  //   "Academic",
  //   "Theorist",
  //   "Innovator",
  //   "Visionary",
  //   "Ambassador",
  //   "Artist",
  //   "Catalyst",
  //   "Wanderer",
  //   "Mentor",
  //   "Sage",
  //   "Unifier",
  //   "Mystic",
  // ];

  return (
    <div className="relative z-10 text-center">
      <div className="flex items-center justify-center gap-1 mb-10">
        <img src="/logo_transparent.png" alt="CSM Dynamics Logo" className="h-8 md:h-10 w-auto" />
        <h3 className="text-2xl md:text-4xl font-bold ml-2 tracking-widest text-[var(--primary)]">CSM</h3>
        <h3 className="text-2xl md:text-4xl font-base tracking-widest text-gray-400">
          Dynamics
          <sup className="text-sm md:text-base align-super">&reg;</sup>
        </h3>
      </div>
      <h1 className="text-4xl md:text-8xl font-bold text-white drop-shadow-2xl">32 ARQUÉTIPOS</h1>
      <h3 className="text-xl px-2 font-light tracking-wider text-gray-400 mt-6 mb-10">
        Um blueprint cognitivo personalizado com profundidade e precisão incomparáveis.
      </h3>

      {/* 32 Archetypes — Hidden on mobile, visible on md+ */}
      <div className="hidden md:block max-w-5xl mx-auto">
        {/* <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 px-4">
          {archetypes.map((name, i) => (
            <span
              key={i}
              className="text-xs md:text-sm font-medium text-gray-300 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div> */}
      </div>
    </div>
  );
}
