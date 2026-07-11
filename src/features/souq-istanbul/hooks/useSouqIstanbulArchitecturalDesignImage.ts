import { useQuery } from "@tanstack/react-query";
import { fetchSouqIstanbulArchitecturalDesignImage } from "@/services/souq-istanbul";
import type { SouqIstanbulImage } from "@/features/souq-istanbul/types/images";

export const useSouqIstanbulArchitecturalDesignImage = () => {
  return useQuery<SouqIstanbulImage>({
    queryKey: ["souq-istanbul-architectural-design-image"],
    queryFn: fetchSouqIstanbulArchitecturalDesignImage,
  });
};
