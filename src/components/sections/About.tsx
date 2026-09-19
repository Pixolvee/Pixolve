import { Globe2, ShieldCheck, Sparkles, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const values = [
  { icon: Globe2, title: "Think in systems", desc: "Kami melihat koneksi antara user, proses, data, dan teknologi." },
  { icon: Sparkles, title: "Bias for clarity", desc: "Keputusan lebih cepat saat tujuan dan trade-off terlihat jelas." },
  { icon: Users, title: "Partner, not vendor", desc: "Tim senior yang ikut memiliki outcome bersama Anda." },
  { icon: ShieldCheck, title: "Build with care", desc: "Kualitas, keamanan, dan maintainability bukan bonus." },
];

export function About() {
  return (
    <section id="tentang" className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8" data-testid="about-section">
      <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div className="relative overflow-hidden rounded-3xl bg-[#002365] p-8 text-white sm:p-12" data-testid="about-story-card">
          <div className="absolute -right-16 -top-16 size-48 rounded-full border-[24px] border-[#ffe400]/20" />
          <p className="relative text-xs font-bold uppercase tracking-[0.22em] text-[#ffe400]">Tentang Pixolve</p>
          <p className="relative mt-10 font-heading text-3xl font-extrabold leading-tight">Teknologi yang terasa dekat dengan manusia yang memakainya.</p>
          <p className="relative mt-6 text-sm leading-7 text-blue-100">Kami berdiri dari keyakinan sederhana: proyek digital yang bagus tidak dimulai dari framework, tetapi dari pemahaman yang tajam terhadap masalah. Sejak hari pertama, kami bekerja sebagai partner produk—bukan sekadar vendor.</p>
          <div className="relative mt-12 grid grid-cols-2 gap-6 border-t border-white/15 pt-6">
            <div><p className="text-3xl font-black text-[#ffe400]">2019</p><p className="mt-1 text-xs text-blue-200">tahun berdiri</p></div>
            <div><p className="text-3xl font-black text-[#ffe400]">12</p><p className="mt-1 text-xs text-blue-200">kota partner</p></div>
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="Cara kami berpikir" title="Ambisi besar butuh fondasi yang bisa dipercaya." body="Visi kami adalah menjadi tim teknologi pilihan bagi perusahaan yang ingin menciptakan perubahan nyata. Misi kami: mengubah kompleksitas menjadi produk yang mudah dipakai, diukur, dan dikembangkan." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2" data-testid="about-values">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <Icon className="size-5 text-[#002365]" />
                <h3 className="mt-5 font-bold text-[#002365]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}