import { Api } from "./api";
import {
  MadinaUnitsResponse,
  ProjectDetailsResponse,
} from "@/features/abrag-elmadina/types";

export const fetchMadinaUnits = async (
  step: string = "ثانيه",
  params?: Record<string, any>,
) => {
  const queryParams = {
    type: "سكنى",
    paginate: "",
    count: 500,
    appear: 1,
    project_id: 5,
    step,
    ...params,
  };

  const response = await Api.get<MadinaUnitsResponse>("/units", queryParams);
  return response.data;
};

export const fetchMadinaProjectDetails = async () => {
  const response = await Api.get<ProjectDetailsResponse>("/projects/5");
  return response.data.data;
};
