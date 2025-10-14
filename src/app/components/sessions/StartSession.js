export default function StartSession({ setShowContent }) {
  return (
    <div className="mt-6 flex justify-center items-center h-[400px] ">
      <div>
        <button
          className="px-6 py-3 bg-[var(--primary)] hover:cursor-pointer text-white rounded-lg hover:opacity-90 transition-custom font-medium"
          onClick={() => setShowContent("write")}
        >
          Start New Session
        </button>
      </div>
    </div>
  );
}
