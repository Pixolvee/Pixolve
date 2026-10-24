/**
 * usePosts.ts – React Query hooks untuk blog posts dari backend API.
 *
 * Strategi:
 * - Gunakan staleTime panjang (5 menit) sehingga list jarang di-refetch.
 * - Retry dibatasi 1x saja; jika backend down, tampilkan fallback statis.
 * - Setiap hook mengembalikan { data, isLoading, isError } yang siap di-render.
 */

import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api";
import type { ApiListResponse, ApiResponse, PostDetail, PostSummary } from "@/lib/types";
// Fallback data statis jika backend tidak tersedia

const STALE_MS = 5 * 60 * 1000; // 5 menit

// ─── Hook: Daftar artikel (untuk Blog section & Projects grid) ──────────────
export function usePosts(params?: { page?: number; limit?: number; category?: string; search?: string }) {
  const { page = 1, limit = 10, category, search } = params ?? {};

  const query = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (category) query.set("category", category);
  if (search) query.set("search", search);

  return useQuery({
    queryKey: ["posts", page, limit, category, search],
    queryFn: async () => {
      const res = await apiGet<ApiListResponse<PostSummary>>(`/posts?${query}`);
      return res;
    },
    staleTime: STALE_MS,
    retry: 1,
    // No placeholder data; rely on backend response
  });
}

// ─── Hook: Detail artikel tunggal (untuk BlogPost page) ────────────────────
export function usePost(slug: string) {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const res = await apiGet<ApiResponse<PostDetail>>(`/posts/${slug}`);
      return res.data;
    },
    staleTime: STALE_MS,
    retry: 1,
    enabled: Boolean(slug),
  });
}

// ─── Hook: Artikel terkait (maks 2, selain slug aktif) ─────────────────────
export function useRelatedPosts(currentSlug: string) {
  const { data: listData } = usePosts({ limit: 10 });
  const related = (listData?.data ?? [])
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 2);
  return related;
}
