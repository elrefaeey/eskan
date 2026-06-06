export interface CityCenterProjectDetails {
  id: number;
  name: string;
  header: string;
  description: string;
  location: string;
  img: string;
  video: string;
  appear: number;
  imgs: ProjectImage[];
}

export interface ProjectImage {
  id: number;
  img: string;
  type: string;
}

export interface ConstructionImage {
  id: number;
  name: string;
  img: string;
}
