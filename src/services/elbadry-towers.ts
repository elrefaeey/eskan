import { Api } from "./api";
import {
  ElbadryBlocksResponse,
  ElbadryLevelsResponse,
  ElbadrySpacesResponse,
  ElbadryMeterPricesResponse,
  ElbadryUnitsResponse,
  ProjectMapImageResponse,
  ProjectDetailsResponse,
  ConstructionPhasesResponse,
  HeroImagesResponse,
} from "@/features/elbadry-towers/types";

export const fetchElbadryBlocks = async (projectId: number = 1) => {
  const response = await Api.get<ElbadryBlocksResponse>("/block", {
    project_id: projectId,
  });
  return response.data.data;
};

export const fetchElbadryLevels = async (
  blockId: number,
  type: string = "سكنى"
) => {
  const response = await Api.get<ElbadryLevelsResponse>("/unit/level", {
    type,
    block_id: blockId,
  });
  return response.data.data;
};

export const fetchElbadrySpaces = async (
  blockId: number,
  type: string = "سكنى"
) => {
  const response = await Api.get<ElbadrySpacesResponse>("/unit/space", {
    type,
    block_id: blockId,
  });
  return response.data.data;
};

export const fetchElbadryMeterPrices = async (
  blockId: number,
  type: string = "سكنى"
) => {
  const response = await Api.get<ElbadryMeterPricesResponse>(
    "/unit/meter_price",
    {
      type,
      block_id: blockId,
    }
  );
  return response.data.data;
};

export const fetchElbadryUnits = async (params?: Record<string, any>) => {
  const queryParams = {
    type: "سكنى",
    paginate: "",
    appear: 1,
    project_id: 1,
    ...params,
  };

  const response = await Api.get<ElbadryUnitsResponse>("/units", queryParams);
  return response.data;
};

export const fetchProjectMapImage = async (
  imageName: string = "صورة-مخطط-المشروع"
) => {
  const response = await Api.get<ProjectMapImageResponse>(
    `/image/${encodeURIComponent(imageName)}`
  );
  return response.data.data;
};

export const fetchProjectDetails = async (projectId: number = 1) => {
  const response = await Api.get<ProjectDetailsResponse>(
    `/projects/${projectId}`
  );
  return response.data.data;
};

export const fetchConstructionPhases = async (
  imageName: string = "صور-انشاءات-البدري"
) => {
  const response = await Api.get<ConstructionPhasesResponse>(
    `/image/${encodeURIComponent(imageName)}`
  );
  return response.data.data;
};

export const fetchHeroImages = async (imageName: string = "hero-section") => {
  const response = await Api.get<HeroImagesResponse>(
    `/image/${encodeURIComponent(imageName)}`
  );
  return response.data.data;
};
