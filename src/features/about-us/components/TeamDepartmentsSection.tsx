"use client";

import Image from "next/image";
import AnimatedSection from "@/components/common/animations/AnimatedSection";
import TeamDepartmentCard from "./TeamDepartmentCard";
import {
  ABOUT_US_TEAM_CARD_ANIMATION,
  ABOUT_US_TEAM_CONTENT_ANIMATION,
  ABOUT_US_TEAM_IMAGE_ANIMATION,
  getAboutUsTeamCardDelay,
} from "@/features/about-us/animations";
import {
  ABOUT_US_TEAM_DEPARTMENTS,
  ABOUT_US_TEAM_SECTION,
} from "@/features/about-us/constants";

export default function TeamDepartmentsSection() {
  return (
    <section aria-labelledby="team-departments-heading">
      <div className="sec-padding grid grid-cols-1 items-center gap-6 lg:mb-10 lg:grid-cols-2 lg:gap-8 xl:gap-10">
        <AnimatedSection
          y={ABOUT_US_TEAM_CONTENT_ANIMATION.y}
          duration={ABOUT_US_TEAM_CONTENT_ANIMATION.duration}
          className="order-2 flex flex-col justify-center text-right lg:order-1"
        >
          <span className="mb-3 inline-block w-fit rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary">
            {ABOUT_US_TEAM_SECTION.badge}
          </span>
          <h2
            id="team-departments-heading"
            className="border-r-4 border-primary pr-4 text-2xl font-extrabold leading-snug text-[#1a1a1a] md:text-3xl"
          >
            {ABOUT_US_TEAM_SECTION.title}
          </h2>

          <div className="mt-4 space-y-3">
            {ABOUT_US_TEAM_SECTION.paragraphs.map((paragraph) => (
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
          y={ABOUT_US_TEAM_IMAGE_ANIMATION.y}
          duration={ABOUT_US_TEAM_IMAGE_ANIMATION.duration}
          delay={ABOUT_US_TEAM_IMAGE_ANIMATION.delay}
          className="order-1 flex w-full items-center justify-center lg:order-2"
        >
          <Image
            src={ABOUT_US_TEAM_SECTION.image}
            alt={ABOUT_US_TEAM_SECTION.imageAlt}
            width={ABOUT_US_TEAM_SECTION.imageWidth}
            height={ABOUT_US_TEAM_SECTION.imageHeight}
            className="h-auto w-full max-w-full"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </AnimatedSection>
      </div>

      <div className="sec-padding grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
        {ABOUT_US_TEAM_DEPARTMENTS.map((department) => (
          <AnimatedSection
            key={department.id}
            y={ABOUT_US_TEAM_CARD_ANIMATION.y}
            duration={ABOUT_US_TEAM_CARD_ANIMATION.duration}
            delay={getAboutUsTeamCardDelay(department.order)}
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
