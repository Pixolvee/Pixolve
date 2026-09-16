export interface QuoteRequestCreate {
  full_name: string;
  email: string;
  whatsapp: string;
  company: string;
  service: string;
  project_scale: string;
  budget_range: string;
  deadline: string;
  description: string;
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