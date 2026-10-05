import { ArrowLeft, Check } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const stack = ["React", "TypeScript", "Node.js", "PostgreSQL"];

const deliverables = [
  {
    title: "Landing page & company profile",
    detail: "Dirancang untuk konversi, bukan sekadar tampil bagus.",
  },
  {
    title: "Aplikasi web & SaaS multi-tenant",
    detail: "Arsitektur yang siap menambah pelanggan tanpa menulis ulang sistem.",
  },
  {
    title: "Integrasi payment gateway & API",
    detail: "Midtrans, Xendit, atau API pihak ketiga sesuai kebutuhan bisnis Anda.",
  },
  {
    title: "Optimasi Core Web Vitals & SEO teknis",
    detail: "Skor performa yang nyata, bukan janji di proposal.",
  },
];

const vitals = [
  { label: "LCP", value: "1.2s", note: "Largest Contentful Paint" },
  { label: "INP", value: "84ms", note: "Interaction to Next Paint" },
  { label: "CLS", value: "0.02", note: "Cumulative Layout Shift" },
];

export default function WebDevelopment() {
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
              Website dan platform yang tetap cepat setelah Anda mengunjungi kantor kami.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-blue-100">
              Website korporat, platform SaaS, dan dashboard internal, dibangun untuk tetap
              cepat dan mudah dirawat setelah proyek selesai — bukan hanya di hari peluncuran.
            </p>
          </div>

          {/* Browser mockup */}
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-1 shadow-2xl shadow-black/40">
            <div className="flex items-center gap-1.5 rounded-t-lg bg-white/[0.06] px-4 py-3">
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="ml-3 truncate text-xs text-blue-200/70">
                yourcompany.com — Lighthouse report
              </span>
            </div>
            <div className="grid grid-cols-3 gap-px bg-white/10 p-px">
              {vitals.map((v) => (
                <div key={v.label} className="bg-[#00153d] px-4 py-7 text-center">
                  <p className="font-heading text-3xl font-bold text-[#ffe400]">{v.value}</p>
                  <p className="mt-2 text-xs font-semibold text-white">{v.label}</p>
                  <p className="mt-1 text-[11px] leading-tight text-blue-200/60">{v.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack + deliverables */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <h2 className="font-heading text-2xl font-bold text-[#00153d]">Tech stack</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Kami memilih tools yang stabil dan punya komunitas besar, supaya tim internal
              Anda mudah melanjutkan proyek di masa depan.
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
              Siap mulai proyek web Anda?
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