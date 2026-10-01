<div align="center">

# ⚡ Pixolve Technologies

**Partner Transformasi & Rekayasa Digital Modern**  
*Membangun solusi perangkat lunak end-to-end berstandar tinggi: Web, Mobile, Data Science, QA Testing, dan UI/UX Design.*

[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[🌐 Demo Website](#) • [💬 Konsultasi WhatsApp](https://wa.me/6283848581998) • [📋 Minta Penawaran](#-permintaan-penawaran-quote)

---

</div>

## 📌 Tentang Pixolve

**Pixolve** adalah platform web agensi digital modern yang dirancang untuk memperkenalkan profil perusahaan, portofolio rekayasa perangkat lunak, paket layanan, artikel teknologi, serta memfasilitasi konsultasi dan pengajuan estimasi proyek digital secara instan.

Dibangun dengan performa tinggi menggunakan arsitektur **React 19**, **Vite**, dan **Tailwind CSS v4**, Pixolve memberikan pengalaman interaktif yang mulus, estetika visual modern, dan integrasi komunikasi langsung ke WhatsApp bisnis.

---

## ✨ Fitur Unggulan

- 🎨 **Desain Modern & Interaktif**: Mengusung tema visual biru tua presisi (`#002365`) dan aksen kuning dinamis (`#ffe400`), dilengkapi animasi transisi halus dengan Framer Motion.
- 💼 **Showcase Layanan Spesialis**:
  1. **Web Development**: SaaS platform, portal bisnis, dan aplikasi web modular berkinerja tinggi.
  2. **Mobile App Development**: Aplikasi mobile Android & iOS cross-platform dan native yang responsif.
  3. **QA & Automated Testing**: Pengujian end-to-end otomatis, load test, dan audit kualitas rilis.
  4. **Data Science & AI**: Business Intelligence dashboard, analitik prediktif, dan pipeline data.
  5. **UI/UX Product Design**: Riset pengguna, prototyping interaktif, dan desain sistem konsisten.
- 📂 **Portofolio & Studi Kasus Mendalam**:
  - Halaman studi kasus detail (*Resto Mobile, Top-up Sales, Donasi Digital, dll.*).
  - Visual komparasi interaktif (*Before vs After*) dan galeri proyek.
  - Rincian teknologi & arsitektur teknis tiap proyek.
- 💬 **Integrasi WhatsApp Langsung**:
  - **Form Permintaan Penawaran (Quote Form)**: Otomatis merangkum data kebutuhan klien (nama, kontak, layanan, budget, deadline, deskripsi) dan mengarahkan langsung ke WhatsApp `083848581998` beserta pencatatan lead ke backend.
  - **Floating WhatsApp Widget**: Akses cepat konsultasi satu klik kapan saja di setiap halaman.
- 📰 **Blog & Wawasan Teknologi**: Halaman artikel untuk berbagi wawasan industri digital dan tips teknis.
- 📱 **Fully Responsive**: Dioptimasi untuk semua ukuran layar (Mobile, Tablet, Desktop).

---

## 🛠️ Tech Stack

| Kategori | Teknologi |
| :--- | :--- |
| **Framework & UI** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 8](https://vite.dev/) |
| **Styling & CSS** | [Tailwind CSS v4](https://tailwindcss.com/), [Motion](https://motion.dev/) (Framer Motion v12) |
| **Komponen UI** | [Shadcn UI](https://ui.shadcn.com/), [Base UI](https://base-ui.com/), [Lucide React](https://lucide.dev/) |
| **Routing** | [React Router v7](https://reactrouter.com/) |
| **State & API** | [TanStack React Query v5](https://tanstack.com/query), Fetch API |
| **Notifikasi** | [Sonner](https://sonner.emilkowal.ski/) Toast |
| **Tipografi** | Plus Jakarta Sans, JetBrains Mono, Inter |

---

## 📁 Struktur Direktori

```text
frontend/
├── public/                 # Aset statis, logo, dan gambar studi kasus
│   ├── case-studies/       # Screenshot komparasi & galeri proyek
│   └── ...
├── src/
│   ├── components/         # Komponen React modular
│   │   ├── layout/         # Header, Footer, WhatsApp Widget, Navigasi
│   │   ├── sections/       # Hero, Services, Portfolio, Pricing, QuoteForm, FAQ
│   │   └── ui/             # Komponen antarmuka (Button, Badge, Card, Modal, dll.)
│   ├── data/               # Data statis (services, case studies, blogs, team)
│   ├── lib/                # Konfigurasi utilitas, helper API, types
│   ├── pages/              # Halaman rute (Home, Detail Layanan, Portofolio, Blog)
│   ├── styles/             # File style CSS khusus
│   ├── App.tsx             # Definisi rute aplikasi
│   └── main.tsx            # Entry point aplikasi React
├── vite.config.ts          # Konfigurasi Vite & alias path (@)
├── tsconfig.json           # Konfigurasi TypeScript
└── package.json            # Daftar dependensi & script proyek
```

---

## 🚀 Memulai (Quick Start)

### Prasyarat

Pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (versi 18+ direkomendasikan)
- Package manager: `npm`, `yarn`, atau `pnpm`

### Instalasi

1. **Clone repository:**
   ```bash
   git clone https://github.com/AndrianFakhruza/pixolve.git
   cd pixolve
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

---

## 📦 Scripts yang Tersedia

Dalam folder proyek, Anda dapat menjalankan perintah berikut:

- `npm run dev`: Menjalankan Vite development server dengan Fast Refresh.
- `npm run build`: Memeriksa tipe TypeScript (`tsc -b`) dan membuat build produksi yang dioptimalkan (`vite build`).
- `npm run preview`: Menjalankan preview lokal dari build produksi.
- `npm run typecheck`: Menjalankan validasi tipe TypeScript tanpa melakukan emit file.
- `npm run lint`: Memeriksa kode menggunakan Oxlint untuk performa cepat.

---

## 🌐 Deployment (Vercel)

Proyek ini siap dideploy ke [Vercel](https://vercel.com/) dengan konfigurasi zero-config:

1. Hubungkan repository GitHub Anda ke Vercel.
2. Atur **Framework Preset** ke `Vite`.
3. Pastikan **Build Command** adalah `npm run build`.
4. Pastikan **Output Directory** adalah `dist`.
5. Klik **Deploy**.

---

## 📞 Hubungi Kami

Jika Anda memiliki pertanyaan, kebutuhan proyek, atau ingin berkolaborasi:

- **WhatsApp**: [+62 838-4858-1998](https://wa.me/6283848581998)
- **Email**: [Pixolve@gmail.com](mailto:Pixolve@gmail.com)
- **Lokasi**: Gedung Cyber 2, Lhokseumawe, Indonesia
- **Jam Operasional**: Senin – Jumat, 08.00 – 18.00 WIB

---

<div align="center">
  <sub>© 2026 Pixolve Technologies. All rights reserved.</sub>
</div>
