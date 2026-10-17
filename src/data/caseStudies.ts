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

const CATEGORY_ALIASES: Record<string, string[]> = {
  "web-development": [
    "web development",
    "pengembangan web",
    "web",
    "website",
  ],
  "mobile-app": [
    "mobile app",
    "aplikasi seluler",
    "pengembangan aplikasi seluler",
    "mobile",
  ],
  "ui-ux": [
    "ui/ux design",
    "desain ui/ux",
    "ui/ux",
    "ui ux",
    "ui ux design",
  ],
  "data-science": [
    "data science & ai",
    "sains data & ai",
    "data science",
    "ai",
  ],
};

export function matchCategory(item: CaseStudy, categoryId: string): boolean {
  if (categoryId === "all") return true;
  const targetCategory = PORTFOLIO_CATEGORIES.find((c) => c.id === categoryId);
  if (!targetCategory) return true;

  const validTerms = CATEGORY_ALIASES[categoryId] ?? [targetCategory.label.toLowerCase()];

  const isMatch = (str?: string) => {
    if (!str) return false;
    const s = str.trim().toLowerCase();
    return validTerms.includes(s);
  };

  const primaryMatch = isMatch(item.category);
  const multiMatch = item.categories?.some((c) => isMatch(c));

  return Boolean(primaryMatch || multiMatch);
}

