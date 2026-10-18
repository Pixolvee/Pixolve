import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { caseStudies } from "@/data/caseStudies";

// Jumlah proyek yang tampil di beranda (4 kartu per baris di desktop). Sisanya ada di halaman "Semua proyek".
const HOME_LIMIT = 4;

export function Portfolio() {
  const shown = caseStudies.slice(0, HOME_LIMIT);

  return (
    <section id="portofolio" className="bg-[#eef3f9] px-5 py-10 sm:py-14 lg:px-8" data-testid="portfolio-section">
      <div className="mx-auto max-w-7xl">
        {/* Header bar: Judul Studi Kasus di kiri & Tombol Lihat Semua Proyek di kanan */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#002365]/60">
              Portofolio
            </span>
            <h2 className="mt-1 font-heading text-2xl font-extrabold tracking-tight text-[#002365] sm:text-3xl lg:text-4xl" data-testid="portfolio-title">
              Studi Kasus Pilihan
            </h2>
          </div>

          <Link
            to="/portofolio"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#002365] px-5 py-2.5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#002365]/90 hover:shadow-md sm:text-sm"
            data-testid="portfolio-view-all"
          >
            Lihat semua proyek
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid 4 Kartu Proyek */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-testid="portfolio-grid">
          {shown.map((item, index) => (
            <ProjectCard key={item.slug} item={item} index={index} compact />
          ))}
        </div>
      </div>
    </section>
  );
}