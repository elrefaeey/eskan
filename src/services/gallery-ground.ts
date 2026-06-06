import { Api } from "./api";
import {
  GalleryGroundUnitsResponse,
  ProjectDetailsResponse,
  ConstructionPhasesResponse,
} from "@/features/gallery-ground/types";

export interface FilterOptionsResponse {
  success: boolean;
  message: string;
  data: {
    spaces: string[];
    meter_prices: string[];
  };
}

export const fetchProjectDetails = async (projectId: number = 7) => {
  const response = await Api.get<ProjectDetailsResponse>(
    `/projects/${projectId}`,
  );
  return response.data.data;
};

export const fetchGalleryGroundFilters = async (projectId: number = 7) => {
  const response = await Api.get<FilterOptionsResponse>(
    `/projects/space&meter/${projectId}`,
  );
  return response.data;
};

export const fetchGalleryGroundUnits = async (params?: Record<string, any>) => {
  const queryParams = {
    type: "تجارى",
    paginate: "",
    count: 500,
    appear: 1,
    project_id: 7,
    ...params,
  };

  const response = await Api.get<GalleryGroundUnitsResponse>(
    "/units",
    queryParams,
  );
  return response.data;
};

export const fetchConstructionPhases = async (
  imageName: string = "إنشاءات-أرض-المعارض",
) => {
  const response = await Api.get<ConstructionPhasesResponse>(
    `/image/${encodeURIComponent(imageName)}`,
  );
  return response.data.data;
};
