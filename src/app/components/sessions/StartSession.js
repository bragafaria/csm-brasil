// app/components/sessions/StartSession.js
export default function StartSession({ setShowContent }) {
  return (
    <div className="flex flex-col justify-center items-center h-[300px] md:h-[400px] text-center">
      <p className="text-[var(--text-secondary)] mb-6 text-lg md:text-xl">
        Ready to start a new reflection session? Click below to begin.
      </p>
      <button
        className="px-6 py-3 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-custom font-medium shadow-custom hover:cursor-pointer"
        onClick={() => setShowContent("write")}
      >
        Start New Session
      </button>
    </div>
  );
}
