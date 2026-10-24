// src/lib/hooks/useCaseStudies.ts
import { useQuery } from "@tanstack/react-query"
import { apiGet } from "@/lib/api"
import type { ApiResponse } from "@/lib/types"
import type { CaseStudy, GalleryItem } from "@/data/caseStudies"

const STALE_MS = 10 * 60 * 1000 // 10 menit

/** Normalisasi gallery: dari string URL atau object jadi { src, alt } */
function normalizeGallery(gallery?: (string | GalleryItem)[], studyName = ""): GalleryItem[] {
  if (!Array.isArray(gallery)) return []
  return gallery
    .map((item, idx) => {
      if (typeof item === "string" && item.trim()) {
        return { src: item, alt: `Galeri ${idx + 1} ${studyName}`.trim() }
      }
      if (item && typeof item === "object" && typeof item.src === "string") {
        return { src: item.src, alt: item.alt ?? `Galeri ${idx + 1}` }
      }
      return null
    })
    .filter((x): x is GalleryItem => x !== null)
}

/** Hook untuk daftar semua case studies */
export function useCaseStudies() {
  return useQuery<CaseStudy[]>({
    queryKey: ["case-studies"],
    queryFn: async () => {
      const res = await apiGet<ApiResponse<CaseStudy[]>>("/projects")
      const data = res.data ?? []
      return data.map((c) => ({
        ...c,
        gallery: normalizeGallery(c.gallery, c.name),
      }))
    },
    staleTime: STALE_MS,
    retry: 2,
  })
}

/** Hook untuk satu case study berdasarkan slug */
export function useCaseStudy(slug: string) {
  return useQuery<CaseStudy>({
    queryKey: ["case-study", slug],
    queryFn: async () => {
      const res = await apiGet<ApiResponse<CaseStudy>>(`/projects/${slug}`)
      const raw = res.data
      return {
        ...raw,
        gallery: normalizeGallery(raw.gallery, raw.name),
      }
    },
    staleTime: STALE_MS,
    retry: 1,
    enabled: Boolean(slug),
  })
}