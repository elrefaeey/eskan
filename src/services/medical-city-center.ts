import { Api } from "./api";
import {
  MedicalUnitsResponse,
  MedicalProjectDetailsResponse,
} from "@/features/medical-city-center/types";

export const fetchMedicalUnits = async (params?: Record<string, any>) => {
  const queryParams = {
    type: "طبى",
    paginate: "",
    count: 500,
    appear: 1,
    project_id: 12,
    ...params,
  };

  const response = await Api.get<MedicalUnitsResponse>("/units", queryParams);
  return response.data;
};

export const fetchMedicalProjectDetails = async () => {
  const response = await Api.get<MedicalProjectDetailsResponse>("/projects/12");
  return response.data.data;
};
