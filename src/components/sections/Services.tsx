import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="layanan" className="mx-auto max-w-7xl px-5 py-10 sm:py-14 lg:px-8" data-testid="services-section">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Kolom Kiri: Teks pengantar yang padat dan seimbang */}
        <div className="lg:col-span-5" data-testid="services-left-content">
          <span className="inline-flex items-center rounded-full bg-[#002365]/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#002365]">
            Apa yang kami bangun
          </span>
          <h2 className="mt-3.5 font-heading text-2xl font-extrabold leading-snug tracking-tight text-[#002365] sm:text-3xl lg:text-[32px]">
            Dari brief pertama sampai produk yang dipakai.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Satu tim senior untuk menyatukan strategi, desain, engineering, dan kualitas—tanpa handoff yang memperlambat.
          </p>

          <div className="mt-5 space-y-2 text-xs sm:text-[13px] text-slate-700">
            <div className="flex items-center gap-2.5">
              <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-[#002365]/10 text-[#002365]">
                <Check className="size-3" strokeWidth={3} />
              </span>
              <span>Arsitektur modern & siap scale</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-[#002365]/10 text-[#002365]">
                <Check className="size-3" strokeWidth={3} />
              </span>
              <span>Kode bersih dengan kepemilikan 100% milik Anda</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-[#002365]/10 text-[#002365]">
                <Check className="size-3" strokeWidth={3} />
              </span>
              <span>Transparansi delivery di setiap milestone</span>
            </div>
          </div>

          <div className="mt-6">
            <a
              href="#quote-form"
              className="inline-flex items-center gap-2 rounded-full bg-[#002365] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#002365]/90 hover:shadow-sm"
              data-testid="services-consultation-link"
            >
              Diskusikan kebutuhan Anda
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>

        {/* Kolom Kanan: 5 Layanan dalam grid 2 kolom yang proporsional dan tidak kebesaran */}
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:col-span-7" data-testid="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isLast = index === services.length - 1;

            return (
              <div
                key={service.title}
                className={`group rounded-xl border border-slate-200/80 bg-white p-4.5 transition-all duration-200 hover:border-[#002365]/30 hover:shadow-sm ${
                  isLast ? "sm:col-span-2" : ""
                }`}
                data-testid={`service-card-${service.number}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#002365]/5 text-[#002365] transition-colors group-hover:bg-[#002365] group-hover:text-[#ffe400]">
                      <Icon className="size-4" />
                    </span>
                    <h3
                      className="text-sm font-bold text-[#002365] sm:text-base"
                      data-testid={`service-title-${service.number}`}
                    >
                      {service.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-slate-400">
                    {service.number}
                  </span>
                </div>
                <p
                  className="mt-2.5 text-xs leading-relaxed text-slate-600 sm:text-[13px]"
                  data-testid={`service-description-${service.number}`}
                >
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}