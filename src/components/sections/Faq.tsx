import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const faqs: Array<[string, string]> = [
  ["Apakah bisa menandatangani NDA sebelum diskusi?", "Bisa. Kami terbiasa bekerja dengan informasi sensitif dan dapat menyiapkan NDA sebelum discovery dimulai."],
  ["Berapa lama proses pengerjaan proyek?", "MVP terarah biasanya membutuhkan 8–12 minggu. Durasi final bergantung pada scope, integrasi, dan tingkat validasi yang dibutuhkan."],
  ["Bagaimana metode pembayarannya?", "Pembayaran dibagi berdasarkan milestone yang disepakati di awal. Anda mendapat visibility atas progres dan deliverable di setiap tahap."],
  ["Apakah source code menjadi milik klien?", "Ya. Setelah kewajiban proyek terpenuhi, source code dan dokumentasi diserahkan sesuai klausul kontrak."],
  ["Apakah ada garansi setelah launch?", "Kami menyediakan masa garansi bug dan opsi maintenance retainer agar produk tetap sehat setelah go-live."],
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8" data-testid="faq-section">
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <SectionHeading eyebrow="Pertanyaan umum" title="Hal-hal yang biasanya ingin Anda tahu sebelum mulai." body="Jika pertanyaan Anda belum ada di sini, tim kami siap menjawabnya saat konsultasi." />
        <div className="space-y-3" data-testid="faq-list">
          {faqs.map(([question, answer], index) => (
            <details key={question} className="group rounded-2xl border border-slate-200 bg-white px-5 py-4" data-testid={`faq-item-${index + 1}`}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#002365]">
                <span>{question}</span>
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#eef3f9] text-[#002365] transition-transform group-open:rotate-180"><ChevronDown className="size-4" /></span>
              </summary>
              <p className="max-w-2xl pt-4 text-sm leading-7 text-slate-500">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}