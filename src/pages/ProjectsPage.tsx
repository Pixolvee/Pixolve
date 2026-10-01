import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { caseStudies } from "@/data/caseStudies";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "@/styles/ase-study.css";

export default function ProjectsPage() {
  useEffect(() => {
    document.title = "Semua Proyek — Pixolve";
  }, []);

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

      {/* Daftar proyek: 2 kartu per baris */}
      <section className="bg-[#eef3f9] px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2" data-testid="projects-grid">
          {caseStudies.map((item, index) => (
            <ProjectCard key={item.slug} item={item} index={index} />
          ))}
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