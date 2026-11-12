import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Search } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { SearchModal } from "@/components/layout/SearchModal";

const navLinks: Array<[string, string]> = [
  ["Beranda", "/#hero"],
  ["Layanan", "/#layanan"],
  ["Studi Kasus", "/#portofolio"],
  ["Tim", "/#tim"],
];

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#00153d]/90 shadow-lg backdrop-blur-xl" data-testid="site-header">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <BrandMark light />

          {/* Desktop nav */}
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

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex" data-testid="header-actions">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="rounded-full p-2.5 text-blue-200 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Buka pencarian"
              data-testid="header-search-button"
            >
              <Search className="size-5" />
            </button>
            <a
              href="/#quote-form"
              onClick={(e) => handleNavClick(e, "/#quote-form")}
              className="rounded-full bg-[#ffe400] px-5 py-3 text-sm font-bold text-[#00153d] shadow-[0_0_24px_rgba(255,228,0,.16)] transition-transform hover:-translate-y-0.5"
              data-testid="header-consultation-button"
            >
              Konsultasi Gratis <ArrowUpRight className="ml-1 inline size-4" />
            </a>
          </div>

          {/* Mobile: Search button (hamburger removed) */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="rounded-full p-2.5 text-blue-200 hover:bg-white/10 hover:text-white transition-colors lg:hidden"
            aria-label="Buka pencarian"
            data-testid="mobile-search-button"
          >
            <Search className="size-5" />
          </button>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
