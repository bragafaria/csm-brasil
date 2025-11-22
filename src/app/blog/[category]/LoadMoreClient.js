// src/app/blog/[category]/LoadMoreClient.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Heart } from "lucide-react";
import Spinner from "@/app/components/ui/Spinner.js";

export default function LoadMoreClient({ slug, initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const [offset, setOffset] = useState(initialPosts.length);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("slug", slug);
    formData.append("offset", offset);

    try {
      const { loadMorePosts } = await import("./actions.js");
      const newPosts = await loadMorePosts(formData);

      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
        setOffset((prev) => prev + newPosts.length);
      }
    } catch (err) {
      console.error("Load more failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.category_slug}/${post.slug}`} className="group block">
            <article className="card-gradient rounded-2xl p-1 h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
              <div className="bg-[var(--surface2)] rounded-2xl p-6 h-full flex flex-col">
                {/* POST IMAGE - FIXED */}
                <div className="rounded-xl w-full aspect-[16/9] mb-4 overflow-hidden border border-[var(--border)]">
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 flex items-center justify-center">
                      <Heart className="w-12 h-12 text-[var(--primary)]/40" />
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-xl text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--accent)] transition">
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-auto">
                  <time>{format(new Date(post.published_at), "MMM d, yyyy")}</time>
                  <span className="text-violet-400">{post.category_name}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-12 text-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="inline-block bg-[var(--primary)] text-white font-bold px-8 py-3 rounded-full hover:bg-[var(--primary-dark)] transition disabled:opacity-50"
          >
            {isLoading ? <Spinner>Fetching...</Spinner> : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}
