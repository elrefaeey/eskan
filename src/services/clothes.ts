import type {
  ClothesUnitsResponse,
  ClothesImage,
} from "@/features/clothes/types";
import { Api } from "./api";

interface FetchClothesUnitsParams {
  space?: string;
  revenue?: string;
  number?: string;
  page?: number;
}

export const fetchClothesUnits = async (
  params: FetchClothesUnitsParams = {},
): Promise<ClothesUnitsResponse> => {
  const response = await Api.get<ClothesUnitsResponse>("cityCenter", {
    paginate: "",
    appear: 1,
    count: 6,
    section: "ملابس",
    ...params,
  });
  return response.data;
};

export const fetchClothesSpaces = async (): Promise<string[]> => {
  const response = await Api.get<{
    status: boolean;
    message: string;
    data: string[];
  }>("cityCenter/space/0", {
    section: "ملابس",
  });
  return response.data.data;
};

interface FetchClothesRevenuesParams {
  space?: string;
}

export const fetchClothesRevenues = async (
  params: FetchClothesRevenuesParams = {},
): Promise<string[]> => {
  const response = await Api.get<{
    status: boolean;
    message: string;
    data: string[];
  }>("cityCenter/unique/revenue", {
    section: "ملابس",
    ...params,
  });
  return response.data.data;
};

interface FetchClothesNumbersParams {
  space?: string;
  revenue?: string;
}

export const fetchClothesNumbers = async (
  params: FetchClothesNumbersParams = {},
): Promise<string[]> => {
  const response = await Api.get<{
    status: boolean;
    message: string;
    data: string[];
  }>("cityCenter/unique/numbers", {
    section: "ملابس",
    ...params,
  });
  return response.data.data;
};

export const fetchClothesImage = async (): Promise<ClothesImage> => {
  const response = await Api.get<{
    success: boolean;
    message: string;
    data: ClothesImage;
  }>("image/%D8%B5%D9%88%D8%B1%D8%A9-%D8%A8%D8%A7%D8%B2%D8%A7%D8%B1-%D9%85%D9%84%D8%A7%D8%A8%D8%B3");
  return response.data.data;
};

export const fetchClothesHeaderImage = async (): Promise<ClothesImage> => {
  const response = await Api.get<{
    success: boolean;
    message: string;
    data: ClothesImage;
  }>("image/صورة-بازار-ملابس");
  return response.data.data;
};
