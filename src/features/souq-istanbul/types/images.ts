export interface SouqIstanbulImage {
  id: number;
  name: string;
  img: string;
}

export interface SouqIstanbulImagesResponse {
  success: boolean;
  message: string;
  data: SouqIstanbulImage[];
}

export interface SouqIstanbulSingleImageResponse {
  success: boolean;
  message: string;
  data: SouqIstanbulImage;
}

export interface SouqIstanbulTradeFormData {
  name: string;
  phone: string;
  shop_number: string;
  contact_time: string;
  region: string;
}

export interface SouqIstanbulTradeFormResponse {
  success: boolean;
  message: string;
}
