import { ArrowUpRight, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { team } from "@/data/team";

export function Team() {
  return (
    <section id="tim" className="bg-white px-5 py-20 sm:py-28 lg:px-8" data-testid="team-section">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Orang di balik produk" title="Tim inti yang ikut duduk di meja Anda." body="Kecil, senior, dan cukup dekat untuk mengerti konteks bisnis—cukup berpengalaman untuk mengantisipasi risikonya." />
          <a href="#quote-form" className="text-sm font-bold text-[#002365]" data-testid="team-hiring-link">Bergabung dengan kami <ArrowUpRight className="ml-1 inline size-4" /></a>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3" data-testid="team-grid">
          {team.map((person, index) => (
            <article key={person.name} className="group" data-testid={`team-card-${index + 1}`}>
              <div className="relative aspect-[4/4.2] overflow-hidden rounded-3xl bg-[#eef3f9]">
                <img src={person.image} alt={person.name} className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" />
                <a href="#quote-form" className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full bg-[#ffe400] text-[#002365]" aria-label={`LinkedIn ${person.name}`}><ExternalLink className="size-4" /></a>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div><h3 className="font-bold text-[#002365]">{person.name}</h3><p className="mt-1 text-sm text-slate-500">{person.role}</p></div>
                <span className="font-mono text-xs text-slate-400">0{index + 1}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}