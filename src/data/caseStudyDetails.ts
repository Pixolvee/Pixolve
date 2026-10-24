// src/data/caseStudyDetails.ts
import { caseStudies, type GalleryItem } from "@/data/caseStudies"
import { slugify } from "@/lib/slugify"

export type CaseStudyDetail = {
  status?: string
  type?: string
  year?: string
  tags?: string[]
  about?: string[]
  features?: string[]
  techStack?: { label: string; items: string[] }[]
  gallery?: (string | GalleryItem)[]
  demoUrl?: string
  githubUrl?: string
  client?: string
  duration?: string
  services?: string[]
  challenge?: string
  solution?: string
}

const details: Record<string, CaseStudyDetail> = {
  devpulse: {
    status: "Live (v1.3)",
    type: "Desktop App",
    year: "2025",
    tags: ["Flutter", "Dart", "Desktop", "Process Management"],
    about: [
      'DevPulse adalah solusi modern untuk menghentikan "Terminal Juggling".',
      "Dilengkapi dengan auto-detect framework dan port manager.",
    ],
    features: [
      "Support 40+ Framework",
      "Real-Time Monitoring",
      "Smart Script Management",
    ],
    techStack: [
      { label: "Frontend", items: ["Flutter", "Dart"] },
      { label: "Platform", items: ["Windows (v1.3)"] },
    ],
    gallery: [
      { src: "/case-studies/devpulse-1.webp", alt: "Dashboard utama DevPulse" },
      { src: "/case-studies/devpulse-2.webp", alt: "Live logs per project" },
      { src: "/case-studies/devpulse-3.webp", alt: "Port manager" },
    ],
    demoUrl: "https://devpulse-teal.vercel.app/",
    githubUrl: "https://github.com/Zulkifli1409/dev_pulse/releases",
  },
}

export type CaseStudy = (typeof caseStudies)[number] & CaseStudyDetail & { slug: string }

export const allCaseStudies: CaseStudy[] = caseStudies.map((c) => ({
  ...c,
  ...details[slugify(c.name)],
  slug: slugify(c.name),
}))

export const getCaseStudy = (slug: string) => allCaseStudies.find((c) => c.slug === slug)