import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBazarUnits } from "@/services/bazar";

interface UseBazarUnitsParams {
  space?: string;
  revenue?: string;
  number?: string;
}

export const useBazarUnits = (params: UseBazarUnitsParams = {}) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["bazar-units", params, page],
    queryFn: () => fetchBazarUnits({ ...params, page }),
  });

  const handlePaginate = () => {
    if (data && data.next_page_url) {
      setPage((prev) => prev + 1);
    }
  };

  return {
    data: data?.data || [],
    isLoading,
    error,
    handlePaginate,
    hasMore: !!data?.next_page_url,
    total: data?.total || 0,
  };
};
