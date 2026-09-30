import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, ArrowUpRight, Check, ChevronLeft, ChevronRight, X,
  Calendar, Layers, Share2,
  ArrowRight, Building2,
} from "lucide-react";
import { caseStudies, getCaseStudy } from "@/data/caseStudies";
import "@/styles/ase-study.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const GAP = 20;

function WindowMock({ name }: { name: string }) {
  return (
    <div className="cs-shadow-float overflow-hidden rounded-3xl bg-white ring-1 ring-black/5">
      <div className="flex items-center gap-1.5 border-b border-slate-100 px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-400" />
        <span className="size-2.5 rounded-full bg-amber-400" />
        <span className="size-2.5 rounded-full bg-emerald-400" />
        <span className="ml-3 text-[11px] font-medium text-slate-400">{name}</span>
      </div>
      <div className="grid aspect-[4/3] grid-cols-[72px_1fr]">
        <div className="space-y-3 border-r border-slate-100 bg-slate-50 p-3">
          {[0, 1, 2, 3].map((i) => <div key={i} className="h-2 rounded bg-slate-200" />)}
        </div>
        <div className="space-y-4 p-5">
          <div className="h-3 w-1/3 rounded bg-[#002365]/15" />
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => <div key={i} className="h-16 rounded-xl bg-[#002365]/5" />)}
          </div>
          <div className="h-28 rounded-xl bg-[#0e9f85]/10" />
        </div>
      </div>
    </div>
  );
}

