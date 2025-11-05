// src/app/blog/[category]/actions.js
"use server";

import { getPostsByCategorySlug } from "@/app/lib/neon";

export async function loadMorePosts(formData) {
  const slug = formData.get("slug");
  const offset = Number(formData.get("offset"));
  const limit = 6;

  return await getPostsByCategorySlug({ slug, limit, offset });
}
