import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="layanan" className="mx-auto max-w-7xl px-5 py-12 sm:py-16 lg:px-8" data-testid="services-section">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Kolom Kiri: Judul dan deskripsi */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Apa yang kami bangun"
            title="Dari brief pertama sampai produk yang dipakai."
            body="Satu tim senior untuk menyatukan strategi, desain, engineering, dan kualitas—tanpa handoff yang memperlambat."
          />
          <div className="mt-8">
            <a
              href="#quote-form"
              className="group inline-flex items-center gap-2 rounded-full bg-[#002365] px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#002365]/90 hover:shadow-md"
              data-testid="services-consultation-link"
            >
              Diskusikan kebutuhan Anda
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Kolom Kanan: 5 Layanan */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:col-span-7" data-testid="services-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-300 hover:border-[#002365]/30 hover:shadow-md sm:p-7"
                data-testid={`service-card-${service.number}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#002365]/5 text-[#002365] transition-colors group-hover:bg-[#002365] group-hover:text-[#ffe400]">
                      <Icon className="size-5" />
                    </span>
                    <h3
                      className="font-heading text-lg font-bold text-[#002365] sm:text-xl"
                      data-testid={`service-title-${service.number}`}
                    >
                      {service.title}
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-semibold text-slate-400 transition-colors group-hover:text-[#002365]">
                    {service.number}
                  </span>
                </div>
                <p
                  className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base"
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