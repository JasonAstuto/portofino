import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const posts = [
  {
    slug: "hello-world",
    title: "Hello World",
    date: "September 1, 2026",
    readTime: "2 min read",
    category: "General",
    tags: ["Welcome", "Blog", "Engineering"],
    excerpt:
      "A simple first post to mark the launch of the blog and share the intent behind this space: engineering lessons, platform thinking, and the work of building systems that scale.",
    body: [
      "This is the first post in what I hope becomes a practical journal on architecture, platform work, AI, and building reliable systems for companies that need to move with confidence.",
      "The goal is simple: share the lessons that show up in real projects—tradeoffs, patterns, failures, and the moments where a strong platform gives a team leverage instead of friction.",
      "Whether it ends up covering cloud architecture, AI platform design, leadership, or the messy realities of getting technical work shipped in regulated environments, the focus will stay practical and grounded in real experience.",
      "Thanks for being here. This is the start of the conversation.",
    ],
  },
  {
    slug: "designing-cloud-platforms-regulated-growth",
    title: "Designing Cloud Platforms for Regulated Growth",
    date: "August 24, 2026",
    readTime: "5 min read",
    category: "Architecture",
    tags: ["AWS", "Security", "HIPAA"],
    excerpt:
      "The most durable platform decisions are the ones that reduce team drag while preserving trust, compliance, and operational clarity as organizations scale.",
    body: [
      "The best platforms for regulated teams are not the most elaborate ones—they are the ones that make complexity manageable without creating accidental risk.",
      "That usually means strong boundaries, clear ownership, consistent deployment patterns, and a level of operational transparency that lets teams move quickly without exposing the business to avoidable failures.",
      "When a company is growing, platform architecture is often the difference between sustainable scale and fragile growth. The right abstractions reduce duplication, improve decision quality, and make it easier to bring healthy engineering habits into the organization.",
      "The real win is not a perfect platform. It is a platform that gives teams confidence to ship without needing constant rescue.",
    ],
  },
  {
    slug: "why-ai-systems-need-platform-discipline",
    title: "Why AI Systems Need Platform Discipline",
    date: "August 12, 2026",
    readTime: "4 min read",
    category: "AI / Platform",
    tags: ["AI/LLM", "MLOps", "Platform"],
    excerpt:
      "AI adoption accelerates faster when the foundation is operationally sound. The best systems pair strong platform design with pragmatic evaluation and clear ownership.",
    body: [
      "AI systems look magical from the outside, but they are still software systems. That means they need disciplined platform design, strong monitoring, and careful operational ownership.",
      "The biggest mistakes usually happen when teams treat model access as a shortcut instead of a production capability. A model call is not enough. There needs to be a reliable path from prompt to evaluation to deployment to observation.",
      "The strongest teams treat AI as a product and a platform problem at the same time. They create evaluation loops, operational guardrails, and a clear understanding of risk before they scale usage.",
      "The AI story gets much better when the underlying engineering discipline is strong.",
    ],
  },
];

export function Blog() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [selectedSlug, setSelectedSlug] = useState(() => {
    if (typeof window === "undefined") {
      return posts[0].slug;
    }

    const hash = window.location.hash;
    const postFromHash = posts.find((post) => `#blog/${post.slug}` === hash);
    return postFromHash ? postFromHash.slug : posts[0].slug;
  });

  useEffect(() => {
    const syncSelectedPostFromHash = () => {
      const nextPost = posts.find((post) => `#blog/${post.slug}` === window.location.hash);
      if (nextPost) {
        setSelectedSlug(nextPost.slug);
      } else if (window.location.hash === "#blog") {
        setSelectedSlug(posts[0].slug);
      }
    };

    syncSelectedPostFromHash();
    window.addEventListener("hashchange", syncSelectedPostFromHash);
    return () => window.removeEventListener("hashchange", syncSelectedPostFromHash);
  }, []);

  const selectPost = (slug: string) => {
    setSelectedSlug(slug);
    window.history.pushState(null, "", `#blog/${slug}`);
  };

  const selectedPost = posts.find((post) => post.slug === selectedSlug) ?? posts[0];

  return (
    <section id="blog" className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-2 mb-12"
        >
          <p className="text-sm font-medium text-indigo-600 tracking-wide uppercase">Blog</p>
          <h2 className="text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight">
            Notes from the field.
          </h2>
        </motion.div>

        <div className="mb-10 rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-4">
            <span className="rounded-full bg-indigo-50 text-indigo-700 px-2.5 py-1 font-medium">
              Featured
            </span>
            <span>{selectedPost.category}</span>
            <span>•</span>
            <span>{selectedPost.date}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <a
              href="#blog"
              onClick={() => setSelectedSlug(posts[0].slug)}
              className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              ← Back to blog
            </a>
            <a
              href="#hero"
              className="inline-flex items-center text-sm font-medium text-indigo-700 hover:text-indigo-900 transition-colors"
            >
              Back to portfolio
            </a>
          </div>

          <h3 className="text-3xl font-semibold text-slate-900 tracking-tight mb-3">{selectedPost.title}</h3>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mb-5">{selectedPost.excerpt}</p>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            {selectedPost.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-4 text-slate-600 leading-relaxed max-w-3xl">
            {selectedPost.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`rounded-3xl border p-7 shadow-sm transition-shadow ${
                selectedSlug === post.slug ? "border-indigo-200 bg-indigo-50/40" : "border-slate-200 bg-white hover:shadow-md"
              }`}
            >
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-4">
                <span className="rounded-full bg-slate-100 text-slate-700 px-2.5 py-1 font-medium">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>

              <h3 className="text-2xl font-semibold text-slate-900 tracking-tight mb-3">{post.title}</h3>
              <p className="text-base text-slate-600 leading-relaxed mb-5">{post.excerpt}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-slate-50 border border-slate-100 text-slate-500 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={`#blog/${post.slug}`}
                onClick={(event) => {
                  event.preventDefault();
                  selectPost(post.slug);
                }}
                className="inline-flex items-center text-sm font-medium text-indigo-700 hover:text-indigo-900 transition-colors"
              >
                Read more
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
