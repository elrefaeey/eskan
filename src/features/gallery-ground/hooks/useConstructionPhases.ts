import { useQuery } from "@tanstack/react-query";
import { fetchConstructionPhases } from "@/services/gallery-ground";

export default function useConstructionPhases(
  imageName: string = "إنشاءات-أرض-المعارض",
) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["gallery-ground-construction-phases", imageName],
    queryFn: () => fetchConstructionPhases(imageName),
  });

  return {
    constructionPhases: data,
    isLoading,
    error,
  };
}
