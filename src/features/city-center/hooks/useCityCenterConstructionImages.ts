import { useQuery } from "@tanstack/react-query";
import { fetchCityCenterConstructionImages } from "@/services/city-center";

export const useCityCenterConstructionImages = () => {
  return useQuery({
    queryKey: ["city-center-construction-images"],
    queryFn: fetchCityCenterConstructionImages,
  });
};
