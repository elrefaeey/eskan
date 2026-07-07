import { useQuery } from "@tanstack/react-query";
import { fetchClothesNumbers } from "@/services/clothes";

export const useClothesNumbers = () => {
  return useQuery({
    queryKey: ["clothes-numbers"],
    queryFn: fetchClothesNumbers,
    select: (data) => data.map((v) => ({ label: v, value: v })),
  });
};
