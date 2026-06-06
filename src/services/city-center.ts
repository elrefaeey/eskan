import axios from "axios";
import type {
  CityCenterProjectDetails,
  ConstructionImage,
} from "@/features/city-center/types";

export const fetchCityCenterProjectDetails =
  async (): Promise<CityCenterProjectDetails> => {
    const response = await axios.get("/api/projects/3");
    return response.data.data;
  };

export const fetchCityCenterConstructionImages = async (): Promise<
  ConstructionImage[]
> => {
  const response = await axios.get("/api/image/اعمال-سيتي-سينتر");
  return response.data.data;
};
