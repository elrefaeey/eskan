import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { compactFilterParams } from "@/features/city-center/utils/filterParams";
import { fetchClothesUnits } from "@/services/clothes";

interface UseClothesUnitsParams {
  space?: string;
  revenue?: string;
  number?: string;
}

export const useClothesUnits = (params: UseClothesUnitsParams = {}) => {
  const [page, setPage] = useState(1);
  const filters = compactFilterParams({
    space: params.space?.trim(),
    revenue: params.revenue?.trim(),
    number: params.number?.trim(),
  });

  useEffect(() => {
    setPage(1);
  }, [filters.space, filters.revenue, filters.number]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["clothes-units", filters, page],
    queryFn: () => fetchClothesUnits({ ...filters, page }),
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
