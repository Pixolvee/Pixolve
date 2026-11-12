import { useLocation, useNavigate } from "react-router-dom";
import { Home, Layers, Users, MessageCircle, Briefcase } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  matchPaths?: string[];
};

const navItems: NavItem[] = [
  {
    label: "Beranda",
    href: "/#hero",
    icon: <Home className="size-5" />,
    matchPaths: ["/"],
  },
  {
    label: "Layanan",
    href: "/#layanan",
    icon: <Briefcase className="size-5" />,
    matchPaths: ["/"],
  },
  {
    label: "Portofolio",
    href: "/portofolio",
    icon: <Layers className="size-5" />,
    matchPaths: ["/portofolio"],
  },
  {
    label: "Tim",
    href: "/#tim",
    icon: <Users className="size-5" />,
    matchPaths: ["/"],
  },
  {
    label: "Konsultasi",
    href: "/#quote-form",
    icon: <MessageCircle className="size-5" />,
    matchPaths: ["/"],
  },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (item: NavItem): boolean => {
    const paths = item.matchPaths ?? [];
    // For portofolio, also match sub-pages
    if (item.href === "/portofolio") {
      return location.pathname.startsWith("/portofolio");
    }
    return paths.includes(location.pathname);
  };

  const handleClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault();

    const href = item.href;

    if (href.startsWith("/#") || href.startsWith("#")) {
      const hash = href.startsWith("/#") ? href.slice(1) : href;
      const targetId = hash.replace("#", "");

      if (location.pathname === "/") {
        if (targetId === "hero") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
        window.history.pushState(null, "", hash);
      } else {
        navigate(`/${hash}`);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 lg:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Navigasi bawah"
      data-testid="bottom-navigation"
    >
      <div className="flex items-stretch h-16">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item)}
              className={`flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors ${
                active
                  ? "text-[#002365]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              data-testid={`bottom-nav-${item.label.toLowerCase()}`}
            >
              <span
                className={`relative flex items-center justify-center rounded-xl px-3 py-1 transition-all ${
                  active ? "bg-[#002365]/10" : "bg-transparent"
                }`}
              >
                {item.icon}
              </span>
              <span
                className={`text-[10px] font-semibold leading-none tracking-tight ${
                  active ? "text-[#002365]" : "text-slate-400"
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

