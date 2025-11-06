// @/app/api/posts/route.js
import { NextResponse } from "next/server";
import { createPost } from "@/app/lib/neon";
import slugify from "slugify";

export async function POST(request) {
  try {
    const {
      title,
      slug: customSlug,
      content,
      excerpt = "",
      published = false,
      category_id,
      image_url = null,
    } = await request.json();

    // === Validation ===
    if (!title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!category_id) {
      return NextResponse.json({ error: "Category is required" }, { status: 400 });
    }
    if (!content?.trim()) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const finalSlug = (customSlug || slugify(title, { lower: true })).trim();

    // === Create Post via neon.js ===
    const post = await createPost({
      title: title.trim(),
      slug: finalSlug,
      content,
      excerpt: excerpt.trim(),
      published: Boolean(published),
      category_id: Number(category_id),
      image_url,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("POST /api/posts error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
