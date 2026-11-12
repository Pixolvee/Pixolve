import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Globe } from "lucide-react";
import type { CaseStudy } from "@/data/caseStudies";

function GithubIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

/** Gambar cover kartu. Memprioritaskan thumbnail WebP terkompresi, fallback ke gambar asli jika gagal. */
function Cover({
  src,
  thumbnail,
  name,
  color,
}: {
  src?: string;
  thumbnail?: string;
  name: string;
  color: string;
}) {
  const initial = thumbnail || src;
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(initial);
  const [failed, setFailed] = useState(false);

  if (!currentSrc || failed) {
    return (
      <div className={`absolute inset-0 bg-gradient-to-br ${color}`}>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(135deg, transparent 30%, rgba(255,255,255,.45) 31%, transparent 32%), linear-gradient(45deg, transparent 45%, rgba(0,35,101,.3) 46%, transparent 47%)",
            backgroundSize: "38px 38px",
          }}
        />
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={name}
      loading="lazy"
      decoding="async"
      onError={() => {
        // Jika thumbnail gagal dimuat, coba fallback ke src asli
        if (currentSrc === thumbnail && src && thumbnail !== src) {
          setCurrentSrc(src);
        } else {
          setFailed(true);
        }
      }}
      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 [backface-visibility:hidden] [transform:translateZ(0)]"
    />
  );
}

export function ProjectCard({
  item,
  index,
  compact = false,
}: {
  item: CaseStudy;
  index: number;
  compact?: boolean;
}) {
  const firstGalleryItem = item.gallery?.[0];
  const originalSrc =
    item.image ??
    (typeof firstGalleryItem === "string" ? firstGalleryItem : firstGalleryItem?.src);
  const thumbnailSrc = item.thumbnail ?? (item.slug ? `/thumbnails/${item.slug}.webp` : undefined);

  const badgeText = item.type || item.category || "Web App";
  const githubLink = item.githubUrl || (item.slug ? `https://github.com/Pixolvee` : undefined);
  const liveLink = item.demoUrl || item.url || (item.slug ? `/portofolio/${item.slug}` : undefined);

  return (
    <article
      className="group relative flex flex-col overflow-hidden bg-white rounded-2xl border border-slate-200/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-slate-300"
      data-testid={`portfolio-card-${index + 1}`}
    >
      {/* Overlay link utama menutupi seluruh card agar mudah diklik */}
      <Link
        to={`/portofolio/${item.slug}`}
        aria-label={`Lihat studi kasus ${item.name}`}
        className="absolute inset-0 z-10"
        data-testid={`portfolio-link-${index + 1}`}
      />

      {/* Area Thumbnail Proyek dengan Badge & Icon Aksi */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Cover
          src={originalSrc}
          thumbnail={thumbnailSrc}
          name={item.name}
          color={item.color}
        />

        {/* Badge Tipe / Kategori di Pojok Kiri Atas */}
        <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none">
          <span className="inline-flex items-center rounded-full bg-black/65 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md shadow-sm">
            {badgeText}
          </span>
        </div>

        {/* Tombol GitHub & Website di Pojok Kanan Atas */}
        <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex size-8 items-center justify-center rounded-lg bg-black/65 text-white backdrop-blur-md shadow-sm transition-all hover:bg-black/85 hover:scale-105 active:scale-95"
              aria-label={`Source code ${item.name} di GitHub`}
              title="GitHub Repository"
            >
              <GithubIcon className="size-4" />
            </a>
          )}
          {liveLink && (
            <a
              href={liveLink}
              target={liveLink.startsWith("http") ? "_blank" : undefined}
              rel={liveLink.startsWith("http") ? "noopener noreferrer" : undefined}
              onClick={(e) => e.stopPropagation()}
              className="flex size-8 items-center justify-center rounded-lg bg-black/65 text-white backdrop-blur-md shadow-sm transition-all hover:bg-black/85 hover:scale-105 active:scale-95"
              aria-label={`Lihat website / demo ${item.name}`}
              title="Live Demo"
            >
              <Globe className="size-4" />
            </a>
          )}
        </div>
      </div>

      {/* Bodi kartu: Judul, deskripsi singkat, dan affordance Detail */}
      <div className="flex flex-1 flex-col p-5">
        {/* Judul Proyek */}
        <h3
          className="font-heading font-extrabold text-slate-900 text-lg leading-snug tracking-tight transition-colors group-hover:text-amber-600"
          title={item.name}
        >
          {item.name}
        </h3>

        {/* Deskripsi Singkat 2-3 Baris Konsisten */}
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500 line-clamp-2 flex-1">
          {item.textContent || item.text || item.text_content}
        </p>

        {/* Footer: Garis Pemisah & Teks Detail di Kanan Bawah */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-end">
          <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-amber-500 transition-colors group-hover:text-amber-600">
            Detail
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}
