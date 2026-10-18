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