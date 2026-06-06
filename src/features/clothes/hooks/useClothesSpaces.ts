import { useQuery } from "@tanstack/react-query";
import { fetchClothesSpaces } from "@/services/clothes";

export const useClothesSpaces = () => {
  return useQuery({
    queryKey: ["clothes-spaces"],
    queryFn: fetchClothesSpaces,
    select: (data) => data.map((v) => ({ label: v, value: v })),
  });
};
