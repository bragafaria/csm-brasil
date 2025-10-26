import { supabase } from "@/utils/supabaseClient";
export default function DashboardHeader() {
  const handleLogout = () => {
    supabase.auth.signOut();
  };
  return (
    <nav className="fixed top-0 w-full bg-[var(--surface)]/80 backdrop-blur-md border-b border-[var(--primary)]/20 z-50">
      <div className="flex items-center justify-between px-4 py-3 h-full">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-bold text-primary bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
            CSM Dashboard
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="text-sm font-medium text-primary hover:underline hover:cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
          <div className="w-8 h-8 rounded-full primary-gradient flex items-center justify-center">
            <span className="text-sm font-medium text-white">V</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
