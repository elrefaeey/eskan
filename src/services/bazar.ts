import axios from "axios";
import type { BazarUnitsResponse, BazarImage } from "@/features/bazar/types";

interface FetchBazarUnitsParams {
  space?: string;
  revenue?: string;
  number?: string;
  page?: number;
}

export const fetchBazarUnits = async (
  params: FetchBazarUnitsParams = {}
): Promise<BazarUnitsResponse> => {
  const response = await axios.get("/api/cityCenter", {
    params: {
      paginate: "",
      appear: 1,
      count: 6,
      section: "بازار",
      ...params,
    },
  });
  return response.data;
};

export const fetchBazarSpaces = async (): Promise<string[]> => {
  const response = await axios.get("/api/cityCenter/space/0", {
    params: { section: "بازار" },
  });
  return response.data.data;
};

export const fetchBazarRevenues = async (): Promise<string[]> => {
  const response = await axios.get("/api/cityCenter/unique/revenue", {
    params: { section: "بازار" },
  });
  return response.data.data;
};

export const fetchBazarNumbers = async (): Promise<string[]> => {
  const response = await axios.get("/api/cityCenter/unique/numbers", {
    params: { section: "بازار" },
  });
  return response.data.data;
};

export const fetchBazarImage = async (): Promise<BazarImage> => {
  const response = await axios.get("/api/image/صورة البازار");
  return response.data.data;
};
