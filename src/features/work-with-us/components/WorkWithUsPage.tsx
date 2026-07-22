"use client";

import WorkWithUsForm from "@/features/work-with-us/components/WorkWithUsForm";
import { WORK_WITH_US_HERO } from "@/features/work-with-us/constants";
import { ProjectHero } from "@/components/shared";

function WorkWithUsPage() {
  return (
    <main className="page">
      <ProjectHero
        visualType="static"
        staticImage={WORK_WITH_US_HERO.staticImage}
        staticImageAlt={WORK_WITH_US_HERO.staticImageAlt}
        badge={{ text: WORK_WITH_US_HERO.badge, color: "primary" }}
        title={WORK_WITH_US_HERO.title}
        description={
          <>
            {WORK_WITH_US_HERO.description}{" "}
            <span className="font-bold text-primary">
              {WORK_WITH_US_HERO.descriptionHighlight}
            </span>
          </>
        }
        className="mb-0 border-b border-gray-100"
      />

      <div className="sec-padding container">
        <WorkWithUsForm />
      </div>
    </main>
  );
}

export default WorkWithUsPage;
