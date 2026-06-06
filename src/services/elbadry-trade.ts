import axios from "axios";
import type {
  ElbadryTradeProjectDetails,
  ConstructionImage,
  VideoLink,
} from "@/features/elbadry-trade/types";

export const fetchElbadryTradeProjectDetails =
  async (): Promise<ElbadryTradeProjectDetails> => {
    const response = await axios.get("/api/projects/4");
    return response.data.data;
  };

export const fetchElbadryTradeConstructionImages = async (): Promise<
  ConstructionImage[]
> => {
  const response = await axios.get("/api/image/صور-انشاءات-البدري");
  return response.data.data;
};

export const fetchVideoLinks = async (): Promise<VideoLink[]> => {
  const response = await axios.get("/api/link");
  return response.data.data;
};
