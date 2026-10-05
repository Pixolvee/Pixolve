export interface PortfolioCategory {
  id: string;
  label: string;
}

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  { id: "all", label: "Semua" },
  { id: "web-development", label: "Web Development" },
  { id: "mobile-app", label: "Mobile App" },
  { id: "ui-ux", label: "UI/UX Design" },
  { id: "data-science", label: "Data Science & AI" },
];

export function matchCategory(item: CaseStudy, categoryId: string): boolean {
  if (categoryId === "all") return true;
  const targetCategory = PORTFOLIO_CATEGORIES.find((c) => c.id === categoryId);
  if (!targetCategory) return true;
  const label = targetCategory.label.toLowerCase();

  const primaryMatch = item.category?.toLowerCase() === label;
  const multiMatch = item.categories?.some((c) => c.toLowerCase() === label);

  return Boolean(primaryMatch || multiMatch);
}

export interface CaseStudy {
  slug: string;
  name: string;
  image?: string; // path dari folder public, WAJIB diawali "/" (contoh: "/images/x.jpg")
  color: string;
  beforeImage?: string;
  afterImage?: string;
  text: string;
  year?: string;
  result?: string;
  before?: string;
  after?: string;

  // Kategori & Tipe
  category?: string;
  categories?: string[];

  // ---- Detail halaman proyek (semua opsional) ----
  status?: string; // contoh: "Live (v1.3)"
  type?: string; // contoh: "Desktop App"
  tags?: string[];
  about?: string[]; // satu string = satu paragraf
  features?: string[]; // format "Judul: deskripsi" agar judul tampil tebal
  techStack?: { label: string; items: string[] }[];
  /** Gambar galeri di public/case-studies/. Yang gagal dimuat otomatis disembunyikan. */
  gallery?: { src: string; alt: string }[];
  demoUrl?: string;
  githubUrl?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "resto",
    name: "Mobile Restaurant with Face Recognition",
    category: "Mobile App",
    categories: ["Mobile App", "UI/UX Design", "Data Science & AI"],
    type: "Mobile & AI Application",
    image: "/Resto.png",
    color: "from-[#ffe400] to-[#ffb700]",
    beforeImage: "/case-studies/Resto/resto-lama.jpeg",
    afterImage: "/case-studies/Resto/resto-baru.jpeg",
    text: "A project focused on implementing face recognition technology for mobile restaurant management, enhancing customer experience and service efficiency. The system uses modern web technologies like Flutter, HTML, CSS, JavaScript, and PHP.",
  },
  {
    slug: "arunika-finance",
    name: "Top-up Sales",
    category: "Web Development",
    categories: ["Web Development", "UI/UX Design"],
    type: "Web Application",
    image: "/Pulsa.png",
    color: "from-[#75a8ff] to-[#002365]",
    beforeImage: "/case-studies/Pulsa/pulsa-lama.jpeg",
    afterImage: "/case-studies/Pulsa/pulsa-baru.jpeg",
    text: "A project focused on managing and processing mobile top-up sales efficiently, using modern web technologies such as HTML, CSS, and JavaScript.",
  },
  {
    slug: "time-management",
    name: "Study Time Management System (SIM)",
    category: "Web Development",
    categories: ["Web Development"],
    type: "Web Application",
    image: "/SIM.png",
    color: "from-[#0e9f85] to-[#002365]",
    beforeImage: "/case-studies/SIM/SIM-lama.png",
    afterImage: "/case-studies/SIM/SIM-baru.png",
    text: "A project focused on developing a system to manage and optimize study time, helping users track their learning schedules and improve productivity. The system uses modern technologies such as vue js, laravel.",
  },
  {
    slug: "ticket-booking",
    name: "Mobile Movie Ticket Booking System",
    category: "Mobile App",
    categories: ["Mobile App", "UI/UX Design"],
    type: "Mobile Application",
    image: "/bioskop.png",
    color: "from-[#5eead4] to-[#002365]",
    text: "A project focused on developing a mobile application for booking movie tickets, integrating features like seat selection and payment options. The system utilizes modern web technologies such as Flutter.",
    year: "2025",
    status: "Live (v1.3)",
    beforeImage: "/case-studies/Bioskop/bioskop-lama.png",
    afterImage: "/case-studies/Bioskop/bioskop-baru.png",
    tags: ["Flutter", "Dart", "Desktop", "Process Management"],
    about: [
      'DevPulse adalah solusi modern untuk menghentikan "Terminal Juggling". Aplikasi desktop ini memungkinkan developer menjalankan berbagai project (React, Laravel, Flutter, dll) secara bersamaan dalam satu dashboard elegan.',
      "Dilengkapi dengan auto-detect framework dan port manager, DevPulse memastikan workflow development tetap rapi, ringan (hanya 10MB), dan produktif. Built by a developer, for developers.",
    ],
    gallery: [
      { src: "/case-studies/devpulse-1.webp", alt: "Dashboard utama DevPulse" },
      { src: "/case-studies/devpulse-2.webp", alt: "Live logs dan monitoring per project" },
      { src: "/case-studies/devpulse-3.webp", alt: "Port manager" },
    ],
    demoUrl: "https://devpulse-teal.vercel.app/",
    githubUrl: "https://github.com/Zulkifli1409/dev_pulse/releases",
  },
  {
    slug: "Donasi",
    name: "Donation Website",
    category: "Web Development",
    categories: ["Web Development", "UI/UX Design"],
    type: "Web Platform",
    image: "/Donasi.png",
    color: "from-[#ffe400] to-[#ffb700]",
    text: "A project focused on developing a web platform for online donations, allowing users to easily contribute to various causes and track their donations. The system utilizes modern web technologies such as HTML, CSS, Golang.",
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);