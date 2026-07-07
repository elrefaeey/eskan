export interface MallConstructionImage {
  id: number;
  name: string;
  img: string;
}

export interface MallConstructionImagesResponse {
  success: boolean;
  message: string;
  data: MallConstructionImage[];
}
