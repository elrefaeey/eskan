import { useQuery } from "@tanstack/react-query";
import { fetchHeroImages } from "@/services/elbadry-towers";

export default function useHeroImages(imageName: string = "hero-section") {
  const { data, isLoading, error } = useQuery({
    queryKey: ["hero-images", imageName],
    queryFn: () => fetchHeroImages(imageName),
  });

  return {
    heroImages: data,
    isLoading,
    error,
  };
}
