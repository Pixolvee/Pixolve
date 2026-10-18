import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Check, LockKeyhole, MoveRight } from "lucide-react";
import { toast } from "sonner";
import { apiPost } from "@/lib/api";
import type { LeadSubmission, QuoteRequestCreate } from "@/lib/types";
import { services } from "@/data/services";

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

    // Simpan lead ke backend jika ada
    mutation.mutate(quote);

    // Arahkan ke WhatsApp
    const newWindow = window.open(waUrl, "_blank", "noopener,noreferrer");
    if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
      window.location.href = waUrl;
    }
  };

  return (
    <section id="quote-form" className="bg-[#ffe400] px-5 py-10 sm:py-14 lg:px-8" data-testid="quote-section">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
        {/* Kolom Kiri: Penjelasan Konsultasi */}
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#002365]" data-testid="quote-eyebrow">
            Konsultasi Proyek
          </span>
          <h2 className="mt-3.5 max-w-md font-heading text-3xl font-extrabold leading-tight tracking-tight text-[#002365] sm:text-4xl" data-testid="quote-title">
            Diskusikan kebutuhan produk digital Anda.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[#002365]/80 sm:text-base" data-testid="quote-body">
            Isi formulir singkat ini. Tim kami siap berdiskusi untuk memahami tujuan produk Anda dan memberikan rekomendasi solusi teknis yang tepat.
          </p>
          <div className="mt-8 space-y-3.5 text-sm font-medium text-[#002365]" data-testid="quote-benefits">
            <p className="flex items-center gap-3">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#002365]/10 text-[#002365]">
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              Respons cepat maksimal 1x24 jam kerja
            </p>
            <p className="flex items-center gap-3">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#002365]/10 text-[#002365]">
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              Tersedia NDA untuk menjaga kerahasiaan ide Anda
            </p>
            <p className="flex items-center gap-3">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#002365]/10 text-[#002365]">
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              Estimasi ruang lingkup (scope) yang transparan
            </p>
          </div>
        </div>

        {/* Kolom Kanan: Formulir yang Disederhanakan */}
        <form onSubmit={submit} className="rounded-3xl bg-white p-6 shadow-xl sm:p-8" data-testid="quote-form">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-[#002365]">
              Nama Lengkap
              <input
                required
                value={quote.full_name}
                onChange={(e) => setQuote({ ...quote, full_name: e.target.value })}
                placeholder="Nama lengkap Anda"
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-[#002365]"
              />
            </label>

            <label className="text-sm font-semibold text-[#002365]">
              Email Aktif
              <input
                required
                type="email"
                value={quote.email}
                onChange={(e) => setQuote({ ...quote, email: e.target.value })}
                placeholder="nama@email.com"
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-[#002365]"
              />
            </label>

            <label className="text-sm font-semibold text-[#002365]">
              Nomor WhatsApp
              <input
                required
                value={quote.whatsapp}
                onChange={(e) => setQuote({ ...quote, whatsapp: e.target.value })}
                placeholder="08123456789 atau +62..."
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-[#002365]"
              />
            </label>

            <label className="text-sm font-semibold text-[#002365]">
              Layanan yang Dibutuhkan
              <select
                required
                value={quote.service}
                onChange={(e) => setQuote({ ...quote, service: e.target.value })}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-[#002365]"
              >
                {services.map((s) => (
                  <option key={s.title} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-semibold text-[#002365] sm:col-span-2">
              Jelaskan Kebutuhan Anda
              <textarea
                required
                minLength={10}
                value={quote.description}
                onChange={(e) => setQuote({ ...quote, description: e.target.value })}
                placeholder="Ceritakan gambaran singkat produk, fitur utama yang diinginkan, atau kendala yang sedang dihadapi..."
                rows={4}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#002365]"
              />
            </label>
          </div>

          <div className="mt-6 flex flex-col justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center">
            <p className="flex items-center gap-2 text-xs text-slate-500">
              <LockKeyhole className="size-3.5 text-slate-400" />
              Kerahasiaan data Anda terjaga dan hanya digunakan untuk keperluan konsultasi.
            </p>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#002365] px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {mutation.isPending ? "Mengirim pesan..." : "Kirim Pesan Konsultasi"}
              <MoveRight className="ml-2 size-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}