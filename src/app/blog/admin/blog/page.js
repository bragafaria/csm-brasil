// @/app/blog/admin/blog/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";
import BlogEditor from "@/app/components/BlogEditor/BlogEditor";
import slugify from "slugify";

export default function AdminBlog() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [published, setPublished] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [rateLimitInfo, setRateLimitInfo] = useState(null);
  const router = useRouter();

  // Authentication check on mount
  useEffect(() => {
    async function verifyBloggerAccess() {
      try {
        setIsCheckingAuth(true);

        // Check for active session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Session check error:", sessionError.message);
          router.push("/blog/admin/login");
          return;
        }

        if (!session) {
          console.log("No active session found");
          router.push("/blog/admin/login");
          return;
        }

        const userId = session.user.id;

        // Fetch user profile and verify blogger status
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("id, user_type, name, email")
          .eq("id", userId)
          .maybeSingle();

        if (userError || !userData) {
          console.error("User fetch error:", userError?.message || "No user found");
          await supabase.auth.signOut();
          router.push("/blog/admin/login");
          return;
        }

        // Verify user is a blogger
        if (userData.user_type !== "blogger") {
          console.log("Access denied - user is not a blogger:", {
            userId,
            userType: userData.user_type,
          });
          await supabase.auth.signOut();
          router.push("/blog/admin/login");
          return;
        }

        // User is authenticated and is a blogger
        console.log("Blogger authenticated:", {
          name: userData.name,
          email: userData.email,
        });

        setCurrentUser(userData);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Unexpected error in verifyBloggerAccess:", err.message);
        router.push("/blog/admin/login");
      } finally {
        setIsCheckingAuth(false);
      }
    }

    verifyBloggerAccess();
  }, [router]);

  // Load categories after authentication
  useEffect(() => {
    if (isAuthenticated) {
      fetch("/api/categories")
        .then((r) => r.json())
        .then(setCategories)
        .catch(() => alert("Could not load categories"));
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("supabase.auth.token");
      router.push("/blog/admin/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRateLimitInfo(null);

    const body = {
      title,
      slug: slug || slugify(title, { lower: true }),
      content,
      excerpt,
      published,
      category_id: categoryId,
      image_url: imageUrl,
    };

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      // ✅ Handle rate limit error
      // if (res.status === 429) {
      //   setRateLimitInfo(data.rateLimit);
      //   alert(data.error);
      //   setLoading(false);
      //   return;
      // }

      // if (!res.ok) throw new Error("Failed to create post");
      // if (data.rateLimit) {
      //   setRateLimitInfo(data.rateLimit);
      // }

      alert("Post created successfully!");

      // Reset form
      setTitle("");
      setSlug("");
      setContent("");
      setExcerpt("");
      setCategoryId("");
      setPublished(false);
      setImageUrl("");
    } catch (err) {
      console.error(err);
      alert("Error saving post");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto mb-4"></div>
          <p className="text-[var(--text-primary)]">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Only render the admin interface if authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      {/* Header with user info and logout */}
      <div className="bg-[var(--surface-variant)] border-b border-[var(--border)] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <h1 className="text-xl font-bold text-white">Blog Admin</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-[var(--text-primary)] font-medium">{currentUser?.name}</p>
              <p className="text-xs text-[var(--text-secondary)]">{currentUser?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-white mb-8">Create New Blog Post</h2>
        {/* ✅ NEW: Show rate limit info */}
        {rateLimitInfo && !rateLimitInfo.limited && (
          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-blue-400 text-sm">
              Posts remaining this hour: <span className="font-bold">{rateLimitInfo.remaining}</span>
            </p>
          </div>
        )}

        {rateLimitInfo?.limited && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm font-medium">
              Rate limit reached. Please wait before creating more posts.
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TITLE */}
          <div>
            <label className="block font-medium mb-2 text-[var(--text-primary)]">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setSlug(slugify(e.target.value, { lower: true }));
              }}
              className="w-full p-3 border rounded-lg bg-[var(--surface-variant)] border-[var(--border)] text-white placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
              required
            />
          </div>

          {/* SLUG */}
          <div>
            <label className="block font-medium mb-2 text-[var(--text-primary)]">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full p-3 border rounded-lg bg-[var(--surface-variant)] border-[var(--border)] text-white placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
              placeholder="auto-generated"
            />
          </div>

          {/* IMAGE URL */}
          <div>
            <label className="block font-medium mb-2 text-[var(--text-primary)]">Featured Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-3 border rounded-lg bg-[var(--surface-variant)] border-[var(--border)] text-white placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* EXCERPT */}
          <div>
            <label className="block font-medium mb-2 text-[var(--text-primary)]">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full p-3 border rounded-lg bg-[var(--surface-variant)] border-[var(--border)] text-white placeholder-[var(--text-secondary)] h-24 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
              placeholder="Short SEO summary..."
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block font-medium mb-2 text-[var(--text-primary)]">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full p-3 border rounded-lg bg-[var(--surface-variant)] border-[var(--border)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* CONTENT */}
          <div>
            <label className="block font-medium mb-2 text-[var(--text-primary)]">Content</label>
            <BlogEditor content={content} onChange={setContent} />
          </div>

          {/* PUBLISH */}
          <div className="flex items-center gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 rounded border-[var(--border)] bg-[var(--surface-variant)] text-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/30"
              />
              <span className="ml-2 text-[var(--text-primary)]">Publish immediately</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || rateLimitInfo?.limited}
            className="btn-primary px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Post..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
