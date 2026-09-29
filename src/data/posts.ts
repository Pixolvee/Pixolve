export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  duration: string;
  date: string;
  author: { name: string; role: string };
  content: Block[];
};

const author = { name: "Tim Pixolve", role: "Product & Engineering" };

export const posts: Post[] = [
  {
    slug: "menemukan-mvp-yang-layak-dibangun",
    category: "Product strategy",
    title: "Cara menemukan MVP yang benar-benar layak dibangun",
    excerpt: "MVP bukan versi murah dari produk final, tetapi eksperimen untuk menguji asumsi paling berisiko.",
    duration: "5 min read",
    date: "12 September 2026",
    author,
    content: [
      { type: "p", text: "Banyak tim menyebut produk mereka MVP, padahal isinya hanya versi kecil dari rencana besar. MVP yang baik adalah eksperimen: ia dirancang untuk membuktikan atau membantah satu asumsi paling berisiko." },
      { type: "h2", text: "Mulai dari asumsi, bukan fitur" },
      { type: "p", text: "Tulis semua asumsi yang harus benar agar produk berhasil, lalu urutkan berdasarkan dampak jika salah dan seberapa sedikit bukti yang Anda punya. Asumsi di kuadran 'dampak besar, bukti minim' adalah target MVP Anda." },
      { type: "quote", text: "Jika MVP tidak bisa membuat Anda salah, ia bukan eksperimen. Itu hanya rilis kecil." },
      { type: "h2", text: "Checklist sebelum mulai membangun" },
      { type: "ul", items: ["Satu hipotesis yang bisa diuji dalam 2–6 minggu", "Metrik keberhasilan dan ambang batasnya ditentukan sebelum rilis", "Sudah dicek apakah bisa diuji tanpa kode (landing page, konsierge, prototipe)", "Ada keputusan yang jelas untuk setiap hasil: lanjut, ubah arah, atau berhenti"] },
      { type: "p", text: "Sering kali jawabannya adalah tidak perlu membangun sama sekali. Itu bukan kegagalan, itu penghematan berbulan-bulan." },
    ],
  },
  {
    slug: "technical-debt-kapan-dibayar",
    category: "Engineering",
    title: "Technical debt: kapan harus dibayar, kapan bisa ditunda",
    excerpt: "Tidak semua utang teknis layak dilunasi sekarang. Yang penting adalah tahu bunganya.",
    duration: "7 min read",
    date: "28 Agustus 2026",
    author,
    content: [
      { type: "p", text: "Technical debt sering diperlakukan sebagai dosa. Padahal seperti utang finansial, ia bisa menjadi keputusan yang rasional, selama Anda tahu berapa bunganya dan kapan jatuh tempo." },
      { type: "h2", text: "Ukur bunganya" },
      { type: "p", text: "Bunga technical debt adalah waktu ekstra yang terbuang setiap kali tim menyentuh area yang bermasalah. Modul yang jarang diubah punya bunga rendah, sehingga aman ditunda. Modul yang disentuh setiap sprint punya bunga tinggi." },
      { type: "h2", text: "Bayar sekarang jika" },
      { type: "ul", items: ["Area tersebut akan sering diubah dalam 1–2 kuartal ke depan", "Ia menyebabkan bug berulang atau insiden produksi", "Ia memperlambat onboarding engineer baru secara nyata", "Fitur berikutnya tidak bisa dibangun tanpa membereskannya"] },
      { type: "quote", text: "Utang yang tidak pernah Anda ukur tidak bisa Anda prioritaskan." },
      { type: "p", text: "Sisihkan kapasitas tetap (misalnya 15–20% per sprint) untuk pelunasan, dan catat setiap utang dengan estimasi bunga. Tanpa angka, diskusi akan selalu kalah oleh tenggat fitur." },
    ],
  },
  {
    slug: "dari-dashboard-menjadi-keputusan",
    category: "Case study",
    title: "Dari dashboard menjadi keputusan: merancang data layer yang dipakai",
    excerpt: "Dashboard yang indah belum tentu dipakai. Rancang dari keputusan yang ingin didukung.",
    duration: "6 min read",
    date: "10 Agustus 2026",
    author,
    content: [
      { type: "p", text: "Sebuah klien memiliki 40 grafik di dashboard, tetapi tim operasional tetap mengambil keputusan lewat spreadsheet. Masalahnya bukan visualisasi, melainkan data layer yang tidak dirancang untuk keputusan tertentu." },
      { type: "h2", text: "Mulai dari pertanyaan keputusan" },
      { type: "p", text: "Kami mendaftar keputusan yang diambil tiap minggu, misalnya kapan menambah stok atau pelanggan mana yang perlu dihubungi. Dari situ, kami menurunkan metrik dan sumber data yang benar-benar dibutuhkan." },
      { type: "h2", text: "Hasilnya" },
      { type: "ul", items: ["40 grafik dipangkas menjadi 6 tampilan berbasis keputusan", "Definisi metrik disatukan di satu semantic layer", "Setiap angka punya pemilik dan jadwal refresh yang jelas"] },
      { type: "quote", text: "Dashboard dinilai dari keputusan yang berubah, bukan dari jumlah grafiknya." },
      { type: "p", text: "Pelajaran utamanya: tanyakan 'keputusan apa yang akan berubah karena angka ini?' sebelum menambah satu grafik pun." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);