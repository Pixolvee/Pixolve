/**
 * useProjects.ts – React Query hooks untuk portfolio projects.
 *
 * Memuat daftar proyek (`/api/projects`) dan detail satu proyek berdasarkan slug.
 * Menggunakan static fallback (`src/data/caseStudies.ts`) sehingga UI tetap
 * responsif saat backend belum tersedia.
 */

import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api";
import type { ApiResponse, Project } from "@/lib/types";
// import { caseStudies as staticProjects } from "@/data/caseStudies"; // removed unused import

/** Hook untuk daftar portfolio */
export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await apiGet<ApiResponse<Project[]>>("/projects");
      return res.data;
    },
    staleTime: 10 * 60 * 1000, // 10 menit
    // placeholderData removed to rely on backend data
  });
}

/** Hook untuk satu proyek berdasarkan slug */
export function useProject(slug: string) {
  return useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      const res = await apiGet<ApiResponse<Project>>(`/projects/${slug}`);
      return res.data;
    },
    staleTime: 10 * 60 * 1000,
    // Tidak menggunakan placeholderData karena detail tiap proyek mungkin tidak lengkap di static.
    // Tapi bila ingin, dapat map staticProjects.find(...)
  });
}
