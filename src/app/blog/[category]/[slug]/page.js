// app/blog/[category]/[slug]/page.js
import { db } from "@/lib/db";
import { articles } from "@/lib/schema";
import { compileMDX } from "next-mdx-remote/rsc";
import { and, eq } from "drizzle-orm"; // ← ADD THIS
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Optional: Custom components (YouTube, CTA button, etc.)
const components = {
  // Example: make CTA a button
  strong: (props) => {
    if (props.children?.includes?.("Unlock Your CSM Archetype")) {
      return (
        <a
          href="/assess"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
        >
          {props.children}
        </a>
      );
    }
    return <strong {...props} />;
  },
};

export async function generateMetadata({ params }) {
  const post = await getPost(params.category, params.slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
    },
  };
}

async function getPost(category, slug) {
  return await db
    .select()
    .from(articles)
    .where(and(eq(articles.category, category), eq(articles.slug, slug), eq(articles.status, "published")))
    .limit(1)
    .then((rows) => rows[0]);
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.category, params.slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    components,
  });

  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <p className="text-lg text-gray-600">{post.metaDescription}</p>
      </header>

      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />

      {/* Optional: Share buttons, related posts */}
    </article>
  );
}
