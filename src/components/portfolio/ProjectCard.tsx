import { useState } from "react";
import { Link } from "react-router-dom";
import type { CaseStudy } from "@/data/caseStudies";

/** Gambar cover kartu. Jika tidak ada / gagal dimuat, tampil gradien sesuai warna proyek. */
function Cover({ src, name, color }: { src?: string; name: string; color: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
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
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
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
  return (
    <article
      className={`group relative flex flex-col overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1 ${
        compact
          ? "rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg"
          : "rounded-3xl border border-slate-200 hover:shadow-xl"
      }`}
      data-testid={`portfolio-card-${index + 1}`}
    >
      {/* Overlay link utama menutupi seluruh card */}
      <Link
        to={`/portofolio/${item.slug}`}
        aria-label={`Lihat studi kasus ${item.name}`}
        className="absolute inset-0 z-10"
        data-testid={`portfolio-link-${index + 1}`}
      />

      {/* Gambar (bersih, tanpa teks di atasnya) */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Cover src={item.image ?? item.gallery?.[0]?.src} name={item.name} color={item.color} />
      </div>

      {/* Bodi kartu: judul, penjelasan, lalu ringkasan hasil */}
      <div className={`flex flex-1 flex-col ${compact ? "p-4 sm:p-5" : "p-6 sm:p-7"}`}>
        <h3
          className={`font-black tracking-tight text-[#002365] transition-colors group-hover:text-[#0e9f85] ${
            compact
              ? "line-clamp-2 min-h-[2.75rem] text-base leading-snug sm:text-lg"
              : "text-xl sm:text-2xl"
          }`}
          title={item.name}
        >
          {item.name}
        </h3>
        <p
          className={`text-slate-600 ${
            compact
              ? "mt-2 line-clamp-2 text-xs leading-relaxed"
              : "mt-3 line-clamp-3 text-sm leading-6"
          }`}
        >
          {item.text}
        </p>
      </div>
    </article>
  );
}