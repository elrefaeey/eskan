"use client";

import Image from "next/image";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import TeamDepartmentCard from "./TeamDepartmentCard";
import { teamDepartments, teamSectionContent } from "./data";

export default function TeamDepartmentsSection() {
  const firstRow = teamDepartments.slice(0, 3);
  const secondRow = teamDepartments.slice(3);

  return (
    <section aria-labelledby="team-departments-heading" className="overflow-hidden" dir="rtl">
      <div className="mb-8 grid grid-cols-1 items-stretch gap-6 lg:mb-10 lg:grid-cols-2 lg:gap-8 xl:gap-10">
        <AnimatedSection y={20} duration={0.6} className="flex flex-col justify-center text-right">
          <span className="mb-3 inline-block w-fit rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary">
            {teamSectionContent.badge}
          </span>
          <h2
            id="team-departments-heading"
            className="border-r-4 border-primary pr-4 text-2xl font-extrabold leading-snug text-[#1a1a1a] md:text-3xl"
          >
            {teamSectionContent.title}
          </h2>

          <div className="mt-4 space-y-3">
            {teamSectionContent.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-right text-base font-semibold leading-[1.85] text-[#555] md:text-lg md:leading-[1.9]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection
          y={20}
          duration={0.6}
          delay={0.12}
          className="relative min-h-[220px] w-full overflow-hidden rounded-2xl sm:min-h-[260px] lg:min-h-0 lg:h-full"
        >
          <Image
            src={teamSectionContent.image}
            alt={teamSectionContent.imageAlt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </AnimatedSection>
      </div>

      <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
          {firstRow.map((department, index) => (
            <AnimatedSection
              key={department.id}
              y={30}
              duration={0.6}
              delay={(department.order - 1) * 0.08}
              className="h-full"
            >
              <TeamDepartmentCard
                title={department.title}
                description={department.description}
                icon={department.icon}
                image={department.image}
                order={department.order}
              />
            </AnimatedSection>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:mx-auto md:max-w-2xl md:grid-cols-2 md:gap-5 lg:max-w-4xl lg:gap-6">
          {secondRow.map((department, index) => (
            <AnimatedSection
              key={department.id}
              y={30}
              duration={0.6}
              delay={(department.order - 1) * 0.08}
              className="h-full"
            >
              <TeamDepartmentCard
                title={department.title}
                description={department.description}
                icon={department.icon}
                image={department.image}
                order={department.order}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
