import axios from "axios";
import {
  SouqIstanbulUnitsResponse,
  UniqueNumbersResponse,
  UniqueSpacesResponse,
} from "@/features/souq-istanbul/types";

interface FetchSouqIstanbulUnitsParams {
  meter_price?: number;
  space?: number;
  revenue?: number;
  level_id: number;
  type: string;
  number?: number;
  count?: number;
  page?: number;
}

export const fetchSouqIstanbulUnits = async (
  params: FetchSouqIstanbulUnitsParams
): Promise<SouqIstanbulUnitsResponse> => {
  const response = await axios.get<SouqIstanbulUnitsResponse>("/api/units", {
    params: {
      paginate: 1,
      meter_price: params.meter_price || 0,
      space: params.space || 0,
      revenue: params.revenue || 0,
      level_id: params.level_id,
      type: params.type,
      number: params.number || 0,
      count: params.count || 3,
      project_id: 4,
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

export const fetchSouqIstanbulUniqueNumbers = async (
  params: FetchUniqueNumbersParams
): Promise<UniqueNumbersResponse> => {
  const response = await axios.get<UniqueNumbersResponse>("/api/unit/numbers", {
    params: {
      meter_price: params.meter_price || 0,
      space: params.space || 0,
      revenue: params.revenue || 0,
      level_id: params.level_id,
      type: params.type,
    },
  });
  return response.data;
};

interface FetchUniqueSpacesByNumberParams {
  meter_price?: number;
  revenue?: number;
  level_id: number;
  type: string;
  number?: number;
}

export const fetchSouqIstanbulUniqueSpacesByNumber = async (
  params: FetchUniqueSpacesByNumberParams
): Promise<UniqueSpacesResponse> => {
  const response = await axios.get<UniqueSpacesResponse>("/api/unit/space", {
    params: {
      meter_price: params.meter_price || 0,
      revenue: params.revenue || 0,
      level_id: params.level_id,
      type: params.type,
      number: params.number || 0,
    },
  });
  return response.data;
};
