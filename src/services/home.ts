import { Api } from "./api";
import { HeroImagesResponse } from "@/features/home/types";

export const fetchHeroImages = async (imageName: string = "hero-section") => {
  const response = await Api.get<HeroImagesResponse>(
    `/image/${encodeURIComponent(imageName)}`
  );
  return response.data.data;
};
