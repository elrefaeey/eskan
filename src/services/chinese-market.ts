import axios from "axios";
import { CafeRestaurantUnitsResponse } from "@/features/cafe-restaurants/types";

interface FetchChineseMarketUnitsParams {
    level_id: number;
    type: string;
    count?: number;
    page?: number;
}

export const fetchChineseMarketUnits = async (
    params: FetchChineseMarketUnitsParams
): Promise<CafeRestaurantUnitsResponse> => {
    const response = await axios.get<CafeRestaurantUnitsResponse>("/api/units", {
        params: {
            paginate: 1,
            level_id: params.level_id,
            project_id: 4,
            type: params.type,
            count: params.count || 50,
            appear: 1,
            page: params.page || 1,
        },
    });
    return response.data;
};
