import { useQuery } from "@tanstack/react-query";
import { fetchClothesImage } from "@/services/clothes";

export const useClothesImage = () => {
  return useQuery({
    queryKey: ["clothes-image"],
    queryFn: fetchClothesImage,
  });
};
