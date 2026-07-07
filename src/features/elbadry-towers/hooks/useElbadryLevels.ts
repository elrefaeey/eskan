import { useQuery } from "@tanstack/react-query";
import { fetchElbadryLevels } from "@/services/elbadry-towers";

export default function useElbadryLevels(
  blockId?: number,
  type: string = "سكنى"
) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["elbadry-levels", blockId, type],
    queryFn: () => fetchElbadryLevels(blockId!, type),
    enabled: !!blockId,
  });

  const levels =
    data?.map((level) => ({
      value: level.id.toString(),
      label: level.name,
    })) || [];

  return {
    levels,
    isLoading,
    error,
  };
}
