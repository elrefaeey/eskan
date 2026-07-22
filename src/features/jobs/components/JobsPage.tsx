"use client";

import { useEffect, useRef, useState } from "react";
import JobsSelections from "@/features/jobs/components/JobSelection";
import JobsContent from "@/features/jobs/components/JobContent";
import {
  JOBS,
  JOBS_HERO,
  JOBS_SPECIALTY_HEADING,
} from "@/features/jobs/constants";
import { ProjectHero } from "@/components/shared";

function JobsPage() {
  const shouldMount = useRef(true);
  const [selectedJob, setSelectedJob] = useState<number | null>(JOBS[0].id);

  useEffect(() => {
    if (shouldMount.current) {
      shouldMount.current = false;
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);

  const selectedJobTitle = selectedJob
    ? JOBS.find((job) => job.id === selectedJob)?.jobTitl
    : null;

  return (
    <main className="page">
      <ProjectHero
        visualType="static"
        staticImage={JOBS_HERO.staticImage}
        staticImageAlt={JOBS_HERO.staticImageAlt}
        badge={{ text: JOBS_HERO.badge, color: "primary" }}
        title={JOBS_HERO.title}
        description={JOBS_HERO.description}
        dir="rtl"
        className="mb-10 border-b border-gray-100"
        contentClassName="md:p-10"
        mediaClassName="md:min-h-[380px]"
      />

      <div className="container sec-padding">
        <h3 className="text-primary font-bold h3 my-4">{JOBS_SPECIALTY_HEADING}</h3>
        <JobsSelections
          onChangeJob={setSelectedJob}
          selectedJob={selectedJob}
        />
        <JobsContent jobTitle={selectedJobTitle || ""} />
      </div>
    </main>
  );
}

export default JobsPage;
