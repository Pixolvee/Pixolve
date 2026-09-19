import { useState } from "react";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricingPlans } from "@/data/pricingPlans";

export function Pricing() {
  const [pricingMode, setPricingMode] = useState<"project" | "retainer">("project");

  return (
    <section id="harga" className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8" data-testid="pricing-section">
      <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
        <SectionHeading eyebrow="Estimasi investasi" title="Mulai dari kebutuhan Anda." body="Angka berikut membantu Anda memulai percakapan. Scope final selalu kami breakdown secara transparan." />
        <div className="inline-flex rounded-full border border-slate-200 bg-white p-1" data-testid="pricing-mode-switch">
          <button type="button" onClick={() => setPricingMode("project")} className={`rounded-full px-4 py-2 text-xs font-bold ${pricingMode === "project" ? "bg-[#002365] text-white" : "text-slate-500"}`} data-testid="pricing-project-tab">Project-based</button>
          <button type="button" onClick={() => setPricingMode("retainer")} className={`rounded-full px-4 py-2 text-xs font-bold ${pricingMode === "retainer" ? "bg-[#002365] text-white" : "text-slate-500"}`} data-testid="pricing-retainer-tab">Retainer</button>
        </div>
      </div>
      <div className="mt-12 grid gap-5 lg:grid-cols-3" data-testid="pricing-grid">
        {pricingPlans.map(({ name, price: basePrice, desc, features }, index) => {
          const price = pricingMode === "retainer" && name === "Starter" ? "Rp15 jt / bln" : pricingMode === "retainer" && name === "Pro" ? "Rp35 jt / bln" : basePrice;
          return (
            <article key={name} className={`relative rounded-3xl border p-7 ${index === 1 ? "border-[#ffe400] bg-[#002365] text-white shadow-[0_20px_70px_rgba(0,35,101,.2)]" : "border-slate-200 bg-white"}`} data-testid={`pricing-card-${name.toLowerCase()}`}>
              {index === 1 && <span className="absolute -top-3 left-7 rounded-full bg-[#ffe400] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#002365]">Paling dipilih</span>}
              <p className={`text-xs font-bold uppercase tracking-widest ${index === 1 ? "text-[#ffe400]" : "text-slate-400"}`}>{name}</p>
              <p className="mt-7 text-3xl font-black tracking-tight" data-testid={`pricing-price-${name.toLowerCase()}`}>{price}</p>
              <p className={`mt-3 min-h-12 text-sm leading-6 ${index === 1 ? "text-blue-100" : "text-slate-500"}`}>{desc}</p>
              <ul className={`mt-7 space-y-3 border-t pt-6 text-sm ${index === 1 ? "border-white/15" : "border-slate-100"}`}>
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className={`size-4 ${index === 1 ? "text-[#ffe400]" : "text-[#0e9f85]"}`} />{feature}
                  </li>
                ))}
              </ul>
              <a href="#quote-form" className={`mt-8 block rounded-full px-4 py-3 text-center text-sm font-bold ${index === 1 ? "bg-[#ffe400] text-[#00153d]" : "border border-[#002365] text-[#002365]"}`} data-testid={`pricing-cta-${name.toLowerCase()}`}>{name === "Enterprise" ? "Bicarakan Scope" : "Minta Estimasi"}</a>
            </article>
          );
        })}
      </div>
    </section>
  );
}