import { useQuery } from "@tanstack/react-query";
import { fetchBazarImage } from "@/services/bazar";

export const useBazarImage = () => {
  return useQuery({
    queryKey: ["bazar-image"],
    queryFn: fetchBazarImage,
  });
};
