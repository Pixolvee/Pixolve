import { Link } from "react-router-dom";
import type { Post } from "@/data/posts";

export function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-slate-100 bg-slate-50 px-5 py-16" data-testid="related-posts">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-sans text-lg font-bold text-slate-900">Baca juga</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {posts.map((r) => (
            <Link key={r.slug} to={`/blog/${r.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[#0e9f85]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{r.category}</span>
              <p className="mt-3 font-sans font-bold leading-snug text-[#002365] group-hover:text-[#0e9f85]">{r.title}</p>
              <p className="mt-3 font-sans text-xs text-slate-500">{r.duration}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}