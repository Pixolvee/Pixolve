import { Toaster } from "sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsappWidget } from "@/components/layout/WhatsappWidget";

import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { Team } from "@/components/sections/Team";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8fafc] text-[#0f172a] pb-16 lg:pb-0">
      <Toaster position="top-right" richColors />
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Team />
        <QuoteForm />
      </main>
      <Footer />
      <WhatsappWidget />
    </div>
  );
}
