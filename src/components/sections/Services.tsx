import { ArrowUpRight, ChevronRight} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="layanan" className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8" data-testid="services-section">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <a href="/layanan/web-development" className="block transition-opacity hover:opacity-80" aria-label="Lihat detail Web Development">
          <SectionHeading eyebrow="Apa yang kami bangun" title="Dari brief pertama sampai produk yang dipakai." body="Satu tim senior untuk menyatukan strategi, desain, engineering, dan kualitas—tanpa handoff yang memperlambat." />
        </a>
        <a href="/layanan/web-development" className="group inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#002365]" data-testid="services-consultation-link">
          Diskusikan kebutuhan Anda <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
      </div>
      <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-5" data-testid="services-grid">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <a key={service.title} href={`/layanan/${service.slug}`} className="group block bg-white p-6 transition-colors hover:bg-[#002365] md:p-7" data-testid={`service-card-${service.number}`}>
              <div className="flex items-start justify-between">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-[#002365]/5 text-[#002365] transition-colors group-hover:bg-[#ffe400] group-hover:text-[#002365]"><Icon className="size-5" /></span>
                <span className="font-mono text-xs text-slate-400 group-hover:text-blue-200">{service.number}</span>
              </div>
              <h3 className="mt-14 text-lg font-bold text-[#002365] group-hover:text-white" data-testid={`service-title-${service.number}`}>{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-500 group-hover:text-blue-100" data-testid={`service-description-${service.number}`}>{service.short}</p>
              <p className="mt-5 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-400 group-hover:border-white/10 group-hover:text-blue-200">{service.detail}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-[#002365] group-hover:text-[#ffe400]" data-testid={`service-cta-${service.number}`}>Lihat detail <ChevronRight className="size-3" /></span>
            </a>
          );
        })}
      </div>
    </section>
  );
}