import { useQuery } from "@tanstack/react-query";
import { fetchElectronicsImage } from "@/services/electronics";

export const useElectronicsImage = () => {
  return useQuery({
    queryKey: ["electronics-image"],
    queryFn: fetchElectronicsImage,
  });
};
