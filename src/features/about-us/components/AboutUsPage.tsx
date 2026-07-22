"use client";

import { ProjectHero, StatsGrid } from "@/components/shared";
import TeamDepartmentsSection from "@/features/about-us/components/TeamDepartmentsSection";
import {
  ABOUT_US_HERO,
  ABOUT_US_STATS,
} from "@/features/about-us/constants";

function AboutUsPage() {
  return (
    <main className="page">
      <ProjectHero
        visualType="static"
        staticImage={ABOUT_US_HERO.staticImage}
        staticImageAlt={ABOUT_US_HERO.staticImageAlt}
        badge={{ text: ABOUT_US_HERO.badge, color: "primary" }}
        title={ABOUT_US_HERO.title}
        description={ABOUT_US_HERO.description}
        className="mb-10 border-b border-gray-100"
        contentClassName="md:p-10"
      />

      <div className="container mx-auto sec-padding">
        <StatsGrid
          stats={ABOUT_US_STATS}
          colorScheme="primary"
          className="grid-cols-1 sm:grid-cols-3 md:grid-cols-3 mb-10"
        />

        <TeamDepartmentsSection />
      </div>
    </main>
  );
}

export default AboutUsPage;
