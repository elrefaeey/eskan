import { useQuery } from "@tanstack/react-query";
import { fetchSouqIstanbulInnerDesignImages } from "@/services/souq-istanbul";
import type { SouqIstanbulImage } from "@/features/souq-istanbul/types/images";

export const useSouqIstanbulInnerDesignImages = () => {
  return useQuery<SouqIstanbulImage[]>({
    queryKey: ["souq-istanbul-inner-design-images"],
    queryFn: fetchSouqIstanbulInnerDesignImages,
  });
};
