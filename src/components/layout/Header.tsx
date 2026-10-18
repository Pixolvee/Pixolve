import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";

const navLinks: Array<[string, string]> = [
  ["Beranda", "/#hero"],
  ["Layanan", "/#layanan"],
  ["Projek", "/portofolio"],
  ["Tim", "/#tim"],
];

export function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    } else {
      e.preventDefault();
      navigate(href);
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
        </nav>
        <div className="hidden items-center gap-3 lg:flex" data-testid="header-actions">
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