import { BrainCircuit, Code2, Palette, Smartphone, TestTube2, type LucideIcon } from "lucide-react";

export type Service = {
  title: string;
  slug: string;
  short: string;
  detail: string;
  icon: LucideIcon;
  number: string;
};

export const services: Service[] = [
  { title: "Web Development", slug: "web-development", short: "Produk digital yang cepat, aman, dan siap scale.", detail: "Portal SaaS, marketplace, dan platform enterprise dengan arsitektur yang mudah dikembangkan.", icon: Code2, number: "01" },
  { title: "Mobile App Development", slug: "mobile-app", short: "Experience mobile yang terasa natural di setiap layar.", detail: "Aplikasi iOS & Android native atau cross-platform dengan offline sync dan performa mulus.", icon: Smartphone, number: "02" },
  { title: "QA & Testing", slug: "qa-testing", short: "Rilis lebih percaya diri, tanpa bug yang menghambat growth.", detail: "Automated end-to-end test, load testing, dan audit keamanan untuk produk kritikal.", icon: TestTube2, number: "03" },
  { title: "Data Science", slug: "data-science", short: "Ubah data operasional menjadi keputusan yang tajam.", detail: "Dashboard BI, predictive model, dan pipeline AI yang terukur untuk bisnis Anda.", icon: BrainCircuit, number: "04" },
  { title: "UI/UX Design", slug: "ui-ux-design", short: "Interface yang indah, intuitif, dan fokus pada outcome.", detail: "Riset pengguna, prototype interaktif, dan design system yang mempercepat delivery.", icon: Palette, number: "05" },
];