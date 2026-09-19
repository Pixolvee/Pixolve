import { ArrowUpRight, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudies } from "@/data/caseStudies";

export function Portfolio() {
  return (
    <section id="portofolio" className="bg-[#eef3f9] px-5 py-20 sm:py-28 lg:px-8" data-testid="portfolio-section">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Studi kasus pilihan" title="Bukan sekadar launch. Kami mengejar perubahan yang terukur." body="Beberapa contoh bagaimana pendekatan produk, engineering, dan data membantu partner kami bergerak lebih jauh." />
        <div className="mt-12 grid gap-6 lg:grid-cols-3" data-testid="portfolio-grid">
          {caseStudies.map((item, index) => (
            <article key={item.name} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white" data-testid={`portfolio-card-${index + 1}`}>
              <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${item.color} p-6`}>
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,.45) 31%, transparent 32%), linear-gradient(45deg, transparent 45%, rgba(0,35,101,.3) 46%, transparent 47%)", backgroundSize: "38px 38px" }} />
                <div className="relative flex items-start justify-between">
                  <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#002365]">{item.category}</span>
                  <ExternalLink className="size-5 text-[#002365]" />
                </div>
                <div className="absolute bottom-5 left-6">
                  <p className="text-3xl font-black tracking-tight text-[#002365]">{item.name}</p>
                  <p className="mt-1 text-xs font-medium text-[#002365]/70">Case study / 2025</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm leading-6 text-slate-600">{item.text}</p>
                <div className="mt-6 grid grid-cols-2 gap-3 border-y border-slate-100 py-4">
                  <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sebelum</p><p className="mt-1 text-xs font-semibold text-[#002365]">{item.before}</p></div>
                  <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sesudah</p><p className="mt-1 text-xs font-semibold text-[#002365]">{item.after}</p></div>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#002365]"><span className="text-[#0e9f85]">{item.result}</span> impact</span>
                  <a href="#quote-form" className="inline-flex items-center gap-1 text-xs font-bold text-[#002365]" data-testid={`portfolio-demo-${index + 1}`}>Minta demo <ArrowUpRight className="size-3" /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}