export interface CaseStudy {
  slug: string;
  name: string;
  image?: string; // path dari folder public, WAJIB diawali "/" (contoh: "/images/x.jpg")
  thumbnail?: string; // path gambar thumbnail WebP terkompresi untuk cover kartu
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
    slug: "kari-kambing-cb-sp-ektreun",
    name: "Kari Kambing CB SP Ektreun",
    category: "Web Development",
    categories: [
      "Web Development",
      "UI/UX Design",
    ],
    type: "Website Profil Rumah Makan dan Katalog Menu",
    image: "/Mockup Kari Kambing.png",
    thumbnail: "/thumbnails/kari-kambing-cb-sp-ektreun.webp",
    color: "from-[#b7791f] to-[#26351d]",
    beforeImage: "/services/kari-kambing-before.png",
    afterImage: "/services/kari-kambing-after.png",
    text: "Website Kari Kambing CB SP Ektreun dirancang untuk memperkenalkan kuliner khas Aceh melalui tampilan digital yang elegan dan informatif. Website ini menampilkan profil rumah makan, cerita kuliner dan tradisi lokal, katalog menu seperti kari kambing, daging cincang, tulang dan sumsum, serta pilihan makanan pendamping dan minuman. Dilengkapi dengan fitur pencarian menu, informasi lokasi, peta, dan formulir pemesanan katering, website ini membantu pelanggan mengenal hidangan, menemukan lokasi rumah makan, dan merencanakan pesanan untuk acara secara lebih praktis."
  },

  {
    slug: "smartumkm",
    name: "SmartUMKM - Dashboard Manajemen Usaha",
    category: "Web Development",
    categories: [
      "Web Development",
      "UI/UX Design",
      "Data Science & AI",
    ],
    type: "Platform Manajemen Usaha Terintegrasi",
    image: "/Mockup Smart UMKM.png",
    thumbnail: "/thumbnails/smartumkm.webp",
    color: "from-[#7c3aed] to-[#4f46e5]",
    beforeImage: "/services/smartumkm-before.png",
    afterImage: "/services/smartumkm-after.png",
    text: "SmartUMKM merupakan platform digital yang dirancang untuk membantu pelaku usaha mengelola operasional bisnis dalam satu dashboard terintegrasi. Platform ini menyediakan fitur kasir dan POS, pengelolaan produk dan inventaris, pencatatan produksi dan resep, manajemen keuangan, pengelolaan pelanggan dan pegawai, serta laporan dan analitik bisnis. Dilengkapi dengan ringkasan pendapatan, total transaksi, laba bersih, dan visualisasi penjualan, SmartUMKM membantu pelaku usaha memantau kinerja bisnis, memahami tren penjualan, dan mengambil keputusan berdasarkan data secara lebih efektif."
  },

  {
    slug: "kopi-gayo",
    name: "Kopi Gayo - Website Kopi Lokal Aceh",
    category: "Web Development",
    categories: [
      "Web Development",
      "UI/UX Design",
    ],
    type: "Website Profil Bisnis dan Katalog Produk",
    image: "/Mockup Kopi Gayo.png",
    thumbnail: "/thumbnails/kopi-gayo.webp",
    color: "from-[#556044] to-[#303a20]",
    beforeImage: "/services/kopi-gayo-before.png",
    afterImage: "/services/kopi-gayo-after.png",
    text: "Website Kopi Gayo dirancang untuk memperkenalkan kopi khas Gayo, Aceh, melalui pengalaman digital yang elegan dan informatif. Website ini menampilkan profil merek, cerita asal-usul kopi, katalog produk, serta informasi lokasi dan kontak toko. Dilengkapi dengan fitur pencarian dan penyaringan produk berdasarkan jenis, bentuk, kemasan, dan kategori kopi, platform ini membantu pelanggan menemukan produk yang sesuai sekaligus memperkuat identitas kopi lokal Aceh di pasar digital."
  },
  
  {
    slug: "sahamiq",
    name: "SAHAMIQ - Dashboard Analisis Saham",
    category: "Web Development",
    categories: [
      "Web Development",
      "Data Science & AI",
    ],
    type: "Platform Analisis dan Monitoring Saham",
    image: "/Mockup Sahamiq (2).png",
    thumbnail: "/thumbnails/sahamiq.webp",
    color: "from-[#60a5fa] to-[#1d4ed8]",
    beforeImage: "/services/sahamiq-before.png",
    afterImage: "/services/sahamiq-after.png",
    text: "SAHAMIQ merupakan platform analisis dan monitoring saham yang dirancang untuk membantu pengguna memantau pergerakan pasar secara terstruktur. Platform ini menyediakan dasbor informasi saham, screener saham, riset emiten, watchlist, serta notifikasi harga berdasarkan target yang ditentukan pengguna. Dilengkapi dengan visualisasi grafik, indikator kinerja keuangan, dan pengelolaan data pengguna, SAHAMIQ membantu menyajikan informasi pasar dalam satu antarmuka yang informatif dan mudah digunakan."
  },

  {
    slug: "chatku",
    name: "Chatku - Aplikasi Pesan Aman",
    category: "Mobile App",
    categories: [
      "Mobile App",
      "UI/UX Design",
    ],
    type: "Aplikasi Chat dan Komunikasi Aman",
    image: "/Mockup Chatku (1).png",
    thumbnail: "/thumbnails/chatku.webp",
    color: "from-[#ff6b35] to-[#ff9a5a]",
    beforeImage: "/services/chatku-before.png",
    afterImage: "/services/chatku-after.png",
    text: "Chatku merupakan aplikasi pesan instan yang dirancang untuk menghadirkan komunikasi digital yang aman, nyaman, dan mudah digunakan. Aplikasi ini mengutamakan privasi pengguna melalui fitur enkripsi end-to-end, verifikasi akun, dan perlindungan data pribadi. Dengan antarmuka yang modern dan intuitif, Chatku menyediakan fitur percakapan pribadi, daftar kontak, serta pengelolaan pesan untuk mendukung komunikasi sehari-hari secara lebih aman."
  },

  {
    slug: "dashboard-monitoring-desa",
    name: "MONTHLAB",
    category: "Web Development",
    categories: [
      "Web Development",
      "Data Science & AI",
    ],
    type: "Aplikasi Dashboard Interaktif",
    image: "/Mockup Monthlab.png",
    thumbnail: "/thumbnails/dashboard-monitoring-desa.webp",
    color: "from-[#75a8ff] to-[#002365]",
    beforeImage: "/services/monthlab-before.png",
    afterImage: "/services/monthlab-after.png",
    text: "MONTHLAB merupakan aplikasi dashboard interaktif untuk mengelola dan memantau data wilayah desa secara terstruktur. Aplikasi ini menyediakan fitur pencarian data, pengelolaan jumlah capaian, serta impor file Excel untuk memperbarui data secara efisien. Dilengkapi dengan visualisasi grafik dan fitur ekspor laporan, MONTHLAB membantu pengguna menganalisis data, memantau perkembangan setiap wilayah, dan menyusun laporan secara lebih praktis dalam satu platform."
  },

  {
    slug: "baked-goods",
    name: "Ulvoria",
    category: "Web Development",
    categories: ["Web Development", "UI/UX Design"],
    type: "Website Patisserie dan Katalog Digital",
    image: "/Mocukup_Ulvoria_v2 (1).png",
    thumbnail: "/thumbnails/baked-goods.webp",
    color: "from-[#75a8ff] to-[#002365]",
    beforeImage: "/services/baked-goods-before.png",
    afterImage: "/services/baked-goods-after.png",
    text: "Website Ulvoria dirancang untuk menghadirkan pengalaman digital yang memikat bagi penikmat baked goods premium. Menampilkan katalog produk patisserie pilihan, informasi bahan berkualitas, serta pemesanan praktis, website ini memudahkan pelanggan menikmati sajian istimewa kapan saja.",
  },
  {
    slug: "resto",
    name: "Restoran Seluler dengan Pengenalan Wajah",
    category: "Mobile App",
    categories: ["Mobile App", "UI/UX Design", "Data Science & AI"],
    type: "Aplikasi Seluler & AI",
    image: "/Resto.png",
    thumbnail: "/thumbnails/resto.webp",
    color: "from-[#ffe400] to-[#ffb700]",
    beforeImage: "/case-studies/Resto/resto-lama.jpeg",
    afterImage: "/case-studies/Resto/resto-baru.jpeg",
    text: "Proyek ini berfokus pada penerapan teknologi pengenalan wajah untuk pengelolaan restoran berbasis aplikasi seluler. Teknologi ini bertujuan meningkatkan pengalaman pelanggan dan efisiensi pelayanan. Sistem dikembangkan menggunakan teknologi modern seperti Flutter, HTML, CSS, JavaScript, dan PHP.",
  },
  {
    slug: "arunika-finance",
    name: "Penjualan Pulsa",
    category: "Web Development",
    categories: ["Web Development", "UI/UX Design"],
    type: "Aplikasi Web",
    image: "/Pulsa.png",
    thumbnail: "/thumbnails/arunika-finance.webp",
    color: "from-[#75a8ff] to-[#002365]",
    beforeImage: "/case-studies/Pulsa/pulsa-lama.jpeg",
    afterImage: "/case-studies/Pulsa/pulsa-baru.jpeg",
    text: "Proyek ini berfokus pada pengelolaan dan pemrosesan penjualan pulsa secara efisien melalui aplikasi web. Sistem ini dikembangkan menggunakan teknologi web modern seperti HTML, CSS, dan JavaScript.",
  },
  {
    slug: "time-management",
    name: "Sistem Informasi Manajemen Waktu Belajar (SIM)",
    category: "Web Development",
    categories: ["Web Development"],
    type: "Aplikasi Web",
    image: "/SIM.png",
    thumbnail: "/thumbnails/time-management.webp",
    color: "from-[#0e9f85] to-[#002365]",
    beforeImage: "/case-studies/SIM/SIM-lama.png",
    afterImage: "/case-studies/SIM/SIM-baru.png",
    text: "Proyek ini berfokus pada pengembangan sistem untuk mengelola dan mengoptimalkan waktu belajar. Sistem membantu pengguna mengatur jadwal belajar dan meningkatkan produktivitas. Teknologi yang digunakan meliputi Vue.js dan Laravel.",
  },
  {
    slug: "ticket-booking",
    name: "Sistem Pemesanan Tiket Film Berbasis Seluler",
    category: "Mobile App",
    categories: ["Mobile App", "UI/UX Design"],
    type: "Aplikasi Seluler",
    image: "/bioskop.png",
    thumbnail: "/thumbnails/ticket-booking.webp",
    color: "from-[#5eead4] to-[#002365]",
    text: "Proyek ini berfokus pada pengembangan aplikasi seluler untuk pemesanan tiket film. Aplikasi ini menyediakan fitur pemilihan kursi dan pilihan pembayaran untuk memudahkan pengguna dalam memesan tiket. Sistem dikembangkan menggunakan teknologi Flutter.",
    year: "2025",
    status: "Aktif (v1.3)",
    beforeImage: "/case-studies/Bioskop/bioskop-lama.png",
    afterImage: "/case-studies/Bioskop/bioskop-baru.png",
    tags: ["Flutter", "Dart", "Desktop", "Manajemen Proses"],
    about: [
      'DevPulse merupakan solusi modern untuk mengatasi masalah berpindah-pindah terminal saat melakukan pengembangan perangkat lunak. Aplikasi desktop ini memungkinkan pengembang menjalankan berbagai proyek, seperti React, Laravel, dan Flutter, secara bersamaan melalui satu dasbor yang elegan.',
      "Dilengkapi fitur deteksi framework otomatis dan pengelolaan port, DevPulse membantu menjaga alur kerja pengembangan tetap teratur, ringan dengan ukuran hanya 10 MB, dan produktif. Dikembangkan oleh pengembang untuk para pengembang.",
    ],
    gallery: [
      {
        src: "/case-studies/devpulse-1.webp",
        alt: "Dasbor utama DevPulse",
      },
      {
        src: "/case-studies/devpulse-2.webp",
        alt: "Log langsung dan pemantauan setiap proyek",
      },
      {
        src: "/case-studies/devpulse-3.webp",
        alt: "Fitur pengelolaan port",
      },
    ],
    demoUrl: "https://devpulse-teal.vercel.app/",
    githubUrl: "https://github.com/Zulkifli1409/dev_pulse/releases",
  },
  {
    slug: "Donasi",
    name: "Situs Web Donasi",
    category: "Web Development",
    categories: ["Web Development", "UI/UX Design"],
    type: "Platform Web",
    image: "/Donasi.png",
    thumbnail: "/thumbnails/Donasi.webp",
    color: "from-[#ffe400] to-[#ffb700]",
    text: "Proyek ini berfokus pada pengembangan platform web untuk donasi online. Platform ini memungkinkan pengguna memberikan sumbangan dengan mudah untuk berbagai tujuan serta memantau donasi yang telah mereka berikan. Sistem dikembangkan menggunakan teknologi web modern seperti HTML, CSS, dan Golang.",
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);