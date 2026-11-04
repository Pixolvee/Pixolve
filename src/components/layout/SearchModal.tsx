import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Layers, Code2, FileText, ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { useCaseStudies } from "@/lib/hooks/useCaseStudies";
import { usePosts } from "@/lib/hooks/usePosts";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

type ResultItem = {
  type: "layanan" | "portofolio" | "artikel";
  label: string;
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { data: caseStudies = [] } = useCaseStudies();
  const { data: postsData } = usePosts({ limit: 50 });
  const posts = postsData?.data ?? [];

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
    }
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const q = query.trim().toLowerCase();

  const results: ResultItem[] = q.length < 1 ? [] : [
    // Layanan
    ...services
      .filter((s) =>
        s.title.toLowerCase().includes(q) ||
        s.short.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      )
      .map((s) => ({
        type: "layanan" as const,
        label: "Layanan",
        title: s.title,
        description: s.short,
        href: `/#layanan`,
        icon: <Code2 className="size-4 text-[#0e9f85]" />,
      })),

    // Portofolio / Studi Kasus
    ...caseStudies
      .filter((c) =>
        c.name.toLowerCase().includes(q) ||
        (c.text || "").toLowerCase().includes(q) ||
        (c.category || "").toLowerCase().includes(q)
      )
      .slice(0, 5)
      .map((c) => ({
        type: "portofolio" as const,
        label: "Portofolio",
        title: c.name,
        description: c.text || c.category || "",
        href: `/portofolio/${c.slug}`,
        icon: <Layers className="size-4 text-[#002365]" />,
      })),

    // Artikel / Blog
    ...posts
      .filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q)
      )
      .slice(0, 5)
      .map((p) => ({
        type: "artikel" as const,
        label: "Artikel",
        title: p.title,
        description: p.excerpt,
        href: `/blog/${p.slug}`,
        icon: <FileText className="size-4 text-amber-500" />,
      })),
  ];

  const handleSelect = useCallback((href: string) => {
    onClose();
    // If it's a hash link, handle scroll
    if (href.startsWith("/#")) {
      const targetId = href.slice(2);
      if (window.location.pathname === "/") {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${targetId}`);
      } else {
        navigate(`/#${targetId}`);
      }
    } else {
      navigate(href);
    }
  }, [navigate, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-16 sm:pt-24"
      role="dialog"
      aria-modal="true"
      aria-label="Cari konten"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative z-10 w-full max-w-xl rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200/80 overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3.5">
          <Search className="size-5 shrink-0 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari layanan, portofolio, atau artikel…"
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            aria-label="Tutup pencarian"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {q.length < 1 ? (
            /* Quick links when no query */
            <div className="p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Jelajahi
              </p>
              <div className="space-y-1">
                {[
                  { label: "Semua Layanan", href: "/#layanan", icon: <Code2 className="size-4 text-[#0e9f85]" /> },
                  { label: "Portofolio Proyek", href: "/portofolio", icon: <Layers className="size-4 text-[#002365]" /> },
                ].map((item) => (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => handleSelect(item.href)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                    <ArrowUpRight className="ml-auto size-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <ul className="p-2">
              {results.map((item, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => handleSelect(item.href)}
                    className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-slate-50 transition-colors group"
                  >
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 group-hover:bg-white transition-colors">
                      {item.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {item.label}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-900 truncate">{item.title}</p>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.description}</p>
                    </div>
                    <ArrowUpRight className="mt-1 size-3.5 shrink-0 text-slate-300 group-hover:text-slate-500 transition-colors" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-10 text-center">
              <Search className="mx-auto size-8 text-slate-200" />
              <p className="mt-3 text-sm text-slate-500">
                Tidak ada hasil untuk "<span className="font-semibold text-slate-700">{query}</span>"
              </p>
              <p className="mt-1 text-xs text-slate-400">Coba kata kunci lain</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
