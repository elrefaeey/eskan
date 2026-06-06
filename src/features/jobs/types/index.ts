
export interface JobItem {
  id: number;
  name: string;
  description: string;
  img?: string | null;
  title?: string | null;
}

export interface JobsResponse {
  success: boolean;
  message: string;
  data: JobItem[];
}
