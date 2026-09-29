import { ArrowDownRight, Code2, MoveRight } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#00153d_0%,#002365_58%,#053082_100%)] pt-32 text-white sm:pt-40" data-testid="hero-section">
      <div className="absolute -right-32 top-8 -z-10 h-[520px] w-[520px] rounded-full bg-[#ffe400]/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-64 w-64 rounded-full bg-[#75a8ff]/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 sm:pb-28 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-32">
        <div data-testid="hero-copy">
          <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-[1.04] tracking-[-0.04em] sm:text-6xl lg:text-7xl" data-testid="hero-headline">Bangun produk digital yang <span className="text-[#ffe400]">bergerak lebih cepat.</span></h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg" data-testid="hero-subheadline">Pixolve adalah software house untuk tim yang ingin mengubah ide kompleks menjadi Web Platform, Mobile App, Data Science, dan UI/UX yang siap dipakai dan siap scale.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row" data-testid="hero-actions">
            <a href="#quote-form" className="inline-flex items-center justify-center rounded-full bg-[#ffe400] px-6 py-4 text-sm font-bold text-[#00153d] transition-transform hover:-translate-y-1" data-testid="hero-consultation-cta">Mulai Konsultasi Gratis <MoveRight className="ml-2 size-4" /></a>
            <a href="#portofolio" className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-4 text-sm font-bold text-white hover:border-[#ffe400] hover:text-[#ffe400]" data-testid="hero-portfolio-cta">Eksplor Portofolio <ArrowDownRight className="ml-2 size-4" /></a>
          </div>
        </div>
        <div className="relative" data-testid="hero-product-visual">
          <div className="absolute -inset-4 rounded-[2rem] bg-[#ffe400]/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/20 bg-[#00102f]/75 shadow-2xl backdrop-blur" data-testid="hero-code-card">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#ff6b6b]" />
                <span className="size-2.5 rounded-full bg-[#ffe400]" />
                <span className="size-2.5 rounded-full bg-[#7de2ae]" />
              </div>
              <span className="font-mono text-[10px] text-blue-200">Pixolve / delivery-system</span>
              <Code2 className="size-4 text-[#ffe400]" />
            </div>
            <div className="p-5 font-mono text-xs leading-6 sm:p-7">
              <div className="grid grid-cols-[auto_1fr] gap-4">
                <div className="space-y-2 text-blue-300">
                  {Array.from({ length: 12 }, (_, i) => (
                    <span key={i} className="block">{String(i + 1).padStart(2, "0")}</span>
                  ))}
                </div>
                <div className="space-y-2">
                  <p><span className="text-[#ffe400]">const</span> <span className="text-[#75a8ff]">product</span> = <span className="text-[#7de2ae]">await</span> pixolve.build(&#123;</p>
                  <p className="pl-4 text-blue-200">vision: <span className="text-[#ffcc9b]">"your next advantage"</span>,</p>
                  <p className="pl-4 text-blue-200">scale: <span className="text-[#ffcc9b]">"enterprise-ready"</span>,</p>
                  <p className="pl-4 text-blue-200">quality: <span className="text-[#ffe400]">99.9</span></p>
                  <p>&#125;); <span className="text-[#7de2ae]">// ship with confidence</span></p>
                  <p className="pt-2"><span className="text-[#7de2ae]">await</span> <span className="text-[#75a8ff]">pixolve</span>.<span className="text-[#ffe400]">deploy</span>(&#123;</p>
                  <p className="pl-4 text-blue-200">target: <span className="text-[#ffcc9b]">"production"</span>,</p>
                  <p className="pl-4 text-blue-200">region: <span className="text-[#ffcc9b]">"ap-southeast-1"</span>,</p>
                  <p className="pl-4 text-blue-200">replicas: <span className="text-[#ffe400]">3</span>,</p>
                  <p className="pl-4 text-blue-200">healthCheck: <span className="text-[#ffcc9b]">"/api/health"</span></p>
                  <p>&#125;);</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}