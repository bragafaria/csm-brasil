// app/blog/layout.js
import Link from "next/link";
import { getCategories } from "@/app/lib/neon";

export default async function BlogLayout({ children }) {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      {/* Header */}
      <header className="sticky top-0 z-50 header-gradient shadow-lg backdrop-blur-sm border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="text-3xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent"
          >
            CSM Blog
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/blog/${cat.slug}`}
                className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--accent)] after:transition-all hover:after:w-full"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
          <Link href="/admin/blog" className="btn-primary text-sm px-5 py-2.5 rounded-full">
            Admin
          </Link>
        </div>
      </header>

      <main>{children}</main>

      <footer className="bg-[var(--surface-variant)] border-t border-[var(--border)] py-12 mt-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[var(--text-secondary)]">
            © 2025 CSM Dynamics. Expert relationship & wellness advice powered by science.
          </p>
        </div>
      </footer>
    </div>
  );
}
