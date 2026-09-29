import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
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

export function ProjectCard({ item, index }: { item: CaseStudy; index: number }) {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Cover src={item.image ?? item.gallery?.[0]?.src} name={item.name} color={item.color} />
      </div>

      {/* Bodi kartu: judul, penjelasan, lalu ringkasan hasil */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-xl font-black tracking-tight text-[#002365] transition-colors group-hover:text-[#0e9f85] sm:text-2xl">
          {item.name}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-3">{item.text}</p>

        <div className="mt-auto pt-6">
          <div className="grid grid-cols-2 gap-3 border-y border-slate-100 py-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sebelum</p>
              <p className="mt-1 text-xs font-semibold text-[#002365]">{item.before}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sesudah</p>
              <p className="mt-1 text-xs font-semibold text-[#002365]">{item.after}</p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-sm font-bold text-[#002365]">
              <span className="text-[#0e9f85]">{item.result}</span> impact
            </span>
            {/* z-20 agar tetap bisa diklik di atas overlay link (z-10) */}
            <a
              href="#quote-form"
              className="relative z-20 inline-flex items-center gap-1 text-xs font-bold text-[#002365] transition hover:text-[#0e9f85]"
              data-testid={`portfolio-demo-${index + 1}`}
            >
              Minta demo <ArrowUpRight className="size-3" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}