function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeLabel = "Sebelum",
  afterLabel = "Sesudah",
}: {
  beforeSrc?: string;
  afterSrc?: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [pos, setPos] = useState(50);

  // Fallback: kalau salah satu gambar tidak ada, tampilkan 2 kartu paralel
  if (!beforeSrc || !afterSrc) {
    return (
      <div className="grid gap-5 sm:grid-cols-2">
        {[
          { label: beforeLabel, src: beforeSrc, accent: false },
          { label: afterLabel, src: afterSrc, accent: true },
        ].map((item) => (
          <div key={item.label} className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <div className="relative aspect-video bg-slate-100">
              {item.src ? (
                <img src={item.src} alt={item.label} className="h-full w-full object-cover" />
              ) : (
                <div className={`grid h-full place-items-center text-sm font-bold uppercase tracking-widest ${item.accent ? "bg-gradient-to-br from-[#002365] to-[#0e9f85] text-white" : "bg-slate-100 text-slate-400"}`}>
                  {item.label}
                </div>
              )}
            </div>
            <p className="border-t border-slate-100 px-5 py-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    );
  }

  // Slider version
  return (
    <div className="relative aspect-video w-full select-none overflow-hidden rounded-3xl bg-slate-100 ring-1 ring-slate-200">
      {/* AFTER */}
      <img
        src={afterSrc}
        alt={afterLabel}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* BEFORE — terpotong dari kiri */}
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <img
          src={beforeSrc}
          alt={beforeLabel}
          className="absolute inset-0 h-full object-cover"
          style={{ width: `${(100 / pos) * 100}%`, maxWidth: "none" }}
          draggable={false}
        />
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-[#ffe400] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#00153d]">
        {afterLabel}
      </span>

      {/* Handle */}
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        aria-label="Geser untuk membandingkan"
      />
      <div
        className="pointer-events-none absolute inset-y-0 w-1 bg-white shadow-[0_0_24px_rgba(0,0,0,.35)]"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#002365] shadow-xl">
          <ChevronLeft className="size-4" />
          <ChevronRight className="size-4" />
        </span>
      </div>
    </div>
  );
}

export default function CaseStudyPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const study = getCaseStudy(slug);

  const [open, setOpen] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState(0);
  const [, setActiveSection] = useState("tentang");
  const scroller = useRef<HTMLDivElement>(null);

  const gallery = (study?.gallery ?? []).filter((g) => !failed[g.src]);
  const n = gallery.length;
  const markFailed = (src: string) => setFailed((f) => ({ ...f, [src]: true }));

  const step = () => ((scroller.current?.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0) + GAP;
  const onScroll = () => {
    const s = step();
    if (s > GAP) setActive(Math.min(n - 1, Math.round((scroller.current?.scrollLeft ?? 0) / s)));
  };
  const goTo = (i: number) => scroller.current?.scrollTo({ left: Math.max(0, Math.min(n - 1, i)) * step(), behavior: "smooth" });

  // SEO
  useEffect(() => {
    if (!study) { document.title = "Studi kasus tidak ditemukan"; return; }
    document.title = `${study.name} — Studi Kasus Pixolve`;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = study.text;
  }, [study]);

  // Reading progress + scroll spy
  useEffect(() => {
    const onProgress = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
      for (const id of ["overview", "challenge", "solution", "results"]) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) { setActiveSection(id); break; }
        }
      }
    };
    window.addEventListener("scroll", onProgress, { passive: true });
    return () => window.removeEventListener("scroll", onProgress);
  }, []);

  // Keyboard for lightbox
  useEffect(() => {
    if (open === null || n === 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % n));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + n) % n));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, n]);

  if (!study) {
    return (
      <main className="grid min-h-screen place-items-center px-5 text-center" data-testid="case-not-found">
        <div>
          <p className="cs-eyebrow text-[#0e9f85]">404</p>
          <h1 className="mt-3 text-3xl font-bold text-[#002365]">Studi kasus tidak ditemukan</h1>
          <Link to="/portofolio" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#002365] px-6 py-3 text-sm font-semibold text-white">
            <ArrowLeft className="size-4" /> Kembali ke portofolio
          </Link>
        </div>
      </main>
    );
  }

  const idx = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies.length > 1 ? caseStudies[(idx + 1) % caseStudies.length] : null;
  const cover = study.image && !failed[study.image] ? { src: study.image, alt: study.name } : undefined;
  const heroImg = gallery[0] ?? cover;
  const aboutImg = gallery[1] ?? gallery[0] ?? cover;
  const about = study.about ?? [study.text];
  const features = study.features ?? [];
  const techStack = study.techStack ?? [];
  const tags = study.tags ?? [];
  const related = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 3);

  const heroStats = ([["Status", study.status], ["Tahun", study.year], ["Tipe", study.type]] as [string, string | undefined][]).filter(([, v]) => v) as [string, string][];
  return (
    <main className="min-h-screen bg-white" data-testid="case-study-page">
      {/* Reading progress */}
      <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
        <div className="h-full bg-[#ffe400] transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <Header />

      {/* HERO */}
      <section className="cs-ink relative flex min-h-[92vh] items-end overflow-hidden">
        {heroImg && <img src={heroImg.src} alt={heroImg.alt} onError={() => markFailed(heroImg.src)} className="absolute inset-0 size-full scale-105 object-cover opacity-45" />}
        <div className="absolute inset-0 text-white opacity-[0.07]" style={{ backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00102f] via-[#00102f]/70 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-32 pt-44 lg:px-8">
          <div className="cs-rise mt-6">
            <div className="flex flex-wrap items-center gap-3">
              {study.status && (
                <span className="cs-accent-grad inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-white" data-testid="case-status">
                  <span className="size-1.5 animate-pulse rounded-full bg-white" /> {study.status}
                </span>
              )}
              {study.year && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/80">
                  <Calendar className="size-3" /> {study.year}
                </span>
              )}
              {study.type && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/80">
                  <Layers className="size-3" /> {study.type}
                </span>
              )}
            </div>
            <h1 className="mt-7 max-w-4xl text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-7xl lg:text-[5.5rem]" data-testid="case-title">{study.name}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{study.text}</p>

            {/* Hero stats */}
            {heroStats.length > 0 && (
              <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4" data-testid="case-hero-stats">
                {heroStats.map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">{label}</p>
                    <p className="mt-2 text-xl font-bold text-white">{value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* STICKY SIDE NAV */}
      <div className="sticky top-20 z-40 hidden border-b border-slate-100 bg-white/95 backdrop-blur lg:block">
        <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-8 py-3 text-sm">
          
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => { navigator.share?.({ title: study.name, url: window.location.href }); }}
              className="grid size-9 place-items-center rounded-full border border-slate-200 text-slate-500 hover:border-[#002365] hover:text-[#002365]"
              aria-label="Bagikan"
            >
              <Share2 className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* TENTANG */}
      <section id="tentang" className="mx-auto grid max-w-6xl scroll-mt-32 items-center gap-16 px-5 py-28 lg:grid-cols-2 lg:px-8" data-testid="case-about">
        <div className="relative">
          {aboutImg ? (
            <img src={aboutImg.src} alt={aboutImg.alt} loading="lazy" onError={() => markFailed(aboutImg.src)} className="cs-shadow-float aspect-[4/3] w-full rounded-3xl object-cover" />
          ) : (
            <WindowMock name={study.name} />
          )}
        </div>
        <div>
          <p className="cs-eyebrow text-[#0e9f85]">Tentang proyek</p>
          <h2 className="mt-4 text-3xl font-bold text-[#002365] sm:text-4xl">Kenali {study.name}</h2>
          <div className="mt-6 space-y-5 text-[17px] leading-8 text-slate-600">{about.map((p) => <p key={p}>{p}</p>)}</div>
          {tags.length > 0 && <div className="mt-7 flex flex-wrap gap-2">{tags.map((t) => <span key={t} className="rounded-full bg-[#eef3f9] px-3.5 py-1.5 text-xs font-semibold text-[#002365]">{t}</span>)}</div>}
        </div>
      </section>

      {/* PROBLEM / SOLUTION / RESULT */}
      <section id="pendekatan" className="scroll-mt-32 bg-[#f8fafc] px-5 py-28 lg:px-8" data-testid="case-approach">
        <div className="mx-auto max-w-6xl">
          {(study.beforeImage || study.afterImage) && (
          <div className="mt-16">
            <p className="mb-5 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
              Sebelum vs Sesudah — geser untuk membandingkan
            </p>
            <BeforeAfter
              beforeSrc={study.beforeImage}
              afterSrc={study.afterImage}
              beforeLabel="Versi lama"
              afterLabel="Versi baru"
            />
          </div>
        )}
        </div>
      </section>

      {/* GALERI */}
      {n > 0 && (
        <section id="galeri" className="scroll-mt-32 bg-[#eef3f9] py-28" data-testid="case-gallery">
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="cs-eyebrow text-[#0e9f85]">Galeri</p>
                <h2 className="mt-4 text-3xl font-bold text-[#002365] sm:text-4xl">Lihat langsung tampilannya</h2>
              </div>
              <div className="hidden gap-2 sm:flex">
                <button onClick={() => goTo(active - 1)} aria-label="Sebelumnya" className="cs-shadow-soft grid size-11 place-items-center rounded-full bg-white text-[#002365] transition-transform hover:-translate-y-0.5"><ChevronLeft className="size-5" /></button>
                <button onClick={() => goTo(active + 1)} aria-label="Berikutnya" className="cs-shadow-soft grid size-11 place-items-center rounded-full bg-[#002365] text-white transition-transform hover:-translate-y-0.5"><ChevronRight className="size-5" /></button>
              </div>
            </div>
          </div>
          <div ref={scroller} onScroll={onScroll} className="cs-no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 lg:px-[max(2rem,calc((100vw-72rem)/2+2rem))]">
            {gallery.map((g, i) => (
              <button key={g.src} onClick={() => setOpen(i)} className="cs-shadow-card group w-[85%] shrink-0 snap-start overflow-hidden rounded-3xl bg-white p-3 text-left transition-all hover:-translate-y-1 hover:shadow-2xl sm:w-[46%] lg:w-[31%]" data-testid={`case-image-${i + 1}`}>
                <div className="overflow-hidden rounded-2xl">
                  <img src={g.src} alt={g.alt} loading="lazy" onError={() => markFailed(g.src)} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-center justify-between px-2 pb-1 pt-4">
                  <p className="text-sm font-semibold text-[#002365]">{g.alt}</p>
                  <span className="text-xs font-semibold text-[#0e9f85]">Perbesar</span>
                </div>
              </button>
            ))}
          </div>
          {n > 1 && (
            <div className="mt-8 flex justify-center gap-2" data-testid="case-dots">
              {gallery.map((g, i) => <button key={g.src} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} className={`h-2 rounded-full transition-all ${i === active ? "w-7 bg-[#002365]" : "w-2 bg-[#002365]/25"}`} />)}
            </div>
          )}
        </section>
      )}

      {/* FITUR */}
      {features.length > 0 && (
        <section id="fitur" className="mx-auto max-w-6xl scroll-mt-32 px-5 py-28 lg:px-8" data-testid="case-features">
          <p className="cs-eyebrow text-[#0e9f85]">Fitur utama</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold text-[#002365] sm:text-4xl">Apa yang membuatnya berbeda</h2>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => {
              const [title, ...rest] = f.split(":");
              return (
                <li key={f} className="rounded-3xl border border-slate-200 bg-white p-7 transition-all hover:-translate-y-1 hover:border-[#0e9f85]/40 hover:shadow-xl">
                  <span className="grid size-11 place-items-center rounded-2xl bg-[#0e9f85]/10 text-[#0e9f85]"><Check className="size-5" /></span>
                  <p className="mt-5 font-semibold text-[#002365]">{rest.length ? title : f}</p>
                  {rest.length > 0 && <p className="mt-2 text-sm leading-6 text-slate-600">{rest.join(":").trim()}</p>}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* STACK */}
      {techStack.length > 0 && (
        <section id="stack" className="cs-ink scroll-mt-32 px-5 py-28 lg:px-8" data-testid="case-techstack">
          <div className="mx-auto max-w-6xl">
            <p className="cs-eyebrow text-[#5eead4]">Tech stack</p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Dibangun dengan</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {techStack.map((g) => (
                <div key={g.label} className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
                  <p className="cs-eyebrow text-white/50">{g.label}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {g.items.map((it) => <span key={it} className="rounded-xl bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">{it}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED CASE STUDIES */}
      <section className="bg-[#eef3f9] px-5 py-28 lg:px-8" data-testid="case-related">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="cs-eyebrow text-[#0e9f85]">Studi kasus lain</p>
              <h2 className="mt-4 text-3xl font-bold text-[#002365] sm:text-4xl">Lihat proyek lainnya</h2>
            </div>
            <Link to="/portofolio" className="inline-flex items-center gap-2 text-sm font-bold text-[#002365] hover:text-[#0e9f85]">
              Semua portofolio <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/portofolio/${r.slug}`}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  {r.image ? (
                    <img
                      src={r.image}
                      alt={r.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className={`flex h-full items-center justify-center bg-gradient-to-br ${r.color}`}>
                      <Building2 className="size-10 text-[#002365]" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{r.type ?? "Proyek"}</p>
                  <h3 className="mt-2 text-xl font-bold text-[#002365] transition-colors group-hover:text-[#0e9f85]">{r.name}</h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{r.text}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs font-semibold text-[#0e9f85]">{r.result}</span>
                    <ArrowUpRight className="size-4 text-[#002365] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="kontak" className="scroll-mt-32 bg-[linear-gradient(180deg,#002365_0%,#001a4d_60%,#00102f_100%)] px-5 py-24 text-white lg:px-8" data-testid="case-cta">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <p className="cs-eyebrow text-[#ffe400]">Punya tantangan serupa?</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Mari kita rancang solusinya bersama.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-blue-100">
                Konsultasi 60 menit gratis. Anda pulang dengan ringkasan kebutuhan dan
                indikasi budget — tanpa kewajiban lanjut.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/#quote-form" className="inline-flex items-center gap-2 rounded-full bg-[#ffe400] px-7 py-4 text-sm font-bold text-[#00153d] transition-colors hover:bg-white">
                  Konsultasi gratis <ArrowUpRight className="size-4" />
                </Link>
                <Link to="/portofolio" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-bold text-white hover:border-[#ffe400] hover:text-[#ffe400]">
                  Lihat portofolio lain
                </Link>
              </div>
            </div>

            {next && (
              <Link
                to={`/portofolio/${next.slug}`}
                className="group rounded-3xl border border-white/15 bg-white/5 p-7 backdrop-blur transition-colors hover:border-[#ffe400]"
                data-testid="case-next"
              >
                <p className="cs-eyebrow text-white/50">Proyek berikutnya</p>
                <p className="mt-3 text-2xl font-bold text-white">{next.name}</p>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-blue-100">{next.text}</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xs font-semibold text-[#ffe400]">{next.result}</span>
                  <ArrowUpRight className="size-5 text-white transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer />

      {/* FLOATING SHARE (mobile) */}
      <button
        onClick={() => { navigator.share?.({ title: study.name, url: window.location.href }); }}
        className="fixed bottom-24 right-5 z-40 grid size-12 place-items-center rounded-full bg-[#002365] text-white shadow-2xl transition-transform hover:scale-105 lg:hidden"
        aria-label="Bagikan studi kasus"
      >
        <Share2 className="size-5" />
      </button>

      {/* LIGHTBOX */}
      {open !== null && gallery[open] && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#00102f]/90 p-4 backdrop-blur-sm" onClick={() => setOpen(null)} role="dialog" aria-modal data-testid="case-lightbox">
          <button className="absolute right-5 top-5 text-white" onClick={() => setOpen(null)} aria-label="Tutup"><X className="size-7" /></button>
          <button className="absolute left-5 top-1/2 -translate-y-1/2 grid size-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20" onClick={(e) => { e.stopPropagation(); setOpen((i) => (i === null ? i : (i - 1 + n) % n)); }} aria-label="Sebelumnya"><ChevronLeft className="size-6" /></button>
          <button className="absolute right-5 top-1/2 -translate-y-1/2 grid size-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20" onClick={(e) => { e.stopPropagation(); setOpen((i) => (i === null ? i : (i + 1) % n)); }} aria-label="Berikutnya"><ChevronRight className="size-6" /></button>
          <img src={gallery[open].src} alt={gallery[open].alt} className="cs-shadow-float max-h-[85vh] max-w-full rounded-2xl" onClick={(e) => e.stopPropagation()} />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-4 py-2 text-xs text-white backdrop-blur">
            {gallery[open].alt} · {open + 1} / {n}
          </p>
        </div>
      )}
    </main>
  );
}