import axios from "axios";
import type {
  ElectronicsUnitsResponse,
  ElectronicsImage,
} from "@/features/electronics/types";

interface FetchElectronicsUnitsParams {
  space?: string;
  revenue?: string;
  number?: string;
  page?: number;
}

export const fetchElectronicsUnits = async (
  params: FetchElectronicsUnitsParams = {}
): Promise<ElectronicsUnitsResponse> => {
  const response = await axios.get("/api/cityCenter", {
    params: {
      paginate: "",
      appear: 1,
      count: 6,
      section: "الكترونيات",
      ...params,
    },
  });
  return response.data;
};

export const fetchElectronicsSpaces = async (): Promise<string[]> => {
  const response = await axios.get("/api/cityCenter/space/0", {
    params: { section: "الكترونيات" },
  });
  return response.data.data;
};

export const fetchElectronicsRevenues = async (): Promise<string[]> => {
  const response = await axios.get("/api/cityCenter/unique/revenue", {
    params: { section: "الكترونيات" },
  });
  return response.data.data;
};

export const fetchElectronicsNumbers = async (): Promise<string[]> => {
  const response = await axios.get("/api/cityCenter/unique/numbers", {
    params: { section: "الكترونيات" },
  });
  return response.data.data;
};

export const fetchElectronicsImage = async (): Promise<ElectronicsImage> => {
  const response = await axios.get("/api/image/صورة-الالكترونيات");
  return response.data.data;
};

export const fetchElectronicsHeaderImage =
  async (): Promise<ElectronicsImage> => {
    const response = await axios.get("/api/image/صورة-بازار-الكترونيات");
    return response.data.data;
  };
