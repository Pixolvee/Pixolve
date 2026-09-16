import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BookOpenText,
  BrainCircuit,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Code2,
  ExternalLink,
  Globe2,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MoveRight,
  Palette,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Smartphone,
  TestTube2,
  Users,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { toast, Toaster } from "sonner";

import { apiPost } from "@/lib/api";
import type { LeadSubmission, NewsletterSignup, QuoteRequestCreate } from "@/lib/types";

const services: Array<{ title: string; short: string; detail: string; icon: LucideIcon; number: string }> = [
  { title: "Web Development", short: "Produk digital yang cepat, aman, dan siap scale.", detail: "Portal SaaS, marketplace, dan platform enterprise dengan arsitektur yang mudah dikembangkan.", icon: Code2, number: "01" },
  { title: "Mobile App Development", short: "Experience mobile yang terasa natural di setiap layar.", detail: "Aplikasi iOS & Android native atau cross-platform dengan offline sync dan performa mulus.", icon: Smartphone, number: "02" },
  { title: "QA & Testing", short: "Rilis lebih percaya diri, tanpa bug yang menghambat growth.", detail: "Automated end-to-end test, load testing, dan audit keamanan untuk produk kritikal.", icon: TestTube2, number: "03" },
  { title: "Data Science", short: "Ubah data operasional menjadi keputusan yang tajam.", detail: "Dashboard BI, predictive model, dan pipeline AI yang terukur untuk bisnis Anda.", icon: BrainCircuit, number: "04" },
  { title: "UI/UX Design", short: "Interface yang indah, intuitif, dan fokus pada outcome.", detail: "Riset pengguna, prototype interaktif, dan design system yang mempercepat delivery.", icon: Palette, number: "05" },
];

const caseStudies = [
  { name: "KawanMart", category: "E-commerce platform", color: "from-[#ffe400] to-[#ffb700]", result: "+38% conversion", before: "Checkout 4 langkah", after: "Checkout 1 halaman", text: "Menyederhanakan funnel belanja dan dashboard operasional untuk brand FMCG nasional." },
  { name: "Arunika Finance", category: "Mobile & data", color: "from-[#75a8ff] to-[#002365]", result: "-42% waktu laporan", before: "Data tersebar", after: "Insight real-time", text: "Membangun mobile app dan data layer terpadu untuk tim lapangan." },
  { name: "Medika Prima", category: "Healthcare SaaS", color: "from-[#0e9f85] to-[#002365]", result: "99.9% uptime", before: "Manual follow-up", after: "Workflow otomatis", text: "Mendesain ulang alur pasien dan mengotomasi koordinasi antar-cabang." },
];

const team = [
  { name: "Budi Santoso", role: "CEO & Founder / Tech Architect", image: "https://images.unsplash.com/photo-1675869940341-d495d49010b5?auto=format&fit=crop&w=600&q=80" },
  { name: "Siti Rahmawati", role: "Head of UI/UX & Product Strategy", image: "https://images.unsplash.com/photo-1630939687530-241d630735df?auto=format&fit=crop&w=600&q=80" },
  { name: "Rian Kusuma", role: "Lead Fullstack & Cloud Architect", image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80" },
];

const pricingPlans: Array<{ name: string; price: string; desc: string; features: string[] }> = [
  { name: "Starter", price: "Rp50–150 jt", desc: "Untuk validasi ide dan MVP terarah.", features: ["Discovery workshop", "Prototype utama", "1 platform", "QA basic"] },
  { name: "Pro", price: "Rp150–450 jt", desc: "Untuk bisnis yang siap tumbuh.", features: ["Product strategy", "Multi-platform", "Dedicated tech lead", "Analytics & QA otomatis"] },
  { name: "Enterprise", price: "Custom", desc: "Untuk kompleksitas dan skala yang unik.", features: ["Arsitektur enterprise", "Squad dedicated", "SLA & security", "Long-term partnership"] },
];

const initialQuote: QuoteRequestCreate = {
  full_name: "",
  email: "",
  whatsapp: "",
  company: "",
  service: "Web Development",
  project_scale: "MVP / Validasi ide",
  budget_range: "Rp50–150 juta",
  deadline: "Belum ditentukan",
  description: "",
};

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <a href="#hero" className="flex items-center gap-3" data-testid="brand-home-link" aria-label="Pixolve ke beranda">
    <span className="relative flex h-9 w-9 items-center justify-center" data-testid="brand-logo-mark">
      <img 
        src="/Logo/Logo Pixolve.png" 
        alt="Pixolve" 
        className="h-9 w-9 object-contain" 
      />
    </span>
    <span className={`text-xl font-black tracking-tight ${light ? "text-white" : "text-[#002365]"}`} data-testid="brand-logo-text">
      Pix<span className="text-[#ffe400]">olve</span>
    </span>
  </a>
  );
}

