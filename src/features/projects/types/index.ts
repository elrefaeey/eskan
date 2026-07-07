export interface Project {
  id: number;
  name: string;
  type: string;
  location: string;
  description:string;
  logo: string | null;
  imgs: ProjectImage[];
}

export interface ProjectImage {
  id: number;
  img: string;
  type: string;
}

export interface ProjectsResponse {
  success: boolean;
  message: string;
  data: Project[];
}
