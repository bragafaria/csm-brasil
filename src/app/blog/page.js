// app/blog/page.js
import Link from "next/link";
import { getPostsWithCategory, getCategories, getPostsByCategorySlug } from "@/app/lib/neon";
import { format } from "date-fns";
import { Heart, Sparkles, Flame, HeartOff, Newspaper, HatGlasses } from "lucide-react";

export const revalidate = 86400;

export async function generateMetadata() {
  return {
    title: "CSM Blog - Expert Relationship & Wellness Advice 2025",
    description: "Science-backed CSM insights on love, heartbreak, self-growth, and wellness. Updated daily.",
    openGraph: {
      title: "CSM Insights",
      description: "Expert advice powered by CSM archetypes.",
      type: "website",
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Image fallback component – tiny, reusable, no extra deps          */
/* ------------------------------------------------------------------ */
function PostImage({ src, alt, className }) {
  if (!src) {
    return (
      <div
        className={`bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 border border-[var(--border)] flex items-center justify-center text-[var(--primary)]/40 ${className}`}
      >
        <Heart className="w-12 h-12" />
      </div>
    );
  }
  return <img src={src} alt={alt} className={`object-cover ${className}`} />;
}

/* ------------------------------------------------------------------ */
export default async function BlogHome() {
  const featured = await getPostsWithCategory({ published: true, limit: 1 });
  const categories = await getCategories();

  /* ---- category order ------------------------------------------------ */
  const categoryOrder = [
    "love-relationship",
    "self-wellness",
    "heartbreak-divorce",
    "sex-seduction",
    "entertainment-news",
    "expert-advice",
  ];

  const postsByCategoryUnsorted = await Promise.all(
    categories.map(async (cat) => {
      const posts = await getPostsByCategorySlug({
        slug: cat.slug,
        published: true,
        limit: 3,
      });
      return { ...cat, posts };
    })
  );

  const postsByCategory = postsByCategoryUnsorted.sort((a, b) => {
    const aIdx = categoryOrder.indexOf(a.slug);
    const bIdx = categoryOrder.indexOf(b.slug);
    return aIdx - bIdx;
  });

  /* ---- icons (still used for the section header) ------------------- */
  const categoryIcons = {
    "love-relationship": <Heart className="w-10 h-10 text-violet-400" />,
    "self-wellness": <Sparkles className="w-10 h-10 text-violet-400" />,
    "heartbreak-divorce": <HeartOff className="w-10 h-10 text-violet-400" />,
    "sex-seduction": <Flame className="w-10 h-10 text-violet-400" />,
    "entertainment-news": <Newspaper className="w-10 h-10 text-violet-400" />,
    "expert-advice": <HatGlasses className="w-10 h-10 text-violet-400" />,
  };

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--primary)] via-purple-900 to-[var(--accent)] py-20 px-6 text-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-5xl mx-auto my-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">The Blog of the Modern Self</h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Stories and expert perspectives on love, wellness & personal transformation.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--surface-variant)] to-transparent"></div>
      </section>

      {/* FEATURED POST */}
      {featured[0] && (
        <section id="featured" className="relative mt-16 max-w-7xl mx-auto px-6">
          <div className="card-gradient rounded-3xl p-1 shadow-2xl">
            <div className="bg-[var(--surface2)] rounded-3xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 bg-[var(--primary)]/20 text-violet-400 py-1 rounded-full text-xl font-bold w-fit mb-4">
                    <span>FEATURED</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 leading-tight">
                    <Link
                      href={`/blog/${featured[0].category_slug}/${featured[0].slug}`}
                      className="hover:text-[var(--accent)] transition"
                    >
                      {featured[0].title}
                    </Link>
                  </h2>
                  <p className="text-[var(--text-secondary)] mb-6 line-clamp-3 text-lg">{featured[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)] mb-6">
                    <span>{format(new Date(featured[0].published_at), "MMMM d, yyyy")}</span>
                    <span>•</span>
                    <span className="text-violet-400 font-medium">{featured[0].category_name}</span>
                  </div>
                  <Link
                    href={`/blog/${featured[0].category_slug}/${featured[0].slug}`}
                    className="inline-flex items-center gap-2 text-violet-400 font-bold hover:underline"
                  >
                    Read Full Article
                  </Link>
                </div>

                {/* FEATURED IMAGE */}
                <div className="md:w-1/2 relative aspect-[16/9] md:aspect-auto">
                  <PostImage
                    src={featured[0].image_url}
                    alt={featured[0].title}
                    className="absolute inset-0 w-full h-full object-cover rounded-r-3xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CATEGORIES GRID */}
      <section className="mt-24 max-w-7xl mx-auto px-6 space-y-20">
        {postsByCategory.map((cat) => {
          const Icon = categoryIcons[cat.slug] || <Heart className="w-10 h-10 text-[var(--primary)]" />;
          return (
            <div key={cat.id}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-[var(--text-primary)] flex items-center gap-3">
                  <span className="text-4xl">{Icon}</span>
                  {cat.name}
                </h2>
                <Link
                  href={`/blog/${cat.slug}`}
                  className="text-white hover:underline hover:text-[var(--accent)] font-medium flex items-center gap-1"
                >
                  View all <span aria-hidden="true">→</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cat.posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.category_slug}/${post.slug}`} className="group block">
                    <article className="card-gradient rounded-2xl p-1 h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                      <div className="bg-[var(--surface2)] rounded-2xl p-5 h-full flex flex-col">
                        {/* POST IMAGE (replaces icon) */}
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

                        <h3 className="font-bold text-lg text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--accent)] transition">
                          {post.title}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2 flex-grow">
                          {post.excerpt}
                        </p>
                        <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-auto">
                          <span>{format(new Date(post.published_at), "MMM d")}</span>
                          <span className="text-violet-400">{post.category_name}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* FINAL CTA */}
      <section className="mt-24 py-16 bg-gradient-to-r from-[var(--primary)] to-purple-800 rounded-3xl max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Relationships?</h3>
        <p className="text-white/90 mb-8 max-w-2xl mx-auto">
          In just 10 minutes, uncover your free, science-backed CSM profile and see how your unique patterns shape your
          relationships and personal growth.
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-[var(--primary)] font-bold px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          Learn More
        </Link>
      </section>
    </div>
  );
}
