import { useQuery } from "@tanstack/react-query";
import { fetchMallImages } from "@/services/mall";

export const useMallImages = () => {
  return useQuery({
    queryKey: ["mall-images"],
    queryFn: fetchMallImages,
  });
};
