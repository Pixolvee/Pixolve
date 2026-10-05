// src/components/Team.tsx

import { ArrowUpRight, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { team } from "@/data/team";

export function Team() {
  return (
    <section id="tim" className="bg-white px-5 py-20 sm:py-28 lg:px-8" data-testid="team-section">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Kolom Kiri: Judul, deskripsi, dan CTA */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Orang di balik produk"
              title="Tim inti yang ikut duduk di meja Anda."
              body="Kecil, senior, dan cukup dekat untuk mengerti konteks bisnis—cukup berpengalaman untuk mengantisipasi risikonya."
            />
            <div className="mt-8">
              <a
                href="#quote-form"
                className="group inline-flex items-center gap-2 rounded-full bg-[#002365] px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#002365]/90 hover:shadow-md"
                data-testid="team-hiring-link"
              >
                Bergabung dengan kami
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Foto dan kartu anggota tim */}
          <div className="lg:col-span-7">
            <div className="grid gap-6 sm:grid-cols-2" data-testid="team-grid">
              {team.map((person, index) => (
                <article key={person.name} className="group" data-testid={`team-card-${index + 1}`}>
                  <div className="relative aspect-[4/4.2] overflow-hidden rounded-3xl bg-[#eef3f9]">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <a
                      href={person.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full bg-[#ffe400] text-[#002365] shadow-md transition-transform hover:scale-110"
                      aria-label={`Portofolio ${person.name}`}
                    >
                      <ExternalLink className="size-4" />
                    </a>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-[#002365]">{person.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">{person.role}</p>
                    </div>
                    <span className="font-mono text-xs text-slate-400">0{index + 1}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}