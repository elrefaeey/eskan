import type { Project } from "@/features/projects/types";
import { getServerApiBaseUrl } from "@/lib/serverApi";

export async function getProjects(): Promise<Project[]> {
  try {
    const apiUrl = await getServerApiBaseUrl();

    const res = await fetch(`${apiUrl}/projects`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    if (!data?.data) throw new Error("Invalid data structure");

    return data.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}
