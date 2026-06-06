export interface MallImage {
  id: number;
  name: string;
  img: string;
}

export interface MallImagesResponse {
  success: boolean;
  message: string;
  data: MallImage[];
}
