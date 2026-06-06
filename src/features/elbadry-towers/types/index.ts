export interface ElbadryBlock {
  id: number;
  name: string;
  img: string;
}

export interface ElbadryBlocksResponse {
  data: ElbadryBlock[];
}

export interface ElbadryLevel {
  id: number;
  name: string;
}

export interface ElbadryLevelsResponse {
  data: ElbadryLevel[];
}

export interface ElbadryFilterOption {
  value: string;
  label: string;
}

export interface ElbadrySpacesResponse {
  status: boolean;
  message: string;
  data: string[];
}

export interface ElbadryMeterPricesResponse {
  status: boolean;
  message: string;
  data: string[];
}

export interface ProjectMapImage {
  id: number;
  name: string;
  img: string;
}

export interface ProjectMapImageResponse {
  success: boolean;
  message: string;
  data: ProjectMapImage;
}

export interface ProjectImage {
  id: number;
  img: string;
  type: string;
}

export interface ProjectDetails {
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

export interface ProjectDetailsResponse {
  success: boolean;
  message: string;
  data: ProjectDetails;
}

export interface ConstructionPhaseImage {
  id: number;
  name: string;
  img: string;
}

export interface ConstructionPhasesResponse {
  success: boolean;
  message: string;
  data: ConstructionPhaseImage[];
}

export interface HeroImage {
  id: number;
  name: string;
  img: string;
}

export interface HeroImagesResponse {
  success: boolean;
  message: string;
  data: HeroImage[];
}

export interface ProjectImage {
  id: number;
  img: string;
  type: string;
}

export interface ProjectDetails {
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

export interface ProjectDetailsResponse {
  success: boolean;
  message: string;
  data: ProjectDetails;
}

export interface ElbadryUnit {
  id: number;
  number: string;
  space: number;
  meter_price: number;
  advance: number;
  installment: number;
  revenue: number;
  img: string;
  levelimg: string;
  location: string;
  project: string;
  type: string;
  duration: string;
  receiving: number;
  appear: number;
  contract: string | null;
  block_id: string | null;
  level_id: string | null;
  images?: string;
  step: string | null;
  rooms?: number;
}

export interface ElbadryUnitsResponse {
  success: boolean;
  message: string;
  current_page: number;
  data: ElbadryUnit[];
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