function SectionHeading({ eyebrow, title, body, light = false }: { eyebrow: string; title: string; body?: string; light?: boolean }) {
  return (
    <div className="max-w-2xl" data-testid={`section-heading-${eyebrow.toLowerCase().replaceAll(" ", "-")}`}>
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#ffe400]" data-testid={`section-eyebrow-${eyebrow.toLowerCase().replaceAll(" ", "-")}`}>{eyebrow}</p>
      <h2 className={`font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl ${light ? "text-white" : "text-[#002365]"}`} data-testid={`section-title-${eyebrow.toLowerCase().replaceAll(" ", "-")}`}>{title}</h2>
      {body && <p className={`mt-5 text-base leading-8 ${light ? "text-blue-100" : "text-slate-600"}`} data-testid={`section-body-${eyebrow.toLowerCase().replaceAll(" ", "-")}`}>{body}</p>}
    </div>
  );
}

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [language, setLanguage] = useState<"ID" | "EN">("ID");
  const [pricingMode, setPricingMode] = useState<"project" | "retainer">("project");
  const [quote, setQuote] = useState<QuoteRequestCreate>(initialQuote);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  const quoteMutation = useMutation({
    mutationFn: (payload: QuoteRequestCreate) => apiPost<LeadSubmission>("/leads/quote", payload),
    onSuccess: (result) => {
      toast.success(result.message);
      setQuote(initialQuote);
    },
    onError: () => toast.error("Form belum terkirim. Silakan coba lagi beberapa saat."),
  });
  const newsletterMutation = useMutation({
    mutationFn: (email: string) => apiPost<NewsletterSignup>("/leads/newsletter", { email }),
    onSuccess: () => {
      toast.success("Anda sudah terdaftar. Insight baru akan hadir di inbox Anda.");
      setNewsletterEmail("");
    },
    onError: () => toast.error("Email belum tersimpan. Periksa format email Anda."),
  });

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    quoteMutation.mutate(quote);
  };
  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    newsletterMutation.mutate(newsletterEmail);
  };
  const openWhatsapp = (message = "Halo NexaLabs, saya ingin konsultasi tentang proyek digital.") => {
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };
  const navLinks = [
    ["Beranda", "#hero"], ["Layanan", "#layanan"], ["Portofolio", "#portofolio"], ["Harga", "#harga"], ["Tentang", "#tentang"], ["FAQ", "#faq"],
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8fafc] text-[#0f172a]" data-testid="nexalabs-site-shell">
      <Toaster position="top-right" richColors />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#00153d]/90 shadow-lg backdrop-blur-xl" data-testid="site-header">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <BrandMark light />
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigasi utama" data-testid="desktop-navigation">
            {navLinks.map(([label, href]) => <a key={href} href={href} className="text-sm font-medium text-blue-100 transition-colors hover:text-[#ffe400]" data-testid={`nav-link-${label.toLowerCase()}`}>{label}</a>)}
            <details className="relative" data-testid="nav-services-dropdown">
              <summary className="flex cursor-pointer list-none items-center gap-1 text-sm font-medium text-blue-100 hover:text-[#ffe400]">Layanan <ChevronDown className="size-3" /></summary>
              <div className="absolute right-0 top-8 w-64 rounded-2xl border border-white/10 bg-[#00153d] p-3 shadow-2xl" data-testid="nav-services-menu">
                {services.map((service) => <a key={service.title} href="#layanan" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-blue-100 hover:bg-white/10 hover:text-[#ffe400]" data-testid={`nav-service-${service.number}`}>{service.number} {service.title}</a>)}
              </div>
            </details>
          </nav>
          <div className="hidden items-center gap-3 lg:flex" data-testid="header-actions">
            <button type="button" onClick={() => { const next = language === "ID" ? "EN" : "ID"; setLanguage(next); toast.info(next === "EN" ? "Mode English sedang disiapkan untuk NexaLabs." : "Mode Bahasa Indonesia aktif."); }} className="rounded-full border border-white/20 px-3 py-2 text-xs font-bold text-white hover:border-[#ffe400] hover:text-[#ffe400]" data-testid="language-switch-button">{language} <span className="text-white/40">|</span> {language === "ID" ? "EN" : "ID"}</button>
            <a href="#quote-form" className="rounded-full bg-[#ffe400] px-5 py-3 text-sm font-bold text-[#00153d] shadow-[0_0_24px_rgba(255,228,0,.16)] transition-transform hover:-translate-y-0.5" data-testid="header-consultation-button">Konsultasi Gratis <ArrowUpRight className="ml-1 inline size-4" /></a>
          </div>
          <button type="button" onClick={() => setMobileMenu((value) => !value)} className="rounded-lg p-2 text-white lg:hidden" aria-label="Buka menu" data-testid="mobile-menu-toggle">{mobileMenu ? <X /> : <Menu />}</button>
        </div>
        {mobileMenu && <div className="border-t border-white/10 bg-[#00153d] px-5 pb-5 lg:hidden" data-testid="mobile-navigation">{navLinks.map(([label, href]) => <a key={href} href={href} onClick={() => setMobileMenu(false)} className="block border-b border-white/10 py-3 text-sm text-blue-100" data-testid={`mobile-nav-link-${label.toLowerCase()}`}>{label}</a>)}<a href="#quote-form" onClick={() => setMobileMenu(false)} className="mt-4 block rounded-full bg-[#ffe400] px-4 py-3 text-center text-sm font-bold text-[#00153d]" data-testid="mobile-consultation-button">Konsultasi Gratis</a></div>}
      </header>

      <main>
        <section id="hero" className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#00153d_0%,#002365_58%,#053082_100%)] pt-32 text-white sm:pt-40" data-testid="hero-section">
          <div className="absolute -right-32 top-8 -z-10 h-[520px] w-[520px] rounded-full bg-[#ffe400]/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -z-10 h-64 w-64 rounded-full bg-[#75a8ff]/10 blur-3xl" />
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 sm:pb-28 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-32">
            <div data-testid="hero-copy">
              <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-[1.04] tracking-[-0.04em] sm:text-6xl lg:text-7xl" data-testid="hero-headline">Bangun produk digital yang <span className="text-[#ffe400]">bergerak lebih cepat.</span></h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg" data-testid="hero-subheadline">NexaLabs adalah software house untuk tim yang ingin mengubah ide kompleks menjadi Web Platform, Mobile App, Data Science, dan UI/UX yang siap dipakai dan siap scale.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row" data-testid="hero-actions">
                <a href="#quote-form" className="inline-flex items-center justify-center rounded-full bg-[#ffe400] px-6 py-4 text-sm font-bold text-[#00153d] transition-transform hover:-translate-y-1" data-testid="hero-consultation-cta">Mulai Konsultasi Gratis <MoveRight className="ml-2 size-4" /></a>
                <a href="#portofolio" className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-4 text-sm font-bold text-white hover:border-[#ffe400] hover:text-[#ffe400]" data-testid="hero-portfolio-cta">Eksplor Portofolio <ArrowDownRight className="ml-2 size-4" /></a>
              </div>
            </div>
            <div className="relative" data-testid="hero-product-visual">
              <div className="absolute -inset-4 rounded-[2rem] bg-[#ffe400]/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/20 bg-[#00102f]/75 shadow-2xl backdrop-blur" data-testid="hero-code-card">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><div className="flex gap-1.5"><span className="size-2.5 rounded-full bg-[#ff6b6b]" /><span className="size-2.5 rounded-full bg-[#ffe400]" /><span className="size-2.5 rounded-full bg-[#7de2ae]" /></div><span className="font-mono text-[10px] text-blue-200">Pixolve / delivery-system</span><Code2 className="size-4 text-[#ffe400]" /></div>
                <div className="relative overflow-hidden rounded-[1.75rem] border border-white/20 bg-[#00102f]/75 shadow-2xl backdrop-blur" data-testid="hero-code-card">
                {/* body terminal — satu blok, tidak ada card terpisah */}
                <div className="p-5 font-mono text-xs leading-6 sm:p-7">
                  {/* blok code lama dengan nomor baris */}
                  <div className="grid grid-cols-[auto_1fr] gap-4">
                    <div className="space-y-2">
                      <p><span className="text-[#ffe400]">const</span> <span className="text-[#75a8ff]">product</span> = <span className="text-[#7de2ae]">await</span> nexalabs.build(&#123;</p>
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
          </div>
        </section>

        <section id="layanan" className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8" data-testid="services-section">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><SectionHeading eyebrow="Apa yang kami bangun" title="Dari brief pertama sampai produk yang dipakai." body="Satu tim senior untuk menyatukan strategi, desain, engineering, dan kualitas—tanpa handoff yang memperlambat." /><a href="#quote-form" className="group inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#002365]" data-testid="services-consultation-link">Diskusikan kebutuhan Anda <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></a></div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-5" data-testid="services-grid">
            {services.map((service) => { const Icon = service.icon; return <article key={service.title} className="group bg-white p-6 transition-colors hover:bg-[#002365] md:p-7" data-testid={`service-card-${service.number}`}><div className="flex items-start justify-between"><span className="flex size-11 items-center justify-center rounded-2xl bg-[#002365]/5 text-[#002365] transition-colors group-hover:bg-[#ffe400] group-hover:text-[#002365]"><Icon className="size-5" /></span><span className="font-mono text-xs text-slate-400 group-hover:text-blue-200">{service.number}</span></div><h3 className="mt-14 text-lg font-bold text-[#002365] group-hover:text-white" data-testid={`service-title-${service.number}`}>{service.title}</h3><p className="mt-3 text-sm leading-6 text-slate-500 group-hover:text-blue-100" data-testid={`service-description-${service.number}`}>{service.short}</p><p className="mt-5 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-400 group-hover:border-white/10 group-hover:text-blue-200">{service.detail}</p><a href="#quote-form" className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-[#002365] group-hover:text-[#ffe400]" data-testid={`service-cta-${service.number}`}>Lihat detail <ChevronRight className="size-3" /></a></article>; })}
          </div>
        </section>

        <section id="portofolio" className="bg-[#eef3f9] px-5 py-20 sm:py-28 lg:px-8" data-testid="portfolio-section"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Studi kasus pilihan" title="Bukan sekadar launch. Kami mengejar perubahan yang terukur." body="Beberapa contoh bagaimana pendekatan produk, engineering, dan data membantu partner kami bergerak lebih jauh." /><div className="mt-12 grid gap-6 lg:grid-cols-3" data-testid="portfolio-grid">{caseStudies.map((item, index) => <article key={item.name} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white" data-testid={`portfolio-card-${index + 1}`}><div className={`relative h-52 overflow-hidden bg-gradient-to-br ${item.color} p-6`}><div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,.45) 31%, transparent 32%), linear-gradient(45deg, transparent 45%, rgba(0,35,101,.3) 46%, transparent 47%)", backgroundSize: "38px 38px" }} /><div className="relative flex items-start justify-between"><span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#002365]">{item.category}</span><ExternalLink className="size-5 text-[#002365]" /></div><div className="absolute bottom-5 left-6"><p className="text-3xl font-black tracking-tight text-[#002365]">{item.name}</p><p className="mt-1 text-xs font-medium text-[#002365]/70">Case study / 2025</p></div></div><div className="p-6"><p className="text-sm leading-6 text-slate-600">{item.text}</p><div className="mt-6 grid grid-cols-2 gap-3 border-y border-slate-100 py-4"><div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sebelum</p><p className="mt-1 text-xs font-semibold text-[#002365]">{item.before}</p></div><div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sesudah</p><p className="mt-1 text-xs font-semibold text-[#002365]">{item.after}</p></div></div><div className="mt-5 flex items-center justify-between"><span className="text-sm font-bold text-[#002365]"><span className="text-[#0e9f85]">{item.result}</span> impact</span><a href="#quote-form" className="inline-flex items-center gap-1 text-xs font-bold text-[#002365]" data-testid={`portfolio-demo-${index + 1}`}>Minta demo <ArrowUpRight className="size-3" /></a></div></div></article>)}</div></div></section>


        <section id="harga" className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8" data-testid="pricing-section"><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><SectionHeading eyebrow="Estimasi investasi" title="Mulai dari kebutuhan Anda." body="Angka berikut membantu Anda memulai percakapan. Scope final selalu kami breakdown secara transparan." /><div className="inline-flex rounded-full border border-slate-200 bg-white p-1" data-testid="pricing-mode-switch"><button type="button" onClick={() => setPricingMode("project")} className={`rounded-full px-4 py-2 text-xs font-bold ${pricingMode === "project" ? "bg-[#002365] text-white" : "text-slate-500"}`} data-testid="pricing-project-tab">Project-based</button><button type="button" onClick={() => setPricingMode("retainer")} className={`rounded-full px-4 py-2 text-xs font-bold ${pricingMode === "retainer" ? "bg-[#002365] text-white" : "text-slate-500"}`} data-testid="pricing-retainer-tab">Retainer</button></div></div><div className="mt-12 grid gap-5 lg:grid-cols-3" data-testid="pricing-grid">{pricingPlans.map(({ name, price: basePrice, desc, features }, index) => { const price = pricingMode === "retainer" && name === "Starter" ? "Rp15 jt / bln" : pricingMode === "retainer" && name === "Pro" ? "Rp35 jt / bln" : basePrice; return <article key={name} className={`relative rounded-3xl border p-7 ${index === 1 ? "border-[#ffe400] bg-[#002365] text-white shadow-[0_20px_70px_rgba(0,35,101,.2)]" : "border-slate-200 bg-white"}`} data-testid={`pricing-card-${name.toLowerCase()}`}>{index === 1 && <span className="absolute -top-3 left-7 rounded-full bg-[#ffe400] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#002365]">Paling dipilih</span>}<p className={`text-xs font-bold uppercase tracking-widest ${index === 1 ? "text-[#ffe400]" : "text-slate-400"}`}>{name}</p><p className="mt-7 text-3xl font-black tracking-tight" data-testid={`pricing-price-${name.toLowerCase()}`}>{price}</p><p className={`mt-3 min-h-12 text-sm leading-6 ${index === 1 ? "text-blue-100" : "text-slate-500"}`}>{desc}</p><ul className={`mt-7 space-y-3 border-t pt-6 text-sm ${index === 1 ? "border-white/15" : "border-slate-100"}`}>{features.map((feature) => <li key={feature} className="flex items-center gap-2"><Check className={`size-4 ${index === 1 ? "text-[#ffe400]" : "text-[#0e9f85]"}`} />{feature}</li>)}</ul><a href="#quote-form" className={`mt-8 block rounded-full px-4 py-3 text-center text-sm font-bold ${index === 1 ? "bg-[#ffe400] text-[#00153d]" : "border border-[#002365] text-[#002365]"}`} data-testid={`pricing-cta-${name.toLowerCase()}`}>{name === "Enterprise" ? "Bicarakan Scope" : "Minta Estimasi"}</a></article>; })}</div></section>

        <section id="quote-form" className="bg-[#ffe400] px-5 py-20 sm:py-28 lg:px-8" data-testid="quote-section"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-start"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#002365]" data-testid="quote-eyebrow">Start a conversation</p><h2 className="mt-4 max-w-md font-heading text-4xl font-extrabold leading-tight tracking-tight text-[#002365] sm:text-5xl" data-testid="quote-title">Ceritakan tantangan digital Anda.</h2><p className="mt-6 max-w-md text-base leading-7 text-[#002365]/75" data-testid="quote-body">Isi form singkat ini. Kami akan membalas dengan pertanyaan yang tepat, bukan template penawaran yang generik.</p><div className="mt-10 space-y-4 text-sm text-[#002365]" data-testid="quote-benefits"><p className="flex items-center gap-3"><Check className="size-4" /> Respons awal dalam 1 hari kerja</p><p className="flex items-center gap-3"><Check className="size-4" /> NDA tersedia sebelum discovery</p><p className="flex items-center gap-3"><Check className="size-4" /> Estimasi scope transparan</p></div></div><form onSubmit={submitQuote} className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8" data-testid="quote-form"><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold text-[#002365]" data-testid="quote-label-full-name">Nama lengkap<input required value={quote.full_name} onChange={(event) => setQuote({ ...quote, full_name: event.target.value })} placeholder="Nama Anda" className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#002365]" data-testid="quote-input-full-name" /></label><label className="text-sm font-semibold text-[#002365]" data-testid="quote-label-email">Email bisnis<input required type="email" value={quote.email} onChange={(event) => setQuote({ ...quote, email: event.target.value })} placeholder="nama@perusahaan.com" className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#002365]" data-testid="quote-input-email" /></label><label className="text-sm font-semibold text-[#002365]" data-testid="quote-label-whatsapp">Nomor WhatsApp<input required value={quote.whatsapp} onChange={(event) => setQuote({ ...quote, whatsapp: event.target.value })} placeholder="+62 812..." className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#002365]" data-testid="quote-input-whatsapp" /></label><label className="text-sm font-semibold text-[#002365]" data-testid="quote-label-company">Nama perusahaan<input required value={quote.company} onChange={(event) => setQuote({ ...quote, company: event.target.value })} placeholder="Nama perusahaan" className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#002365]" data-testid="quote-input-company" /></label><label className="text-sm font-semibold text-[#002365]" data-testid="quote-label-service">Fokus layanan<select required value={quote.service} onChange={(event) => setQuote({ ...quote, service: event.target.value })} className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#002365]" data-testid="quote-select-service">{services.map((service) => <option key={service.title}>{service.title}</option>)}</select></label><label className="text-sm font-semibold text-[#002365]" data-testid="quote-label-scale">Skala proyek<select required value={quote.project_scale} onChange={(event) => setQuote({ ...quote, project_scale: event.target.value })} className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#002365]" data-testid="quote-select-scale"><option>MVP / Validasi ide</option><option>Scale-up / Produk berjalan</option><option>Enterprise / Multi-team</option></select></label><label className="text-sm font-semibold text-[#002365]" data-testid="quote-label-budget">Estimasi budget<select required value={quote.budget_range} onChange={(event) => setQuote({ ...quote, budget_range: event.target.value })} className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#002365]" data-testid="quote-select-budget"><option>Rp50–150 juta</option><option>Rp150–450 juta</option><option>Di atas Rp450 juta</option><option>Belum tahu, bantu hitungkan</option></select></label><label className="text-sm font-semibold text-[#002365]" data-testid="quote-label-deadline">Target mulai<select required value={quote.deadline} onChange={(event) => setQuote({ ...quote, deadline: event.target.value })} className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#002365]" data-testid="quote-select-deadline"><option>Secepatnya</option><option>1–3 bulan</option><option>3–6 bulan</option><option>Belum ditentukan</option></select></label><label className="text-sm font-semibold text-[#002365] sm:col-span-2" data-testid="quote-label-description">Ceritakan kebutuhan Anda<textarea required minLength={12} value={quote.description} onChange={(event) => setQuote({ ...quote, description: event.target.value })} placeholder="Apa yang ingin dibangun atau diperbaiki?" className="mt-2 min-h-28 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#002365]" data-testid="quote-input-description" /></label></div><div className="mt-6 flex flex-col justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center"><p className="flex items-center gap-2 text-xs text-slate-500"><LockKeyhole className="size-3" /> Data Anda hanya digunakan untuk konsultasi.</p><button type="submit" disabled={quoteMutation.isPending} className="inline-flex items-center justify-center rounded-full bg-[#002365] px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60" data-testid="quote-form-submit-button">{quoteMutation.isPending ? "Mengirim..." : "Kirim kebutuhan saya"} <MoveRight className="ml-2 size-4" /></button></div></form></div></section>

        <section id="tentang" className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8" data-testid="about-section"><div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div className="relative overflow-hidden rounded-3xl bg-[#002365] p-8 text-white sm:p-12" data-testid="about-story-card"><div className="absolute -right-16 -top-16 size-48 rounded-full border-[24px] border-[#ffe400]/20" /><p className="relative text-xs font-bold uppercase tracking-[0.22em] text-[#ffe400]">Tentang NexaLabs</p><p className="relative mt-10 font-heading text-3xl font-extrabold leading-tight">Teknologi yang terasa dekat dengan manusia yang memakainya.</p><p className="relative mt-6 text-sm leading-7 text-blue-100">Kami berdiri dari keyakinan sederhana: proyek digital yang bagus tidak dimulai dari framework, tetapi dari pemahaman yang tajam terhadap masalah. Sejak hari pertama, kami bekerja sebagai partner produk—bukan sekadar vendor.</p><div className="relative mt-12 grid grid-cols-2 gap-6 border-t border-white/15 pt-6"><div><p className="text-3xl font-black text-[#ffe400]">2019</p><p className="mt-1 text-xs text-blue-200">tahun berdiri</p></div><div><p className="text-3xl font-black text-[#ffe400]">12</p><p className="mt-1 text-xs text-blue-200">kota partner</p></div></div></div><div><SectionHeading eyebrow="Cara kami berpikir" title="Ambisi besar butuh fondasi yang bisa dipercaya." body="Visi kami adalah menjadi tim teknologi pilihan bagi perusahaan yang ingin menciptakan perubahan nyata. Misi kami: mengubah kompleksitas menjadi produk yang mudah dipakai, diukur, dan dikembangkan." /><div className="mt-10 grid gap-4 sm:grid-cols-2" data-testid="about-values"><div className="rounded-2xl border border-slate-200 bg-white p-5"><Globe2 className="size-5 text-[#002365]" /><h3 className="mt-5 font-bold text-[#002365]">Think in systems</h3><p className="mt-2 text-sm leading-6 text-slate-500">Kami melihat koneksi antara user, proses, data, dan teknologi.</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5"><Sparkles className="size-5 text-[#002365]" /><h3 className="mt-5 font-bold text-[#002365]">Bias for clarity</h3><p className="mt-2 text-sm leading-6 text-slate-500">Keputusan lebih cepat saat tujuan dan trade-off terlihat jelas.</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5"><Users className="size-5 text-[#002365]" /><h3 className="mt-5 font-bold text-[#002365]">Partner, not vendor</h3><p className="mt-2 text-sm leading-6 text-slate-500">Tim senior yang ikut memiliki outcome bersama Anda.</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5"><ShieldCheck className="size-5 text-[#002365]" /><h3 className="mt-5 font-bold text-[#002365]">Build with care</h3><p className="mt-2 text-sm leading-6 text-slate-500">Kualitas, keamanan, dan maintainability bukan bonus.</p></div></div></div></div></section>

        <section id="tim" className="bg-white px-5 py-20 sm:py-28 lg:px-8" data-testid="team-section"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end"><SectionHeading eyebrow="Orang di balik produk" title="Tim inti yang ikut duduk di meja Anda." body="Kecil, senior, dan cukup dekat untuk mengerti konteks bisnis—cukup berpengalaman untuk mengantisipasi risikonya." /><a href="#quote-form" className="text-sm font-bold text-[#002365]" data-testid="team-hiring-link">Bergabung dengan kami <ArrowUpRight className="ml-1 inline size-4" /></a></div><div className="mt-12 grid gap-6 md:grid-cols-3" data-testid="team-grid">{team.map((person, index) => <article key={person.name} className="group" data-testid={`team-card-${index + 1}`}><div className="relative aspect-[4/4.2] overflow-hidden rounded-3xl bg-[#eef3f9]"><img src={person.image} alt={person.name} className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" /><a href="#quote-form" className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full bg-[#ffe400] text-[#002365]" aria-label={`LinkedIn ${person.name}`} data-testid={`team-linkedin-${index + 1}`}><ExternalLink className="size-4" /></a></div><div className="mt-5 flex items-start justify-between gap-4"><div><h3 className="font-bold text-[#002365]" data-testid={`team-name-${index + 1}`}>{person.name}</h3><p className="mt-1 text-sm text-slate-500">{person.role}</p></div><span className="font-mono text-xs text-slate-400">0{index + 1}</span></div></article>)}</div></div></section>

        <section id="faq" className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8" data-testid="faq-section"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><SectionHeading eyebrow="Pertanyaan umum" title="Hal-hal yang biasanya ingin Anda tahu sebelum mulai." body="Jika pertanyaan Anda belum ada di sini, tim kami siap menjawabnya saat konsultasi." /><div className="space-y-3" data-testid="faq-list">{[["Apakah bisa menandatangani NDA sebelum diskusi?", "Bisa. Kami terbiasa bekerja dengan informasi sensitif dan dapat menyiapkan NDA sebelum discovery dimulai."], ["Berapa lama proses pengerjaan proyek?", "MVP terarah biasanya membutuhkan 8–12 minggu. Durasi final bergantung pada scope, integrasi, dan tingkat validasi yang dibutuhkan."], ["Bagaimana metode pembayarannya?", "Pembayaran dibagi berdasarkan milestone yang disepakati di awal. Anda mendapat visibility atas progres dan deliverable di setiap tahap."], ["Apakah source code menjadi milik klien?", "Ya. Setelah kewajiban proyek terpenuhi, source code dan dokumentasi diserahkan sesuai klausul kontrak."], ["Apakah ada garansi setelah launch?", "Kami menyediakan masa garansi bug dan opsi maintenance retainer agar produk tetap sehat setelah go-live."]].map(([question, answer], index) => <details key={question} className="group rounded-2xl border border-slate-200 bg-white px-5 py-4" data-testid={`faq-item-${index + 1}`}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#002365]"><span data-testid={`faq-question-${index + 1}`}>{question}</span><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#eef3f9] text-[#002365] transition-transform group-open:rotate-180"><ChevronDown className="size-4" /></span></summary><p className="max-w-2xl pt-4 text-sm leading-7 text-slate-500" data-testid={`faq-answer-${index + 1}`}>{answer}</p></details>)}</div></div></section>

        <section id="blog" className="bg-[#eef3f9] px-5 py-20 sm:py-28 lg:px-8" data-testid="insights-section"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end"><SectionHeading eyebrow="NexaLabs insights" title="Catatan untuk tim yang membangun." body="Insight praktis tentang product strategy, engineering, dan cara membuat keputusan digital dengan lebih baik." /><a href="#newsletter" className="text-sm font-bold text-[#002365]" data-testid="blog-view-all-link">Lihat semua insight <ArrowUpRight className="ml-1 inline size-4" /></a></div><div className="mt-12 grid gap-5 lg:grid-cols-3" data-testid="blog-grid">{[["Product strategy", "Cara menemukan MVP yang benar-benar layak dibangun", "5 min read"], ["Engineering", "Technical debt: kapan harus dibayar, kapan bisa ditunda", "7 min read"], ["Case study", "Dari dashboard menjadi keputusan: merancang data layer yang dipakai", "6 min read"]].map(([category, title, duration], index) => <article key={title} className="group rounded-3xl border border-slate-200 bg-white p-6" data-testid={`blog-card-${index + 1}`}><div className="flex items-center justify-between"><span className="rounded-full bg-[#002365]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#002365]">{category}</span><BookOpenText className="size-4 text-slate-400" /></div><h3 className="mt-14 max-w-xs text-xl font-bold leading-snug text-[#002365] transition-colors group-hover:text-[#0e9f85]" data-testid={`blog-title-${index + 1}`}>{title}</h3><div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500"><span>{duration}</span><a href="#quote-form" className="font-bold text-[#002365]" data-testid={`blog-read-${index + 1}`}>Baca artikel <ArrowUpRight className="ml-1 inline size-3" /></a></div></article>)}</div></div></section>

      </main>

      <footer className="bg-[#00102f] px-5 py-14 text-white lg:px-8" data-testid="site-footer"><div className="mx-auto max-w-7xl"><div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr_.8fr_1fr]"><div><BrandMark light /><p className="mt-6 max-w-xs text-sm leading-7 text-blue-200" data-testid="footer-description">Startup software house & agensi teknologi untuk produk yang ingin tumbuh dengan fondasi yang kuat.</p><div className="mt-7 flex gap-3"><a href="#quote-form" className="flex size-9 items-center justify-center rounded-full border border-white/15 text-blue-200 hover:border-[#ffe400] hover:text-[#ffe400]" aria-label="LinkedIn NexaLabs" data-testid="footer-linkedin"><ExternalLink className="size-4" /></a><a href="#quote-form" className="flex size-9 items-center justify-center rounded-full border border-white/15 text-blue-200 hover:border-[#ffe400] hover:text-[#ffe400]" aria-label="Email NexaLabs" data-testid="footer-email"><Mail className="size-4" /></a></div></div><div><p className="text-xs font-bold uppercase tracking-widest text-[#ffe400]">Layanan</p><div className="mt-5 space-y-3 text-sm text-blue-200"><a href="#layanan" className="block hover:text-white" data-testid="footer-service-web">Web Development</a><a href="#layanan" className="block hover:text-white" data-testid="footer-service-mobile">Mobile App</a><a href="#layanan" className="block hover:text-white" data-testid="footer-service-qa">QA & Testing</a><a href="#layanan" className="block hover:text-white" data-testid="footer-service-data">Data Science</a><a href="#layanan" className="block hover:text-white" data-testid="footer-service-design">UI/UX Design</a></div></div><div><p className="text-xs font-bold uppercase tracking-widest text-[#ffe400]">Perusahaan</p><div className="mt-5 space-y-3 text-sm text-blue-200"><a href="#tentang" className="block hover:text-white" data-testid="footer-about-link">Tentang NexaLabs</a><a href="#portofolio" className="block hover:text-white" data-testid="footer-portfolio-link">Studi Kasus</a><a href="#tim" className="block hover:text-white" data-testid="footer-team-link">Tim & Karier</a><a href="#blog" className="block hover:text-white" data-testid="footer-blog-link">Blog & Insight</a><a href="#faq" className="block hover:text-white" data-testid="footer-faq-link">FAQ</a></div></div><div><p className="text-xs font-bold uppercase tracking-widest text-[#ffe400]">Hubungi kami</p><div className="mt-5 space-y-4 text-sm text-blue-200"><p className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-[#ffe400]" /> hello@nexalabs.id</p><p className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-[#ffe400]" /> +62 812-3456-7890</p><p className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-[#ffe400]" /> Gedung Cyber 2, Jakarta Selatan</p><p className="flex gap-3"><Clock3 className="mt-0.5 size-4 shrink-0 text-[#ffe400]" /> Senin–Jumat, 08.00–18.00 WIB</p></div></div></div><div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-blue-300 sm:flex-row"><p data-testid="footer-copyright">© 2026 NexaLabs Technologies. All rights reserved.</p><p data-testid="footer-legal">NDA ready · Privacy first · Built for impact</p><a href="/nexalabs-source.zip" download className="font-bold text-[#ffe400] hover:text-white" data-testid="footer-source-download">Download source code ZIP</a></div></div></footer>

      <div className="fixed bottom-5 right-5 z-40" data-testid="whatsapp-floating-widget"><button type="button" onClick={() => setChatOpen((value) => !value)} className="relative flex size-14 items-center justify-center rounded-full bg-[#ffe400] text-[#002365] shadow-[0_12px_32px_rgba(0,35,101,.25)] transition-transform hover:scale-105" aria-label="Buka konsultasi WhatsApp" data-testid="whatsapp-widget-trigger"><MessageCircle className="size-6" /><span className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-[#00153d] bg-[#0e9f85]" /></button>{chatOpen && <div className="absolute bottom-16 right-0 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl" data-testid="whatsapp-chat-panel"><div className="bg-[#002365] p-4 text-white"><div className="flex items-center justify-between"><p className="font-bold">NexaLabs Fast Consult</p><button type="button" onClick={() => setChatOpen(false)} aria-label="Tutup chat" data-testid="whatsapp-chat-close"><X className="size-4" /></button></div><p className="mt-1 text-xs text-blue-200">Online · biasanya membalas cepat</p></div><div className="space-y-3 p-4"><p className="rounded-xl bg-[#eef3f9] p-3 text-xs leading-5 text-[#002365]">Halo! Apa yang sedang ingin Anda bangun bersama NexaLabs?</p><button type="button" onClick={() => openWhatsapp("Halo NexaLabs, saya ingin konsultasi Web Development.")} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-left text-xs font-semibold text-[#002365] hover:border-[#002365]" data-testid="whatsapp-quick-web">Konsultasi Web Development</button><button type="button" onClick={() => openWhatsapp("Halo NexaLabs, saya ingin tahu estimasi harga proyek.")} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-left text-xs font-semibold text-[#002365] hover:border-[#002365]" data-testid="whatsapp-quick-price">Tanya estimasi harga</button><button type="button" onClick={() => openWhatsapp()} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ffe400] px-3 py-2 text-xs font-bold text-[#002365]" data-testid="whatsapp-open-button">Buka WhatsApp <ArrowUpRight className="size-3" /></button></div></div>}</div>
    </div>
  );
}