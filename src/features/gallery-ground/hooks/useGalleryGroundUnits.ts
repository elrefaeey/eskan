import { useQuery } from "@tanstack/react-query";
import { fetchGalleryGroundUnits } from "@/services/gallery-ground";
import { GalleryGroundUnitsResponse } from "../types";

interface UseGalleryGroundUnitsParams {
  location?: string | null;
  meter_price?: string | null;
  space?: string | null;
}

export default function useGalleryGroundUnits(
  params: UseGalleryGroundUnitsParams = {}
) {
  const { location, meter_price, space } = params;

  const queryParams: Record<string, any> = {};

  if (location) queryParams.location = location;
  if (meter_price) queryParams.meter_price = meter_price;
  if (space) queryParams.space = space;

  const { data, isLoading, error, refetch } =
    useQuery<GalleryGroundUnitsResponse>({
      queryKey: ["gallery-ground-units", location, meter_price, space],
      queryFn: () => fetchGalleryGroundUnits(queryParams),
    });

  return {
    data: data?.data || [],
    isLoading,
    error,
    refetch,
  };
}
