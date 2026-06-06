import { useQuery } from "@tanstack/react-query";
import { fetchClothesHeaderImage } from "@/services/clothes";

export const useClothesHeaderImage = () => {
  return useQuery({
    queryKey: ["clothes-header-image"],
    queryFn: fetchClothesHeaderImage,
  });
};
