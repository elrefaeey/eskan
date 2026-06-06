import { useQuery } from "@tanstack/react-query";
import { fetchElbadrySpaces } from "@/services/elbadry-towers";

export default function useElbadrySpaces(
  blockId?: number,
  type: string = "سكنى"
) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["elbadry-spaces", blockId, type],
    queryFn: () => fetchElbadrySpaces(blockId!, type),
    enabled: !!blockId,
  });

  const spaces =
    data?.map((space) => ({
      value: space,
      label: `${space} متر`,
    })) || [];

  return {
    spaces,
    isLoading,
    error,
  };
}
