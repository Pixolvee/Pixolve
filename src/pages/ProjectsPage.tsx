import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Sparkles, Loader2 } from "lucide-react";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import {
  PORTFOLIO_CATEGORIES,
  matchCategory,
} from "@/data/caseStudies";
import { useCaseStudies } from "@/lib/hooks/useCaseStudies";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "@/styles/ase-study.css";

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("kategori") || "all";
  const { data: caseStudies = [], isLoading } = useCaseStudies();

  const activeCategoryId = PORTFOLIO_CATEGORIES.some((c) => c.id === currentCategory)
    ? currentCategory
    : "all";

  useEffect(() => {
    const cat = PORTFOLIO_CATEGORIES.find((c) => c.id === activeCategoryId);
    document.title =
      activeCategoryId === "all"
        ? "Semua Proyek — Pixolve"
        : `${cat?.label ?? "Proyek"} — Portofolio Pixolve`;
  }, [activeCategoryId]);

  const handleSelectCategory = (id: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (id === "all") {
      nextParams.delete("kategori");
    } else {
      nextParams.set("kategori", id);
    }
    setSearchParams(nextParams);
  };

  const filteredStudies = useMemo(() => {
    return caseStudies.filter((item) => matchCategory(item, activeCategoryId));
  }, [activeCategoryId, caseStudies]);

  return (
    <main className="min-h-screen bg-white" data-testid="projects-page">
      <Header />

      {/* Header Halaman */}
      <section className="cs-ink relative overflow-hidden">
        <div
          className="absolute inset-0 text-white opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="cs-rise relative mx-auto max-w-6xl px-5 pt-28 pb-10 sm:pt-32 sm:pb-12 lg:px-8">
          <p className="cs-eyebrow text-[#5eead4]">Portofolio</p>
          <h1
            className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            data-testid="projects-title"
          >
            Semua Proyek
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
            Kumpulan {caseStudies.length} studi kasus produk, engineering, dan data yang kami kerjakan bersama partner.
          </p>
        </div>
      </section>

      {/* Daftar proyek: Filter Kategori Sejajar & Grid Responsif */}
      <section className="bg-[#eef3f9] px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Category Filter Pills & Jumlah Hasil (Satu Baris Sejajar & Responsif) */}
          <div className="mb-8 border-b border-slate-200/80 pb-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Info Label & Jumlah Proyek */}
              <div className="shrink-0">
                <p className="text-xs font-bold uppercase tracking-wider text-[#002365]/70">
                  Kategori proyek
                </p>
                <p className="mt-0.5 text-base font-extrabold text-[#002365]">
                  {filteredStudies.length} proyek
                </p>
              </div>

              {/* Filter Pills: Horizontal Scrolling di Layar Kecil tanpa Membungkus Berantakan */}
              <div
                className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none flex-nowrap"
                data-testid="category-filter-list"
              >
                {PORTFOLIO_CATEGORIES.map((cat) => {
                  const isActive = activeCategoryId === cat.id;
                  const count = caseStudies.filter((item) => matchCategory(item, cat.id)).length;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleSelectCategory(cat.id)}
                      className={`group inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-[#002365] text-white shadow-md shadow-[#002365]/20 ring-2 ring-[#002365]/20"
                          : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-[#002365]"
                      }`}
                      data-testid={`category-filter-${cat.id}`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[11px] font-bold transition-colors ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Grid Proyek Responsif (1 col HP, 2 col Tablet, 3 col Laptop, 4 col Desktop Lebar) */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="size-8 animate-spin text-[#002365]/40" />
            </div>
          ) : filteredStudies.length > 0 ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
              data-testid="projects-grid"
            >
              {filteredStudies.map((item, index) => (
                <ProjectCard key={item.slug} item={item} index={index} compact />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
              <Sparkles className="mx-auto size-8 text-amber-400" />
              <h3 className="mt-3 text-lg font-bold text-[#002365]">Belum ada proyek untuk kategori ini</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                Kami terus menambahkan studi kasus terbaru. Punya kebutuhan proyek serupa? Diskusikan dengan tim kami.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => handleSelectCategory("all")}
                  className="rounded-full bg-[#002365] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-[#002365]/90"
                >
                  Lihat semua proyek
                </button>
                <Link
                  to="/#quote-form"
                  className="rounded-full border border-slate-200 bg-white px-6 py-2.5 text-xs font-semibold text-[#002365] transition hover:bg-slate-50"
                >
                  Konsultasi proyek
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
