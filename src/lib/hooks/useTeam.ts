/**
 * useTeam.ts – React Query hook untuk anggota tim dari backend API.
 *
 * Fallback ke data statis (team.ts) jika backend tidak tersedia,
 * agar tampilan Tim di homepage tidak pernah kosong.
 */

import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api";
import type { ApiResponse, TeamMember } from "@/lib/types";
import { team as staticTeam } from "@/data/team";

const STALE_MS = 10 * 60 * 1000; // 10 menit — data tim jarang berubah

/** Mapping data statis ke shape TeamMember agar fallback konsisten */
function staticToTeamMember(
  t: (typeof staticTeam)[number],
  index: number
): TeamMember {
  return {
    id: String(index + 1),
    name: t.name,
    role: t.role,
    image: t.image,
    portfolio_url: t.portfolioUrl,
    bio: undefined,
    skills: [],
    order_index: index,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export function useTeam() {
  return useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      const res = await apiGet<ApiResponse<TeamMember[]>>("/team");
      return res.data;
    },
    staleTime: STALE_MS,
    retry: 1,
    // Tampilkan data statis sebagai placeholder sementara backend di-fetch
    // placeholderData removed to rely on backend data
  });
}
