"use client";

import { useRef, useEffect, useState } from "react";
import JobsSelections from "@/features/jobs/components/JobSelection";
import JobsContent from "@/features/jobs/components/JobContent";
import { jobs } from "@/constants/jobs";
import { ProjectHero } from "@/components/shared";

const JobsPage = () => {
  const shouldMount = useRef<boolean>(true);
  const [selectedJob, setSelectedJob] = useState<number | null>(jobs[0].id);

  const onChangeJob = (value: number) => {
    setSelectedJob(value);
  };

  useEffect(() => {
    if (shouldMount.current) {
      shouldMount.current = false;
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);

  const selectedJobTitle = selectedJob
    ? jobs.find((job) => job.id === selectedJob)?.jobTitl
    : null;

  return (
    <main className="page">

      {/* ── Hero ── */}
      <ProjectHero
        visualType="static"
        staticImage="/assets/workwithus/download.jpg"
        staticImageAlt="اعمل معنا"
        badge={{ text: "فرص العمل", color: "primary" }}
        title="إنضم لفريق العمل"
        description="تسعي دائما اسكان المنصورة العقارية الي ضم الاكفاء والمبدعين وشباب والخريجين في مختلف التخصصات الي منظومة عملها، ولذلك نحن حريصين علي ان تكون احد افراد فريق عملنا ان كنت من هؤلاء المتميزين والموهوبين في مجال تخصصك، فلا تتردد في ارسال سيرتك الذاتية و نبذة عن اعمالك، من خلال التسجيل."
        className="mb-10 border-b border-gray-100"
        contentClassName="md:p-10"
        mediaClassName="md:min-h-[380px]"
      />

      <div className="container sec-padding">
        <h3 className="text-primary font-bold h3 my-4">حدد تخصصك</h3>
        <JobsSelections onChangeJob={onChangeJob} selectedJob={selectedJob} />
        <JobsContent jobTitle={selectedJobTitle || ""} />
      </div>
    </main>
  );
};

export default JobsPage;
