import { useQuery } from "@tanstack/react-query";
import { fetchConstructionPhases } from "@/services/elbadry-towers";

export default function useConstructionPhases(
  imageName: string = "صور-انشاءات-البدري"
) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["construction-phases", imageName],
    queryFn: () => fetchConstructionPhases(imageName),
  });

  return {
    constructionPhases: data,
    isLoading,
    error,
  };
}
