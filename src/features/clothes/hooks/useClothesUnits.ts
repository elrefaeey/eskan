import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchClothesUnits } from "@/services/clothes";

interface UseClothesUnitsParams {
  space?: string;
  revenue?: string;
  number?: string;
}

export const useClothesUnits = (params: UseClothesUnitsParams = {}) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["clothes-units", params, page],
    queryFn: () => fetchClothesUnits({ ...params, page }),
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
