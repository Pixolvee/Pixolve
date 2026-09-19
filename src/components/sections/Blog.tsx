import { ArrowUpRight, BookOpenText } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const posts: Array<[string, string, string]> = [
  ["Product strategy", "Cara menemukan MVP yang benar-benar layak dibangun", "5 min read"],
  ["Engineering", "Technical debt: kapan harus dibayar, kapan bisa ditunda", "7 min read"],
  ["Case study", "Dari dashboard menjadi keputusan: merancang data layer yang dipakai", "6 min read"],
];

export function Blog() {
  return (
    <section id="blog" className="bg-[#eef3f9] px-5 py-20 sm:py-28 lg:px-8" data-testid="insights-section">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Pixolve insights" title="Catatan untuk tim yang membangun." body="Insight praktis tentang product strategy, engineering, dan cara membuat keputusan digital dengan lebih baik." />
          <a href="#newsletter" className="text-sm font-bold text-[#002365]" data-testid="blog-view-all-link">Lihat semua insight <ArrowUpRight className="ml-1 inline size-4" /></a>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3" data-testid="blog-grid">
          {posts.map(([category, title, duration], index) => (
            <article key={title} className="group rounded-3xl border border-slate-200 bg-white p-6" data-testid={`blog-card-${index + 1}`}>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#002365]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#002365]">{category}</span>
                <BookOpenText className="size-4 text-slate-400" />
              </div>
              <h3 className="mt-14 max-w-xs text-xl font-bold leading-snug text-[#002365] transition-colors group-hover:text-[#0e9f85]">{title}</h3>
              <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                <span>{duration}</span>
                <a href="#quote-form" className="font-bold text-[#002365]">Baca artikel <ArrowUpRight className="ml-1 inline size-3" /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}