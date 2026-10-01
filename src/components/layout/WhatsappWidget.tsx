import { useState } from "react";
import { ArrowUpRight, MessageCircle, X } from "lucide-react";

export function WhatsappWidget() {
  const [open, setOpen] = useState(false);
  const openWhatsapp = (message = "Halo Pixolve, saya ingin konsultasi tentang proyek digital.") => {
    window.open(`https://wa.me/6283848581998?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-5 right-5 z-40" data-testid="whatsapp-floating-widget">
      <button type="button" onClick={() => setOpen((v) => !v)} className="relative flex size-14 items-center justify-center rounded-full bg-[#ffe400] text-[#002365] shadow-[0_12px_32px_rgba(0,35,101,.25)] transition-transform hover:scale-105" aria-label="Buka konsultasi WhatsApp">
        <MessageCircle className="size-6" />
        <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-[#00153d] bg-[#0e9f85]" />
      </button>
      {open && (
        <div className="absolute bottom-16 right-0 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="bg-[#002365] p-4 text-white">
            <div className="flex items-center justify-between">
              <p className="font-bold">Pixolve Fast Consult</p>
              <button type="button" onClick={() => setOpen(false)} aria-label="Tutup chat"><X className="size-4" /></button>
            </div>
            <p className="mt-1 text-xs text-blue-200">Online · biasanya membalas cepat</p>
          </div>
          <div className="space-y-3 p-4">
            <p className="rounded-xl bg-[#eef3f9] p-3 text-xs leading-5 text-[#002365]">Halo! Apa yang sedang ingin Anda bangun bersama Pixolve?</p>
            <button type="button" onClick={() => openWhatsapp("Halo Pixolve, saya ingin konsultasi Web Development.")} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-left text-xs font-semibold text-[#002365] hover:border-[#002365]">Konsultasi Web Development</button>
            <button type="button" onClick={() => openWhatsapp("Halo Pixolve, saya ingin tahu estimasi harga proyek.")} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-left text-xs font-semibold text-[#002365] hover:border-[#002365]">Tanya estimasi harga</button>
            <button type="button" onClick={() => openWhatsapp()} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ffe400] px-3 py-2 text-xs font-bold text-[#002365]">Buka WhatsApp <ArrowUpRight className="size-3" /></button>
          </div>
        </div>
      )}
    </div>
  );
}