import axios from "axios";
import type { Project } from "@/features/projects/types";

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await axios.get("/api/projects");
  return response.data.data;
};
