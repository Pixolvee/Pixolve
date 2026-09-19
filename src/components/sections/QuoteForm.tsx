import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Check, LockKeyhole, MoveRight } from "lucide-react";
import { toast } from "sonner";
import { apiPost } from "@/lib/api";
import type { LeadSubmission, QuoteRequestCreate } from "@/lib/types";
import { services } from "@/data/services";

const initialQuote: QuoteRequestCreate = {
  full_name: "", email: "", whatsapp: "", company: "",
  service: "Web Development", project_scale: "MVP / Validasi ide",
  budget_range: "Rp50–150 juta", deadline: "Belum ditentukan", description: "",
};

export function QuoteForm() {
  const [quote, setQuote] = useState<QuoteRequestCreate>(initialQuote);
  const mutation = useMutation({
    mutationFn: (payload: QuoteRequestCreate) => apiPost<LeadSubmission>("/leads/quote", payload),
    onSuccess: (result) => { toast.success(result.message); setQuote(initialQuote); },
    onError: () => toast.error("Form belum terkirim. Silakan coba lagi beberapa saat."),
  });
  const submit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); mutation.mutate(quote); };

  return (
    <section id="quote-form" className="bg-[#ffe400] px-5 py-20 sm:py-28 lg:px-8" data-testid="quote-section">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#002365]" data-testid="quote-eyebrow">Start a conversation</p>
          <h2 className="mt-4 max-w-md font-heading text-4xl font-extrabold leading-tight tracking-tight text-[#002365] sm:text-5xl" data-testid="quote-title">Ceritakan tantangan digital Anda.</h2>
          <p className="mt-6 max-w-md text-base leading-7 text-[#002365]/75" data-testid="quote-body">Isi form singkat ini. Kami akan membalas dengan pertanyaan yang tepat, bukan template penawaran yang generik.</p>
          <div className="mt-10 space-y-4 text-sm text-[#002365]" data-testid="quote-benefits">
            <p className="flex items-center gap-3"><Check className="size-4" /> Respons awal dalam 1 hari kerja</p>
            <p className="flex items-center gap-3"><Check className="size-4" /> NDA tersedia sebelum discovery</p>
            <p className="flex items-center gap-3"><Check className="size-4" /> Estimasi scope transparan</p>
          </div>
        </div>
        <form onSubmit={submit} className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8" data-testid="quote-form">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-[#002365]">Nama lengkap<input required value={quote.full_name} onChange={(e) => setQuote({ ...quote, full_name: e.target.value })} placeholder="Nama Anda" className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#002365]" /></label>
            <label className="text-sm font-semibold text-[#002365]">Email bisnis<input required type="email" value={quote.email} onChange={(e) => setQuote({ ...quote, email: e.target.value })} placeholder="nama@perusahaan.com" className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#002365]" /></label>
            <label className="text-sm font-semibold text-[#002365]">Nomor WhatsApp<input required value={quote.whatsapp} onChange={(e) => setQuote({ ...quote, whatsapp: e.target.value })} placeholder="+62 812..." className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#002365]" /></label>
            <label className="text-sm font-semibold text-[#002365]">Nama perusahaan<input required value={quote.company} onChange={(e) => setQuote({ ...quote, company: e.target.value })} placeholder="Nama perusahaan" className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#002365]" /></label>
            <label className="text-sm font-semibold text-[#002365]">Fokus layanan<select required value={quote.service} onChange={(e) => setQuote({ ...quote, service: e.target.value })} className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#002365]">{services.map((s) => <option key={s.title}>{s.title}</option>)}</select></label>
            <label className="text-sm font-semibold text-[#002365]">Skala proyek<select required value={quote.project_scale} onChange={(e) => setQuote({ ...quote, project_scale: e.target.value })} className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#002365]"><option>MVP / Validasi ide</option><option>Scale-up / Produk berjalan</option><option>Enterprise / Multi-team</option></select></label>
            <label className="text-sm font-semibold text-[#002365]">Estimasi budget<select required value={quote.budget_range} onChange={(e) => setQuote({ ...quote, budget_range: e.target.value })} className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#002365]"><option>Rp50–150 juta</option><option>Rp150–450 juta</option><option>Di atas Rp450 juta</option><option>Belum tahu, bantu hitungkan</option></select></label>
            <label className="text-sm font-semibold text-[#002365]">Target mulai<select required value={quote.deadline} onChange={(e) => setQuote({ ...quote, deadline: e.target.value })} className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#002365]"><option>Secepatnya</option><option>1–3 bulan</option><option>3–6 bulan</option><option>Belum ditentukan</option></select></label>
            <label className="text-sm font-semibold text-[#002365] sm:col-span-2">Ceritakan kebutuhan Anda<textarea required minLength={12} value={quote.description} onChange={(e) => setQuote({ ...quote, description: e.target.value })} placeholder="Apa yang ingin dibangun atau diperbaiki?" className="mt-2 min-h-28 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#002365]" /></label>
          </div>
          <div className="mt-6 flex flex-col justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center">
            <p className="flex items-center gap-2 text-xs text-slate-500"><LockKeyhole className="size-3" /> Data Anda hanya digunakan untuk konsultasi.</p>
            <button type="submit" disabled={mutation.isPending} className="inline-flex items-center justify-center rounded-full bg-[#002365] px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60">{mutation.isPending ? "Mengirim..." : "Kirim kebutuhan saya"} <MoveRight className="ml-2 size-4" /></button>
          </div>
        </form>
      </div>
    </section>
  );
}