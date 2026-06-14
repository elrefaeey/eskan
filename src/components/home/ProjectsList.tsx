import ProjectCard from "./ProjectCard";
import type { Project } from "@/features/projects/types/index";
import {
  PROJECT_LINKS,
  PROJECT_OVERRIDES,
  EXCLUDED_PROJECT_IDS,
} from "@/constants/projectOverrides";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

async function getProjects(): Promise<Project[]> {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      "https://back.mansoura-eco-build.com";

    const res = await fetch(`${apiUrl}/api/projects`, {
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

export async function ProjectsList() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">لا توجد مشاريع حالياً</p>
      </div>
    );
  }

  const visibleProjects = shuffleArray(projects).filter(
    (p) => !EXCLUDED_PROJECT_IDS.includes(p.id),
  );

  return (
    <div className="mt-4 w-full md:mt-8 space-y-16">
      {visibleProjects.map((project, index) => {
        const override = PROJECT_OVERRIDES[project.id];
        return (
          <ProjectCard
            key={project.id}
            title={project.name}
            description={override?.description ?? project.description}
            location={project.location}
            type={override?.type ?? project.type}
            image={project.imgs?.[0]?.img || ""}
            link={PROJECT_LINKS[project.id] || "#"}
            reverse={index % 2 !== 0}
            priority={index === 0}
            segments={override?.segments}
          />
        );
      })}
    </div>
  );
}
