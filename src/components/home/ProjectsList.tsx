import ProjectCard from "./ProjectCard";
import EmptyList from "@/components/common/EmptyList";
import {
  PROJECT_LINKS,
  PROJECT_OVERRIDES,
  EXCLUDED_PROJECT_IDS,
} from "@/constants/projectOverrides";
import { getProjects } from "@/services/getProjects";
import { shuffleArray } from "@/lib/utils";

export async function ProjectsList() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) {
    return <EmptyList message="لا توجد مشاريع حالياً" />;
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
