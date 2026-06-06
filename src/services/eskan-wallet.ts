import axios from "axios";
import { Api } from "./api";
import {
  LinksResponse,
  ProjectDetails,
  ProjectDetailsResponse,
  ProjectsWalletResponse,
} from "@/features/eskan-wallet/types";

export interface VideoLinkResponse {
  videoUrl: string;
  title?: string;
  duration?: number;
}

export const getLinks = async () => {
  const res = await Api.get<LinksResponse>("/links");
  return res.data;
};

export const getProjectsWallet = async () => {
  const res = await Api.get<ProjectsWalletResponse>("/projects-wallet");

  if (!res.data.success) {
    throw new Error(res.data.message || "Failed to fetch projects wallet");
  }

  return res.data.data;
};

export const getProjectDetails = async (id: string) => {
  const res = await Api.get<ProjectDetailsResponse>(`/projects-wallet/${id}`);
  return res.data.data;
};

export const getUnitDetails = async (unitId: string) => {
  const res = await Api.get<{ success: boolean; message: string; data: any }>(
    `/wallet_units/${unitId}`
  );
  if (!res.data.success) {
    throw new Error(res.data.message || "Failed to fetch unit details");
  }
  return res.data.data;
};

export const reserveWalletUnit = async (formData: FormData) => {
  const response = await Api.post<{
    success: boolean;
    message: string;
    data?: any;
  }>("/user/wallet_unit", formData);

  if (!response.data.success) {
    throw new Error(response.data.message || "حدث خطأ أثناء الحجز");
  }

  return response.data;
};
