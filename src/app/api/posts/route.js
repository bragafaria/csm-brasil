// @/app/api/posts/route.js
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createPost } from "@/app/lib/neon";
import { blogContentRateLimiter, getClientIp } from "@/app/lib/ratelimit";
import slugify from "slugify";

export async function POST(request) {
  try {
    // ✅ STEP 1: Check rate limit BEFORE processing
    // const headersList = await headers();
    // const ip = getClientIp(headersList);

    // const { success, reset, remaining } = await blogContentRateLimiter.limit(ip);

    // if (!success) {
    //   const resetDate = new Date(reset);
    //   const minutesUntilReset = Math.ceil((resetDate - Date.now()) / 60000);

    //   return NextResponse.json(
    //     {
    //       error: `Too many posts created. Please try again in ${minutesUntilReset} minute${minutesUntilReset !== 1 ? "s" : ""}.`,
    //       rateLimit: {
    //         limited: true,
    //         remaining: 0,
    //         reset: resetDate.toISOString(),
    //       },
    //     },
    //     { status: 429 }
    //   );
    // }

    // ✅ STEP 2: Parse request body
    const {
      title,
      slug: customSlug,
      content,
      excerpt = "",
      published = true,
      category_id,
      image_url = null,
    } = await request.json();

    // ✅ STEP 3: Validation
    if (!title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!category_id) {
      return NextResponse.json({ error: "Category is required" }, { status: 400 });
    }
    if (!content?.trim()) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const cleanTitle = title.replace(/["']/g, "");
    const finalSlug = (customSlug || slugify(cleanTitle, { lower: true, strict: true })).trim();

    // ✅ STEP 4: Create Post (now protected by rate limit)
    const post = await createPost({
      title: title.trim(),
      slug: finalSlug,
      content,
      excerpt: excerpt.trim(),
      published: Boolean(published),
      category_id: Number(category_id),
      image_url,
    });

    return NextResponse.json(
      {
        ...post,
        rateLimit: {
          remaining,
          reset: new Date(reset).toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/posts error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
