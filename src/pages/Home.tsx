import { Toaster } from "sonner";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsappWidget } from "@/components/layout/WhatsappWidget";

import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Pricing } from "@/components/sections/Pricing";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { About } from "@/components/sections/About";
import { Team } from "@/components/sections/Team";
import { Faq } from "@/components/sections/Faq";
import { Blog } from "@/components/sections/Blog";
import { Newsletter } from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8fafc] text-[#0f172a]">
      <Toaster position="top-right" richColors />
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Pricing />
        <QuoteForm />
        <About />
        <Team />
        <Faq />
        <Blog />
        <Newsletter />
      </main>
      <Footer />
      <WhatsappWidget />
    </div>
  );
}