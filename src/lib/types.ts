export interface QuoteRequestCreate {
  full_name: string;
  email: string;
  whatsapp: string;
  service: string;
  description: string;
  company?: string;
  project_scale?: string;
  budget_range?: string;
  deadline?: string;
}

export interface LeadSubmission {
  id: string;
  message: string;
  created_at: string;
}

export interface NewsletterSignup {
  id: string;
  email: string;
  created_at: string;
}

// ─── Blog / Posts API types ────────────────────────────────────────────────

/** Struktur author yang dikembalikan oleh backend Supabase */
export interface PostAuthor {
  name: string;
  role: string;
}

/** Block konten artikel (disimpan sebagai JSONB di Supabase) */
export type PostBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] };

/** Ringkasan artikel untuk list/card (kolom LIST_COLUMNS di backend) */
export interface PostSummary {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  duration: string;
  author: PostAuthor;
  published_at: string;
}

/** Detail lengkap artikel termasuk konten */
export interface PostDetail extends PostSummary {
  content: PostBlock[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

/** Wrapper sukses generik dari backend */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/** Wrapper sukses untuk list dengan pagination */
export interface ApiListResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ─── Team API types ────────────────────────────────────────────────────────

/** Anggota tim dari tabel team_members di Supabase */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string;        // path publik, misal "/andrian.jpeg"
  portfolio_url?: string;
  bio?: string;
  skills?: string[];
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Project API types ────────────────────────────────────────────────────────

/** Proyek portfolio di tabel projects */
export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  short_description: string;
  image?: string;
  url?: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}