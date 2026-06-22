"use client";

import Image from "next/image";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import TeamDepartmentCard from "./TeamDepartmentCard";
import { teamDepartments, teamSectionContent } from "./data";

export default function TeamDepartmentsSection() {
  return (
    <section aria-labelledby="team-departments-heading" className="overflow-hidden" dir="rtl">
      <div className="mb-8 grid grid-cols-1 items-center gap-6 lg:mb-10 lg:grid-cols-2 lg:gap-8 xl:gap-10">
        <AnimatedSection
          y={20}
          duration={0.6}
          className="order-2 flex flex-col justify-center text-right lg:order-1"
        >
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
          className="order-1 flex w-full items-center justify-center lg:order-2"
        >
          <Image
            src={teamSectionContent.image}
            alt={teamSectionContent.imageAlt}
            width={teamSectionContent.imageWidth}
            height={teamSectionContent.imageHeight}
            className="h-auto w-full max-w-full"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </AnimatedSection>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
        {teamDepartments.map((department) => (
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
    </section>
  );
}
