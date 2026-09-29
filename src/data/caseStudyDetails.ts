import { caseStudies } from "@/data/caseStudies";
import { slugify } from "@/lib/slugify";

export type CaseStudyDetail = {
  status?: string; // contoh: "Live (v1.3)"
  type?: string; // contoh: "Desktop App"
  year?: string;
  tags?: string[];
  about?: string[]; // satu string = satu paragraf
  features?: string[];
  techStack?: { label: string; items: string[] }[];
  /** Taruh gambar di public/case-studies/. Gambar yang gagal dimuat otomatis disembunyikan. */
  gallery?: { src: string; alt: string }[];
  demoUrl?: string;
  githubUrl?: string;
  // opsional, tampil di kartu "Info proyek" bila diisi
  client?: string;
  duration?: string;
  services?: string[];
  challenge?: string;
  solution?: string;
};

// Key = slugify(name). Nama "DevPulse" -> "devpulse"
const details: Record<string, CaseStudyDetail> = {
  devpulse: {
    status: "Live (v1.3)",
    type: "Desktop App",
    year: "2025",
    tags: ["Flutter", "Dart", "Desktop", "Process Management"],
    about: [
      'DevPulse adalah solusi modern untuk menghentikan "Terminal Juggling". Aplikasi desktop ini memungkinkan developer menjalankan berbagai project (React, Laravel, Flutter, dll) secara bersamaan dalam satu dashboard elegan.',
      "Dilengkapi dengan auto-detect framework dan port manager, DevPulse memastikan workflow development tetap rapi, ringan (hanya 10MB), dan produktif. Built by a developer, for developers.",
    ],
    features: [
      "Support 40+ Framework (React, Laravel, Django, Flutter, dll)",
      "Real-Time Monitoring: CPU, Memory, & Live Logs per project",
      "Smart Script Management: Simpan & jalankan script dev/build/prod sekali klik",
      "Port Manager: Visualisasi port yang sedang digunakan secara real-time",
      "Ultra Lightweight: Hanya memakan ~10MB resource RAM",
      "Zero Internet Requirement: Semua data diproses secara lokal & aman",
    ],
    techStack: [
      { label: "Frontend", items: ["Flutter", "Dart"] },
      { label: "Features", items: ["Process Runner", "Port Scanner", "System Tray"] },
      { label: "Platform", items: ["Windows (v1.3)", "macOS & Linux (Coming Soon)"] },
    ],
    gallery: [
      { src: "/case-studies/devpulse-1.webp", alt: "Dashboard utama DevPulse" },
      { src: "/case-studies/devpulse-2.webp", alt: "Live logs dan monitoring per project" },
      { src: "/case-studies/devpulse-3.webp", alt: "Port manager" },
    ],
    demoUrl: "https://devpulse-teal.vercel.app/",
    githubUrl: "https://github.com/Zulkifli1409/dev_pulse/releases",
  },
};

export type CaseStudy = (typeof caseStudies)[number] & CaseStudyDetail & { slug: string };

export const allCaseStudies: CaseStudy[] = caseStudies.map((c) => ({
  ...c,
  ...details[slugify(c.name)],
  slug: slugify(c.name),
}));

export const getCaseStudy = (slug: string) => allCaseStudies.find((c) => c.slug === slug);