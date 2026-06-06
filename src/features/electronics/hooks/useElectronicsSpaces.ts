import { useQuery } from "@tanstack/react-query";
import { fetchElectronicsSpaces } from "@/services/electronics";

export const useElectronicsSpaces = () => {
  return useQuery({
    queryKey: ["electronics-spaces"],
    queryFn: fetchElectronicsSpaces,
    select: (data) => data.map((v) => ({ label: v, value: v })),
  });
};
