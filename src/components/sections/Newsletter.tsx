import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiPost } from "@/lib/api";
import type { NewsletterSignup } from "@/lib/types";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const mutation = useMutation({
    mutationFn: (value: string) => apiPost<NewsletterSignup>("/leads/newsletter", { email: value }),
    onSuccess: () => { toast.success("Anda sudah terdaftar. Insight baru akan hadir di inbox Anda."); setEmail(""); },
    onError: () => toast.error("Email belum tersimpan. Periksa format email Anda."),
  });
  const submit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); mutation.mutate(email); };

  return (
    <section id="newsletter" className="bg-[#00153d] px-5 py-16 text-white sm:py-20 lg:px-8" data-testid="newsletter-section">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ffe400]">Tidak mau ketinggalan?</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Insight yang membantu Anda bergerak.</h2>
          <p className="mt-3 text-sm text-blue-200">Satu email singkat, dua kali sebulan. Tanpa spam, tanpa jargon kosong.</p>
        </div>
        <form onSubmit={submit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="newsletter-email">Email</label>
          <input id="newsletter-email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@perusahaan.com" className="h-12 min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-5 text-sm text-white outline-none placeholder:text-blue-200 focus:border-[#ffe400]" />
          <button type="submit" disabled={mutation.isPending} className="h-12 rounded-full bg-[#ffe400] px-6 text-sm font-bold text-[#00153d] disabled:opacity-60">{mutation.isPending ? "Menyimpan..." : "Berlangganan"}</button>
        </form>
      </div>
    </section>
  );
}