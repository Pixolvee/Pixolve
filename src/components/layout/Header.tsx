import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { BrandMark } from "@/components/ui/BrandMark";
import { services } from "@/data/services";

const navLinks: Array<[string, string]> = [
  ["Beranda", "/#hero"],
  ["Layanan", "/#layanan"],
  ["Portofolio", "/#portofolio"],
  ["Harga", "/#harga"],
  ["FAQ", "/#faq"],
];

export function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [language, setLanguage] = useState<"ID" | "EN">("ID");
  const location = useLocation();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const next = language === "ID" ? "EN" : "ID";
    setLanguage(next);
    toast.info(next === "EN" ? "Mode English sedang disiapkan untuk Pixolve." : "Mode Bahasa Indonesia aktif.");
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenu(false);

    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    if (href.startsWith("/#") || href.startsWith("#")) {
      e.preventDefault();
      const hash = href.startsWith("/#") ? href.slice(1) : href;
      const targetId = hash.replace("#", "");

      if (location.pathname === "/") {
        if (targetId === "hero") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
        window.history.pushState(null, "", hash);
      } else {
        navigate(`/${hash}`);
      }
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#00153d]/90 shadow-lg backdrop-blur-xl" data-testid="site-header">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <BrandMark light />
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigasi utama" data-testid="desktop-navigation">
          {navLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="text-sm font-medium text-blue-100 transition-colors hover:text-[#ffe400]"
              data-testid={`nav-link-${label.toLowerCase()}`}
            >
              {label}
            </a>
          ))}
          <details className="relative" data-testid="nav-services-dropdown">
            <summary className="flex cursor-pointer list-none items-center gap-1 text-sm font-medium text-blue-100 hover:text-[#ffe400]">Layanan <ChevronDown className="size-3" /></summary>
            <div className="absolute right-0 top-8 w-64 rounded-2xl border border-white/10 bg-[#00153d] p-3 shadow-2xl" data-testid="nav-services-menu">
              {services.map((service) => (
                <Link
                  key={service.title}
                  to={`/layanan/${service.slug}`}
                  onClick={() => {
                    const details = document.querySelector('[data-testid="nav-services-dropdown"]') as HTMLDetailsElement | null;
                    if (details) details.open = false;
                  }}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-blue-100 hover:bg-white/10 hover:text-[#ffe400]"
                  data-testid={`nav-service-${service.number}`}
                >
                  {service.number} {service.title}
                </Link>
              ))}
            </div>
          </details>
        </nav>
        <div className="hidden items-center gap-3 lg:flex" data-testid="header-actions">
          <button type="button" onClick={toggleLanguage} className="rounded-full border border-white/20 px-3 py-2 text-xs font-bold text-white hover:border-[#ffe400] hover:text-[#ffe400]" data-testid="language-switch-button">{language} <span className="text-white/40">|</span> {language === "ID" ? "EN" : "ID"}</button>
          <a
            href="/#quote-form"
            onClick={(e) => handleNavClick(e, "/#quote-form")}
            className="rounded-full bg-[#ffe400] px-5 py-3 text-sm font-bold text-[#00153d] shadow-[0_0_24px_rgba(255,228,0,.16)] transition-transform hover:-translate-y-0.5"
            data-testid="header-consultation-button"
          >
            Konsultasi Gratis <ArrowUpRight className="ml-1 inline size-4" />
          </a>
        </div>
        <button type="button" onClick={() => setMobileMenu((v) => !v)} className="rounded-lg p-2 text-white lg:hidden" aria-label="Buka menu" data-testid="mobile-menu-toggle">{mobileMenu ? <X /> : <Menu />}</button>
      </div>
      {mobileMenu && (
        <div className="border-t border-white/10 bg-[#00153d] px-5 pb-5 lg:hidden" data-testid="mobile-navigation">
          {navLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="block border-b border-white/10 py-3 text-sm text-blue-100"
              data-testid={`mobile-nav-link-${label.toLowerCase()}`}
            >
              {label}
            </a>
          ))}
          <a
            href="/#quote-form"
            onClick={(e) => handleNavClick(e, "/#quote-form")}
            className="mt-4 block rounded-full bg-[#ffe400] px-4 py-3 text-center text-sm font-bold text-[#00153d]"
            data-testid="mobile-consultation-button"
          >
            Konsultasi Gratis
          </a>
        </div>
      )}
    </header>
  );
}