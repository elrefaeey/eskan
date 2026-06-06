export interface GalleryGroundUnit {
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
}

export interface GalleryGroundUnitsResponse {
  success: boolean;
  message: string;
  current_page: number;
  data: GalleryGroundUnit[];
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
  links?: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
}

export interface ProjectImage {
  id: number;
  img: string;
}

export interface ProjectDetails {
  id: number;
  name: string;
  description: string;
  location: string;
  type: string;
  logo: string | null;
  imgs: ProjectImage[];
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
  data: ConstructionPhaseImage[] | ConstructionPhaseImage;
}
