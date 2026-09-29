import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { caseStudies } from "@/data/caseStudies";

// Jumlah proyek yang tampil di beranda (2 kartu per baris). Sisanya ada di halaman "Semua proyek".
const HOME_LIMIT = 4;

export function Portfolio() {
  const shown = caseStudies.slice(0, HOME_LIMIT);

  return (
    <section id="portofolio" className="bg-[#eef3f9] px-5 py-20 sm:py-28 lg:px-8" data-testid="portfolio-section">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Studi kasus pilihan"
          title="Bukan sekadar launch. Kami mengejar perubahan yang terukur."
          body="Beberapa contoh bagaimana pendekatan produk, engineering, dan data membantu partner kami bergerak lebih jauh."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2" data-testid="portfolio-grid">
          {shown.map((item, index) => (
            <ProjectCard key={item.slug} item={item} index={index} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/portofolio"
            className="group inline-flex items-center gap-2 rounded-full bg-[#002365] px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            data-testid="portfolio-view-all"
          >
            Lihat semua proyek
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}