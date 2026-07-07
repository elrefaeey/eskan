import { useQuery } from "@tanstack/react-query";
import { fetchMallConstructionImages } from "@/services/mall";

export const useMallConstructionImages = () => {
  return useQuery({
    queryKey: ["mall-construction-images"],
    queryFn: fetchMallConstructionImages,
  });
};
