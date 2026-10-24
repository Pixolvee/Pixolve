/**
 * useCaseStudies.ts – React Query hooks untuk case studies dari backend API.
 *
 * Mengambil data dari /api/projects yang query ke tabel case_studies di Supabase.
 */

import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api";
import type { ApiResponse } from "@/lib/types";
import type { CaseStudy } from "@/data/caseStudies";

const STALE_MS = 10 * 60 * 1000; // 10 menit

/** Hook untuk daftar semua case studies */
export function useCaseStudies() {
  return useQuery<CaseStudy[]>({
    queryKey: ["case-studies"],
    queryFn: async () => {
      const res = await apiGet<ApiResponse<CaseStudy[]>>("/projects");
      return res.data;
    },
    staleTime: STALE_MS,
    retry: 2,
  });
}

/** Hook untuk satu case study berdasarkan slug */
export function useCaseStudy(slug: string) {
  return useQuery<CaseStudy>({
    queryKey: ["case-study", slug],
    queryFn: async () => {
      const res = await apiGet<ApiResponse<CaseStudy>>(`/projects/${slug}`);
      return res.data;
    },
    staleTime: STALE_MS,
    retry: 1,
    enabled: Boolean(slug),
  });
}
