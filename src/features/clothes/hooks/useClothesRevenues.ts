import { useQuery } from "@tanstack/react-query";
import { fetchClothesRevenues } from "@/services/clothes";

export const useClothesRevenues = () => {
  return useQuery({
    queryKey: ["clothes-revenues"],
    queryFn: fetchClothesRevenues,
    select: (data) => data.map((v) => ({ label: v, value: v })),
  });
};
