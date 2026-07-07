import axios from "axios";
import { MallImagesResponse } from "@/features/mall/types";
import { MallConstructionImagesResponse } from "@/features/mall/types/construction";

const API_BASE_URL = "/api";

export const fetchMallImages = async (): Promise<MallImagesResponse> => {
  const response = await axios.get<MallImagesResponse>(
    `${API_BASE_URL}/image/صور-المول`
  );
  return response.data;
};

export const fetchMallConstructionImages =
  async (): Promise<MallConstructionImagesResponse> => {
    const response = await axios.get<MallConstructionImagesResponse>(
      `${API_BASE_URL}/image/صور-انشاءات-البدري`
    );
    return response.data;
  };
