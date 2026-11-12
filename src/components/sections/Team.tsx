// src/components/sections/Team.tsx

import { ExternalLink } from "lucide-react";
import { useTeam } from "@/lib/hooks/useTeam";
import type { TeamMember } from "@/lib/types";

function TeamCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="relative aspect-square w-full max-w-[240px] sm:max-w-[260px] mx-auto rounded-full bg-slate-100" />
      <div className="mt-4 flex items-start justify-between gap-3 px-2">
        <div className="space-y-2 flex-1">
          <div className="h-4 w-32 rounded bg-slate-100" />
          <div className="h-3 w-44 rounded bg-slate-100" />
        </div>
        <div className="h-4 w-6 rounded bg-slate-100" />
      </div>
    </div>
  );
}

const fallbackMembers: TeamMember[] = [
  {
    id: "1",
    name: "Andrian Fakhruza",
    role: "Head of UI/UX & Product Strategy",
    image: "/andrian.jpeg",
    portfolio_url: "https://my-portfolio-iota-livid-x77jepjfo4.vercel.app/",
    order_index: 1,
    is_active: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Dimas Kurniawan",
    role: "Lead Fullstack & Cloud Architect",
    image: "/Dimas.JPG",
    portfolio_url: "https://portofolio-dimas-five.vercel.app/",
    order_index: 2,
    is_active: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Muhammad Rizki",
    role: "Machine Learning, Quality Assurance & Testing",
    image: "/andrian.jpeg",
    portfolio_url: "https://my-portfolio-iota-livid-x77jepjfo4.vercel.app/",
    order_index: 3,
    is_active: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Dimas Kurniawan",
    role: "Lead Fullstack & Cloud Architect",
    image: "/Dimas.JPG",
    portfolio_url: "https://portofolio-dimas-five.vercel.app/",
    order_index: 4,
    is_active: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
];

export function Team() {
  const { data: members, isLoading } = useTeam();
  const displayMembers = members && members.length > 0 ? members : fallbackMembers;

  return (
    <section id="tim" className="bg-white px-5 py-16 sm:py-20 lg:py-24 lg:px-8" data-testid="team-section">
      <div className="mx-auto max-w-7xl">
        {/* Header Section Terpusat di Tengah */}
        <div className="text-center max-w-3xl mx-auto" data-testid="section-heading-tim-kami">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-amber-500"
            data-testid="section-eyebrow-tim-kami"
          >
            Tim Kami
          </p>
          <h2
            className="font-heading text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-4xl text-[#002365]"
            data-testid="section-title-tim-kami"
          >
            Bekerja langsung bersama tim yang mengeksekusi ide Anda.
          </h2>
          <p
            className="mt-3.5 text-sm sm:text-base leading-relaxed text-slate-500 max-w-2xl mx-auto"
            data-testid="section-body-tim-kami"
          >
            Setiap solusi dikerjakan langsung oleh praktisi berpengalaman di bidang strategi produk, desain, dan arsitektur teknologi tanpa perantara.
          </p>
        </div>

        {/* Grid 4 Kolom Foto Tim Lingkaran */}
        <div
          className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8 max-w-6xl mx-auto"
          data-testid="team-grid"
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <TeamCardSkeleton key={i} />)
            : displayMembers.map((person, index) => (
                <article key={person.id} className="group flex flex-col" data-testid={`team-card-${index + 1}`}>
                  {/* Lingkaran Foto Besar */}
                  <div className="relative aspect-square w-full max-w-[240px] sm:max-w-[260px] mx-auto">
                    <div className="h-full w-full overflow-hidden rounded-full bg-gradient-to-b from-[#7ec5de] to-[#2b5876] shadow-sm">
                      {person.image ? (
                        <img
                          src={person.image}
                          alt={person.name}
                          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-heading text-3xl font-extrabold text-white/80">
                          {person.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                      )}
                    </div>

                    {/* Tombol Kuning Lingkaran di Pojok Kanan Bawah */}
                    {person.portfolio_url ? (
                      <a
                        href={person.portfolio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-1 right-2 sm:bottom-2 sm:right-3 flex size-9 sm:size-10 items-center justify-center rounded-full bg-[#ffe400] text-[#002365] shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95 z-10"
                        aria-label={`Portofolio ${person.name}`}
                      >
                        <ExternalLink className="size-4.5 stroke-[2.5]" />
                      </a>
                    ) : (
                      <span
                        className="absolute bottom-1 right-2 sm:bottom-2 sm:right-3 flex size-9 sm:size-10 items-center justify-center rounded-full bg-[#ffe400] text-[#002365] shadow-lg z-10"
                        aria-hidden="true"
                      >
                        <ExternalLink className="size-4.5 stroke-[2.5]" />
                      </span>
                    )}
                  </div>

                  {/* Informasi Anggota Tim di Bawah Foto */}
                  <div className="mt-5 flex items-start justify-between gap-3 px-1 sm:px-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading font-extrabold text-[#002365] text-base leading-snug">
                        {person.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 font-medium leading-snug">
                        {person.role}
                      </p>
                    </div>
                    <span className="font-mono text-xs sm:text-sm font-semibold text-slate-300 shrink-0 pt-0.5">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
}
