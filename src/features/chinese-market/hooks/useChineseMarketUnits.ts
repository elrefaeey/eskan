import { useQuery } from "@tanstack/react-query";
import { fetchChineseMarketUnits } from "@/services/chinese-market";

interface UseChineseMarketUnitsParams {
    level_id: number;
    type: string;
    count?: number;
    page?: number;
}

export const useChineseMarketUnits = (params: UseChineseMarketUnitsParams) => {
    return useQuery({
        queryKey: ["chinese-market-units", params],
        queryFn: () => fetchChineseMarketUnits(params),
    });
};
