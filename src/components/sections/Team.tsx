// src/components/sections/Team.tsx

import { ExternalLink } from "lucide-react";
import { useTeam } from "@/lib/hooks/useTeam";
import type { TeamMember } from "@/lib/types";

function TeamCardSkeleton() {
  return (
    <div className="animate-pulse mx-auto w-full max-w-[200px] sm:max-w-[220px]">
      <div className="relative aspect-square w-full rounded-2xl bg-slate-100" />
      <div className="mt-3 space-y-1.5 px-0.5">
        <div className="h-4 w-28 rounded bg-slate-100" />
        <div className="h-3 w-36 rounded bg-slate-100" />
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
    <section id="tim" className="bg-white px-5 py-10 sm:py-14 lg:py-16 lg:px-8" data-testid="team-section">
      <div className="mx-auto max-w-7xl">
        {/* Header Section Terpusat di Tengah */}
        <div className="text-center max-w-2xl mx-auto" data-testid="section-heading-tim-kami">
          <p
            className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-500"
            data-testid="section-eyebrow-tim-kami"
          >
            Tim Kami
          </p>
          <h2
            className="font-heading text-xl font-extrabold leading-tight tracking-tight sm:text-2xl lg:text-3xl text-[#002365]"
            data-testid="section-title-tim-kami"
          >
            Bekerja langsung bersama tim yang mengeksekusi ide Anda.
          </h2>
          <p
            className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500 max-w-xl mx-auto"
            data-testid="section-body-tim-kami"
          >
            Setiap solusi dikerjakan langsung oleh praktisi berpengalaman di bidang strategi produk, desain, dan arsitektur teknologi tanpa perantara.
          </p>
        </div>

        {/* Grid 4 Kolom Foto Tim */}
        <div
          className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-5 lg:gap-6 max-w-5xl mx-auto"
          data-testid="team-grid"
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <TeamCardSkeleton key={i} />)
            : displayMembers.map((person, index) => (
                <article
                  key={person.id}
                  className="group flex flex-col mx-auto w-full max-w-[200px] sm:max-w-[220px]"
                  data-testid={`team-card-${index + 1}`}
                >
                  {/* Foto Tim (Perkecil proporsional, rounded-2xl modern tanpa border bulat) */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-100">
                    {person.image ? (
                      <img
                        src={person.image}
                        alt={person.name}
                        className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-heading text-2xl font-extrabold text-slate-400">
                        {person.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                    )}

                    {/* Tombol Kuning Lingkaran Portofolio di Pojok Kanan Bawah */}
                    {person.portfolio_url ? (
                      <a
                        href={person.portfolio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-2.5 right-2.5 flex size-8 sm:size-8.5 items-center justify-center rounded-full bg-[#ffe400] text-[#002365] shadow-md transition-transform duration-300 hover:scale-110 active:scale-95 z-10"
                        aria-label={`Portofolio ${person.name}`}
                      >
                        <ExternalLink className="size-4 stroke-[2.5]" />
                      </a>
                    ) : (
                      <span
                        className="absolute bottom-2.5 right-2.5 flex size-8 sm:size-8.5 items-center justify-center rounded-full bg-[#ffe400] text-[#002365] shadow-md z-10"
                        aria-hidden="true"
                      >
                        <ExternalLink className="size-4 stroke-[2.5]" />
                      </span>
                    )}
                  </div>

                  {/* Informasi Anggota Tim di Bawah Foto (Tanpa nomor urut, proporsional dan rapi) */}
                  <div className="mt-2.5 px-0.5">
                    <h3 className="font-heading font-extrabold text-[#002365] text-sm sm:text-base leading-snug">
                      {person.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 font-medium leading-snug line-clamp-2">
                      {person.role}
                    </p>
                  </div>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
}
