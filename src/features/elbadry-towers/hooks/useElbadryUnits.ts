import { useQuery } from "@tanstack/react-query";
import { fetchElbadryUnits } from "@/services/elbadry-towers";

interface UseElbadryUnitsParams {
  block_id?: string | null;
  level_id?: string | null;
  space?: string | null;
  meter_price?: string | null;
  type?: string;
}

export default function useElbadryUnits(params: UseElbadryUnitsParams = {}) {
  const { block_id, level_id, space, meter_price, type = "سكنى" } = params;

  const queryParams: Record<string, any> = {};

  if (block_id) queryParams.block_id = block_id;
  if (level_id) queryParams.level_id = level_id;
  if (space) queryParams.space = space;
  if (meter_price) queryParams.meter_price = meter_price;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["elbadry-units", block_id, level_id, space, meter_price, type],
    queryFn: () => fetchElbadryUnits(queryParams),
  });

  return {
    data: data?.data || [],
    isLoading,
    error,
    refetch,
  };
}
