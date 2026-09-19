import { ArrowLeft, Check } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const stack = ["React Native", "Flutter", "Firebase"];

const deliverables = [
  {
    title: "Aplikasi cross-platform (React Native / Flutter)",
    detail: "Satu basis kode untuk Android dan iOS — lebih cepat rilis, biaya perawatan lebih rendah.",
  },
  {
    title: "Push notification, offline mode, deep link",
    detail: "Aplikasi tetap berguna saat sinyal lemah, dan tetap terhubung saat sinyal kembali.",
  },
  {
    title: "Integrasi pembayaran & autentikasi biometrik",
    detail: "Face ID, fingerprint, dan payment gateway lokal maupun internasional.",
  },
  {
    title: "Pendampingan submission store & rilis berkala",
    detail: "Kami urus proses review Play Store & App Store, termasuk update rutin setelah rilis.",
  },
];

// Illustrative device metrics used in the hero mockup.
const metrics = [
  { label: "Crash-free", value: "99.8%", note: "Sesi tanpa crash" },
  { label: "Cold start", value: "1.1s", note: "Waktu buka aplikasi" },
  { label: "Rating", value: "4.8★", note: "Rata-rata store rating" },
];

export default function MobileAppDevelopment() {
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
              Aplikasi mobile yang terasa native di Android dan iOS — dari satu basis kode.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-blue-100">
              Aplikasi Android & iOS dari satu basis kode, siap rilis ke Play Store dan
              App Store. Kami bangun untuk dipakai setiap hari, bukan hanya saat demo.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href="/#quote-form"
                className="inline-flex items-center justify-center rounded-full bg-[#ffe400] px-7 py-4 text-sm font-bold text-[#00153d] transition-colors hover:bg-white"
              >
                Minta penawaran
              </a>
              <span className="text-sm text-blue-200">Mulai dari Rp 45 jt</span>
            </div>
          </div>

          {/* Phone mockup — mengangkat konteks mobile dengan metrik kualitas nyata */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-6 rounded-[3rem] bg-[#ffe400]/10 blur-3xl" />
            <div className="relative rounded-[2.25rem] border border-white/15 bg-[#00102f]/80 p-3 shadow-2xl shadow-black/50 backdrop-blur">
              <div className="rounded-[1.75rem] border border-white/10 bg-[#00153d] p-5">
                {/* Status bar */}
                <div className="flex items-center justify-between text-[10px] text-blue-200/70">
                  <span>9:41</span>
                  <span className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-[#7de2ae]" />
                    <span>5G</span>
                  </span>
                </div>

                {/* App header */}
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-blue-200/60">Pixolve App</p>
                    <p className="mt-1 font-heading text-lg font-bold text-white">Dashboard</p>
                  </div>
                  <span className="flex size-9 items-center justify-center rounded-full bg-[#ffe400] text-[#00153d] font-bold text-xs">
                    P
                  </span>
                </div>

                {/* Metrics */}
                <div className="mt-5 grid gap-px overflow-hidden rounded-2xl bg-white/10">
                  {metrics.map((m) => (
                    <div
                      key={m.label}
                      className="flex items-center justify-between bg-[#00153d] px-4 py-4"
                    >
                      <div>
                        <p className="text-xs font-semibold text-white">{m.label}</p>
                        <p className="text-[10px] text-blue-200/60">{m.note}</p>
                      </div>
                      <p className="font-heading text-xl font-bold text-[#ffe400]">{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* Bottom nav */}
                <div className="mt-5 flex items-center justify-around rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] text-blue-200/70">
                  <span className="text-[#ffe400]">Home</span>
                  <span>Activity</span>
                  <span>Profile</span>
                </div>
              </div>
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
              Kami memilih framework yang matang dan dipakai luas, supaya tim internal
              Anda mudah melanjutkan pengembangan setelah rilis.
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
              Siap meluncurkan aplikasi mobile Anda?
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