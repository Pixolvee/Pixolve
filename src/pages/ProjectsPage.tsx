import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import {
  caseStudies,
  PORTFOLIO_CATEGORIES,
  matchCategory,
} from "@/data/caseStudies";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "@/styles/ase-study.css";

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("kategori") || "all";

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
  }, [activeCategoryId]);

  return (
    <main className="min-h-screen bg-white" data-testid="projects-page">
      {/* Navbar pill */}
      {/* TODO: ganti dengan Navbar dari components/layout jika ingin konsisten dengan beranda */}
      <div className="fixed inset-x-0 top-4 z-40 px-4">
        <Header />
        <nav className="cs-shadow-card mx-auto flex max-w-6xl items-center justify-between rounded-full border border-slate-200/70 bg-white/80 px-5 py-3 backdrop-blur-xl">
          <Link to="/" className="text-lg font-bold tracking-tight text-[#002365]">Pixolve</Link>
          <Link to="/" className="inline-flex items-center gap-1.5 rounded-full bg-[#002365] px-4 py-2 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5" data-testid="projects-back-link">
            <ArrowLeft className="size-3.5" /> Beranda
          </Link>
        </nav>
      </div>

      {/* Header */}
      <section className="cs-ink relative overflow-hidden">
        <div className="absolute inset-0 text-white opacity-[0.07]" style={{ backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
        <div className="cs-rise relative mx-auto max-w-6xl px-5 pb-24 pt-40 lg:px-8">
          <p className="cs-eyebrow text-[#5eead4]">Portofolio</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl" data-testid="projects-title">Semua proyek</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
            {caseStudies.length} studi kasus dari produk, engineering, dan data yang kami kerjakan bersama partner.
          </p>
        </div>
      </section>

      {/* Daftar proyek: Filter Kategori & Grid */}
      <section className="bg-[#eef3f9] px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Category Filter Pills */}
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-6">
            <div
              className="flex flex-wrap items-center gap-2 sm:gap-2.5"
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
                    className={`group inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 ${
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

            <p className="text-xs sm:text-sm font-medium text-slate-500">
              Menampilkan <span className="font-bold text-[#002365]">{filteredStudies.length}</span> dari {caseStudies.length} proyek
            </p>
          </div>

          {/* Grid Proyek */}
          {filteredStudies.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2" data-testid="projects-grid">
              {filteredStudies.map((item, index) => (
                <ProjectCard key={item.slug} item={item} index={index} />
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

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-24 lg:px-8">
        <div className="rounded-[2.25rem] border border-slate-200 bg-[#eef3f9] p-12 text-center sm:p-16">
          <h2 className="text-3xl font-bold text-[#002365] sm:text-4xl">Punya proyek serupa?</h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-600">Ceritakan kebutuhan Anda, kami bantu petakan langkah pertamanya.</p>
          <Link to="/#quote-form" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#002365] px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
            Diskusi dengan kami <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}