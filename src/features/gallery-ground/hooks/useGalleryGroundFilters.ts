import { useQuery } from "@tanstack/react-query";
import { fetchGalleryGroundFilters } from "@/services/gallery-ground";

export default function useGalleryGroundFilters(projectId: number = 7) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["gallery-ground-filters", projectId],
    queryFn: () => fetchGalleryGroundFilters(projectId),
  });

  const spaces =
    data?.data?.spaces?.map((space) => ({
      value: space,
      label: `${space} متر`,
    })) || [];

  const meterPrices =
    data?.data?.meter_prices?.map((price) => ({
      value: price,
      label: `${price} ج.م`,
    })) || [];

  return {
    spaces,
    meterPrices,
    isLoading,
    error,
  };
}
