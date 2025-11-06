// app/blog/[category]/[slug]/page.js
import { notFound } from "next/navigation";
import { getPostsWithCategory } from "@/app/lib/neon";
import { format } from "date-fns";
import Link from "next/link";

export const revalidate = 86400;

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | CSM Blog - Expert Advice 2025`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.published_at,
    },
  };
}

async function getPostBySlug(slug) {
  const posts = await getPostsWithCategory({ published: true, limit: 1, slug });
  return posts[0] || null;
}

export default async function BlogPost({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mt-20 p-2 text-sm text-[var(--text-secondary)] mb-6">
        <Link href="/blog" className="hover:text-[var(--accent)]">
          Blog
        </Link>
        <span className="mx-2">›</span>
        <Link href={`/blog/${post.category_slug}`} className="hover:text-[var(--accent)]">
          {post.category_name}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-[var(--text-primary)]">{post.title}</span>
      </nav>

      {/* Post */}
      <header className="my-20">
        <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
          <time>{format(new Date(post.published_at), "MMMM d, yyyy")}</time>
          <span>•</span>
          <span className="text-[var(--accent)]">{post.category_name}</span>
        </div>
      </header>

      {/* Content */}
      <div
        className="prose pl-4 pr-2 prose-lg max-w-none 
             prose-p:text-white 
             prose-li:text-white 
             prose-blockquote:text-white 
             prose-code:text-white 
             prose-pre:bg-[var(--surface2)] prose-pre:text-white 
             prose-a:text-purple-600 prose-a:hover:text-purple-400 prose-a:underline 
             prose-img:rounded-lg prose-img:shadow-md 
             prose-headings:text-white prose-headings:font-bold 
             prose-strong:text-white prose-em:text-white prose-u:text-white 
             prose-iframe:w-full prose-iframe:h-auto 
             prose-figure:flex prose-figure:justify-center 
             prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:text-[var(--text-secondary)]"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* CTA */}
      <div className="mt-16 p-8 bg-gradient-to-r from-[var(--accent)] to-blue-600 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to Apply CSM to Your Life?</h3>
        <Link
          href="/assessment"
          className="inline-block bg-white text-[var(--accent)] font-bold px-8 py-3 rounded-full hover:shadow-lg transition"
        >
          Take Free CSM Assessment
        </Link>
      </div>

      {/* Schema (Article) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.published_at,
            author: {
              "@type": "Organization",
              name: "CSM Dynamics",
            },
          }),
        }}
      />
    </article>
  );
}
