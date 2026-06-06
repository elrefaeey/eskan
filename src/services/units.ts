import axios from "axios";
import {
  UnitsResponse,
  UniqueNumbersResponse,
  UniqueSpacesResponse,
} from "@/features/units/types";

const API_BASE_URL = "/api";

interface FetchUnitsParams {
  meter_price?: number;
  space?: number;
  revenue?: number;
  level_id: number;
  type: string;
  number?: number;
  count?: number;
  page?: number;
}

export const fetchUnits = async (
  params: FetchUnitsParams
): Promise<UnitsResponse> => {
  const response = await axios.get<UnitsResponse>(`${API_BASE_URL}/units`, {
    params: {
      meter_price: params.meter_price || 0,
      space: params.space || 0,
      revenue: params.revenue || 0,
      level_id: params.level_id,
      type: params.type,
      number: params.number || 0,
      count: params.count || 3,
      project_id: 1,
      appear: 1,
      page: params.page || 1,
    },
  });
  return response.data;
};

interface FetchUniqueNumbersParams {
  meter_price?: number;
  space?: number;
  revenue?: number;
  level_id: number;
  type: string;
}

export const fetchUniqueNumbers = async (
  params: FetchUniqueNumbersParams
): Promise<UniqueNumbersResponse> => {
  const response = await axios.get<UniqueNumbersResponse>(
    `${API_BASE_URL}/unit/numbers`,
    {
      params: {
        meter_price: params.meter_price || 0,
        space: params.space || 0,
        revenue: params.revenue || 0,
        level_id: params.level_id,
        type: params.type,
      },
    }
  );
  return response.data;
};

interface FetchUniqueSpacesByNumberParams {
  meter_price?: number;
  revenue?: number;
  level_id: number;
  type: string;
  number: number;
}

export const fetchUniqueSpacesByNumber = async (
  params: FetchUniqueSpacesByNumberParams
): Promise<UniqueSpacesResponse> => {
  const response = await axios.get<UniqueSpacesResponse>(
    `${API_BASE_URL}/unit/spaces`,
    {
      params: {
        meter_price: params.meter_price || 0,
        revenue: params.revenue || 0,
        level_id: params.level_id,
        type: params.type,
        number: params.number,
      },
    }
  );
  return response.data;
};
