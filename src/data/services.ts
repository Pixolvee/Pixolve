import { BrainCircuit, Code2, Palette, Smartphone, TestTube2, type LucideIcon } from "lucide-react";

export type Service = {
  title: string;
  slug: string;
  short: string;
  detail: string;
  description: string;
  icon: LucideIcon;
  number: string;
};

export const services: Service[] = [
  {
    title: "Web Development",
    slug: "web-development",
    short: "Produk digital yang cepat, aman, dan siap scale.",
    detail: "Portal SaaS, marketplace, dan platform enterprise dengan arsitektur yang mudah dikembangkan.",
    description: "Kami merancang dan mengembangkan website korporat, aplikasi web SaaS, marketplace, dan sistem enterprise dengan arsitektur modern yang cepat, aman, responsif di semua perangkat, serta siap scale seiring bertumbuhnya bisnis Anda.",
    icon: Code2,
    number: "01",
  },
  {
    title: "Mobile App Development",
    slug: "mobile-app",
    short: "Experience mobile yang terasa natural di setiap layar.",
    detail: "Aplikasi iOS & Android native atau cross-platform dengan offline sync dan performa mulus.",
    description: "Pengembangan aplikasi mobile iOS dan Android (native maupun cross-platform) dengan performa mulus, sinkronisasi data yang andal, dan antarmuka yang intuitif untuk memastikan kepuasan pengguna harian.",
    icon: Smartphone,
    number: "02",
  },
  {
    title: "QA & Testing",
    slug: "qa-testing",
    short: "Rilis lebih percaya diri, tanpa bug yang menghambat growth.",
    detail: "Automated end-to-end test, load testing, dan audit keamanan untuk produk kritikal.",
    description: "Memastikan kualitas dan keandalan sistem melalui automated end-to-end testing, stress & load testing, hingga audit keamanan berkala agar produk digital Anda dapat dirilis dengan percaya diri tanpa bug yang mengganggu pengguna.",
    icon: TestTube2,
    number: "03",
  },
  {
    title: "Data Science",
    slug: "data-science",
    short: "Ubah data operasional menjadi keputusan yang tajam.",
    detail: "Dashboard BI, predictive model, dan pipeline AI yang terukur untuk bisnis Anda.",
    description: "Mentransformasi data mentah operasional menjadi wawasan bisnis yang tajam melalui visualisasi dashboard Business Intelligence, permodelan prediktif, automated data pipeline, serta implementasi kecerdasan buatan (AI) yang terukur.",
    icon: BrainCircuit,
    number: "04",
  },
  {
    title: "UI/UX Design",
    slug: "ui-ux-design",
    short: "Interface yang indah, intuitif, dan fokus pada outcome.",
    detail: "Riset pengguna, prototype interaktif, dan design system yang mempercepat delivery.",
    description: "Perancangan antarmuka digital yang berbasis riset kebutuhan pengguna, interactive prototype, dan pembuatan design system yang terstruktur untuk menjamin pengalaman pengguna yang memikat sekaligus efisiensi proses development.",
    icon: Palette,
    number: "05",
  },
];