// src/app/blog/[category]/page.js
import { notFound } from "next/navigation";
import { getCategoryBySlug, getPostsByCategorySlug } from "@/app/lib/neon";
import LoadMoreClient from "./LoadMoreClient";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const POSTS_PER_PAGE = 6;

// export const revalidate = 86400;

export async function generateMetadata({ params }) {
  const { category } = await params; // AWAIT
  const cat = await getCategoryBySlug(category);
  if (!cat) return { title: "Category Not Found" };

  return {
    title: `${cat.name} | CSM Blog 2025`,
    description: `Latest articles on ${cat.name.toLowerCase()}.`,
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params; // AWAIT
  const cat = await getCategoryBySlug(category);
  if (!cat) notFound();

  const initialPosts = await getPostsByCategorySlug({
    slug: category, // use raw slug
    limit: POSTS_PER_PAGE,
    offset: 0,
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* BREADCRUMB & BACK BUTTON */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Link href="/" className="hover:text-[var(--accent)] transition">
              Home
            </Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-[var(--accent)] transition">
              Blog
            </Link>
            <span>›</span>
            <span className="text-[var(--text-primary)] font-medium">{cat.name}</span>
          </nav>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 mt-4 text-violet-400 hover:text-violet-500 font-medium transition"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Blog
          </Link>
        </div>

        {/* Category Title */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]">{cat.name}</h1>
        </div>

        <LoadMoreClient slug={category} initialPosts={initialPosts} />
      </div>
    </div>
  );
}
