import { useQuery } from "@tanstack/react-query";
import { fetchElbadryMeterPrices } from "@/services/elbadry-towers";

export default function useElbadryMeterPrices(
  blockId?: number,
  type: string = "سكنى"
) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["elbadry-meter-prices", blockId, type],
    queryFn: () => fetchElbadryMeterPrices(blockId!, type),
    enabled: !!blockId,
  });

  const meterPrices =
    data?.map((price) => ({
      value: price,
      label: `${price} ج.م`,
    })) || [];

  return {
    meterPrices,
    isLoading,
    error,
  };
}
