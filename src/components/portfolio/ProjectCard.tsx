import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/data/caseStudies";

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
      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 [backface-visibility:hidden] [transform:translateZ(0)]"
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

  return (
    <article
      className="group relative flex flex-col overflow-hidden bg-white rounded-2xl border border-slate-200/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#002365]/30"
      data-testid={`portfolio-card-${index + 1}`}
    >
      {/* Overlay link utama menutupi seluruh card agar mudah diklik */}
      <Link
        to={`/portofolio/${item.slug}`}
        aria-label={`Lihat studi kasus ${item.name}`}
        className="absolute inset-0 z-10"
        data-testid={`portfolio-link-${index + 1}`}
      />

      {/* 16:9 Thumbnail Proyek Konsisten */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <Cover
          src={originalSrc}
          thumbnail={thumbnailSrc}
          name={item.name}
          color={item.color}
        />
      </div>

      {/* Bodi kartu: kategori, tipe, judul, deskripsi, affordance */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Kategori & Tipe Proyek */}
        <div className="mb-2.5 flex items-center justify-between gap-2 flex-wrap">
          {item.category && (
            <span className="inline-flex items-center rounded-full bg-[#002365]/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#002365]">
              {item.category}
            </span>
          )}
          {item.type && (
            <span className="text-[11px] font-medium text-slate-500">
              {item.type}
            </span>
          )}
        </div>

        {/* Judul Proyek */}
        <h3
          className="font-heading font-bold text-[#002365] text-base sm:text-lg leading-snug tracking-tight transition-colors group-hover:text-[#0e9f85]"
          title={item.name}
        >
          {item.name}
        </h3>

        {/* Deskripsi Singkat 2-3 Baris Konsisten */}
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-2 sm:line-clamp-3 flex-1">
          {item.textContent || item.text || item.text_content}
        </p>

        {/* Affordance: Tombol / Tautan Lihat Studi Kasus */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-[#002365] transition-colors group-hover:text-[#0e9f85]">
          <span>Lihat studi kasus</span>
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  );
}
