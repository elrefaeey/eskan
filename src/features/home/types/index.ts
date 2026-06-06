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
