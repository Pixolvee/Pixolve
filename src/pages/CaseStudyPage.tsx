// src/pages/CaseStudyPage.tsx
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
  ArrowLeft, Check, ChevronLeft, ChevronRight, X,
  Calendar, Layers, Share2, ArrowRight, Building2, Loader2,
} from "lucide-react"
import { useCaseStudies, useCaseStudy } from "@/lib/hooks/useCaseStudies"
import "@/styles/ase-study.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

const MIN_SLIDES = 5
const FILL_WITH_SAMPLES = true

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

/** Tipe lokal untuk slide: alt wajib (sudah dinormalisasi) */
type Slide = { src: string; alt: string }

/**
 * Desain contoh (SVG) dalam warna brand — dipakai sebagai pengisi sampai gambar asli tersedia.
 * variant: 0 landing page · 1 dashboard · 2 aplikasi mobile · 3 katalog · 4 formulir/detail
 */
function sampleDesign(name: string, variant: number): Slide {
  const NAVY = "#002365", TEAL = "#0e9f85", YEL = "#ffe400", SOFT = "#eef3f9"
  const o: string[] = []
  const R = (x: number, y: number, w: number, h: number, f: string, rx = 10, op = 1) =>
    o.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" opacity="${op}"/>`)
  const C = (cx: number, cy: number, r: number, f: string, op = 1) =>
    o.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" opacity="${op}"/>`)
  const T = (x: number, y: number, s: string, size = 14, f = NAVY, w = 700, a = "start") =>
    o.push(`<text x="${x}" y="${y}" font-size="${size}" font-weight="${w}" fill="${f}" text-anchor="${a}" font-family="Arial,sans-serif">${esc(s)}</text>`)

  R(0, 0, 800, 600, SOFT, 0)
  const phones = variant === 2
  if (!phones) {
    R(40, 36, 720, 528, "#fff", 20)
    R(40, 36, 720, 44, NAVY, 20)
    R(40, 60, 720, 20, NAVY, 0)
    C(66, 58, 6, "#fff", 1); C(86, 58, 6, "#fff", 0.6); C(106, 58, 6, "#fff", 0.3)
    R(250, 48, 300, 20, "#fff", 10, 0.18)
    T(400, 62, name, 11, "#fff", 600, "middle")
  }

  if (variant === 0) {
    T(72, 116, "BRAND", 16); [0, 1, 2, 3].forEach((i) => T(470 + i * 70, 116, ["Beranda", "Menu", "Tentang", "Kontak"][i], 11, NAVY, 600))
    R(72, 160, 330, 38, NAVY, 8); R(72, 208, 250, 38, NAVY, 8)
    R(72, 266, 280, 12, "#94a3b8", 6, 0.6); R(72, 288, 230, 12, "#94a3b8", 6, 0.6)
    R(72, 330, 150, 46, YEL, 23); T(147, 359, "Mulai", 14, "#00153d", 700, "middle")
    C(590, 260, 118, TEAL, 0.14); C(640, 210, 54, NAVY, 0.85); C(556, 316, 36, YEL, 0.95)
    ;[0, 1, 2].forEach((i) => { R(72 + i * 224, 420, 204, 112, SOFT, 16); R(90 + i * 224, 440, 90, 12, NAVY, 6, 0.7); R(90 + i * 224, 464, 150, 10, "#94a3b8", 5, 0.6); R(90 + i * 224, 484, 120, 10, "#94a3b8", 5, 0.6) })
  } else if (variant === 1) {
    R(40, 80, 150, 484, SOFT, 0)
    ;["Dashboard", "Transaksi", "Produk", "Laporan", "Pengaturan"].forEach((s2, i) => { if (i === 0) R(54, 104, 122, 32, NAVY, 10); T(70, 125 + i * 44, s2, 13, i === 0 ? "#fff" : NAVY, 600) })
    T(218, 118, "Ringkasan", 22)
    ;[["PENDAPATAN", "Rp 12,4 jt"], ["TRANSAKSI", "1.284"], ["LABA", "+24%"]].forEach(([a, b], i) => { R(218 + i * 180, 142, 164, 84, SOFT, 14); T(234 + i * 180, 170, a, 10, "#64748b", 700); T(234 + i * 180, 208, b, 24) })
    R(218, 246, 524, 296, "#f8fafc", 16)
    ;[60, 100, 80, 140, 120, 180, 150, 210, 170, 230].forEach((h, i) => R(244 + i * 49, 520 - h, 30, h, i % 3 === 0 ? TEAL : NAVY, 6, 0.35 + i * 0.06))
  } else if (variant === 2) {
    ;[[190, 0], [450, 1]].forEach(([x, k]) => {
      R(x, 60, 170, 480, NAVY, 30); R(x + 8, 70, 154, 460, "#fff", 24); R(x + 58, 78, 54, 8, NAVY, 4, 0.25)
      R(x + 22, 108, 126, 14, NAVY, 7, 0.85); R(x + 22, 132, 90, 10, "#94a3b8", 5, 0.6)
      if (k === 0) { R(x + 22, 164, 126, 120, TEAL, 16, 0.18); C(x + 85, 224, 36, TEAL, 0.5); [0, 1, 2].forEach((i) => R(x + 22, 304 + i * 56, 126, 44, SOFT, 12)) }
      else { [0, 1, 2, 3].forEach((i) => { C(x + 40, 188 + i * 64, 18, i % 2 ? TEAL : NAVY, 0.75); R(x + 70, 176 + i * 64, 78, 10, NAVY, 5, 0.7); R(x + 70, 194 + i * 64, 56, 8, "#94a3b8", 4, 0.6) }); R(x + 22, 454, 126, 40, YEL, 20) }
      R(x + 22, 500, 126, 10, "#e2e8f0", 5)
    })
  } else if (variant === 3) {
    T(72, 118, "Katalog", 22); R(560, 98, 168, 30, SOFT, 15)
    ;[0, 1, 2, 3, 4, 5].forEach((i) => {
      const x = 72 + (i % 3) * 224, y = 150 + Math.floor(i / 3) * 198
      R(x, y, 204, 180, "#fff", 16); R(x, y, 204, 180, SOFT, 16, 0.6); R(x + 10, y + 10, 184, 90, i % 2 ? TEAL : NAVY, 12, 0.18 + (i % 3) * 0.1)
      C(x + 102, y + 55, 22, i % 2 ? TEAL : NAVY, 0.6); R(x + 12, y + 114, 110, 12, NAVY, 6, 0.8); R(x + 12, y + 136, 80, 10, "#94a3b8", 5, 0.6); R(x + 130, y + 138, 60, 24, YEL, 12)
    })
  } else {
    R(72, 112, 300, 420, TEAL, 20, 0.14); C(222, 280, 90, NAVY, 0.8); C(300, 200, 36, YEL, 0.95); C(150, 380, 26, TEAL, 0.7)
    T(410, 140, "Hubungi kami", 24)
    ;[0, 1, 2].forEach((i) => { R(410, 168 + i * 72, 318, 52, "#fff", 12); R(410, 168 + i * 72, 318, 52, SOFT, 12, 0.7); R(426, 188 + i * 72, 90 + i * 24, 10, "#94a3b8", 5, 0.7) })
    R(410, 392, 318, 90, SOFT, 12); R(410, 502, 150, 44, NAVY, 22); T(485, 530, "Kirim", 14, "#fff", 700, "middle")
  }

  if (!phones) T(748, 552, "DESAIN CONTOH", 9, NAVY, 700, "end")
  else T(400, 570, "DESAIN CONTOH", 9, NAVY, 700, "middle")
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">${o.join("")}</svg>`
  return { src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`, alt: `Desain contoh ${variant + 1} · ${name}` }
}

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
  )
}

export default function CaseStudyPage() {
  const { slug = "" } = useParams<{ slug: string }>()
  const { data: study, isLoading: studyLoading } = useCaseStudy(slug)
  const { data: allCaseStudies = [] } = useCaseStudies()

  const [open, setOpen] = useState<number | null>(null)
  const [failed, setFailed] = useState<Record<string, boolean>>({})
  const [progress, setProgress] = useState(0)

  // ============================================================
  // GAMBAR UTAMA (di samping "Tentang proyek") → dari thumbnail
  // Prioritas: thumbnail → image → undefined
  // ============================================================
  const mainImage: Slide | undefined =
    study?.thumbnail && !failed[study.thumbnail]
      ? { src: study.thumbnail, alt: study.name }
      : study?.image && !failed[study.image]
        ? { src: study.image, alt: study.name }
        : undefined

  // ============================================================
  // GALERI (grid masonry di bawah) → dari gallery (Supabase)
  // ============================================================
  const rawGallery = (Array.isArray(study?.gallery) ? study.gallery : []) as unknown as Slide[]
  const galleryFromDb = rawGallery.filter((g) => g?.src && !failed[g.src])

  const baseSlides: Slide[] =
    galleryFromDb.length > 0
      ? galleryFromDb
      : ([
          study?.image && { src: study.image, alt: `Tampilan ${study.name}` },
          study?.afterImage && { src: study.afterImage, alt: `Antarmuka ${study.name}` },
        ].filter(Boolean) as Slide[])

  const realSlides = baseSlides.filter((g, i, a) => a.findIndex((x) => x.src === g.src) === i)

  const order =
    study?.category === "Mobile App"
      ? [2, 0, 1, 3, 4]
      : study?.category === "Data Science & AI"
        ? [1, 0, 3, 2, 4]
        : [0, 1, 3, 4, 2]

  const samples =
    FILL_WITH_SAMPLES && study
      ? order.slice(0, Math.max(0, MIN_SLIDES - realSlides.length)).map((v) => sampleDesign(study.name, v))
      : []

  const gallery: Slide[] = [...realSlides, ...samples]
  const n = gallery.length
  const markFailed = (src: string) => setFailed((f) => ({ ...f, [src]: true }))

  // SEO
  useEffect(() => {
    if (!study) { document.title = "Studi kasus tidak ditemukan"; return }
    document.title = `${study.name} — Studi Kasus Pixolve`
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta) }
    meta.content = study.textContent || study.text || study.text_content || ""
  }, [study])

  // Reading progress
  useEffect(() => {
    const onProgress = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0)
    }
    window.addEventListener("scroll", onProgress, { passive: true })
    return () => window.removeEventListener("scroll", onProgress)
  }, [])

  // Keyboard for lightbox
  useEffect(() => {
    if (open === null || n === 0) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null)
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % n))
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + n) % n))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, n])

  if (studyLoading) {
    return (
      <main className="grid min-h-screen place-items-center px-5 text-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-10 animate-spin text-[#002365]/40" />
          <p className="text-sm text-slate-500">Memuat studi kasus…</p>
        </div>
      </main>
    )
  }

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
    )
  }

  const textContent = study.text_content || study.textContent || study.text || ""
  const features = study.features ?? []
  const techStack = study.techStack ?? []
  const tags = study.tags ?? []
  const related = allCaseStudies.filter((c) => c.slug !== study.slug).slice(0, 2)

  return (
    <main className="min-h-screen bg-white" data-testid="case-study-page">
      {/* Reading progress */}
      <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
        <div className="h-full bg-[#ffe400] transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <Header />

      {/* HEADER & TENTANG PROYEK */}
      <section id="tentang" className="mx-auto max-w-6xl px-5 pt-28 pb-14 sm:pt-32 sm:pb-16 lg:px-8" data-testid="case-about">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/portofolio"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-[#002365]"
            >
              <ArrowLeft className="size-3.5" /> Portofolio
            </Link>
            <span className="text-slate-300">/</span>
            {study.category && (
              <span className="inline-flex items-center rounded-full bg-[#002365]/5 px-3 py-1 text-xs font-bold text-[#002365]">
                {study.category}
              </span>
            )}
            {study.type && (
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                <Layers className="size-3 text-slate-400" /> {study.type}
              </span>
            )}
            {study.year && (
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                <Calendar className="size-3 text-slate-400" /> {study.year}
              </span>
            )}
          </div>

          <button
            onClick={() => { navigator.share?.({ title: study.name, url: window.location.href }) }}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-[#002365] hover:text-[#002365] shadow-2xs"
            aria-label="Bagikan"
          >
            <Share2 className="size-3.5" /> Bagikan
          </button>
        </div>

        <h1 className="mt-8 font-heading text-3xl font-extrabold tracking-tight text-[#002365] sm:text-4xl lg:text-5xl" data-testid="case-title">
          {study.name}
        </h1>

        <div className="mt-10 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            {mainImage ? (
              <img
                src={mainImage.src}
                alt={mainImage.alt}
                loading="lazy"
                onError={() => markFailed(mainImage.src)}
                className="cs-shadow-float aspect-[4/3] w-full rounded-3xl bg-slate-50 object-contain"
              />
            ) : (
              <WindowMock name={study.name} />
            )}
          </div>
          <div>
            <p className="cs-eyebrow text-[#0e9f85]">Tentang proyek</p>
            <h2 className="mt-3 text-2xl font-bold text-[#002365] sm:text-3xl">Kenali {study.name}</h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-slate-600 sm:text-[17px] sm:leading-8">
              <p>{textContent}</p>
            </div>
            {tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((t) => <span key={t} className="rounded-full bg-[#eef3f9] px-3.5 py-1.5 text-xs font-semibold text-[#002365]">{t}</span>)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* GALERI */}
      {n > 0 && (
        <section id="galeri" className="scroll-mt-32 bg-[#eef3f9] py-14 sm:py-16" data-testid="case-gallery">
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-amber-500">Eksplorasi Visual</p>
                <h2 className="mt-1 font-heading text-2xl font-bold text-[#002365] sm:text-3xl">Galeri Antarmuka & Detail</h2>
              </div>
              <p className="max-w-md text-xs sm:text-sm text-slate-500 sm:text-right">
                Klik gambar untuk memperbesar dan melihat detail antarmuka resolusi penuh.
              </p>
            </div>

            <div className="mt-8 columns-1 gap-5 sm:columns-2 md:columns-3 lg:columns-4 [column-fill:_balance]">
              {gallery.map((g, i) => (
                <div
                  key={`${g.src}-${i}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => setOpen(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(i) }
                  }}
                  className="group mb-5 break-inside-avoid cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0e9f85]/40 hover:shadow-xl sm:p-3"
                  data-testid={`case-image-${i + 1}`}
                >
                  <div className="overflow-hidden rounded-xl bg-slate-100">
                    <img
                      src={g.src}
                      alt={g.alt}
                      loading="lazy"
                      onError={() => markFailed(g.src)}
                      className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex items-center justify-between px-1.5 pb-1 pt-3">
                    <p className="truncate text-xs font-semibold text-[#002365] sm:text-sm">{g.alt}</p>
                    <span className="shrink-0 text-[11px] font-semibold text-[#0e9f85] transition-colors group-hover:underline sm:text-xs">Perbesar</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FITUR */}
      {features.length > 0 && (
        <section id="fitur" className="mx-auto max-w-6xl scroll-mt-32 px-5 py-16 lg:px-8" data-testid="case-features">
          <p className="cs-eyebrow text-[#0e9f85]">Fitur utama</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold text-[#002365] sm:text-4xl">Apa yang membuatnya berbeda</h2>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => {
              const [title, ...rest] = f.split(":")
              return (
                <li key={f} className="rounded-3xl border border-slate-200 bg-white p-7 transition-all hover:-translate-y-1 hover:border-[#0e9f85]/40 hover:shadow-xl">
                  <span className="grid size-11 place-items-center rounded-2xl bg-[#0e9f85]/10 text-[#0e9f85]"><Check className="size-5" /></span>
                  <p className="mt-5 font-semibold text-[#002365]">{rest.length ? title : f}</p>
                  {rest.length > 0 && <p className="mt-2 text-sm leading-6 text-slate-600">{rest.join(":").trim()}</p>}
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {/* TECH STACK */}
      {techStack.length > 0 && (
        <section id="stack" className="cs-ink scroll-mt-32 px-5 py-16 lg:px-8" data-testid="case-techstack">
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
      <section className="border-t border-slate-100 bg-[#f8fafc] px-5 py-14 lg:px-8" data-testid="case-related">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-500">Eksplorasi Lain</p>
              <h2 className="mt-1 font-heading text-2xl font-bold text-[#002365] sm:text-3xl">Karya Terkait Lainnya</h2>
            </div>
            <Link to="/portofolio" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-[#002365]">
              Lihat semua karya <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/portofolio/${r.slug}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md sm:p-5"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:size-22">
                    {r.image ? (
                      <img src={r.image} alt={r.name} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className={`flex size-full items-center justify-center bg-gradient-to-br ${r.color}`}>
                        <Building2 className="size-8 text-[#002365]" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500">
                      {r.type ?? r.category ?? "WEB APP"}
                    </span>
                    <h3 className="mt-1 truncate text-base font-bold text-[#002365] transition-colors group-hover:text-amber-600 sm:text-lg">
                      {r.name}
                    </h3>
                    <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                      {r.textContent || r.text || r.text_content}
                    </p>
                  </div>
                </div>
                <ArrowRight className="size-4.5 shrink-0 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-[#002365]" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* FLOATING SHARE (mobile) */}
      <button
        onClick={() => { navigator.share?.({ title: study.name, url: window.location.href }) }}
        className="fixed bottom-24 right-5 z-40 grid size-12 place-items-center rounded-full bg-[#002365] text-white shadow-2xl transition-transform hover:scale-105 lg:hidden"
        aria-label="Bagikan studi kasus"
      >
        <Share2 className="size-5" />
      </button>

      {/* LIGHTBOX */}
      {open !== null && gallery[open] && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#00102f]/90 p-4 backdrop-blur-sm" onClick={() => setOpen(null)} role="dialog" aria-modal data-testid="case-lightbox">
          <button className="absolute right-5 top-5 text-white" onClick={() => setOpen(null)} aria-label="Tutup"><X className="size-7" /></button>
          <button className="absolute left-5 top-1/2 -translate-y-1/2 grid size-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20" onClick={(e) => { e.stopPropagation(); setOpen((i) => (i === null ? i : (i - 1 + n) % n)) }} aria-label="Sebelumnya"><ChevronLeft className="size-6" /></button>
          <button className="absolute right-5 top-1/2 -translate-y-1/2 grid size-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20" onClick={(e) => { e.stopPropagation(); setOpen((i) => (i === null ? i : (i + 1) % n)) }} aria-label="Berikutnya"><ChevronRight className="size-6" /></button>
          <img src={gallery[open].src} alt={gallery[open].alt} className="cs-shadow-float max-h-[85vh] max-w-full rounded-2xl" onClick={(e) => e.stopPropagation()} />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-4 py-2 text-xs text-white backdrop-blur">
            {gallery[open].alt} · {open + 1} / {n}
          </p>
        </div>
      )}
    </main>
  )
}