import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpenText } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { posts } from "@/data/posts";

export function Blog() {
  return (
    <section id="blog" className="bg-[#eef3f9] px-5 py-20 sm:py-28 lg:px-8" data-testid="insights-section">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Pixolve insights" title="Catatan untuk tim yang membangun." body="Insight praktis tentang product strategy, engineering, dan cara membuat keputusan digital dengan lebih baik." />
          <a href="#newsletter" className="text-sm font-bold text-[#002365]" data-testid="blog-view-all-link">Lihat semua insight <ArrowUpRight className="ml-1 inline size-4" /></a>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3" data-testid="blog-grid">
          {posts.map((post, index) => (
            <article key={post.slug} className="group relative rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-[#0e9f85]/40 hover:shadow-lg" data-testid={`blog-card-${index + 1}`}>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#002365]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#002365]">{post.category}</span>
                <BookOpenText className="size-4 text-slate-400" />
              </div>
              <h3 className="mt-14 max-w-xs text-xl font-bold leading-snug text-[#002365] transition-colors group-hover:text-[#0e9f85]">
                <Link to={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:rounded-3xl">
                  {post.title}
                </Link>
              </h3>
              <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                <span>{post.duration}</span>
                <span className="font-bold text-[#002365]">Baca artikel <ArrowUpRight className="ml-1 inline size-3" /></span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}