//@/app/components/ui/Spinner.js

export default function Spinner({ children }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
      <span className="text-[var(--text-secondary)] text-sm font-medium">{children}</span>
    </div>
  );
}
