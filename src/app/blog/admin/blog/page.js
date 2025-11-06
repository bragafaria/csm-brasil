// app/blog/admin/blog/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BlogEditor from "@/app/components/BlogEditor/BlogEditor";
import slugify from "slugify";

export default function AdminBlog() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [published, setPublished] = useState(false);
  const [imageUrl, setImageUrl] = useState(""); // <-- NEW
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => alert("Could not load categories"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const body = {
      title,
      slug: slug || slugify(title, { lower: true }),
      content,
      excerpt,
      published,
      category_id: categoryId,
      image_url: imageUrl, // <-- NEW
    };
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to create post");

      router.push("/admin/blog"); // <-- change to your list page
    } catch (err) {
      console.error(err);
      alert("Error saving post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TITLE */}
        <div>
          <label className="block font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSlug(slugify(e.target.value, { lower: true }));
            }}
            className="w-full p-3 border rounded-lg bg-[var(--surface2)] text-white placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
            required
          />
        </div>

        {/* SLUG */}
        <div>
          <label className="block font-medium mb-2">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-3 border rounded-lg bg-[var(--surface2)] text-white placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
            placeholder="auto-generated"
          />
        </div>

        {/* IMAGE URL */}
        <div>
          <label className="block font-medium mb-2">Featured Image URL</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-3 border rounded-lg bg-[var(--surface2)] text-white placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* EXCERPT */}
        <div>
          <label className="block font-medium mb-2">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full p-3 border rounded-lg bg-[var(--surface2)] text-white placeholder-[var(--text-secondary)] h-24 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
            placeholder="Short SEO summary..."
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block font-medium mb-2">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full p-3 border rounded-lg bg-[var(--surface2)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
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
          <label className="block font-medium mb-2">Content</label>
          <BlogEditor content={content} onChange={setContent} />
        </div>

        {/* PUBLISH */}
        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
            <span className="ml-2">Publish immediately</span>
          </label>
        </div>

        <button type="submit" disabled={loading} className="btn-primary px-8 py-3 text-lg">
          {loading ? "Saving..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
