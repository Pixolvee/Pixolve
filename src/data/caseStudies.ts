// src/data/caseStudies.ts
export interface PortfolioCategory {
  id: string
  label: string
}

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  { id: "all", label: "Semua" },
  { id: "web-development", label: "Web Development" },
  { id: "mobile-app", label: "Mobile App" },
  { id: "ui-ux", label: "UI/UX Design" },
  { id: "data-science", label: "Data Science & AI" },
]

const CATEGORY_ALIASES: Record<string, string[]> = {
  "web-development": ["web development", "pengembangan web", "web", "website"],
  "mobile-app": ["mobile app", "aplikasi seluler", "pengembangan aplikasi seluler", "mobile"],
  "ui-ux": ["ui/ux design", "desain ui/ux", "ui/ux", "ui ux", "ui ux design"],
  "data-science": ["data science & ai", "sains data & ai", "data science", "ai"],
}

export function matchCategory(item: CaseStudy, categoryId: string): boolean {
  if (categoryId === "all") return true
  const targetCategory = PORTFOLIO_CATEGORIES.find((c) => c.id === categoryId)
  if (!targetCategory) return true

  const validTerms = CATEGORY_ALIASES[categoryId] ?? [targetCategory.label.toLowerCase()]

  const isMatch = (str?: string) => {
    if (!str) return false
    const s = str.trim().toLowerCase()
    return validTerms.includes(s)
  }

  const primaryMatch = isMatch(item.category)
  const multiMatch = item.categories?.some((c) => isMatch(c))

  return Boolean(primaryMatch || multiMatch)
}

export interface GalleryItem {
  src: string
  alt?: string
}

export interface CaseStudy {
  slug: string
  name: string
  image?: string
  thumbnail?: string
  color: string
  beforeImage?: string
  afterImage?: string
  text: string
  textContent?: string
  text_content?: string
  year?: string
  result?: string
  before?: string
  after?: string

  category?: string
  categories?: string[]

  status?: string
  type?: string
  tags?: string[]
  about?: string[]
  features?: string[]

  techStack?: { label: string; items: string[] }[]

  /**
   * Galeri gambar. Bisa berupa:
   * - Array of string (URL dari Supabase)
   * - Array of object { src, alt } (data lama)
   */
  gallery?: (string | GalleryItem)[]

  demoUrl?: string
  githubUrl?: string
}

export const caseStudies: CaseStudy[] = []

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug)