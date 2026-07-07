import { useQuery } from "@tanstack/react-query";
import {
  fetchElbadrySpaces,
  fetchElbadryMeterPrices,
} from "@/services/elbadry-towers";

export default function useElbadryFilters(
  blockId?: number,
  type: string = "سكنى"
) {
  const { data: spacesData, isLoading: spacesLoading } = useQuery({
    queryKey: ["elbadry-spaces", blockId, type],
    queryFn: () => fetchElbadrySpaces(blockId!, type),
    enabled: !!blockId,
  });

  const { data: meterPricesData, isLoading: meterPricesLoading } = useQuery({
    queryKey: ["elbadry-meter-prices", blockId, type],
    queryFn: () => fetchElbadryMeterPrices(blockId!, type),
    enabled: !!blockId,
  });

  const spaces =
    spacesData?.map((space) => ({
      value: space,
      label: `${space} متر`,
    })) || [];

  const meterPrices =
    meterPricesData?.map((price) => ({
      value: price,
      label: `${price} ج.م`,
    })) || [];

  return {
    spaces,
    meterPrices,
    isLoading: spacesLoading || meterPricesLoading,
    error: null,
  };
}
