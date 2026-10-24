// src/lib/hooks/useCaseStudies.ts
import { useQuery } from "@tanstack/react-query"
import { apiGet } from "@/lib/api"
import type { ApiResponse } from "@/lib/types"
import type { CaseStudy, GalleryItem } from "@/data/caseStudies"

const STALE_MS = 10 * 60 * 1000

/** Hasil normalisasi: alt sudah pasti string */
type NormalizedSlide = { src: string; alt: string }

/** Normalisasi gallery: dari string URL atau object jadi { src, alt } */
function normalizeGallery(gallery: unknown, studyName = ""): NormalizedSlide[] {
  if (!Array.isArray(gallery)) return []

  const result: NormalizedSlide[] = []

  gallery.forEach((item, idx) => {
    if (typeof item === "string" && item.trim()) {
      result.push({
        src: item,
        alt: `Galeri ${idx + 1} ${studyName}`.trim(),
      })
    } else if (
      item &&
      typeof item === "object" &&
      typeof (item as any).src === "string" &&
      (item as any).src.trim()
    ) {
      const obj = item as { src: string; alt?: string }
      result.push({
        src: obj.src,
        alt: obj.alt && obj.alt.trim() ? obj.alt : `Galeri ${idx + 1}`,
      })
    }
  })

  return result
}

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