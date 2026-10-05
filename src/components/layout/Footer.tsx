import { useLocation, useNavigate, Link } from "react-router-dom";
import {ExternalLink, Mail, Phone } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";

const serviceLinks: Array<[string, string]> = [
  ["Web Development", "/layanan/web-development"],
  ["Mobile App", "/layanan/mobile-app"],
  ["QA & Testing", "/layanan/qa-testing"],
  ["Data Science", "/layanan/data-science"],
  ["UI/UX Design", "/layanan/ui-ux-design"],
];

const companyLinks: Array<[string, string]> = [
  ["Tentang Pixolve", "/#tentang"],
  ["Studi Kasus", "/#portofolio"],
  ["Tim & Karier", "/#tim"],
  ["Blog & Insight", "/#blog"],
  ["FAQ", "/#faq"],
];

export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    if (href.startsWith("/#") || href.startsWith("#")) {
      e.preventDefault();
      const hash = href.startsWith("/#") ? href.slice(1) : href;
      const targetId = hash.replace("#", "");

      if (location.pathname === "/") {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
        window.history.pushState(null, "", hash);
      } else {
        navigate(`/${hash}`);
      }
    }
  };

  return (
    <footer className="bg-[#00102f] px-5 py-14 text-white lg:px-8" data-testid="site-footer">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr_.8fr_1fr]">
          <div>
            <BrandMark light />
            <p className="mt-6 max-w-xs text-sm leading-7 text-blue-200">Startup software house & agensi teknologi untuk produk yang ingin tumbuh dengan fondasi yang kuat.</p>
            <div className="mt-7 flex gap-3">
              <a
                href="/#quote-form"
                onClick={(e) => handleSectionClick(e, "/#quote-form")}
                className="flex size-9 items-center justify-center rounded-full border border-white/15 text-blue-200 hover:border-[#ffe400] hover:text-[#ffe400]"
                aria-label="LinkedIn Pixolve"
              >
                <ExternalLink className="size-4" />
              </a>
              <a
                href="/#quote-form"
                onClick={(e) => handleSectionClick(e, "/#quote-form")}
                className="flex size-9 items-center justify-center rounded-full border border-white/15 text-blue-200 hover:border-[#ffe400] hover:text-[#ffe400]"
                aria-label="Email Pixolve"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#ffe400]">Layanan</p>
            <div className="mt-5 space-y-3 text-sm text-blue-200">
              {serviceLinks.map(([label, href]) => (
                <Link key={href} to={href} className="block hover:text-white">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#ffe400]">Perusahaan</p>
            <div className="mt-5 space-y-3 text-sm text-blue-200">
              {companyLinks.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleSectionClick(e, href)}
                  className="block hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#ffe400]">Hubungi kami</p>
            <div className="mt-5 space-y-4 text-sm text-blue-200">
              <p className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-[#ffe400]" /> Pixolvee@gmail.com</p>
              <p className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-[#ffe400]" /> +62 895-2220-7908</p>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-blue-300 sm:flex-row">
          <p>© 2026 Pixolve Technologies. All rights reserved.</p>
          <p>NDA ready · Privacy first · Built for impact</p>
        </div>
      </div>
    </footer>
  );
}