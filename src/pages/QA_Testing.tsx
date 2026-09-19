import { ArrowLeft, Check } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const stack = ["Playwright", "Cypress", "k6", "Postman"];

const deliverables = [
  {
    title: "Test plan, test case, dan regression suite",
    detail: "Semua skenario yang penting tertulis rapi — bisa diaudit, bukan hanya di kepala tim.",
  },
  {
    title: "Automation E2E (Playwright / Cypress)",
    detail: "Setiap rilis diuji otomatis sebelum menyentuh pengguna Anda.",
  },
  {
    title: "Load & stress testing (k6)",
    detail: "Kami tahu aplikasi Anda bertahan sampai berapa ribu pengguna bersamaan.",
  },
  {
    title: "Security smoke test & laporan bug terprioritas",
    detail: "Temuan diurutkan berdasarkan dampak, bukan berdasarkan siapa yang menemukan.",
  },
];

// Illustrative QA dashboard metrics used in the hero mockup.
const metrics = [
  { label: "Pass rate", value: "98.4%", note: "Test case otomatis" },
  { label: "Coverage", value: "87%", note: "Critical user flow" },
  { label: "Bugs closed", value: "142", note: "Sprint terakhir" },
];

export default function QaTesting() {
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
              QA yang menutup celah sebelum pengguna menemukannya.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-blue-100">
              Manual, otomatis, dan performa — kami bangun lapisan pengujian yang membuat
              setiap rilis terasa percaya diri, bukan spekulasi.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href="/#quote-form"
                className="inline-flex items-center justify-center rounded-full bg-[#ffe400] px-7 py-4 text-sm font-bold text-[#00153d] transition-colors hover:bg-white"
              >
                Minta penawaran
              </a>
              <span className="text-sm text-blue-200">Mulai dari Rp 12 jt</span>
            </div>
          </div>

          {/* QA dashboard mockup — menunjukkan hasil kerja QA secara konkret */}
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-1 shadow-2xl shadow-black/40">
            <div className="flex items-center gap-1.5 rounded-t-lg bg-white/[0.06] px-4 py-3">
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="ml-3 truncate text-xs text-blue-200/70">
                pixolve.qa — last run: 2 min ago
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
            <div className="grid gap-2 border-t border-white/10 bg-[#00153d] p-4 font-mono text-[11px] leading-6">
              <p className="text-[#7de2ae]">✓ auth.spec.ts — 24 passed</p>
              <p className="text-[#7de2ae]">✓ checkout.spec.ts — 18 passed</p>
              <p className="text-[#ffe400]">● load test — 5,000 VU · p95 240ms</p>
              <p className="text-blue-200/60">→ scheduling next regression: 01:00 WIB</p>
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
              Kami memilih tools yang matang dan populer, supaya tim internal Anda mudah
              menjalankan regression suite yang sama setelah proyek selesai.
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
              Siap merilis dengan lebih percaya diri?
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