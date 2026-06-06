export interface MedicalUnit {
  id: number;
  number: string;
  contract: string | null;
  rooms: number;
  duration: string;
  space: number;
  meter_price: number;
  type: string;
  img: string;
  block_id: { id: number; name: string };
  level_id: { id: number; name: string };
  levelimg: string;
  advance: number;
  advance_rate: number;
  installment: number;
  receiving: number;
  revenue: number;
  appear: number;
  images: string;
  location?: string;
  project: string;
  step: string;
}

export interface MedicalUnitsResponse {
  success: boolean;
  message: string;
  current_page: number;
  data: MedicalUnit[];
  first_page_url: string | null;
  from: number | null;
  last_page: number;
  last_page_url: string | null;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface ProjectImage {
  id: number;
  img: string;
  type: string;
}

export interface MedicalProjectDetails {
  id: number;
  name: string;
  description: string;
  location: string;
  imgs: ProjectImage[];
  video: string | null;
  brochure: string | null;
  created_at: string;
  updated_at: string;
}

export interface MedicalProjectDetailsResponse {
  success: boolean;
  message: string;
  data: MedicalProjectDetails;
}
