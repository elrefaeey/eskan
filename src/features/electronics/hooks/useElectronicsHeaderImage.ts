import { useQuery } from "@tanstack/react-query";
import { fetchElectronicsHeaderImage } from "@/services/electronics";

export const useElectronicsHeaderImage = () => {
  return useQuery({
    queryKey: ["electronics-header-image"],
    queryFn: fetchElectronicsHeaderImage,
  });
};
