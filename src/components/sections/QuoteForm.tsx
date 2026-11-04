import { useState, useRef, useEffect, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Check, ChevronDown, LockKeyhole, MoveRight } from "lucide-react";
import { toast } from "sonner";
import { apiPost } from "@/lib/api";
import type { LeadSubmission, QuoteRequestCreate } from "@/lib/types";
import { services } from "@/data/services";

/** Custom dropdown pilihan layanan */
function ServiceSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Tutup ketika klik di luar
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex h-11 w-full items-center justify-between rounded-xl border px-3.5 text-sm text-slate-800 outline-none transition ${
          open
            ? "border-[#002365] ring-2 ring-[#002365]/10"
            : "border-slate-200 hover:border-slate-300"
        } bg-white`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          className={`ml-2 size-4 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
        >
          {services.map((s) => {
            const isActive = s.title === value;
            return (
              <li key={s.slug} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(s.title);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
                    isActive
                      ? "bg-[#002365] text-white"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${isActive ? "bg-white/15" : "bg-slate-100"}`}>
                    <s.icon className="size-3.5" />
                  </span>
                  {s.title}
                  {isActive && <Check className="ml-auto size-4" strokeWidth={2.5} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const initialQuote: QuoteRequestCreate = {
  full_name: "",
  email: "",
  whatsapp: "",
  service: "Web Development",
  description: "",
};

export function QuoteForm() {
  const [quote, setQuote] = useState<QuoteRequestCreate>(initialQuote);
  const mutation = useMutation({
    mutationFn: (payload: QuoteRequestCreate) => apiPost<LeadSubmission>("/leads/quote", payload),
    onSuccess: (result) => {
      toast.success(result.message || "Pesan konsultasi Anda berhasil dikirim!");
      setQuote(initialQuote);
    },
    onError: () => {
      toast.success("Mengarahkan ke WhatsApp...");
      setQuote(initialQuote);
    },
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = [
      "Halo Pixolve, saya ingin berkonsultasi mengenai kebutuhan proyek digital.",
      "",
      "📋 *Detail Kontak:*",
      `• *Nama Lengkap:* ${quote.full_name}`,
      `• *Email:* ${quote.email}`,
      `• *Nomor WhatsApp:* ${quote.whatsapp}`,
      `• *Layanan yang Dibutuhkan:* ${quote.service}`,
      "",
      "📝 *Kebutuhan Proyek:*",
      quote.description,
    ].join("\n");

    const waUrl = `https://wa.me/6283848581998?text=${encodeURIComponent(message)}`;

    mutation.mutate(quote);

    const newWindow = window.open(waUrl, "_blank", "noopener,noreferrer");
    if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
      window.location.href = waUrl;
    }
  };

  return (
    <section id="quote-form" className="bg-[#ffe400] px-4 py-10 sm:px-5 sm:py-14 lg:px-8" data-testid="quote-section">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-start">

        {/* Kolom Kiri: Penjelasan Konsultasi */}
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#002365]" data-testid="quote-eyebrow">
            Konsultasi Proyek
          </span>
          <h2 className="mt-3 font-heading text-2xl font-extrabold leading-tight tracking-tight text-[#002365] sm:text-3xl lg:text-4xl" data-testid="quote-title">
            Diskusikan kebutuhan produk digital Anda.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#002365]/80 sm:text-base" data-testid="quote-body">
            Isi formulir singkat ini. Tim kami siap berdiskusi untuk memahami tujuan produk Anda dan memberikan rekomendasi solusi teknis yang tepat.
          </p>
          <div className="mt-6 space-y-3 text-sm font-medium text-[#002365]" data-testid="quote-benefits">
            {[
              "Respons cepat maksimal 1×24 jam kerja",
              "Tersedia NDA untuk menjaga kerahasiaan ide Anda",
              "Estimasi ruang lingkup (scope) yang transparan",
            ].map((benefit) => (
              <p key={benefit} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#002365]/10">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {benefit}
              </p>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Formulir */}
        <form onSubmit={submit} className="rounded-2xl bg-white p-5 shadow-xl sm:rounded-3xl sm:p-8" data-testid="quote-form">
          <div className="grid gap-4 sm:grid-cols-2">

            <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#002365]">
              Nama Lengkap
              <input
                required
                value={quote.full_name}
                onChange={(e) => setQuote({ ...quote, full_name: e.target.value })}
                placeholder="Nama lengkap Anda"
                className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm font-normal text-slate-800 outline-none transition focus:border-[#002365] focus:ring-2 focus:ring-[#002365]/10"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#002365]">
              Email Aktif
              <input
                required
                type="email"
                value={quote.email}
                onChange={(e) => setQuote({ ...quote, email: e.target.value })}
                placeholder="nama@email.com"
                className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm font-normal text-slate-800 outline-none transition focus:border-[#002365] focus:ring-2 focus:ring-[#002365]/10"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#002365]">
              Nomor WhatsApp
              <input
                required
                value={quote.whatsapp}
                onChange={(e) => setQuote({ ...quote, whatsapp: e.target.value })}
                placeholder="08123456789"
                className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm font-normal text-slate-800 outline-none transition focus:border-[#002365] focus:ring-2 focus:ring-[#002365]/10"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#002365]">
              Layanan
              <ServiceSelect
                value={quote.service}
                onChange={(val) => setQuote({ ...quote, service: val })}
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#002365] sm:col-span-2">
              Jelaskan Kebutuhan Anda
              <textarea
                required
                minLength={10}
                value={quote.description}
                onChange={(e) => setQuote({ ...quote, description: e.target.value })}
                placeholder="Ceritakan gambaran singkat produk, fitur utama, atau kendala yang dihadapi…"
                rows={4}
                className="w-full resize-none rounded-xl border border-slate-200 px-3.5 py-3 text-sm font-normal text-slate-800 outline-none transition focus:border-[#002365] focus:ring-2 focus:ring-[#002365]/10"
              />
            </label>
          </div>

          {/* Footer form */}
          <div className="mt-5 space-y-4 border-t border-slate-100 pt-5">
            <p className="flex items-start gap-2 text-xs text-slate-500">
              <LockKeyhole className="mt-0.5 size-3.5 shrink-0 text-slate-400" />
              Data Anda terjaga dan hanya digunakan untuk keperluan konsultasi.
            </p>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#002365] py-3.5 text-sm font-bold text-white transition hover:bg-[#001a4d] active:scale-95 disabled:opacity-60 sm:w-auto sm:rounded-full sm:px-8"
            >
              {mutation.isPending ? "Mengirim…" : "Kirim Pesan Konsultasi"}
              <MoveRight className="size-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
