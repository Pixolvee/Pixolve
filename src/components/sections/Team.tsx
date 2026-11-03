// src/components/sections/Team.tsx

import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useTeam } from "@/lib/hooks/useTeam";

function TeamCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/4.2] rounded-3xl bg-slate-100" />
      <div className="mt-4 flex items-start justify-between gap-2">
        <div className="space-y-2">
          <div className="h-4 w-28 rounded bg-slate-100" />
          <div className="h-3 w-20 rounded bg-slate-100" />
        </div>
        <div className="h-4 w-5 rounded bg-slate-100" />
      </div>
    </div>
  );
}

export function Team() {
  const { data: members, isLoading } = useTeam();

  return (
    <section id="tim" className="bg-white px-5 py-12 sm:py-16 lg:px-8" data-testid="team-section">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Kolom Kiri: Judul, deskripsi, dan CTA */}
          <div className="lg:col-span-4" data-testid="section-heading-tim-kami">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-amber-500" data-testid="section-eyebrow-tim-kami">
              Tim Kami
            </p>
            <h2 className="font-heading text-2xl font-extrabold leading-snug tracking-tight sm:text-3xl text-[#002365]" data-testid="section-title-tim-kami">
              Bekerja langsung bersama tim yang mengeksekusi ide Anda.
            </h2>
            <p className="mt-3.5 text-sm leading-relaxed text-slate-600" data-testid="section-body-tim-kami">
              Setiap solusi dikerjakan langsung oleh praktisi berpengalaman di bidang strategi produk, desain, dan arsitektur teknologi. Tanpa perantara atau birokrasi berbelit, memastikan komunikasi transparan dan hasil yang presisi.
            </p>
            <div className="mt-6">
              <a
                href="#quote-form"
                className="group inline-flex items-center gap-2 rounded-full bg-[#002365] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#002365]/90 hover:shadow-md"
                data-testid="team-hiring-link"
              >
                Konsultasi bersama tim
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Foto dan kartu anggota tim */}
          <div className="lg:col-span-8">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-3" data-testid="team-grid">
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => <TeamCardSkeleton key={i} />)
                : (members ?? []).map((person, index) => (
                    <article key={person.id} className="group" data-testid={`team-card-${index + 1}`}>
                      <div className="relative aspect-[4/4.2] overflow-hidden rounded-3xl bg-[#eef3f9]">
                        {person.image && (
                          <img
                            src={person.image}
                            alt={person.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        )}
                        {person.portfolio_url && (
                          <a
                            href={person.portfolio_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-3 right-3 flex size-8 sm:size-9 items-center justify-center rounded-full bg-[#ffe400] text-[#002365] shadow-md transition-transform hover:scale-110"
                            aria-label={`Portofolio ${person.name}`}
                          >
                            <ExternalLink className="size-4" />
                          </a>
                        )}
                      </div>
                      <div className="mt-3.5 flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-[#002365] text-sm sm:text-base leading-snug">{person.name}</h3>
                          <p className="mt-1 text-xs text-slate-500 leading-snug">{person.role}</p>
                          {person.bio && (
                            <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{person.bio}</p>
                          )}
                          {person.skills && person.skills.length > 0 && (
                            <div className="mt-1.5 flex flex-wrap gap-1">
                              {person.skills.slice(0, 4).map((skill) => (
                                <span
                                  key={skill}
                                  className="rounded-full bg-[#eef3f9] px-2 py-0.5 text-[10px] font-medium text-[#002365]"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}
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
