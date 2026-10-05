import { ArrowLeft, Check } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const stack = ["Figma", "Maze", "Design Tokens"];

const deliverables = [
  {
    title: "User research & usability testing",
    detail: "Keputusan desain diambil dari perilaku pengguna nyata, bukan preferensi internal.",
  },
  {
    title: "Wireframe, prototipe interaktif, user flow",
    detail: "Anda bisa mencoba alurnya sebelum satu baris kode ditulis.",
  },
  {
    title: "Design system & komponen siap kode",
    detail: "Token warna, tipografi, dan komponen yang langsung bisa dipakai tim engineer.",
  },
  {
    title: "Audit UX dan rekomendasi peningkatan konversi",
    detail: "Temuan yang bisa langsung dieksekusi — diurutkan berdasarkan dampak bisnis.",
  },
];

// Illustrative design metrics used in the hero mockup.
const metrics = [
  { label: "Usability score", value: "89", note: "SUS score rata-rata" },
  { label: "Task success", value: "94%", note: "Pada uji coba terakhir" },
  { label: "Design tokens", value: "128", note: "Komponen siap kode" },
];

export default function UiUxDesign() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
      <Header />

      {/* Hero */}
      <section className="bg-[#00153d] pt-24 pb-24 text-white sm:pt-32 sm:pb-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8">
          <div>
            <a
              href="/#layanan"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-200 hover:text-[#ffe400]"
            >
              <ArrowLeft className="size-4" /> Kembali ke layanan
            </a>

            <h1 className="mt-8 max-w-xl font-heading text-4xl font-bold leading-[1.1] sm:text-5xl">
              Interface yang terasa jelas sejak klik pertama.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-blue-100">
              Riset, alur, dan design system yang membuat produk terasa intuitif — dan
              membuat tim Anda bergerak lebih cepat setelahnya.
            </p>
          </div>

          {/* Design mockup — menampilkan artefak desain & design tokens */}
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-1 shadow-2xl shadow-black/40">
            <div className="flex items-center gap-1.5 rounded-t-lg bg-white/[0.06] px-4 py-3">
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="ml-3 truncate text-xs text-blue-200/70">
                pixolve.design — Figma / Design System v2
              </span>
            </div>
            <div className="grid gap-px bg-white/10 p-px sm:grid-cols-3">
              {metrics.map((m) => (
                <div key={m.label} className="bg-[#00153d] px-4 py-7 text-center">
                  <p className="font-heading text-3xl font-bold text-[#ffe400]">{m.value}</p>
                  <p className="mt-2 text-xs font-semibold text-white">{m.label}</p>
                  <p className="mt-1 text-[11px] leading-tight text-blue-200/60">{m.note}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 bg-[#00153d] p-4">
              <p className="mb-3 text-[10px] uppercase tracking-widest text-blue-200/60">
                Design tokens
              </p>
              <div className="flex flex-wrap gap-2">
                {["#00153d", "#002365", "#ffe400", "#0e9f85", "#75a8ff", "#f8fafc"].map((color) => (
                  <span
                    key={color}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] text-blue-100"
                  >
                    <span
                      className="size-2.5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    {color}
                  </span>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-[11px] text-blue-200/70">
                <p className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  Typography · Inter Variable
                </p>
                <p className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  Spacing · 4 / 8 / 16 / 24
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack + deliverables */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <h2 className="font-heading text-2xl font-bold text-[#00153d]">Tools yang dipakai</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Semua file desain diserahkan dalam format yang bisa langsung dipakai tim
              engineer Anda — bukan sekadar preview.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-[#002365]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-[#00153d]">Yang Anda terima</h2>
            <ul className="mt-6 divide-y divide-slate-200 border-t border-slate-200">
              {deliverables.map((item) => (
                <li key={item.title} className="flex items-start gap-4 py-5">
                  <Check className="mt-1 size-4 shrink-0 text-[#0e9f85]" strokeWidth={3} />
                  <div>
                    <p className="text-sm font-semibold text-[#002365]">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA — full-width section, gradient menyatu ke footer */}
      <section className="bg-[linear-gradient(180deg,#002365_0%,#001a4d_60%,#00102f_100%)] px-5 py-20 text-white sm:py-28 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">
              Siap membuat produk Anda terasa jelas?
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
              Konsultasi 60 menit gratis. Anda pulang dengan ringkasan kebutuhan dan
              indikasi budget, tanpa kewajiban lanjut.
            </p>
          </div>
          <a
            href="/#quote-form"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#ffe400] px-7 py-4 text-sm font-bold text-[#00153d] transition-colors hover:bg-white"
          >
            Konsultasi gratis
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}