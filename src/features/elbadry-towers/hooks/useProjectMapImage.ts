import { useQuery } from "@tanstack/react-query";
import { fetchProjectMapImage } from "@/services/elbadry-towers";

export default function useProjectMapImage(
  imageName: string = "صورة-مخطط-المشروع"
) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["project-map-image", imageName],
    queryFn: () => fetchProjectMapImage(imageName),
  });

  return {
    mapImage: data,
    isLoading,
    error,
  };
}
