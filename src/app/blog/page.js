// app/blog/page.js
import Link from "next/link";
import { getPostsWithCategory, getCategories } from "@/app/lib/neon";
import { format } from "date-fns";

export const revalidate = 86400;

export async function generateMetadata() {
  return {
    title: "CSM Blog - Expert Relationship & Wellness Advice 2025",
    description: "Science-backed CSM insights on love, heartbreak, self-growth, and wellness. Updated daily.",
    openGraph: {
      title: "CSM Blog",
      description: "Expert advice powered by CSM archetypes.",
      type: "website",
    },
  };
}

export default async function BlogHome() {
  const featured = await getPostsWithCategory({ published: true, limit: 1 });
  const categories = await getCategories();

  const postsByCategory = await Promise.all(
    categories.map(async (cat) => {
      const posts = await getPostsWithCategory({ published: true, limit: 6 });
      return { ...cat, posts: posts.slice(0, 3) };
    })
  );

  const categoryIcons = {
    "love-relationship": "Heart",
    "self-wellness": "Sparkles",
    "heartbreak-divorce": "BrokenHeart",
    "sex-seduction": "Flame",
    "entertainment-news": "ClapperBoard",
    "expert-advice": "GraduationCap",
  };

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--primary)] via-purple-900 to-[var(--accent)] py-20 px-6 text-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-5xl mx-auto">
          <div className="mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Live CSM Insights • Updated Daily
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Expert <span className="hero-gradient-text">CSM</span> Advice
            <br />
            for <span className="text-yellow-300">Love</span> &amp; <span className="text-cyan-300">Wellness</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Unlock your relationship potential with science-backed CSM archetypes. From heartbreak to harmony.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/assessment"
              className="btn-primary text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              Take Free Assessment
            </Link>
            <Link
              href="#featured"
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/30 transition-all"
            >
              Read Latest
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--surface)] to-transparent"></div>
      </section>

      {/* FEATURED POST */}
      {featured[0] && (
        <section id="featured" className="relative -mt-16 max-w-7xl mx-auto px-6">
          <div className="card-gradient rounded-3xl p-1 shadow-2xl">
            <div className="bg-[var(--surface)] rounded-3xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 bg-[var(--primary)]/20 text-[var(--primary)] px-3 py-1 rounded-full text-xs font-bold w-fit mb-4">
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
                    <span className="text-[var(--accent)] font-medium">{featured[0].category_name}</span>
                  </div>
                  <Link
                    href={`/blog/${featured[0].category_slug}/${featured[0].slug}`}
                    className="inline-flex items-center gap-2 text-[var(--accent)] font-bold hover:underline"
                  >
                    Read Full Article
                  </Link>
                </div>
                <div className="md:w-1/2 relative h-64 md:h-auto">
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent z-10"></div>
                  <div className="bg-gradient-to-br from-[var(--primary)] to-purple-800 border-2 border-dashed border-[var(--border)] rounded-r-3xl w-full h-full flex items-center justify-center text-white/60 text-6xl">
                    CSM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CATEGORIES GRID */}
      <section className="mt-24 max-w-7xl mx-auto px-6 space-y-20">
        {postsByCategory.map((cat) => {
          const Icon = categoryIcons[cat.slug] || "BookOpen";
          return (
            <div key={cat.id}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-[var(--text-primary)] flex items-center gap-3">
                  <span className="text-4xl">{Icon}</span>
                  {cat.name}
                </h2>
                <Link
                  href={`/blog/${cat.slug}`}
                  className="text-[var(--accent)] hover:underline font-medium flex items-center gap-1"
                >
                  View all <span aria-hidden="true">→</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cat.posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.category_slug}/${post.slug}`} className="group block">
                    <article className="card-gradient rounded-2xl p-1 h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                      <div className="bg-[var(--surface)] rounded-2xl p-5 h-full flex flex-col">
                        <div className="bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 border-2 border-dashed border-[var(--border)] rounded-xl w-full h-48 mb-4 flex items-center justify-center text-5xl text-[var(--primary)]/40">
                          {Icon}
                        </div>
                        <h3 className="font-bold text-lg text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--accent)] transition">
                          {post.title}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2 flex-grow">
                          {post.excerpt}
                        </p>
                        <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-auto">
                          <span>{format(new Date(post.published_at), "MMM d")}</span>
                          <span className="text-[var(--accent)]">{post.category_name}</span>
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
          Get your personalized CSM archetype report in under 5 minutes.
        </p>
        <Link
          href="/assessment"
          className="inline-block bg-white text-[var(--primary)] font-bold px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          Start Free Assessment
        </Link>
      </section>
    </div>
  );
}
