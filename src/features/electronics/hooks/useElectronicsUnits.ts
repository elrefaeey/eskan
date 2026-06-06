import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchElectronicsUnits } from "@/services/electronics";

interface UseElectronicsUnitsParams {
  space?: string;
  revenue?: string;
  number?: string;
}

export const useElectronicsUnits = (params: UseElectronicsUnitsParams = {}) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["electronics-units", params, page],
    queryFn: () => fetchElectronicsUnits({ ...params, page }),
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
